(function () {
    'use strict';
    angular.module('lidt')
        .component('registerUserForm', {
            templateUrl: 'form/register-user/register-user-form.tpl.html',
            controllerAs: 'vm',
            controller: Controller,
            bindings: {
            }
        });

    Controller.$inject = ['dataService']

    function Controller(dataService) {
        var vm = this;
        vm.submit = submit;

        function submit(form) {
            dataService.addDevice(form)
                .then(function (response) {
                    toastr.success('User ' + response.userId + ' has been registered!', 'SUCCESS');
                }, function (error) {
                    toastr.error('Something went wrong.', 'ERROR');
                });
        }
    }
})();