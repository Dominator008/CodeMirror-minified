'use strict';(function(q){"object"==typeof exports&&"object"==typeof module?q(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],q):q(CodeMirror)})(function(q){function D(a,c,e,b,g,m){this.indented=a;this.column=c;this.type=e;this.info=b;this.align=g;this.prev=m}function z(a,c,b,r){var e=a.indented;a.context&&"statement"==a.context.type&&"statement"!=b&&(e=a.context.indented);return a.context=new D(e,c,b,r,null,a.context)}function x(a){var c=a.context.type;
if(")"==c||"]"==c||"}"==c)a.indented=a.context.indented;return a.context=a.context.prev}function H(a,c,b){if("variable"==c.prevToken||"variable-3"==c.prevToken||/\S(?:[^- ]>|[*\]])\s*$|\*$/.test(a.string.slice(0,b))||c.typeAtEndOfLine&&a.column()==a.indentation())return!0}function I(a){for(;;){if(!a||"top"==a.type)return!0;if("}"==a.type&&"namespace"!=a.prev.info)return!1;a=a.prev}}function b(a){var c={};a=a.split(" ");for(var b=0;b<a.length;++b)c[a[b]]=!0;return c}function t(a,c){return"function"===
typeof a?a(c):a.propertyIsEnumerable(c)}function n(a,c){if(!c.startOfLine)return!1;for(var b,r=null;b=a.peek();){if("\\"==b&&a.match(/^.$/)){r=n;break}else if("/"==b&&a.match(/^\/[\/\*]/,!1))break;a.next()}c.tokenize=r;return"meta"}function A(a,c){return"variable-3"==c.prevToken?"variable-3":!1}function h(a){a.eatWhile(/[\w\.']/);return"number"}function u(a,c){a.backUp(1);if(a.match(/(R|u8R|uR|UR|LR)/)){var b=a.match(/"([^\s\\()]{0,16})\(/);if(!b)return!1;c.cpp11RawStringDelim=b[1];c.tokenize=B;return B(a,
c)}if(a.match(/(u8|u|U|L)/))return a.match(/["']/,!1)?"string":!1;a.next();return!1}function y(a,c){for(var b;null!=(b=a.next());)if('"'==b&&!a.eat('"')){c.tokenize=null;break}return"string"}function B(a,c){var b=c.cpp11RawStringDelim.replace(/[^\w\s]/g,"\\$&");a.match(new RegExp(".*?\\)"+b+'"'))?c.tokenize=null:a.skipToEnd();return"string"}function l(a,c){function b(a){if(a)for(var c in a)a.hasOwnProperty(c)&&r.push(c)}"string"==typeof a&&(a=[a]);var r=[];b(c.keywords);b(c.types);b(c.builtin);b(c.atoms);
r.length&&(c.helperType=a[0],q.registerHelper("hintWords",a[0],r));for(var g=0;g<a.length;++g)q.defineMIME(a[g],c)}function E(a,c){for(var b=!1;!a.eol();){if(!b&&a.match('"""')){c.tokenize=null;break}b="\\"==a.next()&&!b}return"string"}function F(a){return function(c,b){for(var e=!1,g,m=!1;!c.eol();){if(!a&&!e&&c.match('"')){m=!0;break}if(a&&c.match('"""')){m=!0;break}g=c.next();!e&&"$"==g&&c.match("{")&&c.skipTo("}");e=!e&&"\\"==g&&!a}if(m||!a)b.tokenize=null;return"string"}}function C(a){return function(c,
b){for(var e=!1,g,m=!1;!c.eol();){if(!e&&c.match('"')&&("single"==a||c.match('""'))){m=!0;break}if(!e&&c.match("``")){v=C(a);m=!0;break}g=c.next();e="single"==a&&!e&&"\\"==g}m&&(b.tokenize=null);return"string"}}q.defineMode("clike",function(a,c){function b(a,c){var b=a.next();if(w[b]){var p=w[b](a,c);if(!1!==p)return p}if('"'==b||"'"==b)return c.tokenize=l(b),c.tokenize(a,c);if(L.test(b))return k=b,null;if(M.test(b)){a.backUp(1);if(a.match(N))return"number";a.next()}if("/"==b){if(a.eat("*"))return c.tokenize=
g,g(a,c);if(a.eat("/"))return a.skipToEnd(),"comment"}if(J.test(b)){for(;!a.match(/^\/[\/*]/,!1)&&a.eat(J););return"operator"}a.eatWhile(/[\w\$_\xa1-\uffff]/);if(K)for(;a.match(K);)a.eatWhile(/[\w\$_\xa1-\uffff]/);a=a.current();return t(v,a)?(t(y,a)&&(k="newstatement"),t(C,a)&&(G=!0),"keyword"):t(A,a)?"variable-3":t(B,a)?(t(y,a)&&(k="newstatement"),"builtin"):t(E,a)?"atom":"variable"}function l(a){return function(c,b){for(var d=!1,p,f=!1;null!=(p=c.next());){if(p==a&&!d){f=!0;break}d=!d&&"\\"==p}if(f||
!d&&!F)b.tokenize=null;return"string"}}function g(a,c){for(var b=!1,p;p=a.next();){if("/"==p&&b){c.tokenize=null;break}b="*"==p}return"comment"}function m(a,b){c.typeFirstDefinitions&&a.eol()&&I(b.context)&&(b.typeAtEndOfLine=H(a,b,a.pos))}var h=a.indentUnit,n=c.statementIndentUnit||h,u=c.dontAlignCalls,v=c.keywords||{},A=c.types||{},B=c.builtin||{},y=c.blockKeywords||{},C=c.defKeywords||{},E=c.atoms||{},w=c.hooks||{},F=c.multiLineStrings,O=!1!==c.indentStatements,K=c.namespaceSeparator,L=c.isPunctuationChar||
/[\[\]{}\(\),;\:\.]/,M=c.numberStart||/[\d\.]/,N=c.number||/^(?:0x[a-f\d]+|0b[01]+|(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?)(u|ll?|l|f)?/i,J=c.isOperatorChar||/[+\-*&%=<>!?|\/]/,k,G;return{startState:function(a){return{tokenize:null,context:new D((a||0)-h,0,"top",null,!1),indented:0,startOfLine:!0,prevToken:null}},token:function(a,f){var d=f.context;a.sol()&&(null==d.align&&(d.align=!1),f.indented=a.indentation(),f.startOfLine=!0);if(a.eatSpace())return m(a,f),null;k=G=null;var e=(f.tokenize||b)(a,f);if("comment"==
e||"meta"==e)return e;null==d.align&&(d.align=!0);if(";"==k||":"==k||","==k&&a.match(/^\s*(?:\/\/.*)?$/,!1))for(;"statement"==f.context.type;)x(f);else if("{"==k)z(f,a.column(),"}");else if("["==k)z(f,a.column(),"]");else if("("==k)z(f,a.column(),")");else if("}"==k){for(;"statement"==d.type;)d=x(f);for("}"==d.type&&(d=x(f));"statement"==d.type;)d=x(f)}else k==d.type?x(f):O&&(("}"==d.type||"top"==d.type)&&";"!=k||"statement"==d.type&&"newstatement"==k)&&z(f,a.column(),"statement",a.current());"variable"==
e&&("def"==f.prevToken||c.typeFirstDefinitions&&H(a,f,a.start)&&I(f.context)&&a.match(/^\s*\(/,!1))&&(e="def");w.token&&(d=w.token(a,f,e),void 0!==d&&(e=d));"def"==e&&!1===c.styleDefs&&(e="variable");f.startOfLine=!1;f.prevToken=G?"def":e||k;m(a,f);return e},indent:function(a,e){if(a.tokenize!=b&&null!=a.tokenize||a.typeAtEndOfLine)return q.Pass;var d=a.context,f=e&&e.charAt(0);"statement"==d.type&&"}"==f&&(d=d.prev);if(c.dontIndentStatements)for(;"statement"==d.type&&c.dontIndentStatements.test(d.info);)d=
d.prev;if(w.indent&&(a=w.indent(a,d,e),"number"==typeof a))return a;a=f==d.type;var g=d.prev&&"switch"==d.prev.info;if(c.allmanIndentation&&/[{(]/.test(f)){for(;"top"!=d.type&&"}"!=d.type;)d=d.prev;return d.indented}return"statement"==d.type?d.indented+("{"==f?0:n):!d.align||u&&")"==d.type?")"!=d.type||a?d.indented+(a?0:h)+(a||!g||/^(?:case|default)\b/.test(e)?0:h):d.indented+n:d.column+(a?0:1)},electricInput:!1!==c.indentSwitch?/^\s*(?:case .*?:|default:|\{\}?|\})$/:/^\s*[{}]$/,blockCommentStart:"/*",
blockCommentEnd:"*/",lineComment:"//",fold:"brace"}});l(["text/x-csrc","text/x-c","text/x-chdr"],{name:"clike",keywords:b("auto if break case register continue return default do sizeof static else struct switch extern typedef union for goto while enum const volatile"),types:b("int long char short double float unsigned signed void size_t ptrdiff_t bool _Complex _Bool float_t double_t intptr_t intmax_t int8_t int16_t int32_t int64_t uintptr_t uintmax_t uint8_t uint16_t uint32_t uint64_t"),blockKeywords:b("case do else for if switch while struct"),
defKeywords:b("struct"),typeFirstDefinitions:!0,atoms:b("null true false"),hooks:{"#":n,"*":A},modeProps:{fold:["brace","include"]}});l(["text/x-c++src","text/x-c++hdr"],{name:"clike",keywords:b("auto if break case register continue return default do sizeof static else struct switch extern typedef union for goto while enum const volatile asm dynamic_cast namespace reinterpret_cast try explicit new static_cast typeid catch operator template typename class friend private this using const_cast inline public throw virtual delete mutable protected alignas alignof constexpr decltype nullptr noexcept thread_local final static_assert override"),
types:b("int long char short double float unsigned signed void size_t ptrdiff_t bool wchar_t"),blockKeywords:b("catch class do else finally for if struct switch try while"),defKeywords:b("class namespace struct enum union"),typeFirstDefinitions:!0,atoms:b("true false null"),dontIndentStatements:/^template$/,hooks:{"#":n,"*":A,u:u,U:u,L:u,R:u,0:h,1:h,2:h,3:h,4:h,5:h,6:h,7:h,8:h,9:h,token:function(a,c,b){if(c="variable"==b&&"("==a.peek()&&(";"==c.prevToken||null==c.prevToken||"}"==c.prevToken))a=a.current(),
c=(a=/(\w+)::(\w+)$/.exec(a))&&a[1]==a[2];if(c)return"def"}},namespaceSeparator:"::",modeProps:{fold:["brace","include"]}});l("text/x-java",{name:"clike",keywords:b("abstract assert break case catch class const continue default do else enum extends final finally float for goto if implements import instanceof interface native new package private protected public return static strictfp super switch synchronized this throw throws transient try volatile while @interface"),types:b("byte short int long float double boolean char void Boolean Byte Character Double Float Integer Long Number Object Short String StringBuffer StringBuilder Void"),
blockKeywords:b("catch class do else finally for if switch try while"),defKeywords:b("class interface package enum @interface"),typeFirstDefinitions:!0,atoms:b("true false null"),number:/^(?:0x[a-f\d_]+|0b[01_]+|(?:[\d_]+\.?\d*|\.\d+)(?:e[-+]?[\d_]+)?)(u|ll?|l|f)?/i,hooks:{"@":function(a){if(a.match("interface",!1))return!1;a.eatWhile(/[\w\$_]/);return"meta"}},modeProps:{fold:["brace","import"]}});l("text/x-csharp",{name:"clike",keywords:b("abstract as async await base break case catch checked class const continue default delegate do else enum event explicit extern finally fixed for foreach goto if implicit in interface internal is lock namespace new operator out override params private protected public readonly ref return sealed sizeof stackalloc static struct switch this throw try typeof unchecked unsafe using virtual void volatile while add alias ascending descending dynamic from get global group into join let orderby partial remove select set value var yield"),
types:b("Action Boolean Byte Char DateTime DateTimeOffset Decimal Double Func Guid Int16 Int32 Int64 Object SByte Single String Task TimeSpan UInt16 UInt32 UInt64 bool byte char decimal double short int long object sbyte float string ushort uint ulong"),blockKeywords:b("catch class do else finally for foreach if struct switch try while"),defKeywords:b("class interface namespace struct var"),typeFirstDefinitions:!0,atoms:b("true false null"),hooks:{"@":function(a,c){if(a.eat('"'))return c.tokenize=
y,y(a,c);a.eatWhile(/[\w\$_]/);return"meta"}}});l("text/x-scala",{name:"clike",keywords:b("abstract case catch class def do else extends final finally for forSome if implicit import lazy match new null object override package private protected return sealed super this throw trait try type val var while with yield _ assert assume require print println printf readLine readBoolean readByte readShort readChar readInt readLong readFloat readDouble"),types:b("AnyVal App Application Array BufferedIterator BigDecimal BigInt Char Console Either Enumeration Equiv Error Exception Fractional Function IndexedSeq Int Integral Iterable Iterator List Map Numeric Nil NotNull Option Ordered Ordering PartialFunction PartialOrdering Product Proxy Range Responder Seq Serializable Set Specializable Stream StringBuilder StringContext Symbol Throwable Traversable TraversableOnce Tuple Unit Vector Boolean Byte Character CharSequence Class ClassLoader Cloneable Comparable Compiler Double Exception Float Integer Long Math Number Object Package Pair Process Runtime Runnable SecurityManager Short StackTraceElement StrictMath String StringBuffer System Thread ThreadGroup ThreadLocal Throwable Triple Void"),
multiLineStrings:!0,blockKeywords:b("catch class do else finally for forSome if match switch try while"),defKeywords:b("class def object package trait type val var"),atoms:b("true false null"),indentStatements:!1,indentSwitch:!1,isOperatorChar:/[+\-*&%=<>!?|\/#:@]/,hooks:{"@":function(a){a.eatWhile(/[\w\$_]/);return"meta"},'"':function(a,c){if(!a.match('""'))return!1;c.tokenize=E;return c.tokenize(a,c)},"'":function(a){a.eatWhile(/[\w\$_\xa1-\uffff]/);return"atom"},"=":function(a,c){var b=c.context;
return"}"==b.type&&b.align&&a.eat(">")?(c.context=new D(b.indented,b.column,b.type,b.info,null,b.prev),"operator"):!1}},modeProps:{closeBrackets:{triples:'"'}}});l("text/x-kotlin",{name:"clike",keywords:b("package as typealias class interface this super val var fun for is in This throw return break continue object if else while do try when !in !is as? file import where by get set abstract enum open inner override private public internal protected catch finally out final vararg reified dynamic companion constructor init sealed field property receiver param sparam lateinit data inline noinline tailrec external annotation crossinline const operator infix"),
types:b("Boolean Byte Character CharSequence Class ClassLoader Cloneable Comparable Compiler Double Exception Float Integer Long Math Number Object Package Pair Process Runtime Runnable SecurityManager Short StackTraceElement StrictMath String StringBuffer System Thread ThreadGroup ThreadLocal Throwable Triple Void"),intendSwitch:!1,indentStatements:!1,multiLineStrings:!0,blockKeywords:b("catch class do else finally for if where try while enum"),defKeywords:b("class val var object package interface fun"),
atoms:b("true false null this"),hooks:{'"':function(a,c){c.tokenize=F(a.match('""'));return c.tokenize(a,c)}},modeProps:{closeBrackets:{triples:'"'}}});l(["x-shader/x-vertex","x-shader/x-fragment"],{name:"clike",keywords:b("sampler1D sampler2D sampler3D samplerCube sampler1DShadow sampler2DShadow const attribute uniform varying break continue discard return for while do if else struct in out inout"),types:b("float int bool void vec2 vec3 vec4 ivec2 ivec3 ivec4 bvec2 bvec3 bvec4 mat2 mat3 mat4"),blockKeywords:b("for while do if else struct"),
builtin:b("radians degrees sin cos tan asin acos atan pow exp log exp2 sqrt inversesqrt abs sign floor ceil fract mod min max clamp mix step smoothstep length distance dot cross normalize ftransform faceforward reflect refract matrixCompMult lessThan lessThanEqual greaterThan greaterThanEqual equal notEqual any all not texture1D texture1DProj texture1DLod texture1DProjLod texture2D texture2DProj texture2DLod texture2DProjLod texture3D texture3DProj texture3DLod texture3DProjLod textureCube textureCubeLod shadow1D shadow2D shadow1DProj shadow2DProj shadow1DLod shadow2DLod shadow1DProjLod shadow2DProjLod dFdx dFdy fwidth noise1 noise2 noise3 noise4"),
atoms:b("true false gl_FragColor gl_SecondaryColor gl_Normal gl_Vertex gl_MultiTexCoord0 gl_MultiTexCoord1 gl_MultiTexCoord2 gl_MultiTexCoord3 gl_MultiTexCoord4 gl_MultiTexCoord5 gl_MultiTexCoord6 gl_MultiTexCoord7 gl_FogCoord gl_PointCoord gl_Position gl_PointSize gl_ClipVertex gl_FrontColor gl_BackColor gl_FrontSecondaryColor gl_BackSecondaryColor gl_TexCoord gl_FogFragCoord gl_FragCoord gl_FrontFacing gl_FragData gl_FragDepth gl_ModelViewMatrix gl_ProjectionMatrix gl_ModelViewProjectionMatrix gl_TextureMatrix gl_NormalMatrix gl_ModelViewMatrixInverse gl_ProjectionMatrixInverse gl_ModelViewProjectionMatrixInverse gl_TexureMatrixTranspose gl_ModelViewMatrixInverseTranspose gl_ProjectionMatrixInverseTranspose gl_ModelViewProjectionMatrixInverseTranspose gl_TextureMatrixInverseTranspose gl_NormalScale gl_DepthRange gl_ClipPlane gl_Point gl_FrontMaterial gl_BackMaterial gl_LightSource gl_LightModel gl_FrontLightModelProduct gl_BackLightModelProduct gl_TextureColor gl_EyePlaneS gl_EyePlaneT gl_EyePlaneR gl_EyePlaneQ gl_FogParameters gl_MaxLights gl_MaxClipPlanes gl_MaxTextureUnits gl_MaxTextureCoords gl_MaxVertexAttribs gl_MaxVertexUniformComponents gl_MaxVaryingFloats gl_MaxVertexTextureImageUnits gl_MaxTextureImageUnits gl_MaxFragmentUniformComponents gl_MaxCombineTextureImageUnits gl_MaxDrawBuffers"),
indentSwitch:!1,hooks:{"#":n},modeProps:{fold:["brace","include"]}});l("text/x-nesc",{name:"clike",keywords:b("auto if break case register continue return default do sizeof static else struct switch extern typedef union for goto while enum const volatileas atomic async call command component components configuration event generic implementation includes interface module new norace nx_struct nx_union post provides signal task uses abstract extends"),types:b("int long char short double float unsigned signed void size_t ptrdiff_t"),
blockKeywords:b("case do else for if switch while struct"),atoms:b("null true false"),hooks:{"#":n},modeProps:{fold:["brace","include"]}});l("text/x-objectivec",{name:"clike",keywords:b("auto if break case register continue return default do sizeof static else struct switch extern typedef union for goto while enum const volatileinline restrict _Bool _Complex _Imaginary BOOL Class bycopy byref id IMP in inout nil oneway out Protocol SEL self super atomic nonatomic retain copy readwrite readonly"),
types:b("int long char short double float unsigned signed void size_t ptrdiff_t"),atoms:b("YES NO NULL NILL ON OFF true false"),hooks:{"@":function(a){a.eatWhile(/[\w\$]/);return"keyword"},"#":n,indent:function(a,c,b){if("statement"==c.type&&/^@\w/.test(b))return c.indented}},modeProps:{fold:"brace"}});l("text/x-squirrel",{name:"clike",keywords:b("base break clone continue const default delete enum extends function in class foreach local resume return this throw typeof yield constructor instanceof static"),
types:b("int long char short double float unsigned signed void size_t ptrdiff_t"),blockKeywords:b("case catch class else for foreach if switch try while"),defKeywords:b("function local class"),typeFirstDefinitions:!0,atoms:b("true false null"),hooks:{"#":n},modeProps:{fold:["brace","include"]}});var v=null;l("text/x-ceylon",{name:"clike",keywords:b("abstracts alias assembly assert assign break case catch class continue dynamic else exists extends finally for function given if import in interface is let module new nonempty object of out outer package return satisfies super switch then this throw try value void while"),
types:function(a){a=a.charAt(0);return a===a.toUpperCase()&&a!==a.toLowerCase()},blockKeywords:b("case catch class dynamic else finally for function if interface module new object switch try while"),defKeywords:b("class dynamic function interface module object package value"),builtin:b("abstract actual aliased annotation by default deprecated doc final formal late license native optional sealed see serializable shared suppressWarnings tagged throws variable"),isPunctuationChar:/[\[\]{}\(\),;\:\.`]/,
isOperatorChar:/[+\-*&%=<>!?|^~:\/]/,numberStart:/[\d#$]/,number:/^(?:#[\da-fA-F_]+|\$[01_]+|[\d_]+[kMGTPmunpf]?|[\d_]+\.[\d_]+(?:[eE][-+]?\d+|[kMGTPmunpf]|)|)/i,multiLineStrings:!0,typeFirstDefinitions:!0,atoms:b("true false null larger smaller equal empty finished"),indentSwitch:!1,styleDefs:!1,hooks:{"@":function(a){a.eatWhile(/[\w\$_]/);return"meta"},'"':function(a,c){c.tokenize=C(a.match('""')?"triple":"single");return c.tokenize(a,c)},"`":function(a,c){if(!v||!a.match("`"))return!1;c.tokenize=
v;v=null;return c.tokenize(a,c)},"'":function(a){a.eatWhile(/[\w\$_\xa1-\uffff]/);return"atom"},token:function(a,c,b){if(("variable"==b||"variable-3"==b)&&"."==c.prevToken)return"variable-2"}},modeProps:{fold:["brace","import"],closeBrackets:{triples:'"'}}})});
