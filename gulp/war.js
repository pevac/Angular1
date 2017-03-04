"use strict";

const gulp = require("gulp");
const argv = require("minimist")(process.argv.slice(2));
const $ = require("gulp-load-plugins")();
const combine = require("stream-combiner2").obj;

let RELEASE = !!argv.release;

module.exports =  function(options){
    return function(){
        return combine(gulp.src(options.path.zip.src),
            $.war({
                welcome: "index.html",
                displayName: "Gulp WAR",
            }),
            $.zip("admin.war"),
            gulp.dest(options.path.zip.dest),
            $.size({title: "war"}),
            $.notify({
                title   : "Gulp Task Complete",
                message : "Archiving have been compiled",
                sound: false
            })
        )
    }
}