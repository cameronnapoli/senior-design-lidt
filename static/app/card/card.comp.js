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