(function () {
    'use strict';
    angular.module('lidt')
        .component('deviceCountCard', {
            templateUrl: 'card/device-count-card.tpl.html',
            controllerAs: 'vm',
            controller: Controller,
            bindings: {
                IsMaster: '<',
                DeviceId: '@?',

                EntryCount: '=?',
                ExitCount: '=?',
                OccupantCount: '=?'
            }
        });

    Controller.$inject = ['DataService']

    function Controller(DataService)
    {
        var vm = this;
        vm.refresh = refresh;

        (function _init() {
            if (!(vm.EntryCount && vm.ExitCount && vm.OccupantCount))
            {
                refresh();
            }
        });

        function refresh() {
            DataService.GetDeviceCount(vm.DeviceId)
                .then(function (data) {
                    vm.entryCount = data.EntryCount;
                    vm.exitCount = data.ExitCount;
                    vm.occupiedCount = data.OccupiedCount;
                });
        }
    }
})();