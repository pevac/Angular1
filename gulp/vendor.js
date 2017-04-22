"use strict";

const gulp = require("gulp");
const fs = require("fs");
const argv = require("minimist")(process.argv.slice(2));
const $ = require("gulp-load-plugins")({
    pattern: ["gulp-*", "uglify-save-license"]
});
const combine = require("stream-combiner2").obj;

let RELEASE = !!argv.release;

module.exports =  (options) => {
    return () => {
        return combine( gulp.src(JSON.parse(fs.readFileSync('./vendor.json'))),
            $.if(!RELEASE, $.sourcemaps.init()),
            $.concat("vendor.js"),
            $.if(RELEASE, combine($.uglify({ preserveComments: $.uglifySaveLicense }), $.rename({suffix:".min", extname:".js"}), $.rev())),
            $.if(!RELEASE, $.sourcemaps.write("vendor")),
            gulp.dest(options.path.build.vendor),
            $.size({title: "vendor"}),
            $.if(RELEASE, combine($.rev.manifest("vendor.json"), gulp.dest("./manifest") ))
        )
    }
}