(function () {
    'use strict';
    angular.module('lidt')
        .factory('dataService', dataService);

    dataService.$inject = ['$q', 'dataResource', 'toastr'];

    function dataService($q, dataResource, toastr)
    {
        return {
            getAllClientDevices: getAllClientDevices,
            getDeviceCount: getDeviceCount,
            getAllDeviceCountHistory: getAllDeviceCountHistory,
            addDevice: addDevice,
            addUser : addUser
        }

        function getAllClientDevices(clientId) {
            var deferred = $q.defer();

            dataResource.getAllClientDevices({ clientId: clientId }).$promise
                .then(function (data) {
                    deferred.resolve(data);
                }, function (error) {
                    toastr.error('Something went wrong', 'ERROR');
                });

            return deferred.promise;
        }

        function getDeviceCount(deviceId) {
            var deferred = $q.defer();

            dataResource.getDeviceCount({ deviceId: deviceId }).$promise
                .then(function (data) {
                    deferred.resolve(data);
                }, function (error) {
                    toastr.error('Something went wrong', 'ERROR');
                });

            return deferred.promise;
        }

        function getAllDeviceCountHistory(clientId) {
            var deferred = $q.defer();

            dataResource.getAllDeviceCountHistory({ clientId: clientId }).$promise
                .then(function (data) {
                    deferred.resolve(data);
                }, function (error) {
                    toastr.error('Something went wrong', 'ERROR');
                });

            return deferred.promise;
        }

        function addDevice(device) {
            var deferred = $q.defer();

            dataResource.addDevice({ device: device }).$promise
                .then(function (data) {
                    deferred.resolve(data);
                }, function (error) {
                    toastr.error('Something went wrong', 'ERROR');
                });

            return deferred.promise;
        }

        function addUser(user) {
            var deferred = $q.defer();

            dataResource.addUser({ user: user }).$promise
                .then(function (data) {
                    deferred.resolve(data);
                }, function (error) {
                    toastr.error('Something went wrong', 'ERROR');
                });

            return deferred.promise;
        }
    }
})();