"use strict";

const gulp = require("gulp");
const task = require("./loader")(gulp);
const config = require("./config")

task("styles:tmp",  { src: config.src,  build: config.tmp });
task("templates:tmp",  { src: config.src, build: config.tmp });
task("eslint",  { src: config.src });
task("fonts:build",  { src: config.src, build: config.build });
task("images:build",  { src: config.src, build: config.build });
task("inject:tmp",  { src: config.src, build: config.tmp });
task("useref:tmp",  { src: config.tmp, build: config.build });
task("server:tmp",  { server: config.server.tmp });
task("server:dist",  { server: config.server.dist });
task("watch:tmp",  { watch: config.watch });
task("clean",  { clean: config.clean.file} );
task("clear.cache");
task("war", { war: config.war });

task("unit.tests:single", { singleRun: true });
task("unit.tests:single:auto", { singleRun: false });
task("e2e.tests");
task("webdriver:update", { webdriver: "webdriver_update" });
task("webdriver:standalone", { webdriver:"webdriver_standalone" });

task("inject", gulp.series(gulp.parallel("styles:tmp", "eslint"),"inject:tmp"));
task("inject:build", gulp.series(gulp.parallel("clear.cache", "clean"), "inject"));
task("useref:build", gulp.series("inject:build", gulp.parallel("templates:tmp", "fonts:build","images:build"),"useref:tmp"));
task("war:build", gulp.series("clean", "useref:build", "war"));
task("test", gulp.series("eslint", "unit.tests:single"));
task("test:auto", gulp.series("watch:tmp", "unit.tests:single:auto"));

task("serve",  gulp.series ("inject:build",  gulp.parallel("server:tmp","watch:tmp")));
task("serve:dist", gulp.series("useref:build",  "server:dist"));
task("serve:e2e", gulp.series("inject:build",  "server:tmp"));
task("serve:e2e:dist", gulp.series("useref:build",  "server:dist"));

task("protractor:src", gulp.series( gulp.parallel("serve:e2e", "webdriver:update"), "e2e.tests"));
task("protractor:dist", gulp.series( gulp.parallel("serve:e2e:dist", "webdriver:update"), "e2e.tests"));
task("protractor", gulp.series("protractor:src"));

task("default", gulp.series("serve"));


// task("styles:build", path.resolve("./gulp/styles"), {
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
//     sequence ("build",  ["server:dist","watch"], cb);
// });
// gulp.task("build", (cb) => {
//     sequence ( ["clear.cache", "clean"], ["styles:build","templates:build", "vendor:build", "app:build",  "fonts:build","images:build"],"html:build", cb);
// });
