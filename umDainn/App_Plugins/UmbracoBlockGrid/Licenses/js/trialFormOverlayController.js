(function () {
    'use strict';
    function trialFormOverlayController($scope, $element, contentDashboardResource, licensesService, editorState, contentResource, notificationsService) {

        var vm = this;
        const memberModel = {};

        vm.onChange = onChange;
        function onChange(event) {
            memberModel.email = event.target.value;
        }

        $scope.model.process = process;
        function process() {
            const forms = $element.find('.license-form');
            if (forms.length > 0) {
                if (!forms[0].checkValidity()) {
                    const inputs = forms.find('uui-input');
                    inputs.each(function () {
                        $(this)[0].pristine = false;
                    });
                    return;
                }

                $scope.model.submitButtonState = 'busy';
                $scope.model.disableSubmitButton = true;
            }

            contentDashboardResource.trialFormSubmit(memberModel)
                .then(function (response) {
                    console.log('Success!', response);

                    contentResource.publishById(editorState.getCurrent().id, [])
                        .then(function (content) {
                            notificationsService.success('Content published', 'and is visible on the website')
                            console.log('Content published: and is visible on the website');
                        });
                    licensesService.invalidateCachedData();
                    $scope.model.close();
                })
                .catch(function (error) {
                    console.error('Error', error);
                    $scope.model.submitButtonState = 'init';
                    $scope.model.disableSubmitButton = false;
                })
        }
    }

    angular.module('umbraco').controller('trialFormOverlayController', trialFormOverlayController);
})();