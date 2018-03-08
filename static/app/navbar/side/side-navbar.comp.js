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