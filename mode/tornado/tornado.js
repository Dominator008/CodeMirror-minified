'use strict';(function(a){"object"==typeof exports&&"object"==typeof module?a(require("../../lib/codemirror"),require("../htmlmixed/htmlmixed"),require("../../addon/mode/overlay")):"function"==typeof define&&define.amd?define(["../../lib/codemirror","../htmlmixed/htmlmixed","../../addon/mode/overlay"],a):a(CodeMirror)})(function(a){a.defineMode("tornado:inner",function(){function d(b,c){b.eatWhile(/[^\{]/);var e=b.next();if("{"==e&&(e=b.eat(/\{|%|#/)))return c.tokenize=f(e),"tag"}function f(b){"{"==
b&&(b="}");return function(c,e){return c.next()==b&&c.eat("}")?(e.tokenize=d,"tag"):c.match(g)?"keyword":"#"==b?"comment":"string"}}var g="and as assert autoescape block break class comment context continue datetime def del elif else end escape except exec extends false finally for from global if import in include is json_encode lambda length linkify load module none not or pass print put raise raw return self set squeeze super true try url_escape while with without xhtml_escape yield".split(" ");
g=new RegExp("^(("+g.join(")|(")+"))\\b");return{startState:function(){return{tokenize:d}},token:function(b,c){return c.tokenize(b,c)}}});a.defineMode("tornado",function(d){var f=a.getMode(d,"text/html");d=a.getMode(d,"tornado:inner");return a.overlayMode(f,d)});a.defineMIME("text/x-tornado","tornado")});
