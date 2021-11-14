(function(t){"object"==typeof exports&&"object"==typeof module?t(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],t):t(CodeMirror)})(function(t){function G(a,b,c,h,l,n){this.indented=a;this.column=b;this.type=c;this.info=h;this.align=l;this.prev=n}function B(a,b,c,h){var l=a.indented;a.context&&"statement"==a.context.type&&"statement"!=c&&(l=a.context.indented);return a.context=new G(l,b,c,h,null,a.context)}function z(a){var b=a.context.type;if(")"==
b||"]"==b||"}"==b)a.indented=a.context.indented;return a.context=a.context.prev}function I(a,b,c){if("variable"==b.prevToken||"type"==b.prevToken||/\S(?:[^- ]>|[*\]])\s*$|\*$/.test(a.string.slice(0,c))||b.typeAtEndOfLine&&a.column()==a.indentation())return!0}function J(a){for(;;){if(!a||"top"==a.type)return!0;if("}"==a.type&&"namespace"!=a.prev.info)return!1;a=a.prev}}function f(a){var b={};a=a.split(" ");for(var c=0;c<a.length;++c)b[a[c]]=!0;return b}function r(a,b){return"function"===typeof a?a(b):
a.propertyIsEnumerable(b)}function A(a){return r(W,a)||/.+_t$/.test(a)}function K(a){return A(a)||r(X,a)}function u(a,b){if(!b.startOfLine)return!1;for(var c,h=null;c=a.peek();){if("\\"==c&&a.match(/^.$/)){h=u;break}else if("/"==c&&a.match(/^\/[\/\*]/,!1))break;a.next()}b.tokenize=h;return"meta"}function C(a,b){return"type"==b.prevToken?"type":!1}function D(a){return!a||2>a.length||"_"!=a[0]?!1:"_"==a[1]||a[1]!==a[1].toLowerCase()}function m(a){a.eatWhile(/[\w\.']/);return"number"}function v(a,b){a.backUp(1);
if(a.match(/^(?:R|u8R|uR|UR|LR)/)){var c=a.match(/^"([^\s\\()]{0,16})\(/);if(!c)return!1;b.cpp11RawStringDelim=c[1];b.tokenize=L;return L(a,b)}if(a.match(/^(?:u8|u|U|L)/))return a.match(/^["']/,!1)?"string":!1;a.next();return!1}function M(a){return(a=/(\w+)::~?(\w+)$/.exec(a))&&a[1]==a[2]}function N(a,b){for(var c;null!=(c=a.next());)if('"'==c&&!a.eat('"')){b.tokenize=null;break}return"string"}function L(a,b){var c=b.cpp11RawStringDelim.replace(/[^\w\s]/g,"\\$&");a.match(new RegExp(".*?\\)"+c+'"'))?
b.tokenize=null:a.skipToEnd();return"string"}function q(a,b){function c(n){if(n)for(var w in n)n.hasOwnProperty(w)&&h.push(w)}"string"==typeof a&&(a=[a]);var h=[];c(b.keywords);c(b.types);c(b.builtin);c(b.atoms);h.length&&(b.helperType=a[0],t.registerHelper("hintWords",a[0],h));for(var l=0;l<a.length;++l)t.defineMIME(a[l],b)}function Y(a,b){for(var c=!1;!a.eol();){if(!c&&a.match('"""')){b.tokenize=null;break}c="\\"==a.next()&&!c}return"string"}function E(a){return function(b,c){for(var h;h=b.next();)if("*"==
h&&b.eat("/"))if(1==a){c.tokenize=null;break}else return c.tokenize=E(a-1),c.tokenize(b,c);else if("/"==h&&b.eat("*"))return c.tokenize=E(a+1),c.tokenize(b,c);return"comment"}}function Z(a){return function(b,c){for(var h=!1,l,n=!1;!b.eol();){if(!a&&!h&&b.match('"')){n=!0;break}if(a&&b.match('"""')){n=!0;break}l=b.next();!h&&"$"==l&&b.match("{")&&b.skipTo("}");h=!h&&"\\"==l&&!a}if(n||!a)c.tokenize=null;return"string"}}function O(a){return function(b,c){for(var h=!1,l,n=!1;!b.eol();){if(!h&&b.match('"')&&
("single"==a||b.match('""'))){n=!0;break}if(!h&&b.match("``")){F=O(a);n=!0;break}l=b.next();h="single"==a&&!h&&"\\"==l}n&&(c.tokenize=null);return"string"}}t.defineMode("clike",function(a,b){function c(d,g){var e=d.next();if(y[e]){var k=y[e](d,g);if(!1!==k)return k}if('"'==e||"'"==e)return g.tokenize=h(e),g.tokenize(d,g);if(aa.test(e)){d.backUp(1);if(d.match(ba))return"number";d.next()}if(ca.test(e))return p=e,null;if("/"==e){if(d.eat("*"))return g.tokenize=l,l(d,g);if(d.eat("/"))return d.skipToEnd(),
"comment"}if(P.test(e)){for(;!d.match(/^\/[\/*]/,!1)&&d.eat(P););return"operator"}d.eatWhile(Q);if(R)for(;d.match(R);)d.eatWhile(Q);d=d.current();return r(da,d)?(r(S,d)&&(p="newstatement"),r(ea,d)&&(H=!0),"keyword"):r(fa,d)?"type":r(ha,d)||T&&T(d)?(r(S,d)&&(p="newstatement"),"builtin"):r(ia,d)?"atom":"variable"}function h(d){return function(g,e){for(var k=!1,x,U=!1;null!=(x=g.next());){if(x==d&&!k){U=!0;break}k=!k&&"\\"==x}if(U||!k&&!ja)e.tokenize=null;return"string"}}function l(d,g){for(var e=!1,
k;k=d.next();){if("/"==k&&e){g.tokenize=null;break}e="*"==k}return"comment"}function n(d,g){b.typeFirstDefinitions&&d.eol()&&J(g.context)&&(g.typeAtEndOfLine=I(d,g,d.pos))}var w=a.indentUnit,V=b.statementIndentUnit||w,ka=b.dontAlignCalls,da=b.keywords||{},fa=b.types||{},ha=b.builtin||{},S=b.blockKeywords||{},ea=b.defKeywords||{},ia=b.atoms||{},y=b.hooks||{},ja=b.multiLineStrings,la=!1!==b.indentStatements,R=b.namespaceSeparator,ca=b.isPunctuationChar||/[\[\]{}\(\),;:\.]/,aa=b.numberStart||/[\d\.]/,
ba=b.number||/^(?:0x[a-f\d]+|0b[01]+|(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?)(u|ll?|l|f)?/i,P=b.isOperatorChar||/[+\-*&%=<>!?|\/]/,Q=b.isIdentifierChar||/[\w\$_\xa1-\uffff]/,T=b.isReservedIdentifier||!1,p,H;return{startState:function(d){return{tokenize:null,context:new G((d||0)-w,0,"top",null,!1),indented:0,startOfLine:!0,prevToken:null}},token:function(d,g){var e=g.context;d.sol()&&(null==e.align&&(e.align=!1),g.indented=d.indentation(),g.startOfLine=!0);if(d.eatSpace())return n(d,g),null;p=H=null;var k=
(g.tokenize||c)(d,g);if("comment"==k||"meta"==k)return k;null==e.align&&(e.align=!0);if(";"==p||":"==p||","==p&&d.match(/^\s*(?:\/\/.*)?$/,!1))for(;"statement"==g.context.type;)z(g);else if("{"==p)B(g,d.column(),"}");else if("["==p)B(g,d.column(),"]");else if("("==p)B(g,d.column(),")");else if("}"==p){for(;"statement"==e.type;)e=z(g);for("}"==e.type&&(e=z(g));"statement"==e.type;)e=z(g)}else p==e.type?z(g):la&&(("}"==e.type||"top"==e.type)&&";"!=p||"statement"==e.type&&"newstatement"==p)&&B(g,d.column(),
"statement",d.current());"variable"==k&&("def"==g.prevToken||b.typeFirstDefinitions&&I(d,g,d.start)&&J(g.context)&&d.match(/^\s*\(/,!1))&&(k="def");y.token&&(e=y.token(d,g,k),void 0!==e&&(k=e));"def"==k&&!1===b.styleDefs&&(k="variable");g.startOfLine=!1;g.prevToken=H?"def":k||p;n(d,g);return k},indent:function(d,g){if(d.tokenize!=c&&null!=d.tokenize||d.typeAtEndOfLine)return t.Pass;var e=d.context,k=g&&g.charAt(0),x=k==e.type;"statement"==e.type&&"}"==k&&(e=e.prev);if(b.dontIndentStatements)for(;"statement"==
e.type&&b.dontIndentStatements.test(e.info);)e=e.prev;if(y.indent&&(d=y.indent(d,e,g,w),"number"==typeof d))return d;d=e.prev&&"switch"==e.prev.info;if(b.allmanIndentation&&/[{(]/.test(k)){for(;"top"!=e.type&&"}"!=e.type;)e=e.prev;return e.indented}return"statement"==e.type?e.indented+("{"==k?0:V):!e.align||ka&&")"==e.type?")"!=e.type||x?e.indented+(x?0:w)+(x||!d||/^(?:case|default)\b/.test(g)?0:w):e.indented+V:e.column+(x?0:1)},electricInput:!1!==b.indentSwitch?/^\s*(?:case .*?:|default:|\{\}?|\})$/:
/^\s*[{}]$/,blockCommentStart:"/*",blockCommentEnd:"*/",blockCommentContinue:" * ",lineComment:"//",fold:"brace"}});var W=f("int long char short double float unsigned signed void bool"),X=f("SEL instancetype id Class Protocol BOOL");q(["text/x-csrc","text/x-c","text/x-chdr"],{name:"clike",keywords:f("auto if break case register continue return default do sizeof static else struct switch extern typedef union for goto while enum const volatile inline restrict asm fortran"),types:A,blockKeywords:f("case do else for if switch while struct enum union"),
defKeywords:f("struct enum union"),typeFirstDefinitions:!0,atoms:f("NULL true false"),isReservedIdentifier:D,hooks:{"#":u,"*":C},modeProps:{fold:["brace","include"]}});q(["text/x-c++src","text/x-c++hdr"],{name:"clike",keywords:f("auto if break case register continue return default do sizeof static else struct switch extern typedef union for goto while enum const volatile inline restrict asm fortran alignas alignof and and_eq audit axiom bitand bitor catch class compl concept constexpr const_cast decltype delete dynamic_cast explicit export final friend import module mutable namespace new noexcept not not_eq operator or or_eq override private protected public reinterpret_cast requires static_assert static_cast template this thread_local throw try typeid typename using virtual xor xor_eq"),
types:A,blockKeywords:f("case do else for if switch while struct enum union class try catch"),defKeywords:f("struct enum union class namespace"),typeFirstDefinitions:!0,atoms:f("true false NULL nullptr"),dontIndentStatements:/^template$/,isIdentifierChar:/[\w\$_~\xa1-\uffff]/,isReservedIdentifier:D,hooks:{"#":u,"*":C,u:v,U:v,L:v,R:v,0:m,1:m,2:m,3:m,4:m,5:m,6:m,7:m,8:m,9:m,token:function(a,b,c){if("variable"==c&&"("==a.peek()&&(";"==b.prevToken||null==b.prevToken||"}"==b.prevToken)&&M(a.current()))return"def"}},
namespaceSeparator:"::",modeProps:{fold:["brace","include"]}});q("text/x-java",{name:"clike",keywords:f("abstract assert break case catch class const continue default do else enum extends final finally for goto if implements import instanceof interface native new package private protected public return static strictfp super switch synchronized this throw throws transient try volatile while @interface"),types:f("var byte short int long float double boolean char void Boolean Byte Character Double Float Integer Long Number Object Short String StringBuffer StringBuilder Void"),
blockKeywords:f("catch class do else finally for if switch try while"),defKeywords:f("class interface enum @interface"),typeFirstDefinitions:!0,atoms:f("true false null"),number:/^(?:0x[a-f\d_]+|0b[01_]+|(?:[\d_]+\.?\d*|\.\d+)(?:e[-+]?[\d_]+)?)(u|ll?|l|f)?/i,hooks:{"@":function(a){if(a.match("interface",!1))return!1;a.eatWhile(/[\w\$_]/);return"meta"}},modeProps:{fold:["brace","import"]}});q("text/x-csharp",{name:"clike",keywords:f("abstract as async await base break case catch checked class const continue default delegate do else enum event explicit extern finally fixed for foreach goto if implicit in interface internal is lock namespace new operator out override params private protected public readonly ref return sealed sizeof stackalloc static struct switch this throw try typeof unchecked unsafe using virtual void volatile while add alias ascending descending dynamic from get global group into join let orderby partial remove select set value var yield"),
types:f("Action Boolean Byte Char DateTime DateTimeOffset Decimal Double Func Guid Int16 Int32 Int64 Object SByte Single String Task TimeSpan UInt16 UInt32 UInt64 bool byte char decimal double short int long object sbyte float string ushort uint ulong"),blockKeywords:f("catch class do else finally for foreach if struct switch try while"),defKeywords:f("class interface namespace struct var"),typeFirstDefinitions:!0,atoms:f("true false null"),hooks:{"@":function(a,b){if(a.eat('"'))return b.tokenize=
N,N(a,b);a.eatWhile(/[\w\$_]/);return"meta"}}});q("text/x-scala",{name:"clike",keywords:f("abstract case catch class def do else extends final finally for forSome if implicit import lazy match new null object override package private protected return sealed super this throw trait try type val var while with yield _ assert assume require print println printf readLine readBoolean readByte readShort readChar readInt readLong readFloat readDouble"),types:f("AnyVal App Application Array BufferedIterator BigDecimal BigInt Char Console Either Enumeration Equiv Error Exception Fractional Function IndexedSeq Int Integral Iterable Iterator List Map Numeric Nil NotNull Option Ordered Ordering PartialFunction PartialOrdering Product Proxy Range Responder Seq Serializable Set Specializable Stream StringBuilder StringContext Symbol Throwable Traversable TraversableOnce Tuple Unit Vector Boolean Byte Character CharSequence Class ClassLoader Cloneable Comparable Compiler Double Exception Float Integer Long Math Number Object Package Pair Process Runtime Runnable SecurityManager Short StackTraceElement StrictMath String StringBuffer System Thread ThreadGroup ThreadLocal Throwable Triple Void"),
multiLineStrings:!0,blockKeywords:f("catch class enum do else finally for forSome if match switch try while"),defKeywords:f("class enum def object package trait type val var"),atoms:f("true false null"),indentStatements:!1,indentSwitch:!1,isOperatorChar:/[+\-*&%=<>!?|\/#:@]/,hooks:{"@":function(a){a.eatWhile(/[\w\$_]/);return"meta"},'"':function(a,b){if(!a.match('""'))return!1;b.tokenize=Y;return b.tokenize(a,b)},"'":function(a){a.eatWhile(/[\w\$_\xa1-\uffff]/);return"atom"},"=":function(a,b){var c=
b.context;return"}"==c.type&&c.align&&a.eat(">")?(b.context=new G(c.indented,c.column,c.type,c.info,null,c.prev),"operator"):!1},"/":function(a,b){if(!a.eat("*"))return!1;b.tokenize=E(1);return b.tokenize(a,b)}},modeProps:{closeBrackets:{pairs:'()[]{}""',triples:'"'}}});q("text/x-kotlin",{name:"clike",keywords:f("package as typealias class interface this super val operator var fun for is in This throw return annotation break continue object if else while do try when !in !is as? file import where by get set abstract enum open inner override private public internal protected catch finally out final vararg reified dynamic companion constructor init sealed field property receiver param sparam lateinit data inline noinline tailrec external annotation crossinline const operator infix suspend actual expect setparam value"),
types:f("Boolean Byte Character CharSequence Class ClassLoader Cloneable Comparable Compiler Double Exception Float Integer Long Math Number Object Package Pair Process Runtime Runnable SecurityManager Short StackTraceElement StrictMath String StringBuffer System Thread ThreadGroup ThreadLocal Throwable Triple Void Annotation Any BooleanArray ByteArray Char CharArray DeprecationLevel DoubleArray Enum FloatArray Function Int IntArray Lazy LazyThreadSafetyMode LongArray Nothing ShortArray Unit"),intendSwitch:!1,
indentStatements:!1,multiLineStrings:!0,number:/^(?:0x[a-f\d_]+|0b[01_]+|(?:[\d_]+(\.\d+)?|\.\d+)(?:e[-+]?[\d_]+)?)(u|ll?|l|f)?/i,blockKeywords:f("catch class do else finally for if where try while enum"),defKeywords:f("class val var object interface fun"),atoms:f("true false null this"),hooks:{"@":function(a){a.eatWhile(/[\w\$_]/);return"meta"},"*":function(a,b){return"."==b.prevToken?"variable":"operator"},'"':function(a,b){b.tokenize=Z(a.match('""'));return b.tokenize(a,b)},"/":function(a,b){if(!a.eat("*"))return!1;
b.tokenize=E(1);return b.tokenize(a,b)},indent:function(a,b,c,h){var l=c&&c.charAt(0);if(("}"==a.prevToken||")"==a.prevToken)&&""==c)return a.indented;if("operator"==a.prevToken&&"}"!=c&&"}"!=a.context.type||"variable"==a.prevToken&&"."==l||("}"==a.prevToken||")"==a.prevToken)&&"."==l)return 2*h+b.indented;if(b.align&&"}"==b.type)return b.indented+(a.context.type==(c||"").charAt(0)?0:h)}},modeProps:{closeBrackets:{triples:'"'}}});q(["x-shader/x-vertex","x-shader/x-fragment"],{name:"clike",keywords:f("sampler1D sampler2D sampler3D samplerCube sampler1DShadow sampler2DShadow const attribute uniform varying break continue discard return for while do if else struct in out inout"),
types:f("float int bool void vec2 vec3 vec4 ivec2 ivec3 ivec4 bvec2 bvec3 bvec4 mat2 mat3 mat4"),blockKeywords:f("for while do if else struct"),builtin:f("radians degrees sin cos tan asin acos atan pow exp log exp2 sqrt inversesqrt abs sign floor ceil fract mod min max clamp mix step smoothstep length distance dot cross normalize ftransform faceforward reflect refract matrixCompMult lessThan lessThanEqual greaterThan greaterThanEqual equal notEqual any all not texture1D texture1DProj texture1DLod texture1DProjLod texture2D texture2DProj texture2DLod texture2DProjLod texture3D texture3DProj texture3DLod texture3DProjLod textureCube textureCubeLod shadow1D shadow2D shadow1DProj shadow2DProj shadow1DLod shadow2DLod shadow1DProjLod shadow2DProjLod dFdx dFdy fwidth noise1 noise2 noise3 noise4"),
atoms:f("true false gl_FragColor gl_SecondaryColor gl_Normal gl_Vertex gl_MultiTexCoord0 gl_MultiTexCoord1 gl_MultiTexCoord2 gl_MultiTexCoord3 gl_MultiTexCoord4 gl_MultiTexCoord5 gl_MultiTexCoord6 gl_MultiTexCoord7 gl_FogCoord gl_PointCoord gl_Position gl_PointSize gl_ClipVertex gl_FrontColor gl_BackColor gl_FrontSecondaryColor gl_BackSecondaryColor gl_TexCoord gl_FogFragCoord gl_FragCoord gl_FrontFacing gl_FragData gl_FragDepth gl_ModelViewMatrix gl_ProjectionMatrix gl_ModelViewProjectionMatrix gl_TextureMatrix gl_NormalMatrix gl_ModelViewMatrixInverse gl_ProjectionMatrixInverse gl_ModelViewProjectionMatrixInverse gl_TextureMatrixTranspose gl_ModelViewMatrixInverseTranspose gl_ProjectionMatrixInverseTranspose gl_ModelViewProjectionMatrixInverseTranspose gl_TextureMatrixInverseTranspose gl_NormalScale gl_DepthRange gl_ClipPlane gl_Point gl_FrontMaterial gl_BackMaterial gl_LightSource gl_LightModel gl_FrontLightModelProduct gl_BackLightModelProduct gl_TextureColor gl_EyePlaneS gl_EyePlaneT gl_EyePlaneR gl_EyePlaneQ gl_FogParameters gl_MaxLights gl_MaxClipPlanes gl_MaxTextureUnits gl_MaxTextureCoords gl_MaxVertexAttribs gl_MaxVertexUniformComponents gl_MaxVaryingFloats gl_MaxVertexTextureImageUnits gl_MaxTextureImageUnits gl_MaxFragmentUniformComponents gl_MaxCombineTextureImageUnits gl_MaxDrawBuffers"),
indentSwitch:!1,hooks:{"#":u},modeProps:{fold:["brace","include"]}});q("text/x-nesc",{name:"clike",keywords:f("auto if break case register continue return default do sizeof static else struct switch extern typedef union for goto while enum const volatile inline restrict asm fortran as atomic async call command component components configuration event generic implementation includes interface module new norace nx_struct nx_union post provides signal task uses abstract extends"),types:A,blockKeywords:f("case do else for if switch while struct enum union"),
atoms:f("null true false"),hooks:{"#":u},modeProps:{fold:["brace","include"]}});q("text/x-objectivec",{name:"clike",keywords:f("auto if break case register continue return default do sizeof static else struct switch extern typedef union for goto while enum const volatile inline restrict asm fortran bycopy byref in inout oneway out self super atomic nonatomic retain copy readwrite readonly strong weak assign typeof nullable nonnull null_resettable _cmd @interface @implementation @end @protocol @encode @property @synthesize @dynamic @class @public @package @private @protected @required @optional @try @catch @finally @import @selector @encode @defs @synchronized @autoreleasepool @compatibility_alias @available"),
types:K,builtin:f("FOUNDATION_EXPORT FOUNDATION_EXTERN NS_INLINE NS_FORMAT_FUNCTION  NS_RETURNS_RETAINEDNS_ERROR_ENUM NS_RETURNS_NOT_RETAINED NS_RETURNS_INNER_POINTER NS_DESIGNATED_INITIALIZER NS_ENUM NS_OPTIONS NS_REQUIRES_NIL_TERMINATION NS_ASSUME_NONNULL_BEGIN NS_ASSUME_NONNULL_END NS_SWIFT_NAME NS_REFINED_FOR_SWIFT"),blockKeywords:f("case do else for if switch while struct enum union @synthesize @try @catch @finally @autoreleasepool @synchronized"),defKeywords:f("struct enum union @interface @implementation @protocol @class"),
dontIndentStatements:/^@.*$/,typeFirstDefinitions:!0,atoms:f("YES NO NULL Nil nil true false nullptr"),isReservedIdentifier:D,hooks:{"#":u,"*":C},modeProps:{fold:["brace","include"]}});q("text/x-objectivec++",{name:"clike",keywords:f("auto if break case register continue return default do sizeof static else struct switch extern typedef union for goto while enum const volatile inline restrict asm fortran bycopy byref in inout oneway out self super atomic nonatomic retain copy readwrite readonly strong weak assign typeof nullable nonnull null_resettable _cmd @interface @implementation @end @protocol @encode @property @synthesize @dynamic @class @public @package @private @protected @required @optional @try @catch @finally @import @selector @encode @defs @synchronized @autoreleasepool @compatibility_alias @available alignas alignof and and_eq audit axiom bitand bitor catch class compl concept constexpr const_cast decltype delete dynamic_cast explicit export final friend import module mutable namespace new noexcept not not_eq operator or or_eq override private protected public reinterpret_cast requires static_assert static_cast template this thread_local throw try typeid typename using virtual xor xor_eq"),
types:K,builtin:f("FOUNDATION_EXPORT FOUNDATION_EXTERN NS_INLINE NS_FORMAT_FUNCTION  NS_RETURNS_RETAINEDNS_ERROR_ENUM NS_RETURNS_NOT_RETAINED NS_RETURNS_INNER_POINTER NS_DESIGNATED_INITIALIZER NS_ENUM NS_OPTIONS NS_REQUIRES_NIL_TERMINATION NS_ASSUME_NONNULL_BEGIN NS_ASSUME_NONNULL_END NS_SWIFT_NAME NS_REFINED_FOR_SWIFT"),blockKeywords:f("case do else for if switch while struct enum union @synthesize @try @catch @finally @autoreleasepool @synchronized class try catch"),defKeywords:f("struct enum union @interface @implementation @protocol @class class namespace"),
dontIndentStatements:/^@.*$|^template$/,typeFirstDefinitions:!0,atoms:f("YES NO NULL Nil nil true false nullptr"),isReservedIdentifier:D,hooks:{"#":u,"*":C,u:v,U:v,L:v,R:v,0:m,1:m,2:m,3:m,4:m,5:m,6:m,7:m,8:m,9:m,token:function(a,b,c){if("variable"==c&&"("==a.peek()&&(";"==b.prevToken||null==b.prevToken||"}"==b.prevToken)&&M(a.current()))return"def"}},namespaceSeparator:"::",modeProps:{fold:["brace","include"]}});q("text/x-squirrel",{name:"clike",keywords:f("base break clone continue const default delete enum extends function in class foreach local resume return this throw typeof yield constructor instanceof static"),
types:A,blockKeywords:f("case catch class else for foreach if switch try while"),defKeywords:f("function local class"),typeFirstDefinitions:!0,atoms:f("true false null"),hooks:{"#":u},modeProps:{fold:["brace","include"]}});var F=null;q("text/x-ceylon",{name:"clike",keywords:f("abstracts alias assembly assert assign break case catch class continue dynamic else exists extends finally for function given if import in interface is let module new nonempty object of out outer package return satisfies super switch then this throw try value void while"),
types:function(a){a=a.charAt(0);return a===a.toUpperCase()&&a!==a.toLowerCase()},blockKeywords:f("case catch class dynamic else finally for function if interface module new object switch try while"),defKeywords:f("class dynamic function interface module object package value"),builtin:f("abstract actual aliased annotation by default deprecated doc final formal late license native optional sealed see serializable shared suppressWarnings tagged throws variable"),isPunctuationChar:/[\[\]{}\(\),;:\.`]/,
isOperatorChar:/[+\-*&%=<>!?|^~:\/]/,numberStart:/[\d#$]/,number:/^(?:#[\da-fA-F_]+|\$[01_]+|[\d_]+[kMGTPmunpf]?|[\d_]+\.[\d_]+(?:[eE][-+]?\d+|[kMGTPmunpf]|)|)/i,multiLineStrings:!0,typeFirstDefinitions:!0,atoms:f("true false null larger smaller equal empty finished"),indentSwitch:!1,styleDefs:!1,hooks:{"@":function(a){a.eatWhile(/[\w\$_]/);return"meta"},'"':function(a,b){b.tokenize=O(a.match('""')?"triple":"single");return b.tokenize(a,b)},"`":function(a,b){if(!F||!a.match("`"))return!1;b.tokenize=
F;F=null;return b.tokenize(a,b)},"'":function(a){a.eatWhile(/[\w\$_\xa1-\uffff]/);return"atom"},token:function(a,b,c){if(("variable"==c||"type"==c)&&"."==b.prevToken)return"variable-2"}},modeProps:{fold:["brace","import"],closeBrackets:{triples:'"'}}})});
