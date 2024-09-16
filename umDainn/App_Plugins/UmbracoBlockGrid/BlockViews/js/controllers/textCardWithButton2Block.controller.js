angular.module("umbraco").controller("textCardWithButton2Controller", function ($scope, globalDesignService, editorState) {
	globalDesignService.getDesignSettings(editorState.getCurrent().id).then(function (design) {
		$scope.design = design;
		$scope.selectedBackground = design.baselineColors.background;
	});
}); 
