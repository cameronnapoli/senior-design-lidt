(function () {
    'use strict';
    angular.module('lidt')
        .component('lineChart', {
            templateUrl: 'chart/line/line-chart.tpl.html',
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
        //vm.refresh = refresh;

        (function _init() {
            vm.labels = chartLabelConst.HOUR;
            dataService.getAllDeviceCountHistory(9999, 'day', '2018-03-13')
                .then(function (devices) {
                    for (var device in devices)
                    {
                        if (device === '$promise')
                        {
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

        //function onChangeTimeframe(option) {
        //    switch (option.mode)
        //    {
        //        case '5 minute':    vm.
        //            break;
        //        case '15 minute':
        //            break;
        //        case '30 minute':
        //            break;
        //        case '1 hr':
        //            break;
        //        case '6 hr':
        //            break;
        //        case '1 day':
        //            break;
        //        case '30 day':
        //            break;
        //    }
        //}
    }
})();