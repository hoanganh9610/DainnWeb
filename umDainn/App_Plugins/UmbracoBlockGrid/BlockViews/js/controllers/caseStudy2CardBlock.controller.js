angular.module("umbraco").controller("caseStudy2CardBlockController", function ($scope, licensesService, globalDesignService, editorState) {
    $scope.licenseIsValid = true;
    $scope.message = "";

    licensesService.checkTrialForm().then(function (isSubmitted) {
        if (isSubmitted) {
            licensesService.checkLicense().then(function (isValid) {
                $scope.licenseIsValid = isValid;
                if (!isValid) {
                    $scope.message = licensesService.getExpiredText();
                }
            });
        } else {
            //$scope.licenseIsValid = false;
            //$scope.message = licensesService.getNotSubmittedText();
        }
    });
    globalDesignService.getDesignSettings(editorState.getCurrent().id).then(function (design) {
        $scope.selectedBackground = design.baselineColors.background;
        $scope.design = design;
    });
}); 