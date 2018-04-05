"use strict";

module.exports =  (options, $) => {
    const argv = $.minimist(process.argv.slice(2));
    const RELEASE = !!argv.release;

    return () => {
        return $.combine( $.gulp.src(options.src.app),
            $.cached("eslint"),
            $.eslint(),
            $.eslint.format(),
            $.eslint.result((result) => {
			    if (result.warningCount > 0 || result.errorCount > 0) {
				    delete $.cached.caches.eslint[$.path.resolve(result.filePath)]
			    }
		    }),
            $.eslint.failAfterError(),
            $.remember("eslint"),
            $.if(!RELEASE, $.sourcemaps.init()),
            $.angularFilesort(),
            $.concat("app.js"),
            $.if(!RELEASE, $.sourcemaps.write("app")),
            $.if(RELEASE, combine($.ngAnnotate(), $.uglify(),  $.rename({suffix: ".min",extname: ".js"}), $.rev() )),
            $.gulp.dest(options.build.app),
            $.size({title: "app"})
        ).on("error", function (error)  {
                $.notify({
                    title: "Task Failed " + options.taskName,
                    message: "-- " + "See console.",
                    sound: false
                }).write(error);
                this.emit("end");
            })
    }
}

