"use strict";

const gulp = require("gulp");
const argv = require("minimist")(process.argv.slice(2));
const $ = require("gulp-load-plugins")();
const combine = require("stream-combiner2").obj;
const util = require("./util");

let RELEASE = !!argv.release;

module.exports =  (options) => {
    return () => {
        return combine( gulp.src(options.path.src.styles),
            $.if(!RELEASE, $.sourcemaps.init()),
            $.sass(),
            $.autoprefixer({browsers: options.AUTOPREFIXER_BROWSERS}),
            $.if(!RELEASE, $.sourcemaps.write({sourceRoot: "./src/sass"})),
            $.if(RELEASE, $.replace("../node_modules/bootstrap-sass/assets/fonts/bootstrap/", "../assets/fonts/bootstrap/")),
            $.if(RELEASE, combine($.cssnano(), $.rename({suffix: ".min", extname: ".css" }),  $.rev())),
            gulp.dest(options.path.build.styles),
            $.size({title: "styles"}),
            $.if(RELEASE, combine($.rev.manifest("css.json"), gulp.dest("./manifest") ))
        ).on("error", function(error)  {
            util.reportError.apply(this, [error, options.taskName]);
        });
    }
}