(function () {
    "use strict";

    function DesignNameController($scope) {

        var vm = this;
        var element = $($scope.model.currentStep.element);

        vm.error = false;

        vm.initNextStep = initNextStep;

        function initNextStep() {
            if (element.val().toLowerCase() !== '') {
                $scope.model.nextStep();
            } else {
                vm.error = true;
            }
        }

    }

    angular.module("umbraco").controller("DesignNameController", DesignNameController);
})();