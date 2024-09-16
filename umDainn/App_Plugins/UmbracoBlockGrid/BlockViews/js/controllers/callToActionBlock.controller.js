angular.module("umbraco").controller("callToActionBlockController", function ($scope, globalDesignService, editorState) {
    $scope.styles = ``;

    globalDesignService.getDesignSettings(editorState.getCurrent().id).then(function (design) {
        $scope.styles = `
            .form-control{
                font-family: ${design.typography.button.font.fontFamily};
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
        `
    });
}); 