angular.module("umbraco").controller("footerBlockController", function ($scope, globalDesignService, editorState) {

    globalDesignService.sortAndWatch('footerLinks', $scope);
    globalDesignService.sortAndWatch('socialMediaButtons', $scope);

    $scope.getCropUrl = function getCropUrl(crops) {
        const coordinates = crops?.coordinates;
        const cc = coordinates ? `cc=${coordinates.x1},${coordinates.y1},${coordinates.x2},${coordinates.y2}&` : '';
        return `${cc}width=${crops?.width}&height=${crops?.height}`;
    }

    globalDesignService.getDesignSettings(editorState.getCurrent().id).then(function (design) {
        const getFontStyles = (elementType) => {
            return `  
                font-size: ${design.typography[elementType].desktop}px;  
                font-family: ${design.typography[elementType].font.fontFamily}, ${design.typography[elementType].font.fontCategory};  
                font-weight: ${design.typography[elementType].font.fontWeight};  
                font-style: ${design.typography[elementType].font.fontStyle};  
            `;
        };

        $scope.design = design;
        $scope.footerOption = design.footer;
        $scope.websiteName = globalDesignService.getProperty("website", "websiteName", editorState.getCurrent()).value;

        $scope.styles = `
            .site-footer {
                background-color: #${design.baselineColors.footer.background};
                --footer-link-color: #${design.baselineColors.footer.link};
                --footer-link-hover-color: #${design.baselineColors.footer.linkHover};
                --footer-title: #${design.baselineColors.footer.title};
                ${getFontStyles('text')}
            }
            .site-footer h5, site-footer .h5 { color: var(--footer-title); ${getFontStyles('h5')} }  
            .site-footer div p { color: #${design.baselineColors.footer.copyrightMessage}; }
            .site-footer .border-top { border-color: #${design.baselineColors.footer.copyrightMessage}!important;}
        `
    });
});  
