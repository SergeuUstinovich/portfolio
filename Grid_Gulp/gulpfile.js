const {src, dest, series, watch} = require('gulp');
const concat = require('gulp-concat');
const htmlMin = require('gulp-htmlmin');
const autoprefix = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css');
const svgSprite = require('gulp-svg-sprite');
const browserSync = require('browser-sync').create();
const imageMin = require('gulp-imagemin');
const uglify = require('gulp-uglify-es').default;
const babel = require('gulp-babel');
const environments = require('gulp-environments');
const notify = require('gulp-notify');
const sourcemap = require('gulp-sourcemaps');
const del = require('del');

const development = environments.development;
const production = environments.production;

const clean = () => {
   return del(['dist'])
}
 
const styles = () => {
   return src('src/**/*.css')
   .pipe(development(sourcemap.init()))
   .pipe(concat('style.css'))
   .pipe(autoprefix({
      cascade: false,
   }))
   .pipe(cleanCss({
      level: 2
   }))
   .pipe(development(sourcemap.write()))
   .pipe(dest('dist/css/'))
   .pipe(browserSync.stream())
}

const fonts = () => {
   return src('src/fonts/**/*')
   .pipe(dest('dist/fonts/'))
}

const htmlmin = () => {
   return src('src/**/*.html')
      .pipe(htmlMin({
         collapseWhitespace: true,
      }))
      .pipe(dest('dist'))
      .pipe(browserSync.stream())
}

const svgSprites = () => {
   return src('src/img/svg/*.svg')
   .pipe(svgSprite({
      mode: {
         stack: {
            sprite: '../sprite.svg'
         }
      }
   }))
   .pipe(dest('dist/img'))
}

const images = () => {
   return src([
      'src/img/**/*.jpg',
      'src/img/**/*.jpeg',
      'src/img/**/*.png',
      'src/img/*.svg',
   ])
   .pipe(imageMin())
   .pipe(dest('dist/img'))
   .pipe(browserSync.stream())
}

const favi = () => {
   return src([
      'src/favi/**/*.ico',
      'src/favi/**/*.png',
      'src/favi/*.svg',
   ])
   .pipe(imageMin())
   .pipe(dest('dist/favi/'))
   .pipe(browserSync.stream())
}

const jsugly = () => {
   return src([
      'src/js/*.js'
   ])
   .pipe(development(sourcemap.init()))
   .pipe(babel({
      presets: ['@babel/env']
   }))
   .pipe(concat('app.js'))
   .pipe(production(uglify().on('error', notify.onError())))
   .pipe(development(sourcemap.write()))
   .pipe(dest('dist/js'))
   .pipe(browserSync.stream())
}

const watchFiles = () => {
   browserSync.init({
      server: {
         baseDir: 'dist/'
      }
   });
}

watch('src/**/*.html', htmlmin);
watch('src/styles/**/*.css', styles);
watch('src/js/**/*.js', jsugly);
watch('src/img/svg/*.svg', svgSprites);

exports.styles = styles;
exports.htmlmin = htmlmin;
exports.clean = clean;

exports.default = series(clean, htmlmin, styles, fonts, svgSprites, images, favi, jsugly, watchFiles)
exports.build = series(clean, htmlmin, styles, fonts, svgSprites, images, favi, jsugly, watchFiles)
//gulp build --env production для запуска продакшн