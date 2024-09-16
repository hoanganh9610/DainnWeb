angular.module('umbraco.resources').factory('formsDataResource',
    function ($http, umbRequestHelper) {
        return {
            getEmailInputFieldFormData: function (siteId) {
                return umbRequestHelper.resourcePromise(
                    $http.get("backoffice/ByteEditor/FormsDataApi/GetEmailInputFieldFormData", {
                        params: { siteId: siteId }
                    }),
                    "Failed to get data");
            },
            getContactUsFormData: function (siteId) {
                return umbRequestHelper.resourcePromise(
                    $http.get("backoffice/ByteEditor/FormsDataApi/getContactUsFormData", {
                        params: { siteId: siteId }
                    }),
                    "Failed to get data");
            },
        };
    }
);

(function () {
    "use strict";

    function formsDataController(eventsService, formsDataResource, editorState, entityResource) {

        const siteRoot = editorState.getCurrent().path.split(',')[1] ?? editorState.getCurrent().parentId;
        let siteRootKey;
        var vm = this;

        vm.isLoaderShown = true;
        vm.changeTab = changeTab;

        vm.tabs = [
            {
                "alias": "formsDataTabOne",
                "label": "Email Input Field",
                "active": true
            },
            {
                "alias": "formsDataTabTwo",
                "label": "Contact Us Form"
            }
        ];

        function changeTab(selectedTab) {
            vm.tabs.forEach(function (tab) {
                tab.active = false;
            });
            selectedTab.active = true;
        };

        entityResource.getById(siteRoot, "Document")
            .then(function (ent) {
                siteRootKey = ent.key;
                formsDataResource.getEmailInputFieldFormData(siteRootKey)
                    .then(function (response) {
                        vm.emailInputFieldFormData = angular.fromJson(response);
                    })
                    .catch(function (error) {
                        console.error('Error', error);
                    })
                    .finally(function () {
                        vm.isLoaderShown = false;
                    });
            });

        eventsService.on("app.tabChange", function (name, args) {
            if (args?.tab?.alias == 'formsDataTabTwo') {
                if (!vm.contactUsFormData) {
                    vm.isLoaderShown = true;
                    formsDataResource.getContactUsFormData(siteRootKey)
                        .then(function (response) {
                            vm.contactUsFormData = angular.fromJson(response);
                        })
                        .catch(function (error) {
                            console.error('Error', error);
                        })
                        .finally(function () {
                            vm.isLoaderShown = false;
                        });
                }
            }
        });
    }

    angular.module("umbraco").controller("formsDataController", formsDataController);
})();