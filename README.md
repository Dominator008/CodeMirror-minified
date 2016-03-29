# CodeMirror-minified
[![Build Status](https://travis-ci.org/Dominator008/CodeMirror-minified.svg?branch=master)](https://travis-ci.org/Dominator008/CodeMirror-minified) [![npm version](https://badge.fury.io/js/codemirror-minified.svg)](https://badge.fury.io/js/codemirror-minified)

## About
This is a minified CodeMirror distribution. All CSS files have been minified with clean-css, and all JavaScript files have been minified with Google Closure Compiler using SIMPLE_OPTIMIZATIONS. This projects has CodeMirror's main repository as a Git submodule and is released once per CodeMirror release using the same version number.

## Instructions
Just use this as if you are using the original CodeMirror library. All minified files retain their original name and location relative to CodeMirror's project root directory.

## Building it Yourself
We use Gulp:
```
npm install
gulp
```
