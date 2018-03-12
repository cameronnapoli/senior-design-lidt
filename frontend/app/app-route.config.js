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