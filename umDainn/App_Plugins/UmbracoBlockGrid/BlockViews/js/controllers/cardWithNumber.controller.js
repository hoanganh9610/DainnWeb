angular.module("umbraco").controller("CardWithNumberController", function ($scope, globalDesignService, editorState) {

    if ($scope.block.data.additionalFeatures) {
        globalDesignService.sortAndWatch('additionalFeatures', $scope);
    }

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

            .card-number  {
                font-family: ${design.typography.text.font.fontFamily};
                color: #${design.baselineColors.content.text};
                ${getFontStyles('text')}
                box-shadow: ${ds.offsetX}px ${ds.offsetY}px ${ds.blurRadius}px rgba(${globalDesignService.hexToRgb(ds.color).rgbString}, ${ds.opacity}%);
            }

            .btn-primary{
                border-radius: ${design.cornerRadius.buttons}px!important;
            }

            .btn-primary {
                --bs-btn-color: #${design.baselineColors.button.text};
                --bs-btn-hover-color: #${design.baselineColors.button.textHover};  
                --bs-btn-bg: #${design.baselineColors.button.fill};  
                --bs-btn-hover-bg: #${design.baselineColors.button.fillHover};  
                --bs-btn-border-color: #${design.baselineColors.button.stroke};  
                --bs-btn-hover-border-color: #${design.baselineColors.button.strokeHover};
                --bs-btn-font-family: ${design.typography.button.font.fontFamily}, ${design.typography.button.font.fontCategory};
                --bs-btn-font-weight: ${design.typography.button.font.fontWeight};
                font-style: ${design.typography.button.font.fontStyle}
            }

            .card-number .h2 { color: #${design.baselineColors.content.h2}; ${getFontStyles('h2')} }  
            .card-number h1 { color: #${design.baselineColors.content.h1}; ${getFontStyles('h1')} }
            .card-number h2 { color: #${design.baselineColors.content.h2}; ${getFontStyles('h2')} }  
            .card-number h3 { color: #${design.baselineColors.content.h3}; ${getFontStyles('h3')} }  
            .card-number h4 { color: #${design.baselineColors.content.h4}; ${getFontStyles('h4')} }  
            .card-number h5 { color: #${design.baselineColors.content.h5}; ${getFontStyles('h5')} }  
            .card-number h6 { color: #${design.baselineColors.content.h6}; ${getFontStyles('h6')} }  

            .card-number a { color: #${(design.baselineColors.content.link)}; }
            .card-number a:hover { color: #${design.baselineColors.content.linkHover}; }
        `
    });
}); 
