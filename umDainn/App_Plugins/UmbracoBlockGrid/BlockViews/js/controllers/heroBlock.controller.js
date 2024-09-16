angular.module("umbraco").controller("heroBlockController", function ($scope, globalDesignService, licensesService, editorState) {
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

    const updateStyles = (elementType) => {
        $scope.styles = `    
            ${elementType} { color: var(--bs-heading-color) }  
        `;

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

            $scope.styles = ` 
                .section-hero-1{
                    font-family: ${design.typography.text.font.fontFamily};
                    color: #${design.baselineColors.content.text};
                    ${getFontStyles(elementType)};
                }
                
                .section-hero-2{
                    font-family: ${design.typography.text.font.fontFamily};
                    color: #${design.baselineColors.content.text};
                    ${getFontStyles(elementType)};
                }

                .section-hero-3{
                    font-family: ${design.typography.text.font.fontFamily};
                    color: #${design.baselineColors.content.text};
                    ${getFontStyles(elementType)};
                }


                h1, .h1 { color: var(--has-bright-contrast, #${design.baselineColors.content.h1}); ${getFontStyles('h1')} }
                h2, .h2 { color: var(--has-bright-contrast, #${design.baselineColors.content.h2}); ${getFontStyles('h2')} }
                h3, .h3 { color: var(--has-bright-contrast, #${design.baselineColors.content.h3}); ${getFontStyles('h3')} }
                h4, .h4 { color: var(--has-bright-contrast, #${design.baselineColors.content.h4}); ${getFontStyles('h4')} }
                h5, .h5 { color: var(--has-bright-contrast, #${design.baselineColors.content.h5}); ${getFontStyles('h5')} }
                h6, .h6 { color: var(--has-bright-contrast, #${design.baselineColors.content.h6}); ${getFontStyles('h6')} }

                .lead-lg{
                    font-size: ${design.typography.text.desktop + 4}px;  
                }

                .lead-md{
                    font-size: ${design.typography.text.desktop}px;  
                }

                .lead-sm{
                    font-size: ${design.typography.text.desktop - 2}px;  
                }
                
             
                ${elementType}, .${elementType} { color: var(--has-bright-contrast, #${design.baselineColors.content[elementType]}); ${getFontStyles(elementType)} }  

                `;
        });
    };

    const headlineLevelExists = $scope.block.data.headlineLevel && $scope.block.data.headlineLevel.length > 0;
    const elementType = headlineLevelExists ? $scope.block.data.headlineLevel[0].toLowerCase() : 'h1';

    updateStyles(elementType);

    if (headlineLevelExists) {
        $scope.$watch(() => $scope.block.data.headlineLevel[0], (newValue, oldValue) => {
            if (newValue !== oldValue) {
                updateStyles(newValue.toLowerCase());
            }
        });
    }
});