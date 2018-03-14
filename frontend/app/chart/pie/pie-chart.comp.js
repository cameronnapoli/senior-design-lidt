(function () {
    'use strict';
    angular.module('lidt')
        .component('pieChart', {
            templateUrl: 'chart/pie/pie-chart.tpl.html',
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
            vm.labels = chartLabelConst.HOUR;
            dataService.getAllDeviceCountHistory(9999, 'day', '2018-03-13')
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