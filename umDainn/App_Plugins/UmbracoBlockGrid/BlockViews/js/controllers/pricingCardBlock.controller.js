angular.module("umbraco").controller("pricingCardBlockController", function ($scope, globalDesignService, editorState) {
    $scope.styles = ``;

    globalDesignService.sortAndWatch('prosAndCons', $scope);

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


            .card-pricing  {
                font-family: ${design.typography.text.font.fontFamily};
                color: #${design.baselineColors.content.text};
                ${getFontStyles('text')}
                box-shadow: ${ds.offsetX}px ${ds.offsetY}px ${ds.blurRadius}px rgba(${globalDesignService.hexToRgb(ds.color).rgbString}, ${ds.opacity}%);
            }

            .card-pricing .h3 { color: #${design.baselineColors.content.h3}; ${getFontStyles('h3')} }  
            .card-pricing .h5 { color: #${design.baselineColors.content.h5}; ${getFontStyles('h5')} }  

            .card-pricing .badge{
                background: #${design.baselineColors.button.fill} !important;  
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
        `
    });
}); 