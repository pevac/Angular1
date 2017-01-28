var gulp = require("gulp");
var jshint = require("gulp-jshint");
var del = require("del");
var runSequence = require("run-sequence");
var browserSync = require("browser-sync").create();
var spa         = require("browser-sync-spa");
var argv = require("minimist")(process.argv.slice(2));
var $ = require("gulp-load-plugins")();
var angularTemplateCache   = require("gulp-angular-templatecache");
var angularFilesort        = require("gulp-angular-filesort");
var ngAnnotate             = require("gulp-ng-annotate");

var RELEASE = !!argv.release;
var AUTOPREFIXER_BROWSERS = [             
    "ie >= 10",
    "ie_mob >= 10",
    "ff >= 30",
    "chrome >= 34",
    "safari >= 7",
    "opera >= 23",
    "ios >= 7",
    "android >= 4.4",
    "bb >= 10"
];
// var DEPLOYMENT_NAME = "bionic_dev_studio";
var MODULE_NAME = "angularApp";
var SOURCE_BASE_DIR = "./src";
var TARGET_DIR = "./build";
var BUILD_BASE_DIR = TARGET_DIR;
var PROXY_PATHS = BUILD_BASE_DIR;


var path = {
    build: { 
        script: BUILD_BASE_DIR + "/js",
        styles: BUILD_BASE_DIR + "/css",
        fonts: BUILD_BASE_DIR + "/fonts",
        img: BUILD_BASE_DIR + "/img",
        index : BUILD_BASE_DIR + "/",
        templates : {
        dir : BUILD_BASE_DIR + "/js",
        name : "templates.js",
        rootPath : ""
  },
    },
    src: { 
        templates: [ SOURCE_BASE_DIR + '/app/**/*.html' ],
        script: {
        app: [ SOURCE_BASE_DIR + '/app/**/*.js' ],
        vendor: ["./src/assets/lib/angular/angular.js",
            "./src/assets/lib/angular-i18n/angular-locale_uk-ua.js",
            "./src/assets/lib/angular-bootstrap/ui-bootstrap-tpls.js",
            "./src/assets/lib/angular-ui-router/release/angular-ui-router.min.js",
            "./src/assets/lib/angular-trix/dist/angular-trix.min.js",
            "./src/assets/lib/trix/dist/trix.js",
            "./src/assets/lib/angular-smart-table/dist/smart-table.min.js",
            "./src/assets/lib/angular-file-saver/dist/angular-file-saver.min.js",
            "./src/assets/lib/angular-file-saver/dist/angular-file-saver.bundle.min.js",
            "./src/assets/lib/angular-sanitize/angular-sanitize.min.js"
        ]
        },
        styles: SOURCE_BASE_DIR + "/assets/sass/*.scss",
        fonts: [SOURCE_BASE_DIR + "/assets/fonts/**/*.*", "./src/assets/lib/bootstrap-sass/assets/fonts/**/*.*"],
        img: SOURCE_BASE_DIR + "/assets/img/**/*.*",
        index : SOURCE_BASE_DIR + "/index.html"
  
    },
    watch: { 
        templates: SOURCE_BASE_DIR + "/app/**/*.html",
        views: SOURCE_BASE_DIR + '/app/**/*.html',
        script: SOURCE_BASE_DIR + "/app/**/*.js",
        styles: SOURCE_BASE_DIR + "/assets/sass/**/*.scss",
        fonts: SOURCE_BASE_DIR + "/assets/fonts/**/*.*",
        img: SOURCE_BASE_DIR + "/assets/img/**/*.*",
        index : SOURCE_BASE_DIR + "/index.html",
        reload: BUILD_BASE_DIR + "/**/*.*"
    },
    clean: BUILD_BASE_DIR,
};

gulp.task("sass:build", function () {
    return gulp.src(path.src.styles)
        .pipe($.plumber())
        .pipe($.if(!RELEASE, $.sourcemaps.init()))
        .pipe($.sass())
        .pipe($.autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
        .pipe($.if(RELEASE, $.cssmin()))
        .pipe($.rename({
            suffix: ".min",
            extname: ".css"
        }))
        .pipe($.if(!RELEASE, $.sourcemaps.write({sourceRoot: './src/sass'})))
        .pipe(gulp.dest(path.build.styles));
});

gulp.task("vendor:build", function(){
    return gulp.src(path.src.script.vendor)
        .pipe($.if(!RELEASE, $.sourcemaps.init()))
        .pipe($.concat("vendor.js"))
        .pipe($.if(RELEASE,$.uglify()))
        .pipe($.rename({
            suffix: ".min",
            extname: ".js"
        }))
        .pipe($.if(!RELEASE, $.sourcemaps.write()))
        .pipe(gulp.dest(path.build.script));
});

gulp.task("script:build", function() {
  return gulp.src(path.src.script.app)
      .pipe($.if(!RELEASE, $.sourcemaps.init()))
      .pipe(angularFilesort())
      .pipe($.concat("app.js"))
      .pipe($.if(RELEASE, ngAnnotate()))
      .pipe($.if(RELEASE, $.uglify()))
      .pipe($.rename({
            suffix: ".min",
            extname: ".js"
      }))
      .pipe($.if(!RELEASE, $.sourcemaps.write()))
      .pipe(gulp.dest(path.build.script));
});

gulp.task("templates:build", function() {
  return gulp.src(path.src.templates)
       .pipe($.if(RELEASE, $.htmlmin({
            removeComments: true,
            collapseWhitespace: true,
            minifyJS: true,
            removeEmptyAttributes: true
        })))
      .pipe(angularTemplateCache(path.build.templates.name, {
        module : MODULE_NAME, root : path.build.templates.rootPath
      }))
    .pipe($.rename({
            suffix: ".min",
            extname: ".js"
      }))
      .pipe(gulp.dest(path.build.templates.dir));
});

gulp.task("index:build", function() {
  var appScriptSources = gulp.src([path.build.script + "/**/*.js"])
                             .pipe($.ignore.exclude(path.build.script  +"/vendor.min.js"))
                             .pipe(angularFilesort());
  
  var otherSources = gulp.src(["/" +"vendor.min.js",
                               path.build.styles + "/*.css"], {read: false});
  var sources = $.merge(otherSources, appScriptSources);

  return gulp.src(path.src.index)
      .pipe($.inject(sources, { ignorePath:"../build/", relative : true }))
      .pipe($.if(RELEASE, $.htmlmin({
          removeComments: true,
            collapseWhitespace: true,
            minifyJS: true
        })))
      .pipe(gulp.dest(path.build.index));
});

gulp.task("fonts:build", function() {
    return gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts));
});

gulp.task('image:build', function () {
   return gulp.src(path.src.img)
        .pipe(gulp.dest(path.build.img))
});

gulp.task("clean", del.bind(null, path.clean));

gulp.task("build", ["clean"],  function (cb) {
    runSequence(["sass:build","templates:build", "vendor:build", "script:build",  "fonts:build","image:build"],"index:build", cb);
});

gulp.task("browser-sync", function () {
    browserSync.init({
        server: {
            baseDir: PROXY_PATHS
        }
    });
    browserSync.watch(path.watch.reload).on("change", browserSync.reload);
});

browserSync.use(spa({
    selector: "[ng-app]",
    history: {
        index: PROXY_PATHS + '/index.html'
    }
}));


gulp.task("watch", function(){
    $.watch([path.watch.index], function(event, cb) {
        gulp.start("index:build");
    });

      $.watch([path.watch.templates], function(event, cb) {
        gulp.start("templates:build");
    });
  
    $.watch([path.watch.styles], function(event, cb) {
        gulp.start("sass:build");
    });

    $.watch([path.watch.script], function(event, cb) {
        gulp.start("script:build");
    });

    $.watch([path.watch.fonts], function(event, cb) {
        gulp.start("fonts:build");
    });

      $.watch([path.watch.img], function(event, cb) {
        gulp.start("image:build");
    });
});

gulp.task("serve", function (cb) {
    runSequence("build", ["browser-sync","watch"], cb);
});

gulp.task("storm", function (cb) {
    runSequence("build",  "watch", cb);
});

gulp.task("default", ["serve"]);
