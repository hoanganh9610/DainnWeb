angular.module("umbraco").controller("clientReviewBlockController", function ($scope, eventsService, globalDesignService, licensesService, editorState, $element, $timeout, assetsService) {
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
                const slides = $element[0].querySelectorAll('.swiper-reviews .swiper-slide');
                const slidesCount = slides.length;

                function duplicateSlides() {
                    if (slidesCount > 0 && slidesCount < 10) {
                        const swiperContainer = $element[0].querySelector('.swiper-reviews .swiper-wrapper');

                        for (let i = 0; i < 10 - slidesCount; i++) {
                            if (slides[i]) {
                                const clonedSlide = slides[i].cloneNode(true);
                                swiperContainer.appendChild(clonedSlide);
                            }
                        }
                    }
                }

                function initializeSwiper() {
                    const swiperElement = $element[0].querySelector('.swiper-reviews');
                    if (swiperElement) {
                        new Swiper(swiperElement, {
                            allowTouchMove: false,
                            centeredSlides: true,
                            slidesPerView: 1,
                            watchOverflow: true,
                            watchSlidesProgress: true,
                            loop: true,
                            spaceBetween: 24,
                            pagination: {
                                el: '.swiper-pagination',
                            },
                            speed: 500,
                            navigation: {
                                nextEl: $element[0].querySelector('.swiper-reviews .swiper-button-next'),
                                prevEl: $element[0].querySelector('.swiper-reviews .swiper-button-prev')
                            },
                            breakpoints: {
                                450: {
                                    slidesPerView: 'auto',
                                },
                            },
                        });
                    }
                }

                // duplicateSlides();
                initializeSwiper();

                var unsubscribe = eventsService.on("appState.editors.close", function (event, args) {
                    if (args.editor?.content?.contentTypeAlias == 'clientReviewBlock') {
                        $scope.renderSlides = false;
                        $scope.renderSlides = true;
                        $timeout(function () {
                            // duplicateSlides();
                            initializeSwiper();
                        }, 10);
                    }
                });

                $scope.$on("$destroy", function () {
                    unsubscribe();
                });
            }
        }, 0);
    });

    $scope.styles = ``;

    globalDesignService.sortAndWatch('clientReviews', $scope);

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

            .section-review{
                font-family: ${design.typography.text.font.fontFamily};
                color: #${design.baselineColors.content.text};
                ${getFontStyles('text')}
            }
            .section-review .h2{
                color: #${design.baselineColors.content.h2};
            }
            .section-review h2,
            .carousel-item .h2 { ${getFontStyles('h2')}  }
            .carousel-item:not([bright-contrast]) h2,
            .carousel-item:not([bright-contrast]) .h2 { color: #${design.baselineColors.content.h2}; }
            .carousel-item .content-holder { color: #${design.baselineColors.content.text}; ${getFontStyles('text')} }
            .carousel-item .content-holder h1 { color: #${design.baselineColors.content.h1}; ${getFontStyles('h1')} }  
            .carousel-item .content-holder h2 { color: #${design.baselineColors.content.h2}; ${getFontStyles('h2')} }  
            .carousel-item .content-holder h3 { color: #${design.baselineColors.content.h3}; ${getFontStyles('h3')} }  
            .carousel-item .content-holder h4 { color: #${design.baselineColors.content.h4}; ${getFontStyles('h4')} }  
            .carousel-item .content-holder h5 { color: #${design.baselineColors.content.h5}; ${getFontStyles('h5')} }  
            .carousel-item .content-holder h6 { color: #${design.baselineColors.content.h6}; ${getFontStyles('h6')} }
            .carousel-item .client-name {
                font-size: ${design.typography['h6'].desktop}px;  
                font-family: ${design.typography['h6'].font.fontFamily}, ${design.typography['h6'].font.fontCategory};  
                font-style: ${design.typography['h6'].font.fontStyle};
            }
            p a { --bs-link-color-rgb: ${globalDesignService.hexToRgb(design.baselineColors.content.link).rgbString}; }
            p a:hover { --bs-link-hover-color-rgb: ${globalDesignService.hexToRgb(design.baselineColors.content.linkHover).rgbString}; }
        `
    });
});