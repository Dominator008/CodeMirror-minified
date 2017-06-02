'use strict';(function(f){"object"==typeof exports&&"object"==typeof module?f(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],f):f(CodeMirror)})(function(f){function r(b,a){return"pairs"==a&&"string"==typeof b?b:"object"==typeof b&&null!=b[a]?b[a]:w[a]}function A(b){return function(a){return B(a,b)}}function v(b){var a=b.state.closeBrackets;return!a||a.override?a:b.getModeAt(b.getCursor()).closeBrackets||a}function B(b,a){var c=v(b);if(!c||b.getOption("disableInput"))return f.Pass;
var d=r(c,"pairs"),e=d.indexOf(a);if(-1==e)return f.Pass;for(var c=r(c,"triples"),t=d.charAt(e+1)==a,x=b.listSelections(),m=0==e%2,l,p=0;p<x.length;p++){var h=x[p],g=h.head,u=b.getRange(g,k(g.line,g.ch+1));if(m&&!h.empty())h="surround";else if(!t&&m||u!=a)if(t&&1<g.ch&&0<=c.indexOf(a)&&b.getRange(k(g.line,g.ch-2),g)==a+a&&(2>=g.ch||b.getRange(k(g.line,g.ch-3),k(g.line,g.ch-2))!=a))h="addFour";else if(t)if(!f.isWordChar(u)&&C(b,g,a))h="both";else return f.Pass;else if(m&&(b.getLine(g.line).length==
g.ch||D(u,d)||/\s/.test(u)))h="both";else return f.Pass;else h=t&&y(b,g)?"both":0<=c.indexOf(a)&&b.getRange(g,k(g.line,g.ch+3))==a+a+a?"skipThree":"skip";if(!l)l=h;else if(l!=h)return f.Pass}var n=e%2?d.charAt(e-1):a,q=e%2?a:d.charAt(e+1);b.operation(function(){if("skip"==l)b.execCommand("goCharRight");else if("skipThree"==l)for(var a=0;3>a;a++)b.execCommand("goCharRight");else if("surround"==l){for(var c=b.getSelections(),a=0;a<c.length;a++)c[a]=n+c[a]+q;b.replaceSelections(c,"around");c=b.listSelections().slice();
for(a=0;a<c.length;a++){var d=c,g=a;var e=c[a];var h=0<f.cmpPos(e.anchor,e.head);e={anchor:new k(e.anchor.line,e.anchor.ch+(h?-1:1)),head:new k(e.head.line,e.head.ch+(h?1:-1))};d[g]=e}b.setSelections(c)}else"both"==l?(b.replaceSelection(n+q,null),b.triggerElectric(n+q),b.execCommand("goCharLeft")):"addFour"==l&&(b.replaceSelection(n+n+n+n,"before"),b.execCommand("goCharRight"))})}function D(b,a){b=a.lastIndexOf(b);return-1<b&&1==b%2}function z(b,a){b=b.getRange(k(a.line,a.ch-1),k(a.line,a.ch+1));
return 2==b.length?b:null}function C(b,a,c){var d=b.getLine(a.line),e=b.getTokenAt(a);if(/\bstring2?\b/.test(e.type)||y(b,a))return!1;c=new f.StringStream(d.slice(0,a.ch)+c+d.slice(a.ch),4);for(c.pos=c.start=e.start;;){d=b.getMode().token(c,e.state);if(c.pos>=a.ch+1)return/\bstring2?\b/.test(d);c.start=c.pos}}function y(b,a){b=b.getTokenAt(k(a.line,a.ch+1));return/\bstring/.test(b.type)&&b.start==a.ch}var w={pairs:"()[]{}''\"\"",triples:"",explode:"[]{}"},k=f.Pos;f.defineOption("autoCloseBrackets",
!1,function(b,a,c){c&&c!=f.Init&&(b.removeKeyMap(p),b.state.closeBrackets=null);a&&(b.state.closeBrackets=a,b.addKeyMap(p))});for(var q=w.pairs+"`",p={Backspace:function(b){var a=v(b);if(!a||b.getOption("disableInput"))return f.Pass;for(var c=r(a,"pairs"),a=b.listSelections(),d=0;d<a.length;d++){if(!a[d].empty())return f.Pass;var e=z(b,a[d].head);if(!e||0!=c.indexOf(e)%2)return f.Pass}for(d=a.length-1;0<=d;d--)c=a[d].head,b.replaceRange("",k(c.line,c.ch-1),k(c.line,c.ch+1),"+delete")},Enter:function(b){var a=
v(b),a=a&&r(a,"explode");if(!a||b.getOption("disableInput"))return f.Pass;for(var c=b.listSelections(),d=0;d<c.length;d++){if(!c[d].empty())return f.Pass;var e=z(b,c[d].head);if(!e||0!=a.indexOf(e)%2)return f.Pass}b.operation(function(){b.replaceSelection("\n\n",null);b.execCommand("goCharLeft");c=b.listSelections();for(var a=0;a<c.length;a++){var d=c[a].head.line;b.indentLine(d,null,!0);b.indentLine(d+1,null,!0)}})}},m=0;m<q.length;m++)p["'"+q.charAt(m)+"'"]=A(q.charAt(m))});
