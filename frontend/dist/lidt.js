(function () {
    'use strict';
    angular.module('lidt', [
        'ngResource',
        'ngAnimate',
        'lidt.templates',

        //vendors
        'ui.bootstrap',
        'ui.router',
        'chart.js'
    ]);
})();
(function () {
    'use strict';
    angular.module('lidt')
        .constant('routeStateConst', routeStateConst());

    function routeStateConst() {
        return {
            DASHBOARD: 'dashboard',
            LINE_CHART: 'line_chart',
            BAR_CHART: 'bar_chart',
            PIE_CHART: 'pie_chart'
        }
    }
})();
(function () {
    'use strict';
    angular.module('lidt')
        .config(config);

    config.$inject = [
        '$stateProvider',
        '$urlRouterProvider',
        'routeStateConst'
    ];

    function config(
        $stateProvider,
        $urlRouterProvider,
        routeStateConst)
    {
        $urlRouterProvider
            .otherwise('/Dashboard');

        $stateProvider
            .state(routeStateConst.DASHBOARD, {
                url: '/Dashboard',
                template: '<card-container />'
            })
            .state(routeStateConst.BAR_CHART, {
                url: '/Chart/BarChart',
                template: "<bar-chart id='first'></line-chart>"
            })
            .state(routeStateConst.LINE_CHART, {
                url: '/Chart/LineChart',
                template: "<line-chart id='first'></line-chart>"
            })
            .state(routeStateConst.PIE_CHART, {
                url: '/Chart/PieChart',
                template: "<pie-chart id='first'></line-chart>"
            })
    }
})();
(function () {
    'use strict';
    angular.module('lidt')
        .factory('DataResource', DataResource);

    DataResource.$inject = ['$resource'];

    function DataResource($resource)
    {
        var apiUrl = '';
        return $resource(apiUrl, null, {
            getAllClientDevices: {
                method: 'GET',
                url: apiUrl + 'GetAllClientDevices',
                params: {
                    clientId: '@clientId'
                },
                cache: true
            },
            getDeviceCount: {
                method: 'GET',
                url: apiUrl + 'GetDeviceCount',
                params: {
                    deviceId: '@deviceId'
                },
                cache: true
            }
        });
    }
})();
(function () {
    'use strict';
    angular.module('lidt')
        .factory('DataService', DataService);

    DataService.$inject = ['$q', 'DataResource'];

    function DataService($q, DataResource)
    {
        return {
            GetAllClientDevices: GetAllClientDevices,
            GetDeviceCount: GetDeviceCount
        }

        function GetAllClientDevices(clientId) {
            deferred = $q.defer();

            DataResource.getAllClientDevices(clientId).$promise
                .then(function (devices) {
                    deferred.resolve(devices);
                });

            return deferred.promise;
        }

        function GetDeviceCount(deviceId) {
            deferred = $q.defer();

            DataResource.GetDeviceCount(deviceId).$promise
                .then(function (count) {
                    deferred.resolve(count);
                });

            return deferred.promise;
        }
    }
})();
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
(function () {
    'use strict';
    angular.module('lidt')
        .component('graphsContainer', {
            templateUrl: 'graph/container/graphs-container.tpl.html',
            controllerAs: 'vm',
            controller: Controller,
            bindings: {
            }
        });

    Controller.$inject = []

    function Controller() {
        var vm = this;
        
    }
})();
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
(function () {
    'use strict';
    angular.module('lidt')
        .component('cardContainer', {
            templateUrl: 'card/container/card-container.tpl.html',
            controllerAs: 'vm',
            controller: Controller
        });

    Controller.$inject = ['DataService']

    function Controller(DataService) {
        var vm = this;
        vm.devices = [];

        (function _init() {
            vm.devices.push({ ID: "a" });
            vm.devices.push({ ID: "b" });
            vm.devices.push({ ID: "c" });
        })();

        function addDevice(deviceId) {
            vm.devices.push(deviceId);
        }
    }
})();
(function () {
    'use strict';
    angular.module('lidt')
        .component('sideNavbar', {
            templateUrl: 'navbar/side/side-navbar.tpl.html',
            controllerAs: 'vm',
            controller: Controller
        });

    Controller.$inject = ['routeStateConst']

    function Controller(routeStateConst) {
        var vm = this;
        vm.isCollapsed = false;
        vm.dashboard = true;
        vm.isReportsCollapsed = true;
        vm.isGraphsCollapsed = true;
        vm.routeStateConst = routeStateConst;
    }
})();
(function () {
    'use strict';
    angular.module('lidt')
        .component('topNavbar', {
            templateUrl: 'navbar/top/top-navbar.tpl.html',
            controllerAs: 'vm',
            controller: Controller
        });

    Controller.$inject = ['DataService']

    function Controller(DataService) {
        var vm = this;
        vm.devices = [];
        vm.isCollapsed = true;

        (function _init() {
            //DataService.GetAllClientDevices(clientId)
            //    .then(function (devices) {
            //        vm.devices = devices;
            //    });
        })();

        function onSelect(device) {
            vm.devices.push(device);
        }

        function logout()
        {

        }
    }
})();