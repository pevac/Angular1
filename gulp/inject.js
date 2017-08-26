"use strict";

const gulp = require("gulp");
const argv = require("minimist")(process.argv.slice(2));
const $ = require("gulp-load-plugins")();
const combine = require("stream-combiner2").obj;
const fs = require("fs");
const path = require("path");
const util = require("util");

let RELEASE = !!argv.release;

module.exports =  (options) => {
    return () => {
        var appScriptSources = combine(gulp.src(options.path.src.app),
                            $.angularFilesort()).on("error", function (error) {
                                error.taskName = options.taskName;
                                options.reportError.call(this, error);
                            });
        var appInjectOptions = {
            starttag: "<!-- inject:app -->",
            ignorePath: "../src/",
            addRootSlash: false,
            relative : true
        };

        var vendor = JSON.parse(fs.readFileSync(options.path.src.vendor))
        var vendorScriptSources = combine(gulp.src(vendor, {read: false}));
        var vendorInjectOptions = {
            starttag: "<!-- inject:vendor -->",
            addRootSlash: false,
            relative : true
        };
             
        var otherSources = gulp.src(`${options.path.build.styles}/*.css`, {read: false});
        var otherSourcesOptions = {
            ignorePath:"../build/",
            relative : true
        };

        return combine(gulp.src(options.path.src.html),
            $.inject(appScriptSources, appInjectOptions),
            $.inject(vendorScriptSources, vendorInjectOptions),
            $.inject(otherSources, otherSourcesOptions),
            $.removeCode({ production: RELEASE }),
            $.if(RELEASE, $.htmlmin({
                removeComments: true,
                collapseWhitespace: true,
                minifyJS: true
            })),
            gulp.dest(options.path.build.html),
            $.size({title: "index"})
        ).on("error", (error) => {
            util.reportError.call(this, error, options.taskName);
        });
    }
}