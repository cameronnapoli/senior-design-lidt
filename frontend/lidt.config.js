var app = './app',
    dist = './dist',
    content = './content',
    node = './node_modules',
    paths = {
        dist: dist,
        content: content,
        templatesDist: dist + '/templates',
        cssDist: dist + '/css',
    },
    files = {
        cssImport: [
            node + '/bootstrap/dist/css/bootstrap.min.css',
            //node + '/angular-ui-bootstrap/dist/ui-bootstrap-csp.css',
            node + '/font-awesome/css/font-awesome.min.css',
            node + '/fullcalendar/dist/fullcalendar.min.css',
            node + '/angular-toastr/dist/angular-toastr.min.css'
        ],
        jsImport: [
            node + '/jquery/dist/jquery.min.js',
            node + '/bootstrap/dist/js/bootstrap.bundle.min.js',
            node + '/moment/min/moment.min.js',
            node + '/chart.js/dist/Chart.bundle.min.js',
            node + '/fullcalendar/dist/fullcalendar.min.js',
            node + '/fullcalendar/dist/gcal.min.js',
            node + '/lodash/lodash.min.js',
            node + '/angular/angular.js',
            node + '/@uirouter/angularjs/release/angular-ui-router.min.js',
            node + '/angular-animate/angular-animate.js',
            //node + '/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
            node + '/angular-resource/angular-resource.min.js',
            node + '/angular-chart.js/dist/angular-chart.min.js',
            node + '/angular-ui-calendar/src/calendar.js',
            node + '/angular-toastr/dist/angular-toastr.tpls.min.js'
            //node + '/bootstrap-daterangepicker/daterangepicker.js',
        ],
        templates: app + '/**/*.tpl.html',
        js: app + '/**/*.js',
        jsModules: app + '/**/*.mod.js',
        sass: app + '/**/*.scss',
    };

var config = {
    paths: paths,
    files: files
};

module.exports = config;