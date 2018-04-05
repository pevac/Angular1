"use strict";

module.exports =  (options, $) => {
    const argv = $.minimist(process.argv.slice(2));
    const RELEASE = !!argv.release;
    const VISUALIZER = !!!argv.visualizer;
    return () => {
        return $.combine($.gulp.src(options.src.img),
            $.changed(options.build.img),
            $.cache($.imagemin({
                progressive: true,
                svgoPlugins: [{removeViewBox: false}],
                use: [$.imageminPngquant()],
                interlaced: true
            })),
            $.gulp.dest(options.build.img),
            $.size({title: "images"})
        ).on("error", (error) => {
            $.util.reportError.call(this, error, options.taskName);
        });
    }
}