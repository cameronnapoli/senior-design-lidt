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

    Controller.$inject = ['dataService']

    function Controller(dataService) {
        var vm = this;
    }
})();