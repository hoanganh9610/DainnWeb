(function () {
    "use strict";

    function WebsiteNameController($scope) {

        var vm = this;
        var element = $($scope.model.currentStep.element + ' #websiteName');

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

    angular.module("umbraco").controller("WebsiteNameController", WebsiteNameController);
})();