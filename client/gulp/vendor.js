"use strict";

module.exports =  (options, $) => {
    const argv = $.minimist(process.argv.slice(2));
    const fs = require("fs");
    const RELEASE = !!argv.release;
    
    return (done) => {
        return $.combine( $.gulp.src(JSON.parse(fs.readFileSync(options.src.vendor))),
            $.if(!RELEASE, $.sourcemaps.init()),
            $.concat("vendor.js"),
            $.if(RELEASE, $.combine($.uglify({ preserveComments: $.uglifySaveLicense }), $.rename({suffix:".min", extname:".js"}), $.rev())),
            $.if(!RELEASE, $.sourcemaps.write("vendor")),
            $.gulp.dest(options.build.vendor),
            $.size({title: "vendor"}),
            $.if(RELEASE, combine($.rev.manifest("vendor.json"), gulp.dest("./dist/manifest") ))
        )
    }
}