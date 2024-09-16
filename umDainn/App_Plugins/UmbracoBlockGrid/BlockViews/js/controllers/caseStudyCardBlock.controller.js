angular.module("umbraco").controller("caseStudyCardBlockController", function ($scope, globalDesignService, editorState) {
    globalDesignService.getDesignSettings(editorState.getCurrent().id).then(function (design) {
        $scope.selectedBackground = design.baselineColors.background;
        $scope.design = design;
    });
}); 