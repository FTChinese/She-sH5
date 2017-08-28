const nunjucks = require('nunjucks');
const gulp = require('gulp');
const fs = require('fs-jetpack');
const path = require('path');
const browserSync = require('browser-sync').create();
const $ = require('gulp-load-plugins')();
const rollup = require('rollup').rollup;
const babel = require('rollup-plugin-babel');
const nodeResolve = require('rollup-plugin-node-resolve');
const rollupUglify = require('rollup-plugin-uglify');
const minifyEs6 = require('uglify-es').minify;
const merge = require('merge-stream');
var cache;
const env = new nunjucks.Environment(
  new nunjucks.FileSystemLoader(
    ['views'],
    {
      watch:false,
      noCache:true
    }
  ),
  {
    autoescape:false
  }
);

function renderForView(template, context) {
  return new Promise(function(resolve, reject) {
    env.render(template, context, function(err,res) {
      if(err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
}

gulp.task('html', async function() {
  
  const destDir = '.tmp';

  const dataForRender = await fs.readAsync('./data/index.json','json');

  const renderResult = await renderForView('index.html',dataForRender);

  const destFile = path.resolve(destDir,'index.html');
  await fs.writeAsync(destFile,renderResult);
   
  browserSync.reload('*.html');
 
});

gulp.task('style',() => {
  const destDir = '.tmp/styles';
  return gulp.src('client/styles/main.scss')
    .pipe($.changed(destDir))
    .pipe($.plumber())
    .pipe($.sourcemaps.init({loadMaps:true}))
    .pipe($.sass({
      includePaths:['bower_components'],//@import的东西的查找位置
      outputStyle:'expanded',
      precision:10
    }).on('error',$.sass.logError))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest(destDir))
    .pipe(browserSync.stream({once:true}));
});

gulp.task('copysource', () => {
  const destDir = '.tmp/components';
  const copyCss = gulp.src('bower_Components/swiper/dist/css/swiper.min.css')
    .pipe(gulp.dest(destDir));
  const copyJs = gulp.src('bower_Components/swiper/dist/js/swiper.jquery.min.js')
    .pipe(gulp.dest(destDir));
  return merge(copyCss,copyJs);
});

gulp.task('script',() => {
   return rollup({
     entry:'client/js/main.js',
     cache: cache,
     plugins:[
       babel({//这里需要配置文件.babelrc
         exclude:'node_modules/**'
       }),
       nodeResolve({
         jsnext:true,
       }),
       rollupUglify({}, minifyEs6)//压缩es6代码
     ]
   }).then(function(bundle) {
     cache = bundle;//Cache for later use
     return bundle.write({//返回promise，以便下一步then()
       dest: '.tmp/scripts/main.js',
       format: 'iife',
       sourceMap: true
     });
   }).then(() => {
     browserSync.reload();
   }).catch(err => {
     console.log(err);
   });
});

gulp.task('serve',gulp.series('html','style','script',function() {
  browserSync.init({
    server:{
      baseDir: ['.tmp','static'],
      //directory:true,
      routes: {
        '/bower_components':'bower_components'
      }
    },
    port:9000
  });
  gulp.watch('client/styles/*.scss',gulp.parallel('style'));
  gulp.watch('client/js/*.js',gulp.parallel('script'));
  gulp.watch(['views/**/*.html','data/*.json'],gulp.parallel('html'));
}));