"use strict";

module.exports =  (options, $) => {
    return (done) => {
        return $.combine( $.gulp.src(options.src.fonts), 
        $.gulp.dest(options.build.fonts))
    }
}