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