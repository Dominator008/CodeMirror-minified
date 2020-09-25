'use strict';var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.findInternal=function(f,g,k){f instanceof String&&(f=String(f));for(var p=f.length,l=0;l<p;l++){var u=f[l];if(g.call(k,u,l,f))return{i:l,v:u}}return{i:-1,v:void 0}};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.SIMPLE_FROUND_POLYFILL=!1;$jscomp.ISOLATE_POLYFILLS=!1;$jscomp.FORCE_POLYFILL_PROMISE=!1;$jscomp.ENABLE_UNHANDLED_REJECTION_POLYFILL=!0;
$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(f,g,k){if(f==Array.prototype||f==Object.prototype)return f;f[g]=k.value;return f};$jscomp.getGlobal=function(f){f=["object"==typeof globalThis&&globalThis,f,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof global&&global];for(var g=0;g<f.length;++g){var k=f[g];if(k&&k.Math==Math)return k}throw Error("Cannot find global object");};$jscomp.global=$jscomp.getGlobal(this);
$jscomp.IS_SYMBOL_NATIVE="function"===typeof Symbol&&"symbol"===typeof Symbol("x");$jscomp.TRUST_ES6_POLYFILLS=!$jscomp.ISOLATE_POLYFILLS||$jscomp.IS_SYMBOL_NATIVE;$jscomp.polyfills={};$jscomp.propertyToPolyfillSymbol={};$jscomp.POLYFILL_PREFIX="$jscp$";var $jscomp$lookupPolyfilledValue=function(f,g){var k=$jscomp.propertyToPolyfillSymbol[g];if(null==k)return f[g];k=f[k];return void 0!==k?k:f[g]};
$jscomp.polyfill=function(f,g,k,p){g&&($jscomp.ISOLATE_POLYFILLS?$jscomp.polyfillIsolated(f,g,k,p):$jscomp.polyfillUnisolated(f,g,k,p))};$jscomp.polyfillUnisolated=function(f,g,k,p){k=$jscomp.global;f=f.split(".");for(p=0;p<f.length-1;p++){var l=f[p];if(!(l in k))return;k=k[l]}f=f[f.length-1];p=k[f];g=g(p);g!=p&&null!=g&&$jscomp.defineProperty(k,f,{configurable:!0,writable:!0,value:g})};
$jscomp.polyfillIsolated=function(f,g,k,p){var l=f.split(".");f=1===l.length;p=l[0];p=!f&&p in $jscomp.polyfills?$jscomp.polyfills:$jscomp.global;for(var u=0;u<l.length-1;u++){var w=l[u];if(!(w in p))return;p=p[w]}l=l[l.length-1];k=$jscomp.IS_SYMBOL_NATIVE&&"es6"===k?p[l]:null;g=g(k);null!=g&&(f?$jscomp.defineProperty($jscomp.polyfills,l,{configurable:!0,writable:!0,value:g}):g!==k&&($jscomp.propertyToPolyfillSymbol[l]=$jscomp.IS_SYMBOL_NATIVE?$jscomp.global.Symbol(l):$jscomp.POLYFILL_PREFIX+l,l=
$jscomp.propertyToPolyfillSymbol[l],$jscomp.defineProperty(p,l,{configurable:!0,writable:!0,value:g})))};$jscomp.polyfill("Array.prototype.find",function(f){return f?f:function(g,k){return $jscomp.findInternal(this,g,k).v}},"es6","es3");
(function(f){"object"==typeof exports&&"object"==typeof module?f(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],f):f(CodeMirror)})(function(f){function g(b,a){var c=b.flags;for(var e=c=null!=c?c:(b.ignoreCase?"i":"")+(b.global?"g":"")+(b.multiline?"m":""),d=0;d<a.length;d++)-1==e.indexOf(a.charAt(d))&&(e+=a.charAt(d));return c==e?b:new RegExp(b.source,e)}function k(b,a,c){a=g(a,"g");var e=c.line,d=c.ch;for(c=b.lastLine();e<=c;e++,d=0)if(a.lastIndex=
d,d=b.getLine(e),d=a.exec(d))return{from:q(e,d.index),to:q(e,d.index+d[0].length),match:d}}function p(b,a,c){if(!/\\s|\\n|\n|\\W|\\D|\[\^/.test(a.source))return k(b,a,c);a=g(a,"gm");for(var e,d=1,h=c.line,m=b.lastLine();h<=m;){for(var n=0;n<d&&!(h>m);n++){var r=b.getLine(h++);e=null==e?r:e+"\n"+r}d*=2;a.lastIndex=c.ch;if(n=a.exec(e))return a=e.slice(0,n.index).split("\n"),b=n[0].split("\n"),c=c.line+a.length-1,a=a[a.length-1].length,{from:q(c,a),to:q(c+b.length-1,1==b.length?a+b[0].length:b[b.length-
1].length),match:n}}}function l(b,a,c){for(var e,d=0;d<=b.length;){a.lastIndex=d;d=a.exec(b);if(!d)break;var h=d.index+d[0].length;if(h>b.length-c)break;if(!e||h>e.index+e[0].length)e=d;d=d.index+1}return e}function u(b,a,c){a=g(a,"g");var e=c.line,d=c.ch;for(c=b.firstLine();e>=c;e--,d=-1){var h=b.getLine(e);if(d=l(h,a,0>d?0:h.length-d))return{from:q(e,d.index),to:q(e,d.index+d[0].length),match:d}}}function w(b,a,c){if(!/\\s|\\n|\n|\\W|\\D|\[\^/.test(a.source))return u(b,a,c);a=g(a,"gm");var e=1,
d=b.getLine(c.line).length-c.ch;c=c.line;for(var h=b.firstLine();c>=h;){for(var m=0;m<e&&c>=h;m++){var n=b.getLine(c--);var r=null==r?n:n+"\n"+r}e*=2;if(m=l(r,a,d))return a=r.slice(0,m.index).split("\n"),b=m[0].split("\n"),c+=a.length,a=a[a.length-1].length,{from:q(c,a),to:q(c+b.length-1,1==b.length?a+b[0].length:b[b.length-1].length),match:m}}}function v(b,a,c,e){if(b.length==a.length)return c;var d=0;for(a=c+Math.max(0,b.length-a.length);;){if(d==a)return d;var h=d+a>>1,m=e(b.slice(0,h)).length;
if(m==c)return h;m>c?a=h:d=h+1}}function C(b,a,c,e){if(!a.length)return null;e=e?x:y;a=e(a).split(/\r|\n\r?/);var d=c.line;c=c.ch;var h=b.lastLine()+1-a.length;a:for(;d<=h;d++,c=0){var m=b.getLine(d).slice(c),n=e(m);if(1==a.length){var r=n.indexOf(a[0]);if(-1==r)continue a;v(m,n,r,e);return{from:q(d,v(m,n,r,e)+c),to:q(d,v(m,n,r+a[0].length,e)+c)}}r=n.length-a[0].length;if(n.slice(r)!=a[0])continue a;for(var t=1;t<a.length-1;t++)if(e(b.getLine(d+t))!=a[t])continue a;t=b.getLine(d+a.length-1);var B=
e(t),z=a[a.length-1];if(B.slice(0,z.length)!=z)continue a;return{from:q(d,v(m,n,r,e)+c),to:q(d+a.length-1,v(t,B,z.length,e))}}}function D(b,a,c,e){if(!a.length)return null;e=e?x:y;a=e(a).split(/\r|\n\r?/);var d=c.line,h=c.ch,m=b.firstLine()-1+a.length;a:for(;d>=m;d--,h=-1){var n=b.getLine(d);-1<h&&(n=n.slice(0,h));h=e(n);if(1==a.length){c=h.lastIndexOf(a[0]);if(-1==c)continue a;return{from:q(d,v(n,h,c,e)),to:q(d,v(n,h,c+a[0].length,e))}}var r=a[a.length-1];if(h.slice(0,r.length)!=r)continue a;var t=
1;for(c=d-a.length+1;t<a.length-1;t++)if(e(b.getLine(c+t))!=a[t])continue a;c=b.getLine(d+1-a.length);t=e(c);if(t.slice(t.length-a[0].length)!=a[0])continue a;return{from:q(d+1-a.length,v(c,t,c.length-a[0].length,e)),to:q(d,v(n,h,r.length,e))}}}function A(b,a,c,e){this.atOccurrence=!1;this.doc=b;c=c?b.clipPos(c):q(0,0);this.pos={from:c,to:c};if("object"==typeof e)var d=e.caseFold;else d=e,e=null;"string"==typeof a?(null==d&&(d=!1),this.matches=function(h,m){return(h?D:C)(b,a,m,d)}):(a=g(a,"gm"),this.matches=
e&&!1===e.multiline?function(h,m){return(h?u:k)(b,a,m)}:function(h,m){return(h?w:p)(b,a,m)})}var q=f.Pos;if(String.prototype.normalize){var x=function(b){return b.normalize("NFD").toLowerCase()};var y=function(b){return b.normalize("NFD")}}else x=function(b){return b.toLowerCase()},y=function(b){return b};A.prototype={findNext:function(){return this.find(!1)},findPrevious:function(){return this.find(!0)},find:function(b){for(var a=this.matches(b,this.doc.clipPos(b?this.pos.from:this.pos.to));a&&0==
f.cmpPos(a.from,a.to);)b?a.from.ch?a.from=q(a.from.line,a.from.ch-1):a=a.from.line==this.doc.firstLine()?null:this.matches(b,this.doc.clipPos(q(a.from.line-1))):a.to.ch<this.doc.getLine(a.to.line).length?a.to=q(a.to.line,a.to.ch+1):a=a.to.line==this.doc.lastLine()?null:this.matches(b,q(a.to.line+1,0));if(a)return this.pos=a,this.atOccurrence=!0,this.pos.match||!0;b=q(b?this.doc.firstLine():this.doc.lastLine()+1,0);this.pos={from:b,to:b};return this.atOccurrence=!1},from:function(){if(this.atOccurrence)return this.pos.from},
to:function(){if(this.atOccurrence)return this.pos.to},replace:function(b,a){this.atOccurrence&&(b=f.splitLines(b),this.doc.replaceRange(b,this.pos.from,this.pos.to,a),this.pos.to=q(this.pos.from.line+b.length-1,b[b.length-1].length+(1==b.length?this.pos.from.ch:0)))}};f.defineExtension("getSearchCursor",function(b,a,c){return new A(this.doc,b,a,c)});f.defineDocExtension("getSearchCursor",function(b,a,c){return new A(this,b,a,c)});f.defineExtension("selectMatches",function(b,a){var c=[];for(b=this.getSearchCursor(b,
this.getCursor("from"),a);b.findNext()&&!(0<f.cmpPos(b.to(),this.getCursor("to")));)c.push({anchor:b.from(),head:b.to()});c.length&&this.setSelections(c,0)})});
