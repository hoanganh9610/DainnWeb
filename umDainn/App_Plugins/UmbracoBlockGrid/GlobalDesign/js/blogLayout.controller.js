angular.module('umbraco').controller('blogLayoutController', function ($scope) {
    $scope.viewItems = [
        { value: '0', label: 'layout-1', description: 'Option 1' },
        { value: '1', label: 'layout-2', description: 'Option 2' },
        { value: '2', label: 'layout-3', description: 'Option 3' },
        { value: '3', label: 'layout-4', description: 'Option 4' }
    ];

    const defaultValue = '1';

    if (!$scope.model.value) {
        $scope.model.value = defaultValue;
    }
});