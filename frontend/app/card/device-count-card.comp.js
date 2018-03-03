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

    Controller.$inject = ['dataService']

    function Controller(dataService)
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
            dataService.GetDeviceCount(vm.DeviceId)
                .then(function (data) {
                    vm.EntryCount = data.EntryCount;
                    vm.ExitCount = data.ExitCount;
                    vm.OccupantCount = data.OccupantCount;
                });
        }
    }
})();