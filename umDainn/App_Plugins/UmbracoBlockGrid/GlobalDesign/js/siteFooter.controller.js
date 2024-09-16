angular.module('umbraco').controller('siteFooterController', function ($scope) {
    $scope.viewItems = [
        { value: '0', label: 'footer-1', description: 'Option 1' },
        { value: '1', label: 'footer-2', description: 'Option 2' },
        { value: '2', label: 'footer-3', description: 'Option 3' },
        { value: '3', label: 'footer-4', description: 'Option 4' }
    ];

    const defaultValue = '2';

    if (!$scope.model.value) {
        $scope.model.value = defaultValue;
    }
});