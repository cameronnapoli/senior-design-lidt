(function () {
    'use strict';
    angular.module('lidt')
        .factory('dataResource', dataResource);

    dataResource.$inject = ['$resource'];

    function dataResource($resource)
    {
        var apiUrl = 'http://backend-env.us-west-1.elasticbeanstalk.com/';
        return $resource(apiUrl, null, {
            getAllDeviceCounts: {
                method: 'GET',
                url: apiUrl + 'GetAllDeviceCounts',
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
            },
            getAllDeviceCountHistory: {
                method: 'GET',
                url: apiUrl + 'GetAllDeviceCountHistory',
                params: {
                    deviceId: '@deviceId',
                    interval: '@interval',
                    startTime: '@startTime',
                    endTime: '@endTime',
                    month: '@month'
                },
                cache: true
            },
            addDevice: {
                method: 'POST',
                url: apiUrl + 'AddDevice',
                params: {
                    deviceId: '@deviceId'
                },
                cache: true
            },
            addUser: {
                method: 'POST',
                url: apiUrl + 'AddUser',
                params: {
                    clientId: '@clientId',
                    user: '@user'
                },
                cache: true
            }
        });
    }
})();