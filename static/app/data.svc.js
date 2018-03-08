(function () {
    'use strict';
    angular.module('lidt')
        .factory('dataService', dataService);

    dataService.$inject = ['$q', 'dataResource'];

    function dataService($q, DataResource)
    {
        return {
            GetAllClientDevices: GetAllClientDevices,
            GetDeviceCount: GetDeviceCount,
            GetAllDeviceCount: GetAllDeviceCount
        }

        function GetAllClientDevices(clientId) {
            deferred = $q.defer();

            DataResource.getAllClientDevices(clientId).$promise
                .then(function (devices) {
                    deferred.resolve(devices);
                });

            return deferred.promise;
        }

        function GetDeviceCount(deviceId) {
            deferred = $q.defer();

            DataResource.GetDeviceCount(deviceId).$promise
                .then(function (data) {
                    deferred.resolve(data);
                });

            return deferred.promise;
        }

        function GetAllDeviceCount() {
            deferred = $q.defer();

            DataResource.GetAllDeviceCount().$promise
                .then(function (data) {
                    deferred.resolve(data);
                });

            return deferred.promise;
        }
    }
})();