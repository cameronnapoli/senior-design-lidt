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
            dataService.GetDeviceCount(vm.DeviceId)
                .then(function (data) {
                    vm.entryCount = data.EntryCount;
                    vm.exitCount = data.ExitCount;
                    vm.OccupantCount = vm.EntryCount - vm.ExitCount;
                });
        }
    }
})();