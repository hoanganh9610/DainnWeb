angular.module("umbraco").controller("headerBlockController", function ($scope, globalDesignService, editorState) {

    globalDesignService.sortAndWatch('headerLinks', $scope);
    globalDesignService.sortAndWatch('headerButtons', $scope);

    $scope.websiteName = globalDesignService.getProperty("website", "websiteName", editorState.getCurrent()).value;

    globalDesignService.getDesignSettings(editorState.getCurrent().id).then(function (design) {
        const getFontStyles = (elementType) => {
            return `  
                font-size: ${design.typography[elementType].desktop}px;  
                font-family: ${design.typography[elementType].font.fontFamily}, ${design.typography[elementType].font.fontCategory};  
                font-weight: ${design.typography[elementType].font.fontWeight};  
                font-style: ${design.typography[elementType].font.fontStyle};  
            `;
        };

        $scope.headerOption = design.header;

        $scope.styles = `
            .headerBlock { ${getFontStyles('text')} }
            .headerBlock h1, headerBlock .h1 { color: var(--card-bright-contrast, #${design.baselineColors.content.h1}); ${getFontStyles('h1')} }  
            .headerBlock div p { color: var(--card-bright-contrast, #${design.baselineColors.content.text}); }
           

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

            .navbar { 
                background-color: #${design.baselineColors.header.background} !important;
                --bs-navbar-color: #${design.baselineColors.header.link};
                --bs-navbar-hover-color: #${design.baselineColors.header.linkHover};
                color: #${design.baselineColors.header.link};
            }
            .dropdown-menu {
                --bs-dropdown-bg: #${design.baselineColors.header.dropdownBackground};
                --bs-dropdown-link-hover-bg: #${design.baselineColors.header.dropdownBackgroundHover}; 
                --bs-dropdown-link-active-bg: #${design.baselineColors.header.dropdownBackgroundHover};
            }
            .dropdown-item {
                --bs-dropdown-link-color: #${design.baselineColors.header.link};
                --bs-dropdown-link-hover-color: #${design.baselineColors.header.linkHover};
                --bs-dropdown-link-active-color: #${design.baselineColors.header.linkHover};
            }
        `
    });
});  
