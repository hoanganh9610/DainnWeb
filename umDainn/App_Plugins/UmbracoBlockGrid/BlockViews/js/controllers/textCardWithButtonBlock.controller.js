angular.module("umbraco").controller("textCardWithButtonController", function ($scope, globalDesignService, editorState) {
    globalDesignService.getDesignSettings(editorState.getCurrent().id).then(function (design) {
        $scope.design = design;
    });
}); 
