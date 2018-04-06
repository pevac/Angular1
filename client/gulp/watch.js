"use strict";

module.exports =  (options, $) => {
    return (done) => {
        $.gulp.watch([options.watch.html], $.gulp.series("html:build"));

        $.gulp.watch([options.watch.templates], $.gulp.series("templates:build"));
        $.gulp.watch([options.watch.app], $.gulp.series("app:build"))
        .on("unlink", (filePath) => {
            delete $.cached.caches["eslint"][$.path.resolve(filePath)];
            $.remember.forget("eslint",$.path.resolve(filePath));
        });
        $.gulp.watch([options.watch.vendor], $.gulp.series("vendor:build" ));
    
        $.gulp.watch([options.watch.styles], $.gulp.series("styles:build"))

        $.gulp.watch([options.watch.fonts],  $.gulp.series("fonts:build"));

        $.gulp.watch([options.watch.img], $.gulp.series("image:build"));
    }
}