'use strict';(function(c){"object"==typeof exports&&"object"==typeof module?c(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],c):c(CodeMirror)})(function(c){c.defineMode("shell",function(){function c(a,b){b=b.split(" ");for(var e=0;e<b.length;e++)g[b[e]]=a}function n(a,b){if(a.eatSpace())return null;var e=a.sol(),d=a.next();if("\\"===d)return a.next(),null;if("'"===d||'"'===d||"`"===d)return b.tokens.unshift(l(d,"`"===d?"quote":"string")),h(a,
b);if("#"===d){if(e&&a.eat("!"))return a.skipToEnd(),"meta";a.skipToEnd();return"comment"}if("$"===d)return b.tokens.unshift(m),h(a,b);if("+"===d||"="===d)return"operator";if("-"===d)return a.eat("-"),a.eatWhile(/\w/),"attribute";if(/\d/.test(d)&&(a.eatWhile(/\d/),a.eol()||!/\w/.test(a.peek())))return"number";a.eatWhile(/[\w-]/);b=a.current();return"="===a.peek()&&/\w+/.test(b)?"def":g.hasOwnProperty(b)?g[b]:null}function l(a,b){var e="("==a?")":"{"==a?"}":a;return function(d,c){for(var k,g=!1,f=
!1;null!=(k=d.next());){if(k===e&&!f){g=!0;break}if("$"===k&&!f&&"'"!==a){f=!0;d.backUp(1);c.tokens.unshift(m);break}if(!f&&k===a&&a!==e)return c.tokens.unshift(l(a,b)),h(d,c);f=!f&&"\\"===k}!g&&f||c.tokens.shift();return b}}function h(a,b){return(b.tokens[0]||n)(a,b)}var g={};c("atom","true false");c("keyword","if then do else elif while until for in esac fi fin fil done exit set unset export function");c("builtin","ab awk bash beep cat cc cd chown chmod chroot clear cp curl cut diff echo find gawk gcc get git grep hg kill killall ln ls make mkdir openssl mv nc node npm ping ps restart rm rmdir sed service sh shopt shred source sort sleep ssh start stop su sudo svn tee telnet top touch vi vim wall wc wget who write yes zsh");
var m=function(a,b){1<b.tokens.length&&a.eat("$");var c=a.next();if(/['"({]/.test(c))return b.tokens[0]=l(c,"("==c?"quote":"{"==c?"def":"string"),h(a,b);/\d/.test(c)||a.eatWhile(/\w/);b.tokens.shift();return"def"};return{startState:function(){return{tokens:[]}},token:function(a,b){return h(a,b)},closeBrackets:"()[]{}''\"\"``",lineComment:"#",fold:"brace"}});c.defineMIME("text/x-sh","shell")});
