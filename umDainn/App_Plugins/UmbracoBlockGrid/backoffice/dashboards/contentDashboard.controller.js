angular.module('umbraco.resources').factory('contentDashboardResource',
    function ($http, umbRequestHelper) {
        return {
            isTrialFormSubmitted: function () {
                return umbRequestHelper.resourcePromise(
                    $http.get("backoffice/ContentDashboard/ContentDashboardApi/IsTrialFormSubmitted"),
                    "Failed to get data");
            },
            checkLicense: function () {
                return umbRequestHelper.resourcePromise(
                    $http.get("backoffice/ContentDashboard/ContentDashboardApi/CheckLicense"),
                    "Failed to get data");
            },
            trialFormSubmit: function (model) {
                return umbRequestHelper.resourcePromise(
                    $http.post("backoffice/ContentDashboard/ContentDashboardApi/TrialFormSubmit", model),
                    "Failed to submit the form");
            },
            getSubscriptionsInfo: function () {
                return $http.get("backoffice/api/ManageSitesApi/GetSubscriptionsInfo");
            }
        };
    }
);
angular.module("umbraco").controller("contentDashboardController", function ($scope, assetsService, tourService, contentDashboardResource) {

    $scope.isMultisiteSetup = Umbraco.Sys.ServerVariables.byteEditor.isMultisiteSetup;
    $scope.isSubmitted = false;
    $scope.isTrial = false;
    $scope.daysLeft = 0;
    $scope.isLoaderShown = true;
    $scope.isSubscriptionsLoaderShown = true;
    $scope.tours = [];
    $scope.subscriptions = [];

    $scope.startTour = startTour;
    $scope.getTourGroupCompletedPercentage = getTourGroupCompletedPercentage;
    $scope.showTourButton = showTourButton;

    assetsService.loadCss('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap', null, 10000).then(function () { });

    function startTour(tour) {
        tourService.startTour(tour);
    }

    tourService.getGroupedTours().then(function (groupedTours) {
        $scope.tours = groupedTours;
        getTourGroupCompletedPercentage();
    });

    var currentTour = tourService.getCurrentTour();

    if (currentTour) {
        openTourGroup(currentTour.alias);
    }

    function showTourButton(index, tourGroup) {
        if (index !== 0) {
            var prevTour = tourGroup.tours[index - 1];
            if (prevTour.completed) {
                return true;
            }
        } else {
            return true;
        }
    }

    function openTourGroup(tourAlias) {
        $scope.tours.forEach(function (group) {
            group.tours.forEach(function (tour) {
                if (tour.alias === tourAlias) {
                    group.open = true;
                }
            });
        });
    }

    function getTourGroupCompletedPercentage() {
        $scope.tours.forEach(function (group) {
            var completedTours = 0;
            group.tours.forEach(function (tour) {
                if (tour.completed) {
                    completedTours++;
                }
            });
            group.completedPercentage = Math.round((completedTours / group.tours.length) * 100);
        });
    }


    contentDashboardResource.isTrialFormSubmitted()
        .then(function (response) {
            //console.log('Success!', response);
            const { isSubmitted, selServerUrl } = angular.fromJson(response);
            $scope.isSubmitted = isSubmitted;
            $scope.selServerAnchor = document.createElement('a');
            $scope.selServerAnchor.href = selServerUrl;

            if (isSubmitted) {
                contentDashboardResource.checkLicense()
                    .then(function (response) {
                        $scope.license = angular.fromJson(response);
                        $scope.daysLeft = moment($scope.license.DateEnd).diff(moment(), "days");
                    })
                    .catch(function (error) {
                        console.error('Error', error);
                    })
            }
        })
        .catch(function (error) {
            console.error('Error', error);
        })
        .finally(function () {
            $scope.isLoaderShown = false;
        });

    if ($scope.isMultisiteSetup) {
        contentDashboardResource.getSubscriptionsInfo()
            .then(function (response) {
                $scope.subscriptions = angular.fromJson(response.data);
            }).catch(function (e) {
                console.error('Error', e);
            }).finally(function () {
                $scope.isSubscriptionsLoaderShown = false;
            });
    }

    $scope.getSubscriptionStatus = function (subscription) {
        var endDate = moment(subscription.CurrentPeriodEnd);
        var daysLeft = endDate.diff(moment(), 'days');
        var dayText = daysLeft === 1 ? 'day' : 'days';

        if (subscription.Status === 'Trial') {
            return 'Trial is active. Expires in ' + daysLeft + ' ' + dayText + '.';
        }

        if (subscription.Status === 'Active') {
            return 'Active. Renewal in ' + daysLeft + ' ' + dayText + '.';
        }

        return subscription.Status;
    }
});