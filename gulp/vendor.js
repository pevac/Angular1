"use strict";

const gulp = require("gulp");
const argv = require("minimist")(process.argv.slice(2));
const $ = require("gulp-load-plugins")({
    pattern: ["gulp-*", "uglify-save-license"]
});
const combine = require("stream-combiner2").obj;
const config = require("./config");

let RELEASE = !!argv.release;

module.exports =  function(options){
    return function(){
        return combine( gulp.src(config.path.src.vendor),
            $.if(!RELEASE, $.sourcemaps.init()),
            $.concat("vendor.js"),
            $.if(RELEASE, combine($.uglify({ preserveComments: $.uglifySaveLicense }), $.rename({suffix:".min", extname:".js"}), $.rev())),
            $.if(!RELEASE, $.sourcemaps.write("vendor")),
            gulp.dest(config.path.build.vendor),
            $.size({title: "vendor"}),
            $.if(RELEASE, combine($.rev.manifest("vendor.json"), gulp.dest("./manifest") ))
        )
    }
}