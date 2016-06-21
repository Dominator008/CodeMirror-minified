/**
 * @license
 * The MIT License
 *
 * Copyright (c) 2016 Michael Zhou
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */

/**
 * @fileoverview Minification process for CodeMirror.
 * @author zhoumotongxue008@gmail.com (Michael Zhou)
 */

'use strict';

var gulp = require('gulp');
var flatmap = require('gulp-flatmap');
var closureCompiler = require('google-closure-compiler').gulp();
var cleanCss = require('gulp-clean-css');

/** @const */
var CM_ROOT = 'CodeMirror/';

function runFlatMap() {
  return flatmap(function(stream, file) {
    // Travis kills a build if no log output for 10 minutes
    console.log('Minifying ' + file.relative);
    return stream.pipe(closureCompiler({
      compilation_level: 'SIMPLE',
      language_in: 'ES6_STRICT',
      language_out: 'ES5_STRICT',
      js_output_file: file.relative,
      warning_level: 'QUIET'
    }));
  });
}

gulp.task('minify-js-main', function() {
  return gulp.src([
    CM_ROOT + 'addon/**/*.js',
    CM_ROOT + 'keymap/**/*.js',
    CM_ROOT + 'lib/**/*.js',
  ], {
    base: CM_ROOT
  })
  .pipe(runFlatMap())
  .pipe(gulp.dest('.'));
});

gulp.task('minify-js-mode', function() {
  return gulp.src([
    CM_ROOT + 'mode/**/*.js',
    '!' + CM_ROOT + 'mode/**/*test.js'
  ], {
    base: CM_ROOT
  })
  .pipe(runFlatMap())
  .pipe(gulp.dest('.'));
});

gulp.task('minify-css', function() {
  return gulp.src([
    CM_ROOT + 'addon/**/*.css',
    CM_ROOT + 'lib/**/*.css',
    CM_ROOT + 'mode/**/*.css',
    CM_ROOT + 'theme/**/*.css'
  ], {
    base: CM_ROOT
  })
  .pipe(cleanCss())
  .pipe(gulp.dest('.'));
});

gulp.task('copy-textfiles', function() {
  return gulp.src([
    CM_ROOT + 'AUTHORS',
    CM_ROOT + 'CHANGELOG.md'
  ], {
    base: CM_ROOT
  })
  .pipe(gulp.dest('.'));
});

gulp.task('minify', [
  'minify-js-main',
  'minify-js-mode',
  'minify-css'
]);

gulp.task('default', [
  'copy-textfiles',
  'minify'
]);
