angular.module("umbraco").controller("breadcrumbBlockController", function ($scope, entityResource, globalDesignService, editorState) {

    globalDesignService.getDesignSettings(editorState.getCurrent().id).then(function (design) {
        $scope.selectedBackground = design.baselineColors.background;
        $scope.styles = `  
            .breadcrumb {
                font-size: ${design.typography.text.desktop}px;
                font-family: ${design.typography.text.font.fontFamily}, ${design.typography.text.font.fontCategory};
                font-weight: ${design.typography.text.font.fontWeight};
                font-style: ${design.typography.text.font.fontStyle};
            }
            .breadcrumb a { color: rgb(${globalDesignService.hexToRgb(design.baselineColors.content.link).rgbString}); }
            .breadcrumb .breadcrumb a:hover { color: rgb(${globalDesignService.hexToRgb(design.baselineColors.content.linkHover).rgbString}); }
            .breadcrumb .breadcrumb-item {
                color: #${design.baselineColors.content.text};
            }
            .breadcrumb a:not([href]):not([class]), .breadcrumb a:not([href]):not([class]):hover{
                color: rgb(${globalDesignService.hexToRgb(design.baselineColors.content.link).rgbString});
            }
        `
    });

    $scope.currentDocument = editorState.getCurrent();
    $scope.ancestors = [];

    if ($scope.currentDocument.parentId !== -1) {
        entityResource.getAncestors($scope.currentDocument.parentId, 'Document').then(ancestors => {
            $scope.ancestors = ancestors;
        });
    }
}); 