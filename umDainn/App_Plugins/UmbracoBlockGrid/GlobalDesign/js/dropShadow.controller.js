angular.module('umbraco').controller('dropShadowController', function ($scope, $timeout, globalDesignService) {

    const defaultValue = 
    {
        picturesAndVideo: {
            offsetX: 0,
            offsetY: 0,
            blurRadius: 0,
            color: "5b5b5b",
            opacity: 0
        },
        cards: {
            offsetX: 0,
            offsetY: 0,
            blurRadius: 0,
            color: "bcbcbc",
            opacity: 0
        }
    };

    if (!$scope.model.value) {
        $scope.model.value = defaultValue;
    }
   
    $scope.options = {
        allowEmpty: false,
        showInitial: true,
        showSelectionPalette: false,
    };

    $scope.showColorPicker = function ($event) {
        const target = angular.element($event.target);
        const colorPickerInput = target.parent().find('input')
        if (colorPickerInput.length > 0) {
            $timeout(function () {
                colorPickerInput.spectrum("show");
            }, 0);
        }
    };

    $scope.onChange = function (color, type, key) {
        $scope.model.value[type][key] = color.toHexString().trimStart("#");
    };

    $scope.toRgbString = function (color) {
        return globalDesignService.hexToRgb(color).rgbString
    }

});