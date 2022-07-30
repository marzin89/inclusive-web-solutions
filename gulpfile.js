// Inkludera Gulp (objekt med funktioner)
const {src, dest, watch, series, parallel} = require('gulp');

// Inkludera gulp-concat
const concat = require('gulp-concat');

// Inkludera gulp-sass
const sass = require( 'gulp-sass' )( require( 'sass' ));

// Sökvägar till HTML, CSS, JS och bilder
const paths = {
    html:               'src/**/*.html',
    accessibleSass:     'src/sass/accessible/*.scss',
    lowContrastSass:    'src/sass/low-contrast/*.scss',
    unresponsiveSass:   'src/sass/unresponsive/*.scss',
    noTabFocusSass:     'src/sass/no-tab-focus/*.scss',
    smallFontSizeSass:  'src/sass/small-font-size/*.scss',
    images:             'src/images/*'
}

// Tasks
// Kopiera html-filer från src till pub
function htmlTask() {
    return src(paths.html)
    .pipe(dest('public'));
}

// Kompilera, slå samman, minifiera och kopiera sass-filer från src till pub, ladda om
function accessibleSassTask() {
    return src(paths.accessibleSass)
    .pipe(sass().on( 'error', sass.logError ))
    .pipe(concat( 'styles.css' ))
    .pipe(dest('public/css'));
}

function lowContrastSassTask() {
    return src(paths.lowContrastSass)
    .pipe(sass().on( 'error', sass.logError ))
    .pipe(concat( 'low-contrast.css' ))
    .pipe(dest('public/css'));
}

function unresponsiveSassTask() {
    return src(paths.unresponsiveSass)
    .pipe(sass().on( 'error', sass.logError ))
    .pipe(concat( 'unresponsive.css' ))
    .pipe(dest('public/css'));
}

function noTabFocusSassTask() {
    return src(paths.noTabFocusSass)
    .pipe(sass().on( 'error', sass.logError ))
    .pipe(concat( 'no-tab-focus.css' ))
    .pipe(dest('public/css'));
}

function smallFontSizeSassTask() {
    return src(paths.smallFontSizeSass)
    .pipe(sass().on( 'error', sass.logError ))
    .pipe(concat( 'small-font-size.css' ))
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
        [paths.html, paths.accessibleSass, paths.lowContrastSass, paths.unresponsiveSass,
            paths.noTabFocusSass, paths.smallFontSizeSass, paths.images],
        parallel(htmlTask, accessibleSassTask, lowContrastSassTask, unresponsiveSassTask,
            noTabFocusSassTask, smallFontSizeSassTask, imageTask)
    )
}
// Exportera tasks
exports.default = series(
    parallel(htmlTask, accessibleSassTask, lowContrastSassTask, unresponsiveSassTask, 
        noTabFocusSassTask, smallFontSizeSassTask, imageTask),
    watchTask
);