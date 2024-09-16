angular.module("umbraco").controller("roadmapBlockController", function ($scope, globalDesignService, editorState) {
    globalDesignService.getDesignSettings(editorState.getCurrent().id).then(function (design) {
        $scope.design = design;
    });
}); 