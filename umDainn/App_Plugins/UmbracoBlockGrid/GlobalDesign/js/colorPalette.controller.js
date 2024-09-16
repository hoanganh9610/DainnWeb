angular.module('umbraco').controller('colorPaletteController', function ($scope, editorState) {

    if (!$scope.model.value) {
        $scope.model.value = {
            "1": {
                "value": "000000",
                "label": "000000",
                "sortOrder": 1
            },
            "2": {
                "value": "5b5b5b",
                "label": "5b5b5b",
                "sortOrder": 2
            },
            "3": {
                "value": "bcbcbc",
                "label": "bcbcbc",
                "sortOrder": 3
            },
            "4": {
                "value": "f3f6f4",
                "label": "f3f6f4",
                "sortOrder": 4
            },
            "5": {
                "value": "ffffff",
                "label": "ffffff",
                "sortOrder": 5
            },
            "6": {
                "value": "2986cc",
                "label": "2986cc",
                "sortOrder": 6
            },
            "7": {
                "value": "174a71",
                "label": "174a71",
                "sortOrder": 7
            }
        }
    }


    //// Subscribe to the event
    //var unsubscribe = eventsService.on("content.saved", function (event, args) {
    //    if (args?.content?.contentTypeAlias === "design") {
    //        dataTypeResource.getByName("Background colors")
    //            .then(function (dataType) {
    //                const newPreValues = dataTypeHelper.createPreValueProps(dataType.preValues);
    //                const items = newPreValues.find(npv => npv.alias === "items");
    //                items.value = $scope.model.value;
    //                dataTypeResource.save(dataType, newPreValues, false).then(function (res) {
    //                    console.log(res);
    //                });
    //            });
    //        console.log("content.saved - design - colors");
    //    }
    //});

    //// When the scope is destroyed we need to unsubscribe
    //$scope.$on("$destroy", function () {
    //    unsubscribe();
    //});

    function getColorPaletteProperty() {
        let current = editorState.getCurrent();
        if (current.variants) {
            const colorsTab = current.variants[0].tabs.find(tab => tab.alias === "colors")
            if (colorsTab) {
                return colorsTab.properties.find(property => property.alias === "colorPalette");
            }
        } else {
            const colorsGroup = current.groups.find(group => group.alias === "colors")
            if (colorsGroup) {
                return colorsGroup.properties.find(property => property.alias === "colorPalette");
            }
        }
    }

    const colorPaletteProperty = getColorPaletteProperty();

    $scope.$watch('model.value', function (newValue, oldValue) {
        if (newValue !== oldValue) {
            if (colorPaletteProperty) {
                colorPaletteProperty.value = newValue;
            }
        }
    }, true);

    $scope.getColorsCount = function () {
        return Object.keys($scope.model.value).length;
    }
});