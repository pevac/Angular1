"use strict";

const gulp = require("gulp");
const sequence  = require("run-sequence");
const argv = require("minimist")(process.argv.slice(2));
const $ = require("gulp-load-plugins")();
const path = require("path");
const task = require("./loader");
const config = require("./config")

var  RELEASE = !!argv.release;

task("sass:build", path.resolve("./gulp/styles"), config);
task("vendor:build", path.resolve("./gulp/vendor"), config);
task("script:build", path.resolve("./gulp/app"), config);
task("templates:build", path.resolve("./gulp/templates"), config);
task("index:build", path.resolve("./gulp/html"), config);
task("fonts:build", path.resolve("./gulp/fonts"), config);
task("image:build", path.resolve("./gulp/images"), config);
task("browser-sync", path.resolve("./gulp/server"), config);
task("clean", path.resolve("./gulp/clean"), { clean: config.path.clean.build} );
task("clean:war", path.resolve("./gulp/clean"), { clean: config.path.clean.war} );
task("watch", path.resolve("./gulp/watch"), config);
task("war", path.resolve("./gulp/war"), config);

gulp.task("build", ["clean"], function (cb) {
    sequence (["sass:build","templates:build", "vendor:build", "script:build",  "fonts:build","image:build"],"index:build", cb);
});

gulp.task("zip",["clean:war"], function(cb) {
      sequence ( "build", "war", cb);
});

gulp.task("serve", function (cb) {
    sequence ("build", ["browser-sync","watch"], cb);
});

gulp.task("default", ["serve"]);



