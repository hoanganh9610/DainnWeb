angular.module("umbraco").factory("licensesService", function ($http, $q, eventsService, overlayService) {

    eventsService.on("content.saving", function (event, args) {
        if (["blockGrid"].includes(args?.content?.contentTypeAlias)) {
            console.log("content.saving - " + args?.content?.contentTypeAlias);

            checkTrialForm().then(function (isSubmitted) {
                if (!isSubmitted) {
                    const overlay = {
                        view: '/App_Plugins/UmbracoBlockGrid/Licenses/trialFormOverlay.html',
                        title: 'Thank you for choosing ByteEditor page builder!',
                        disableBackdropClick: true,
                        disableEscKey: true,
                        submitButtonLabel: 'Confirm',
                        submit: function (model) {
                            model.process();
                        },
                        close: function () {
                            overlayService.close();
                        }
                    };
                    overlayService.open(overlay)
                }
            });
        }
    });

    let cache = {};

    function requestData(url, cacheKey) {
        if (cache[cacheKey] !== undefined) {
            return $q.resolve(cache[cacheKey]);
        } else if (cache[`${cacheKey}Promise`]) {
            return cache[`${cacheKey}Promise`];
        }

        let deferred = $q.defer();
        cache[`${cacheKey}Promise`] = deferred.promise;

        $http.get(url)
            .then(function (response) {
                cache[cacheKey] = response.data;
                deferred.resolve(cache[cacheKey]);
                delete cache[`${cacheKey}Promise`];
            }, function (error) {
                deferred.resolve(false);
                delete cache[`${cacheKey}Promise`];
            });
        return deferred.promise;
    }

    function checkLicense() {
        return requestData('backoffice/ContentDashboard/ContentDashboardApi/CheckLicense', 'checkLicense')
            .then(function (data) {
                return data.IsValid;
            });
    }

    function checkTrialForm() {
        return requestData('backoffice/ContentDashboard/ContentDashboardApi/IsTrialFormSubmitted', 'checkTrialForm')
            .then(function (data) {
                return data.isSubmitted;
            });
    }

    function getNotSubmittedText() {
        return "<h3>Oops! Seems like you haven’t activated your trial yet</h3><br /><p>To activate your trial license, please feel in the form on the Content tab. </p> <a href='/umbraco#/content' class='btn-activate'>Activate</a>";
    }

    function getExpiredText() {
        return "<h3 class='mb-2'>Oops! The trial period has ended!</h3>" +
            "<p class='mb-2' style='margin-top:0;'>The site builder function is currently unavailable.<br /> Please renew your access by purchasing a yearly subscription</p>on <a href='https://byteeditor.net/pricing' style='color:black;'>byteeditor.net/pricing</a>.";
    }

    function invalidateCachedData() {
        cache = {};
    }

    return {
        checkLicense: checkLicense,
        checkTrialForm: checkTrialForm,
        getNotSubmittedText: getNotSubmittedText,
        getExpiredText: getExpiredText,
        invalidateCachedData: invalidateCachedData
    };
});  
