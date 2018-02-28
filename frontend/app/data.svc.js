(function () {
    'use strict';
    angular.module('lidt')
        .factory('DataService', DataService);

    DataService.$inject = ['$q', 'DataResource'];

    function DataService($q, DataResource)
    {
        return {
            GetAllClientDevices: GetAllClientDevices,
            GetDeviceCount: GetDeviceCount
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
                .then(function (count) {
                    deferred.resolve(count);
                });

            return deferred.promise;
        }
    }
})();