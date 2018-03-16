(function () {
    'use strict';
    angular.module('lidt', [
        'ngResource',
        'ngAnimate',
        'lidt.templates',

        //vendors
        //'ui.bootstrap',
        'ui.router',
        'ui.calendar',
        'chart.js',
        'toastr'
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
            SCHEDULE: 'schedule',
            REGISTER_DEVICE: 'register_device',
            REGISTER_USER: 'register_user'
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
                template: '<carousel />'
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
                template: "<bar-chart />"
            })
            .state(routeStateConst.LINE_CHART, {
                url: '/Chart/LineChart',
                template: "<line-chart />"
            })
            .state(routeStateConst.PIE_CHART, {
                url: '/Chart/PieChart',
                template: "<pie-chart />"
            })
            .state(routeStateConst.REGISTER_DEVICE, {
                url: '/Register/Device',
                template: "<register-device-form />"
            })
            .state(routeStateConst.REGISTER_USER, {
                url: '/Register/User',
                template: "<register-user-form />"
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
        var apiUrl = 'http://backend-env.us-west-1.elasticbeanstalk.com/';
        return $resource(apiUrl, null, {
            getAllClientDevices: {
                method: 'GET',
                url: apiUrl + 'GetAllClientDevices',
                params: {
                    clientId: '@clientId'
                },
                isArray: true,
                cache: true
            },
            getDeviceCount: {
                method: 'GET',
                url: apiUrl + 'GetDeviceCount',
                params: {
                    deviceId: '@deviceId'
                },
                isArray: true,
                cache: true
            },
            getAllDeviceCountHistory: {
                method: 'GET',
                url: apiUrl + 'GetAllDeviceCountHistory',
                params: {
                    deviceId: '@deviceId',
                    interval: '@interval',
                    startTime: '@startTime',
                    endTime: '@endTime',
                    month: '@month'
                },
                cache: true
            },
            addDevice: {
                method: 'POST',
                url: apiUrl + 'AddDevice',
                params: {
                    deviceId: '@deviceId'
                },
                cache: true
            },
            addUser: {
                method: 'POST',
                url: apiUrl + 'AddUser',
                params: {
                    clientId: '@clientId',
                    user: '@user'
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

    dataService.$inject = ['$q', 'dataResource', 'toastr'];

    function dataService($q, dataResource, toastr)
    {
        return {
            getAllClientDevices: getAllClientDevices,
            getDeviceCount: getDeviceCount,
            getAllDeviceCountHistory: getAllDeviceCountHistory,
            addDevice: addDevice,
            addUser : addUser
        }

        function getAllClientDevices(clientId) {
            var deferred = $q.defer();

            dataResource.getAllClientDevices({ clientId: clientId }).$promise
                .then(function (data) {
                    deferred.resolve(data);
                }, function (error) {
                    toastr.error('Something went wrong', 'ERROR');
                });

            return deferred.promise;
        }

        function getDeviceCount(deviceId) {
            var deferred = $q.defer();

            dataResource.getDeviceCount({ deviceId: deviceId }).$promise
                .then(function (data) {
                    deferred.resolve(data);
                }, function (error) {
                    toastr.error('Something went wrong', 'ERROR');
                });

            return deferred.promise;
        }

        function getAllDeviceCountHistory(clientId, interval, date) {
            var deferred = $q.defer();

            dataResource.getAllDeviceCountHistory({ clientId: clientId, interval: interval, date: date }).$promise
                .then(function (data) {
                    deferred.resolve(angular.fromJson(data));
                }, function (error) {
                    toastr.error('Something went wrong', 'ERROR');
                });

            return deferred.promise;
        }

        function addDevice(device) {
            var deferred = $q.defer();

            dataResource.addDevice({ device: device }).$promise
                .then(function (data) {
                    deferred.resolve(data);
                }, function (error) {
                    toastr.error('Something went wrong', 'ERROR');
                });

            return deferred.promise;
        }

        function addUser(user) {
            var deferred = $q.defer();

            dataResource.addUser({ user: user }).$promise
                .then(function (data) {
                    deferred.resolve(data);
                }, function (error) {
                    toastr.error('Something went wrong', 'ERROR');
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
        .component('contentCard', {
            templateUrl: 'card/card.tpl.html',
            controllerAs: 'vm',
            controller: Controller,
            bindings: {
                title: '@',
                text: '@'
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
            dataService.getDeviceCount(vm.deviceId)
                .then(function (device) {
                    vm.entryCount = device[0].Entries;
                    vm.exitCount = device[0].Exits;
                    vm.OccupantCount = vm.entryCount - vm.exitCount;
                });
        }
    }
})();
(function () {
    'use strict';
    angular.module('lidt')
        .component('carousel', {
            templateUrl: 'carousel/carousel.tpl.html',
            controllerAs: 'vm',
            controller: Controller,
            bindings: {
                id: '@'
            }
        });

    Controller.$inject = ['$scope']

    function Controller($scope)
    {
        var vm = this;
        vm.indicator = 0;

        (function _init() {
            vm.members = [{
                id: 0,
                name: 'Jeremy Quintana',
                major: 'Electrical Engineering (Circuit Design)',
                img: '../static/Images/Jeremy.JPG',
                skills: 'Circuit network analysis, IC design using Cadence Virtuoso ADE, electronics soldering and fabrication, C programming',
                experience: 'Designed the schematic and layout of integrated circuit chips.',
                role: 'Team captain, hardware design, and presenter.'
            }, {
                id: 1,
                name: 'Cameron Napoli',
                major: 'Computer Science and Engineering',
                img: '../static/Images/Cameron.JPG',
                skills: 'Backend development with Python, PHP, or Go. Database development with SQL and NoSQL style. Embedded device programming in C.',
                experience: 'Created backend systems in Python for work. Designed and implemented database systems.',
                role: 'Backend developer, support for embedded programming, and presenter.'
            }, {
                id: 2,
                name: 'Raymond Wang',
                major: 'Computer Science and Engineering',
                img: '../static/Images/Raymond.JPG',
                skills: 'Database development using SQL, NoSQL. Backend development using C, C++, C#, Java, LISP, Prolog, PHP. Frontend development using Javascript, HTML, CSS.',
                experience: '.NET 4.7, Entity Framework, NServiceBus, SignalR, Amazon AWS, Microsoft Azure, MSSQL, MySQL, Tomcat, Jersey, AngularJS v1.x, jQuery, Kendo, Bootstrap.',
                role: 'Software development, hardware software integration, presenter.'
            }]
        })();
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

    Controller.$inject = ['dataService', '$interval']

    function Controller(dataService, $interval) {
        var vm = this;
        vm.devices = [];
        vm.totalEntryCount = 0;
        vm.totalExitCount = 0;
        vm.totalOccupantCount = 0;
        vm.totalAvailableCount = 0;
        vm.clientId = 9999;

        vm.refreshAll = refreshAll;

        (function _init() {
            refreshAll();
            $interval(refreshAll, 15000);
        })();

        function refreshAll() {
            vm.totalEntryCount = 0;
            vm.totalExitCount = 0;
            vm.totalOccupantCount = 0;
            vm.totalAvailableCount = 0;
            dataService.getAllClientDevices(vm.clientId)
                .then(function (data) {
                    var deviceIds = data;
                    deviceIds.map(function (deviceId) {
                        dataService.getDeviceCount(deviceId)
                            .then(function(device) {
                                var currentDevice = vm.devices.find(function(existingDevice)
                                    {
                                        return existingDevice.DeviceId === device[0].DeviceId;
                                    });
                                if (currentDevice)
                                {
                                    currentDevice.Entries = device[0].Entries;
                                    currentDevice.Exits = device[0].Exits;
                                }
                                else
                                {
                                    vm.devices.push(device[0]);
                                }
                                vm.totalEntryCount += device[0].Entries;
                                vm.totalExitCount += device[0].Exits;
                                vm.totalOccupantCount = vm.totalEntryCount - vm.totalExitCount;
                                vm.totalAvailableCount = data.AvailableCount - vm.totalOccupantCount;
                            });
                    });
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
(function () {
    'use strict';
    angular.module('lidt')
        .component('registerDeviceForm', {
            templateUrl: 'form/register-device/register-device-form.tpl.html',
            controllerAs: 'vm',
            controller: Controller,
            bindings: {
            }
        });

    Controller.$inject = ['dataService']

    function Controller(dataService) {
        var vm = this;
        vm.submit = submit;

        function submit(form) {
            dataService.addDevice(form)
                .then(function (response) {
                    toastr.success('Device ' + form.id + ' has been registered!', 'SUCCESS');
                }, function (error) {
                    toastr.error('Something went wrong.', 'ERROR');
                });
        }
    }
})();
(function () {
    'use strict';
    angular.module('lidt')
        .component('registerUserForm', {
            templateUrl: 'form/register-user/register-user-form.tpl.html',
            controllerAs: 'vm',
            controller: Controller,
            bindings: {
            }
        });

    Controller.$inject = ['dataService']

    function Controller(dataService) {
        var vm = this;
        vm.submit = submit;

        function submit(form) {
            dataService.addDevice(form)
                .then(function (response) {
                    toastr.success('User ' + response.userId + ' has been registered!', 'SUCCESS');
                }, function (error) {
                    toastr.error('Something went wrong.', 'ERROR');
                });
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
        vm.isExpanded = false;

        vm.barLink = 'Bar Chart';
        vm.lineLink = 'Line Chart';
        vm.pieLink = 'Pie Chart';

        vm.routeStateConst = routeStateConst;
        vm.onToggleHide = onToggleHide;

        function onToggleHide() {
            vm.isCollapsed = !vm.isCollapsed;
            vm.barLink = vm.isCollapsed ? 'Bar' : 'Bar Chart';
            vm.lineLink = vm.isCollapsed ? 'Line' : 'Line Chart';
            vm.pieLink = vm.isCollapsed ? 'Pie' : 'Pie Chart';
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