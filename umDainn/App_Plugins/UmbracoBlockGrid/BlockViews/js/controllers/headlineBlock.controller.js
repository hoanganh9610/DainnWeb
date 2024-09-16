angular.module("umbraco").controller("headlineBlockController", function ($scope, globalDesignService, editorState) {
    globalDesignService.getDesignSettings(editorState.getCurrent().id).then(function (design) {
        const getFontStyles = (elementType) => {
            return `    
                font-size: ${design.typography[elementType].desktop}px;  
                font-family: '${design.typography[elementType].font.fontFamily}', ${design.typography[elementType].font.fontCategory};  
                font-weight: ${design.typography[elementType].font.fontWeight};  
                font-style: ${design.typography[elementType].font.fontStyle};  
            `;
        };

        $scope.styles = `    
            h1, .h1 { color: var(--has-bright-contrast, #${design.baselineColors.content['h1']}); ${getFontStyles('h1')} }
            h2, .h2 { color: var(--has-bright-contrast, #${design.baselineColors.content['h2']}); ${getFontStyles('h2')} }
            h3, .h3 { color: var(--has-bright-contrast, #${design.baselineColors.content['h3']}); ${getFontStyles('h3')} }
            h4, .h4 { color: var(--has-bright-contrast, #${design.baselineColors.content['h4']}); ${getFontStyles('h4')} }
            h5, .h5 { color: var(--has-bright-contrast, #${design.baselineColors.content['h5']}); ${getFontStyles('h5')} }
            h6, .h6 { color: var(--has-bright-contrast, #${design.baselineColors.content['h6']}); ${getFontStyles('h6')} }
        `;
    });
});