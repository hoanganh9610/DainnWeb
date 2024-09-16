angular.module('umbraco').controller('siteHeaderController', function ($scope) {
    $scope.viewItems = [
        { value: '0', label: 'header-1', description: 'Logo on the left side, links, and buttons on the right side' },
        { value: '1', label: 'header-2', description: 'Logo on the left side, links centered, buttons on the right side' },
        { value: '2', label: 'header-3', description: 'Logo and links on the left, buttons on the right side' }
    ];

    const defaultValue = '0';

    if (!$scope.model.value) {
        $scope.model.value = defaultValue;
    }
});