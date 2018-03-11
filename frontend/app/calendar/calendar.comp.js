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