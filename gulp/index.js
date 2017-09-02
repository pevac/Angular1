"use strict";

const gulp = require("gulp");
const sequence  = require("run-sequence");
const path = require("path");
const $ = require("gulp-load-plugins")();
const task = require("./loader");
const config = require("./config")

task("sass:tmp", path.resolve("./gulp/styles"), {
    src: config.src,
    build: config.tmp
});
task("templates:tmp", path.resolve("./gulp/templates"), {
    src: config.src,
    build: config.tmp
});
task("eslint", path.resolve("./gulp/eslint"), {
    src: config.src
});
task("fonts:build", path.resolve("./gulp/fonts"), {
    src: config.src,
    build: config.build
});
task("image:build", path.resolve("./gulp/images"), {
    src: config.src,
    build: config.build
});
task("inject:tmp", path.resolve("./gulp/inject"), {
    src: config.src,
    build: config.tmp
});
task("useref:tmp", path.resolve("./gulp/useref"), {
    src: config.tmp,
    build: config.build
});
task("browser:sync:tmp", path.resolve("./gulp/server"), {
    server: config.server.tmp
});
task("browser:sync:dist", path.resolve("./gulp/server"), {
        server: config.server.dist
});
task("watch:tmp", path.resolve("./gulp/watch.tmp"), {
    watch: config.watch
});

task("clean", path.resolve("./gulp/clean"), { clean: config.clean.file} );
task("clear:cache", path.resolve("./gulp/clearCache"), {} );

task("test:single", path.resolve("./gulp/unit-tests"), {singleRun: true});
task("test:single:auto", path.resolve("./gulp/unit-tests"), {singleRun: false});
task("test:e2e", path.resolve("./gulp/e2e-tests"), {});

task("war", path.resolve("./gulp/war"),  {
    war: config.war
});

gulp.task("war:build",["clean"], (cb) => {
    sequence ( "build", "war", cb);
});

// task for unit tests
gulp.task("test", (cb) => {
    sequence ( "eslint", "test:single", cb);
});
gulp.task("test:auto", (cb) => {
    sequence ( "watch:tmp", "test:single:auto", cb);
});
// end task for unit test

// task for protractor
gulp.task("protractor", ["protractor:src"]);
gulp.task("protractor:src",(cb) => {
    sequence ( ["serve:e2e", "webdriver-update"], "test:e2e", cb);
});
gulp.task("protractor:dist",  (cb) => {
    sequence ( ["serve:e2e-dist", "webdriver-update"], "test:e2e", cb);
});
gulp.task("webdriver-update", $.protractor.webdriver_update);
gulp.task("webdriver-standalone", $.protractor.webdriver_standalone);
// end task for protractor

gulp.task("inject", (cb) => {
    sequence (["sass:tmp", "eslint"],"inject:tmp", cb);
});
gulp.task("inject:build", (cb) => {
    sequence (["clear:cache", "clean"], "inject", cb);
});
gulp.task("useref:build", (cb) => {
    sequence ("inject:build", "templates:tmp", ["useref:tmp", "fonts:build","image:build"], cb);
});

gulp.task("serve",  function (cb) {
    sequence ("inject:build",  ["browser:sync:tmp","watch:tmp"], cb);
});
gulp.task("serve:dist", function (cb) {
    sequence ("useref:build",  "browser:sync:dist", cb);
});
gulp.task("serve:e2e", function (cb) {
    sequence ("inject:build",  "browser:sync:tmp", cb);
});
gulp.task("serve:e2e-dist", function (cb) {
    sequence ("useref:build",  "browser:sync:dist", cb);
});

gulp.task("default", ["serve"]);


// task("sass:build", path.resolve("./gulp/styles"), {
//     src: config.src,
//     build: config.build
// });
// task("vendor:build", path.resolve("./gulp/vendor"), {
//     src: config.src,
//     build: config.build
// });
// task("app:build", path.resolve("./gulp/app"), {
//     src: config.src,
//     build: config.build
// });
// task("templates:build", path.resolve("./gulp/templates"), {
//     src: config.src,
//     build: config.build
// });
// task("html:build", path.resolve("./gulp/html"), {
//     src: config.src,
//     build: config.build
// });
// task("watch", path.resolve("./gulp/watch"), {
//     watch: config.watch
// });
// gulp.task("serve:dist:watch",  (cb) => {
//     sequence ("build",  ["browser:sync","watch"], cb);
// });
// gulp.task("build", (cb) => {
//     sequence ( ["clear:cache", "clean"], ["sass:build","templates:build", "vendor:build", "app:build",  "fonts:build","image:build"],"html:build", cb);
// });
