(function () {
    'use strict';
    angular.module('lidt')
        .component('cardContainer', {
            templateUrl: 'card/container/card-container.tpl.html',
            controllerAs: 'vm',
            controller: Controller
        });

    Controller.$inject = ['dataService']

    function Controller(dataService) {
        var vm = this;
        vm.devices = [];
        vm.totalEntryCount = 0;
        vm.totalExitCount = 0;
        vm.totalOccupantCount = 0;
        vm.totalAvailableCount = 0;
        vm.clientId = 1;

        vm.refreshAll = refreshAll;

        (function _init() {
            refreshAll();
            vm.devices.push({ ID: 'a', EntryCount: 1, ExitCount: 5});
            vm.devices.push({ ID: 'b', EntryCount: 2, ExitCount: 5});
            vm.devices.push({ ID: 'c', EntryCount: 3, ExitCount: 5});
            vm.devices.push({ ID: 'd', EntryCount: 4, ExitCount: 5});
        })();

        function refreshAll() {
            dataService.getAllClientDevices(vm.clientId)
                .then(function (data) {
                    vm.devices = data;
                    vm.devices.map(function (device) {
                        vm.totalEntryCount += device.EntryCount;
                        vm.totalExitCount += device.ExitCount;
                    });
                    vm.totalOcuupantCount = vm.totalEntryCount - vm.totalExitCount;
                    vm.totalAvailableCount = data.AvailableCount - vm.totalOccupantCount;
                });
        }
    }
})();