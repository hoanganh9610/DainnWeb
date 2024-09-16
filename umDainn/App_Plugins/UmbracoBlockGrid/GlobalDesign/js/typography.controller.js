angular.module('umbraco').controller('typographyController', function ($scope, globalDesignService, editorState) {

    $scope.previewTexts = {
        text: 'Lorem ipsum futuristic city 2047, Jane & John discovered a secret facility. Cutting-edge technology @ 75% efficiency and cryptic symbols <span class="nowrap">*()+</span> revealed a hidden message. Deciphered code unveiled $2 billion treasure!',
        h1: 'This is the H1 header',
        h2: 'This is the H2 header',
        h3: 'This is the H3 header',
        h4: 'This is the H4 header',
        h5: 'This is the H5 header',
        h6: 'This is the H6 header',
        button: `<a class="btn btn-primary btn-lg">Large Button</a> 
                 <a class="btn btn-primary">Normal Button</a> 
                 <a class="btn btn-primary btn-sm">Small Button</a>`
    }

    $scope.headingStyles = [];
    $scope.previewStyles = [];

    function initializeFonts() {
        const property = globalDesignService.getProperty("fonts", "fonts", editorState.getCurrent());
        if (property && property.value) {
            $scope.fonts = property.value;
        } else {
            $timeout(initializeFonts, 100);
        }
    }

    initializeFonts();

    $scope.baselineColors = globalDesignService.getProperty("colors", "baselineColors", editorState.getCurrent()).value;
    $scope.cornerRadius = globalDesignService.getProperty("effects", "cornerRadius", editorState.getCurrent()).value;

    const defaultValue = [
        {
            element: "text",
            font: $scope.fonts[0],
            desktop: 16,
            tablet: 16,
            mobile: 16
        },
        {
            element: "h1",
            font: $scope.fonts[2],
            desktop: 54,
            tablet: 48,
            mobile: 40
        },
        {
            element: "h2",
            font: $scope.fonts[2],
            desktop: 46,
            tablet: 34,
            mobile: 34
        },
        {
            element: "h3",
            font: $scope.fonts[1],
            desktop: 32,
            tablet: 32,
            mobile: 32
        },
        {
            element: "h4",
            font: $scope.fonts[1],
            desktop: 26,
            tablet: 26,
            mobile: 26
        },
        {
            element: "h5",
            font: $scope.fonts[1],
            desktop: 22,
            tablet: 22,
            mobile: 22
        },
        {
            element: "h6",
            font: $scope.fonts[2],
            desktop: 18,
            tablet: 18,
            mobile: 18
        },
        {
            element: "button",
            font: $scope.fonts[0],
            desktop: 16,
            tablet: 16,
            mobile: 16
        }
    ];

    if (!$scope.model.value) {
        $scope.model.value = defaultValue;
    } else {
        defaultValue.forEach((defaultElement) => {
            const elementExists = $scope.model.value.some(
                (item) => item.element === defaultElement.element
            );

            if (!elementExists) {
                $scope.model.value.push(defaultElement);
            }
        });
    }

    function findFontIndexByGuid(guid) {
        return $scope.fonts.findIndex(function (f) {
            return f.guid === guid;
        });
    }

    $scope.$watch('fonts', function (newVal, oldVal) {
        if (newVal !== oldVal) {
            $scope.model.value.forEach(function (item) {
                const fontIndex = findFontIndexByGuid(item.font.guid);

                if (fontIndex === -1) {
                    item.font = $scope.fonts[0];
                } else {
                    item.font = $scope.fonts[fontIndex];
                }
            });
        }
    }, true);

    $scope.getStyle = function (setting, device, noSize) {
        const style = {
            'font-family': setting.font.fontFamily + ',' + setting.font.fontCategory,
            'font-weight': setting.font.fontWeight,
            'font-style': setting.font.fontStyle
        };

        if (!noSize) {
            style['font-size'] = setting[device] + 'px';
            if (setting.element === 'text') {
                style['line-height'] = 1.25;
            } else {
                style['line-height'] = setting[device] + 'px';
            }
        }

        return style;
    };

    $scope.applyStyles = function (setting, index) {
        $scope.headingStyles[index] = $scope.getStyle(setting, setting.element, true);
        $scope.previewStyles[index] = {
            desktop: $scope.getStyle(setting, 'desktop'),
            tablet: $scope.getStyle(setting, 'tablet'),
            mobile: $scope.getStyle(setting, 'mobile')
        };
    };

    $scope.watchSettingChanges = function () {
        $scope.model.value.forEach(function (setting, index) {
            $scope.applyStyles(setting, index);

            $scope.$watch(function () {
                return setting;
            }, function (newVal, oldVal) {
                if (newVal !== oldVal) {
                    $scope.applyStyles(setting, index);
                }
            }, true);
        });
    };

    $scope.watchSettingChanges();
});