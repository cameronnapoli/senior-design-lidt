(function () {
    'use strict';
    angular.module('lidt')
        .constant('chartLabelConst', chartLabelConst());

    function chartLabelConst() {
        return {
            HOUR: ['12:00am', '01:00am', '02:00am', '03:00am', '04:00am', '05:00am', '06:00am', '07:00am', '08:00am', '09:00am', '10:00am', '11:00am'
                , '12:00pm', '01:00pm', '02:00pm', '03:00pm', '04:00pm', '05:00pm', '06:00pm', '07:00pm', '08:00pm', '09:00pm', '10:00pm', '11:00pm'],
            DAY: [{ Month: 'January', Days: 31 }, { Month: 'Febuary', Days: 28 }, { Month: 'March', Days: 31 }, { Month: 'April', Days: 30 }, { Month: 'May', Days: 31 }
                , { Month: 'June', Days: 30 }, { Month: 'July', Days: 31 }, { Month: 'August', Days: 31 }, { Month: 'September', Days: 30 }, { Month: 'October', Days: 31 }
                , { Month: 'November', Days: 30 }, { Month: 'December', Days: 31 }],
            MONTH: ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        }
    }
})();