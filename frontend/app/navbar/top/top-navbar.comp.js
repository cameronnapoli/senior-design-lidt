(function () {
    'use strict';
    angular.module('lidt')
        .component('topNavbar', {
            templateUrl: 'navbar/top/top-navbar.tpl.html',
            controllerAs: 'vm',
            controller: Controller
        });

    Controller.$inject = ['DataService']

    function Controller(DataService) {
        var vm = this;
        vm.devices = [];
        vm.isCollapsed = true;

        (function _init() {
            //DataService.GetAllClientDevices(clientId)
            //    .then(function (devices) {
            //        vm.devices = devices;
            //    });
        })();

        function onSelect(device) {
            vm.devices.push(device);
        }

        function logout()
        {

        }
    }
})();