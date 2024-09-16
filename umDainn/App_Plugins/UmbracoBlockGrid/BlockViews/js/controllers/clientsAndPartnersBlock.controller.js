angular.module("umbraco").controller("clientsAndPartnersBlockController", function ($scope, globalDesignService, editorState, licensesService) {
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

			.h2 { color: #${design.baselineColors.content.h2}; ${getFontStyles('h2')} }

            .section-clients {
				font-family: ${design.typography.text.font.fontFamily};
                color: #${design.baselineColors.content.text};
                ${getFontStyles('text')}
            }
        `
	});
}); 