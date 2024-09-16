angular.module('umbraco').controller('colorPickerController', function ($scope, $timeout, globalDesignService, editorState) {

    var vm = this;
    globalDesignService.getDesignSettings(editorState.getCurrent().id).then(function (design) {
        if ($scope.isObjectNotEmpty(design.baselineColors.background)) {
            updateCurrentItems(design.baselineColors.background);
        }
    });

    $scope.isObjectNotEmpty = function (obj) {
        return obj && Object.keys(obj).length > 0;
    }

    function updateCurrentItems(background) {
        const transformedItems = {};

        Object.keys(background).forEach((key, index) => {
            transformedItems[index] = {
                value: background[key],
                label: background[key],
                sortOrder: index
            };
        });

        $scope.model.items = transformedItems;
        vm.selectedBackground = $scope.model.value !== null ? transformedItems[$scope.model.value] : null;
    }

    vm.selectColor = function (color) {
        // this is required to re-validate
        $scope.model.value = color ? color.sortOrder : null;
        $timeout(function () {
            var newColor = color ? color.value : null;
            vm.modelValueForm.selectedColor.$setViewValue(newColor);
        });
    };

    // Method required by the valPropertyValidator directive (returns true if the property editor has at least one color selected)
    $scope.validateMandatory = function () {
        var isValid = !$scope.model.validation.mandatory || (
            $scope.model.value !== null
            && $scope.model.value !== ""
        );
        return {
            isValid: isValid,
            errorMsg: $scope.model.validation.mandatoryMessage || "Value cannot be empty",
            errorKey: "required"
        };
    };
});