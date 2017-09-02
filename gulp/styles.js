"use strict";

const gulp = require("gulp");
const argv = require("minimist")(process.argv.slice(2));
const $ = require("gulp-load-plugins")();
const combine = require("stream-combiner2").obj;
const util = require("./util");
const autoprefixer = require("autoprefixer");
const sprites = require("postcss-sprites");

let RELEASE = !!argv.release;

module.exports =  (options) => {
    return () => {
        return combine( gulp.src(`${options.src.styles}/*.scss`),
            $.if(!RELEASE, $.sourcemaps.init()),
            $.sass(),
            $.autoprefixer({browsers: [    
                "> 1%",         
                "ie >= 10",
                "ie_mob >= 10",
                "last 2 versions"
            ]}),
            $.if(!RELEASE, $.sourcemaps.write({sourceRoot: options.src.styles})),
            $.if(RELEASE, $.replace("../node_modules/bootstrap-sass/assets/fonts/bootstrap/", "../assets/fonts/bootstrap/")),
            $.if(RELEASE, combine($.cssnano(), $.rename({suffix: ".min", extname: ".css" }),  $.rev())),
            gulp.dest(options.build.styles),
            $.size({title: "styles"})
        ).on("error", function(error)  {
            util.reportError.apply(this, [error, options.taskName]);
        });
    }
}