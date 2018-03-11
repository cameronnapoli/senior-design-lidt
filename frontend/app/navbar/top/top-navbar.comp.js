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