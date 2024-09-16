angular.module("umbraco").controller("carouselBlockController", function ($scope) {
    $scope.changeSlide = function (slideAction, $event) {
        const button = $event.currentTarget;
        const carouselElement = button.closest('.carousel');
        const carousel = bootstrap.Carousel.getOrCreateInstance(carouselElement);

        if (slideAction === 'next') {
            carousel.next();
        } else {
            carousel.prev();
        }
    };
});