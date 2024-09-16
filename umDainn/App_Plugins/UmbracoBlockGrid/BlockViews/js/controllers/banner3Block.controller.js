angular.module("umbraco").controller("banner3BlockController", function ($scope, eventsService, globalDesignService, licensesService, editorState, $element, assetsService, $timeout) {
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

    assetsService.loadCss("https://fonts.googleapis.com/css2?family=Inconsolata:wght@500&display=swap", $scope, 10000).then(function () {
        setTimeout(() => {

            console.log()

            function makeCircleText() {
                if ($element) {
                    const chars = $scope.block.data.circleText.split("");
                    const radius = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--radius'), 10);
                    const circumference = 2 * Math.PI * radius;
                    const fontSize = circumference / chars.length / 2;
                    const extraSpace = 10;
                    const angle = (360 - extraSpace) / chars.length;

                    $element[0].querySelector('.circle-text p').innerHTML = chars
                        .map(
                            (char, i) =>
                                `<span style="transform:rotate(${i * angle + extraSpace / 2}deg); font-size:${fontSize}px;">${char}</span>`
                        )
                        .join("");
                }

            }

            makeCircleText();

            var unsubscribe = eventsService.on("appState.editors.close", function (event, args) {
                if (args.editor?.content?.contentTypeAlias == 'banner3Block') {
                    $scope.renderSlides = false;
                    $scope.renderSlides = true;
                    $timeout(function () {
                        makeCircleText();
                    }, 10);
                }
            });

            $scope.$on("$destroy", function () {
                unsubscribe();
            });
        }, 100);
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
                .banner-3{
                    font-family: ${design.typography.text.font.fontFamily};
                    color: #${design.baselineColors.content.text};
                    ${getFontStyles('text')};
                }
                
                .border-radius{
                    border-radius: ${design.cornerRadius.picturesAndVideo}px;
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