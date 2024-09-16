angular.module('umbraco').controller('cornerRadiusController', function ($scope, globalDesignService, editorState) {

    const defaultValue =
    {
        picturesAndVideo: 0,
        buttons: 8
    };

    function checkAndAddMissingProperties(source, target) {
        for (const key in source) {
            if (!target.hasOwnProperty(key)) {
                target[key] = source[key];
            } else if (typeof source[key] === 'object' && !Array.isArray(source[key])) {
                checkAndAddMissingProperties(source[key], target[key]);
            }
        }
    }

    if (!$scope.model.value) {
        $scope.model.value = defaultValue;
    } else {
        checkAndAddMissingProperties(defaultValue, $scope.model.value);
    }

    function createTypographyObject(arr) {
        const typographyObject = {};
        arr?.forEach(item => {
            typographyObject[item.element] = item;
        });

        return typographyObject;
    }

    const unwatchTypography = $scope.$watch(
        function () {
            return globalDesignService.getProperty("fonts", "typography", editorState.getCurrent()).value;
        },
        function (newValue, oldValue) {
            if (newValue) {
                $scope.typography = createTypographyObject(newValue);
                unwatchTypography();
            }
        }
    );

    $scope.baselineColors = globalDesignService.getProperty("colors", "baselineColors", editorState.getCurrent()).value;

    $scope.buttonStyle = {
        '--bs-btn-color': 'inherit',
        '--bs-btn-hover-color': 'inherit',
        '--bs-btn-bg': 'inherit',
        '--bs-btn-hover-bg': 'inherit',
        '--bs-btn-border-color': 'inherit',
        '--bs-btn-hover-border-color': 'inherit',
        '--bs-btn-font-weight': 'inherit',
        '--bs-btn-border-radius': 'inherit',
        '--bs-border-radius-sm': 'inherit',
        '--bs-border-radius-lg': 'inherit'
    };
});