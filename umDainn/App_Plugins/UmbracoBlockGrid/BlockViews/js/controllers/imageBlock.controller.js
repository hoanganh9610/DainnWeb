angular.module("umbraco").controller("imageBlockController", function ($scope, globalDesignService, editorState) {
    globalDesignService.getDesignSettings(editorState.getCurrent().id).then(function (design) {
        $scope.borderRadius = design.cornerRadius.picturesAndVideo;
        const ds = design.dropShadow.picturesAndVideo;
        $scope.boxShadow = ds.offsetX + 'px ' + ds.offsetY + 'px ' + ds.blurRadius + 'px rgba(' + globalDesignService.hexToRgb(ds.color).rgbString + ',' + ds.opacity + '%)';
    });
});