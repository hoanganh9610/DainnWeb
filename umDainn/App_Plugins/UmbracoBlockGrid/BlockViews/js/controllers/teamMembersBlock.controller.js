angular.module("umbraco").controller("teamMembersBlockController", function ($scope, eventsService, globalDesignService, licensesService, editorState, $element, $timeout, assetsService) {
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

    $scope.renderSlides = true;
    assetsService.loadJs("~/App_Plugins/UmbracoBlockGrid/BlockViews/js/libraries/swiper-bundle.min.js", $scope, { charset: 'utf-8' }, 10000).then(function () {

        $timeout(function () {
            if ($element) {
                function initializeSwiper() {
                    const swiperElement = $element[0].querySelector('.swiper-team-members');

                    console.log($element[0])
                    if (swiperElement) {
                        new Swiper(swiperElement, {
                            allowTouchMove: false,
                            centeredSlides: true,
                            slidesPerView: 1,
                            watchOverflow: true,
                            watchSlidesProgress: true,
                            centeredSlidesBounds: true,
                            spaceBetween: 24,
                            speed: 500,
                            pagination: {
                                el: '.swiper-pagination',
                            },
                            speed: 500,
                            navigation: {
                                nextEl: $element[0].querySelector('.swiper-button-next'),
                                prevEl: $element[0].querySelector('.swiper-button-prev')
                            },
                            breakpoints: {
                                575: {
                                    slidesPerView: 'auto',
                                },
                            },
                        });
                    }
                }


                initializeSwiper();

                // var unsubscribe = eventsService.on("appState.editors.close", function (event, args) {
                //     if (args.editor?.content?.contentTypeAlias == 'clientReviewBlock') {
                //         $scope.renderSlides = false;
                //         $scope.renderSlides = true;
                //         $timeout(function () {

                //             initializeSwiper();
                //         }, 10);
                //     }
                // });

                // $scope.$on("$destroy", function () {
                //     unsubscribe();
                // });


            }
        }, 0);
    });

    $scope.styles = ``;

    // globalDesignService.sortAndWatch('clientReviews', $scope);

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

            .team-members {
                font-family: ${design.typography.text.font.fontFamily};
                color: #${design.baselineColors.content.text};
                ${getFontStyles('text')}
            }

            .team-members .h2{ 
                ${getFontStyles('h2')}
                color: #${design.baselineColors.content.h2};
            }

            .team-members .h4{ 
                ${getFontStyles('h4')}
                color: #${design.baselineColors.content.h4};
            }
            p a { --bs-link-color-rgb: ${globalDesignService.hexToRgb(design.baselineColors.content.link).rgbString}; }
            p a:hover { --bs-link-hover-color-rgb: ${globalDesignService.hexToRgb(design.baselineColors.content.linkHover).rgbString}; }
        `
    });
});


