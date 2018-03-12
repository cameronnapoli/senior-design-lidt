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
                name: 'Jeremy Quintana (Team Leader)',
                major: 'Electrical Engineering (Circuit Design)',
                img: '../Images/Jeremy.jpg',
                skills: 'Circuit network analysis, IC design using Cadence Virtuoso ADE, electronics soldering and fabrication, C programming',
                experience: 'Designed the schematic and layout of integrated circuit chips.',
                role: 'Team captain, hardware design, and presenter.'
            }, {
                id: 1,
                name: 'Cameron Napoli',
                major: 'Computer Science and Engineering',
                img: '../Images/Cameron.jpg',
                skills: 'Backend development with Python, PHP, or Go. Database development with SQL and NoSQL style. Embedded device programming in C.',
                experience: 'Created backend systems in Python for work. Designed and implemented database systems.',
                role: 'Backend developer, support for embedded programming, and presenter.'
            }, {
                id: 2,
                name: 'Raymond Wang',
                major: 'Computer Science and Engineering',
                img: '../Images/Raymond.jpg',
                skills: 'Database development using SQL, NoSQL. Backend development using C, C++, C#, Java, LISP, Prolog, PHP. Frontend development using Javascript, HTML, CSS.',
                experience: '.NET 4.7, Entity Framework, NServiceBus, SignalR, Amazon AWS, Microsoft Azure, MSSQL, MySQL, Tomcat, Jersey, AngularJS v1.x, jQuery, Kendo, Bootstrap.',
                role: 'Software development, hardware software integration, presenter.'
            }]
        })();
    }
})();