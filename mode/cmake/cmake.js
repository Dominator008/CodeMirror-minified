'use strict';(function(d){"object"==typeof exports&&"object"==typeof module?d(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],d):d(CodeMirror)})(function(d){d.defineMode("cmake",function(){function e(a,c){for(var b,f,g=!1;!a.eol()&&(b=a.next())!=c.pending;){if("$"===b&&"\\"!=f&&'"'==c.pending){g=!0;break}f=b}g&&a.backUp(1);c.continueString=b==c.pending?!1:!0;return"string"}function h(a,c){var b=a.next();if("$"===b)return a.match(k)?"variable-2":
"variable";if(c.continueString)return a.backUp(1),e(a,c);if(a.match(/(\s+)?\w+\(/)||a.match(/(\s+)?\w+ \(/))return a.backUp(1),"def";if("#"==b)return a.skipToEnd(),"comment";if("'"==b||'"'==b)return c.pending=b,e(a,c);if("("==b||")"==b)return"bracket";if(b.match(/[0-9]/))return"number";a.eatWhile(/[\w-]/);return null}var k=/({)?[a-zA-Z0-9_]+(})?/;return{startState:function(){return{inDefinition:!1,inInclude:!1,continueString:!1,pending:!1}},token:function(a,c){return a.eatSpace()?null:h(a,c)}}});
d.defineMIME("text/x-cmake","cmake")});
