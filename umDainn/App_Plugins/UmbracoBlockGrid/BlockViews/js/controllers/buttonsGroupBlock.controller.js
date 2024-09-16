angular.module("umbraco").controller("buttonsGroupBlockController", function ($scope, globalDesignService, editorState) {
	globalDesignService.sortAndWatch('buttons', $scope);
	globalDesignService.getDesignSettings(editorState.getCurrent().id).then(function (design) {
		$scope.design = design;
	});
}); 