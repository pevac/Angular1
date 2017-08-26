"use strict";

const gulp = require("gulp");
const argv = require("minimist")(process.argv.slice(2));
const $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', "uglify-save-license", "del"]
  });
const combine = require("stream-combiner2").obj;
const util = require("./util");

let RELEASE = !!argv.release;

module.exports =  (options) => {
    return () => {
        var partialsInjectFile = gulp.src("./build/js/template*.js", { read: false });
        var partialsInjectOptions = {
            starttag: '<!-- inject:partials -->',
            // ignorePath: `js`,
            addRootSlash: false,
            relative : true
        };

        var htmlFilter = $.filter('*.html', { restore: true });
        var jsFilter = $.filter('**/*.js', { restore: true });
        var cssFilter = $.filter('**/*.css', { restore: true });
       return combine(gulp.src("./build/index.html"),
            $.inject(partialsInjectFile, partialsInjectOptions),
            $.useref(),
            jsFilter,
            // $.sourcemaps.init(),
            $.ngAnnotate(),
            $.uglify({ preserveComments: $.uglifySaveLicense }),
            $.rev(),
            // $.sourcemaps.write(),
            jsFilter.restore,
            cssFilter,
            // $.sourcemaps.init(),
            $.replace("../node_modules/bootstrap-sass/assets/fonts/bootstrap/", "../assets/fonts/bootstrap/"),
            $.cssnano(),
            $.rev(),
            // $.sourcemaps.write(),
            cssFilter.restore,
            $.revReplace(),
            htmlFilter,
            $.htmlmin({
                removeEmptyAttributes: true,
                removeAttributeQuotes: true,
                collapseBooleanAttributes: true,
                collapseWhitespace: true
            }),
            htmlFilter.restore,
            gulp.dest("./dist"),
            $.size({ title: "dist", showFiles: true })
        ).on("error", function (error)  {
            util.reportError.apply(this, [error, options.taskName]);
        });
    }
}