(function () {
    'use strict';
    angular.module('lidt')
        .component('deviceCountCard', {
            templateUrl: 'card/device-count-card.tpl.html',
            controllerAs: 'vm',
            controller: Controller,
            bindings: {
                isMaster: '<',
                deviceId: '@?',

                entryCount: '=?',
                exitCount: '=?',
            }
        });

    Controller.$inject = ['dataService']

    function Controller(dataService)
    {
        var vm = this;
        vm.refresh = refresh;
        vm.occupantCount = 0;

        (function _init() {
            if (!(vm.entryCount && vm.exitCount && vm.occupantCount))
            {
                refresh();
            }
        });

        function refresh() {
            dataService.getDeviceCount(vm.deviceId)
                .then(function (device) {
                    vm.entryCount = device[0].Entries;
                    vm.exitCount = device[0].Exits;
                    vm.OccupantCount = vm.entryCount - vm.exitCount;
                });
        }
    }
})();