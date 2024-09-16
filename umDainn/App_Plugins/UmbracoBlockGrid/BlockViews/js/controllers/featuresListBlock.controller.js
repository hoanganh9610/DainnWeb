angular.module("umbraco").controller("featuresListBlockController", function ($scope, globalDesignService, licensesService, editorState) {
    $scope.licenseIsValid = true;
    $scope.message = "";

    licensesService.checkTrialForm().then(function (isSubmitted) {
        if (isSubmitted) {
            licensesService.checkLicense().then(function (isValid) {
                $scope.licenseIsValid = isValid;
                if (!isValid) {
                    $scope.message = licensesService.getExpiredText();
                }
            });
        } else {
            //$scope.licenseIsValid = false;
            //$scope.message = licensesService.getNotSubmittedText();
        }
    });

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

        $scope.borderRadius = design.cornerRadius.picturesAndVideo;
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

            .card-feature { color:#${design.baselineColors.content.text}; ${getFontStyles('text')} }

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
                font-style: ${design.typography.button.font.fontStyle};
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

            h1, .h1 { color:#${design.baselineColors.content.h1}; ${getFontStyles('h1')} }
            h2, .h2 { color:#${design.baselineColors.content.h2}; ${getFontStyles('h2')} }
            h3, .h3 { color:#${design.baselineColors.content.h3}; ${getFontStyles('h3')} }
            h4, .h4 { color:#${design.baselineColors.content.h4}; ${getFontStyles('h4')} }
            h5, .h5 { color:#${design.baselineColors.content.h5}; ${getFontStyles('h5')} }
            h6, .h6 { color:#${design.baselineColors.content.h6}; ${getFontStyles('h6')} }
            li a, p a { --bs-link-color-rgb: ${globalDesignService.hexToRgb(design.baselineColors.content.link).rgbString}; }
            li a:hover, p a:hover { --bs-link-hover-color-rgb: ${globalDesignService.hexToRgb(design.baselineColors.content.linkHover).rgbString}; }
            
        `
    });
}); 