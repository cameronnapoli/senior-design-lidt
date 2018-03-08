(function () {
    'use strict';
    angular.module('lidt')
        .component('carousel', {
            templateUrl: 'carousel/carousel.tpl.html',
            controllerAs: 'vm',
            controller: Controller,
            bindings: {
                id: '@'
            }
        });

    Controller.$inject = ['$scope']

    function Controller($scope)
    {
        var vm = this;
        vm.indicator = 0;

        (function _init() {
            vm.members = [{
                id: 0,
                name: 'Jeremy Quintana',
                major: 'Electrical Engineering Major',
                img: 'static/Images/Jeremy.jpg'
            }, {
                id: 1,
                name: 'Jeremy Quintana',
                major: 'Computer Science and Engineering Major',
                img: 'static/Images/Cameron.jpg'
            }, {
                id: 2,
                name: 'Raymond Wang',
                major: 'Computer Science and Engineering Major',
                img: 'static/Images/Raymond.jpg'
            }]
        })();
    }
})();