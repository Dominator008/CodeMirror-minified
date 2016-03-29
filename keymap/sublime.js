'use strict';(function(l){"object"==typeof exports&&"object"==typeof module?l(require("../lib/codemirror"),require("../addon/search/searchcursor"),require("../addon/edit/matchbrackets")):"function"==typeof define&&define.amd?define(["../lib/codemirror","../addon/search/searchcursor","../addon/edit/matchbrackets"],l):l(CodeMirror)})(function(l){function t(a,b){a.extendSelectionsBy(function(d){if(a.display.shift||a.doc.extend||d.empty()){var f;var m=a.doc;d=d.head;if(0>b&&0==d.ch)f=m.clipPos(k(d.line-
1));else{var c=m.getLine(d.line);if(0<b&&d.ch>=c.length)f=m.clipPos(k(d.line+1,0));else{for(var m="start",h=d.ch,e=0>b?0:c.length,g=0;h!=e;h+=b,g++){var q=c.charAt(0>b?h-1:h),p="_"!=q&&l.isWordChar(q)?"w":"o";"w"==p&&q.toUpperCase()==q&&(p="W");if("start"==m)"o"!=p&&(m="in",f=p);else if("in"==m&&f!=p)if("w"==f&&"W"==p&&0>b&&h--,"W"==f&&"w"==p&&0<b)f="w";else break}f=k(d.line,h)}}return f}return 0>b?d.from():d.to()})}function u(a,b){if(a.isReadOnly())return l.Pass;a.operation(function(){for(var d=
a.listSelections().length,f=[],m=-1,c=0;c<d;c++){var h=a.listSelections()[c].head;h.line<=m||(m=k(h.line+(b?0:1),0),a.replaceRange("\n",m,null,"+insertLine"),a.indentLine(m.line,null,!0),f.push({head:m,anchor:m}),m=h.line+1)}a.setSelections(f)})}function r(a,b){for(var d=b.ch,f=d,m=a.getLine(b.line);d&&l.isWordChar(m.charAt(d-1));)--d;for(;f<m.length&&l.isWordChar(m.charAt(f));)++f;return{from:k(b.line,d),to:k(b.line,f),word:m.slice(d,f)}}function v(a){var b=a.getCursor(),d=a.scanForBracket(b,-1);
if(d)for(;;){b=a.scanForBracket(b,1);if(!b)break;if(b.ch=="(){}[]".charAt("(){}[]".indexOf(d.ch)+1))return a.setSelection(k(d.pos.line,d.pos.ch+1),b.pos,!1),!0;b=k(b.pos.line,b.pos.ch+1)}}function w(a,b){if(a.isReadOnly())return l.Pass;for(var d=a.listSelections(),f=[],m,c=0;c<d.length;c++){var h=d[c];if(!h.empty()){for(var e=h.from().line,g=h.to().line;c<d.length-1&&d[c+1].from().line==g;)g=h[++c].to().line;f.push(e,g)}}f.length?m=!0:f.push(a.firstLine(),a.lastLine());a.operation(function(){for(var d=
[],c=0;c<f.length;c+=2){var h=f[c+1],e=k(f[c],0),h=k(h),g=a.getRange(e,h,!1);b?g.sort():g.sort(function(a,b){var d=a.toUpperCase(),f=b.toUpperCase();d!=f&&(a=d,b=f);return a<b?-1:a==b?0:1});a.replaceRange(g,e,h);m&&d.push({anchor:e,head:h})}m&&a.setSelections(d,0)})}function x(a,b){a.operation(function(){for(var d=a.listSelections(),f=[],c=[],e=0;e<d.length;e++){var h=d[e];h.empty()?(f.push(e),c.push("")):c.push(b(a.getRange(h.from(),h.to())))}a.replaceSelections(c,"around","case");for(var e=f.length-
1,g;0<=e;e--)h=d[f[e]],g&&0<l.cmpPos(h.head,g)||(c=r(a,h.head),g=c.from,a.replaceRange(b(c.word),c.from,c.to))})}function y(a){var b=a.getCursor("from"),d=a.getCursor("to");if(0==l.cmpPos(b,d)){var f=r(a,b);if(!f.word)return;b=f.from;d=f.to}return{from:b,to:d,query:a.getRange(b,d),word:f}}function z(a,b){var d=y(a);if(d){var f=d.query,c=a.getSearchCursor(f,b?d.to:d.from);(b?c.findNext():c.findPrevious())?a.setSelection(c.from(),c.to()):(c=a.getSearchCursor(f,b?k(a.firstLine(),0):a.clipPos(k(a.lastLine()))),
(b?c.findNext():c.findPrevious())?a.setSelection(c.from(),c.to()):d.word&&a.setSelection(d.from,d.to))}}var c=l.keyMap.sublime={fallthrough:"default"},e=l.commands,k=l.Pos,n=l.keyMap["default"]==l.keyMap.macDefault,g=n?"Cmd-":"Ctrl-";e[c["Alt-Left"]="goSubwordLeft"]=function(a){t(a,-1)};e[c["Alt-Right"]="goSubwordRight"]=function(a){t(a,1)};var A=n?"Ctrl-Alt-":"Ctrl-";e[c[A+"Up"]="scrollLineUp"]=function(a){var b=a.getScrollInfo();if(!a.somethingSelected()){var d=a.lineAtHeight(b.top+b.clientHeight,
"local");a.getCursor().line>=d&&a.execCommand("goLineUp")}a.scrollTo(null,b.top-a.defaultTextHeight())};e[c[A+"Down"]="scrollLineDown"]=function(a){var b=a.getScrollInfo();if(!a.somethingSelected()){var d=a.lineAtHeight(b.top,"local")+1;a.getCursor().line<=d&&a.execCommand("goLineDown")}a.scrollTo(null,b.top+a.defaultTextHeight())};e[c["Shift-"+g+"L"]="splitSelectionByLine"]=function(a){for(var b=a.listSelections(),d=[],f=0;f<b.length;f++)for(var c=b[f].from(),e=b[f].to(),h=c.line;h<=e.line;++h)e.line>
c.line&&h==e.line&&0==e.ch||d.push({anchor:h==c.line?c:k(h,0),head:h==e.line?e:k(h)});a.setSelections(d,0)};c["Shift-Tab"]="indentLess";e[c.Esc="singleSelectionTop"]=function(a){var b=a.listSelections()[0];a.setSelection(b.anchor,b.head,{scroll:!1})};e[c[g+"L"]="selectLine"]=function(a){for(var b=a.listSelections(),d=[],f=0;f<b.length;f++){var c=b[f];d.push({anchor:k(c.from().line,0),head:k(c.to().line+1,0)})}a.setSelections(d)};c["Shift-Ctrl-K"]="deleteLine";e[c[g+"Enter"]="insertLineAfter"]=function(a){return u(a,
!1)};e[c["Shift-"+g+"Enter"]="insertLineBefore"]=function(a){return u(a,!0)};e[c[g+"D"]="selectNextOccurrence"]=function(a){var b=a.getCursor("from"),d=a.getCursor("to"),f=a.state.sublimeFindFullWord==a.doc.sel;if(0==l.cmpPos(b,d)){f=r(a,b);if(!f.word)return;a.setSelection(f.from,f.to);f=!0}else b=a.getRange(b,d),b=f?new RegExp("\\b"+b+"\\b"):b,d=a.getSearchCursor(b,d),d.findNext()?a.addSelection(d.from(),d.to()):(d=a.getSearchCursor(b,k(a.firstLine(),0)),d.findNext()&&a.addSelection(d.from(),d.to()));
f&&(a.state.sublimeFindFullWord=a.doc.sel)};e[c["Shift-"+g+"Space"]="selectScope"]=function(a){v(a)||a.execCommand("selectAll")};e[c["Shift-"+g+"M"]="selectBetweenBrackets"]=function(a){if(!v(a))return l.Pass};e[c[g+"M"]="goToBracket"]=function(a){a.extendSelectionsBy(function(b){var d=a.scanForBracket(b.head,1);return d&&0!=l.cmpPos(d.pos,b.head)?d.pos:(d=a.scanForBracket(b.head,-1))&&k(d.pos.line,d.pos.ch+1)||b.head})};n=n?"Cmd-Ctrl-":"Shift-Ctrl-";e[c[n+"Up"]="swapLineUp"]=function(a){if(a.isReadOnly())return l.Pass;
for(var b=a.listSelections(),d=[],f=a.firstLine()-1,c=[],e=0;e<b.length;e++){var h=b[e],g=h.from().line-1,n=h.to().line;c.push({anchor:k(h.anchor.line-1,h.anchor.ch),head:k(h.head.line-1,h.head.ch)});0!=h.to().ch||h.empty()||--n;g>f?d.push(g,n):d.length&&(d[d.length-1]=n);f=n}a.operation(function(){for(var b=0;b<d.length;b+=2){var f=d[b],e=d[b+1],h=a.getLine(f);a.replaceRange("",k(f,0),k(f+1,0),"+swapLine");e>a.lastLine()?a.replaceRange("\n"+h,k(a.lastLine()),null,"+swapLine"):a.replaceRange(h+"\n",
k(e,0),null,"+swapLine")}a.setSelections(c);a.scrollIntoView()})};e[c[n+"Down"]="swapLineDown"]=function(a){if(a.isReadOnly())return l.Pass;for(var b=a.listSelections(),d=[],f=a.lastLine()+1,c=b.length-1;0<=c;c--){var e=b[c],h=e.to().line+1,g=e.from().line;0!=e.to().ch||e.empty()||h--;h<f?d.push(h,g):d.length&&(d[d.length-1]=g);f=g}a.operation(function(){for(var b=d.length-2;0<=b;b-=2){var f=d[b],c=d[b+1],e=a.getLine(f);f==a.lastLine()?a.replaceRange("",k(f-1),k(f),"+swapLine"):a.replaceRange("",
k(f,0),k(f+1,0),"+swapLine");a.replaceRange(e+"\n",k(c,0),null,"+swapLine")}a.scrollIntoView()})};e[c[g+"/"]="toggleCommentIndented"]=function(a){a.toggleComment({indent:!0})};e[c[g+"J"]="joinLines"]=function(a){for(var b=a.listSelections(),d=[],f=0;f<b.length;f++){for(var c=b[f],e=c.from(),h=e.line,g=c.to().line;f<b.length-1&&b[f+1].from().line==g;)g=b[++f].to().line;d.push({start:h,end:g,anchor:!c.empty()&&e})}a.operation(function(){for(var b=0,f=[],c=0;c<d.length;c++){for(var e=d[c],h=e.anchor&&
k(e.anchor.line-b,e.anchor.ch),g,m=e.start;m<=e.end;m++){var l=m-b;m==e.end&&(g=k(l,a.getLine(l).length+1));l<a.lastLine()&&(a.replaceRange(" ",k(l),k(l+1,/^\s*/.exec(a.getLine(l+1))[0].length)),++b)}f.push({anchor:h||g,head:g})}a.setSelections(f,0)})};e[c["Shift-"+g+"D"]="duplicateLine"]=function(a){a.operation(function(){for(var b=a.listSelections().length,d=0;d<b;d++){var c=a.listSelections()[d];c.empty()?a.replaceRange(a.getLine(c.head.line)+"\n",k(c.head.line,0)):a.replaceRange(a.getRange(c.from(),
c.to()),c.from())}a.scrollIntoView()})};c[g+"T"]="transposeChars";e[c.F9="sortLines"]=function(a){w(a,!0)};e[c[g+"F9"]="sortLinesInsensitive"]=function(a){w(a,!1)};e[c.F2="nextBookmark"]=function(a){var b=a.state.sublimeBookmarks;if(b)for(;b.length;){var d=b.shift(),c=d.find();if(c)return b.push(d),a.setSelection(c.from,c.to)}};e[c["Shift-F2"]="prevBookmark"]=function(a){var b=a.state.sublimeBookmarks;if(b)for(;b.length;){b.unshift(b.pop());var d=b[b.length-1].find();if(d)return a.setSelection(d.from,
d.to);b.pop()}};e[c[g+"F2"]="toggleBookmark"]=function(a){for(var b=a.listSelections(),d=a.state.sublimeBookmarks||(a.state.sublimeBookmarks=[]),c=0;c<b.length;c++){for(var e=b[c].from(),g=b[c].to(),h=a.findMarks(e,g),k=0;k<h.length;k++)if(h[k].sublimeBookmark){h[k].clear();for(var l=0;l<d.length;l++)d[l]==h[k]&&d.splice(l--,1);break}k==h.length&&d.push(a.markText(e,g,{sublimeBookmark:!0,clearWhenEmpty:!1}))}};e[c["Shift-"+g+"F2"]="clearBookmarks"]=function(a){if(a=a.state.sublimeBookmarks)for(var b=
0;b<a.length;b++)a[b].clear();a.length=0};e[c["Alt-F2"]="selectBookmarks"]=function(a){var b=a.state.sublimeBookmarks,d=[];if(b)for(var c=0;c<b.length;c++){var e=b[c].find();e?d.push({anchor:e.from,head:e.to}):b.splice(c--,0)}d.length&&a.setSelections(d,0)};c["Alt-Q"]="wrapLines";n=g+"K ";c[n+g+"Backspace"]="delLineLeft";e[c.Backspace="smartBackspace"]=function(a){if(a.somethingSelected())return l.Pass;var b=a.getCursor(),d=a.getRange({line:b.line,ch:0},b),c=l.countColumn(d,null,a.getOption("tabSize")),
e=a.getOption("indentUnit");return d&&!/\S/.test(d)&&0==c%e?(d=new k(b.line,l.findColumn(d,c-e,e)),d.ch==b.ch?l.Pass:a.replaceRange("",d,b,"+delete")):l.Pass};e[c[n+g+"K"]="delLineRight"]=function(a){a.operation(function(){for(var b=a.listSelections(),d=b.length-1;0<=d;d--)a.replaceRange("",b[d].anchor,k(b[d].to().line),"+delete");a.scrollIntoView()})};e[c[n+g+"U"]="upcaseAtCursor"]=function(a){x(a,function(a){return a.toUpperCase()})};e[c[n+g+"L"]="downcaseAtCursor"]=function(a){x(a,function(a){return a.toLowerCase()})};
e[c[n+g+"Space"]="setSublimeMark"]=function(a){a.state.sublimeMark&&a.state.sublimeMark.clear();a.state.sublimeMark=a.setBookmark(a.getCursor())};e[c[n+g+"A"]="selectToSublimeMark"]=function(a){var b=a.state.sublimeMark&&a.state.sublimeMark.find();b&&a.setSelection(a.getCursor(),b)};e[c[n+g+"W"]="deleteToSublimeMark"]=function(a){var b=a.state.sublimeMark&&a.state.sublimeMark.find();if(b){var d=a.getCursor();if(0<l.cmpPos(d,b))var c=b,b=d,d=c;a.state.sublimeKilled=a.getRange(d,b);a.replaceRange("",
d,b)}};e[c[n+g+"X"]="swapWithSublimeMark"]=function(a){var b=a.state.sublimeMark&&a.state.sublimeMark.find();b&&(a.state.sublimeMark.clear(),a.state.sublimeMark=a.setBookmark(a.getCursor()),a.setCursor(b))};e[c[n+g+"Y"]="sublimeYank"]=function(a){null!=a.state.sublimeKilled&&a.replaceSelection(a.state.sublimeKilled,null,"paste")};c[n+g+"G"]="clearBookmarks";e[c[n+g+"C"]="showInCenter"]=function(a){var b=a.cursorCoords(null,"local");a.scrollTo(null,(b.top+b.bottom)/2-a.getScrollInfo().clientHeight/
2)};e[c["Shift-Alt-Up"]="selectLinesUpward"]=function(a){a.operation(function(){for(var b=a.listSelections(),d=0;d<b.length;d++){var c=b[d];c.head.line>a.firstLine()&&a.addSelection(k(c.head.line-1,c.head.ch))}})};e[c["Shift-Alt-Down"]="selectLinesDownward"]=function(a){a.operation(function(){for(var b=a.listSelections(),d=0;d<b.length;d++){var c=b[d];c.head.line<a.lastLine()&&a.addSelection(k(c.head.line+1,c.head.ch))}})};e[c[g+"F3"]="findUnder"]=function(a){z(a,!0)};e[c["Shift-"+g+"F3"]="findUnderPrevious"]=
function(a){z(a,!1)};e[c["Alt-F3"]="findAllUnder"]=function(a){var b=y(a);if(b){for(var d=a.getSearchCursor(b.query),c=[],e=-1;d.findNext();)c.push({anchor:d.from(),head:d.to()}),d.from().line<=b.from.line&&d.from().ch<=b.from.ch&&e++;a.setSelections(c,e)}};c["Shift-"+g+"["]="fold";c["Shift-"+g+"]"]="unfold";c[n+g+"0"]=c[n+g+"j"]="unfoldAll";c[g+"I"]="findIncremental";c["Shift-"+g+"I"]="findIncrementalReverse";c[g+"H"]="replace";c.F3="findNext";c["Shift-F3"]="findPrev";l.normalizeKeyMap(c)});