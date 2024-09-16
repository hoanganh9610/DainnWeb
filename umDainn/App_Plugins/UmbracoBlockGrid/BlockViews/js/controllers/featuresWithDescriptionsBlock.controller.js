angular.module("umbraco").controller("featuresWithDescriptionsBlockController", function ($scope, globalDesignService, editorState) {
    $scope.styles = ``;



    globalDesignService.sortAndWatch('items', $scope);

    globalDesignService.getDesignSettings(editorState.getCurrent().id).then(function (design) {

        const getFontStyles = (elementType) => {
            return `  
                font-size: ${design.typography[elementType].desktop}px;  
                font-family: ${design.typography[elementType].font.fontFamily}, ${design.typography[elementType].font.fontCategory};  
                font-weight: ${design.typography[elementType].font.fontWeight};  
                font-style: ${design.typography[elementType].font.fontStyle};  
            `;
        };

        $scope.selectedBackground = design.baselineColors.background;
        $scope.styles = `  
			.features-with-descriptions{
			 	font-family: ${design.typography.text.font.fontFamily};
                color: #${design.baselineColors.content.text};
                ${getFontStyles('text')}
			}

            .features-with-descriptions .h2{
             color: #${design.baselineColors.content.h2};
                font-size: ${design.typography.h2.desktop}px;
                line-height: ${design.typography.h2.desktop}px;
                font-family: ${design.typography.h2.font.fontFamily}, ${design.typography.h2.font.fontCategory};
                font-weight: ${design.typography.h2.font.fontWeight};
                font-style: ${design.typography.h2.font.fontStyle};}


            .border-radius{
                border-radius: ${design.cornerRadius.picturesAndVideo}px;
            }

			.features-with-descriptions{
				color: #${design.baselineColors.content.h2};
                font-size: ${design.typography.h2.desktop}px;
                line-height: ${design.typography.h2.desktop}px;
                font-family: ${design.typography.h2.font.fontFamily}, ${design.typography.h2.font.fontCategory};
                font-weight: ${design.typography.h2.font.fontWeight};
                font-style: ${design.typography.h2.font.fontStyle};
			}

            .accordion-item {
                font-family: ${design.typography.text.font.fontFamily};
                color: #${design.baselineColors.content.text};
                ${getFontStyles('text')}
            }

            .accordion-button{
                font-family: ${design.typography.text.font.fontFamily};
                color: #${design.baselineColors.content.text};
                ${getFontStyles('text')}
            }

            .accordion-body{
                font-family: ${design.typography.text.font.fontFamily};
                color: #${design.baselineColors.content.text};
                ${getFontStyles('text')}
            }

            .features-with-descriptions .h4{
                color: #${design.baselineColors.content.h4};  
                font-size: ${design.typography.h4.desktop}px;  
                line-height: ${design.typography.h4.desktop}px;  
                font-family: ${design.typography.h4.font.fontFamily}, ${design.typography.h4.font.fontCategory};  
                font-weight: ${design.typography.h4.font.fontWeight};  
                font-style: ${design.typography.h4.font.fontStyle};  
            }

            .lead-lg{
                font-size: ${design.typography.text.desktop + 4}px;  
            }

            .lead-md{
                font-size: ${design.typography.text.desktop}px;  
            }

            .lead-sm{
                font-size: ${design.typography.text.desktop - 2}px;  
            }

            .accordion-body h1 {
                color: #${design.baselineColors.content.h1}; 
                font-size: ${design.typography.h1.desktop}px;
                line-height: ${design.typography.h1.desktop}px;
                font-family: ${design.typography.h1.font.fontFamily}, ${design.typography.h1.font.fontCategory};
                font-weight: ${design.typography.h1.font.fontWeight};
                font-style: ${design.typography.h1.font.fontStyle};
            }  
            .accordion-body h2 {
                color: #${design.baselineColors.content.h2};
                font-size: ${design.typography.h2.desktop}px;
                line-height: ${design.typography.h2.desktop}px;
                font-family: ${design.typography.h2.font.fontFamily}, ${design.typography.h2.font.fontCategory};
                font-weight: ${design.typography.h2.font.fontWeight};
                font-style: ${design.typography.h2.font.fontStyle};
            }  
            .accordion-body h3 {
                color: #${design.baselineColors.content.h3};  
                font-size: ${design.typography.h3.desktop}px;  
                line-height: ${design.typography.h3.desktop}px;  
                font-family: ${design.typography.h3.font.fontFamily}, ${design.typography.h3.font.fontCategory};  
                font-weight: ${design.typography.h3.font.fontWeight};  
                font-style: ${design.typography.h3.font.fontStyle};  
            }  
            .accordion-body h4 {  
                color: #${design.baselineColors.content.h4};  
                font-size: ${design.typography.h4.desktop}px;  
                line-height: ${design.typography.h4.desktop}px;  
                font-family: ${design.typography.h4.font.fontFamily}, ${design.typography.h4.font.fontCategory};  
                font-weight: ${design.typography.h4.font.fontWeight};  
                font-style: ${design.typography.h4.font.fontStyle};  
            }  
            .accordion-body h5 {  
                color: #${design.baselineColors.content.h5};  
                font-size: ${design.typography.h5.desktop}px;  
                line-height: ${design.typography.h5.desktop}px;  
                font-family: ${design.typography.h5.font.fontFamily}, ${design.typography.h5.font.fontCategory};  
                font-weight: ${design.typography.h5.font.fontWeight};  
                font-style: ${design.typography.h5.font.fontStyle};  
            }  
            .accordion-body h6 {  
                color: #${design.baselineColors.content.h6};  
                font-size: ${design.typography.h6.desktop}px;  
                line-height: ${design.typography.h6.desktop}px;  
                font-family: ${design.typography.h6.font.fontFamily}, ${design.typography.h6.font.fontCategory};  
                font-weight: ${design.typography.h6.font.fontWeight};  
                font-style: ${design.typography.h6.font.fontStyle};  
            }  
            div a { color: rgb(${globalDesignService.hexToRgb(design.baselineColors.content.link).rgbString}); }
            div a:hover { color: rgb(${globalDesignService.hexToRgb(design.baselineColors.content.linkHover).rgbString}); }
        `
    });
    $scope.toggleCurrentCollapse = function ($event, udi, currentIndex) {
        const button = $event.target;
        const accordionElement = button.closest('.accordion');
        const collapseElementList = accordionElement.querySelectorAll('.collapse');
        const buttonList = accordionElement.querySelectorAll('.accordion-button');

        collapseElementList.forEach((collapse, index) => {
            const currentButton = buttonList[index];
            const bsCollapse = new bootstrap.Collapse(collapse, {
                toggle: false
            });

            if (index === currentIndex) {
                bsCollapse.toggle();
                currentButton.classList.toggle('collapsed');
                currentButton.setAttribute('aria-expanded', currentButton.classList.contains('collapsed') ? 'false' : 'true');

                if (currentButton.classList.contains('collapsed')) {
                    setCurrentIndex(udi, null);
                } else {
                    setCurrentIndex(udi, currentIndex);
                }
            } else {
                bsCollapse.hide();
                currentButton.classList.add('collapsed');
                currentButton.setAttribute('aria-expanded', 'false');
            }
        });
    };

    $scope.getCurrentIndex = function (udi) {
        return localStorage.getItem(udi);
    };

    function setCurrentIndex(udi, index) {
        localStorage.setItem(udi, index);
    }
}); 