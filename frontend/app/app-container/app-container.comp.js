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