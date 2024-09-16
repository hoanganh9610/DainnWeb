angular.module("umbraco").factory("globalDesignService", function (entityResource, contentResource, editorState, assetsService, eventsService) {
    eventsService.on("content.saved", function (event, args) {
        if (["design", "blockGrid", "designFolder", "notFoundError"].includes(args?.content?.contentTypeAlias)) {
            invalidateCachedData();
            console.log("content.saved - " + args?.content?.contentTypeAlias);
        }
    });

    var designSettingsCache = {};
    var promiseCache = {};

    async function getDesignSettings(currentId) {
        if (designSettingsCache[currentId]) {
            return Promise.resolve(designSettingsCache[currentId]);
        }

        if (promiseCache[currentId]) {
            return promiseCache[currentId];
        }

        const current = editorState.getCurrent();
        let path = [];

        if (["blockGrid", "notFoundError"].includes(current.contentTypeAlias)) {
            if (current.id === 0) {
                const pathArray = await entityResource.getPath(current.parentId, "Document");
                path = pathArray.reverse().slice(0, -1);
            } else {
                path = current.path.split(',').reverse().slice(1, -1);
            }
        }

        function findOverrideDesign(data) {
            return new Promise((resolve) => {
                if (!data.variants || data.variants.length === 0) {
                    resolve(null);
                    return;
                }
                const settingsTab = data.variants[0].tabs.find(tab => tab.alias === "settings");
                const overrideDesignProperty = settingsTab && settingsTab.properties.find(property => property.alias === "overrideDesign");

                if (overrideDesignProperty && overrideDesignProperty.value) {
                    contentResource.getById(overrideDesignProperty.value)
                        .then(function (data) {
                            const designSettings = {
                                logo: {}
                            };
                            const colorsTab = data.variants[0].tabs.find(tab => tab.alias === "colors");
                            const effectsTab = data.variants[0].tabs.find(tab => tab.alias === "effects");
                            const fontsTab = data.variants[0].tabs.find(tab => tab.alias === "fonts");
                            const footerTab = data.variants[0].tabs.find(tab => tab.alias === "headerFooter/footer");
                            const headerTab = data.variants[0].tabs.find(tab => tab.alias === "headerFooter/header");
                            const logoTab = data.variants[0].tabs.find(tab => tab.alias === "logo");
                            designSettings.baselineColors = colorsTab && colorsTab.properties.find(property => property.alias === "baselineColors").value;
                            designSettings.colorPalette = colorsTab && colorsTab.properties.find(property => property.alias === "colorPalette").value;
                            designSettings.cornerRadius = effectsTab && effectsTab.properties.find(property => property.alias === "cornerRadius").value;
                            designSettings.dropShadow = effectsTab && effectsTab.properties.find(property => property.alias === "dropShadow").value;
                            designSettings.typography = fontsTab && createTypographyObject(fontsTab.properties.find(property => property.alias === "typography").value);
                            designSettings.footer = footerTab && footerTab.properties.find(property => property.alias === "footerOptions").value;
                            designSettings.header = headerTab && headerTab.properties.find(property => property.alias === "headerOptions").value;
                            designSettings.logo.logo = logoTab && logoTab.properties.find(property => property.alias === "logo").value;
                            designSettings.logo.logoHover = logoTab && logoTab.properties.find(property => property.alias === "logoHover").value;
                            designSettings.logo.useCrop = logoTab && logoTab.properties.find(property => property.alias === "useCrop").value;
                            designSettings.hexToRgb = hexToRgb;
                            resolve(designSettings);
                        });
                } else {
                    resolve(null);
                }
            });
        }

        function iteratePath(index) {
            if (index < path.length) {
                return contentResource.getById(path[index])
                    .then(function (data) {
                        return findOverrideDesign(data);
                    })
                    .then(function (result) {
                        if (result) {
                            return result;
                        } else {
                            return iteratePath(index + 1);
                        }
                    });
            } else {
                let siteRoot = -1;
                let query = "$root";
                if (Umbraco.Sys.ServerVariables.byteEditor.isMultisiteSetup) {
                    siteRoot = current.path.split(',')[1] ?? current.parentId;
                    query = "$site";
                }
                return entityResource.getChildren(siteRoot, "Document")
                    .then(function (data) {
                        const designFolder = data.find(item => item.metaData.ContentTypeAlias === 'designFolder');
                        return contentResource.getById(designFolder.id);
                    })
                    .then(function (data) {
                        const generalTab = data.variants[0].tabs.find(tab => tab.alias === "general");
                        const selectedDesignProperty = generalTab && generalTab.properties.find(property => property.alias === "selectedDesign");
                        return selectedDesignProperty && contentResource.getById(selectedDesignProperty.value);
                    })
                    .then(function (data) {
                        const designSettings = {
                            logo: {}
                        };
                        const colorsTab = data && data.variants[0].tabs.find(tab => tab.alias === "colors");
                        const effectsTab = data && data.variants[0].tabs.find(tab => tab.alias === "effects");
                        const fontsTab = data && data.variants[0].tabs.find(tab => tab.alias === "fonts");
                        const footerTab = data && data.variants[0].tabs.find(tab => tab.alias === "headerFooter/footer");
                        const headerTab = data && data.variants[0].tabs.find(tab => tab.alias === "headerFooter/header");
                        const logoTab = data && data.variants[0].tabs.find(tab => tab.alias === "logo");
                        designSettings.baselineColors = colorsTab && colorsTab.properties.find(property => property.alias === "baselineColors").value;
                        designSettings.colorPalette = colorsTab && colorsTab.properties.find(property => property.alias === "colorPalette").value;
                        designSettings.cornerRadius = effectsTab && effectsTab.properties.find(property => property.alias === "cornerRadius").value;
                        designSettings.dropShadow = effectsTab && effectsTab.properties.find(property => property.alias === "dropShadow").value;
                        designSettings.typography = fontsTab && createTypographyObject(fontsTab.properties.find(property => property.alias === "typography").value);
                        designSettings.footer = footerTab && footerTab.properties.find(property => property.alias === "footerOptions").value;
                        designSettings.header = headerTab && headerTab.properties.find(property => property.alias === "headerOptions").value;
                        designSettings.logo.logo = logoTab && logoTab.properties.find(property => property.alias === "logo").value;
                        designSettings.logo.logoHover = logoTab && logoTab.properties.find(property => property.alias === "logoHover").value;
                        designSettings.logo.useCrop = logoTab && logoTab.properties.find(property => property.alias === "useCrop").value;
                        designSettings.hexToRgb = hexToRgb;
                        return designSettings;
                    });
            }
        }

        function createTypographyObject(fontsArray) {
            const typographyObject = {};
            if (fontsArray) {
                loadFonts(fontsArray);

                fontsArray.forEach(item => {
                    typographyObject[item.element] = item;
                    typographyObject[item.element].getFontStyles = function () {
                        return `font-size: ${this.desktop}px;\n ` +
                            `   font-family: ${this.font.fontFamily}, ${this.font.fontCategory};\n ` +
                            `   font-weight: ${this.font.fontWeight};\n ` +
                            `   font-style: ${this.font.fontStyle};`;
                    };
                });
            }

            return typographyObject;
        }

        function loadFonts(fontsArray) {
            const uniqueFontFamilies = {};

            fontsArray.forEach((font) => {
                const { fontFamily, fontWeight } = font.font;
                if (!uniqueFontFamilies[fontFamily]) {
                    uniqueFontFamilies[fontFamily] = new Set();
                }
                uniqueFontFamilies[fontFamily].add(fontWeight);
            });
            Object.entries(uniqueFontFamilies).forEach(([fontFamily, fontVariants]) => {
                fontVariants.add('500');
                fontVariants.add('700');

                const apiUrl = ['https://fonts.googleapis.com/css?family='];
                apiUrl.push(fontFamily.replace(/ /g, '+') + ':');

                const variants = [];

                const sortedFontVariants = Array.from(fontVariants).sort();
                sortedFontVariants.forEach((fontVariant) => {
                    variants.push(fontVariant, fontVariant + 'i');
                });

                apiUrl.push(variants.join(','));
                apiUrl.push('&display=swap');

                const apiUrlString = apiUrl.join('');
                assetsService.loadCss(apiUrlString, null, 10000).then(function () { });
            });
        }

        const promise = findOverrideDesign(current)
            .then(function (result) {
                if (result) {
                    return result;
                } else {
                    return iteratePath(0);
                }
            })
            .then(function (result) {
                if (result) {
                    designSettingsCache[currentId] = result;
                }
                delete promiseCache[currentId];
                return result;
            });

        promiseCache[currentId] = promise;
        return promise;
    }

    function invalidateCachedData() {
        designSettingsCache = {};
        promiseCache = {};
    }

    function hexToRgb(hex) {
        // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function (m, r, g, b) {
            return r + r + g + g + b + b;
        });

        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        if (result) {
            const r = parseInt(result[1], 16);
            const g = parseInt(result[2], 16);
            const b = parseInt(result[3], 16);
            return {
                r: r,
                g: g,
                b: b,
                rgbString: [r, g, b].join(', ')
            };
        } else {
            return null;
        }
    }

    function sortAndWatch(propertyAlias, scope) {
        function sort() {
            const layout = scope.block.data[propertyAlias].layout;
            const contentData = scope.block.data[propertyAlias].contentData;

            if (!layout || !layout["Umbraco.BlockList"] || !contentData || layout["Umbraco.BlockList"].length === 0 || contentData.length === 0) {
                return;
            }

            const sortOrder = layout["Umbraco.BlockList"].map(block => block.contentUdi);

            contentData.sort((a, b) => {
                const indexA = sortOrder.indexOf(a.udi);
                const indexB = sortOrder.indexOf(b.udi);
                return indexA - indexB;
            });
        }

        sort();

        scope.$watch(`block.data.${propertyAlias}.layout["Umbraco.BlockList"]`, (newValue, oldValue) => {
            if (newValue !== oldValue) {
                sort();
            }
        }, true);
    }

    function getProperty(groupAlias, propertyAlias, current) {
        let property;

        if (current.variants) {
            const groupTab = current.variants[0].tabs.find(tab => tab.alias === groupAlias);
            if (groupTab) {
                property = groupTab.properties.find(property => property.alias === propertyAlias);
            }
        } else {
            const group = current.groups.find(group => group.alias === groupAlias);
            if (group) {
                property = group.properties.find(property => property.alias === propertyAlias);
            }
        }

        return property;
    }

    return {
        getDesignSettings: getDesignSettings,
        invalidateCachedData: invalidateCachedData,
        hexToRgb: hexToRgb,
        sortAndWatch: sortAndWatch,
        getProperty: getProperty
    };
});
