"use strict";

const gulp = require("gulp");
const $ = require("gulp-load-plugins")();
const combine = require("stream-combiner2").obj;

module.exports =  (options) => {
    return () => {
        return combine(gulp.src(options.war.src),
            $.war({
                welcome: "index.html",
                displayName: "Gulp WAR",
            }),
            $.zip(options.war.name),
            gulp.dest(options.war.dest),
            $.size({title: "war"}),
            $.notify({
                title   : "Gulp Task Complete",
                message : "Archiving have been compiled",
                sound: false
            })
        )
    }
}