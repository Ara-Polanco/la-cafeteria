const { src, dest, watch, series } = require('gulp')

/* Css y SASS */
const sass = require('gulp-sass') (require('sass'))
const autoprefixer = require('autoprefixer')
const postcss = require('gulp-postcss')

/* Imagenes */
const imagemin = require('gulp-imagemin')
const webp = require('gulp-webp')
const avif = require('gulp-avif')


function css(done) {
    src('assets/scss/app.scss')
        .pipe( sass() )
        .pipe( postcss ( [ autoprefixer()]))
        .pipe( dest('build/css') )

    done();
}

function imagenes( done ) {
    src('assets/img/**/*')
        .pipe(imagemin( {optimizationLevel : 3} ))
        .pipe( dest('build/img'))

    done()
}

function versionWebp() {
    return src('assets/img/**/*.{png,jpg}')
                .pipe( webp() )
                .pipe( dest('build/img'))
}

function versionAvif() {
    const opciones = {
        quality : 50
    }
    return src('assets/img/**/*.{png,jpg}')
                .pipe( avif( opciones) )
                .pipe( dest('build/img') )
}

function dev() {
    watch('assets/scss/**/*.scss', css);
    watch('assets/img/**/*', imagenes)
}

exports.css = css;
exports. dev = dev;
exports.imagenes = imagenes
exports.versionWebp = versionWebp
exports.versionAvif = versionAvif
exports.default = series( imagenes, versionWebp, versionAvif, css, dev );


