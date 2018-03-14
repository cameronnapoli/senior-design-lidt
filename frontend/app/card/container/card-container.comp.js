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
        vm.clientId = 9999;

        vm.refreshAll = refreshAll;

        (function _init() {
            refreshAll();
        })();

        function refreshAll() {
            vm.totalEntryCount = 0;
            vm.totalExitCount = 0;
            vm.totalOccupantCount = 0;
            vm.totalAvailableCount = 0;
            dataService.getAllClientDevices(vm.clientId)
                .then(function (data) {
                    var deviceIds = data;
                    deviceIds.map(function (deviceId) {
                        dataService.getDeviceCount(deviceId)
                            .then(function(device) {
                                var currentDevice = vm.devices.find(function(existingDevice)
                                    {
                                        return existingDevice.DeviceId = device[0].DeviceId;
                                    });
                                if (currentDevice)
                                {
                                    currentDevice.Entries = device[0].Entries;
                                    currentDevice.Exits = device[0].Exits;
                                }
                                else
                                {
                                    vm.devices.push(device[0]);
                                }
                                vm.totalEntryCount += device[0].Entries;
                                vm.totalExitCount += device[0].Exits;
                            });
                    });
                    vm.totalOcuupantCount = vm.totalEntryCount - vm.totalExitCount;
                    vm.totalAvailableCount = data.AvailableCount - vm.totalOccupantCount;
                });
        }
    }
})();