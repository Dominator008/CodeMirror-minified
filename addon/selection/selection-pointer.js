'use strict';(function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)})(function(e){function g(a){a.state.selectionPointer.rects=null;h(a)}function h(a){a.state.selectionPointer.willUpdate||(a.state.selectionPointer.willUpdate=!0,setTimeout(function(){var b=a.state.selectionPointer;if(b){if(null==b.rects&&null!=b.mouseX&&(b.rects=[],a.somethingSelected()))for(var c=a.display.selectionDiv.firstChild;c;c=
c.nextSibling)b.rects.push(c.getBoundingClientRect());c=!1;if(null!=b.mouseX)for(var d=0;d<b.rects.length;d++){var f=b.rects[d];f.left<=b.mouseX&&f.right>=b.mouseX&&f.top<=b.mouseY&&f.bottom>=b.mouseY&&(c=!0)}b=c?b.value:"";a.display.lineDiv.style.cursor!=b&&(a.display.lineDiv.style.cursor=b)}a.state.selectionPointer.willUpdate=!1},50))}e.defineOption("selectionPointer",!1,function(a,b){var c=a.state.selectionPointer;c&&(e.off(a.getWrapperElement(),"mousemove",c.mousemove),e.off(a.getWrapperElement(),
"mouseout",c.mouseout),e.off(window,"scroll",c.windowScroll),a.off("cursorActivity",g),a.off("scroll",g),a.state.selectionPointer=null,a.display.lineDiv.style.cursor="");b&&(c=a.state.selectionPointer={value:"string"==typeof b?b:"default",mousemove:function(d){var f=a.state.selectionPointer;(null==d.buttons?d.which:d.buttons)?f.mouseX=f.mouseY=null:(f.mouseX=d.clientX,f.mouseY=d.clientY);h(a)},mouseout:function(d){a.getWrapperElement().contains(d.relatedTarget)||(d=a.state.selectionPointer,d.mouseX=
d.mouseY=null,h(a))},windowScroll:function(){g(a)},rects:null,mouseX:null,mouseY:null,willUpdate:!1},e.on(a.getWrapperElement(),"mousemove",c.mousemove),e.on(a.getWrapperElement(),"mouseout",c.mouseout),e.on(window,"scroll",c.windowScroll),a.on("cursorActivity",g),a.on("scroll",g))})});
