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
        vm.refreshAll = refreshAll;

        (function _init() {
            refreshAll();
        })();

        function refreshAll() {
            dataService.getAllDeviceCount()
                .then(function (data) {
                    vm.devices = data;
                    vm.devices.map(function (device) {
                        vm.totalEntryCount += device.EntryCount;
                        vm.totalExitCount += device.ExitCount;
                        vm.totalOccupantCount += device.OccupantCount;
                    });
                });
        }
    }
})();