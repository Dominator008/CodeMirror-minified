'use strict';(function(k){"object"==typeof exports&&"object"==typeof module?k(require("../../lib/codemirror"),require("../xml/xml"),require("../meta")):"function"==typeof define&&define.amd?define(["../../lib/codemirror","../xml/xml","../meta"],k):k(CodeMirror)})(function(k){k.defineMode("markdown",function(A,d){function y(b,a,c){a.f=a.inline=c;return c(b,a)}function B(b){b.linkTitle=!1;b.linkHref=!1;b.linkText=!1;b.em=!1;b.strong=!1;b.strikethrough=!1;b.quote=0;b.indentedCode=!1;if(b.f==v){var a=
C;a||(a=k.innerMode(n,b.htmlState),a="xml"==a.mode.name&&null===a.state.tagStart&&!a.state.context&&a.state.tokenize.isInText);a&&(b.f=p,b.block=w,b.htmlState=null)}b.trailingSpace=0;b.trailingSpaceNewLine=!1;b.prevLine=b.thisLine;b.thisLine={stream:null};return null}function w(b,a){var c=b.column()===a.indentation,g=a.prevLine.stream;var l=!g||!/\S/.test(g.string);var q=a.indentedCode,h=a.prevLine.hr,r=!1!==a.list,m=(a.listStack[a.listStack.length-1]||0)+3;a.indentedCode=!1;g=a.indentation;if(null===
a.indentationDiff&&(a.indentationDiff=a.indentation,r)){for(a.list=null;g<a.listStack[a.listStack.length-1];)a.listStack.pop(),a.listStack.length?a.indentation=a.listStack[a.listStack.length-1]:a.list=!1;!1!==a.list&&(a.indentationDiff=g-a.listStack[a.listStack.length-1])}var t=!l&&!h&&!a.prevLine.header&&(!r||!q)&&!a.prevLine.fencedCodeEnd,z=(!1===a.list||h||l)&&a.indentation<=m&&b.match(H);h=null;if(4<=a.indentationDiff&&(q||a.prevLine.fencedCodeEnd||a.prevLine.header||l))return b.skipToEnd(),a.indentedCode=
!0,f.code;if(b.eatSpace())return null;if(c&&a.indentation<=m&&(h=b.match(I))&&6>=h[1].length)return a.quote=0,a.header=h[1].length,a.thisLine.header=!0,d.highlightFormatting&&(a.formatting="header"),a.f=a.inline,e(a);if(a.indentation<=m&&b.eat(">"))return a.quote=c?1:a.quote+1,d.highlightFormatting&&(a.formatting="quote"),b.eatSpace(),e(a);if(!z&&!a.setext&&c&&a.indentation<=m&&(h=b.match(J)))return c=h[1]?"ol":"ul",a.indentation=g+b.current().length,a.list=!0,a.quote=0,a.listStack.push(a.indentation),
a.em=!1,a.strong=!1,a.code=!1,a.strikethrough=!1,d.taskLists&&b.match(D,!1)&&(a.taskList=!0),a.f=a.inline,d.highlightFormatting&&(a.formatting=["list","list-"+c]),e(a);if(c&&a.indentation<=m&&(h=b.match(K,!0))){a.quote=0;a.fencedEndRE=new RegExp(h[1]+"+ *$");if(b=d.fencedCodeBlockHighlighting)b=h[2]||d.fencedCodeBlockDefaultMode,k.findModeByName&&(c=k.findModeByName(b))&&(b=c.mime||c.mimes[0]),b=k.getMode(A,b),b="null"==b.name?null:b;a.localMode=b;a.localMode&&(a.localState=k.startState(a.localMode));
a.f=a.block=L;d.highlightFormatting&&(a.formatting="code-block");a.code=-1;return e(a)}return a.setext||!(t&&r||a.quote||!1!==a.list||a.code||z||M.test(b.string))&&(h=b.lookAhead(1))&&(h=h.match(N))?(a.setext?(a.header=a.setext,a.setext=0,b.skipToEnd(),d.highlightFormatting&&(a.formatting="header")):(a.header="="==h[0].charAt(0)?1:2,a.setext=a.header),a.thisLine.header=!0,a.f=a.inline,e(a)):z?(b.skipToEnd(),a.hr=!0,a.thisLine.hr=!0,f.hr):"["===b.peek()?y(b,a,O):y(b,a,a.inline)}function v(b,a){var c=
n.token(b,a.htmlState);if(!C){var g=k.innerMode(n,a.htmlState);if("xml"==g.mode.name&&null===g.state.tagStart&&!g.state.context&&g.state.tokenize.isInText||a.md_inside&&-1<b.current().indexOf(">"))a.f=p,a.block=w,a.htmlState=null}return c}function L(b,a){var c=a.listStack[a.listStack.length-1]||0,g=a.indentation<c;if(a.fencedEndRE&&a.indentation<=c+3&&(g||b.match(a.fencedEndRE))){d.highlightFormatting&&(a.formatting="code-block");var l;g||(l=e(a));a.localMode=a.localState=null;a.block=w;a.f=p;a.fencedEndRE=
null;a.code=0;a.thisLine.fencedCodeEnd=!0;return g?(c=a.block,a.f=a.block=c,c(b,a)):l}if(a.localMode)return a.localMode.token(b,a.localState);b.skipToEnd();return f.code}function e(b){var a=[];if(b.formatting){a.push(f.formatting);"string"===typeof b.formatting&&(b.formatting=[b.formatting]);for(var c=0;c<b.formatting.length;c++)a.push(f.formatting+"-"+b.formatting[c]),"header"===b.formatting[c]&&a.push(f.formatting+"-"+b.formatting[c]+"-"+b.header),"quote"===b.formatting[c]&&(!d.maxBlockquoteDepth||
d.maxBlockquoteDepth>=b.quote?a.push(f.formatting+"-"+b.formatting[c]+"-"+b.quote):a.push("error"))}if(b.taskOpen)return a.push("meta"),a.length?a.join(" "):null;if(b.taskClosed)return a.push("property"),a.length?a.join(" "):null;b.linkHref?a.push(f.linkHref,"url"):(b.strong&&a.push(f.strong),b.em&&a.push(f.em),b.strikethrough&&a.push(f.strikethrough),b.emoji&&a.push(f.emoji),b.linkText&&a.push(f.linkText),b.code&&a.push(f.code),b.image&&a.push(f.image),b.imageAltText&&a.push(f.imageAltText,"link"),
b.imageMarker&&a.push(f.imageMarker));b.header&&a.push(f.header,f.header+"-"+b.header);b.quote&&(a.push(f.quote),!d.maxBlockquoteDepth||d.maxBlockquoteDepth>=b.quote?a.push(f.quote+"-"+b.quote):a.push(f.quote+"-"+d.maxBlockquoteDepth));!1!==b.list&&((c=(b.listStack.length-1)%3)?1===c?a.push(f.list2):a.push(f.list3):a.push(f.list1));b.trailingSpaceNewLine?a.push("trailing-space-new-line"):b.trailingSpace&&a.push("trailing-space-"+(b.trailingSpace%2?"a":"b"));return a.length?a.join(" "):null}function P(b,
a){if(b.match(Q,!0))return e(a)}function p(b,a){var c=a.text(b,a);if("undefined"!==typeof c)return c;if(a.list)return a.list=null,e(a);if(a.taskList)return" "===b.match(D,!0)[1]?a.taskOpen=!0:a.taskClosed=!0,d.highlightFormatting&&(a.formatting="task"),a.taskList=!1,e(a);a.taskOpen=!1;a.taskClosed=!1;if(a.header&&b.match(/^#+$/,!0))return d.highlightFormatting&&(a.formatting="header"),e(a);c=b.next();if(a.linkTitle){a.linkTitle=!1;var g=c;"("===c&&(g=")");g=(g+"").replace(/([.?*+^\[\]\\(){}|-])/g,
"\\$1");if(b.match(new RegExp("^\\s*(?:[^"+g+"\\\\]+|\\\\\\\\|\\\\.)"+g),!0))return f.linkHref}if("`"===c){c=a.formatting;d.highlightFormatting&&(a.formatting="code");b.eatWhile("`");b=b.current().length;if(0!=a.code||a.quote&&1!=b){if(b==a.code)return b=e(a),a.code=0,b;a.formatting=c;return e(a)}a.code=b;return e(a)}if(a.code)return e(a);if("\\"===c&&(b.next(),d.highlightFormatting))return c=e(a),a=f.formatting+"-escape",c?c+" "+a:a;if("!"===c&&b.match(/\[[^\]]*\] ?(?:\(|\[)/,!1))return a.imageMarker=
!0,a.image=!0,d.highlightFormatting&&(a.formatting="image"),e(a);if("["===c&&a.imageMarker&&b.match(/[^\]]*\](\(.*?\)| ?\[.*?\])/,!1))return a.imageMarker=!1,a.imageAltText=!0,d.highlightFormatting&&(a.formatting="image"),e(a);if("]"===c&&a.imageAltText)return d.highlightFormatting&&(a.formatting="image"),c=e(a),a.imageAltText=!1,a.image=!1,a.inline=a.f=E,c;if("["===c&&!a.image){if(a.linkText&&b.match(/^.*?\]/))return e(a);a.linkText=!0;d.highlightFormatting&&(a.formatting="link");return e(a)}if("]"===
c&&a.linkText)return d.highlightFormatting&&(a.formatting="link"),c=e(a),a.linkText=!1,a.inline=a.f=b.match(/\(.*?\)| ?\[.*?\]/,!1)?E:p,c;if("<"===c&&b.match(/^(https?|ftps?):\/\/(?:[^\\>]|\\.)+>/,!1))return a.f=a.inline=F,d.highlightFormatting&&(a.formatting="link"),c=e(a),(c?c+" ":"")+f.linkInline;if("<"===c&&b.match(/^[^> \\]+@(?:[^\\>]|\\.)+>/,!1))return a.f=a.inline=F,d.highlightFormatting&&(a.formatting="link"),c=e(a),(c?c+" ":"")+f.linkEmail;if(d.xml&&"<"===c&&b.match(/^(!--|\?|!\[CDATA\[|[a-z][a-z0-9-]*(?:\s+[a-z_:.\-]+(?:\s*=\s*[^>]+)?)*\s*(?:>|$))/i,
!1))return c=b.string.indexOf(">",b.pos),-1!=c&&(c=b.string.substring(b.start,c),/markdown\s*=\s*('|"){0,1}1('|"){0,1}/.test(c)&&(a.md_inside=!0)),b.backUp(1),a.htmlState=k.startState(n),c=v,a.f=a.block=c,c(b,a);if(d.xml&&"<"===c&&b.match(/^\/\w*?>/))return a.md_inside=!1,"tag";if("*"===c||"_"===c){for(var l=1,q=1==b.pos?" ":b.string.charAt(b.pos-2);3>l&&b.eat(c);)l++;var h=b.peek()||" ",r=!/\s/.test(h)&&(!u.test(h)||/\s/.test(q)||u.test(q)),m=!/\s/.test(q)&&(!u.test(q)||/\s/.test(h)||u.test(h)),
t=g=null;l%2&&(a.em||!r||"*"!==c&&m&&!u.test(q)?a.em!=c||!m||"*"!==c&&r&&!u.test(h)||(g=!1):g=!0);1<l&&(a.strong||!r||"*"!==c&&m&&!u.test(q)?a.strong!=c||!m||"*"!==c&&r&&!u.test(h)||(t=!1):t=!0);if(null!=t||null!=g)return d.highlightFormatting&&(a.formatting=null==g?"strong":null==t?"em":"strong em"),!0===g&&(a.em=c),!0===t&&(a.strong=c),b=e(a),!1===g&&(a.em=!1),!1===t&&(a.strong=!1),b}else if(" "===c&&(b.eat("*")||b.eat("_"))){if(" "===b.peek())return e(a);b.backUp(1)}if(d.strikethrough)if("~"===
c&&b.eatWhile(c)){if(a.strikethrough)return d.highlightFormatting&&(a.formatting="strikethrough"),b=e(a),a.strikethrough=!1,b;if(b.match(/^[^\s]/,!1))return a.strikethrough=!0,d.highlightFormatting&&(a.formatting="strikethrough"),e(a)}else if(" "===c&&b.match(/^~~/,!0)){if(" "===b.peek())return e(a);b.backUp(2)}if(d.emoji&&":"===c&&b.match(/^(?:[a-z_\d+][a-z_\d+-]*|\-[a-z_\d+][a-z_\d+-]*):/))return a.emoji=!0,d.highlightFormatting&&(a.formatting="emoji"),b=e(a),a.emoji=!1,b;" "===c&&(b.match(/^ +$/,
!1)?a.trailingSpace++:a.trailingSpace&&(a.trailingSpaceNewLine=!0));return e(a)}function F(b,a){if(">"===b.next())return a.f=a.inline=p,d.highlightFormatting&&(a.formatting="link"),b=e(a),(b?b+" ":"")+f.linkInline;b.match(/^[^>]+/,!0);return f.linkInline}function E(b,a){if(b.eatSpace())return null;b=b.next();return"("===b||"["===b?(a.f=a.inline=R("("===b?")":"]"),d.highlightFormatting&&(a.formatting="link-string"),a.linkHref=!0,e(a)):"error"}function R(b){return function(a,c){if(a.next()===b)return c.f=
c.inline=p,d.highlightFormatting&&(c.formatting="link-string"),a=e(c),c.linkHref=!1,a;a.match(S[b]);c.linkHref=!0;return e(c)}}function O(b,a){return b.match(/^([^\]\\]|\\.)*\]:/,!1)?(a.f=T,b.next(),d.highlightFormatting&&(a.formatting="link"),a.linkText=!0,e(a)):y(b,a,p)}function T(b,a){if(b.match(/^\]:/,!0))return a.f=a.inline=U,d.highlightFormatting&&(a.formatting="link"),b=e(a),a.linkText=!1,b;b.match(/^([^\]\\]|\\.)+/,!0);return f.linkText}function U(b,a){if(b.eatSpace())return null;b.match(/^[^\s]+/,
!0);void 0===b.peek()?a.linkTitle=!0:b.match(/^(?:\s+(?:"(?:[^"\\]|\\\\|\\.)+"|'(?:[^'\\]|\\\\|\\.)+'|\((?:[^)\\]|\\\\|\\.)+\)))?/,!0);a.f=a.inline=p;return f.linkHref+" url"}var n=k.getMode(A,"text/html"),C="null"==n.name;void 0===d.highlightFormatting&&(d.highlightFormatting=!1);void 0===d.maxBlockquoteDepth&&(d.maxBlockquoteDepth=0);void 0===d.taskLists&&(d.taskLists=!1);void 0===d.strikethrough&&(d.strikethrough=!1);void 0===d.emoji&&(d.emoji=!1);void 0===d.fencedCodeBlockHighlighting&&(d.fencedCodeBlockHighlighting=
!0);void 0===d.fencedCodeBlockDefaultMode&&(d.fencedCodeBlockDefaultMode="text/plain");void 0===d.xml&&(d.xml=!0);void 0===d.tokenTypeOverrides&&(d.tokenTypeOverrides={});var f={header:"header",code:"comment",quote:"quote",list1:"variable-2",list2:"variable-3",list3:"keyword",hr:"hr",image:"image",imageAltText:"image-alt-text",imageMarker:"image-marker",formatting:"formatting",linkInline:"link",linkEmail:"link",linkText:"link",linkHref:"string",em:"em",strong:"strong",strikethrough:"strikethrough",
emoji:"builtin"},x;for(x in f)f.hasOwnProperty(x)&&d.tokenTypeOverrides[x]&&(f[x]=d.tokenTypeOverrides[x]);var H=/^([*\-_])(?:\s*\1){2,}\s*$/,J=/^(?:[*\-+]|^[0-9]+([.)]))\s+/,D=/^\[(x| )\](?=\s)/i,I=d.allowAtxHeaderWithoutSpace?/^(#+)/:/^(#+)(?: |$)/,N=/^ {0,3}(?:={1,}|-{2,})\s*$/,Q=/^[^#!\[\]*_\\<>` "'(~:]+/,K=/^(~~~+|```+)[ \t]*([\w\/+#-]*)[^\n`]*$/,M=/^\s*\[[^\]]+?\]:.*$/,u=/[!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u0AF0\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E42\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC9\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDF3C-\uDF3E]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]/,
S={")":/^(?:[^\\\(\)]|\\.|\((?:[^\\\(\)]|\\.)*\))*?(?=\))/,"]":/^(?:[^\\\[\]]|\\.|\[(?:[^\\\[\]]|\\.)*\])*?(?=\])/},G={startState:function(){return{f:w,prevLine:{stream:null},thisLine:{stream:null},block:w,htmlState:null,indentation:0,inline:p,text:P,formatting:!1,linkText:!1,linkHref:!1,linkTitle:!1,code:0,em:!1,strong:!1,header:0,setext:0,hr:!1,taskList:!1,list:!1,listStack:[],quote:0,trailingSpace:0,trailingSpaceNewLine:!1,strikethrough:!1,emoji:!1,fencedEndRE:null}},copyState:function(b){return{f:b.f,
prevLine:b.prevLine,thisLine:b.thisLine,block:b.block,htmlState:b.htmlState&&k.copyState(n,b.htmlState),indentation:b.indentation,localMode:b.localMode,localState:b.localMode?k.copyState(b.localMode,b.localState):null,inline:b.inline,text:b.text,formatting:!1,linkText:b.linkText,linkTitle:b.linkTitle,linkHref:b.linkHref,code:b.code,em:b.em,strong:b.strong,strikethrough:b.strikethrough,emoji:b.emoji,header:b.header,setext:b.setext,hr:b.hr,taskList:b.taskList,list:b.list,listStack:b.listStack.slice(0),
quote:b.quote,indentedCode:b.indentedCode,trailingSpace:b.trailingSpace,trailingSpaceNewLine:b.trailingSpaceNewLine,md_inside:b.md_inside,fencedEndRE:b.fencedEndRE}},token:function(b,a){a.formatting=!1;if(b!=a.thisLine.stream){a.header=0;a.hr=!1;if(b.match(/^\s*$/,!0))return B(a),null;a.prevLine=a.thisLine;a.thisLine={stream:b};a.taskList=!1;a.trailingSpace=0;a.trailingSpaceNewLine=!1;if(!a.localState&&(a.f=a.block,a.f!=v)){var c=b.match(/^\s*/,!0)[0].replace(/\t/g,"    ").length;a.indentation=c;
a.indentationDiff=null;if(0<c)return null}}return a.f(b,a)},innerMode:function(b){return b.block==v?{state:b.htmlState,mode:n}:b.localState?{state:b.localState,mode:b.localMode}:{state:b,mode:G}},indent:function(b,a,c){return b.block==v&&n.indent?n.indent(b.htmlState,a,c):b.localState&&b.localMode.indent?b.localMode.indent(b.localState,a,c):k.Pass},blankLine:B,getType:e,blockCommentStart:"\x3c!--",blockCommentEnd:"--\x3e",closeBrackets:"()[]{}''\"\"``",fold:"markdown"};return G},"xml");k.defineMIME("text/markdown",
"markdown");k.defineMIME("text/x-markdown","markdown")});
