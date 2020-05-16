var gulp = require("gulp"),
    sass = require("gulp-sass"),
    consolidate = require('gulp-consolidate'),
    postcss = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    cssnano = require("cssnano"),
    sourcemaps = require("gulp-sourcemaps"),
    scssLint = require('gulp-scss-lint'),
    iconfont = require('gulp-iconfont'),
    browserSync = require("browser-sync").create(),
    iconfontCss = require("gulp-iconfont-css");

var paths = {
    styles: {
        src: "src/scss/**/*.scss",
        dest: "src/css"
    }
};

function style() {
    return gulp
        .src(paths.styles.src)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .on("error", sass.logError)
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browserSync.stream());
}

//scss lint
gulp.task('scss-lint', function () {
    return gulp.src('src/scss/*.scss')
        .pipe(scssLint({
            configFile: '.sass-lint.yml'
        }))
        .pipe(scssLint.format())
        .pipe(scssLint.failOnError())
});

//iconfont task
gulp.task('iconfont', function () {
    return gulp.src(['src/assets/svg/*.svg'])
        .pipe(iconfontCss({
            fontName: 'flat-icons',
            cssClass: 'icon',
            path: 'config/iconfont.scss',
            targetPath: '../../scss/layout/_icon-font.scss',
            fontPath: '../assets/fonts/'
        }))
        .pipe(
            iconfont({
                fontName: "flat-icons", // required
                prependUnicode: false, // recommended option
                formats: ["woff2", "woff", "ttf", "eot"], // default, 'woff2' and 'svg' are available
                normalize: true,
                centerHorizontally: true
            }))
        .pipe(gulp.dest('src/assets/fonts/'));
});


// Page reload
function reload() {
    browserSync.reload();
}

// Watch task
function watch() {
    browserSync.init({
        server: {
            baseDir: "./src"
        }
    });
    gulp.watch(paths.styles.src, style);
    gulp.watch("src/*.html").on('change', browserSync.reload);
}

exports.watch = watch

exports.style = style;

var build = gulp.parallel(style, watch);

gulp.task('default', build);