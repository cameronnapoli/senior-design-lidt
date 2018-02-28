(function () {
    'use strict';
    angular.module('lidt')
        .component('deviceCountCard', {
            templateUrl: 'card/device-count-card.tpl.html',
            controllerAs: 'vm',
            controller: Controller,
            bindings: {
                DeviceId: '@',
                Count: '='
            }
        });

    Controller.$inject = ['DataService']

    function Controller(DataService)
    {
        var vm = this;
        vm.count = 0;
        vm.refresh = refresh;

        (function _init() {
            //refresh();
        });

        function refresh() {
            DataService.GetDeviceCount(vm.DeviceId)
                .then(function (count) {
                    vm.count = count;
                });
        }
    }
})();