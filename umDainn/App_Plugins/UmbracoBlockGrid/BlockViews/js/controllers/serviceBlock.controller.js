angular.module("umbraco").controller("serviceBlockController", function ($scope, globalDesignService, editorState) {
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

            .btn, .btn.btn-sm, .btn.btn-lg{
                border-radius: ${design.cornerRadius.buttons}px; 
            }

            .btn.btn-primary {
                color: #${design.baselineColors.button.text};
                background: #${design.baselineColors.button.fill};  
                border-color: #${design.baselineColors.button.stroke};  
                font-family: ${design.typography.button.font.fontFamily}, ${design.typography.button.font.fontCategory};
                font-style: ${design.typography.button.font.fontStyle}
            }

            .btn.btn-primary:hover{
                color: #${design.baselineColors.button.textHover};
                background: #${design.baselineColors.button.fillHover};
                border-color: #${design.baselineColors.button.strokeHover};
            }

            .btn.btn-primary:active{
                color: #${design.baselineColors.button.textHover};
                background: #${design.baselineColors.button.fillHover};
                border-color: #${design.baselineColors.button.strokeHover};
            }

            .btn.btn-outline-primary{
                color: #${design.baselineColors.buttonSecondary.text};
                border-color: #${design.baselineColors.buttonSecondary.stroke};  
                font-family: ${design.typography.button.font.fontFamily}, ${design.typography.button.font.fontCategory};
                font-style: ${design.typography.button.font.fontStyle}
            }

            .btn.btn-outline-primary:hover{
                color: #${design.baselineColors.buttonSecondary.textHover};
                background: #${design.baselineColors.buttonSecondary.fillHover};
                border-color: #${design.baselineColors.buttonSecondary.strokeHover};
            }

            .btn.btn-outline-primary:active{
                color: #${design.baselineColors.buttonSecondary.textHover};
                background: #${design.baselineColors.buttonSecondary.fillHover};
                border-color: #${design.baselineColors.buttonSecondary.strokeHover};
            }

            .card-service h2, .card-service .h2 { color: #${design.baselineColors.content.h2}; ${getFontStyles('h2')} }  
            .card-service h3, .card-service .h3 { color: #${design.baselineColors.content.h3}; ${getFontStyles('h3')} }  
            .card-service h4, .card-service .h4 { color: #${design.baselineColors.content.h4}; ${getFontStyles('h4')} }  
            .card-service div p { color: #${design.baselineColors.content.text}; ${getFontStyles('text')} }

            .card {
                box-shadow: ${ds.offsetX}px ${ds.offsetY}px ${ds.blurRadius}px rgba(${globalDesignService.hexToRgb(ds.color).rgbString}, ${ds.opacity}%);
            }
        `
    });
}); 