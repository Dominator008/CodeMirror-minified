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
var foreach = require('gulp-foreach');
var cleanCss = require('gulp-clean-css');
var closureCompiler = require('google-closure-compiler').gulp();

gulp.task('minify-css', function() {
  return gulp.src([
    'CodeMirror/addon/**/*.css',
    'CodeMirror/lib/**/*.css',
    'CodeMirror/mode/**/*.css',
    'CodeMirror/theme/**/*.css',
  ])
  .pipe(foreach(function(stream, file) {
    return stream
      .pipe(cleanCss())
      .pipe(gulp.dest(
        file.path.replace('CodeMirror/', '').replace(file.relative, '')));
  }));
});

gulp.task('minify-js', function() {
  return gulp.src([
    'CodeMirror/addon/**/*.js',
    'CodeMirror/keymap/**/*.js',
    'CodeMirror/lib/**/*.js',
    'CodeMirror/mode/**/*.js',
  ])
  .pipe(foreach(function(stream, file) {
    return stream.pipe(closureCompiler({
      compilation_level: 'SIMPLE',
      language_in: 'ES6_STRICT',
      language_out: 'ES5_STRICT',
      js_output_file: file.path.replace('CodeMirror/', ''),
      warning_level: 'QUIET'
    }));
  }))
  .pipe(gulp.dest('.'));
});

gulp.task('minify', ['minify-css', 'minify-js']);

gulp.task('default', ['minify']);
