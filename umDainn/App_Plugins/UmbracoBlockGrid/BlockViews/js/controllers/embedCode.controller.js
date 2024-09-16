angular.module("umbraco").controller("embedCodeController", function ($scope, globalDesignService, editorState) {
    $scope.styles = ``;

    globalDesignService.getDesignSettings(editorState.getCurrent().id).then(function (design) {
        const getFontStyles = (elementType) => {
            return `  
                font-size: ${design.typography[elementType].desktop}px;  
                font-family: ${design.typography[elementType].font.fontFamily}, ${design.typography[elementType].font.fontCategory};  
                font-weight: ${design.typography[elementType].font.fontWeight};  
                font-style: ${design.typography[elementType].font.fontStyle};  
            `;
        };

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
            
            h1, .h1 { color: var(--has-bright-contrast, #${design.baselineColors.content.h1}); ${getFontStyles('h1')} }
            h2, .h2 { color: var(--has-bright-contrast, #${design.baselineColors.content.h2}); ${getFontStyles('h2')} }
            h3, .h3 { color: var(--has-bright-contrast, #${design.baselineColors.content.h3}); ${getFontStyles('h3')} }
            h4, .h4 { color: var(--has-bright-contrast, #${design.baselineColors.content.h4}); ${getFontStyles('h4')} }
            h5, .h5 { color: var(--has-bright-contrast, #${design.baselineColors.content.h5}); ${getFontStyles('h5')} }
            h6, .h6 { color: var(--has-bright-contrast, #${design.baselineColors.content.h6}); ${getFontStyles('h6')} }

            .embed-code { color: var(--has-bright-contrast, #${design.baselineColors.content.text}); ${getFontStyles('text')}}
			.embed-code { 
				--bs-body-color: #${design.baselineColors.content.text}; 
				--bs-secondary-color: #${design.baselineColors.content.text};
			}
            div a { color: rgb(${globalDesignService.hexToRgb(design.baselineColors.content.link).rgbString}); }
            div a:hover { color: rgb(${globalDesignService.hexToRgb(design.baselineColors.content.linkHover).rgbString}); }
        `
    });
}); 