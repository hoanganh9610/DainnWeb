angular.module("umbraco").controller("teamMemberBlockController", function ($scope, globalDesignService, editorState) {
    $scope.styles = ``;

    globalDesignService.getDesignSettings(editorState.getCurrent().id).then(function (design) {
        $scope.selectedBackground = design.baselineColors.background;
        const getFontStyles = (elementType) => {
            return `  
                font-size: ${design.typography[elementType].desktop}px;  
                font-family: ${design.typography[elementType].font.fontFamily}, ${design.typography[elementType].font.fontCategory};  
                font-weight: ${design.typography[elementType].font.fontWeight};  
                font-style: ${design.typography[elementType].font.fontStyle};  
            `;
        };

        const ds = design.dropShadow.cards;
        $scope.styles = ` 
            .lead-lg{
                font-size: ${design.typography.text.desktop + 4}px;  
            }

            .lead-md{
                font-size: ${design.typography.text.desktop}px;  
            }

            .lead-sm{
                font-size: ${design.typography.text.desktop - 2}px;  
            }

            .card-member{
                font-family: ${design.typography.text.font.fontFamily};
                color: #${design.baselineColors.content.text};
                ${getFontStyles('text')}
                box-shadow: ${ds.offsetX}px ${ds.offsetY}px ${ds.blurRadius}px rgba(${globalDesignService.hexToRgb(ds.color).rgbString}, ${ds.opacity}%);
            }
        
            .card-member h1, .h1 { color: var(--card-bright-contrast, #${design.baselineColors.content.h1}); ${getFontStyles('h1')} }  
            .card-member h2, .h2 { color: var(--card-bright-contrast, #${design.baselineColors.content.h2}); ${getFontStyles('h2')} }  
            .card-member h3, .h3 { color: var(--card-bright-contrast, #${design.baselineColors.content.h3}); ${getFontStyles('h3')} }  
            .card-member h4, .h4 { color: var(--card-bright-contrast, #${design.baselineColors.content.h4}); ${getFontStyles('h4')} }  
            .card-memberh5, .h5 { color: var(--card-bright-contrast, #${design.baselineColors.content.h5}); ${getFontStyles('h5')} }  
            .card-member h6, .h6 { color: var(--card-bright-contrast, #${design.baselineColors.content.h6}); ${getFontStyles('h6')} }  
            .card-memberdiv p { color: var(--card-bright-contrast, #${design.baselineColors.content.text}); ${getFontStyles('text')} }
            .card-member div a { color: rgb(${globalDesignService.hexToRgb(design.baselineColors.content.link).rgbString}); }
            .card-member div a:hover { color: rgb(${globalDesignService.hexToRgb(design.baselineColors.content.linkHover).rgbString}); }
            .card-member h3.h4 { color: var(--card-bright-contrast, #${design.baselineColors.content.h4}); ${getFontStyles('h4')} }  
        `
    });
}); 