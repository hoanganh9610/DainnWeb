angular.module('umbraco').controller('fontsController', function ($scope, $timeout, $element, assetsService, $http) {
    function createNewFontSetting() {
        return {
            fontFamily: 'Poppins',
            fontCategory: 'sans-serif',
            fontStyle: 'normal',
            fontWeight: '400',
            guid: String.CreateGuid()
        };
    }


    if (!$scope.model.value) {
        $scope.model.value = [createNewFontSetting(), createNewFontSetting(), createNewFontSetting()];
        $scope.model.value[1].fontFamily = 'DM Sans';
        $scope.model.value[1].fontWeight = '500';
        $scope.model.value[2].fontFamily = 'DM Sans';
        $scope.model.value[2].fontWeight = '700';
    };

    $scope.sortableOptions = {
        axis: 'y',
        containment: '.umb-editor-container',
        items: '> div.accordion-group',
        tolerance: 'intersect',
        cursor: 'grabbing',
        handle: ".accordion-heading"
    };

    const uniqueFontFamilies = new Set();

    $http.get('/App_Plugins/UmbracoBlockGrid/GlobalDesign/webfonts.json')
        .then(function (response) {
            $scope.fonts = response.data.items;

            $scope.model.value.forEach((fontSetting) => {
                uniqueFontFamilies.add(fontSetting.fontFamily);
            });

            uniqueFontFamilies.forEach((fontFamily) => {
                loadFontFamily(fontFamily);
            });
        }, function (error) {
            console.error('Error fetching webfonts.json:', error);
        });

    $scope.addFontSetting = function () {
        const fontSetting = createNewFontSetting();
        $scope.model.value.push(fontSetting);
        $scope.onFontFamilyChange(fontSetting);

        $timeout(function () {
            $element.find('.accordion-group:last-child .collapse').collapse('show');
            $element.find('.accordion-group:last-child .accordion-toggle').removeClass('collapsed');
        }, 0);
    };

    $scope.removeFontSetting = function (item) {
        const index = $scope.model.value.indexOf(item);
        if (index !== -1) {
            $scope.model.value.splice(index, 1);
        }
    };

    $scope.onFontFamilyChange = function (fontSetting) {
        const fontDetails = $scope.getFontDetails(fontSetting.fontFamily);
        const fontStyleExists = fontDetails.variants.hasOwnProperty(fontSetting.fontStyle);

        if (!fontStyleExists) {
            fontSetting.fontStyle = 'normal';
        }

        const fontWeightExists = fontDetails.variants[fontSetting.fontStyle].includes(fontSetting.fontWeight);

        if (!fontWeightExists) {
            fontSetting.fontWeight = '400';
        }

        if (!uniqueFontFamilies.has(fontSetting.fontFamily)) {
            uniqueFontFamilies.add(fontSetting.fontFamily);
            loadFontFamily(fontSetting.fontFamily);
        }
    };

    $scope.getFontDetails = function (fontFamily) {
        if (!$scope.fonts) {
            return {
                variants: {},
                category: "",
            };
        }
        let selectedFont = $scope.fonts.find(function (font) {
            return font.family === fontFamily;
        });

        let fontDetails = {
            variants: {},
            category: ""
        };

        if (selectedFont) {
            selectedFont.variants.forEach(function (variant) {
                let matched = variant.match(/^(\d+)?([a-z]+)?$/);
                if (matched) {
                    let weight = matched[1] || "400";
                    let style = (matched[2] === "regular") ? "normal" : (matched[2] || "normal");

                    if (!fontDetails.variants[style]) {
                        fontDetails.variants[style] = [];
                    }

                    fontDetails.variants[style].push(weight);
                }
            });
            fontDetails.category = selectedFont.category;
        }

        return fontDetails;
    }

    $scope.getObjectKeys = function (object) {
        return Object.keys(object);
    }

    $scope.getStyle = function (setting) {
        return {
            'font-family': setting.fontFamily + ',' + setting.fontCategory,
            'font-weight': setting.fontWeight,
            'font-style': setting.fontStyle
        };
    };

    function loadFontFamily(fontFamily) {
        const variants = [];
        const apiUrl = [];

        apiUrl.push('https://fonts.googleapis.com/css?family=');
        apiUrl.push(fontFamily.replace(/ /g, '+') + ':');

        const fontDetails = $scope.getFontDetails(fontFamily);

        for (const fontStyle in fontDetails.variants) {
            const suffix = fontStyle === 'normal' ? '' : fontStyle[0];
            const values = fontDetails.variants[fontStyle].map(value => value + suffix);
            variants.push(...values);
        }

        apiUrl.push(variants.join(','));
        apiUrl.push('&display=swap');

        const apiUrlString = apiUrl.join('');

        assetsService.loadCss(apiUrlString, $scope, 10000).then(function () {
        });
    }
});