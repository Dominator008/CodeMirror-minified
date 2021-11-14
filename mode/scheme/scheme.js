(function(f){"object"==typeof exports&&"object"==typeof module?f(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],f):f(CodeMirror)})(function(f){f.defineMode("scheme",function(){function l(a){var b={};a=a.split(" ");for(var c=0;c<a.length;++c)b[a[c]]=!0;return b}function h(a,b,c){this.indent=a;this.type=b;this.prev=c}function n(a){return a.match(p)}function q(a){return a.match(r)}function k(a,b){!0===b&&a.backUp(1);return a.match(t)}function u(a){return a.match(v)}
var m=l("\u03bb case-lambda call/cc class cond-expand define-class define-values exit-handler field import inherit init-field interface let*-values let-values let/ec mixin opt-lambda override protect provide public rename require require-for-syntax syntax syntax-case syntax-error unit/sig unless when with-syntax and begin call-with-current-continuation call-with-input-file call-with-output-file case cond define define-syntax define-macro defmacro delay do dynamic-wind else for-each if lambda let let* let-syntax letrec letrec-syntax map or syntax-rules abs acos angle append apply asin assoc assq assv atan boolean? caar cadr call-with-input-file call-with-output-file call-with-values car cdddar cddddr cdr ceiling char->integer char-alphabetic? char-ci<=? char-ci<? char-ci=? char-ci>=? char-ci>? char-downcase char-lower-case? char-numeric? char-ready? char-upcase char-upper-case? char-whitespace? char<=? char<? char=? char>=? char>? char? close-input-port close-output-port complex? cons cos current-input-port current-output-port denominator display eof-object? eq? equal? eqv? eval even? exact->inexact exact? exp expt #f floor force gcd imag-part inexact->exact inexact? input-port? integer->char integer? interaction-environment lcm length list list->string list->vector list-ref list-tail list? load log magnitude make-polar make-rectangular make-string make-vector max member memq memv min modulo negative? newline not null-environment null? number->string number? numerator odd? open-input-file open-output-file output-port? pair? peek-char port? positive? procedure? quasiquote quote quotient rational? rationalize read read-char real-part real? remainder reverse round scheme-report-environment set! set-car! set-cdr! sin sqrt string string->list string->number string->symbol string-append string-ci<=? string-ci<? string-ci=? string-ci>=? string-ci>? string-copy string-fill! string-length string-ref string-set! string<=? string<? string=? string>=? string>? string? substring symbol->string symbol? #t tan transcript-off transcript-on truncate values vector vector->list vector-fill! vector-length vector-ref vector-set! with-input-from-file with-output-to-file write write-char zero?"),
w=l("define let letrec let* lambda define-macro defmacro let-syntax letrec-syntax let-values let*-values define-syntax syntax-rules define-values when unless"),p=new RegExp(/^(?:[-+]i|[-+][01]+#*(?:\/[01]+#*)?i|[-+]?[01]+#*(?:\/[01]+#*)?@[-+]?[01]+#*(?:\/[01]+#*)?|[-+]?[01]+#*(?:\/[01]+#*)?[-+](?:[01]+#*(?:\/[01]+#*)?)?i|[-+]?[01]+#*(?:\/[01]+#*)?)(?=[()\s;"]|$)/i),r=new RegExp(/^(?:[-+]i|[-+][0-7]+#*(?:\/[0-7]+#*)?i|[-+]?[0-7]+#*(?:\/[0-7]+#*)?@[-+]?[0-7]+#*(?:\/[0-7]+#*)?|[-+]?[0-7]+#*(?:\/[0-7]+#*)?[-+](?:[0-7]+#*(?:\/[0-7]+#*)?)?i|[-+]?[0-7]+#*(?:\/[0-7]+#*)?)(?=[()\s;"]|$)/i),
v=new RegExp(/^(?:[-+]i|[-+][\da-f]+#*(?:\/[\da-f]+#*)?i|[-+]?[\da-f]+#*(?:\/[\da-f]+#*)?@[-+]?[\da-f]+#*(?:\/[\da-f]+#*)?|[-+]?[\da-f]+#*(?:\/[\da-f]+#*)?[-+](?:[\da-f]+#*(?:\/[\da-f]+#*)?)?i|[-+]?[\da-f]+#*(?:\/[\da-f]+#*)?)(?=[()\s;"]|$)/i),t=new RegExp(/^(?:[-+]i|[-+](?:(?:(?:\d+#+\.?#*|\d+\.\d*#*|\.\d+#*|\d+)(?:[esfdl][-+]?\d+)?)|\d+#*\/\d+#*)i|[-+]?(?:(?:(?:\d+#+\.?#*|\d+\.\d*#*|\.\d+#*|\d+)(?:[esfdl][-+]?\d+)?)|\d+#*\/\d+#*)@[-+]?(?:(?:(?:\d+#+\.?#*|\d+\.\d*#*|\.\d+#*|\d+)(?:[esfdl][-+]?\d+)?)|\d+#*\/\d+#*)|[-+]?(?:(?:(?:\d+#+\.?#*|\d+\.\d*#*|\.\d+#*|\d+)(?:[esfdl][-+]?\d+)?)|\d+#*\/\d+#*)[-+](?:(?:(?:\d+#+\.?#*|\d+\.\d*#*|\.\d+#*|\d+)(?:[esfdl][-+]?\d+)?)|\d+#*\/\d+#*)?i|(?:(?:(?:\d+#+\.?#*|\d+\.\d*#*|\.\d+#*|\d+)(?:[esfdl][-+]?\d+)?)|\d+#*\/\d+#*))(?=[()\s;"]|$)/i);
return{startState:function(){return{indentStack:null,indentation:0,mode:!1,sExprComment:!1,sExprQuote:!1}},token:function(a,b){null==b.indentStack&&a.sol()&&(b.indentation=a.indentation());if(a.eatSpace())return null;var c=null;switch(b.mode){case "string":var d;for(c=!1;null!=(d=a.next());){if('"'==d&&!c){b.mode=!1;break}c=!c&&"\\"==d}c="string";break;case "comment":for(c=!1;null!=(d=a.next());){if("#"==d&&c){b.mode=!1;break}c="|"==d}c="comment";break;case "s-expr-comment":if(b.mode=!1,"("==a.peek()||
"["==a.peek())b.sExprComment=0;else{a.eatWhile(/[^\s\(\)\[\]]/);c="comment";break}default:if(d=a.next(),'"'==d)c=b.mode="string";else if("'"==d)"("==a.peek()||"["==a.peek()?"number"!=typeof b.sExprQuote&&(b.sExprQuote=0):a.eatWhile(/[\w_\-!$%&*+\.\/:<=>?@\^~]/),c="atom";else if("#"==d)if(a.eat("|"))c=b.mode="comment";else if(a.eat(/[tf]/i))c="atom";else if(a.eat(";"))b.mode="s-expr-comment",c="comment";else{d=null;var e=!1,g=!0;a.eat(/[ei]/i)?e=!0:a.backUp(1);a.match(/^#b/i)?d=n:a.match(/^#o/i)?d=
q:a.match(/^#x/i)?d=u:a.match(/^#d/i)?d=k:a.match(/^[-+0-9.]/,!1)?(g=!1,d=k):e||a.eat("#");null!=d&&(g&&!e&&a.match(/^#[ei]/i),d(a)&&(c="number"))}else if(/^[-+0-9.]/.test(d)&&k(a,!0))c="number";else if(";"==d)a.skipToEnd(),c="comment";else if("("==d||"["==d){c="";for(e=a.column();null!=(g=a.eat(/[^\s\(\[;\)\]]/));)c+=g;0<c.length&&w.propertyIsEnumerable(c)?b.indentStack=new h(e+2,d,b.indentStack):(a.eatSpace(),a.eol()||";"==a.peek()?b.indentStack=new h(e+1,d,b.indentStack):(c=e+a.current().length,
b.indentStack=new h(c,d,b.indentStack)));a.backUp(a.current().length-1);"number"==typeof b.sExprComment&&b.sExprComment++;"number"==typeof b.sExprQuote&&b.sExprQuote++;c="bracket"}else")"==d||"]"==d?(c="bracket",null!=b.indentStack&&b.indentStack.type==(")"==d?"(":"[")&&(b.indentStack=b.indentStack.prev,"number"==typeof b.sExprComment&&0==--b.sExprComment&&(c="comment",b.sExprComment=!1),"number"==typeof b.sExprQuote&&0==--b.sExprQuote&&(c="atom",b.sExprQuote=!1))):(a.eatWhile(/[\w_\-!$%&*+\.\/:<=>?@\^~]/),
c=m&&m.propertyIsEnumerable(a.current())?"builtin":"variable")}return"number"==typeof b.sExprComment?"comment":"number"==typeof b.sExprQuote?"atom":c},indent:function(a){return null==a.indentStack?a.indentation:a.indentStack.indent},closeBrackets:{pairs:'()[]{}""'},lineComment:";;"}});f.defineMIME("text/x-scheme","scheme")});
