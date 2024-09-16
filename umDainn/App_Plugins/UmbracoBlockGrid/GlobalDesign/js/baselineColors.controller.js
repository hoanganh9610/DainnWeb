angular.module('umbraco').controller('baselineColorsController', function ($scope, $timeout, globalDesignService, $element, editorState, assetsService) {
    assetsService.loadJs("~/App_Plugins/UmbracoBlockGrid/BlockViews/js/libraries/bootstrap-2.3.2.min.js", $scope, { charset: 'utf-8' }, 10000).then(function () {
    });

    const defaultValue = {
        "content": {
            "h1": "000000",
            "h2": "000000",
            "h3": "000000",
            "h4": "000000",
            "h5": "000000",
            "h6": "bcbcbc",
            "text": "5b5b5b",
            "link": "2986cc",
            "linkHover": "bcbcbc"
        },
        "background": {
            "0": "ffffff",
            "1": "2986cc",
            "2": "000000",
            "3": "5b5b5b",
            "4": "f3f6f4"
        },
        "button": {
            "fill": "2986cc",
            "fillHover": "174a71",
            "stroke": "2986cc",
            "strokeHover": "174a71",
            "text": "ffffff",
            "textHover": "ffffff"
        },
        "buttonSecondary": {
            "fill": "ffffff",
            "fillHover": "ffffff",
            "stroke": "2986cc",
            "strokeHover": "174a71",
            "text": "2986cc",
            "textHover": "174a71"
        },
        "header": {
            "background": "ffffff",
            "dropdownBackground": "ffffff",
            "dropdownBackgroundHover": "ffffff",
            "link": "5b5b5b",
            "linkHover": "174a71"
        },
        "footer": {
            "background": "000000",
            "title": "f3f6f4",
            "link": "f3f6f4",
            "linkHover": "2986cc",
            "copyrightMessage": "f3f6f4"
        }
    }

    function checkAndAddMissingProperties(source, target) {
        for (const key in source) {
            if (!target.hasOwnProperty(key)) {
                target[key] = source[key];
            } else if (typeof source[key] === 'object' && !Array.isArray(source[key])) {
                checkAndAddMissingProperties(source[key], target[key]);
            }
        }
    }

    if (!$scope.model.value) {
        $scope.model.value = defaultValue;
    } else {
        checkAndAddMissingProperties(defaultValue, $scope.model.value);
    }

    function compactChunkArray(array) {
        const chunkSize = Math.ceil(Math.sqrt(array.length));
        const chunks = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            chunks.push(array.slice(i, i + chunkSize));
        }
        return chunks;
    }

    function createTypographyObject(arr) {
        const typographyObject = {};
        arr?.forEach(item => {
            typographyObject[item.element] = item;
        });

        return typographyObject;
    }

    $scope.cornerRadius = globalDesignService.getProperty("effects", "cornerRadius", editorState.getCurrent()).value;

    const colorPaletteProperty = globalDesignService.getProperty("colors", "colorPalette", editorState.getCurrent());

    const unwatchTypography = $scope.$watch(
        function () {
            return globalDesignService.getProperty("fonts", "typography", editorState.getCurrent()).value;
        },
        function (newValue, oldValue) {
            if (newValue) {
                $scope.typography = createTypographyObject(newValue);
                unwatchTypography();
            }
        }
    );

    function getChunkedColorValues(colorPaletteProperty) {
        if (colorPaletteProperty) {
            const colorValues = colorPaletteProperty.value.map(colorObject => colorObject.value);
            return compactChunkArray(colorValues);
        }
        return null;
    }

    let chunkedColorValues = getChunkedColorValues(colorPaletteProperty);

    $scope.options = {
        allowEmpty: false,
        showInitial: true,
        showSelectionPalette: false,
        palette: chunkedColorValues
    };

    $scope.showColorPicker = function ($event) {
        const target = angular.element($event.target);
        const colorPickerInput = target.parent().find('input:first')
        if (colorPickerInput.length > 0) {
            $timeout(function () {
                colorPickerInput.spectrum("show");
            }, 0);
        }
    };

    function updateColorPickerPalettes() {
        const colorPickerInputs = $element.find('.umb-color-picker input');
        colorPickerInputs.each(function () {
            $(this).spectrum("option", "palette", chunkedColorValues);
        });
    }

    $scope.$watch(
        function () {
            if (colorPaletteProperty) {
                return colorPaletteProperty.value;
            }
            return null;
        },
        function (newValue, oldValue) {
            if (newValue !== oldValue) {
                chunkedColorValues = getChunkedColorValues(colorPaletteProperty);
                $timeout(updateColorPickerPalettes, 0);
            }
        },
        true
    );

    $scope.onChange = function (color, type, key) {
        $scope.model.value[type][key] = color.toHexString().trimStart("#");
    };

    $scope.linkStyle = { color: '#' + $scope.model.value.content.link };

    $scope.$watch('model.value.content.link', function (newVal, oldVal) {
        if (newVal !== oldVal) {
            $scope.linkStyle = { color: '#' + newVal };
        }
    });

    $scope.buttonStyle = {
        '--bs-btn-color': 'inherit',
        '--bs-btn-hover-color': 'inherit',
        '--bs-btn-bg': 'inherit',
        '--bs-btn-hover-bg': 'inherit',
        '--bs-btn-border-color': 'inherit',
        '--bs-btn-hover-border-color': 'inherit',
        '--bs-btn-font-weight': 'inherit',
        '--bs-btn-border-radius': 'inherit',
        '--bs-border-radius-sm': 'inherit',
        '--bs-border-radius-lg': 'inherit'
    };

    $scope.toRgbString = function (color) {
        return globalDesignService.hexToRgb(color).rgbString
    }

    let dropdown;

    $scope.showDropdown = function ($event) {
        dropdown = angular.element($event.target);
        const dropdownMenu = dropdown.parent().find('.dropdown-menu')
        if (dropdownMenu.length > 0) {
            dropdown.toggleClass("show");
            dropdownMenu.toggleClass("show");
        }
    }

    $scope.outSideClick = function () {
        if (dropdown) {
            const dropdownMenu = dropdown.parent().find('.dropdown-menu');
            if (dropdownMenu.length > 0) {
                dropdown.removeClass("show");
                dropdownMenu.removeClass("show");
            }
        }
    }
});