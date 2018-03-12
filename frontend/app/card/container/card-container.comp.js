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
        vm.refreshAll = refreshAll;

        (function _init() {
            refreshAll();
            //vm.devices.push({ ID: 'a', EntryCount: 5, ExitCount: 5});
            //vm.devices.push({ ID: 'b', EntryCount: 5, ExitCount: 5});
            //vm.devices.push({ ID: 'c', EntryCount: 5, ExitCount: 5});
            //vm.devices.push({ ID: 'd', EntryCount: 5, ExitCount: 5});
            //vm.devices.push({ ID: 'e', EntryCount: 5, ExitCount: 5});
            //vm.devices.push({ ID: 'f', EntryCount: 5, ExitCount: 5});
            //vm.devices.push({ ID: 'g', EntryCount: 5, ExitCount: 5});
            //vm.devices.push({ ID: 'h', EntryCount: 5, ExitCount: 5});
            //vm.devices.push({ ID: 'j', EntryCount: 5, ExitCount: 5});
            //vm.devices.push({ ID: 'k', EntryCount: 5, ExitCount: 5});
            //vm.devices.push({ ID: 'l', EntryCount: 5, ExitCount: 5});
        })();

        function refreshAll() {
            dataService.getAllClientDevices(1)
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