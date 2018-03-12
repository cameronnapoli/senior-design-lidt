(function () {
    'use strict';
    angular.module('lidt')
        .factory('dataService', dataService);

    dataService.$inject = ['$q', 'dataResource'];

    function dataService($q, dataResource)
    {
        return {
            getAllDeviceCounts: getAllDeviceCounts,
            getDeviceCount: getDeviceCount,
            getAllDeviceCountHistory: getAllDeviceCountHistory,
            addDevice: addDevice,
            addUser : addUser
        }

        function getAllDeviceCounts(clientId) {
            var deferred = $q.defer();

            dataResource.getAllDeviceCounts(clientId).$promise
                .then(function (data) {
                    deferred.resolve(data);
                });

            return deferred.promise;
        }

        function getDeviceCount(deviceId) {
            var deferred = $q.defer();

            dataResource.getDeviceCount(deviceId).$promise
                .then(function (data) {
                    deferred.resolve(data);
                });

            return deferred.promise;
        }

        function getAllDeviceCountHistory(clientId) {
            var deferred = $q.defer();

            dataResource.getAllDeviceCountHistory(clientId).$promise
                .then(function (data) {
                    deferred.resolve(data);
                });

            return deferred.promise;
        }

        function addDevice(device) {
            var deferred = $q.defer();

            dataResource.addDevice(device).$promise
                .then(function (data) {
                    deferred.resolve(data);
                });

            return deferred.promise;
        }

        function addUser(user) {
            var deferred = $q.defer();

            dataResource.addUser(user).$promise
                .then(function (data) {
                    deferred.resolve(data);
                });

            return deferred.promise;
        }
    }
})();