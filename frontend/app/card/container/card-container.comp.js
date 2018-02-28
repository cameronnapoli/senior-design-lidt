(function () {
    'use strict';
    angular.module('lidt')
        .component('cardContainer', {
            templateUrl: 'card/container/card-container.tpl.html',
            controllerAs: 'vm',
            controller: Controller
        });

    Controller.$inject = ['DataService']

    function Controller(DataService) {
        var vm = this;
        vm.devices = [];

        (function _init() {
            vm.devices.push({ ID: "a" });
            vm.devices.push({ ID: "b" });
            vm.devices.push({ ID: "c" });
        })();

        function addDevice(deviceId) {
            vm.devices.push(deviceId);
        }
    }
})();