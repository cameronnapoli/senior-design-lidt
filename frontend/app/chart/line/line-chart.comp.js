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

    Controller.$inject = ['DataService']

    function Controller(DataService)
    {
        var vm = this;
        vm.refresh = refresh;

        (function _init() {
            refresh();
        })();

        function refresh() {
            //DataService.GetDeviceCount(vm.deviceId)
            //    .then(function (data) {
            //    });
            vm.labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
            vm.data = [
                [65, 59, 80, 81, 56, 55, 40],
                [28, 48, 40, 19, 86, 27, 90]
            ];
            vm.series = ['Series A', 'Series B'];
            vm.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
            vm.options = {
                scales: {
                    yAxes: [
                        {
                            id: 'y-axis-1',
                            type: 'linear',
                            display: true,
                            position: 'left'
                        },
                        {
                            id: 'y-axis-2',
                            type: 'linear',
                            display: true,
                            position: 'right'
                        }
                    ]
                }
            };
        }
    }
})();