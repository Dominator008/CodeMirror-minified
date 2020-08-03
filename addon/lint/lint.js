'use strict';(function(k){"object"==typeof exports&&"object"==typeof module?k(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],k):k(CodeMirror)})(function(k){function x(a,c,d){function e(f){if(!b.parentNode)return k.off(document,"mousemove",e);b.style.top=Math.max(0,f.clientY-b.offsetHeight-5)+"px";b.style.left=f.clientX+5+"px"}var b=document.createElement("div");b.className="CodeMirror-lint-tooltip cm-s-"+a.options.theme;b.appendChild(d.cloneNode(!0));
a.state.lint.options.selfContain?a.getWrapperElement().appendChild(b):document.body.appendChild(b);k.on(document,"mousemove",e);e(c);null!=b.style.opacity&&(b.style.opacity=1);return b}function y(a){a.parentNode&&(null==a.style.opacity&&a.parentNode&&a.parentNode.removeChild(a),a.style.opacity=0,setTimeout(function(){a.parentNode&&a.parentNode.removeChild(a)},600))}function r(a,c,d,e){function b(){k.off(e,"mouseout",b);f&&(y(f),f=null)}var f=x(a,c,d),h=setInterval(function(){if(f)for(var g=e;;g=g.parentNode){g&&
11==g.nodeType&&(g=g.host);if(g==document.body)return;if(!g){b();break}}if(!f)return clearInterval(h)},400);k.on(e,"mouseout",b)}function z(a,c,d){this.marked=[];this.options=c;this.timeout=null;this.hasGutter=d;this.onMouseOver=function(e){var b=e.target||e.srcElement;if(/\bCodeMirror-lint-mark-/.test(b.className)){b=b.getBoundingClientRect();var f=a.findMarksAt(a.coordsChar({left:(b.left+b.right)/2,top:(b.top+b.bottom)/2},"client"));b=[];for(var h=0;h<f.length;++h){var g=f[h].__annotation;g&&b.push(g)}if(b.length){f=
e.target||e.srcElement;h=document.createDocumentFragment();for(g=0;g<b.length;g++)h.appendChild(t(b[g]));r(a,e,h,f)}}};this.waitingFor=0}function u(a){var c=a.state.lint;c.hasGutter&&a.clearGutter("CodeMirror-lint-markers");for(a=0;a<c.marked.length;++a)c.marked[a].clear();c.marked.length=0}function A(a,c,d,e,b){var f=document.createElement("div"),h=f;f.className="CodeMirror-lint-marker-"+d;e&&(h=f.appendChild(document.createElement("div")),h.className="CodeMirror-lint-marker-multiple");if(0!=b)k.on(h,
"mouseover",function(g){r(a,g,c,h)});return f}function t(a){var c=a.severity;c||(c="error");var d=document.createElement("div");d.className="CodeMirror-lint-message-"+c;"undefined"!=typeof a.messageHTML?d.innerHTML=a.messageHTML:d.appendChild(document.createTextNode(a.message));return d}function B(a,c,d){function e(){f=-1;a.off("change",e)}var b=a.state.lint,f=++b.waitingFor;a.on("change",e);c(a.getValue(),function(h,g){a.off("change",e);b.waitingFor==f&&(g&&h instanceof k&&(h=g),a.operation(function(){n(a,
h)}))},d,a)}function p(a){var c=a.state.lint.options,d=c.options||c,e=c.getAnnotations||a.getHelper(k.Pos(0,0),"lint");if(e)if(c.async||e.async)B(a,e,d);else{var b=e(a.getValue(),d,a);b&&(b.then?b.then(function(f){a.operation(function(){n(a,f)})}):a.operation(function(){n(a,b)}))}}function n(a,c){u(a);for(var d=a.state.lint,e=d.options,b=[],f=0;f<c.length;++f){var h=c[f],g=h.from.line;(b[g]||(b[g]=[])).push(h)}for(f=0;f<b.length;++f)if(h=b[f]){g=null;for(var v=d.hasGutter&&document.createDocumentFragment(),
q=0;q<h.length;++q){var l=h[q],m=l.severity;m||(m="error");"error"!=g&&(g=m);e.formatAnnotation&&(l=e.formatAnnotation(l));d.hasGutter&&v.appendChild(t(l));l.to&&d.marked.push(a.markText(l.from,l.to,{className:"CodeMirror-lint-mark-"+m,__annotation:l}))}d.hasGutter&&a.setGutterMarker(f,"CodeMirror-lint-markers",A(a,v,g,1<h.length,d.options.tooltips))}if(e.onUpdateLinting)e.onUpdateLinting(c,b,a)}function w(a){var c=a.state.lint;c&&(clearTimeout(c.timeout),c.timeout=setTimeout(function(){p(a)},c.options.delay||
500))}k.defineOption("lint",!1,function(a,c,d){d&&d!=k.Init&&(u(a),!1!==a.state.lint.options.lintOnChange&&a.off("change",w),k.off(a.getWrapperElement(),"mouseover",a.state.lint.onMouseOver),clearTimeout(a.state.lint.timeout),delete a.state.lint);if(c){var e=a.getOption("gutters");d=!1;for(var b=0;b<e.length;++b)"CodeMirror-lint-markers"==e[b]&&(d=!0);e=a.state;c instanceof Function?c={getAnnotations:c}:c&&!0!==c||(c={});d=e.lint=new z(a,c,d);if(!1!==d.options.lintOnChange)a.on("change",w);if(0!=
d.options.tooltips&&"gutter"!=d.options.tooltips)k.on(a.getWrapperElement(),"mouseover",d.onMouseOver);p(a)}});k.defineExtension("performLint",function(){this.state.lint&&p(this)})});
