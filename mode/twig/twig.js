'use strict';(function(c){"object"==typeof exports&&"object"==typeof module?c(require("../../lib/codemirror"),require("../../addon/mode/multiplex")):"function"==typeof define&&define.amd?define(["../../lib/codemirror","../../addon/mode/multiplex"],c):c(CodeMirror)})(function(c){c.defineMode("twig:inner",function(){function c(a,b){var c=a.peek();if(b.incomment)return a.skipTo("#}")?(a.eatWhile(/\#|}/),b.incomment=!1):a.skipToEnd(),"comment";if(b.intag){if(b.operator){b.operator=!1;if(a.match(e))return"atom";
if(a.match(g))return"number"}if(b.sign){b.sign=!1;if(a.match(e))return"atom";if(a.match(g))return"number"}if(b.instring)return c==b.instring&&(b.instring=!1),a.next(),"string";if("'"==c||'"'==c)return b.instring=c,a.next(),"string";if(a.match(b.intag+"}")||a.eat("-")&&a.match(b.intag+"}"))return b.intag=!1,"tag";if(a.match(f))return b.operator=!0,"operator";if(a.match(k))b.sign=!0;else if(a.eat(" ")||a.sol()){if(a.match(d))return"keyword";if(a.match(e))return"atom";if(a.match(g))return"number";a.sol()&&
a.next()}else a.next();return"variable"}if(a.eat("{")){if(a.eat("#"))return b.incomment=!0,a.skipTo("#}")?(a.eatWhile(/\#|}/),b.incomment=!1):a.skipToEnd(),"comment";if(c=a.eat(/\{|%/))return b.intag=c,"{"==c&&(b.intag="}"),a.eat("-"),"tag"}a.next()}var d="and as autoescape endautoescape block do endblock else elseif extends for endfor embed endembed filter endfilter flush from if endif in is include import not or set spaceless endspaceless with endwith trans endtrans blocktrans endblocktrans macro endmacro use verbatim endverbatim".split(" "),
f=/^[+\-*&%=<>!?|~^]/,k=/^[:\[\(\{]/,e="true;false;null;empty;defined;divisibleby;divisible by;even;odd;iterable;sameas;same as".split(";"),g=/^(\d[+\-\*\/])?\d+(\.\d+)?/;d=new RegExp("(("+d.join(")|(")+"))\\b");e=new RegExp("(("+e.join(")|(")+"))\\b");return{startState:function(){return{}},token:function(a,b){return c(a,b)}}});c.defineMode("twig",function(h,d){var f=c.getMode(h,"twig:inner");return d&&d.base?c.multiplexingMode(c.getMode(h,d.base),{open:/\{[{#%]/,close:/[}#%]\}/,mode:f,parseDelimiters:!0}):
f});c.defineMIME("text/x-twig","twig")});
