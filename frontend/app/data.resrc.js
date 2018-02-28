(function () {
    'use strict';
    angular.module('lidt')
        .factory('DataResource', DataResource);

    DataResource.$inject = ['$resource'];

    function DataResource($resource)
    {
        var apiUrl = '';
        return $resource(apiUrl, null, {
            getAllClientDevices: {
                method: 'GET',
                url: apiUrl + 'GetAllClientDevices',
                params: {
                    clientId: '@clientId'
                },
                cache: true
            },
            getDeviceCount: {
                method: 'GET',
                url: apiUrl + 'GetDeviceCount',
                params: {
                    deviceId: '@deviceId'
                },
                cache: true
            }
        });
    }
})();