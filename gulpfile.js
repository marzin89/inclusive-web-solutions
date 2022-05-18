// Inkludera Gulp (objekt med funktioner)
const {src, dest, watch, series, parallel} = require('gulp');

// Inkludera gulp-concat
const concat = require('gulp-concat');

// Inkludera gulp-sass
const sass = require( 'gulp-sass' )( require( 'sass' ));

// Sökvägar till HTML, CSS, JS och bilder
const paths = {
    html: 'src/**/*.html',
    sass: 'src/**/*.scss',
    images: 'src/images/*'
}

// Tasks
// Kopiera html-filer från src till pub
function htmlTask() {
    return src(paths.html)
    .pipe(dest('public'));
}

// Kompilera, slå samman, minifiera och kopiera sass-filer från src till pub, ladda om
function sassTask() {
    return src(paths.sass)
    .pipe(sass().on( 'error', sass.logError ))
    .pipe(concat( 'styles.css' ))
    .pipe(dest('public/css'));
}

// Komprimera och kopiera bilder från src till pub
function imageTask() {
    return src(paths.images)
    .pipe(dest('public/images'));
}

// Lyssna och utför tasks vid ändring
function watchTask() {
    // Lyssna, utför tasks och ladda om webbläsaren
    watch(
        [paths.html, paths.sass, paths.images],
        parallel(htmlTask, sassTask, imageTask)
    )
}
// Exportera tasks
exports.default = series(
    parallel(htmlTask, sassTask, imageTask),
    watchTask
);