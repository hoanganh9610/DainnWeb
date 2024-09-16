angular.module("umbraco").controller("designFolderListViewController", function ($scope, listViewHelper, contentResource, editorState, $filter, globalDesignService) {
    function i() {
        $scope.designs = [];
        contentResource.getChildren(editorState.getCurrent().id)
            .then(function (children) {
                $scope.designs = children.items;
                $scope.selectedDesign = globalDesignService.getProperty('general', 'selectedDesign', editorState.getCurrent()).value;
            });
    }

    $scope.viewItem = function (i) {
        var selectedItem = $filter('filter')($scope.items, { id: i.id }, true)[0];
        if (selectedItem) {
            listViewHelper.editItem(selectedItem, $scope);
        }
    }

    $scope.setAsDefaultDesign = function ($event, udi) {
        $event.stopPropagation();
        contentResource.getById(editorState.getCurrent().id)
            .then(function (content) {
                globalDesignService.getProperty('general', 'selectedDesign', content).value = udi;
                content.variants[0].save = true;
                contentResource.publish(content, false, [], false)
                    .then(function (content) {
                        $scope.selectedDesign = udi;
                        globalDesignService.getProperty('general', 'selectedDesign', editorState.getCurrent()).value = udi;
                        globalDesignService.invalidateCachedData();
                    });
            });
    }

    i();
});