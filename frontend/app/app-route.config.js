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