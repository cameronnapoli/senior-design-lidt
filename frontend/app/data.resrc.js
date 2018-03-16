(function () {
    'use strict';
    angular.module('lidt')
        .factory('dataResource', dataResource);

    dataResource.$inject = ['$resource'];

    function dataResource($resource)
    {
        var apiUrl = 'http://backend-env.us-west-1.elasticbeanstalk.com/';
        return $resource(apiUrl, null, {
            getAllClientDevices: {
                method: 'GET',
                url: apiUrl + 'GetAllClientDevices',
                params: {
                    clientId: '@clientId'
                },
                isArray: true
            },
            getDeviceCount: {
                method: 'GET',
                url: apiUrl + 'GetDeviceCount',
                params: {
                    deviceId: '@deviceId'
                },
                isArray: true
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
                }
            },
            addDevice: {
                method: 'POST',
                url: apiUrl + 'AddDevice',
                params: {
                    deviceId: '@deviceId'
                }
            },
            addUser: {
                method: 'POST',
                url: apiUrl + 'AddUser',
                params: {
                    clientId: '@clientId',
                    user: '@user'
                }
            }
        });
    }
})();