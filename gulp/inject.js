"use strict";

const gulp = require("gulp");
const argv = require("minimist")(process.argv.slice(2));
const $ = require("gulp-load-plugins")();
const combine = require("stream-combiner2").obj;
const fs = require("fs");
const path = require("path");
const util = require("./util");

let RELEASE = !!argv.release;
let VISUALIZER = !!!argv.visualizer;

module.exports =  (options) => {
    return () => {
        var appScriptSources = combine(gulp.src(options.src.app),
                            $.angularFilesort()).on("error", function (error) {
                                error.taskName = options.taskName;
                                util.reportError.call(this, error);
                            });
        var appInjectOptions = {
            starttag: "<!-- inject:app -->",
            ignorePath: `../${options.src.root}`,
            addRootSlash: false,
            relative : true
        };

        var vendor = JSON.parse(fs.readFileSync(options.src.vendor))
        var vendorScriptSources = combine(gulp.src(vendor, {read: false}));
        var vendorInjectOptions = {
            starttag: "<!-- inject:vendor -->",
            relative: true
        };
             
        var otherSources = gulp.src(`${options.build.styles}/*.css`, {read: false});
        var otherSourcesOptions = {
            ignorePath: `../${options.build.root}/serve/`,
            relative: true
        };

        return combine(gulp.src(options.src.html),
            $.inject(appScriptSources, appInjectOptions),
            $.inject(vendorScriptSources, vendorInjectOptions),
            $.inject(otherSources, otherSourcesOptions),
            $.removeCode({ visualizer: VISUALIZER }),
            gulp.dest(options.build.index),
            $.size({title: "index"})
        ).on("error", (error) => {
            util.reportError.call(this, error, options.taskName);
        });
    }
}