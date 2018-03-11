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