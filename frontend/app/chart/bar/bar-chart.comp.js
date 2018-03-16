(function () {
    'use strict';
    angular.module('lidt')
        .component('barChart', {
            templateUrl: 'chart/bar/bar-chart.tpl.html',
            controllerAs: 'vm',
            controller: Controller,
            bindings: {
                Id: '@'
            }
        });

    Controller.$inject = ['dataService', 'chartLabelConst']

    function Controller(dataService, chartLabelConst)
    {
        var vm = this;
        vm.data = [];
        vm.series = [];

        (function _init() {
            var today = (new Date().toISOString()).substring(0, 10);
            vm.labels = chartLabelConst.HOUR;
            dataService.getAllDeviceCountHistory(9999, 'day', today)
                .then(function (devices) {
                    for (var device in devices) {
                        if (device === '$promise') {
                            break;
                        }
                        vm.data.push(devices[device]);
                        vm.series.push('Device ' + device);
                    }
                });
            vm.options = {
                height: 800,
                width: 800,
                scales: {
                    xAxes: {
                        type: 'linear',
                        display: true,
                        position: 'left'
                    },
                    yAxes: {
                        type: 'linear',
                        display: true,
                        position: 'left'
                    }
                }
            };
        })();
    }
})();