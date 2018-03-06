(function () {
    'use strict';
    angular.module('lidt', [
        'ngResource',
        'ngAnimate',
        'lidt.templates',

        //vendors
        'ui.bootstrap',
        'ui.router',
        'ui.calendar',
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
            PIE_CHART: 'pie_chart',
            ABOUT: 'about',
            SCHEDULE: 'schedule'
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
            .otherwise('');

        $stateProvider
            .state(routeStateConst.ABOUT, {
                url: '/About',
                template: '<card-container />'
            })
            .state(routeStateConst.SCHEDULE, {
                url: '/Schedule',
                template: '<calendar />'
            })
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
        .factory('dataResource', dataResource);

    dataResource.$inject = ['$resource'];

    function dataResource($resource)
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
        .factory('dataService', dataService);

    dataService.$inject = ['$q', 'dataResource'];

    function dataService($q, DataResource)
    {
        return {
            GetAllClientDevices: GetAllClientDevices,
            GetDeviceCount: GetDeviceCount,
            GetAllDeviceCount: GetAllDeviceCount
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
                .then(function (data) {
                    deferred.resolve(data);
                });

            return deferred.promise;
        }

        function GetAllDeviceCount() {
            deferred = $q.defer();

            DataResource.GetAllDeviceCount().$promise
                .then(function (data) {
                    deferred.resolve(data);
                });

            return deferred.promise;
        }
    }
})();
(function () {
    'use strict';
    angular.module('lidt')
        .component('appContainer', {
            templateUrl: 'app-container/app-container.tpl.html',
            controllerAs: 'vm',
            controller: Controller
        });

    Controller.$inject = []

    function Controller() {
        var vm = this;
        vm.toggleMainContent = toggleMainContent;
        vm.isExpanded = false;

        function toggleMainContent() {
            vm.isExpanded = !vm.isExpanded;
        }
    }
})();
(function () {
    'use strict';
    angular.module('lidt')
        .component('calendar', {
            templateUrl: 'calendar/calendar.tpl.html',
            controllerAs: 'vm',
            controller: Controller
        });

    Controller.$inject = ['$scope', 'dataService']

    function Controller($scope, dataService) {
        var vm = this;
        vm.eventSources = [];

        (function _init() {
            vm.calendar = {
                height: 800,
                editable: true,
                header: {
                    left: 'month basicWeek basicDay agendaWeek agendaDay',
                    center: 'title',
                    right: 'today prev,next'
                },
                eventClick: $scope.alertEventOnClick,
                eventDrop: $scope.alertOnDrop,
                eventResize: $scope.alertOnResize
            }
        })();
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

(function () {
    'use strict';
    angular.module('lidt')
        .constant('chartLabelConst', chartLabelConst());

    function chartLabelConst() {
        return {
            HOUR: ['12:00am', '01:00am', '02:00am', '03:00am', '04:00am', '05:00am', '06:00am', '07:00am', '08:00am', '09:00am', '10:00am', '11:00am'
                , '12:00pm', '01:00pm', '02:00pm', '03:00pm', '04:00pm', '05:00pm', '06:00pm', '07:00pm', '08:00pm', '09:00pm', '10:00pm', '11:00pm'],
            DAY: [{ Month: 'January', Days: 31 }, { Month: 'Febuary', Days: 28 }, { Month: 'March', Days: 31 }, { Month: 'April', Days: 30 }, { Month: 'May', Days: 31 }
                , { Month: 'June', Days: 30 }, { Month: 'July', Days: 31 }, { Month: 'August', Days: 31 }, { Month: 'September', Days: 30 }, { Month: 'October', Days: 31 }
                , { Month: 'November', Days: 30 }, { Month: 'December', Days: 31 }],
            MONTH: ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
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

    Controller.$inject = ['dataService']

    function Controller(dataService) {
        var vm = this;
        vm.devices = [];
        vm.totalEntryCount = 0;
        vm.totalExitCount = 0;
        vm.totalOccupantCount = 0;
        vm.totalAvailableCount = 0;
        vm.refreshAll = refreshAll;

        (function _init() {
            //refreshAll();
            vm.devices.push({ ID: 'a', EntryCount: 5, ExitCount: 5});
            vm.devices.push({ ID: 'b', EntryCount: 5, ExitCount: 5});
            vm.devices.push({ ID: 'c', EntryCount: 5, ExitCount: 5});
            vm.devices.push({ ID: 'd', EntryCount: 5, ExitCount: 5});
            vm.devices.push({ ID: 'e', EntryCount: 5, ExitCount: 5});
            vm.devices.push({ ID: 'f', EntryCount: 5, ExitCount: 5});
            vm.devices.push({ ID: 'g', EntryCount: 5, ExitCount: 5});
            vm.devices.push({ ID: 'h', EntryCount: 5, ExitCount: 5});
            vm.devices.push({ ID: 'j', EntryCount: 5, ExitCount: 5});
            vm.devices.push({ ID: 'k', EntryCount: 5, ExitCount: 5});
            vm.devices.push({ ID: 'l', EntryCount: 5, ExitCount: 5});
        })();

        function refreshAll() {
            dataService.getAllDeviceCount()
                .then(function (data) {
                    vm.devices = data.devices;
                    vm.devices.map(function (device) {
                        vm.totalEntryCount += device.EntryCount;
                        vm.totalExitCount += device.ExitCount;
                    });
                    vm.totalOcuupantCount = vm.totalEntryCount - vm.totalExitCount;
                    vm.totalAvailableCount = data.AvailableCount - vm.totalOccupantCount;
                });
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

    Controller.$inject = ['dataService']

    function Controller(dataService)
    {
        var vm = this;
        vm.refresh = refresh;

        (function _init() {
            refresh();
        })();

        function refresh() {
            //dataService.GetDeviceCount(vm.deviceId)
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

    Controller.$inject = ['dataService', 'chartLabelConst']

    function Controller(dataService, chartLabelConst)
    {
        var vm = this;
        vm.data = [];
        //vm.refresh = refresh;

        (function _init() {
            vm.labels = chartLabelConst.HOUR;
            //dataService.getAllHourlyCount()
            //    .then(function (data) {
            //        data.map(function (device)
            //        {
            //            vm.data.push(device.CountData);
            //            vm.series.push('Device ' + device.Name);
            //        })
            //    });
            vm.data = [[65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40, 65, 59, 80],
                [28, 48, 40, 19, 86, 27, 90, 28, 48, 40, 19, 86, 27, 90, 28, 48, 40, 19, 86, 27, 90, 28, 48, 40]];
            vm.series = ['Device 1', 'Device 2'];
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

    Controller.$inject = ['dataService']

    function Controller(dataService)
    {
        var vm = this;
        vm.refresh = refresh;

        (function _init() {
            refresh();
        })();

        function refresh() {
            //dataService.GetDeviceCount(vm.deviceId)
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
        .component('sideNavbar', {
            templateUrl: 'navbar/side/side-navbar.tpl.html',
            controllerAs: 'vm',
            controller: Controller,
            bindings: {
                onCallback: '<?'
            }
        });

    Controller.$inject = ['routeStateConst']

    function Controller(routeStateConst) {
        var vm = this;
        vm.isCollapsed = false;
        vm.dashboard = true;
        vm.isReportsCollapsed = true;
        vm.isGraphsCollapsed = true;
        vm.routeStateConst = routeStateConst;
        vm.onToggleHide = onToggleHide;

        function onToggleHide() {
            vm.isCollapsed = !vm.isCollapsed;
            vm.onCallback();
        }
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

    Controller.$inject = ['routeStateConst']

    function Controller(routeStateConst) {
        var vm = this;
        vm.isCollapsed = true;
        vm.routeStateConst = routeStateConst;

        (function _init() {

        })();

        function logout()
        {

        }
    }
})();