/*[global-shim-start]*/
(function(exports, global, doEval){ // jshint ignore:line
	var origDefine = global.define;

	var get = function(name){
		var parts = name.split("."),
			cur = global,
			i;
		for(i = 0 ; i < parts.length; i++){
			if(!cur) {
				break;
			}
			cur = cur[parts[i]];
		}
		return cur;
	};
	var set = function(name, val){
		var parts = name.split("."),
			cur = global,
			i, part, next;
		for(i = 0; i < parts.length - 1; i++) {
			part = parts[i];
			next = cur[part];
			if(!next) {
				next = cur[part] = {};
			}
			cur = next;
		}
		part = parts[parts.length - 1];
		cur[part] = val;
	};
	var useDefault = function(mod){
		if(!mod || !mod.__esModule) return false;
		var esProps = { __esModule: true, "default": true };
		for(var p in mod) {
			if(!esProps[p]) return false;
		}
		return true;
	};
	var modules = (global.define && global.define.modules) ||
		(global._define && global._define.modules) || {};
	var ourDefine = global.define = function(moduleName, deps, callback){
		var module;
		if(typeof deps === "function") {
			callback = deps;
			deps = [];
		}
		var args = [],
			i;
		for(i =0; i < deps.length; i++) {
			args.push( exports[deps[i]] ? get(exports[deps[i]]) : ( modules[deps[i]] || get(deps[i]) )  );
		}
		// CJS has no dependencies but 3 callback arguments
		if(!deps.length && callback.length) {
			module = { exports: {} };
			var require = function(name) {
				return exports[name] ? get(exports[name]) : modules[name];
			};
			args.push(require, module.exports, module);
		}
		// Babel uses the exports and module object.
		else if(!args[0] && deps[0] === "exports") {
			module = { exports: {} };
			args[0] = module.exports;
			if(deps[1] === "module") {
				args[1] = module;
			}
		} else if(!args[0] && deps[0] === "module") {
			args[0] = { id: moduleName };
		}

		global.define = origDefine;
		var result = callback ? callback.apply(null, args) : undefined;
		global.define = ourDefine;

		// Favor CJS module.exports over the return value
		result = module && module.exports ? module.exports : result;
		modules[moduleName] = result;

		// Set global exports
		var globalExport = exports[moduleName];
		if(globalExport && !get(globalExport)) {
			if(useDefault(result)) {
				result = result["default"];
			}
			set(globalExport, result);
		}
	};
	global.define.orig = origDefine;
	global.define.modules = modules;
	global.define.amd = true;
	ourDefine("@loader", [], function(){
		// shim for @@global-helpers
		var noop = function(){};
		return {
			get: function(){
				return { prepareGlobal: noop, retrieveGlobal: noop };
			},
			global: global,
			__exec: function(__load){
				doEval(__load.source, global);
			}
		};
	});
}
)({},window,function(__$source__, __$global__) { // jshint ignore:line
	eval("(function() { " + __$source__ + " \n }).call(__$global__);");
}
)
/*jquery@2.2.4#dist/jquery*/
define('jquery@2.2.4#dist/jquery', [
    'module',
    '@loader'
], function (module, loader) {
    loader.get('@@global-helpers').prepareGlobal(module.id, [], 'jQuery');
    var define = loader.global.define;
    var require = loader.global.require;
    var source = '/*!\n * jQuery JavaScript Library v2.2.4\n * http://jquery.com/\n *\n * Includes Sizzle.js\n * http://sizzlejs.com/\n *\n * Copyright jQuery Foundation and other contributors\n * Released under the MIT license\n * http://jquery.org/license\n *\n * Date: 2016-05-20T17:23Z\n */\n\n(function( global, factory ) {\n\n\tif ( typeof module === "object" && typeof module.exports === "object" ) {\n\t\t// For CommonJS and CommonJS-like environments where a proper `window`\n\t\t// is present, execute the factory and get jQuery.\n\t\t// For environments that do not have a `window` with a `document`\n\t\t// (such as Node.js), expose a factory as module.exports.\n\t\t// This accentuates the need for the creation of a real `window`.\n\t\t// e.g. var jQuery = require("jquery")(window);\n\t\t// See ticket #14549 for more info.\n\t\tmodule.exports = global.document ?\n\t\t\tfactory( global, true ) :\n\t\t\tfunction( w ) {\n\t\t\t\tif ( !w.document ) {\n\t\t\t\t\tthrow new Error( "jQuery requires a window with a document" );\n\t\t\t\t}\n\t\t\t\treturn factory( w );\n\t\t\t};\n\t} else {\n\t\tfactory( global );\n\t}\n\n// Pass this if window is not defined yet\n}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {\n\n// Support: Firefox 18+\n// Can\'t be in strict mode, several libs including ASP.NET trace\n// the stack via arguments.caller.callee and Firefox dies if\n// you try to trace through "use strict" call chains. (#13335)\n//"use strict";\nvar arr = [];\n\nvar document = window.document;\n\nvar slice = arr.slice;\n\nvar concat = arr.concat;\n\nvar push = arr.push;\n\nvar indexOf = arr.indexOf;\n\nvar class2type = {};\n\nvar toString = class2type.toString;\n\nvar hasOwn = class2type.hasOwnProperty;\n\nvar support = {};\n\n\n\nvar\n\tversion = "2.2.4",\n\n\t// Define a local copy of jQuery\n\tjQuery = function( selector, context ) {\n\n\t\t// The jQuery object is actually just the init constructor \'enhanced\'\n\t\t// Need init if jQuery is called (just allow error to be thrown if not included)\n\t\treturn new jQuery.fn.init( selector, context );\n\t},\n\n\t// Support: Android<4.1\n\t// Make sure we trim BOM and NBSP\n\trtrim = /^[\\s\\uFEFF\\xA0]+|[\\s\\uFEFF\\xA0]+$/g,\n\n\t// Matches dashed string for camelizing\n\trmsPrefix = /^-ms-/,\n\trdashAlpha = /-([\\da-z])/gi,\n\n\t// Used by jQuery.camelCase as callback to replace()\n\tfcamelCase = function( all, letter ) {\n\t\treturn letter.toUpperCase();\n\t};\n\njQuery.fn = jQuery.prototype = {\n\n\t// The current version of jQuery being used\n\tjquery: version,\n\n\tconstructor: jQuery,\n\n\t// Start with an empty selector\n\tselector: "",\n\n\t// The default length of a jQuery object is 0\n\tlength: 0,\n\n\ttoArray: function() {\n\t\treturn slice.call( this );\n\t},\n\n\t// Get the Nth element in the matched element set OR\n\t// Get the whole matched element set as a clean array\n\tget: function( num ) {\n\t\treturn num != null ?\n\n\t\t\t// Return just the one element from the set\n\t\t\t( num < 0 ? this[ num + this.length ] : this[ num ] ) :\n\n\t\t\t// Return all the elements in a clean array\n\t\t\tslice.call( this );\n\t},\n\n\t// Take an array of elements and push it onto the stack\n\t// (returning the new matched element set)\n\tpushStack: function( elems ) {\n\n\t\t// Build a new jQuery matched element set\n\t\tvar ret = jQuery.merge( this.constructor(), elems );\n\n\t\t// Add the old object onto the stack (as a reference)\n\t\tret.prevObject = this;\n\t\tret.context = this.context;\n\n\t\t// Return the newly-formed element set\n\t\treturn ret;\n\t},\n\n\t// Execute a callback for every element in the matched set.\n\teach: function( callback ) {\n\t\treturn jQuery.each( this, callback );\n\t},\n\n\tmap: function( callback ) {\n\t\treturn this.pushStack( jQuery.map( this, function( elem, i ) {\n\t\t\treturn callback.call( elem, i, elem );\n\t\t} ) );\n\t},\n\n\tslice: function() {\n\t\treturn this.pushStack( slice.apply( this, arguments ) );\n\t},\n\n\tfirst: function() {\n\t\treturn this.eq( 0 );\n\t},\n\n\tlast: function() {\n\t\treturn this.eq( -1 );\n\t},\n\n\teq: function( i ) {\n\t\tvar len = this.length,\n\t\t\tj = +i + ( i < 0 ? len : 0 );\n\t\treturn this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );\n\t},\n\n\tend: function() {\n\t\treturn this.prevObject || this.constructor();\n\t},\n\n\t// For internal use only.\n\t// Behaves like an Array\'s method, not like a jQuery method.\n\tpush: push,\n\tsort: arr.sort,\n\tsplice: arr.splice\n};\n\njQuery.extend = jQuery.fn.extend = function() {\n\tvar options, name, src, copy, copyIsArray, clone,\n\t\ttarget = arguments[ 0 ] || {},\n\t\ti = 1,\n\t\tlength = arguments.length,\n\t\tdeep = false;\n\n\t// Handle a deep copy situation\n\tif ( typeof target === "boolean" ) {\n\t\tdeep = target;\n\n\t\t// Skip the boolean and the target\n\t\ttarget = arguments[ i ] || {};\n\t\ti++;\n\t}\n\n\t// Handle case when target is a string or something (possible in deep copy)\n\tif ( typeof target !== "object" && !jQuery.isFunction( target ) ) {\n\t\ttarget = {};\n\t}\n\n\t// Extend jQuery itself if only one argument is passed\n\tif ( i === length ) {\n\t\ttarget = this;\n\t\ti--;\n\t}\n\n\tfor ( ; i < length; i++ ) {\n\n\t\t// Only deal with non-null/undefined values\n\t\tif ( ( options = arguments[ i ] ) != null ) {\n\n\t\t\t// Extend the base object\n\t\t\tfor ( name in options ) {\n\t\t\t\tsrc = target[ name ];\n\t\t\t\tcopy = options[ name ];\n\n\t\t\t\t// Prevent never-ending loop\n\t\t\t\tif ( target === copy ) {\n\t\t\t\t\tcontinue;\n\t\t\t\t}\n\n\t\t\t\t// Recurse if we\'re merging plain objects or arrays\n\t\t\t\tif ( deep && copy && ( jQuery.isPlainObject( copy ) ||\n\t\t\t\t\t( copyIsArray = jQuery.isArray( copy ) ) ) ) {\n\n\t\t\t\t\tif ( copyIsArray ) {\n\t\t\t\t\t\tcopyIsArray = false;\n\t\t\t\t\t\tclone = src && jQuery.isArray( src ) ? src : [];\n\n\t\t\t\t\t} else {\n\t\t\t\t\t\tclone = src && jQuery.isPlainObject( src ) ? src : {};\n\t\t\t\t\t}\n\n\t\t\t\t\t// Never move original objects, clone them\n\t\t\t\t\ttarget[ name ] = jQuery.extend( deep, clone, copy );\n\n\t\t\t\t// Don\'t bring in undefined values\n\t\t\t\t} else if ( copy !== undefined ) {\n\t\t\t\t\ttarget[ name ] = copy;\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n\n\t// Return the modified object\n\treturn target;\n};\n\njQuery.extend( {\n\n\t// Unique for each copy of jQuery on the page\n\texpando: "jQuery" + ( version + Math.random() ).replace( /\\D/g, "" ),\n\n\t// Assume jQuery is ready without the ready module\n\tisReady: true,\n\n\terror: function( msg ) {\n\t\tthrow new Error( msg );\n\t},\n\n\tnoop: function() {},\n\n\tisFunction: function( obj ) {\n\t\treturn jQuery.type( obj ) === "function";\n\t},\n\n\tisArray: Array.isArray,\n\n\tisWindow: function( obj ) {\n\t\treturn obj != null && obj === obj.window;\n\t},\n\n\tisNumeric: function( obj ) {\n\n\t\t// parseFloat NaNs numeric-cast false positives (null|true|false|"")\n\t\t// ...but misinterprets leading-number strings, particularly hex literals ("0x...")\n\t\t// subtraction forces infinities to NaN\n\t\t// adding 1 corrects loss of precision from parseFloat (#15100)\n\t\tvar realStringObj = obj && obj.toString();\n\t\treturn !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;\n\t},\n\n\tisPlainObject: function( obj ) {\n\t\tvar key;\n\n\t\t// Not plain objects:\n\t\t// - Any object or value whose internal [[Class]] property is not "[object Object]"\n\t\t// - DOM nodes\n\t\t// - window\n\t\tif ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {\n\t\t\treturn false;\n\t\t}\n\n\t\t// Not own constructor property must be Object\n\t\tif ( obj.constructor &&\n\t\t\t\t!hasOwn.call( obj, "constructor" ) &&\n\t\t\t\t!hasOwn.call( obj.constructor.prototype || {}, "isPrototypeOf" ) ) {\n\t\t\treturn false;\n\t\t}\n\n\t\t// Own properties are enumerated firstly, so to speed up,\n\t\t// if last one is own, then all properties are own\n\t\tfor ( key in obj ) {}\n\n\t\treturn key === undefined || hasOwn.call( obj, key );\n\t},\n\n\tisEmptyObject: function( obj ) {\n\t\tvar name;\n\t\tfor ( name in obj ) {\n\t\t\treturn false;\n\t\t}\n\t\treturn true;\n\t},\n\n\ttype: function( obj ) {\n\t\tif ( obj == null ) {\n\t\t\treturn obj + "";\n\t\t}\n\n\t\t// Support: Android<4.0, iOS<6 (functionish RegExp)\n\t\treturn typeof obj === "object" || typeof obj === "function" ?\n\t\t\tclass2type[ toString.call( obj ) ] || "object" :\n\t\t\ttypeof obj;\n\t},\n\n\t// Evaluates a script in a global context\n\tglobalEval: function( code ) {\n\t\tvar script,\n\t\t\tindirect = eval;\n\n\t\tcode = jQuery.trim( code );\n\n\t\tif ( code ) {\n\n\t\t\t// If the code includes a valid, prologue position\n\t\t\t// strict mode pragma, execute code by injecting a\n\t\t\t// script tag into the document.\n\t\t\tif ( code.indexOf( "use strict" ) === 1 ) {\n\t\t\t\tscript = document.createElement( "script" );\n\t\t\t\tscript.text = code;\n\t\t\t\tdocument.head.appendChild( script ).parentNode.removeChild( script );\n\t\t\t} else {\n\n\t\t\t\t// Otherwise, avoid the DOM node creation, insertion\n\t\t\t\t// and removal by using an indirect global eval\n\n\t\t\t\tindirect( code );\n\t\t\t}\n\t\t}\n\t},\n\n\t// Convert dashed to camelCase; used by the css and data modules\n\t// Support: IE9-11+\n\t// Microsoft forgot to hump their vendor prefix (#9572)\n\tcamelCase: function( string ) {\n\t\treturn string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );\n\t},\n\n\tnodeName: function( elem, name ) {\n\t\treturn elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();\n\t},\n\n\teach: function( obj, callback ) {\n\t\tvar length, i = 0;\n\n\t\tif ( isArrayLike( obj ) ) {\n\t\t\tlength = obj.length;\n\t\t\tfor ( ; i < length; i++ ) {\n\t\t\t\tif ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {\n\t\t\t\t\tbreak;\n\t\t\t\t}\n\t\t\t}\n\t\t} else {\n\t\t\tfor ( i in obj ) {\n\t\t\t\tif ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {\n\t\t\t\t\tbreak;\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\n\t\treturn obj;\n\t},\n\n\t// Support: Android<4.1\n\ttrim: function( text ) {\n\t\treturn text == null ?\n\t\t\t"" :\n\t\t\t( text + "" ).replace( rtrim, "" );\n\t},\n\n\t// results is for internal usage only\n\tmakeArray: function( arr, results ) {\n\t\tvar ret = results || [];\n\n\t\tif ( arr != null ) {\n\t\t\tif ( isArrayLike( Object( arr ) ) ) {\n\t\t\t\tjQuery.merge( ret,\n\t\t\t\t\ttypeof arr === "string" ?\n\t\t\t\t\t[ arr ] : arr\n\t\t\t\t);\n\t\t\t} else {\n\t\t\t\tpush.call( ret, arr );\n\t\t\t}\n\t\t}\n\n\t\treturn ret;\n\t},\n\n\tinArray: function( elem, arr, i ) {\n\t\treturn arr == null ? -1 : indexOf.call( arr, elem, i );\n\t},\n\n\tmerge: function( first, second ) {\n\t\tvar len = +second.length,\n\t\t\tj = 0,\n\t\t\ti = first.length;\n\n\t\tfor ( ; j < len; j++ ) {\n\t\t\tfirst[ i++ ] = second[ j ];\n\t\t}\n\n\t\tfirst.length = i;\n\n\t\treturn first;\n\t},\n\n\tgrep: function( elems, callback, invert ) {\n\t\tvar callbackInverse,\n\t\t\tmatches = [],\n\t\t\ti = 0,\n\t\t\tlength = elems.length,\n\t\t\tcallbackExpect = !invert;\n\n\t\t// Go through the array, only saving the items\n\t\t// that pass the validator function\n\t\tfor ( ; i < length; i++ ) {\n\t\t\tcallbackInverse = !callback( elems[ i ], i );\n\t\t\tif ( callbackInverse !== callbackExpect ) {\n\t\t\t\tmatches.push( elems[ i ] );\n\t\t\t}\n\t\t}\n\n\t\treturn matches;\n\t},\n\n\t// arg is for internal usage only\n\tmap: function( elems, callback, arg ) {\n\t\tvar length, value,\n\t\t\ti = 0,\n\t\t\tret = [];\n\n\t\t// Go through the array, translating each of the items to their new values\n\t\tif ( isArrayLike( elems ) ) {\n\t\t\tlength = elems.length;\n\t\t\tfor ( ; i < length; i++ ) {\n\t\t\t\tvalue = callback( elems[ i ], i, arg );\n\n\t\t\t\tif ( value != null ) {\n\t\t\t\t\tret.push( value );\n\t\t\t\t}\n\t\t\t}\n\n\t\t// Go through every key on the object,\n\t\t} else {\n\t\t\tfor ( i in elems ) {\n\t\t\t\tvalue = callback( elems[ i ], i, arg );\n\n\t\t\t\tif ( value != null ) {\n\t\t\t\t\tret.push( value );\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\n\t\t// Flatten any nested arrays\n\t\treturn concat.apply( [], ret );\n\t},\n\n\t// A global GUID counter for objects\n\tguid: 1,\n\n\t// Bind a function to a context, optionally partially applying any\n\t// arguments.\n\tproxy: function( fn, context ) {\n\t\tvar tmp, args, proxy;\n\n\t\tif ( typeof context === "string" ) {\n\t\t\ttmp = fn[ context ];\n\t\t\tcontext = fn;\n\t\t\tfn = tmp;\n\t\t}\n\n\t\t// Quick check to determine if target is callable, in the spec\n\t\t// this throws a TypeError, but we will just return undefined.\n\t\tif ( !jQuery.isFunction( fn ) ) {\n\t\t\treturn undefined;\n\t\t}\n\n\t\t// Simulated bind\n\t\targs = slice.call( arguments, 2 );\n\t\tproxy = function() {\n\t\t\treturn fn.apply( context || this, args.concat( slice.call( arguments ) ) );\n\t\t};\n\n\t\t// Set the guid of unique handler to the same of original handler, so it can be removed\n\t\tproxy.guid = fn.guid = fn.guid || jQuery.guid++;\n\n\t\treturn proxy;\n\t},\n\n\tnow: Date.now,\n\n\t// jQuery.support is not used in Core but other projects attach their\n\t// properties to it so it needs to exist.\n\tsupport: support\n} );\n\n// JSHint would error on this code due to the Symbol not being defined in ES5.\n// Defining this global in .jshintrc would create a danger of using the global\n// unguarded in another place, it seems safer to just disable JSHint for these\n// three lines.\n/* jshint ignore: start */\nif ( typeof Symbol === "function" ) {\n\tjQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];\n}\n/* jshint ignore: end */\n\n// Populate the class2type map\njQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),\nfunction( i, name ) {\n\tclass2type[ "[object " + name + "]" ] = name.toLowerCase();\n} );\n\nfunction isArrayLike( obj ) {\n\n\t// Support: iOS 8.2 (not reproducible in simulator)\n\t// `in` check used to prevent JIT error (gh-2145)\n\t// hasOwn isn\'t used here due to false negatives\n\t// regarding Nodelist length in IE\n\tvar length = !!obj && "length" in obj && obj.length,\n\t\ttype = jQuery.type( obj );\n\n\tif ( type === "function" || jQuery.isWindow( obj ) ) {\n\t\treturn false;\n\t}\n\n\treturn type === "array" || length === 0 ||\n\t\ttypeof length === "number" && length > 0 && ( length - 1 ) in obj;\n}\nvar Sizzle =\n/*!\n * Sizzle CSS Selector Engine v2.2.1\n * http://sizzlejs.com/\n *\n * Copyright jQuery Foundation and other contributors\n * Released under the MIT license\n * http://jquery.org/license\n *\n * Date: 2015-10-17\n */\n(function( window ) {\n\nvar i,\n\tsupport,\n\tExpr,\n\tgetText,\n\tisXML,\n\ttokenize,\n\tcompile,\n\tselect,\n\toutermostContext,\n\tsortInput,\n\thasDuplicate,\n\n\t// Local document vars\n\tsetDocument,\n\tdocument,\n\tdocElem,\n\tdocumentIsHTML,\n\trbuggyQSA,\n\trbuggyMatches,\n\tmatches,\n\tcontains,\n\n\t// Instance-specific data\n\texpando = "sizzle" + 1 * new Date(),\n\tpreferredDoc = window.document,\n\tdirruns = 0,\n\tdone = 0,\n\tclassCache = createCache(),\n\ttokenCache = createCache(),\n\tcompilerCache = createCache(),\n\tsortOrder = function( a, b ) {\n\t\tif ( a === b ) {\n\t\t\thasDuplicate = true;\n\t\t}\n\t\treturn 0;\n\t},\n\n\t// General-purpose constants\n\tMAX_NEGATIVE = 1 << 31,\n\n\t// Instance methods\n\thasOwn = ({}).hasOwnProperty,\n\tarr = [],\n\tpop = arr.pop,\n\tpush_native = arr.push,\n\tpush = arr.push,\n\tslice = arr.slice,\n\t// Use a stripped-down indexOf as it\'s faster than native\n\t// http://jsperf.com/thor-indexof-vs-for/5\n\tindexOf = function( list, elem ) {\n\t\tvar i = 0,\n\t\t\tlen = list.length;\n\t\tfor ( ; i < len; i++ ) {\n\t\t\tif ( list[i] === elem ) {\n\t\t\t\treturn i;\n\t\t\t}\n\t\t}\n\t\treturn -1;\n\t},\n\n\tbooleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",\n\n\t// Regular expressions\n\n\t// http://www.w3.org/TR/css3-selectors/#whitespace\n\twhitespace = "[\\\\x20\\\\t\\\\r\\\\n\\\\f]",\n\n\t// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier\n\tidentifier = "(?:\\\\\\\\.|[\\\\w-]|[^\\\\x00-\\\\xa0])+",\n\n\t// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors\n\tattributes = "\\\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +\n\t\t// Operator (capture 2)\n\t\t"*([*^$|!~]?=)" + whitespace +\n\t\t// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"\n\t\t"*(?:\'((?:\\\\\\\\.|[^\\\\\\\\\'])*)\'|\\"((?:\\\\\\\\.|[^\\\\\\\\\\"])*)\\"|(" + identifier + "))|)" + whitespace +\n\t\t"*\\\\]",\n\n\tpseudos = ":(" + identifier + ")(?:\\\\((" +\n\t\t// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:\n\t\t// 1. quoted (capture 3; capture 4 or capture 5)\n\t\t"(\'((?:\\\\\\\\.|[^\\\\\\\\\'])*)\'|\\"((?:\\\\\\\\.|[^\\\\\\\\\\"])*)\\")|" +\n\t\t// 2. simple (capture 6)\n\t\t"((?:\\\\\\\\.|[^\\\\\\\\()[\\\\]]|" + attributes + ")*)|" +\n\t\t// 3. anything else (capture 2)\n\t\t".*" +\n\t\t")\\\\)|)",\n\n\t// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter\n\trwhitespace = new RegExp( whitespace + "+", "g" ),\n\trtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\\\\\])(?:\\\\\\\\.)*)" + whitespace + "+$", "g" ),\n\n\trcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),\n\trcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),\n\n\trattributeQuotes = new RegExp( "=" + whitespace + "*([^\\\\]\'\\"]*?)" + whitespace + "*\\\\]", "g" ),\n\n\trpseudo = new RegExp( pseudos ),\n\tridentifier = new RegExp( "^" + identifier + "$" ),\n\n\tmatchExpr = {\n\t\t"ID": new RegExp( "^#(" + identifier + ")" ),\n\t\t"CLASS": new RegExp( "^\\\\.(" + identifier + ")" ),\n\t\t"TAG": new RegExp( "^(" + identifier + "|[*])" ),\n\t\t"ATTR": new RegExp( "^" + attributes ),\n\t\t"PSEUDO": new RegExp( "^" + pseudos ),\n\t\t"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\\\(" + whitespace +\n\t\t\t"*(even|odd|(([+-]|)(\\\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +\n\t\t\t"*(\\\\d+)|))" + whitespace + "*\\\\)|)", "i" ),\n\t\t"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),\n\t\t// For use in libraries implementing .is()\n\t\t// We use this for POS matching in `select`\n\t\t"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\\\(" +\n\t\t\twhitespace + "*((?:-\\\\d)?\\\\d*)" + whitespace + "*\\\\)|)(?=[^-]|$)", "i" )\n\t},\n\n\trinputs = /^(?:input|select|textarea|button)$/i,\n\trheader = /^h\\d$/i,\n\n\trnative = /^[^{]+\\{\\s*\\[native \\w/,\n\n\t// Easily-parseable/retrievable ID or TAG or CLASS selectors\n\trquickExpr = /^(?:#([\\w-]+)|(\\w+)|\\.([\\w-]+))$/,\n\n\trsibling = /[+~]/,\n\trescape = /\'|\\\\/g,\n\n\t// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters\n\trunescape = new RegExp( "\\\\\\\\([\\\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),\n\tfunescape = function( _, escaped, escapedWhitespace ) {\n\t\tvar high = "0x" + escaped - 0x10000;\n\t\t// NaN means non-codepoint\n\t\t// Support: Firefox<24\n\t\t// Workaround erroneous numeric interpretation of +"0x"\n\t\treturn high !== high || escapedWhitespace ?\n\t\t\tescaped :\n\t\t\thigh < 0 ?\n\t\t\t\t// BMP codepoint\n\t\t\t\tString.fromCharCode( high + 0x10000 ) :\n\t\t\t\t// Supplemental Plane codepoint (surrogate pair)\n\t\t\t\tString.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );\n\t},\n\n\t// Used for iframes\n\t// See setDocument()\n\t// Removing the function wrapper causes a "Permission Denied"\n\t// error in IE\n\tunloadHandler = function() {\n\t\tsetDocument();\n\t};\n\n// Optimize for push.apply( _, NodeList )\ntry {\n\tpush.apply(\n\t\t(arr = slice.call( preferredDoc.childNodes )),\n\t\tpreferredDoc.childNodes\n\t);\n\t// Support: Android<4.0\n\t// Detect silently failing push.apply\n\tarr[ preferredDoc.childNodes.length ].nodeType;\n} catch ( e ) {\n\tpush = { apply: arr.length ?\n\n\t\t// Leverage slice if possible\n\t\tfunction( target, els ) {\n\t\t\tpush_native.apply( target, slice.call(els) );\n\t\t} :\n\n\t\t// Support: IE<9\n\t\t// Otherwise append directly\n\t\tfunction( target, els ) {\n\t\t\tvar j = target.length,\n\t\t\t\ti = 0;\n\t\t\t// Can\'t trust NodeList.length\n\t\t\twhile ( (target[j++] = els[i++]) ) {}\n\t\t\ttarget.length = j - 1;\n\t\t}\n\t};\n}\n\nfunction Sizzle( selector, context, results, seed ) {\n\tvar m, i, elem, nid, nidselect, match, groups, newSelector,\n\t\tnewContext = context && context.ownerDocument,\n\n\t\t// nodeType defaults to 9, since context defaults to document\n\t\tnodeType = context ? context.nodeType : 9;\n\n\tresults = results || [];\n\n\t// Return early from calls with invalid selector or context\n\tif ( typeof selector !== "string" || !selector ||\n\t\tnodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {\n\n\t\treturn results;\n\t}\n\n\t// Try to shortcut find operations (as opposed to filters) in HTML documents\n\tif ( !seed ) {\n\n\t\tif ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {\n\t\t\tsetDocument( context );\n\t\t}\n\t\tcontext = context || document;\n\n\t\tif ( documentIsHTML ) {\n\n\t\t\t// If the selector is sufficiently simple, try using a "get*By*" DOM method\n\t\t\t// (excepting DocumentFragment context, where the methods don\'t exist)\n\t\t\tif ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {\n\n\t\t\t\t// ID selector\n\t\t\t\tif ( (m = match[1]) ) {\n\n\t\t\t\t\t// Document context\n\t\t\t\t\tif ( nodeType === 9 ) {\n\t\t\t\t\t\tif ( (elem = context.getElementById( m )) ) {\n\n\t\t\t\t\t\t\t// Support: IE, Opera, Webkit\n\t\t\t\t\t\t\t// TODO: identify versions\n\t\t\t\t\t\t\t// getElementById can match elements by name instead of ID\n\t\t\t\t\t\t\tif ( elem.id === m ) {\n\t\t\t\t\t\t\t\tresults.push( elem );\n\t\t\t\t\t\t\t\treturn results;\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\treturn results;\n\t\t\t\t\t\t}\n\n\t\t\t\t\t// Element context\n\t\t\t\t\t} else {\n\n\t\t\t\t\t\t// Support: IE, Opera, Webkit\n\t\t\t\t\t\t// TODO: identify versions\n\t\t\t\t\t\t// getElementById can match elements by name instead of ID\n\t\t\t\t\t\tif ( newContext && (elem = newContext.getElementById( m )) &&\n\t\t\t\t\t\t\tcontains( context, elem ) &&\n\t\t\t\t\t\t\telem.id === m ) {\n\n\t\t\t\t\t\t\tresults.push( elem );\n\t\t\t\t\t\t\treturn results;\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\n\t\t\t\t// Type selector\n\t\t\t\t} else if ( match[2] ) {\n\t\t\t\t\tpush.apply( results, context.getElementsByTagName( selector ) );\n\t\t\t\t\treturn results;\n\n\t\t\t\t// Class selector\n\t\t\t\t} else if ( (m = match[3]) && support.getElementsByClassName &&\n\t\t\t\t\tcontext.getElementsByClassName ) {\n\n\t\t\t\t\tpush.apply( results, context.getElementsByClassName( m ) );\n\t\t\t\t\treturn results;\n\t\t\t\t}\n\t\t\t}\n\n\t\t\t// Take advantage of querySelectorAll\n\t\t\tif ( support.qsa &&\n\t\t\t\t!compilerCache[ selector + " " ] &&\n\t\t\t\t(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {\n\n\t\t\t\tif ( nodeType !== 1 ) {\n\t\t\t\t\tnewContext = context;\n\t\t\t\t\tnewSelector = selector;\n\n\t\t\t\t// qSA looks outside Element context, which is not what we want\n\t\t\t\t// Thanks to Andrew Dupont for this workaround technique\n\t\t\t\t// Support: IE <=8\n\t\t\t\t// Exclude object elements\n\t\t\t\t} else if ( context.nodeName.toLowerCase() !== "object" ) {\n\n\t\t\t\t\t// Capture the context ID, setting it first if necessary\n\t\t\t\t\tif ( (nid = context.getAttribute( "id" )) ) {\n\t\t\t\t\t\tnid = nid.replace( rescape, "\\\\$&" );\n\t\t\t\t\t} else {\n\t\t\t\t\t\tcontext.setAttribute( "id", (nid = expando) );\n\t\t\t\t\t}\n\n\t\t\t\t\t// Prefix every selector in the list\n\t\t\t\t\tgroups = tokenize( selector );\n\t\t\t\t\ti = groups.length;\n\t\t\t\t\tnidselect = ridentifier.test( nid ) ? "#" + nid : "[id=\'" + nid + "\']";\n\t\t\t\t\twhile ( i-- ) {\n\t\t\t\t\t\tgroups[i] = nidselect + " " + toSelector( groups[i] );\n\t\t\t\t\t}\n\t\t\t\t\tnewSelector = groups.join( "," );\n\n\t\t\t\t\t// Expand context for sibling selectors\n\t\t\t\t\tnewContext = rsibling.test( selector ) && testContext( context.parentNode ) ||\n\t\t\t\t\t\tcontext;\n\t\t\t\t}\n\n\t\t\t\tif ( newSelector ) {\n\t\t\t\t\ttry {\n\t\t\t\t\t\tpush.apply( results,\n\t\t\t\t\t\t\tnewContext.querySelectorAll( newSelector )\n\t\t\t\t\t\t);\n\t\t\t\t\t\treturn results;\n\t\t\t\t\t} catch ( qsaError ) {\n\t\t\t\t\t} finally {\n\t\t\t\t\t\tif ( nid === expando ) {\n\t\t\t\t\t\t\tcontext.removeAttribute( "id" );\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n\n\t// All others\n\treturn select( selector.replace( rtrim, "$1" ), context, results, seed );\n}\n\n/**\n * Create key-value caches of limited size\n * @returns {function(string, object)} Returns the Object data after storing it on itself with\n *\tproperty name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)\n *\tdeleting the oldest entry\n */\nfunction createCache() {\n\tvar keys = [];\n\n\tfunction cache( key, value ) {\n\t\t// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)\n\t\tif ( keys.push( key + " " ) > Expr.cacheLength ) {\n\t\t\t// Only keep the most recent entries\n\t\t\tdelete cache[ keys.shift() ];\n\t\t}\n\t\treturn (cache[ key + " " ] = value);\n\t}\n\treturn cache;\n}\n\n/**\n * Mark a function for special use by Sizzle\n * @param {Function} fn The function to mark\n */\nfunction markFunction( fn ) {\n\tfn[ expando ] = true;\n\treturn fn;\n}\n\n/**\n * Support testing using an element\n * @param {Function} fn Passed the created div and expects a boolean result\n */\nfunction assert( fn ) {\n\tvar div = document.createElement("div");\n\n\ttry {\n\t\treturn !!fn( div );\n\t} catch (e) {\n\t\treturn false;\n\t} finally {\n\t\t// Remove from its parent by default\n\t\tif ( div.parentNode ) {\n\t\t\tdiv.parentNode.removeChild( div );\n\t\t}\n\t\t// release memory in IE\n\t\tdiv = null;\n\t}\n}\n\n/**\n * Adds the same handler for all of the specified attrs\n * @param {String} attrs Pipe-separated list of attributes\n * @param {Function} handler The method that will be applied\n */\nfunction addHandle( attrs, handler ) {\n\tvar arr = attrs.split("|"),\n\t\ti = arr.length;\n\n\twhile ( i-- ) {\n\t\tExpr.attrHandle[ arr[i] ] = handler;\n\t}\n}\n\n/**\n * Checks document order of two siblings\n * @param {Element} a\n * @param {Element} b\n * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b\n */\nfunction siblingCheck( a, b ) {\n\tvar cur = b && a,\n\t\tdiff = cur && a.nodeType === 1 && b.nodeType === 1 &&\n\t\t\t( ~b.sourceIndex || MAX_NEGATIVE ) -\n\t\t\t( ~a.sourceIndex || MAX_NEGATIVE );\n\n\t// Use IE sourceIndex if available on both nodes\n\tif ( diff ) {\n\t\treturn diff;\n\t}\n\n\t// Check if b follows a\n\tif ( cur ) {\n\t\twhile ( (cur = cur.nextSibling) ) {\n\t\t\tif ( cur === b ) {\n\t\t\t\treturn -1;\n\t\t\t}\n\t\t}\n\t}\n\n\treturn a ? 1 : -1;\n}\n\n/**\n * Returns a function to use in pseudos for input types\n * @param {String} type\n */\nfunction createInputPseudo( type ) {\n\treturn function( elem ) {\n\t\tvar name = elem.nodeName.toLowerCase();\n\t\treturn name === "input" && elem.type === type;\n\t};\n}\n\n/**\n * Returns a function to use in pseudos for buttons\n * @param {String} type\n */\nfunction createButtonPseudo( type ) {\n\treturn function( elem ) {\n\t\tvar name = elem.nodeName.toLowerCase();\n\t\treturn (name === "input" || name === "button") && elem.type === type;\n\t};\n}\n\n/**\n * Returns a function to use in pseudos for positionals\n * @param {Function} fn\n */\nfunction createPositionalPseudo( fn ) {\n\treturn markFunction(function( argument ) {\n\t\targument = +argument;\n\t\treturn markFunction(function( seed, matches ) {\n\t\t\tvar j,\n\t\t\t\tmatchIndexes = fn( [], seed.length, argument ),\n\t\t\t\ti = matchIndexes.length;\n\n\t\t\t// Match elements found at the specified indexes\n\t\t\twhile ( i-- ) {\n\t\t\t\tif ( seed[ (j = matchIndexes[i]) ] ) {\n\t\t\t\t\tseed[j] = !(matches[j] = seed[j]);\n\t\t\t\t}\n\t\t\t}\n\t\t});\n\t});\n}\n\n/**\n * Checks a node for validity as a Sizzle context\n * @param {Element|Object=} context\n * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value\n */\nfunction testContext( context ) {\n\treturn context && typeof context.getElementsByTagName !== "undefined" && context;\n}\n\n// Expose support vars for convenience\nsupport = Sizzle.support = {};\n\n/**\n * Detects XML nodes\n * @param {Element|Object} elem An element or a document\n * @returns {Boolean} True iff elem is a non-HTML XML node\n */\nisXML = Sizzle.isXML = function( elem ) {\n\t// documentElement is verified for cases where it doesn\'t yet exist\n\t// (such as loading iframes in IE - #4833)\n\tvar documentElement = elem && (elem.ownerDocument || elem).documentElement;\n\treturn documentElement ? documentElement.nodeName !== "HTML" : false;\n};\n\n/**\n * Sets document-related variables once based on the current document\n * @param {Element|Object} [doc] An element or document object to use to set the document\n * @returns {Object} Returns the current document\n */\nsetDocument = Sizzle.setDocument = function( node ) {\n\tvar hasCompare, parent,\n\t\tdoc = node ? node.ownerDocument || node : preferredDoc;\n\n\t// Return early if doc is invalid or already selected\n\tif ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {\n\t\treturn document;\n\t}\n\n\t// Update global variables\n\tdocument = doc;\n\tdocElem = document.documentElement;\n\tdocumentIsHTML = !isXML( document );\n\n\t// Support: IE 9-11, Edge\n\t// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)\n\tif ( (parent = document.defaultView) && parent.top !== parent ) {\n\t\t// Support: IE 11\n\t\tif ( parent.addEventListener ) {\n\t\t\tparent.addEventListener( "unload", unloadHandler, false );\n\n\t\t// Support: IE 9 - 10 only\n\t\t} else if ( parent.attachEvent ) {\n\t\t\tparent.attachEvent( "onunload", unloadHandler );\n\t\t}\n\t}\n\n\t/* Attributes\n\t---------------------------------------------------------------------- */\n\n\t// Support: IE<8\n\t// Verify that getAttribute really returns attributes and not properties\n\t// (excepting IE8 booleans)\n\tsupport.attributes = assert(function( div ) {\n\t\tdiv.className = "i";\n\t\treturn !div.getAttribute("className");\n\t});\n\n\t/* getElement(s)By*\n\t---------------------------------------------------------------------- */\n\n\t// Check if getElementsByTagName("*") returns only elements\n\tsupport.getElementsByTagName = assert(function( div ) {\n\t\tdiv.appendChild( document.createComment("") );\n\t\treturn !div.getElementsByTagName("*").length;\n\t});\n\n\t// Support: IE<9\n\tsupport.getElementsByClassName = rnative.test( document.getElementsByClassName );\n\n\t// Support: IE<10\n\t// Check if getElementById returns elements by name\n\t// The broken getElementById methods don\'t pick up programatically-set names,\n\t// so use a roundabout getElementsByName test\n\tsupport.getById = assert(function( div ) {\n\t\tdocElem.appendChild( div ).id = expando;\n\t\treturn !document.getElementsByName || !document.getElementsByName( expando ).length;\n\t});\n\n\t// ID find and filter\n\tif ( support.getById ) {\n\t\tExpr.find["ID"] = function( id, context ) {\n\t\t\tif ( typeof context.getElementById !== "undefined" && documentIsHTML ) {\n\t\t\t\tvar m = context.getElementById( id );\n\t\t\t\treturn m ? [ m ] : [];\n\t\t\t}\n\t\t};\n\t\tExpr.filter["ID"] = function( id ) {\n\t\t\tvar attrId = id.replace( runescape, funescape );\n\t\t\treturn function( elem ) {\n\t\t\t\treturn elem.getAttribute("id") === attrId;\n\t\t\t};\n\t\t};\n\t} else {\n\t\t// Support: IE6/7\n\t\t// getElementById is not reliable as a find shortcut\n\t\tdelete Expr.find["ID"];\n\n\t\tExpr.filter["ID"] =  function( id ) {\n\t\t\tvar attrId = id.replace( runescape, funescape );\n\t\t\treturn function( elem ) {\n\t\t\t\tvar node = typeof elem.getAttributeNode !== "undefined" &&\n\t\t\t\t\telem.getAttributeNode("id");\n\t\t\t\treturn node && node.value === attrId;\n\t\t\t};\n\t\t};\n\t}\n\n\t// Tag\n\tExpr.find["TAG"] = support.getElementsByTagName ?\n\t\tfunction( tag, context ) {\n\t\t\tif ( typeof context.getElementsByTagName !== "undefined" ) {\n\t\t\t\treturn context.getElementsByTagName( tag );\n\n\t\t\t// DocumentFragment nodes don\'t have gEBTN\n\t\t\t} else if ( support.qsa ) {\n\t\t\t\treturn context.querySelectorAll( tag );\n\t\t\t}\n\t\t} :\n\n\t\tfunction( tag, context ) {\n\t\t\tvar elem,\n\t\t\t\ttmp = [],\n\t\t\t\ti = 0,\n\t\t\t\t// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too\n\t\t\t\tresults = context.getElementsByTagName( tag );\n\n\t\t\t// Filter out possible comments\n\t\t\tif ( tag === "*" ) {\n\t\t\t\twhile ( (elem = results[i++]) ) {\n\t\t\t\t\tif ( elem.nodeType === 1 ) {\n\t\t\t\t\t\ttmp.push( elem );\n\t\t\t\t\t}\n\t\t\t\t}\n\n\t\t\t\treturn tmp;\n\t\t\t}\n\t\t\treturn results;\n\t\t};\n\n\t// Class\n\tExpr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {\n\t\tif ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {\n\t\t\treturn context.getElementsByClassName( className );\n\t\t}\n\t};\n\n\t/* QSA/matchesSelector\n\t---------------------------------------------------------------------- */\n\n\t// QSA and matchesSelector support\n\n\t// matchesSelector(:active) reports false when true (IE9/Opera 11.5)\n\trbuggyMatches = [];\n\n\t// qSa(:focus) reports false when true (Chrome 21)\n\t// We allow this because of a bug in IE8/9 that throws an error\n\t// whenever `document.activeElement` is accessed on an iframe\n\t// So, we allow :focus to pass through QSA all the time to avoid the IE error\n\t// See http://bugs.jquery.com/ticket/13378\n\trbuggyQSA = [];\n\n\tif ( (support.qsa = rnative.test( document.querySelectorAll )) ) {\n\t\t// Build QSA regex\n\t\t// Regex strategy adopted from Diego Perini\n\t\tassert(function( div ) {\n\t\t\t// Select is set to empty string on purpose\n\t\t\t// This is to test IE\'s treatment of not explicitly\n\t\t\t// setting a boolean content attribute,\n\t\t\t// since its presence should be enough\n\t\t\t// http://bugs.jquery.com/ticket/12359\n\t\t\tdocElem.appendChild( div ).innerHTML = "<a id=\'" + expando + "\'></a>" +\n\t\t\t\t"<select id=\'" + expando + "-\\r\\\\\' msallowcapture=\'\'>" +\n\t\t\t\t"<option selected=\'\'></option></select>";\n\n\t\t\t// Support: IE8, Opera 11-12.16\n\t\t\t// Nothing should be selected when empty strings follow ^= or $= or *=\n\t\t\t// The test attribute must be unknown in Opera but "safe" for WinRT\n\t\t\t// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section\n\t\t\tif ( div.querySelectorAll("[msallowcapture^=\'\']").length ) {\n\t\t\t\trbuggyQSA.push( "[*^$]=" + whitespace + "*(?:\'\'|\\"\\")" );\n\t\t\t}\n\n\t\t\t// Support: IE8\n\t\t\t// Boolean attributes and "value" are not treated correctly\n\t\t\tif ( !div.querySelectorAll("[selected]").length ) {\n\t\t\t\trbuggyQSA.push( "\\\\[" + whitespace + "*(?:value|" + booleans + ")" );\n\t\t\t}\n\n\t\t\t// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+\n\t\t\tif ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {\n\t\t\t\trbuggyQSA.push("~=");\n\t\t\t}\n\n\t\t\t// Webkit/Opera - :checked should return selected option elements\n\t\t\t// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked\n\t\t\t// IE8 throws error here and will not see later tests\n\t\t\tif ( !div.querySelectorAll(":checked").length ) {\n\t\t\t\trbuggyQSA.push(":checked");\n\t\t\t}\n\n\t\t\t// Support: Safari 8+, iOS 8+\n\t\t\t// https://bugs.webkit.org/show_bug.cgi?id=136851\n\t\t\t// In-page `selector#id sibing-combinator selector` fails\n\t\t\tif ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {\n\t\t\t\trbuggyQSA.push(".#.+[+~]");\n\t\t\t}\n\t\t});\n\n\t\tassert(function( div ) {\n\t\t\t// Support: Windows 8 Native Apps\n\t\t\t// The type and name attributes are restricted during .innerHTML assignment\n\t\t\tvar input = document.createElement("input");\n\t\t\tinput.setAttribute( "type", "hidden" );\n\t\t\tdiv.appendChild( input ).setAttribute( "name", "D" );\n\n\t\t\t// Support: IE8\n\t\t\t// Enforce case-sensitivity of name attribute\n\t\t\tif ( div.querySelectorAll("[name=d]").length ) {\n\t\t\t\trbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );\n\t\t\t}\n\n\t\t\t// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)\n\t\t\t// IE8 throws error here and will not see later tests\n\t\t\tif ( !div.querySelectorAll(":enabled").length ) {\n\t\t\t\trbuggyQSA.push( ":enabled", ":disabled" );\n\t\t\t}\n\n\t\t\t// Opera 10-11 does not throw on post-comma invalid pseudos\n\t\t\tdiv.querySelectorAll("*,:x");\n\t\t\trbuggyQSA.push(",.*:");\n\t\t});\n\t}\n\n\tif ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||\n\t\tdocElem.webkitMatchesSelector ||\n\t\tdocElem.mozMatchesSelector ||\n\t\tdocElem.oMatchesSelector ||\n\t\tdocElem.msMatchesSelector) )) ) {\n\n\t\tassert(function( div ) {\n\t\t\t// Check to see if it\'s possible to do matchesSelector\n\t\t\t// on a disconnected node (IE 9)\n\t\t\tsupport.disconnectedMatch = matches.call( div, "div" );\n\n\t\t\t// This should fail with an exception\n\t\t\t// Gecko does not error, returns false instead\n\t\t\tmatches.call( div, "[s!=\'\']:x" );\n\t\t\trbuggyMatches.push( "!=", pseudos );\n\t\t});\n\t}\n\n\trbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );\n\trbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );\n\n\t/* Contains\n\t---------------------------------------------------------------------- */\n\thasCompare = rnative.test( docElem.compareDocumentPosition );\n\n\t// Element contains another\n\t// Purposefully self-exclusive\n\t// As in, an element does not contain itself\n\tcontains = hasCompare || rnative.test( docElem.contains ) ?\n\t\tfunction( a, b ) {\n\t\t\tvar adown = a.nodeType === 9 ? a.documentElement : a,\n\t\t\t\tbup = b && b.parentNode;\n\t\t\treturn a === bup || !!( bup && bup.nodeType === 1 && (\n\t\t\t\tadown.contains ?\n\t\t\t\t\tadown.contains( bup ) :\n\t\t\t\t\ta.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16\n\t\t\t));\n\t\t} :\n\t\tfunction( a, b ) {\n\t\t\tif ( b ) {\n\t\t\t\twhile ( (b = b.parentNode) ) {\n\t\t\t\t\tif ( b === a ) {\n\t\t\t\t\t\treturn true;\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t\treturn false;\n\t\t};\n\n\t/* Sorting\n\t---------------------------------------------------------------------- */\n\n\t// Document order sorting\n\tsortOrder = hasCompare ?\n\tfunction( a, b ) {\n\n\t\t// Flag for duplicate removal\n\t\tif ( a === b ) {\n\t\t\thasDuplicate = true;\n\t\t\treturn 0;\n\t\t}\n\n\t\t// Sort on method existence if only one input has compareDocumentPosition\n\t\tvar compare = !a.compareDocumentPosition - !b.compareDocumentPosition;\n\t\tif ( compare ) {\n\t\t\treturn compare;\n\t\t}\n\n\t\t// Calculate position if both inputs belong to the same document\n\t\tcompare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?\n\t\t\ta.compareDocumentPosition( b ) :\n\n\t\t\t// Otherwise we know they are disconnected\n\t\t\t1;\n\n\t\t// Disconnected nodes\n\t\tif ( compare & 1 ||\n\t\t\t(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {\n\n\t\t\t// Choose the first element that is related to our preferred document\n\t\t\tif ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {\n\t\t\t\treturn -1;\n\t\t\t}\n\t\t\tif ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {\n\t\t\t\treturn 1;\n\t\t\t}\n\n\t\t\t// Maintain original order\n\t\t\treturn sortInput ?\n\t\t\t\t( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :\n\t\t\t\t0;\n\t\t}\n\n\t\treturn compare & 4 ? -1 : 1;\n\t} :\n\tfunction( a, b ) {\n\t\t// Exit early if the nodes are identical\n\t\tif ( a === b ) {\n\t\t\thasDuplicate = true;\n\t\t\treturn 0;\n\t\t}\n\n\t\tvar cur,\n\t\t\ti = 0,\n\t\t\taup = a.parentNode,\n\t\t\tbup = b.parentNode,\n\t\t\tap = [ a ],\n\t\t\tbp = [ b ];\n\n\t\t// Parentless nodes are either documents or disconnected\n\t\tif ( !aup || !bup ) {\n\t\t\treturn a === document ? -1 :\n\t\t\t\tb === document ? 1 :\n\t\t\t\taup ? -1 :\n\t\t\t\tbup ? 1 :\n\t\t\t\tsortInput ?\n\t\t\t\t( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :\n\t\t\t\t0;\n\n\t\t// If the nodes are siblings, we can do a quick check\n\t\t} else if ( aup === bup ) {\n\t\t\treturn siblingCheck( a, b );\n\t\t}\n\n\t\t// Otherwise we need full lists of their ancestors for comparison\n\t\tcur = a;\n\t\twhile ( (cur = cur.parentNode) ) {\n\t\t\tap.unshift( cur );\n\t\t}\n\t\tcur = b;\n\t\twhile ( (cur = cur.parentNode) ) {\n\t\t\tbp.unshift( cur );\n\t\t}\n\n\t\t// Walk down the tree looking for a discrepancy\n\t\twhile ( ap[i] === bp[i] ) {\n\t\t\ti++;\n\t\t}\n\n\t\treturn i ?\n\t\t\t// Do a sibling check if the nodes have a common ancestor\n\t\t\tsiblingCheck( ap[i], bp[i] ) :\n\n\t\t\t// Otherwise nodes in our document sort first\n\t\t\tap[i] === preferredDoc ? -1 :\n\t\t\tbp[i] === preferredDoc ? 1 :\n\t\t\t0;\n\t};\n\n\treturn document;\n};\n\nSizzle.matches = function( expr, elements ) {\n\treturn Sizzle( expr, null, null, elements );\n};\n\nSizzle.matchesSelector = function( elem, expr ) {\n\t// Set document vars if needed\n\tif ( ( elem.ownerDocument || elem ) !== document ) {\n\t\tsetDocument( elem );\n\t}\n\n\t// Make sure that attribute selectors are quoted\n\texpr = expr.replace( rattributeQuotes, "=\'$1\']" );\n\n\tif ( support.matchesSelector && documentIsHTML &&\n\t\t!compilerCache[ expr + " " ] &&\n\t\t( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&\n\t\t( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {\n\n\t\ttry {\n\t\t\tvar ret = matches.call( elem, expr );\n\n\t\t\t// IE 9\'s matchesSelector returns false on disconnected nodes\n\t\t\tif ( ret || support.disconnectedMatch ||\n\t\t\t\t\t// As well, disconnected nodes are said to be in a document\n\t\t\t\t\t// fragment in IE 9\n\t\t\t\t\telem.document && elem.document.nodeType !== 11 ) {\n\t\t\t\treturn ret;\n\t\t\t}\n\t\t} catch (e) {}\n\t}\n\n\treturn Sizzle( expr, document, null, [ elem ] ).length > 0;\n};\n\nSizzle.contains = function( context, elem ) {\n\t// Set document vars if needed\n\tif ( ( context.ownerDocument || context ) !== document ) {\n\t\tsetDocument( context );\n\t}\n\treturn contains( context, elem );\n};\n\nSizzle.attr = function( elem, name ) {\n\t// Set document vars if needed\n\tif ( ( elem.ownerDocument || elem ) !== document ) {\n\t\tsetDocument( elem );\n\t}\n\n\tvar fn = Expr.attrHandle[ name.toLowerCase() ],\n\t\t// Don\'t get fooled by Object.prototype properties (jQuery #13807)\n\t\tval = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?\n\t\t\tfn( elem, name, !documentIsHTML ) :\n\t\t\tundefined;\n\n\treturn val !== undefined ?\n\t\tval :\n\t\tsupport.attributes || !documentIsHTML ?\n\t\t\telem.getAttribute( name ) :\n\t\t\t(val = elem.getAttributeNode(name)) && val.specified ?\n\t\t\t\tval.value :\n\t\t\t\tnull;\n};\n\nSizzle.error = function( msg ) {\n\tthrow new Error( "Syntax error, unrecognized expression: " + msg );\n};\n\n/**\n * Document sorting and removing duplicates\n * @param {ArrayLike} results\n */\nSizzle.uniqueSort = function( results ) {\n\tvar elem,\n\t\tduplicates = [],\n\t\tj = 0,\n\t\ti = 0;\n\n\t// Unless we *know* we can detect duplicates, assume their presence\n\thasDuplicate = !support.detectDuplicates;\n\tsortInput = !support.sortStable && results.slice( 0 );\n\tresults.sort( sortOrder );\n\n\tif ( hasDuplicate ) {\n\t\twhile ( (elem = results[i++]) ) {\n\t\t\tif ( elem === results[ i ] ) {\n\t\t\t\tj = duplicates.push( i );\n\t\t\t}\n\t\t}\n\t\twhile ( j-- ) {\n\t\t\tresults.splice( duplicates[ j ], 1 );\n\t\t}\n\t}\n\n\t// Clear input after sorting to release objects\n\t// See https://github.com/jquery/sizzle/pull/225\n\tsortInput = null;\n\n\treturn results;\n};\n\n/**\n * Utility function for retrieving the text value of an array of DOM nodes\n * @param {Array|Element} elem\n */\ngetText = Sizzle.getText = function( elem ) {\n\tvar node,\n\t\tret = "",\n\t\ti = 0,\n\t\tnodeType = elem.nodeType;\n\n\tif ( !nodeType ) {\n\t\t// If no nodeType, this is expected to be an array\n\t\twhile ( (node = elem[i++]) ) {\n\t\t\t// Do not traverse comment nodes\n\t\t\tret += getText( node );\n\t\t}\n\t} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {\n\t\t// Use textContent for elements\n\t\t// innerText usage removed for consistency of new lines (jQuery #11153)\n\t\tif ( typeof elem.textContent === "string" ) {\n\t\t\treturn elem.textContent;\n\t\t} else {\n\t\t\t// Traverse its children\n\t\t\tfor ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {\n\t\t\t\tret += getText( elem );\n\t\t\t}\n\t\t}\n\t} else if ( nodeType === 3 || nodeType === 4 ) {\n\t\treturn elem.nodeValue;\n\t}\n\t// Do not include comment or processing instruction nodes\n\n\treturn ret;\n};\n\nExpr = Sizzle.selectors = {\n\n\t// Can be adjusted by the user\n\tcacheLength: 50,\n\n\tcreatePseudo: markFunction,\n\n\tmatch: matchExpr,\n\n\tattrHandle: {},\n\n\tfind: {},\n\n\trelative: {\n\t\t">": { dir: "parentNode", first: true },\n\t\t" ": { dir: "parentNode" },\n\t\t"+": { dir: "previousSibling", first: true },\n\t\t"~": { dir: "previousSibling" }\n\t},\n\n\tpreFilter: {\n\t\t"ATTR": function( match ) {\n\t\t\tmatch[1] = match[1].replace( runescape, funescape );\n\n\t\t\t// Move the given value to match[3] whether quoted or unquoted\n\t\t\tmatch[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );\n\n\t\t\tif ( match[2] === "~=" ) {\n\t\t\t\tmatch[3] = " " + match[3] + " ";\n\t\t\t}\n\n\t\t\treturn match.slice( 0, 4 );\n\t\t},\n\n\t\t"CHILD": function( match ) {\n\t\t\t/* matches from matchExpr["CHILD"]\n\t\t\t\t1 type (only|nth|...)\n\t\t\t\t2 what (child|of-type)\n\t\t\t\t3 argument (even|odd|\\d*|\\d*n([+-]\\d+)?|...)\n\t\t\t\t4 xn-component of xn+y argument ([+-]?\\d*n|)\n\t\t\t\t5 sign of xn-component\n\t\t\t\t6 x of xn-component\n\t\t\t\t7 sign of y-component\n\t\t\t\t8 y of y-component\n\t\t\t*/\n\t\t\tmatch[1] = match[1].toLowerCase();\n\n\t\t\tif ( match[1].slice( 0, 3 ) === "nth" ) {\n\t\t\t\t// nth-* requires argument\n\t\t\t\tif ( !match[3] ) {\n\t\t\t\t\tSizzle.error( match[0] );\n\t\t\t\t}\n\n\t\t\t\t// numeric x and y parameters for Expr.filter.CHILD\n\t\t\t\t// remember that false/true cast respectively to 0/1\n\t\t\t\tmatch[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );\n\t\t\t\tmatch[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );\n\n\t\t\t// other types prohibit arguments\n\t\t\t} else if ( match[3] ) {\n\t\t\t\tSizzle.error( match[0] );\n\t\t\t}\n\n\t\t\treturn match;\n\t\t},\n\n\t\t"PSEUDO": function( match ) {\n\t\t\tvar excess,\n\t\t\t\tunquoted = !match[6] && match[2];\n\n\t\t\tif ( matchExpr["CHILD"].test( match[0] ) ) {\n\t\t\t\treturn null;\n\t\t\t}\n\n\t\t\t// Accept quoted arguments as-is\n\t\t\tif ( match[3] ) {\n\t\t\t\tmatch[2] = match[4] || match[5] || "";\n\n\t\t\t// Strip excess characters from unquoted arguments\n\t\t\t} else if ( unquoted && rpseudo.test( unquoted ) &&\n\t\t\t\t// Get excess from tokenize (recursively)\n\t\t\t\t(excess = tokenize( unquoted, true )) &&\n\t\t\t\t// advance to the next closing parenthesis\n\t\t\t\t(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {\n\n\t\t\t\t// excess is a negative index\n\t\t\t\tmatch[0] = match[0].slice( 0, excess );\n\t\t\t\tmatch[2] = unquoted.slice( 0, excess );\n\t\t\t}\n\n\t\t\t// Return only captures needed by the pseudo filter method (type and argument)\n\t\t\treturn match.slice( 0, 3 );\n\t\t}\n\t},\n\n\tfilter: {\n\n\t\t"TAG": function( nodeNameSelector ) {\n\t\t\tvar nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();\n\t\t\treturn nodeNameSelector === "*" ?\n\t\t\t\tfunction() { return true; } :\n\t\t\t\tfunction( elem ) {\n\t\t\t\t\treturn elem.nodeName && elem.nodeName.toLowerCase() === nodeName;\n\t\t\t\t};\n\t\t},\n\n\t\t"CLASS": function( className ) {\n\t\t\tvar pattern = classCache[ className + " " ];\n\n\t\t\treturn pattern ||\n\t\t\t\t(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&\n\t\t\t\tclassCache( className, function( elem ) {\n\t\t\t\t\treturn pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );\n\t\t\t\t});\n\t\t},\n\n\t\t"ATTR": function( name, operator, check ) {\n\t\t\treturn function( elem ) {\n\t\t\t\tvar result = Sizzle.attr( elem, name );\n\n\t\t\t\tif ( result == null ) {\n\t\t\t\t\treturn operator === "!=";\n\t\t\t\t}\n\t\t\t\tif ( !operator ) {\n\t\t\t\t\treturn true;\n\t\t\t\t}\n\n\t\t\t\tresult += "";\n\n\t\t\t\treturn operator === "=" ? result === check :\n\t\t\t\t\toperator === "!=" ? result !== check :\n\t\t\t\t\toperator === "^=" ? check && result.indexOf( check ) === 0 :\n\t\t\t\t\toperator === "*=" ? check && result.indexOf( check ) > -1 :\n\t\t\t\t\toperator === "$=" ? check && result.slice( -check.length ) === check :\n\t\t\t\t\toperator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :\n\t\t\t\t\toperator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :\n\t\t\t\t\tfalse;\n\t\t\t};\n\t\t},\n\n\t\t"CHILD": function( type, what, argument, first, last ) {\n\t\t\tvar simple = type.slice( 0, 3 ) !== "nth",\n\t\t\t\tforward = type.slice( -4 ) !== "last",\n\t\t\t\tofType = what === "of-type";\n\n\t\t\treturn first === 1 && last === 0 ?\n\n\t\t\t\t// Shortcut for :nth-*(n)\n\t\t\t\tfunction( elem ) {\n\t\t\t\t\treturn !!elem.parentNode;\n\t\t\t\t} :\n\n\t\t\t\tfunction( elem, context, xml ) {\n\t\t\t\t\tvar cache, uniqueCache, outerCache, node, nodeIndex, start,\n\t\t\t\t\t\tdir = simple !== forward ? "nextSibling" : "previousSibling",\n\t\t\t\t\t\tparent = elem.parentNode,\n\t\t\t\t\t\tname = ofType && elem.nodeName.toLowerCase(),\n\t\t\t\t\t\tuseCache = !xml && !ofType,\n\t\t\t\t\t\tdiff = false;\n\n\t\t\t\t\tif ( parent ) {\n\n\t\t\t\t\t\t// :(first|last|only)-(child|of-type)\n\t\t\t\t\t\tif ( simple ) {\n\t\t\t\t\t\t\twhile ( dir ) {\n\t\t\t\t\t\t\t\tnode = elem;\n\t\t\t\t\t\t\t\twhile ( (node = node[ dir ]) ) {\n\t\t\t\t\t\t\t\t\tif ( ofType ?\n\t\t\t\t\t\t\t\t\t\tnode.nodeName.toLowerCase() === name :\n\t\t\t\t\t\t\t\t\t\tnode.nodeType === 1 ) {\n\n\t\t\t\t\t\t\t\t\t\treturn false;\n\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t// Reverse direction for :only-* (if we haven\'t yet done so)\n\t\t\t\t\t\t\t\tstart = dir = type === "only" && !start && "nextSibling";\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\treturn true;\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\tstart = [ forward ? parent.firstChild : parent.lastChild ];\n\n\t\t\t\t\t\t// non-xml :nth-child(...) stores cache data on `parent`\n\t\t\t\t\t\tif ( forward && useCache ) {\n\n\t\t\t\t\t\t\t// Seek `elem` from a previously-cached index\n\n\t\t\t\t\t\t\t// ...in a gzip-friendly way\n\t\t\t\t\t\t\tnode = parent;\n\t\t\t\t\t\t\touterCache = node[ expando ] || (node[ expando ] = {});\n\n\t\t\t\t\t\t\t// Support: IE <9 only\n\t\t\t\t\t\t\t// Defend against cloned attroperties (jQuery gh-1709)\n\t\t\t\t\t\t\tuniqueCache = outerCache[ node.uniqueID ] ||\n\t\t\t\t\t\t\t\t(outerCache[ node.uniqueID ] = {});\n\n\t\t\t\t\t\t\tcache = uniqueCache[ type ] || [];\n\t\t\t\t\t\t\tnodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];\n\t\t\t\t\t\t\tdiff = nodeIndex && cache[ 2 ];\n\t\t\t\t\t\t\tnode = nodeIndex && parent.childNodes[ nodeIndex ];\n\n\t\t\t\t\t\t\twhile ( (node = ++nodeIndex && node && node[ dir ] ||\n\n\t\t\t\t\t\t\t\t// Fallback to seeking `elem` from the start\n\t\t\t\t\t\t\t\t(diff = nodeIndex = 0) || start.pop()) ) {\n\n\t\t\t\t\t\t\t\t// When found, cache indexes on `parent` and break\n\t\t\t\t\t\t\t\tif ( node.nodeType === 1 && ++diff && node === elem ) {\n\t\t\t\t\t\t\t\t\tuniqueCache[ type ] = [ dirruns, nodeIndex, diff ];\n\t\t\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\t// Use previously-cached element index if available\n\t\t\t\t\t\t\tif ( useCache ) {\n\t\t\t\t\t\t\t\t// ...in a gzip-friendly way\n\t\t\t\t\t\t\t\tnode = elem;\n\t\t\t\t\t\t\t\touterCache = node[ expando ] || (node[ expando ] = {});\n\n\t\t\t\t\t\t\t\t// Support: IE <9 only\n\t\t\t\t\t\t\t\t// Defend against cloned attroperties (jQuery gh-1709)\n\t\t\t\t\t\t\t\tuniqueCache = outerCache[ node.uniqueID ] ||\n\t\t\t\t\t\t\t\t\t(outerCache[ node.uniqueID ] = {});\n\n\t\t\t\t\t\t\t\tcache = uniqueCache[ type ] || [];\n\t\t\t\t\t\t\t\tnodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];\n\t\t\t\t\t\t\t\tdiff = nodeIndex;\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t// xml :nth-child(...)\n\t\t\t\t\t\t\t// or :nth-last-child(...) or :nth(-last)?-of-type(...)\n\t\t\t\t\t\t\tif ( diff === false ) {\n\t\t\t\t\t\t\t\t// Use the same loop as above to seek `elem` from the start\n\t\t\t\t\t\t\t\twhile ( (node = ++nodeIndex && node && node[ dir ] ||\n\t\t\t\t\t\t\t\t\t(diff = nodeIndex = 0) || start.pop()) ) {\n\n\t\t\t\t\t\t\t\t\tif ( ( ofType ?\n\t\t\t\t\t\t\t\t\t\tnode.nodeName.toLowerCase() === name :\n\t\t\t\t\t\t\t\t\t\tnode.nodeType === 1 ) &&\n\t\t\t\t\t\t\t\t\t\t++diff ) {\n\n\t\t\t\t\t\t\t\t\t\t// Cache the index of each encountered element\n\t\t\t\t\t\t\t\t\t\tif ( useCache ) {\n\t\t\t\t\t\t\t\t\t\t\touterCache = node[ expando ] || (node[ expando ] = {});\n\n\t\t\t\t\t\t\t\t\t\t\t// Support: IE <9 only\n\t\t\t\t\t\t\t\t\t\t\t// Defend against cloned attroperties (jQuery gh-1709)\n\t\t\t\t\t\t\t\t\t\t\tuniqueCache = outerCache[ node.uniqueID ] ||\n\t\t\t\t\t\t\t\t\t\t\t\t(outerCache[ node.uniqueID ] = {});\n\n\t\t\t\t\t\t\t\t\t\t\tuniqueCache[ type ] = [ dirruns, diff ];\n\t\t\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\t\t\tif ( node === elem ) {\n\t\t\t\t\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\t// Incorporate the offset, then check against cycle size\n\t\t\t\t\t\tdiff -= last;\n\t\t\t\t\t\treturn diff === first || ( diff % first === 0 && diff / first >= 0 );\n\t\t\t\t\t}\n\t\t\t\t};\n\t\t},\n\n\t\t"PSEUDO": function( pseudo, argument ) {\n\t\t\t// pseudo-class names are case-insensitive\n\t\t\t// http://www.w3.org/TR/selectors/#pseudo-classes\n\t\t\t// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters\n\t\t\t// Remember that setFilters inherits from pseudos\n\t\t\tvar args,\n\t\t\t\tfn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||\n\t\t\t\t\tSizzle.error( "unsupported pseudo: " + pseudo );\n\n\t\t\t// The user may use createPseudo to indicate that\n\t\t\t// arguments are needed to create the filter function\n\t\t\t// just as Sizzle does\n\t\t\tif ( fn[ expando ] ) {\n\t\t\t\treturn fn( argument );\n\t\t\t}\n\n\t\t\t// But maintain support for old signatures\n\t\t\tif ( fn.length > 1 ) {\n\t\t\t\targs = [ pseudo, pseudo, "", argument ];\n\t\t\t\treturn Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?\n\t\t\t\t\tmarkFunction(function( seed, matches ) {\n\t\t\t\t\t\tvar idx,\n\t\t\t\t\t\t\tmatched = fn( seed, argument ),\n\t\t\t\t\t\t\ti = matched.length;\n\t\t\t\t\t\twhile ( i-- ) {\n\t\t\t\t\t\t\tidx = indexOf( seed, matched[i] );\n\t\t\t\t\t\t\tseed[ idx ] = !( matches[ idx ] = matched[i] );\n\t\t\t\t\t\t}\n\t\t\t\t\t}) :\n\t\t\t\t\tfunction( elem ) {\n\t\t\t\t\t\treturn fn( elem, 0, args );\n\t\t\t\t\t};\n\t\t\t}\n\n\t\t\treturn fn;\n\t\t}\n\t},\n\n\tpseudos: {\n\t\t// Potentially complex pseudos\n\t\t"not": markFunction(function( selector ) {\n\t\t\t// Trim the selector passed to compile\n\t\t\t// to avoid treating leading and trailing\n\t\t\t// spaces as combinators\n\t\t\tvar input = [],\n\t\t\t\tresults = [],\n\t\t\t\tmatcher = compile( selector.replace( rtrim, "$1" ) );\n\n\t\t\treturn matcher[ expando ] ?\n\t\t\t\tmarkFunction(function( seed, matches, context, xml ) {\n\t\t\t\t\tvar elem,\n\t\t\t\t\t\tunmatched = matcher( seed, null, xml, [] ),\n\t\t\t\t\t\ti = seed.length;\n\n\t\t\t\t\t// Match elements unmatched by `matcher`\n\t\t\t\t\twhile ( i-- ) {\n\t\t\t\t\t\tif ( (elem = unmatched[i]) ) {\n\t\t\t\t\t\t\tseed[i] = !(matches[i] = elem);\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}) :\n\t\t\t\tfunction( elem, context, xml ) {\n\t\t\t\t\tinput[0] = elem;\n\t\t\t\t\tmatcher( input, null, xml, results );\n\t\t\t\t\t// Don\'t keep the element (issue #299)\n\t\t\t\t\tinput[0] = null;\n\t\t\t\t\treturn !results.pop();\n\t\t\t\t};\n\t\t}),\n\n\t\t"has": markFunction(function( selector ) {\n\t\t\treturn function( elem ) {\n\t\t\t\treturn Sizzle( selector, elem ).length > 0;\n\t\t\t};\n\t\t}),\n\n\t\t"contains": markFunction(function( text ) {\n\t\t\ttext = text.replace( runescape, funescape );\n\t\t\treturn function( elem ) {\n\t\t\t\treturn ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;\n\t\t\t};\n\t\t}),\n\n\t\t// "Whether an element is represented by a :lang() selector\n\t\t// is based solely on the element\'s language value\n\t\t// being equal to the identifier C,\n\t\t// or beginning with the identifier C immediately followed by "-".\n\t\t// The matching of C against the element\'s language value is performed case-insensitively.\n\t\t// The identifier C does not have to be a valid language name."\n\t\t// http://www.w3.org/TR/selectors/#lang-pseudo\n\t\t"lang": markFunction( function( lang ) {\n\t\t\t// lang value must be a valid identifier\n\t\t\tif ( !ridentifier.test(lang || "") ) {\n\t\t\t\tSizzle.error( "unsupported lang: " + lang );\n\t\t\t}\n\t\t\tlang = lang.replace( runescape, funescape ).toLowerCase();\n\t\t\treturn function( elem ) {\n\t\t\t\tvar elemLang;\n\t\t\t\tdo {\n\t\t\t\t\tif ( (elemLang = documentIsHTML ?\n\t\t\t\t\t\telem.lang :\n\t\t\t\t\t\telem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {\n\n\t\t\t\t\t\telemLang = elemLang.toLowerCase();\n\t\t\t\t\t\treturn elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;\n\t\t\t\t\t}\n\t\t\t\t} while ( (elem = elem.parentNode) && elem.nodeType === 1 );\n\t\t\t\treturn false;\n\t\t\t};\n\t\t}),\n\n\t\t// Miscellaneous\n\t\t"target": function( elem ) {\n\t\t\tvar hash = window.location && window.location.hash;\n\t\t\treturn hash && hash.slice( 1 ) === elem.id;\n\t\t},\n\n\t\t"root": function( elem ) {\n\t\t\treturn elem === docElem;\n\t\t},\n\n\t\t"focus": function( elem ) {\n\t\t\treturn elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);\n\t\t},\n\n\t\t// Boolean properties\n\t\t"enabled": function( elem ) {\n\t\t\treturn elem.disabled === false;\n\t\t},\n\n\t\t"disabled": function( elem ) {\n\t\t\treturn elem.disabled === true;\n\t\t},\n\n\t\t"checked": function( elem ) {\n\t\t\t// In CSS3, :checked should return both checked and selected elements\n\t\t\t// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked\n\t\t\tvar nodeName = elem.nodeName.toLowerCase();\n\t\t\treturn (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);\n\t\t},\n\n\t\t"selected": function( elem ) {\n\t\t\t// Accessing this property makes selected-by-default\n\t\t\t// options in Safari work properly\n\t\t\tif ( elem.parentNode ) {\n\t\t\t\telem.parentNode.selectedIndex;\n\t\t\t}\n\n\t\t\treturn elem.selected === true;\n\t\t},\n\n\t\t// Contents\n\t\t"empty": function( elem ) {\n\t\t\t// http://www.w3.org/TR/selectors/#empty-pseudo\n\t\t\t// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),\n\t\t\t//   but not by others (comment: 8; processing instruction: 7; etc.)\n\t\t\t// nodeType < 6 works because attributes (2) do not appear as children\n\t\t\tfor ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {\n\t\t\t\tif ( elem.nodeType < 6 ) {\n\t\t\t\t\treturn false;\n\t\t\t\t}\n\t\t\t}\n\t\t\treturn true;\n\t\t},\n\n\t\t"parent": function( elem ) {\n\t\t\treturn !Expr.pseudos["empty"]( elem );\n\t\t},\n\n\t\t// Element/input types\n\t\t"header": function( elem ) {\n\t\t\treturn rheader.test( elem.nodeName );\n\t\t},\n\n\t\t"input": function( elem ) {\n\t\t\treturn rinputs.test( elem.nodeName );\n\t\t},\n\n\t\t"button": function( elem ) {\n\t\t\tvar name = elem.nodeName.toLowerCase();\n\t\t\treturn name === "input" && elem.type === "button" || name === "button";\n\t\t},\n\n\t\t"text": function( elem ) {\n\t\t\tvar attr;\n\t\t\treturn elem.nodeName.toLowerCase() === "input" &&\n\t\t\t\telem.type === "text" &&\n\n\t\t\t\t// Support: IE<8\n\t\t\t\t// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"\n\t\t\t\t( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );\n\t\t},\n\n\t\t// Position-in-collection\n\t\t"first": createPositionalPseudo(function() {\n\t\t\treturn [ 0 ];\n\t\t}),\n\n\t\t"last": createPositionalPseudo(function( matchIndexes, length ) {\n\t\t\treturn [ length - 1 ];\n\t\t}),\n\n\t\t"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {\n\t\t\treturn [ argument < 0 ? argument + length : argument ];\n\t\t}),\n\n\t\t"even": createPositionalPseudo(function( matchIndexes, length ) {\n\t\t\tvar i = 0;\n\t\t\tfor ( ; i < length; i += 2 ) {\n\t\t\t\tmatchIndexes.push( i );\n\t\t\t}\n\t\t\treturn matchIndexes;\n\t\t}),\n\n\t\t"odd": createPositionalPseudo(function( matchIndexes, length ) {\n\t\t\tvar i = 1;\n\t\t\tfor ( ; i < length; i += 2 ) {\n\t\t\t\tmatchIndexes.push( i );\n\t\t\t}\n\t\t\treturn matchIndexes;\n\t\t}),\n\n\t\t"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {\n\t\t\tvar i = argument < 0 ? argument + length : argument;\n\t\t\tfor ( ; --i >= 0; ) {\n\t\t\t\tmatchIndexes.push( i );\n\t\t\t}\n\t\t\treturn matchIndexes;\n\t\t}),\n\n\t\t"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {\n\t\t\tvar i = argument < 0 ? argument + length : argument;\n\t\t\tfor ( ; ++i < length; ) {\n\t\t\t\tmatchIndexes.push( i );\n\t\t\t}\n\t\t\treturn matchIndexes;\n\t\t})\n\t}\n};\n\nExpr.pseudos["nth"] = Expr.pseudos["eq"];\n\n// Add button/input type pseudos\nfor ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {\n\tExpr.pseudos[ i ] = createInputPseudo( i );\n}\nfor ( i in { submit: true, reset: true } ) {\n\tExpr.pseudos[ i ] = createButtonPseudo( i );\n}\n\n// Easy API for creating new setFilters\nfunction setFilters() {}\nsetFilters.prototype = Expr.filters = Expr.pseudos;\nExpr.setFilters = new setFilters();\n\ntokenize = Sizzle.tokenize = function( selector, parseOnly ) {\n\tvar matched, match, tokens, type,\n\t\tsoFar, groups, preFilters,\n\t\tcached = tokenCache[ selector + " " ];\n\n\tif ( cached ) {\n\t\treturn parseOnly ? 0 : cached.slice( 0 );\n\t}\n\n\tsoFar = selector;\n\tgroups = [];\n\tpreFilters = Expr.preFilter;\n\n\twhile ( soFar ) {\n\n\t\t// Comma and first run\n\t\tif ( !matched || (match = rcomma.exec( soFar )) ) {\n\t\t\tif ( match ) {\n\t\t\t\t// Don\'t consume trailing commas as valid\n\t\t\t\tsoFar = soFar.slice( match[0].length ) || soFar;\n\t\t\t}\n\t\t\tgroups.push( (tokens = []) );\n\t\t}\n\n\t\tmatched = false;\n\n\t\t// Combinators\n\t\tif ( (match = rcombinators.exec( soFar )) ) {\n\t\t\tmatched = match.shift();\n\t\t\ttokens.push({\n\t\t\t\tvalue: matched,\n\t\t\t\t// Cast descendant combinators to space\n\t\t\t\ttype: match[0].replace( rtrim, " " )\n\t\t\t});\n\t\t\tsoFar = soFar.slice( matched.length );\n\t\t}\n\n\t\t// Filters\n\t\tfor ( type in Expr.filter ) {\n\t\t\tif ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||\n\t\t\t\t(match = preFilters[ type ]( match ))) ) {\n\t\t\t\tmatched = match.shift();\n\t\t\t\ttokens.push({\n\t\t\t\t\tvalue: matched,\n\t\t\t\t\ttype: type,\n\t\t\t\t\tmatches: match\n\t\t\t\t});\n\t\t\t\tsoFar = soFar.slice( matched.length );\n\t\t\t}\n\t\t}\n\n\t\tif ( !matched ) {\n\t\t\tbreak;\n\t\t}\n\t}\n\n\t// Return the length of the invalid excess\n\t// if we\'re just parsing\n\t// Otherwise, throw an error or return tokens\n\treturn parseOnly ?\n\t\tsoFar.length :\n\t\tsoFar ?\n\t\t\tSizzle.error( selector ) :\n\t\t\t// Cache the tokens\n\t\t\ttokenCache( selector, groups ).slice( 0 );\n};\n\nfunction toSelector( tokens ) {\n\tvar i = 0,\n\t\tlen = tokens.length,\n\t\tselector = "";\n\tfor ( ; i < len; i++ ) {\n\t\tselector += tokens[i].value;\n\t}\n\treturn selector;\n}\n\nfunction addCombinator( matcher, combinator, base ) {\n\tvar dir = combinator.dir,\n\t\tcheckNonElements = base && dir === "parentNode",\n\t\tdoneName = done++;\n\n\treturn combinator.first ?\n\t\t// Check against closest ancestor/preceding element\n\t\tfunction( elem, context, xml ) {\n\t\t\twhile ( (elem = elem[ dir ]) ) {\n\t\t\t\tif ( elem.nodeType === 1 || checkNonElements ) {\n\t\t\t\t\treturn matcher( elem, context, xml );\n\t\t\t\t}\n\t\t\t}\n\t\t} :\n\n\t\t// Check against all ancestor/preceding elements\n\t\tfunction( elem, context, xml ) {\n\t\t\tvar oldCache, uniqueCache, outerCache,\n\t\t\t\tnewCache = [ dirruns, doneName ];\n\n\t\t\t// We can\'t set arbitrary data on XML nodes, so they don\'t benefit from combinator caching\n\t\t\tif ( xml ) {\n\t\t\t\twhile ( (elem = elem[ dir ]) ) {\n\t\t\t\t\tif ( elem.nodeType === 1 || checkNonElements ) {\n\t\t\t\t\t\tif ( matcher( elem, context, xml ) ) {\n\t\t\t\t\t\t\treturn true;\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t} else {\n\t\t\t\twhile ( (elem = elem[ dir ]) ) {\n\t\t\t\t\tif ( elem.nodeType === 1 || checkNonElements ) {\n\t\t\t\t\t\touterCache = elem[ expando ] || (elem[ expando ] = {});\n\n\t\t\t\t\t\t// Support: IE <9 only\n\t\t\t\t\t\t// Defend against cloned attroperties (jQuery gh-1709)\n\t\t\t\t\t\tuniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});\n\n\t\t\t\t\t\tif ( (oldCache = uniqueCache[ dir ]) &&\n\t\t\t\t\t\t\toldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {\n\n\t\t\t\t\t\t\t// Assign to newCache so results back-propagate to previous elements\n\t\t\t\t\t\t\treturn (newCache[ 2 ] = oldCache[ 2 ]);\n\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\t// Reuse newcache so results back-propagate to previous elements\n\t\t\t\t\t\t\tuniqueCache[ dir ] = newCache;\n\n\t\t\t\t\t\t\t// A match means we\'re done; a fail means we have to keep checking\n\t\t\t\t\t\t\tif ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {\n\t\t\t\t\t\t\t\treturn true;\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t};\n}\n\nfunction elementMatcher( matchers ) {\n\treturn matchers.length > 1 ?\n\t\tfunction( elem, context, xml ) {\n\t\t\tvar i = matchers.length;\n\t\t\twhile ( i-- ) {\n\t\t\t\tif ( !matchers[i]( elem, context, xml ) ) {\n\t\t\t\t\treturn false;\n\t\t\t\t}\n\t\t\t}\n\t\t\treturn true;\n\t\t} :\n\t\tmatchers[0];\n}\n\nfunction multipleContexts( selector, contexts, results ) {\n\tvar i = 0,\n\t\tlen = contexts.length;\n\tfor ( ; i < len; i++ ) {\n\t\tSizzle( selector, contexts[i], results );\n\t}\n\treturn results;\n}\n\nfunction condense( unmatched, map, filter, context, xml ) {\n\tvar elem,\n\t\tnewUnmatched = [],\n\t\ti = 0,\n\t\tlen = unmatched.length,\n\t\tmapped = map != null;\n\n\tfor ( ; i < len; i++ ) {\n\t\tif ( (elem = unmatched[i]) ) {\n\t\t\tif ( !filter || filter( elem, context, xml ) ) {\n\t\t\t\tnewUnmatched.push( elem );\n\t\t\t\tif ( mapped ) {\n\t\t\t\t\tmap.push( i );\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n\n\treturn newUnmatched;\n}\n\nfunction setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {\n\tif ( postFilter && !postFilter[ expando ] ) {\n\t\tpostFilter = setMatcher( postFilter );\n\t}\n\tif ( postFinder && !postFinder[ expando ] ) {\n\t\tpostFinder = setMatcher( postFinder, postSelector );\n\t}\n\treturn markFunction(function( seed, results, context, xml ) {\n\t\tvar temp, i, elem,\n\t\t\tpreMap = [],\n\t\t\tpostMap = [],\n\t\t\tpreexisting = results.length,\n\n\t\t\t// Get initial elements from seed or context\n\t\t\telems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),\n\n\t\t\t// Prefilter to get matcher input, preserving a map for seed-results synchronization\n\t\t\tmatcherIn = preFilter && ( seed || !selector ) ?\n\t\t\t\tcondense( elems, preMap, preFilter, context, xml ) :\n\t\t\t\telems,\n\n\t\t\tmatcherOut = matcher ?\n\t\t\t\t// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,\n\t\t\t\tpostFinder || ( seed ? preFilter : preexisting || postFilter ) ?\n\n\t\t\t\t\t// ...intermediate processing is necessary\n\t\t\t\t\t[] :\n\n\t\t\t\t\t// ...otherwise use results directly\n\t\t\t\t\tresults :\n\t\t\t\tmatcherIn;\n\n\t\t// Find primary matches\n\t\tif ( matcher ) {\n\t\t\tmatcher( matcherIn, matcherOut, context, xml );\n\t\t}\n\n\t\t// Apply postFilter\n\t\tif ( postFilter ) {\n\t\t\ttemp = condense( matcherOut, postMap );\n\t\t\tpostFilter( temp, [], context, xml );\n\n\t\t\t// Un-match failing elements by moving them back to matcherIn\n\t\t\ti = temp.length;\n\t\t\twhile ( i-- ) {\n\t\t\t\tif ( (elem = temp[i]) ) {\n\t\t\t\t\tmatcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\n\t\tif ( seed ) {\n\t\t\tif ( postFinder || preFilter ) {\n\t\t\t\tif ( postFinder ) {\n\t\t\t\t\t// Get the final matcherOut by condensing this intermediate into postFinder contexts\n\t\t\t\t\ttemp = [];\n\t\t\t\t\ti = matcherOut.length;\n\t\t\t\t\twhile ( i-- ) {\n\t\t\t\t\t\tif ( (elem = matcherOut[i]) ) {\n\t\t\t\t\t\t\t// Restore matcherIn since elem is not yet a final match\n\t\t\t\t\t\t\ttemp.push( (matcherIn[i] = elem) );\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tpostFinder( null, (matcherOut = []), temp, xml );\n\t\t\t\t}\n\n\t\t\t\t// Move matched elements from seed to results to keep them synchronized\n\t\t\t\ti = matcherOut.length;\n\t\t\t\twhile ( i-- ) {\n\t\t\t\t\tif ( (elem = matcherOut[i]) &&\n\t\t\t\t\t\t(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {\n\n\t\t\t\t\t\tseed[temp] = !(results[temp] = elem);\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\n\t\t// Add elements to results, through postFinder if defined\n\t\t} else {\n\t\t\tmatcherOut = condense(\n\t\t\t\tmatcherOut === results ?\n\t\t\t\t\tmatcherOut.splice( preexisting, matcherOut.length ) :\n\t\t\t\t\tmatcherOut\n\t\t\t);\n\t\t\tif ( postFinder ) {\n\t\t\t\tpostFinder( null, results, matcherOut, xml );\n\t\t\t} else {\n\t\t\t\tpush.apply( results, matcherOut );\n\t\t\t}\n\t\t}\n\t});\n}\n\nfunction matcherFromTokens( tokens ) {\n\tvar checkContext, matcher, j,\n\t\tlen = tokens.length,\n\t\tleadingRelative = Expr.relative[ tokens[0].type ],\n\t\timplicitRelative = leadingRelative || Expr.relative[" "],\n\t\ti = leadingRelative ? 1 : 0,\n\n\t\t// The foundational matcher ensures that elements are reachable from top-level context(s)\n\t\tmatchContext = addCombinator( function( elem ) {\n\t\t\treturn elem === checkContext;\n\t\t}, implicitRelative, true ),\n\t\tmatchAnyContext = addCombinator( function( elem ) {\n\t\t\treturn indexOf( checkContext, elem ) > -1;\n\t\t}, implicitRelative, true ),\n\t\tmatchers = [ function( elem, context, xml ) {\n\t\t\tvar ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (\n\t\t\t\t(checkContext = context).nodeType ?\n\t\t\t\t\tmatchContext( elem, context, xml ) :\n\t\t\t\t\tmatchAnyContext( elem, context, xml ) );\n\t\t\t// Avoid hanging onto element (issue #299)\n\t\t\tcheckContext = null;\n\t\t\treturn ret;\n\t\t} ];\n\n\tfor ( ; i < len; i++ ) {\n\t\tif ( (matcher = Expr.relative[ tokens[i].type ]) ) {\n\t\t\tmatchers = [ addCombinator(elementMatcher( matchers ), matcher) ];\n\t\t} else {\n\t\t\tmatcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );\n\n\t\t\t// Return special upon seeing a positional matcher\n\t\t\tif ( matcher[ expando ] ) {\n\t\t\t\t// Find the next relative operator (if any) for proper handling\n\t\t\t\tj = ++i;\n\t\t\t\tfor ( ; j < len; j++ ) {\n\t\t\t\t\tif ( Expr.relative[ tokens[j].type ] ) {\n\t\t\t\t\t\tbreak;\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\treturn setMatcher(\n\t\t\t\t\ti > 1 && elementMatcher( matchers ),\n\t\t\t\t\ti > 1 && toSelector(\n\t\t\t\t\t\t// If the preceding token was a descendant combinator, insert an implicit any-element `*`\n\t\t\t\t\t\ttokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })\n\t\t\t\t\t).replace( rtrim, "$1" ),\n\t\t\t\t\tmatcher,\n\t\t\t\t\ti < j && matcherFromTokens( tokens.slice( i, j ) ),\n\t\t\t\t\tj < len && matcherFromTokens( (tokens = tokens.slice( j )) ),\n\t\t\t\t\tj < len && toSelector( tokens )\n\t\t\t\t);\n\t\t\t}\n\t\t\tmatchers.push( matcher );\n\t\t}\n\t}\n\n\treturn elementMatcher( matchers );\n}\n\nfunction matcherFromGroupMatchers( elementMatchers, setMatchers ) {\n\tvar bySet = setMatchers.length > 0,\n\t\tbyElement = elementMatchers.length > 0,\n\t\tsuperMatcher = function( seed, context, xml, results, outermost ) {\n\t\t\tvar elem, j, matcher,\n\t\t\t\tmatchedCount = 0,\n\t\t\t\ti = "0",\n\t\t\t\tunmatched = seed && [],\n\t\t\t\tsetMatched = [],\n\t\t\t\tcontextBackup = outermostContext,\n\t\t\t\t// We must always have either seed elements or outermost context\n\t\t\t\telems = seed || byElement && Expr.find["TAG"]( "*", outermost ),\n\t\t\t\t// Use integer dirruns iff this is the outermost matcher\n\t\t\t\tdirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),\n\t\t\t\tlen = elems.length;\n\n\t\t\tif ( outermost ) {\n\t\t\t\toutermostContext = context === document || context || outermost;\n\t\t\t}\n\n\t\t\t// Add elements passing elementMatchers directly to results\n\t\t\t// Support: IE<9, Safari\n\t\t\t// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id\n\t\t\tfor ( ; i !== len && (elem = elems[i]) != null; i++ ) {\n\t\t\t\tif ( byElement && elem ) {\n\t\t\t\t\tj = 0;\n\t\t\t\t\tif ( !context && elem.ownerDocument !== document ) {\n\t\t\t\t\t\tsetDocument( elem );\n\t\t\t\t\t\txml = !documentIsHTML;\n\t\t\t\t\t}\n\t\t\t\t\twhile ( (matcher = elementMatchers[j++]) ) {\n\t\t\t\t\t\tif ( matcher( elem, context || document, xml) ) {\n\t\t\t\t\t\t\tresults.push( elem );\n\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tif ( outermost ) {\n\t\t\t\t\t\tdirruns = dirrunsUnique;\n\t\t\t\t\t}\n\t\t\t\t}\n\n\t\t\t\t// Track unmatched elements for set filters\n\t\t\t\tif ( bySet ) {\n\t\t\t\t\t// They will have gone through all possible matchers\n\t\t\t\t\tif ( (elem = !matcher && elem) ) {\n\t\t\t\t\t\tmatchedCount--;\n\t\t\t\t\t}\n\n\t\t\t\t\t// Lengthen the array for every element, matched or not\n\t\t\t\t\tif ( seed ) {\n\t\t\t\t\t\tunmatched.push( elem );\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\n\t\t\t// `i` is now the count of elements visited above, and adding it to `matchedCount`\n\t\t\t// makes the latter nonnegative.\n\t\t\tmatchedCount += i;\n\n\t\t\t// Apply set filters to unmatched elements\n\t\t\t// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`\n\t\t\t// equals `i`), unless we didn\'t visit _any_ elements in the above loop because we have\n\t\t\t// no element matchers and no seed.\n\t\t\t// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that\n\t\t\t// case, which will result in a "00" `matchedCount` that differs from `i` but is also\n\t\t\t// numerically zero.\n\t\t\tif ( bySet && i !== matchedCount ) {\n\t\t\t\tj = 0;\n\t\t\t\twhile ( (matcher = setMatchers[j++]) ) {\n\t\t\t\t\tmatcher( unmatched, setMatched, context, xml );\n\t\t\t\t}\n\n\t\t\t\tif ( seed ) {\n\t\t\t\t\t// Reintegrate element matches to eliminate the need for sorting\n\t\t\t\t\tif ( matchedCount > 0 ) {\n\t\t\t\t\t\twhile ( i-- ) {\n\t\t\t\t\t\t\tif ( !(unmatched[i] || setMatched[i]) ) {\n\t\t\t\t\t\t\t\tsetMatched[i] = pop.call( results );\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\n\t\t\t\t\t// Discard index placeholder values to get only actual matches\n\t\t\t\t\tsetMatched = condense( setMatched );\n\t\t\t\t}\n\n\t\t\t\t// Add matches to results\n\t\t\t\tpush.apply( results, setMatched );\n\n\t\t\t\t// Seedless set matches succeeding multiple successful matchers stipulate sorting\n\t\t\t\tif ( outermost && !seed && setMatched.length > 0 &&\n\t\t\t\t\t( matchedCount + setMatchers.length ) > 1 ) {\n\n\t\t\t\t\tSizzle.uniqueSort( results );\n\t\t\t\t}\n\t\t\t}\n\n\t\t\t// Override manipulation of globals by nested matchers\n\t\t\tif ( outermost ) {\n\t\t\t\tdirruns = dirrunsUnique;\n\t\t\t\toutermostContext = contextBackup;\n\t\t\t}\n\n\t\t\treturn unmatched;\n\t\t};\n\n\treturn bySet ?\n\t\tmarkFunction( superMatcher ) :\n\t\tsuperMatcher;\n}\n\ncompile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {\n\tvar i,\n\t\tsetMatchers = [],\n\t\telementMatchers = [],\n\t\tcached = compilerCache[ selector + " " ];\n\n\tif ( !cached ) {\n\t\t// Generate a function of recursive functions that can be used to check each element\n\t\tif ( !match ) {\n\t\t\tmatch = tokenize( selector );\n\t\t}\n\t\ti = match.length;\n\t\twhile ( i-- ) {\n\t\t\tcached = matcherFromTokens( match[i] );\n\t\t\tif ( cached[ expando ] ) {\n\t\t\t\tsetMatchers.push( cached );\n\t\t\t} else {\n\t\t\t\telementMatchers.push( cached );\n\t\t\t}\n\t\t}\n\n\t\t// Cache the compiled function\n\t\tcached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );\n\n\t\t// Save selector and tokenization\n\t\tcached.selector = selector;\n\t}\n\treturn cached;\n};\n\n/**\n * A low-level selection function that works with Sizzle\'s compiled\n *  selector functions\n * @param {String|Function} selector A selector or a pre-compiled\n *  selector function built with Sizzle.compile\n * @param {Element} context\n * @param {Array} [results]\n * @param {Array} [seed] A set of elements to match against\n */\nselect = Sizzle.select = function( selector, context, results, seed ) {\n\tvar i, tokens, token, type, find,\n\t\tcompiled = typeof selector === "function" && selector,\n\t\tmatch = !seed && tokenize( (selector = compiled.selector || selector) );\n\n\tresults = results || [];\n\n\t// Try to minimize operations if there is only one selector in the list and no seed\n\t// (the latter of which guarantees us context)\n\tif ( match.length === 1 ) {\n\n\t\t// Reduce context if the leading compound selector is an ID\n\t\ttokens = match[0] = match[0].slice( 0 );\n\t\tif ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&\n\t\t\t\tsupport.getById && context.nodeType === 9 && documentIsHTML &&\n\t\t\t\tExpr.relative[ tokens[1].type ] ) {\n\n\t\t\tcontext = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];\n\t\t\tif ( !context ) {\n\t\t\t\treturn results;\n\n\t\t\t// Precompiled matchers will still verify ancestry, so step up a level\n\t\t\t} else if ( compiled ) {\n\t\t\t\tcontext = context.parentNode;\n\t\t\t}\n\n\t\t\tselector = selector.slice( tokens.shift().value.length );\n\t\t}\n\n\t\t// Fetch a seed set for right-to-left matching\n\t\ti = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;\n\t\twhile ( i-- ) {\n\t\t\ttoken = tokens[i];\n\n\t\t\t// Abort if we hit a combinator\n\t\t\tif ( Expr.relative[ (type = token.type) ] ) {\n\t\t\t\tbreak;\n\t\t\t}\n\t\t\tif ( (find = Expr.find[ type ]) ) {\n\t\t\t\t// Search, expanding context for leading sibling combinators\n\t\t\t\tif ( (seed = find(\n\t\t\t\t\ttoken.matches[0].replace( runescape, funescape ),\n\t\t\t\t\trsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context\n\t\t\t\t)) ) {\n\n\t\t\t\t\t// If seed is empty or no tokens remain, we can return early\n\t\t\t\t\ttokens.splice( i, 1 );\n\t\t\t\t\tselector = seed.length && toSelector( tokens );\n\t\t\t\t\tif ( !selector ) {\n\t\t\t\t\t\tpush.apply( results, seed );\n\t\t\t\t\t\treturn results;\n\t\t\t\t\t}\n\n\t\t\t\t\tbreak;\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n\n\t// Compile and execute a filtering function if one is not provided\n\t// Provide `match` to avoid retokenization if we modified the selector above\n\t( compiled || compile( selector, match ) )(\n\t\tseed,\n\t\tcontext,\n\t\t!documentIsHTML,\n\t\tresults,\n\t\t!context || rsibling.test( selector ) && testContext( context.parentNode ) || context\n\t);\n\treturn results;\n};\n\n// One-time assignments\n\n// Sort stability\nsupport.sortStable = expando.split("").sort( sortOrder ).join("") === expando;\n\n// Support: Chrome 14-35+\n// Always assume duplicates if they aren\'t passed to the comparison function\nsupport.detectDuplicates = !!hasDuplicate;\n\n// Initialize against the default document\nsetDocument();\n\n// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)\n// Detached nodes confoundingly follow *each other*\nsupport.sortDetached = assert(function( div1 ) {\n\t// Should return 1, but returns 4 (following)\n\treturn div1.compareDocumentPosition( document.createElement("div") ) & 1;\n});\n\n// Support: IE<8\n// Prevent attribute/property "interpolation"\n// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx\nif ( !assert(function( div ) {\n\tdiv.innerHTML = "<a href=\'#\'></a>";\n\treturn div.firstChild.getAttribute("href") === "#" ;\n}) ) {\n\taddHandle( "type|href|height|width", function( elem, name, isXML ) {\n\t\tif ( !isXML ) {\n\t\t\treturn elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );\n\t\t}\n\t});\n}\n\n// Support: IE<9\n// Use defaultValue in place of getAttribute("value")\nif ( !support.attributes || !assert(function( div ) {\n\tdiv.innerHTML = "<input/>";\n\tdiv.firstChild.setAttribute( "value", "" );\n\treturn div.firstChild.getAttribute( "value" ) === "";\n}) ) {\n\taddHandle( "value", function( elem, name, isXML ) {\n\t\tif ( !isXML && elem.nodeName.toLowerCase() === "input" ) {\n\t\t\treturn elem.defaultValue;\n\t\t}\n\t});\n}\n\n// Support: IE<9\n// Use getAttributeNode to fetch booleans when getAttribute lies\nif ( !assert(function( div ) {\n\treturn div.getAttribute("disabled") == null;\n}) ) {\n\taddHandle( booleans, function( elem, name, isXML ) {\n\t\tvar val;\n\t\tif ( !isXML ) {\n\t\t\treturn elem[ name ] === true ? name.toLowerCase() :\n\t\t\t\t\t(val = elem.getAttributeNode( name )) && val.specified ?\n\t\t\t\t\tval.value :\n\t\t\t\tnull;\n\t\t}\n\t});\n}\n\nreturn Sizzle;\n\n})( window );\n\n\n\njQuery.find = Sizzle;\njQuery.expr = Sizzle.selectors;\njQuery.expr[ ":" ] = jQuery.expr.pseudos;\njQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;\njQuery.text = Sizzle.getText;\njQuery.isXMLDoc = Sizzle.isXML;\njQuery.contains = Sizzle.contains;\n\n\n\nvar dir = function( elem, dir, until ) {\n\tvar matched = [],\n\t\ttruncate = until !== undefined;\n\n\twhile ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {\n\t\tif ( elem.nodeType === 1 ) {\n\t\t\tif ( truncate && jQuery( elem ).is( until ) ) {\n\t\t\t\tbreak;\n\t\t\t}\n\t\t\tmatched.push( elem );\n\t\t}\n\t}\n\treturn matched;\n};\n\n\nvar siblings = function( n, elem ) {\n\tvar matched = [];\n\n\tfor ( ; n; n = n.nextSibling ) {\n\t\tif ( n.nodeType === 1 && n !== elem ) {\n\t\t\tmatched.push( n );\n\t\t}\n\t}\n\n\treturn matched;\n};\n\n\nvar rneedsContext = jQuery.expr.match.needsContext;\n\nvar rsingleTag = ( /^<([\\w-]+)\\s*\\/?>(?:<\\/\\1>|)$/ );\n\n\n\nvar risSimple = /^.[^:#\\[\\.,]*$/;\n\n// Implement the identical functionality for filter and not\nfunction winnow( elements, qualifier, not ) {\n\tif ( jQuery.isFunction( qualifier ) ) {\n\t\treturn jQuery.grep( elements, function( elem, i ) {\n\t\t\t/* jshint -W018 */\n\t\t\treturn !!qualifier.call( elem, i, elem ) !== not;\n\t\t} );\n\n\t}\n\n\tif ( qualifier.nodeType ) {\n\t\treturn jQuery.grep( elements, function( elem ) {\n\t\t\treturn ( elem === qualifier ) !== not;\n\t\t} );\n\n\t}\n\n\tif ( typeof qualifier === "string" ) {\n\t\tif ( risSimple.test( qualifier ) ) {\n\t\t\treturn jQuery.filter( qualifier, elements, not );\n\t\t}\n\n\t\tqualifier = jQuery.filter( qualifier, elements );\n\t}\n\n\treturn jQuery.grep( elements, function( elem ) {\n\t\treturn ( indexOf.call( qualifier, elem ) > -1 ) !== not;\n\t} );\n}\n\njQuery.filter = function( expr, elems, not ) {\n\tvar elem = elems[ 0 ];\n\n\tif ( not ) {\n\t\texpr = ":not(" + expr + ")";\n\t}\n\n\treturn elems.length === 1 && elem.nodeType === 1 ?\n\t\tjQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :\n\t\tjQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {\n\t\t\treturn elem.nodeType === 1;\n\t\t} ) );\n};\n\njQuery.fn.extend( {\n\tfind: function( selector ) {\n\t\tvar i,\n\t\t\tlen = this.length,\n\t\t\tret = [],\n\t\t\tself = this;\n\n\t\tif ( typeof selector !== "string" ) {\n\t\t\treturn this.pushStack( jQuery( selector ).filter( function() {\n\t\t\t\tfor ( i = 0; i < len; i++ ) {\n\t\t\t\t\tif ( jQuery.contains( self[ i ], this ) ) {\n\t\t\t\t\t\treturn true;\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t} ) );\n\t\t}\n\n\t\tfor ( i = 0; i < len; i++ ) {\n\t\t\tjQuery.find( selector, self[ i ], ret );\n\t\t}\n\n\t\t// Needed because $( selector, context ) becomes $( context ).find( selector )\n\t\tret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );\n\t\tret.selector = this.selector ? this.selector + " " + selector : selector;\n\t\treturn ret;\n\t},\n\tfilter: function( selector ) {\n\t\treturn this.pushStack( winnow( this, selector || [], false ) );\n\t},\n\tnot: function( selector ) {\n\t\treturn this.pushStack( winnow( this, selector || [], true ) );\n\t},\n\tis: function( selector ) {\n\t\treturn !!winnow(\n\t\t\tthis,\n\n\t\t\t// If this is a positional/relative selector, check membership in the returned set\n\t\t\t// so $("p:first").is("p:last") won\'t return true for a doc with two "p".\n\t\t\ttypeof selector === "string" && rneedsContext.test( selector ) ?\n\t\t\t\tjQuery( selector ) :\n\t\t\t\tselector || [],\n\t\t\tfalse\n\t\t).length;\n\t}\n} );\n\n\n// Initialize a jQuery object\n\n\n// A central reference to the root jQuery(document)\nvar rootjQuery,\n\n\t// A simple way to check for HTML strings\n\t// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)\n\t// Strict HTML recognition (#11290: must start with <)\n\trquickExpr = /^(?:\\s*(<[\\w\\W]+>)[^>]*|#([\\w-]*))$/,\n\n\tinit = jQuery.fn.init = function( selector, context, root ) {\n\t\tvar match, elem;\n\n\t\t// HANDLE: $(""), $(null), $(undefined), $(false)\n\t\tif ( !selector ) {\n\t\t\treturn this;\n\t\t}\n\n\t\t// Method init() accepts an alternate rootjQuery\n\t\t// so migrate can support jQuery.sub (gh-2101)\n\t\troot = root || rootjQuery;\n\n\t\t// Handle HTML strings\n\t\tif ( typeof selector === "string" ) {\n\t\t\tif ( selector[ 0 ] === "<" &&\n\t\t\t\tselector[ selector.length - 1 ] === ">" &&\n\t\t\t\tselector.length >= 3 ) {\n\n\t\t\t\t// Assume that strings that start and end with <> are HTML and skip the regex check\n\t\t\t\tmatch = [ null, selector, null ];\n\n\t\t\t} else {\n\t\t\t\tmatch = rquickExpr.exec( selector );\n\t\t\t}\n\n\t\t\t// Match html or make sure no context is specified for #id\n\t\t\tif ( match && ( match[ 1 ] || !context ) ) {\n\n\t\t\t\t// HANDLE: $(html) -> $(array)\n\t\t\t\tif ( match[ 1 ] ) {\n\t\t\t\t\tcontext = context instanceof jQuery ? context[ 0 ] : context;\n\n\t\t\t\t\t// Option to run scripts is true for back-compat\n\t\t\t\t\t// Intentionally let the error be thrown if parseHTML is not present\n\t\t\t\t\tjQuery.merge( this, jQuery.parseHTML(\n\t\t\t\t\t\tmatch[ 1 ],\n\t\t\t\t\t\tcontext && context.nodeType ? context.ownerDocument || context : document,\n\t\t\t\t\t\ttrue\n\t\t\t\t\t) );\n\n\t\t\t\t\t// HANDLE: $(html, props)\n\t\t\t\t\tif ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {\n\t\t\t\t\t\tfor ( match in context ) {\n\n\t\t\t\t\t\t\t// Properties of context are called as methods if possible\n\t\t\t\t\t\t\tif ( jQuery.isFunction( this[ match ] ) ) {\n\t\t\t\t\t\t\t\tthis[ match ]( context[ match ] );\n\n\t\t\t\t\t\t\t// ...and otherwise set as attributes\n\t\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\t\tthis.attr( match, context[ match ] );\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\n\t\t\t\t\treturn this;\n\n\t\t\t\t// HANDLE: $(#id)\n\t\t\t\t} else {\n\t\t\t\t\telem = document.getElementById( match[ 2 ] );\n\n\t\t\t\t\t// Support: Blackberry 4.6\n\t\t\t\t\t// gEBID returns nodes no longer in the document (#6963)\n\t\t\t\t\tif ( elem && elem.parentNode ) {\n\n\t\t\t\t\t\t// Inject the element directly into the jQuery object\n\t\t\t\t\t\tthis.length = 1;\n\t\t\t\t\t\tthis[ 0 ] = elem;\n\t\t\t\t\t}\n\n\t\t\t\t\tthis.context = document;\n\t\t\t\t\tthis.selector = selector;\n\t\t\t\t\treturn this;\n\t\t\t\t}\n\n\t\t\t// HANDLE: $(expr, $(...))\n\t\t\t} else if ( !context || context.jquery ) {\n\t\t\t\treturn ( context || root ).find( selector );\n\n\t\t\t// HANDLE: $(expr, context)\n\t\t\t// (which is just equivalent to: $(context).find(expr)\n\t\t\t} else {\n\t\t\t\treturn this.constructor( context ).find( selector );\n\t\t\t}\n\n\t\t// HANDLE: $(DOMElement)\n\t\t} else if ( selector.nodeType ) {\n\t\t\tthis.context = this[ 0 ] = selector;\n\t\t\tthis.length = 1;\n\t\t\treturn this;\n\n\t\t// HANDLE: $(function)\n\t\t// Shortcut for document ready\n\t\t} else if ( jQuery.isFunction( selector ) ) {\n\t\t\treturn root.ready !== undefined ?\n\t\t\t\troot.ready( selector ) :\n\n\t\t\t\t// Execute immediately if ready is not present\n\t\t\t\tselector( jQuery );\n\t\t}\n\n\t\tif ( selector.selector !== undefined ) {\n\t\t\tthis.selector = selector.selector;\n\t\t\tthis.context = selector.context;\n\t\t}\n\n\t\treturn jQuery.makeArray( selector, this );\n\t};\n\n// Give the init function the jQuery prototype for later instantiation\ninit.prototype = jQuery.fn;\n\n// Initialize central reference\nrootjQuery = jQuery( document );\n\n\nvar rparentsprev = /^(?:parents|prev(?:Until|All))/,\n\n\t// Methods guaranteed to produce a unique set when starting from a unique set\n\tguaranteedUnique = {\n\t\tchildren: true,\n\t\tcontents: true,\n\t\tnext: true,\n\t\tprev: true\n\t};\n\njQuery.fn.extend( {\n\thas: function( target ) {\n\t\tvar targets = jQuery( target, this ),\n\t\t\tl = targets.length;\n\n\t\treturn this.filter( function() {\n\t\t\tvar i = 0;\n\t\t\tfor ( ; i < l; i++ ) {\n\t\t\t\tif ( jQuery.contains( this, targets[ i ] ) ) {\n\t\t\t\t\treturn true;\n\t\t\t\t}\n\t\t\t}\n\t\t} );\n\t},\n\n\tclosest: function( selectors, context ) {\n\t\tvar cur,\n\t\t\ti = 0,\n\t\t\tl = this.length,\n\t\t\tmatched = [],\n\t\t\tpos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?\n\t\t\t\tjQuery( selectors, context || this.context ) :\n\t\t\t\t0;\n\n\t\tfor ( ; i < l; i++ ) {\n\t\t\tfor ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {\n\n\t\t\t\t// Always skip document fragments\n\t\t\t\tif ( cur.nodeType < 11 && ( pos ?\n\t\t\t\t\tpos.index( cur ) > -1 :\n\n\t\t\t\t\t// Don\'t pass non-elements to Sizzle\n\t\t\t\t\tcur.nodeType === 1 &&\n\t\t\t\t\t\tjQuery.find.matchesSelector( cur, selectors ) ) ) {\n\n\t\t\t\t\tmatched.push( cur );\n\t\t\t\t\tbreak;\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\n\t\treturn this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );\n\t},\n\n\t// Determine the position of an element within the set\n\tindex: function( elem ) {\n\n\t\t// No argument, return index in parent\n\t\tif ( !elem ) {\n\t\t\treturn ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;\n\t\t}\n\n\t\t// Index in selector\n\t\tif ( typeof elem === "string" ) {\n\t\t\treturn indexOf.call( jQuery( elem ), this[ 0 ] );\n\t\t}\n\n\t\t// Locate the position of the desired element\n\t\treturn indexOf.call( this,\n\n\t\t\t// If it receives a jQuery object, the first element is used\n\t\t\telem.jquery ? elem[ 0 ] : elem\n\t\t);\n\t},\n\n\tadd: function( selector, context ) {\n\t\treturn this.pushStack(\n\t\t\tjQuery.uniqueSort(\n\t\t\t\tjQuery.merge( this.get(), jQuery( selector, context ) )\n\t\t\t)\n\t\t);\n\t},\n\n\taddBack: function( selector ) {\n\t\treturn this.add( selector == null ?\n\t\t\tthis.prevObject : this.prevObject.filter( selector )\n\t\t);\n\t}\n} );\n\nfunction sibling( cur, dir ) {\n\twhile ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}\n\treturn cur;\n}\n\njQuery.each( {\n\tparent: function( elem ) {\n\t\tvar parent = elem.parentNode;\n\t\treturn parent && parent.nodeType !== 11 ? parent : null;\n\t},\n\tparents: function( elem ) {\n\t\treturn dir( elem, "parentNode" );\n\t},\n\tparentsUntil: function( elem, i, until ) {\n\t\treturn dir( elem, "parentNode", until );\n\t},\n\tnext: function( elem ) {\n\t\treturn sibling( elem, "nextSibling" );\n\t},\n\tprev: function( elem ) {\n\t\treturn sibling( elem, "previousSibling" );\n\t},\n\tnextAll: function( elem ) {\n\t\treturn dir( elem, "nextSibling" );\n\t},\n\tprevAll: function( elem ) {\n\t\treturn dir( elem, "previousSibling" );\n\t},\n\tnextUntil: function( elem, i, until ) {\n\t\treturn dir( elem, "nextSibling", until );\n\t},\n\tprevUntil: function( elem, i, until ) {\n\t\treturn dir( elem, "previousSibling", until );\n\t},\n\tsiblings: function( elem ) {\n\t\treturn siblings( ( elem.parentNode || {} ).firstChild, elem );\n\t},\n\tchildren: function( elem ) {\n\t\treturn siblings( elem.firstChild );\n\t},\n\tcontents: function( elem ) {\n\t\treturn elem.contentDocument || jQuery.merge( [], elem.childNodes );\n\t}\n}, function( name, fn ) {\n\tjQuery.fn[ name ] = function( until, selector ) {\n\t\tvar matched = jQuery.map( this, fn, until );\n\n\t\tif ( name.slice( -5 ) !== "Until" ) {\n\t\t\tselector = until;\n\t\t}\n\n\t\tif ( selector && typeof selector === "string" ) {\n\t\t\tmatched = jQuery.filter( selector, matched );\n\t\t}\n\n\t\tif ( this.length > 1 ) {\n\n\t\t\t// Remove duplicates\n\t\t\tif ( !guaranteedUnique[ name ] ) {\n\t\t\t\tjQuery.uniqueSort( matched );\n\t\t\t}\n\n\t\t\t// Reverse order for parents* and prev-derivatives\n\t\t\tif ( rparentsprev.test( name ) ) {\n\t\t\t\tmatched.reverse();\n\t\t\t}\n\t\t}\n\n\t\treturn this.pushStack( matched );\n\t};\n} );\nvar rnotwhite = ( /\\S+/g );\n\n\n\n// Convert String-formatted options into Object-formatted ones\nfunction createOptions( options ) {\n\tvar object = {};\n\tjQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {\n\t\tobject[ flag ] = true;\n\t} );\n\treturn object;\n}\n\n/*\n * Create a callback list using the following parameters:\n *\n *\toptions: an optional list of space-separated options that will change how\n *\t\t\tthe callback list behaves or a more traditional option object\n *\n * By default a callback list will act like an event callback list and can be\n * "fired" multiple times.\n *\n * Possible options:\n *\n *\tonce:\t\t\twill ensure the callback list can only be fired once (like a Deferred)\n *\n *\tmemory:\t\t\twill keep track of previous values and will call any callback added\n *\t\t\t\t\tafter the list has been fired right away with the latest "memorized"\n *\t\t\t\t\tvalues (like a Deferred)\n *\n *\tunique:\t\t\twill ensure a callback can only be added once (no duplicate in the list)\n *\n *\tstopOnFalse:\tinterrupt callings when a callback returns false\n *\n */\njQuery.Callbacks = function( options ) {\n\n\t// Convert options from String-formatted to Object-formatted if needed\n\t// (we check in cache first)\n\toptions = typeof options === "string" ?\n\t\tcreateOptions( options ) :\n\t\tjQuery.extend( {}, options );\n\n\tvar // Flag to know if list is currently firing\n\t\tfiring,\n\n\t\t// Last fire value for non-forgettable lists\n\t\tmemory,\n\n\t\t// Flag to know if list was already fired\n\t\tfired,\n\n\t\t// Flag to prevent firing\n\t\tlocked,\n\n\t\t// Actual callback list\n\t\tlist = [],\n\n\t\t// Queue of execution data for repeatable lists\n\t\tqueue = [],\n\n\t\t// Index of currently firing callback (modified by add/remove as needed)\n\t\tfiringIndex = -1,\n\n\t\t// Fire callbacks\n\t\tfire = function() {\n\n\t\t\t// Enforce single-firing\n\t\t\tlocked = options.once;\n\n\t\t\t// Execute callbacks for all pending executions,\n\t\t\t// respecting firingIndex overrides and runtime changes\n\t\t\tfired = firing = true;\n\t\t\tfor ( ; queue.length; firingIndex = -1 ) {\n\t\t\t\tmemory = queue.shift();\n\t\t\t\twhile ( ++firingIndex < list.length ) {\n\n\t\t\t\t\t// Run callback and check for early termination\n\t\t\t\t\tif ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&\n\t\t\t\t\t\toptions.stopOnFalse ) {\n\n\t\t\t\t\t\t// Jump to end and forget the data so .add doesn\'t re-fire\n\t\t\t\t\t\tfiringIndex = list.length;\n\t\t\t\t\t\tmemory = false;\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\n\t\t\t// Forget the data if we\'re done with it\n\t\t\tif ( !options.memory ) {\n\t\t\t\tmemory = false;\n\t\t\t}\n\n\t\t\tfiring = false;\n\n\t\t\t// Clean up if we\'re done firing for good\n\t\t\tif ( locked ) {\n\n\t\t\t\t// Keep an empty list if we have data for future add calls\n\t\t\t\tif ( memory ) {\n\t\t\t\t\tlist = [];\n\n\t\t\t\t// Otherwise, this object is spent\n\t\t\t\t} else {\n\t\t\t\t\tlist = "";\n\t\t\t\t}\n\t\t\t}\n\t\t},\n\n\t\t// Actual Callbacks object\n\t\tself = {\n\n\t\t\t// Add a callback or a collection of callbacks to the list\n\t\t\tadd: function() {\n\t\t\t\tif ( list ) {\n\n\t\t\t\t\t// If we have memory from a past run, we should fire after adding\n\t\t\t\t\tif ( memory && !firing ) {\n\t\t\t\t\t\tfiringIndex = list.length - 1;\n\t\t\t\t\t\tqueue.push( memory );\n\t\t\t\t\t}\n\n\t\t\t\t\t( function add( args ) {\n\t\t\t\t\t\tjQuery.each( args, function( _, arg ) {\n\t\t\t\t\t\t\tif ( jQuery.isFunction( arg ) ) {\n\t\t\t\t\t\t\t\tif ( !options.unique || !self.has( arg ) ) {\n\t\t\t\t\t\t\t\t\tlist.push( arg );\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {\n\n\t\t\t\t\t\t\t\t// Inspect recursively\n\t\t\t\t\t\t\t\tadd( arg );\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t} );\n\t\t\t\t\t} )( arguments );\n\n\t\t\t\t\tif ( memory && !firing ) {\n\t\t\t\t\t\tfire();\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\treturn this;\n\t\t\t},\n\n\t\t\t// Remove a callback from the list\n\t\t\tremove: function() {\n\t\t\t\tjQuery.each( arguments, function( _, arg ) {\n\t\t\t\t\tvar index;\n\t\t\t\t\twhile ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {\n\t\t\t\t\t\tlist.splice( index, 1 );\n\n\t\t\t\t\t\t// Handle firing indexes\n\t\t\t\t\t\tif ( index <= firingIndex ) {\n\t\t\t\t\t\t\tfiringIndex--;\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t} );\n\t\t\t\treturn this;\n\t\t\t},\n\n\t\t\t// Check if a given callback is in the list.\n\t\t\t// If no argument is given, return whether or not list has callbacks attached.\n\t\t\thas: function( fn ) {\n\t\t\t\treturn fn ?\n\t\t\t\t\tjQuery.inArray( fn, list ) > -1 :\n\t\t\t\t\tlist.length > 0;\n\t\t\t},\n\n\t\t\t// Remove all callbacks from the list\n\t\t\tempty: function() {\n\t\t\t\tif ( list ) {\n\t\t\t\t\tlist = [];\n\t\t\t\t}\n\t\t\t\treturn this;\n\t\t\t},\n\n\t\t\t// Disable .fire and .add\n\t\t\t// Abort any current/pending executions\n\t\t\t// Clear all callbacks and values\n\t\t\tdisable: function() {\n\t\t\t\tlocked = queue = [];\n\t\t\t\tlist = memory = "";\n\t\t\t\treturn this;\n\t\t\t},\n\t\t\tdisabled: function() {\n\t\t\t\treturn !list;\n\t\t\t},\n\n\t\t\t// Disable .fire\n\t\t\t// Also disable .add unless we have memory (since it would have no effect)\n\t\t\t// Abort any pending executions\n\t\t\tlock: function() {\n\t\t\t\tlocked = queue = [];\n\t\t\t\tif ( !memory ) {\n\t\t\t\t\tlist = memory = "";\n\t\t\t\t}\n\t\t\t\treturn this;\n\t\t\t},\n\t\t\tlocked: function() {\n\t\t\t\treturn !!locked;\n\t\t\t},\n\n\t\t\t// Call all callbacks with the given context and arguments\n\t\t\tfireWith: function( context, args ) {\n\t\t\t\tif ( !locked ) {\n\t\t\t\t\targs = args || [];\n\t\t\t\t\targs = [ context, args.slice ? args.slice() : args ];\n\t\t\t\t\tqueue.push( args );\n\t\t\t\t\tif ( !firing ) {\n\t\t\t\t\t\tfire();\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\treturn this;\n\t\t\t},\n\n\t\t\t// Call all the callbacks with the given arguments\n\t\t\tfire: function() {\n\t\t\t\tself.fireWith( this, arguments );\n\t\t\t\treturn this;\n\t\t\t},\n\n\t\t\t// To know if the callbacks have already been called at least once\n\t\t\tfired: function() {\n\t\t\t\treturn !!fired;\n\t\t\t}\n\t\t};\n\n\treturn self;\n};\n\n\njQuery.extend( {\n\n\tDeferred: function( func ) {\n\t\tvar tuples = [\n\n\t\t\t\t// action, add listener, listener list, final state\n\t\t\t\t[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],\n\t\t\t\t[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],\n\t\t\t\t[ "notify", "progress", jQuery.Callbacks( "memory" ) ]\n\t\t\t],\n\t\t\tstate = "pending",\n\t\t\tpromise = {\n\t\t\t\tstate: function() {\n\t\t\t\t\treturn state;\n\t\t\t\t},\n\t\t\t\talways: function() {\n\t\t\t\t\tdeferred.done( arguments ).fail( arguments );\n\t\t\t\t\treturn this;\n\t\t\t\t},\n\t\t\t\tthen: function( /* fnDone, fnFail, fnProgress */ ) {\n\t\t\t\t\tvar fns = arguments;\n\t\t\t\t\treturn jQuery.Deferred( function( newDefer ) {\n\t\t\t\t\t\tjQuery.each( tuples, function( i, tuple ) {\n\t\t\t\t\t\t\tvar fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];\n\n\t\t\t\t\t\t\t// deferred[ done | fail | progress ] for forwarding actions to newDefer\n\t\t\t\t\t\t\tdeferred[ tuple[ 1 ] ]( function() {\n\t\t\t\t\t\t\t\tvar returned = fn && fn.apply( this, arguments );\n\t\t\t\t\t\t\t\tif ( returned && jQuery.isFunction( returned.promise ) ) {\n\t\t\t\t\t\t\t\t\treturned.promise()\n\t\t\t\t\t\t\t\t\t\t.progress( newDefer.notify )\n\t\t\t\t\t\t\t\t\t\t.done( newDefer.resolve )\n\t\t\t\t\t\t\t\t\t\t.fail( newDefer.reject );\n\t\t\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\t\t\tnewDefer[ tuple[ 0 ] + "With" ](\n\t\t\t\t\t\t\t\t\t\tthis === promise ? newDefer.promise() : this,\n\t\t\t\t\t\t\t\t\t\tfn ? [ returned ] : arguments\n\t\t\t\t\t\t\t\t\t);\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t} );\n\t\t\t\t\t\t} );\n\t\t\t\t\t\tfns = null;\n\t\t\t\t\t} ).promise();\n\t\t\t\t},\n\n\t\t\t\t// Get a promise for this deferred\n\t\t\t\t// If obj is provided, the promise aspect is added to the object\n\t\t\t\tpromise: function( obj ) {\n\t\t\t\t\treturn obj != null ? jQuery.extend( obj, promise ) : promise;\n\t\t\t\t}\n\t\t\t},\n\t\t\tdeferred = {};\n\n\t\t// Keep pipe for back-compat\n\t\tpromise.pipe = promise.then;\n\n\t\t// Add list-specific methods\n\t\tjQuery.each( tuples, function( i, tuple ) {\n\t\t\tvar list = tuple[ 2 ],\n\t\t\t\tstateString = tuple[ 3 ];\n\n\t\t\t// promise[ done | fail | progress ] = list.add\n\t\t\tpromise[ tuple[ 1 ] ] = list.add;\n\n\t\t\t// Handle state\n\t\t\tif ( stateString ) {\n\t\t\t\tlist.add( function() {\n\n\t\t\t\t\t// state = [ resolved | rejected ]\n\t\t\t\t\tstate = stateString;\n\n\t\t\t\t// [ reject_list | resolve_list ].disable; progress_list.lock\n\t\t\t\t}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );\n\t\t\t}\n\n\t\t\t// deferred[ resolve | reject | notify ]\n\t\t\tdeferred[ tuple[ 0 ] ] = function() {\n\t\t\t\tdeferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );\n\t\t\t\treturn this;\n\t\t\t};\n\t\t\tdeferred[ tuple[ 0 ] + "With" ] = list.fireWith;\n\t\t} );\n\n\t\t// Make the deferred a promise\n\t\tpromise.promise( deferred );\n\n\t\t// Call given func if any\n\t\tif ( func ) {\n\t\t\tfunc.call( deferred, deferred );\n\t\t}\n\n\t\t// All done!\n\t\treturn deferred;\n\t},\n\n\t// Deferred helper\n\twhen: function( subordinate /* , ..., subordinateN */ ) {\n\t\tvar i = 0,\n\t\t\tresolveValues = slice.call( arguments ),\n\t\t\tlength = resolveValues.length,\n\n\t\t\t// the count of uncompleted subordinates\n\t\t\tremaining = length !== 1 ||\n\t\t\t\t( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,\n\n\t\t\t// the master Deferred.\n\t\t\t// If resolveValues consist of only a single Deferred, just use that.\n\t\t\tdeferred = remaining === 1 ? subordinate : jQuery.Deferred(),\n\n\t\t\t// Update function for both resolve and progress values\n\t\t\tupdateFunc = function( i, contexts, values ) {\n\t\t\t\treturn function( value ) {\n\t\t\t\t\tcontexts[ i ] = this;\n\t\t\t\t\tvalues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;\n\t\t\t\t\tif ( values === progressValues ) {\n\t\t\t\t\t\tdeferred.notifyWith( contexts, values );\n\t\t\t\t\t} else if ( !( --remaining ) ) {\n\t\t\t\t\t\tdeferred.resolveWith( contexts, values );\n\t\t\t\t\t}\n\t\t\t\t};\n\t\t\t},\n\n\t\t\tprogressValues, progressContexts, resolveContexts;\n\n\t\t// Add listeners to Deferred subordinates; treat others as resolved\n\t\tif ( length > 1 ) {\n\t\t\tprogressValues = new Array( length );\n\t\t\tprogressContexts = new Array( length );\n\t\t\tresolveContexts = new Array( length );\n\t\t\tfor ( ; i < length; i++ ) {\n\t\t\t\tif ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {\n\t\t\t\t\tresolveValues[ i ].promise()\n\t\t\t\t\t\t.progress( updateFunc( i, progressContexts, progressValues ) )\n\t\t\t\t\t\t.done( updateFunc( i, resolveContexts, resolveValues ) )\n\t\t\t\t\t\t.fail( deferred.reject );\n\t\t\t\t} else {\n\t\t\t\t\t--remaining;\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\n\t\t// If we\'re not waiting on anything, resolve the master\n\t\tif ( !remaining ) {\n\t\t\tdeferred.resolveWith( resolveContexts, resolveValues );\n\t\t}\n\n\t\treturn deferred.promise();\n\t}\n} );\n\n\n// The deferred used on DOM ready\nvar readyList;\n\njQuery.fn.ready = function( fn ) {\n\n\t// Add the callback\n\tjQuery.ready.promise().done( fn );\n\n\treturn this;\n};\n\njQuery.extend( {\n\n\t// Is the DOM ready to be used? Set to true once it occurs.\n\tisReady: false,\n\n\t// A counter to track how many items to wait for before\n\t// the ready event fires. See #6781\n\treadyWait: 1,\n\n\t// Hold (or release) the ready event\n\tholdReady: function( hold ) {\n\t\tif ( hold ) {\n\t\t\tjQuery.readyWait++;\n\t\t} else {\n\t\t\tjQuery.ready( true );\n\t\t}\n\t},\n\n\t// Handle when the DOM is ready\n\tready: function( wait ) {\n\n\t\t// Abort if there are pending holds or we\'re already ready\n\t\tif ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {\n\t\t\treturn;\n\t\t}\n\n\t\t// Remember that the DOM is ready\n\t\tjQuery.isReady = true;\n\n\t\t// If a normal DOM Ready event fired, decrement, and wait if need be\n\t\tif ( wait !== true && --jQuery.readyWait > 0 ) {\n\t\t\treturn;\n\t\t}\n\n\t\t// If there are functions bound, to execute\n\t\treadyList.resolveWith( document, [ jQuery ] );\n\n\t\t// Trigger any bound ready events\n\t\tif ( jQuery.fn.triggerHandler ) {\n\t\t\tjQuery( document ).triggerHandler( "ready" );\n\t\t\tjQuery( document ).off( "ready" );\n\t\t}\n\t}\n} );\n\n/**\n * The ready event handler and self cleanup method\n */\nfunction completed() {\n\tdocument.removeEventListener( "DOMContentLoaded", completed );\n\twindow.removeEventListener( "load", completed );\n\tjQuery.ready();\n}\n\njQuery.ready.promise = function( obj ) {\n\tif ( !readyList ) {\n\n\t\treadyList = jQuery.Deferred();\n\n\t\t// Catch cases where $(document).ready() is called\n\t\t// after the browser event has already occurred.\n\t\t// Support: IE9-10 only\n\t\t// Older IE sometimes signals "interactive" too soon\n\t\tif ( document.readyState === "complete" ||\n\t\t\t( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {\n\n\t\t\t// Handle it asynchronously to allow scripts the opportunity to delay ready\n\t\t\twindow.setTimeout( jQuery.ready );\n\n\t\t} else {\n\n\t\t\t// Use the handy event callback\n\t\t\tdocument.addEventListener( "DOMContentLoaded", completed );\n\n\t\t\t// A fallback to window.onload, that will always work\n\t\t\twindow.addEventListener( "load", completed );\n\t\t}\n\t}\n\treturn readyList.promise( obj );\n};\n\n// Kick off the DOM ready check even if the user does not\njQuery.ready.promise();\n\n\n\n\n// Multifunctional method to get and set values of a collection\n// The value/s can optionally be executed if it\'s a function\nvar access = function( elems, fn, key, value, chainable, emptyGet, raw ) {\n\tvar i = 0,\n\t\tlen = elems.length,\n\t\tbulk = key == null;\n\n\t// Sets many values\n\tif ( jQuery.type( key ) === "object" ) {\n\t\tchainable = true;\n\t\tfor ( i in key ) {\n\t\t\taccess( elems, fn, i, key[ i ], true, emptyGet, raw );\n\t\t}\n\n\t// Sets one value\n\t} else if ( value !== undefined ) {\n\t\tchainable = true;\n\n\t\tif ( !jQuery.isFunction( value ) ) {\n\t\t\traw = true;\n\t\t}\n\n\t\tif ( bulk ) {\n\n\t\t\t// Bulk operations run against the entire set\n\t\t\tif ( raw ) {\n\t\t\t\tfn.call( elems, value );\n\t\t\t\tfn = null;\n\n\t\t\t// ...except when executing function values\n\t\t\t} else {\n\t\t\t\tbulk = fn;\n\t\t\t\tfn = function( elem, key, value ) {\n\t\t\t\t\treturn bulk.call( jQuery( elem ), value );\n\t\t\t\t};\n\t\t\t}\n\t\t}\n\n\t\tif ( fn ) {\n\t\t\tfor ( ; i < len; i++ ) {\n\t\t\t\tfn(\n\t\t\t\t\telems[ i ], key, raw ?\n\t\t\t\t\tvalue :\n\t\t\t\t\tvalue.call( elems[ i ], i, fn( elems[ i ], key ) )\n\t\t\t\t);\n\t\t\t}\n\t\t}\n\t}\n\n\treturn chainable ?\n\t\telems :\n\n\t\t// Gets\n\t\tbulk ?\n\t\t\tfn.call( elems ) :\n\t\t\tlen ? fn( elems[ 0 ], key ) : emptyGet;\n};\nvar acceptData = function( owner ) {\n\n\t// Accepts only:\n\t//  - Node\n\t//    - Node.ELEMENT_NODE\n\t//    - Node.DOCUMENT_NODE\n\t//  - Object\n\t//    - Any\n\t/* jshint -W018 */\n\treturn owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );\n};\n\n\n\n\nfunction Data() {\n\tthis.expando = jQuery.expando + Data.uid++;\n}\n\nData.uid = 1;\n\nData.prototype = {\n\n\tregister: function( owner, initial ) {\n\t\tvar value = initial || {};\n\n\t\t// If it is a node unlikely to be stringify-ed or looped over\n\t\t// use plain assignment\n\t\tif ( owner.nodeType ) {\n\t\t\towner[ this.expando ] = value;\n\n\t\t// Otherwise secure it in a non-enumerable, non-writable property\n\t\t// configurability must be true to allow the property to be\n\t\t// deleted with the delete operator\n\t\t} else {\n\t\t\tObject.defineProperty( owner, this.expando, {\n\t\t\t\tvalue: value,\n\t\t\t\twritable: true,\n\t\t\t\tconfigurable: true\n\t\t\t} );\n\t\t}\n\t\treturn owner[ this.expando ];\n\t},\n\tcache: function( owner ) {\n\n\t\t// We can accept data for non-element nodes in modern browsers,\n\t\t// but we should not, see #8335.\n\t\t// Always return an empty object.\n\t\tif ( !acceptData( owner ) ) {\n\t\t\treturn {};\n\t\t}\n\n\t\t// Check if the owner object already has a cache\n\t\tvar value = owner[ this.expando ];\n\n\t\t// If not, create one\n\t\tif ( !value ) {\n\t\t\tvalue = {};\n\n\t\t\t// We can accept data for non-element nodes in modern browsers,\n\t\t\t// but we should not, see #8335.\n\t\t\t// Always return an empty object.\n\t\t\tif ( acceptData( owner ) ) {\n\n\t\t\t\t// If it is a node unlikely to be stringify-ed or looped over\n\t\t\t\t// use plain assignment\n\t\t\t\tif ( owner.nodeType ) {\n\t\t\t\t\towner[ this.expando ] = value;\n\n\t\t\t\t// Otherwise secure it in a non-enumerable property\n\t\t\t\t// configurable must be true to allow the property to be\n\t\t\t\t// deleted when data is removed\n\t\t\t\t} else {\n\t\t\t\t\tObject.defineProperty( owner, this.expando, {\n\t\t\t\t\t\tvalue: value,\n\t\t\t\t\t\tconfigurable: true\n\t\t\t\t\t} );\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\n\t\treturn value;\n\t},\n\tset: function( owner, data, value ) {\n\t\tvar prop,\n\t\t\tcache = this.cache( owner );\n\n\t\t// Handle: [ owner, key, value ] args\n\t\tif ( typeof data === "string" ) {\n\t\t\tcache[ data ] = value;\n\n\t\t// Handle: [ owner, { properties } ] args\n\t\t} else {\n\n\t\t\t// Copy the properties one-by-one to the cache object\n\t\t\tfor ( prop in data ) {\n\t\t\t\tcache[ prop ] = data[ prop ];\n\t\t\t}\n\t\t}\n\t\treturn cache;\n\t},\n\tget: function( owner, key ) {\n\t\treturn key === undefined ?\n\t\t\tthis.cache( owner ) :\n\t\t\towner[ this.expando ] && owner[ this.expando ][ key ];\n\t},\n\taccess: function( owner, key, value ) {\n\t\tvar stored;\n\n\t\t// In cases where either:\n\t\t//\n\t\t//   1. No key was specified\n\t\t//   2. A string key was specified, but no value provided\n\t\t//\n\t\t// Take the "read" path and allow the get method to determine\n\t\t// which value to return, respectively either:\n\t\t//\n\t\t//   1. The entire cache object\n\t\t//   2. The data stored at the key\n\t\t//\n\t\tif ( key === undefined ||\n\t\t\t\t( ( key && typeof key === "string" ) && value === undefined ) ) {\n\n\t\t\tstored = this.get( owner, key );\n\n\t\t\treturn stored !== undefined ?\n\t\t\t\tstored : this.get( owner, jQuery.camelCase( key ) );\n\t\t}\n\n\t\t// When the key is not a string, or both a key and value\n\t\t// are specified, set or extend (existing objects) with either:\n\t\t//\n\t\t//   1. An object of properties\n\t\t//   2. A key and value\n\t\t//\n\t\tthis.set( owner, key, value );\n\n\t\t// Since the "set" path can have two possible entry points\n\t\t// return the expected data based on which path was taken[*]\n\t\treturn value !== undefined ? value : key;\n\t},\n\tremove: function( owner, key ) {\n\t\tvar i, name, camel,\n\t\t\tcache = owner[ this.expando ];\n\n\t\tif ( cache === undefined ) {\n\t\t\treturn;\n\t\t}\n\n\t\tif ( key === undefined ) {\n\t\t\tthis.register( owner );\n\n\t\t} else {\n\n\t\t\t// Support array or space separated string of keys\n\t\t\tif ( jQuery.isArray( key ) ) {\n\n\t\t\t\t// If "name" is an array of keys...\n\t\t\t\t// When data is initially created, via ("key", "val") signature,\n\t\t\t\t// keys will be converted to camelCase.\n\t\t\t\t// Since there is no way to tell _how_ a key was added, remove\n\t\t\t\t// both plain key and camelCase key. #12786\n\t\t\t\t// This will only penalize the array argument path.\n\t\t\t\tname = key.concat( key.map( jQuery.camelCase ) );\n\t\t\t} else {\n\t\t\t\tcamel = jQuery.camelCase( key );\n\n\t\t\t\t// Try the string as a key before any manipulation\n\t\t\t\tif ( key in cache ) {\n\t\t\t\t\tname = [ key, camel ];\n\t\t\t\t} else {\n\n\t\t\t\t\t// If a key with the spaces exists, use it.\n\t\t\t\t\t// Otherwise, create an array by matching non-whitespace\n\t\t\t\t\tname = camel;\n\t\t\t\t\tname = name in cache ?\n\t\t\t\t\t\t[ name ] : ( name.match( rnotwhite ) || [] );\n\t\t\t\t}\n\t\t\t}\n\n\t\t\ti = name.length;\n\n\t\t\twhile ( i-- ) {\n\t\t\t\tdelete cache[ name[ i ] ];\n\t\t\t}\n\t\t}\n\n\t\t// Remove the expando if there\'s no more data\n\t\tif ( key === undefined || jQuery.isEmptyObject( cache ) ) {\n\n\t\t\t// Support: Chrome <= 35-45+\n\t\t\t// Webkit & Blink performance suffers when deleting properties\n\t\t\t// from DOM nodes, so set to undefined instead\n\t\t\t// https://code.google.com/p/chromium/issues/detail?id=378607\n\t\t\tif ( owner.nodeType ) {\n\t\t\t\towner[ this.expando ] = undefined;\n\t\t\t} else {\n\t\t\t\tdelete owner[ this.expando ];\n\t\t\t}\n\t\t}\n\t},\n\thasData: function( owner ) {\n\t\tvar cache = owner[ this.expando ];\n\t\treturn cache !== undefined && !jQuery.isEmptyObject( cache );\n\t}\n};\nvar dataPriv = new Data();\n\nvar dataUser = new Data();\n\n\n\n//\tImplementation Summary\n//\n//\t1. Enforce API surface and semantic compatibility with 1.9.x branch\n//\t2. Improve the module\'s maintainability by reducing the storage\n//\t\tpaths to a single mechanism.\n//\t3. Use the same single mechanism to support "private" and "user" data.\n//\t4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)\n//\t5. Avoid exposing implementation details on user objects (eg. expando properties)\n//\t6. Provide a clear path for implementation upgrade to WeakMap in 2014\n\nvar rbrace = /^(?:\\{[\\w\\W]*\\}|\\[[\\w\\W]*\\])$/,\n\trmultiDash = /[A-Z]/g;\n\nfunction dataAttr( elem, key, data ) {\n\tvar name;\n\n\t// If nothing was found internally, try to fetch any\n\t// data from the HTML5 data-* attribute\n\tif ( data === undefined && elem.nodeType === 1 ) {\n\t\tname = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();\n\t\tdata = elem.getAttribute( name );\n\n\t\tif ( typeof data === "string" ) {\n\t\t\ttry {\n\t\t\t\tdata = data === "true" ? true :\n\t\t\t\t\tdata === "false" ? false :\n\t\t\t\t\tdata === "null" ? null :\n\n\t\t\t\t\t// Only convert to a number if it doesn\'t change the string\n\t\t\t\t\t+data + "" === data ? +data :\n\t\t\t\t\trbrace.test( data ) ? jQuery.parseJSON( data ) :\n\t\t\t\t\tdata;\n\t\t\t} catch ( e ) {}\n\n\t\t\t// Make sure we set the data so it isn\'t changed later\n\t\t\tdataUser.set( elem, key, data );\n\t\t} else {\n\t\t\tdata = undefined;\n\t\t}\n\t}\n\treturn data;\n}\n\njQuery.extend( {\n\thasData: function( elem ) {\n\t\treturn dataUser.hasData( elem ) || dataPriv.hasData( elem );\n\t},\n\n\tdata: function( elem, name, data ) {\n\t\treturn dataUser.access( elem, name, data );\n\t},\n\n\tremoveData: function( elem, name ) {\n\t\tdataUser.remove( elem, name );\n\t},\n\n\t// TODO: Now that all calls to _data and _removeData have been replaced\n\t// with direct calls to dataPriv methods, these can be deprecated.\n\t_data: function( elem, name, data ) {\n\t\treturn dataPriv.access( elem, name, data );\n\t},\n\n\t_removeData: function( elem, name ) {\n\t\tdataPriv.remove( elem, name );\n\t}\n} );\n\njQuery.fn.extend( {\n\tdata: function( key, value ) {\n\t\tvar i, name, data,\n\t\t\telem = this[ 0 ],\n\t\t\tattrs = elem && elem.attributes;\n\n\t\t// Gets all values\n\t\tif ( key === undefined ) {\n\t\t\tif ( this.length ) {\n\t\t\t\tdata = dataUser.get( elem );\n\n\t\t\t\tif ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {\n\t\t\t\t\ti = attrs.length;\n\t\t\t\t\twhile ( i-- ) {\n\n\t\t\t\t\t\t// Support: IE11+\n\t\t\t\t\t\t// The attrs elements can be null (#14894)\n\t\t\t\t\t\tif ( attrs[ i ] ) {\n\t\t\t\t\t\t\tname = attrs[ i ].name;\n\t\t\t\t\t\t\tif ( name.indexOf( "data-" ) === 0 ) {\n\t\t\t\t\t\t\t\tname = jQuery.camelCase( name.slice( 5 ) );\n\t\t\t\t\t\t\t\tdataAttr( elem, name, data[ name ] );\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tdataPriv.set( elem, "hasDataAttrs", true );\n\t\t\t\t}\n\t\t\t}\n\n\t\t\treturn data;\n\t\t}\n\n\t\t// Sets multiple values\n\t\tif ( typeof key === "object" ) {\n\t\t\treturn this.each( function() {\n\t\t\t\tdataUser.set( this, key );\n\t\t\t} );\n\t\t}\n\n\t\treturn access( this, function( value ) {\n\t\t\tvar data, camelKey;\n\n\t\t\t// The calling jQuery object (element matches) is not empty\n\t\t\t// (and therefore has an element appears at this[ 0 ]) and the\n\t\t\t// `value` parameter was not undefined. An empty jQuery object\n\t\t\t// will result in `undefined` for elem = this[ 0 ] which will\n\t\t\t// throw an exception if an attempt to read a data cache is made.\n\t\t\tif ( elem && value === undefined ) {\n\n\t\t\t\t// Attempt to get data from the cache\n\t\t\t\t// with the key as-is\n\t\t\t\tdata = dataUser.get( elem, key ) ||\n\n\t\t\t\t\t// Try to find dashed key if it exists (gh-2779)\n\t\t\t\t\t// This is for 2.2.x only\n\t\t\t\t\tdataUser.get( elem, key.replace( rmultiDash, "-$&" ).toLowerCase() );\n\n\t\t\t\tif ( data !== undefined ) {\n\t\t\t\t\treturn data;\n\t\t\t\t}\n\n\t\t\t\tcamelKey = jQuery.camelCase( key );\n\n\t\t\t\t// Attempt to get data from the cache\n\t\t\t\t// with the key camelized\n\t\t\t\tdata = dataUser.get( elem, camelKey );\n\t\t\t\tif ( data !== undefined ) {\n\t\t\t\t\treturn data;\n\t\t\t\t}\n\n\t\t\t\t// Attempt to "discover" the data in\n\t\t\t\t// HTML5 custom data-* attrs\n\t\t\t\tdata = dataAttr( elem, camelKey, undefined );\n\t\t\t\tif ( data !== undefined ) {\n\t\t\t\t\treturn data;\n\t\t\t\t}\n\n\t\t\t\t// We tried really hard, but the data doesn\'t exist.\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\t// Set the data...\n\t\t\tcamelKey = jQuery.camelCase( key );\n\t\t\tthis.each( function() {\n\n\t\t\t\t// First, attempt to store a copy or reference of any\n\t\t\t\t// data that might\'ve been store with a camelCased key.\n\t\t\t\tvar data = dataUser.get( this, camelKey );\n\n\t\t\t\t// For HTML5 data-* attribute interop, we have to\n\t\t\t\t// store property names with dashes in a camelCase form.\n\t\t\t\t// This might not apply to all properties...*\n\t\t\t\tdataUser.set( this, camelKey, value );\n\n\t\t\t\t// *... In the case of properties that might _actually_\n\t\t\t\t// have dashes, we need to also store a copy of that\n\t\t\t\t// unchanged property.\n\t\t\t\tif ( key.indexOf( "-" ) > -1 && data !== undefined ) {\n\t\t\t\t\tdataUser.set( this, key, value );\n\t\t\t\t}\n\t\t\t} );\n\t\t}, null, value, arguments.length > 1, null, true );\n\t},\n\n\tremoveData: function( key ) {\n\t\treturn this.each( function() {\n\t\t\tdataUser.remove( this, key );\n\t\t} );\n\t}\n} );\n\n\njQuery.extend( {\n\tqueue: function( elem, type, data ) {\n\t\tvar queue;\n\n\t\tif ( elem ) {\n\t\t\ttype = ( type || "fx" ) + "queue";\n\t\t\tqueue = dataPriv.get( elem, type );\n\n\t\t\t// Speed up dequeue by getting out quickly if this is just a lookup\n\t\t\tif ( data ) {\n\t\t\t\tif ( !queue || jQuery.isArray( data ) ) {\n\t\t\t\t\tqueue = dataPriv.access( elem, type, jQuery.makeArray( data ) );\n\t\t\t\t} else {\n\t\t\t\t\tqueue.push( data );\n\t\t\t\t}\n\t\t\t}\n\t\t\treturn queue || [];\n\t\t}\n\t},\n\n\tdequeue: function( elem, type ) {\n\t\ttype = type || "fx";\n\n\t\tvar queue = jQuery.queue( elem, type ),\n\t\t\tstartLength = queue.length,\n\t\t\tfn = queue.shift(),\n\t\t\thooks = jQuery._queueHooks( elem, type ),\n\t\t\tnext = function() {\n\t\t\t\tjQuery.dequeue( elem, type );\n\t\t\t};\n\n\t\t// If the fx queue is dequeued, always remove the progress sentinel\n\t\tif ( fn === "inprogress" ) {\n\t\t\tfn = queue.shift();\n\t\t\tstartLength--;\n\t\t}\n\n\t\tif ( fn ) {\n\n\t\t\t// Add a progress sentinel to prevent the fx queue from being\n\t\t\t// automatically dequeued\n\t\t\tif ( type === "fx" ) {\n\t\t\t\tqueue.unshift( "inprogress" );\n\t\t\t}\n\n\t\t\t// Clear up the last queue stop function\n\t\t\tdelete hooks.stop;\n\t\t\tfn.call( elem, next, hooks );\n\t\t}\n\n\t\tif ( !startLength && hooks ) {\n\t\t\thooks.empty.fire();\n\t\t}\n\t},\n\n\t// Not public - generate a queueHooks object, or return the current one\n\t_queueHooks: function( elem, type ) {\n\t\tvar key = type + "queueHooks";\n\t\treturn dataPriv.get( elem, key ) || dataPriv.access( elem, key, {\n\t\t\tempty: jQuery.Callbacks( "once memory" ).add( function() {\n\t\t\t\tdataPriv.remove( elem, [ type + "queue", key ] );\n\t\t\t} )\n\t\t} );\n\t}\n} );\n\njQuery.fn.extend( {\n\tqueue: function( type, data ) {\n\t\tvar setter = 2;\n\n\t\tif ( typeof type !== "string" ) {\n\t\t\tdata = type;\n\t\t\ttype = "fx";\n\t\t\tsetter--;\n\t\t}\n\n\t\tif ( arguments.length < setter ) {\n\t\t\treturn jQuery.queue( this[ 0 ], type );\n\t\t}\n\n\t\treturn data === undefined ?\n\t\t\tthis :\n\t\t\tthis.each( function() {\n\t\t\t\tvar queue = jQuery.queue( this, type, data );\n\n\t\t\t\t// Ensure a hooks for this queue\n\t\t\t\tjQuery._queueHooks( this, type );\n\n\t\t\t\tif ( type === "fx" && queue[ 0 ] !== "inprogress" ) {\n\t\t\t\t\tjQuery.dequeue( this, type );\n\t\t\t\t}\n\t\t\t} );\n\t},\n\tdequeue: function( type ) {\n\t\treturn this.each( function() {\n\t\t\tjQuery.dequeue( this, type );\n\t\t} );\n\t},\n\tclearQueue: function( type ) {\n\t\treturn this.queue( type || "fx", [] );\n\t},\n\n\t// Get a promise resolved when queues of a certain type\n\t// are emptied (fx is the type by default)\n\tpromise: function( type, obj ) {\n\t\tvar tmp,\n\t\t\tcount = 1,\n\t\t\tdefer = jQuery.Deferred(),\n\t\t\telements = this,\n\t\t\ti = this.length,\n\t\t\tresolve = function() {\n\t\t\t\tif ( !( --count ) ) {\n\t\t\t\t\tdefer.resolveWith( elements, [ elements ] );\n\t\t\t\t}\n\t\t\t};\n\n\t\tif ( typeof type !== "string" ) {\n\t\t\tobj = type;\n\t\t\ttype = undefined;\n\t\t}\n\t\ttype = type || "fx";\n\n\t\twhile ( i-- ) {\n\t\t\ttmp = dataPriv.get( elements[ i ], type + "queueHooks" );\n\t\t\tif ( tmp && tmp.empty ) {\n\t\t\t\tcount++;\n\t\t\t\ttmp.empty.add( resolve );\n\t\t\t}\n\t\t}\n\t\tresolve();\n\t\treturn defer.promise( obj );\n\t}\n} );\nvar pnum = ( /[+-]?(?:\\d*\\.|)\\d+(?:[eE][+-]?\\d+|)/ ).source;\n\nvar rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );\n\n\nvar cssExpand = [ "Top", "Right", "Bottom", "Left" ];\n\nvar isHidden = function( elem, el ) {\n\n\t\t// isHidden might be called from jQuery#filter function;\n\t\t// in that case, element will be second argument\n\t\telem = el || elem;\n\t\treturn jQuery.css( elem, "display" ) === "none" ||\n\t\t\t!jQuery.contains( elem.ownerDocument, elem );\n\t};\n\n\n\nfunction adjustCSS( elem, prop, valueParts, tween ) {\n\tvar adjusted,\n\t\tscale = 1,\n\t\tmaxIterations = 20,\n\t\tcurrentValue = tween ?\n\t\t\tfunction() { return tween.cur(); } :\n\t\t\tfunction() { return jQuery.css( elem, prop, "" ); },\n\t\tinitial = currentValue(),\n\t\tunit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),\n\n\t\t// Starting value computation is required for potential unit mismatches\n\t\tinitialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&\n\t\t\trcssNum.exec( jQuery.css( elem, prop ) );\n\n\tif ( initialInUnit && initialInUnit[ 3 ] !== unit ) {\n\n\t\t// Trust units reported by jQuery.css\n\t\tunit = unit || initialInUnit[ 3 ];\n\n\t\t// Make sure we update the tween properties later on\n\t\tvalueParts = valueParts || [];\n\n\t\t// Iteratively approximate from a nonzero starting point\n\t\tinitialInUnit = +initial || 1;\n\n\t\tdo {\n\n\t\t\t// If previous iteration zeroed out, double until we get *something*.\n\t\t\t// Use string for doubling so we don\'t accidentally see scale as unchanged below\n\t\t\tscale = scale || ".5";\n\n\t\t\t// Adjust and apply\n\t\t\tinitialInUnit = initialInUnit / scale;\n\t\t\tjQuery.style( elem, prop, initialInUnit + unit );\n\n\t\t// Update scale, tolerating zero or NaN from tween.cur()\n\t\t// Break the loop if scale is unchanged or perfect, or if we\'ve just had enough.\n\t\t} while (\n\t\t\tscale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations\n\t\t);\n\t}\n\n\tif ( valueParts ) {\n\t\tinitialInUnit = +initialInUnit || +initial || 0;\n\n\t\t// Apply relative offset (+=/-=) if specified\n\t\tadjusted = valueParts[ 1 ] ?\n\t\t\tinitialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :\n\t\t\t+valueParts[ 2 ];\n\t\tif ( tween ) {\n\t\t\ttween.unit = unit;\n\t\t\ttween.start = initialInUnit;\n\t\t\ttween.end = adjusted;\n\t\t}\n\t}\n\treturn adjusted;\n}\nvar rcheckableType = ( /^(?:checkbox|radio)$/i );\n\nvar rtagName = ( /<([\\w:-]+)/ );\n\nvar rscriptType = ( /^$|\\/(?:java|ecma)script/i );\n\n\n\n// We have to close these tags to support XHTML (#13200)\nvar wrapMap = {\n\n\t// Support: IE9\n\toption: [ 1, "<select multiple=\'multiple\'>", "</select>" ],\n\n\t// XHTML parsers do not magically insert elements in the\n\t// same way that tag soup parsers do. So we cannot shorten\n\t// this by omitting <tbody> or other required elements.\n\tthead: [ 1, "<table>", "</table>" ],\n\tcol: [ 2, "<table><colgroup>", "</colgroup></table>" ],\n\ttr: [ 2, "<table><tbody>", "</tbody></table>" ],\n\ttd: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],\n\n\t_default: [ 0, "", "" ]\n};\n\n// Support: IE9\nwrapMap.optgroup = wrapMap.option;\n\nwrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;\nwrapMap.th = wrapMap.td;\n\n\nfunction getAll( context, tag ) {\n\n\t// Support: IE9-11+\n\t// Use typeof to avoid zero-argument method invocation on host objects (#15151)\n\tvar ret = typeof context.getElementsByTagName !== "undefined" ?\n\t\t\tcontext.getElementsByTagName( tag || "*" ) :\n\t\t\ttypeof context.querySelectorAll !== "undefined" ?\n\t\t\t\tcontext.querySelectorAll( tag || "*" ) :\n\t\t\t[];\n\n\treturn tag === undefined || tag && jQuery.nodeName( context, tag ) ?\n\t\tjQuery.merge( [ context ], ret ) :\n\t\tret;\n}\n\n\n// Mark scripts as having already been evaluated\nfunction setGlobalEval( elems, refElements ) {\n\tvar i = 0,\n\t\tl = elems.length;\n\n\tfor ( ; i < l; i++ ) {\n\t\tdataPriv.set(\n\t\t\telems[ i ],\n\t\t\t"globalEval",\n\t\t\t!refElements || dataPriv.get( refElements[ i ], "globalEval" )\n\t\t);\n\t}\n}\n\n\nvar rhtml = /<|&#?\\w+;/;\n\nfunction buildFragment( elems, context, scripts, selection, ignored ) {\n\tvar elem, tmp, tag, wrap, contains, j,\n\t\tfragment = context.createDocumentFragment(),\n\t\tnodes = [],\n\t\ti = 0,\n\t\tl = elems.length;\n\n\tfor ( ; i < l; i++ ) {\n\t\telem = elems[ i ];\n\n\t\tif ( elem || elem === 0 ) {\n\n\t\t\t// Add nodes directly\n\t\t\tif ( jQuery.type( elem ) === "object" ) {\n\n\t\t\t\t// Support: Android<4.1, PhantomJS<2\n\t\t\t\t// push.apply(_, arraylike) throws on ancient WebKit\n\t\t\t\tjQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );\n\n\t\t\t// Convert non-html into a text node\n\t\t\t} else if ( !rhtml.test( elem ) ) {\n\t\t\t\tnodes.push( context.createTextNode( elem ) );\n\n\t\t\t// Convert html into DOM nodes\n\t\t\t} else {\n\t\t\t\ttmp = tmp || fragment.appendChild( context.createElement( "div" ) );\n\n\t\t\t\t// Deserialize a standard representation\n\t\t\t\ttag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();\n\t\t\t\twrap = wrapMap[ tag ] || wrapMap._default;\n\t\t\t\ttmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];\n\n\t\t\t\t// Descend through wrappers to the right content\n\t\t\t\tj = wrap[ 0 ];\n\t\t\t\twhile ( j-- ) {\n\t\t\t\t\ttmp = tmp.lastChild;\n\t\t\t\t}\n\n\t\t\t\t// Support: Android<4.1, PhantomJS<2\n\t\t\t\t// push.apply(_, arraylike) throws on ancient WebKit\n\t\t\t\tjQuery.merge( nodes, tmp.childNodes );\n\n\t\t\t\t// Remember the top-level container\n\t\t\t\ttmp = fragment.firstChild;\n\n\t\t\t\t// Ensure the created nodes are orphaned (#12392)\n\t\t\t\ttmp.textContent = "";\n\t\t\t}\n\t\t}\n\t}\n\n\t// Remove wrapper from fragment\n\tfragment.textContent = "";\n\n\ti = 0;\n\twhile ( ( elem = nodes[ i++ ] ) ) {\n\n\t\t// Skip elements already in the context collection (trac-4087)\n\t\tif ( selection && jQuery.inArray( elem, selection ) > -1 ) {\n\t\t\tif ( ignored ) {\n\t\t\t\tignored.push( elem );\n\t\t\t}\n\t\t\tcontinue;\n\t\t}\n\n\t\tcontains = jQuery.contains( elem.ownerDocument, elem );\n\n\t\t// Append to fragment\n\t\ttmp = getAll( fragment.appendChild( elem ), "script" );\n\n\t\t// Preserve script evaluation history\n\t\tif ( contains ) {\n\t\t\tsetGlobalEval( tmp );\n\t\t}\n\n\t\t// Capture executables\n\t\tif ( scripts ) {\n\t\t\tj = 0;\n\t\t\twhile ( ( elem = tmp[ j++ ] ) ) {\n\t\t\t\tif ( rscriptType.test( elem.type || "" ) ) {\n\t\t\t\t\tscripts.push( elem );\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n\n\treturn fragment;\n}\n\n\n( function() {\n\tvar fragment = document.createDocumentFragment(),\n\t\tdiv = fragment.appendChild( document.createElement( "div" ) ),\n\t\tinput = document.createElement( "input" );\n\n\t// Support: Android 4.0-4.3, Safari<=5.1\n\t// Check state lost if the name is set (#11217)\n\t// Support: Windows Web Apps (WWA)\n\t// `name` and `type` must use .setAttribute for WWA (#14901)\n\tinput.setAttribute( "type", "radio" );\n\tinput.setAttribute( "checked", "checked" );\n\tinput.setAttribute( "name", "t" );\n\n\tdiv.appendChild( input );\n\n\t// Support: Safari<=5.1, Android<4.2\n\t// Older WebKit doesn\'t clone checked state correctly in fragments\n\tsupport.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;\n\n\t// Support: IE<=11+\n\t// Make sure textarea (and checkbox) defaultValue is properly cloned\n\tdiv.innerHTML = "<textarea>x</textarea>";\n\tsupport.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;\n} )();\n\n\nvar\n\trkeyEvent = /^key/,\n\trmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,\n\trtypenamespace = /^([^.]*)(?:\\.(.+)|)/;\n\nfunction returnTrue() {\n\treturn true;\n}\n\nfunction returnFalse() {\n\treturn false;\n}\n\n// Support: IE9\n// See #13393 for more info\nfunction safeActiveElement() {\n\ttry {\n\t\treturn document.activeElement;\n\t} catch ( err ) { }\n}\n\nfunction on( elem, types, selector, data, fn, one ) {\n\tvar origFn, type;\n\n\t// Types can be a map of types/handlers\n\tif ( typeof types === "object" ) {\n\n\t\t// ( types-Object, selector, data )\n\t\tif ( typeof selector !== "string" ) {\n\n\t\t\t// ( types-Object, data )\n\t\t\tdata = data || selector;\n\t\t\tselector = undefined;\n\t\t}\n\t\tfor ( type in types ) {\n\t\t\ton( elem, type, selector, data, types[ type ], one );\n\t\t}\n\t\treturn elem;\n\t}\n\n\tif ( data == null && fn == null ) {\n\n\t\t// ( types, fn )\n\t\tfn = selector;\n\t\tdata = selector = undefined;\n\t} else if ( fn == null ) {\n\t\tif ( typeof selector === "string" ) {\n\n\t\t\t// ( types, selector, fn )\n\t\t\tfn = data;\n\t\t\tdata = undefined;\n\t\t} else {\n\n\t\t\t// ( types, data, fn )\n\t\t\tfn = data;\n\t\t\tdata = selector;\n\t\t\tselector = undefined;\n\t\t}\n\t}\n\tif ( fn === false ) {\n\t\tfn = returnFalse;\n\t} else if ( !fn ) {\n\t\treturn elem;\n\t}\n\n\tif ( one === 1 ) {\n\t\torigFn = fn;\n\t\tfn = function( event ) {\n\n\t\t\t// Can use an empty set, since event contains the info\n\t\t\tjQuery().off( event );\n\t\t\treturn origFn.apply( this, arguments );\n\t\t};\n\n\t\t// Use same guid so caller can remove using origFn\n\t\tfn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );\n\t}\n\treturn elem.each( function() {\n\t\tjQuery.event.add( this, types, fn, data, selector );\n\t} );\n}\n\n/*\n * Helper functions for managing events -- not part of the public interface.\n * Props to Dean Edwards\' addEvent library for many of the ideas.\n */\njQuery.event = {\n\n\tglobal: {},\n\n\tadd: function( elem, types, handler, data, selector ) {\n\n\t\tvar handleObjIn, eventHandle, tmp,\n\t\t\tevents, t, handleObj,\n\t\t\tspecial, handlers, type, namespaces, origType,\n\t\t\telemData = dataPriv.get( elem );\n\n\t\t// Don\'t attach events to noData or text/comment nodes (but allow plain objects)\n\t\tif ( !elemData ) {\n\t\t\treturn;\n\t\t}\n\n\t\t// Caller can pass in an object of custom data in lieu of the handler\n\t\tif ( handler.handler ) {\n\t\t\thandleObjIn = handler;\n\t\t\thandler = handleObjIn.handler;\n\t\t\tselector = handleObjIn.selector;\n\t\t}\n\n\t\t// Make sure that the handler has a unique ID, used to find/remove it later\n\t\tif ( !handler.guid ) {\n\t\t\thandler.guid = jQuery.guid++;\n\t\t}\n\n\t\t// Init the element\'s event structure and main handler, if this is the first\n\t\tif ( !( events = elemData.events ) ) {\n\t\t\tevents = elemData.events = {};\n\t\t}\n\t\tif ( !( eventHandle = elemData.handle ) ) {\n\t\t\teventHandle = elemData.handle = function( e ) {\n\n\t\t\t\t// Discard the second event of a jQuery.event.trigger() and\n\t\t\t\t// when an event is called after a page has unloaded\n\t\t\t\treturn typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?\n\t\t\t\t\tjQuery.event.dispatch.apply( elem, arguments ) : undefined;\n\t\t\t};\n\t\t}\n\n\t\t// Handle multiple events separated by a space\n\t\ttypes = ( types || "" ).match( rnotwhite ) || [ "" ];\n\t\tt = types.length;\n\t\twhile ( t-- ) {\n\t\t\ttmp = rtypenamespace.exec( types[ t ] ) || [];\n\t\t\ttype = origType = tmp[ 1 ];\n\t\t\tnamespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();\n\n\t\t\t// There *must* be a type, no attaching namespace-only handlers\n\t\t\tif ( !type ) {\n\t\t\t\tcontinue;\n\t\t\t}\n\n\t\t\t// If event changes its type, use the special event handlers for the changed type\n\t\t\tspecial = jQuery.event.special[ type ] || {};\n\n\t\t\t// If selector defined, determine special event api type, otherwise given type\n\t\t\ttype = ( selector ? special.delegateType : special.bindType ) || type;\n\n\t\t\t// Update special based on newly reset type\n\t\t\tspecial = jQuery.event.special[ type ] || {};\n\n\t\t\t// handleObj is passed to all event handlers\n\t\t\thandleObj = jQuery.extend( {\n\t\t\t\ttype: type,\n\t\t\t\torigType: origType,\n\t\t\t\tdata: data,\n\t\t\t\thandler: handler,\n\t\t\t\tguid: handler.guid,\n\t\t\t\tselector: selector,\n\t\t\t\tneedsContext: selector && jQuery.expr.match.needsContext.test( selector ),\n\t\t\t\tnamespace: namespaces.join( "." )\n\t\t\t}, handleObjIn );\n\n\t\t\t// Init the event handler queue if we\'re the first\n\t\t\tif ( !( handlers = events[ type ] ) ) {\n\t\t\t\thandlers = events[ type ] = [];\n\t\t\t\thandlers.delegateCount = 0;\n\n\t\t\t\t// Only use addEventListener if the special events handler returns false\n\t\t\t\tif ( !special.setup ||\n\t\t\t\t\tspecial.setup.call( elem, data, namespaces, eventHandle ) === false ) {\n\n\t\t\t\t\tif ( elem.addEventListener ) {\n\t\t\t\t\t\telem.addEventListener( type, eventHandle );\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\n\t\t\tif ( special.add ) {\n\t\t\t\tspecial.add.call( elem, handleObj );\n\n\t\t\t\tif ( !handleObj.handler.guid ) {\n\t\t\t\t\thandleObj.handler.guid = handler.guid;\n\t\t\t\t}\n\t\t\t}\n\n\t\t\t// Add to the element\'s handler list, delegates in front\n\t\t\tif ( selector ) {\n\t\t\t\thandlers.splice( handlers.delegateCount++, 0, handleObj );\n\t\t\t} else {\n\t\t\t\thandlers.push( handleObj );\n\t\t\t}\n\n\t\t\t// Keep track of which events have ever been used, for event optimization\n\t\t\tjQuery.event.global[ type ] = true;\n\t\t}\n\n\t},\n\n\t// Detach an event or set of events from an element\n\tremove: function( elem, types, handler, selector, mappedTypes ) {\n\n\t\tvar j, origCount, tmp,\n\t\t\tevents, t, handleObj,\n\t\t\tspecial, handlers, type, namespaces, origType,\n\t\t\telemData = dataPriv.hasData( elem ) && dataPriv.get( elem );\n\n\t\tif ( !elemData || !( events = elemData.events ) ) {\n\t\t\treturn;\n\t\t}\n\n\t\t// Once for each type.namespace in types; type may be omitted\n\t\ttypes = ( types || "" ).match( rnotwhite ) || [ "" ];\n\t\tt = types.length;\n\t\twhile ( t-- ) {\n\t\t\ttmp = rtypenamespace.exec( types[ t ] ) || [];\n\t\t\ttype = origType = tmp[ 1 ];\n\t\t\tnamespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();\n\n\t\t\t// Unbind all events (on this namespace, if provided) for the element\n\t\t\tif ( !type ) {\n\t\t\t\tfor ( type in events ) {\n\t\t\t\t\tjQuery.event.remove( elem, type + types[ t ], handler, selector, true );\n\t\t\t\t}\n\t\t\t\tcontinue;\n\t\t\t}\n\n\t\t\tspecial = jQuery.event.special[ type ] || {};\n\t\t\ttype = ( selector ? special.delegateType : special.bindType ) || type;\n\t\t\thandlers = events[ type ] || [];\n\t\t\ttmp = tmp[ 2 ] &&\n\t\t\t\tnew RegExp( "(^|\\\\.)" + namespaces.join( "\\\\.(?:.*\\\\.|)" ) + "(\\\\.|$)" );\n\n\t\t\t// Remove matching events\n\t\t\torigCount = j = handlers.length;\n\t\t\twhile ( j-- ) {\n\t\t\t\thandleObj = handlers[ j ];\n\n\t\t\t\tif ( ( mappedTypes || origType === handleObj.origType ) &&\n\t\t\t\t\t( !handler || handler.guid === handleObj.guid ) &&\n\t\t\t\t\t( !tmp || tmp.test( handleObj.namespace ) ) &&\n\t\t\t\t\t( !selector || selector === handleObj.selector ||\n\t\t\t\t\t\tselector === "**" && handleObj.selector ) ) {\n\t\t\t\t\thandlers.splice( j, 1 );\n\n\t\t\t\t\tif ( handleObj.selector ) {\n\t\t\t\t\t\thandlers.delegateCount--;\n\t\t\t\t\t}\n\t\t\t\t\tif ( special.remove ) {\n\t\t\t\t\t\tspecial.remove.call( elem, handleObj );\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\n\t\t\t// Remove generic event handler if we removed something and no more handlers exist\n\t\t\t// (avoids potential for endless recursion during removal of special event handlers)\n\t\t\tif ( origCount && !handlers.length ) {\n\t\t\t\tif ( !special.teardown ||\n\t\t\t\t\tspecial.teardown.call( elem, namespaces, elemData.handle ) === false ) {\n\n\t\t\t\t\tjQuery.removeEvent( elem, type, elemData.handle );\n\t\t\t\t}\n\n\t\t\t\tdelete events[ type ];\n\t\t\t}\n\t\t}\n\n\t\t// Remove data and the expando if it\'s no longer used\n\t\tif ( jQuery.isEmptyObject( events ) ) {\n\t\t\tdataPriv.remove( elem, "handle events" );\n\t\t}\n\t},\n\n\tdispatch: function( event ) {\n\n\t\t// Make a writable jQuery.Event from the native event object\n\t\tevent = jQuery.event.fix( event );\n\n\t\tvar i, j, ret, matched, handleObj,\n\t\t\thandlerQueue = [],\n\t\t\targs = slice.call( arguments ),\n\t\t\thandlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],\n\t\t\tspecial = jQuery.event.special[ event.type ] || {};\n\n\t\t// Use the fix-ed jQuery.Event rather than the (read-only) native event\n\t\targs[ 0 ] = event;\n\t\tevent.delegateTarget = this;\n\n\t\t// Call the preDispatch hook for the mapped type, and let it bail if desired\n\t\tif ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {\n\t\t\treturn;\n\t\t}\n\n\t\t// Determine handlers\n\t\thandlerQueue = jQuery.event.handlers.call( this, event, handlers );\n\n\t\t// Run delegates first; they may want to stop propagation beneath us\n\t\ti = 0;\n\t\twhile ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {\n\t\t\tevent.currentTarget = matched.elem;\n\n\t\t\tj = 0;\n\t\t\twhile ( ( handleObj = matched.handlers[ j++ ] ) &&\n\t\t\t\t!event.isImmediatePropagationStopped() ) {\n\n\t\t\t\t// Triggered event must either 1) have no namespace, or 2) have namespace(s)\n\t\t\t\t// a subset or equal to those in the bound event (both can have no namespace).\n\t\t\t\tif ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {\n\n\t\t\t\t\tevent.handleObj = handleObj;\n\t\t\t\t\tevent.data = handleObj.data;\n\n\t\t\t\t\tret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||\n\t\t\t\t\t\thandleObj.handler ).apply( matched.elem, args );\n\n\t\t\t\t\tif ( ret !== undefined ) {\n\t\t\t\t\t\tif ( ( event.result = ret ) === false ) {\n\t\t\t\t\t\t\tevent.preventDefault();\n\t\t\t\t\t\t\tevent.stopPropagation();\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\n\t\t// Call the postDispatch hook for the mapped type\n\t\tif ( special.postDispatch ) {\n\t\t\tspecial.postDispatch.call( this, event );\n\t\t}\n\n\t\treturn event.result;\n\t},\n\n\thandlers: function( event, handlers ) {\n\t\tvar i, matches, sel, handleObj,\n\t\t\thandlerQueue = [],\n\t\t\tdelegateCount = handlers.delegateCount,\n\t\t\tcur = event.target;\n\n\t\t// Support (at least): Chrome, IE9\n\t\t// Find delegate handlers\n\t\t// Black-hole SVG <use> instance trees (#13180)\n\t\t//\n\t\t// Support: Firefox<=42+\n\t\t// Avoid non-left-click in FF but don\'t block IE radio events (#3861, gh-2343)\n\t\tif ( delegateCount && cur.nodeType &&\n\t\t\t( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {\n\n\t\t\tfor ( ; cur !== this; cur = cur.parentNode || this ) {\n\n\t\t\t\t// Don\'t check non-elements (#13208)\n\t\t\t\t// Don\'t process clicks on disabled elements (#6911, #8165, #11382, #11764)\n\t\t\t\tif ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {\n\t\t\t\t\tmatches = [];\n\t\t\t\t\tfor ( i = 0; i < delegateCount; i++ ) {\n\t\t\t\t\t\thandleObj = handlers[ i ];\n\n\t\t\t\t\t\t// Don\'t conflict with Object.prototype properties (#13203)\n\t\t\t\t\t\tsel = handleObj.selector + " ";\n\n\t\t\t\t\t\tif ( matches[ sel ] === undefined ) {\n\t\t\t\t\t\t\tmatches[ sel ] = handleObj.needsContext ?\n\t\t\t\t\t\t\t\tjQuery( sel, this ).index( cur ) > -1 :\n\t\t\t\t\t\t\t\tjQuery.find( sel, this, null, [ cur ] ).length;\n\t\t\t\t\t\t}\n\t\t\t\t\t\tif ( matches[ sel ] ) {\n\t\t\t\t\t\t\tmatches.push( handleObj );\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tif ( matches.length ) {\n\t\t\t\t\t\thandlerQueue.push( { elem: cur, handlers: matches } );\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\n\t\t// Add the remaining (directly-bound) handlers\n\t\tif ( delegateCount < handlers.length ) {\n\t\t\thandlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );\n\t\t}\n\n\t\treturn handlerQueue;\n\t},\n\n\t// Includes some event props shared by KeyEvent and MouseEvent\n\tprops: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +\n\t\t"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),\n\n\tfixHooks: {},\n\n\tkeyHooks: {\n\t\tprops: "char charCode key keyCode".split( " " ),\n\t\tfilter: function( event, original ) {\n\n\t\t\t// Add which for key events\n\t\t\tif ( event.which == null ) {\n\t\t\t\tevent.which = original.charCode != null ? original.charCode : original.keyCode;\n\t\t\t}\n\n\t\t\treturn event;\n\t\t}\n\t},\n\n\tmouseHooks: {\n\t\tprops: ( "button buttons clientX clientY offsetX offsetY pageX pageY " +\n\t\t\t"screenX screenY toElement" ).split( " " ),\n\t\tfilter: function( event, original ) {\n\t\t\tvar eventDoc, doc, body,\n\t\t\t\tbutton = original.button;\n\n\t\t\t// Calculate pageX/Y if missing and clientX/Y available\n\t\t\tif ( event.pageX == null && original.clientX != null ) {\n\t\t\t\teventDoc = event.target.ownerDocument || document;\n\t\t\t\tdoc = eventDoc.documentElement;\n\t\t\t\tbody = eventDoc.body;\n\n\t\t\t\tevent.pageX = original.clientX +\n\t\t\t\t\t( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -\n\t\t\t\t\t( doc && doc.clientLeft || body && body.clientLeft || 0 );\n\t\t\t\tevent.pageY = original.clientY +\n\t\t\t\t\t( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -\n\t\t\t\t\t( doc && doc.clientTop  || body && body.clientTop  || 0 );\n\t\t\t}\n\n\t\t\t// Add which for click: 1 === left; 2 === middle; 3 === right\n\t\t\t// Note: button is not normalized, so don\'t use it\n\t\t\tif ( !event.which && button !== undefined ) {\n\t\t\t\tevent.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );\n\t\t\t}\n\n\t\t\treturn event;\n\t\t}\n\t},\n\n\tfix: function( event ) {\n\t\tif ( event[ jQuery.expando ] ) {\n\t\t\treturn event;\n\t\t}\n\n\t\t// Create a writable copy of the event object and normalize some properties\n\t\tvar i, prop, copy,\n\t\t\ttype = event.type,\n\t\t\toriginalEvent = event,\n\t\t\tfixHook = this.fixHooks[ type ];\n\n\t\tif ( !fixHook ) {\n\t\t\tthis.fixHooks[ type ] = fixHook =\n\t\t\t\trmouseEvent.test( type ) ? this.mouseHooks :\n\t\t\t\trkeyEvent.test( type ) ? this.keyHooks :\n\t\t\t\t{};\n\t\t}\n\t\tcopy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;\n\n\t\tevent = new jQuery.Event( originalEvent );\n\n\t\ti = copy.length;\n\t\twhile ( i-- ) {\n\t\t\tprop = copy[ i ];\n\t\t\tevent[ prop ] = originalEvent[ prop ];\n\t\t}\n\n\t\t// Support: Cordova 2.5 (WebKit) (#13255)\n\t\t// All events should have a target; Cordova deviceready doesn\'t\n\t\tif ( !event.target ) {\n\t\t\tevent.target = document;\n\t\t}\n\n\t\t// Support: Safari 6.0+, Chrome<28\n\t\t// Target should not be a text node (#504, #13143)\n\t\tif ( event.target.nodeType === 3 ) {\n\t\t\tevent.target = event.target.parentNode;\n\t\t}\n\n\t\treturn fixHook.filter ? fixHook.filter( event, originalEvent ) : event;\n\t},\n\n\tspecial: {\n\t\tload: {\n\n\t\t\t// Prevent triggered image.load events from bubbling to window.load\n\t\t\tnoBubble: true\n\t\t},\n\t\tfocus: {\n\n\t\t\t// Fire native event if possible so blur/focus sequence is correct\n\t\t\ttrigger: function() {\n\t\t\t\tif ( this !== safeActiveElement() && this.focus ) {\n\t\t\t\t\tthis.focus();\n\t\t\t\t\treturn false;\n\t\t\t\t}\n\t\t\t},\n\t\t\tdelegateType: "focusin"\n\t\t},\n\t\tblur: {\n\t\t\ttrigger: function() {\n\t\t\t\tif ( this === safeActiveElement() && this.blur ) {\n\t\t\t\t\tthis.blur();\n\t\t\t\t\treturn false;\n\t\t\t\t}\n\t\t\t},\n\t\t\tdelegateType: "focusout"\n\t\t},\n\t\tclick: {\n\n\t\t\t// For checkbox, fire native event so checked state will be right\n\t\t\ttrigger: function() {\n\t\t\t\tif ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {\n\t\t\t\t\tthis.click();\n\t\t\t\t\treturn false;\n\t\t\t\t}\n\t\t\t},\n\n\t\t\t// For cross-browser consistency, don\'t fire native .click() on links\n\t\t\t_default: function( event ) {\n\t\t\t\treturn jQuery.nodeName( event.target, "a" );\n\t\t\t}\n\t\t},\n\n\t\tbeforeunload: {\n\t\t\tpostDispatch: function( event ) {\n\n\t\t\t\t// Support: Firefox 20+\n\t\t\t\t// Firefox doesn\'t alert if the returnValue field is not set.\n\t\t\t\tif ( event.result !== undefined && event.originalEvent ) {\n\t\t\t\t\tevent.originalEvent.returnValue = event.result;\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n};\n\njQuery.removeEvent = function( elem, type, handle ) {\n\n\t// This "if" is needed for plain objects\n\tif ( elem.removeEventListener ) {\n\t\telem.removeEventListener( type, handle );\n\t}\n};\n\njQuery.Event = function( src, props ) {\n\n\t// Allow instantiation without the \'new\' keyword\n\tif ( !( this instanceof jQuery.Event ) ) {\n\t\treturn new jQuery.Event( src, props );\n\t}\n\n\t// Event object\n\tif ( src && src.type ) {\n\t\tthis.originalEvent = src;\n\t\tthis.type = src.type;\n\n\t\t// Events bubbling up the document may have been marked as prevented\n\t\t// by a handler lower down the tree; reflect the correct value.\n\t\tthis.isDefaultPrevented = src.defaultPrevented ||\n\t\t\t\tsrc.defaultPrevented === undefined &&\n\n\t\t\t\t// Support: Android<4.0\n\t\t\t\tsrc.returnValue === false ?\n\t\t\treturnTrue :\n\t\t\treturnFalse;\n\n\t// Event type\n\t} else {\n\t\tthis.type = src;\n\t}\n\n\t// Put explicitly provided properties onto the event object\n\tif ( props ) {\n\t\tjQuery.extend( this, props );\n\t}\n\n\t// Create a timestamp if incoming event doesn\'t have one\n\tthis.timeStamp = src && src.timeStamp || jQuery.now();\n\n\t// Mark it as fixed\n\tthis[ jQuery.expando ] = true;\n};\n\n// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding\n// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html\njQuery.Event.prototype = {\n\tconstructor: jQuery.Event,\n\tisDefaultPrevented: returnFalse,\n\tisPropagationStopped: returnFalse,\n\tisImmediatePropagationStopped: returnFalse,\n\tisSimulated: false,\n\n\tpreventDefault: function() {\n\t\tvar e = this.originalEvent;\n\n\t\tthis.isDefaultPrevented = returnTrue;\n\n\t\tif ( e && !this.isSimulated ) {\n\t\t\te.preventDefault();\n\t\t}\n\t},\n\tstopPropagation: function() {\n\t\tvar e = this.originalEvent;\n\n\t\tthis.isPropagationStopped = returnTrue;\n\n\t\tif ( e && !this.isSimulated ) {\n\t\t\te.stopPropagation();\n\t\t}\n\t},\n\tstopImmediatePropagation: function() {\n\t\tvar e = this.originalEvent;\n\n\t\tthis.isImmediatePropagationStopped = returnTrue;\n\n\t\tif ( e && !this.isSimulated ) {\n\t\t\te.stopImmediatePropagation();\n\t\t}\n\n\t\tthis.stopPropagation();\n\t}\n};\n\n// Create mouseenter/leave events using mouseover/out and event-time checks\n// so that event delegation works in jQuery.\n// Do the same for pointerenter/pointerleave and pointerover/pointerout\n//\n// Support: Safari 7 only\n// Safari sends mouseenter too often; see:\n// https://code.google.com/p/chromium/issues/detail?id=470258\n// for the description of the bug (it existed in older Chrome versions as well).\njQuery.each( {\n\tmouseenter: "mouseover",\n\tmouseleave: "mouseout",\n\tpointerenter: "pointerover",\n\tpointerleave: "pointerout"\n}, function( orig, fix ) {\n\tjQuery.event.special[ orig ] = {\n\t\tdelegateType: fix,\n\t\tbindType: fix,\n\n\t\thandle: function( event ) {\n\t\t\tvar ret,\n\t\t\t\ttarget = this,\n\t\t\t\trelated = event.relatedTarget,\n\t\t\t\thandleObj = event.handleObj;\n\n\t\t\t// For mouseenter/leave call the handler if related is outside the target.\n\t\t\t// NB: No relatedTarget if the mouse left/entered the browser window\n\t\t\tif ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {\n\t\t\t\tevent.type = handleObj.origType;\n\t\t\t\tret = handleObj.handler.apply( this, arguments );\n\t\t\t\tevent.type = fix;\n\t\t\t}\n\t\t\treturn ret;\n\t\t}\n\t};\n} );\n\njQuery.fn.extend( {\n\ton: function( types, selector, data, fn ) {\n\t\treturn on( this, types, selector, data, fn );\n\t},\n\tone: function( types, selector, data, fn ) {\n\t\treturn on( this, types, selector, data, fn, 1 );\n\t},\n\toff: function( types, selector, fn ) {\n\t\tvar handleObj, type;\n\t\tif ( types && types.preventDefault && types.handleObj ) {\n\n\t\t\t// ( event )  dispatched jQuery.Event\n\t\t\thandleObj = types.handleObj;\n\t\t\tjQuery( types.delegateTarget ).off(\n\t\t\t\thandleObj.namespace ?\n\t\t\t\t\thandleObj.origType + "." + handleObj.namespace :\n\t\t\t\t\thandleObj.origType,\n\t\t\t\thandleObj.selector,\n\t\t\t\thandleObj.handler\n\t\t\t);\n\t\t\treturn this;\n\t\t}\n\t\tif ( typeof types === "object" ) {\n\n\t\t\t// ( types-object [, selector] )\n\t\t\tfor ( type in types ) {\n\t\t\t\tthis.off( type, selector, types[ type ] );\n\t\t\t}\n\t\t\treturn this;\n\t\t}\n\t\tif ( selector === false || typeof selector === "function" ) {\n\n\t\t\t// ( types [, fn] )\n\t\t\tfn = selector;\n\t\t\tselector = undefined;\n\t\t}\n\t\tif ( fn === false ) {\n\t\t\tfn = returnFalse;\n\t\t}\n\t\treturn this.each( function() {\n\t\t\tjQuery.event.remove( this, types, fn, selector );\n\t\t} );\n\t}\n} );\n\n\nvar\n\trxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\\w:-]+)[^>]*)\\/>/gi,\n\n\t// Support: IE 10-11, Edge 10240+\n\t// In IE/Edge using regex groups here causes severe slowdowns.\n\t// See https://connect.microsoft.com/IE/feedback/details/1736512/\n\trnoInnerhtml = /<script|<style|<link/i,\n\n\t// checked="checked" or checked\n\trchecked = /checked\\s*(?:[^=]|=\\s*.checked.)/i,\n\trscriptTypeMasked = /^true\\/(.*)/,\n\trcleanScript = /^\\s*<!(?:\\[CDATA\\[|--)|(?:\\]\\]|--)>\\s*$/g;\n\n// Manipulating tables requires a tbody\nfunction manipulationTarget( elem, content ) {\n\treturn jQuery.nodeName( elem, "table" ) &&\n\t\tjQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?\n\n\t\telem.getElementsByTagName( "tbody" )[ 0 ] ||\n\t\t\telem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :\n\t\telem;\n}\n\n// Replace/restore the type attribute of script elements for safe DOM manipulation\nfunction disableScript( elem ) {\n\telem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;\n\treturn elem;\n}\nfunction restoreScript( elem ) {\n\tvar match = rscriptTypeMasked.exec( elem.type );\n\n\tif ( match ) {\n\t\telem.type = match[ 1 ];\n\t} else {\n\t\telem.removeAttribute( "type" );\n\t}\n\n\treturn elem;\n}\n\nfunction cloneCopyEvent( src, dest ) {\n\tvar i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;\n\n\tif ( dest.nodeType !== 1 ) {\n\t\treturn;\n\t}\n\n\t// 1. Copy private data: events, handlers, etc.\n\tif ( dataPriv.hasData( src ) ) {\n\t\tpdataOld = dataPriv.access( src );\n\t\tpdataCur = dataPriv.set( dest, pdataOld );\n\t\tevents = pdataOld.events;\n\n\t\tif ( events ) {\n\t\t\tdelete pdataCur.handle;\n\t\t\tpdataCur.events = {};\n\n\t\t\tfor ( type in events ) {\n\t\t\t\tfor ( i = 0, l = events[ type ].length; i < l; i++ ) {\n\t\t\t\t\tjQuery.event.add( dest, type, events[ type ][ i ] );\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n\n\t// 2. Copy user data\n\tif ( dataUser.hasData( src ) ) {\n\t\tudataOld = dataUser.access( src );\n\t\tudataCur = jQuery.extend( {}, udataOld );\n\n\t\tdataUser.set( dest, udataCur );\n\t}\n}\n\n// Fix IE bugs, see support tests\nfunction fixInput( src, dest ) {\n\tvar nodeName = dest.nodeName.toLowerCase();\n\n\t// Fails to persist the checked state of a cloned checkbox or radio button.\n\tif ( nodeName === "input" && rcheckableType.test( src.type ) ) {\n\t\tdest.checked = src.checked;\n\n\t// Fails to return the selected option to the default selected state when cloning options\n\t} else if ( nodeName === "input" || nodeName === "textarea" ) {\n\t\tdest.defaultValue = src.defaultValue;\n\t}\n}\n\nfunction domManip( collection, args, callback, ignored ) {\n\n\t// Flatten any nested arrays\n\targs = concat.apply( [], args );\n\n\tvar fragment, first, scripts, hasScripts, node, doc,\n\t\ti = 0,\n\t\tl = collection.length,\n\t\tiNoClone = l - 1,\n\t\tvalue = args[ 0 ],\n\t\tisFunction = jQuery.isFunction( value );\n\n\t// We can\'t cloneNode fragments that contain checked, in WebKit\n\tif ( isFunction ||\n\t\t\t( l > 1 && typeof value === "string" &&\n\t\t\t\t!support.checkClone && rchecked.test( value ) ) ) {\n\t\treturn collection.each( function( index ) {\n\t\t\tvar self = collection.eq( index );\n\t\t\tif ( isFunction ) {\n\t\t\t\targs[ 0 ] = value.call( this, index, self.html() );\n\t\t\t}\n\t\t\tdomManip( self, args, callback, ignored );\n\t\t} );\n\t}\n\n\tif ( l ) {\n\t\tfragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );\n\t\tfirst = fragment.firstChild;\n\n\t\tif ( fragment.childNodes.length === 1 ) {\n\t\t\tfragment = first;\n\t\t}\n\n\t\t// Require either new content or an interest in ignored elements to invoke the callback\n\t\tif ( first || ignored ) {\n\t\t\tscripts = jQuery.map( getAll( fragment, "script" ), disableScript );\n\t\t\thasScripts = scripts.length;\n\n\t\t\t// Use the original fragment for the last item\n\t\t\t// instead of the first because it can end up\n\t\t\t// being emptied incorrectly in certain situations (#8070).\n\t\t\tfor ( ; i < l; i++ ) {\n\t\t\t\tnode = fragment;\n\n\t\t\t\tif ( i !== iNoClone ) {\n\t\t\t\t\tnode = jQuery.clone( node, true, true );\n\n\t\t\t\t\t// Keep references to cloned scripts for later restoration\n\t\t\t\t\tif ( hasScripts ) {\n\n\t\t\t\t\t\t// Support: Android<4.1, PhantomJS<2\n\t\t\t\t\t\t// push.apply(_, arraylike) throws on ancient WebKit\n\t\t\t\t\t\tjQuery.merge( scripts, getAll( node, "script" ) );\n\t\t\t\t\t}\n\t\t\t\t}\n\n\t\t\t\tcallback.call( collection[ i ], node, i );\n\t\t\t}\n\n\t\t\tif ( hasScripts ) {\n\t\t\t\tdoc = scripts[ scripts.length - 1 ].ownerDocument;\n\n\t\t\t\t// Reenable scripts\n\t\t\t\tjQuery.map( scripts, restoreScript );\n\n\t\t\t\t// Evaluate executable scripts on first document insertion\n\t\t\t\tfor ( i = 0; i < hasScripts; i++ ) {\n\t\t\t\t\tnode = scripts[ i ];\n\t\t\t\t\tif ( rscriptType.test( node.type || "" ) &&\n\t\t\t\t\t\t!dataPriv.access( node, "globalEval" ) &&\n\t\t\t\t\t\tjQuery.contains( doc, node ) ) {\n\n\t\t\t\t\t\tif ( node.src ) {\n\n\t\t\t\t\t\t\t// Optional AJAX dependency, but won\'t run scripts if not present\n\t\t\t\t\t\t\tif ( jQuery._evalUrl ) {\n\t\t\t\t\t\t\t\tjQuery._evalUrl( node.src );\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\tjQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n\n\treturn collection;\n}\n\nfunction remove( elem, selector, keepData ) {\n\tvar node,\n\t\tnodes = selector ? jQuery.filter( selector, elem ) : elem,\n\t\ti = 0;\n\n\tfor ( ; ( node = nodes[ i ] ) != null; i++ ) {\n\t\tif ( !keepData && node.nodeType === 1 ) {\n\t\t\tjQuery.cleanData( getAll( node ) );\n\t\t}\n\n\t\tif ( node.parentNode ) {\n\t\t\tif ( keepData && jQuery.contains( node.ownerDocument, node ) ) {\n\t\t\t\tsetGlobalEval( getAll( node, "script" ) );\n\t\t\t}\n\t\t\tnode.parentNode.removeChild( node );\n\t\t}\n\t}\n\n\treturn elem;\n}\n\njQuery.extend( {\n\thtmlPrefilter: function( html ) {\n\t\treturn html.replace( rxhtmlTag, "<$1></$2>" );\n\t},\n\n\tclone: function( elem, dataAndEvents, deepDataAndEvents ) {\n\t\tvar i, l, srcElements, destElements,\n\t\t\tclone = elem.cloneNode( true ),\n\t\t\tinPage = jQuery.contains( elem.ownerDocument, elem );\n\n\t\t// Fix IE cloning issues\n\t\tif ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&\n\t\t\t\t!jQuery.isXMLDoc( elem ) ) {\n\n\t\t\t// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2\n\t\t\tdestElements = getAll( clone );\n\t\t\tsrcElements = getAll( elem );\n\n\t\t\tfor ( i = 0, l = srcElements.length; i < l; i++ ) {\n\t\t\t\tfixInput( srcElements[ i ], destElements[ i ] );\n\t\t\t}\n\t\t}\n\n\t\t// Copy the events from the original to the clone\n\t\tif ( dataAndEvents ) {\n\t\t\tif ( deepDataAndEvents ) {\n\t\t\t\tsrcElements = srcElements || getAll( elem );\n\t\t\t\tdestElements = destElements || getAll( clone );\n\n\t\t\t\tfor ( i = 0, l = srcElements.length; i < l; i++ ) {\n\t\t\t\t\tcloneCopyEvent( srcElements[ i ], destElements[ i ] );\n\t\t\t\t}\n\t\t\t} else {\n\t\t\t\tcloneCopyEvent( elem, clone );\n\t\t\t}\n\t\t}\n\n\t\t// Preserve script evaluation history\n\t\tdestElements = getAll( clone, "script" );\n\t\tif ( destElements.length > 0 ) {\n\t\t\tsetGlobalEval( destElements, !inPage && getAll( elem, "script" ) );\n\t\t}\n\n\t\t// Return the cloned set\n\t\treturn clone;\n\t},\n\n\tcleanData: function( elems ) {\n\t\tvar data, elem, type,\n\t\t\tspecial = jQuery.event.special,\n\t\t\ti = 0;\n\n\t\tfor ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {\n\t\t\tif ( acceptData( elem ) ) {\n\t\t\t\tif ( ( data = elem[ dataPriv.expando ] ) ) {\n\t\t\t\t\tif ( data.events ) {\n\t\t\t\t\t\tfor ( type in data.events ) {\n\t\t\t\t\t\t\tif ( special[ type ] ) {\n\t\t\t\t\t\t\t\tjQuery.event.remove( elem, type );\n\n\t\t\t\t\t\t\t// This is a shortcut to avoid jQuery.event.remove\'s overhead\n\t\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\t\tjQuery.removeEvent( elem, type, data.handle );\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\n\t\t\t\t\t// Support: Chrome <= 35-45+\n\t\t\t\t\t// Assign undefined instead of using delete, see Data#remove\n\t\t\t\t\telem[ dataPriv.expando ] = undefined;\n\t\t\t\t}\n\t\t\t\tif ( elem[ dataUser.expando ] ) {\n\n\t\t\t\t\t// Support: Chrome <= 35-45+\n\t\t\t\t\t// Assign undefined instead of using delete, see Data#remove\n\t\t\t\t\telem[ dataUser.expando ] = undefined;\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n} );\n\njQuery.fn.extend( {\n\n\t// Keep domManip exposed until 3.0 (gh-2225)\n\tdomManip: domManip,\n\n\tdetach: function( selector ) {\n\t\treturn remove( this, selector, true );\n\t},\n\n\tremove: function( selector ) {\n\t\treturn remove( this, selector );\n\t},\n\n\ttext: function( value ) {\n\t\treturn access( this, function( value ) {\n\t\t\treturn value === undefined ?\n\t\t\t\tjQuery.text( this ) :\n\t\t\t\tthis.empty().each( function() {\n\t\t\t\t\tif ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {\n\t\t\t\t\t\tthis.textContent = value;\n\t\t\t\t\t}\n\t\t\t\t} );\n\t\t}, null, value, arguments.length );\n\t},\n\n\tappend: function() {\n\t\treturn domManip( this, arguments, function( elem ) {\n\t\t\tif ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {\n\t\t\t\tvar target = manipulationTarget( this, elem );\n\t\t\t\ttarget.appendChild( elem );\n\t\t\t}\n\t\t} );\n\t},\n\n\tprepend: function() {\n\t\treturn domManip( this, arguments, function( elem ) {\n\t\t\tif ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {\n\t\t\t\tvar target = manipulationTarget( this, elem );\n\t\t\t\ttarget.insertBefore( elem, target.firstChild );\n\t\t\t}\n\t\t} );\n\t},\n\n\tbefore: function() {\n\t\treturn domManip( this, arguments, function( elem ) {\n\t\t\tif ( this.parentNode ) {\n\t\t\t\tthis.parentNode.insertBefore( elem, this );\n\t\t\t}\n\t\t} );\n\t},\n\n\tafter: function() {\n\t\treturn domManip( this, arguments, function( elem ) {\n\t\t\tif ( this.parentNode ) {\n\t\t\t\tthis.parentNode.insertBefore( elem, this.nextSibling );\n\t\t\t}\n\t\t} );\n\t},\n\n\tempty: function() {\n\t\tvar elem,\n\t\t\ti = 0;\n\n\t\tfor ( ; ( elem = this[ i ] ) != null; i++ ) {\n\t\t\tif ( elem.nodeType === 1 ) {\n\n\t\t\t\t// Prevent memory leaks\n\t\t\t\tjQuery.cleanData( getAll( elem, false ) );\n\n\t\t\t\t// Remove any remaining nodes\n\t\t\t\telem.textContent = "";\n\t\t\t}\n\t\t}\n\n\t\treturn this;\n\t},\n\n\tclone: function( dataAndEvents, deepDataAndEvents ) {\n\t\tdataAndEvents = dataAndEvents == null ? false : dataAndEvents;\n\t\tdeepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;\n\n\t\treturn this.map( function() {\n\t\t\treturn jQuery.clone( this, dataAndEvents, deepDataAndEvents );\n\t\t} );\n\t},\n\n\thtml: function( value ) {\n\t\treturn access( this, function( value ) {\n\t\t\tvar elem = this[ 0 ] || {},\n\t\t\t\ti = 0,\n\t\t\t\tl = this.length;\n\n\t\t\tif ( value === undefined && elem.nodeType === 1 ) {\n\t\t\t\treturn elem.innerHTML;\n\t\t\t}\n\n\t\t\t// See if we can take a shortcut and just use innerHTML\n\t\t\tif ( typeof value === "string" && !rnoInnerhtml.test( value ) &&\n\t\t\t\t!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {\n\n\t\t\t\tvalue = jQuery.htmlPrefilter( value );\n\n\t\t\t\ttry {\n\t\t\t\t\tfor ( ; i < l; i++ ) {\n\t\t\t\t\t\telem = this[ i ] || {};\n\n\t\t\t\t\t\t// Remove element nodes and prevent memory leaks\n\t\t\t\t\t\tif ( elem.nodeType === 1 ) {\n\t\t\t\t\t\t\tjQuery.cleanData( getAll( elem, false ) );\n\t\t\t\t\t\t\telem.innerHTML = value;\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\n\t\t\t\t\telem = 0;\n\n\t\t\t\t// If using innerHTML throws an exception, use the fallback method\n\t\t\t\t} catch ( e ) {}\n\t\t\t}\n\n\t\t\tif ( elem ) {\n\t\t\t\tthis.empty().append( value );\n\t\t\t}\n\t\t}, null, value, arguments.length );\n\t},\n\n\treplaceWith: function() {\n\t\tvar ignored = [];\n\n\t\t// Make the changes, replacing each non-ignored context element with the new content\n\t\treturn domManip( this, arguments, function( elem ) {\n\t\t\tvar parent = this.parentNode;\n\n\t\t\tif ( jQuery.inArray( this, ignored ) < 0 ) {\n\t\t\t\tjQuery.cleanData( getAll( this ) );\n\t\t\t\tif ( parent ) {\n\t\t\t\t\tparent.replaceChild( elem, this );\n\t\t\t\t}\n\t\t\t}\n\n\t\t// Force callback invocation\n\t\t}, ignored );\n\t}\n} );\n\njQuery.each( {\n\tappendTo: "append",\n\tprependTo: "prepend",\n\tinsertBefore: "before",\n\tinsertAfter: "after",\n\treplaceAll: "replaceWith"\n}, function( name, original ) {\n\tjQuery.fn[ name ] = function( selector ) {\n\t\tvar elems,\n\t\t\tret = [],\n\t\t\tinsert = jQuery( selector ),\n\t\t\tlast = insert.length - 1,\n\t\t\ti = 0;\n\n\t\tfor ( ; i <= last; i++ ) {\n\t\t\telems = i === last ? this : this.clone( true );\n\t\t\tjQuery( insert[ i ] )[ original ]( elems );\n\n\t\t\t// Support: QtWebKit\n\t\t\t// .get() because push.apply(_, arraylike) throws\n\t\t\tpush.apply( ret, elems.get() );\n\t\t}\n\n\t\treturn this.pushStack( ret );\n\t};\n} );\n\n\nvar iframe,\n\telemdisplay = {\n\n\t\t// Support: Firefox\n\t\t// We have to pre-define these values for FF (#10227)\n\t\tHTML: "block",\n\t\tBODY: "block"\n\t};\n\n/**\n * Retrieve the actual display of a element\n * @param {String} name nodeName of the element\n * @param {Object} doc Document object\n */\n\n// Called only from within defaultDisplay\nfunction actualDisplay( name, doc ) {\n\tvar elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),\n\n\t\tdisplay = jQuery.css( elem[ 0 ], "display" );\n\n\t// We don\'t have any data stored on the element,\n\t// so use "detach" method as fast way to get rid of the element\n\telem.detach();\n\n\treturn display;\n}\n\n/**\n * Try to determine the default display value of an element\n * @param {String} nodeName\n */\nfunction defaultDisplay( nodeName ) {\n\tvar doc = document,\n\t\tdisplay = elemdisplay[ nodeName ];\n\n\tif ( !display ) {\n\t\tdisplay = actualDisplay( nodeName, doc );\n\n\t\t// If the simple way fails, read from inside an iframe\n\t\tif ( display === "none" || !display ) {\n\n\t\t\t// Use the already-created iframe if possible\n\t\t\tiframe = ( iframe || jQuery( "<iframe frameborder=\'0\' width=\'0\' height=\'0\'/>" ) )\n\t\t\t\t.appendTo( doc.documentElement );\n\n\t\t\t// Always write a new HTML skeleton so Webkit and Firefox don\'t choke on reuse\n\t\t\tdoc = iframe[ 0 ].contentDocument;\n\n\t\t\t// Support: IE\n\t\t\tdoc.write();\n\t\t\tdoc.close();\n\n\t\t\tdisplay = actualDisplay( nodeName, doc );\n\t\t\tiframe.detach();\n\t\t}\n\n\t\t// Store the correct default display\n\t\telemdisplay[ nodeName ] = display;\n\t}\n\n\treturn display;\n}\nvar rmargin = ( /^margin/ );\n\nvar rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );\n\nvar getStyles = function( elem ) {\n\n\t\t// Support: IE<=11+, Firefox<=30+ (#15098, #14150)\n\t\t// IE throws on elements created in popups\n\t\t// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"\n\t\tvar view = elem.ownerDocument.defaultView;\n\n\t\tif ( !view || !view.opener ) {\n\t\t\tview = window;\n\t\t}\n\n\t\treturn view.getComputedStyle( elem );\n\t};\n\nvar swap = function( elem, options, callback, args ) {\n\tvar ret, name,\n\t\told = {};\n\n\t// Remember the old values, and insert the new ones\n\tfor ( name in options ) {\n\t\told[ name ] = elem.style[ name ];\n\t\telem.style[ name ] = options[ name ];\n\t}\n\n\tret = callback.apply( elem, args || [] );\n\n\t// Revert the old values\n\tfor ( name in options ) {\n\t\telem.style[ name ] = old[ name ];\n\t}\n\n\treturn ret;\n};\n\n\nvar documentElement = document.documentElement;\n\n\n\n( function() {\n\tvar pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal,\n\t\tcontainer = document.createElement( "div" ),\n\t\tdiv = document.createElement( "div" );\n\n\t// Finish early in limited (non-browser) environments\n\tif ( !div.style ) {\n\t\treturn;\n\t}\n\n\t// Support: IE9-11+\n\t// Style of cloned element affects source element cloned (#8908)\n\tdiv.style.backgroundClip = "content-box";\n\tdiv.cloneNode( true ).style.backgroundClip = "";\n\tsupport.clearCloneStyle = div.style.backgroundClip === "content-box";\n\n\tcontainer.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +\n\t\t"padding:0;margin-top:1px;position:absolute";\n\tcontainer.appendChild( div );\n\n\t// Executing both pixelPosition & boxSizingReliable tests require only one layout\n\t// so they\'re executed at the same time to save the second computation.\n\tfunction computeStyleTests() {\n\t\tdiv.style.cssText =\n\n\t\t\t// Support: Firefox<29, Android 2.3\n\t\t\t// Vendor-prefix box-sizing\n\t\t\t"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;" +\n\t\t\t"position:relative;display:block;" +\n\t\t\t"margin:auto;border:1px;padding:1px;" +\n\t\t\t"top:1%;width:50%";\n\t\tdiv.innerHTML = "";\n\t\tdocumentElement.appendChild( container );\n\n\t\tvar divStyle = window.getComputedStyle( div );\n\t\tpixelPositionVal = divStyle.top !== "1%";\n\t\treliableMarginLeftVal = divStyle.marginLeft === "2px";\n\t\tboxSizingReliableVal = divStyle.width === "4px";\n\n\t\t// Support: Android 4.0 - 4.3 only\n\t\t// Some styles come back with percentage values, even though they shouldn\'t\n\t\tdiv.style.marginRight = "50%";\n\t\tpixelMarginRightVal = divStyle.marginRight === "4px";\n\n\t\tdocumentElement.removeChild( container );\n\t}\n\n\tjQuery.extend( support, {\n\t\tpixelPosition: function() {\n\n\t\t\t// This test is executed only once but we still do memoizing\n\t\t\t// since we can use the boxSizingReliable pre-computing.\n\t\t\t// No need to check if the test was already performed, though.\n\t\t\tcomputeStyleTests();\n\t\t\treturn pixelPositionVal;\n\t\t},\n\t\tboxSizingReliable: function() {\n\t\t\tif ( boxSizingReliableVal == null ) {\n\t\t\t\tcomputeStyleTests();\n\t\t\t}\n\t\t\treturn boxSizingReliableVal;\n\t\t},\n\t\tpixelMarginRight: function() {\n\n\t\t\t// Support: Android 4.0-4.3\n\t\t\t// We\'re checking for boxSizingReliableVal here instead of pixelMarginRightVal\n\t\t\t// since that compresses better and they\'re computed together anyway.\n\t\t\tif ( boxSizingReliableVal == null ) {\n\t\t\t\tcomputeStyleTests();\n\t\t\t}\n\t\t\treturn pixelMarginRightVal;\n\t\t},\n\t\treliableMarginLeft: function() {\n\n\t\t\t// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37\n\t\t\tif ( boxSizingReliableVal == null ) {\n\t\t\t\tcomputeStyleTests();\n\t\t\t}\n\t\t\treturn reliableMarginLeftVal;\n\t\t},\n\t\treliableMarginRight: function() {\n\n\t\t\t// Support: Android 2.3\n\t\t\t// Check if div with explicit width and no margin-right incorrectly\n\t\t\t// gets computed margin-right based on width of container. (#3333)\n\t\t\t// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right\n\t\t\t// This support function is only executed once so no memoizing is needed.\n\t\t\tvar ret,\n\t\t\t\tmarginDiv = div.appendChild( document.createElement( "div" ) );\n\n\t\t\t// Reset CSS: box-sizing; display; margin; border; padding\n\t\t\tmarginDiv.style.cssText = div.style.cssText =\n\n\t\t\t\t// Support: Android 2.3\n\t\t\t\t// Vendor-prefix box-sizing\n\t\t\t\t"-webkit-box-sizing:content-box;box-sizing:content-box;" +\n\t\t\t\t"display:block;margin:0;border:0;padding:0";\n\t\t\tmarginDiv.style.marginRight = marginDiv.style.width = "0";\n\t\t\tdiv.style.width = "1px";\n\t\t\tdocumentElement.appendChild( container );\n\n\t\t\tret = !parseFloat( window.getComputedStyle( marginDiv ).marginRight );\n\n\t\t\tdocumentElement.removeChild( container );\n\t\t\tdiv.removeChild( marginDiv );\n\n\t\t\treturn ret;\n\t\t}\n\t} );\n} )();\n\n\nfunction curCSS( elem, name, computed ) {\n\tvar width, minWidth, maxWidth, ret,\n\t\tstyle = elem.style;\n\n\tcomputed = computed || getStyles( elem );\n\tret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;\n\n\t// Support: Opera 12.1x only\n\t// Fall back to style even without computed\n\t// computed is undefined for elems on document fragments\n\tif ( ( ret === "" || ret === undefined ) && !jQuery.contains( elem.ownerDocument, elem ) ) {\n\t\tret = jQuery.style( elem, name );\n\t}\n\n\t// Support: IE9\n\t// getPropertyValue is only needed for .css(\'filter\') (#12537)\n\tif ( computed ) {\n\n\t\t// A tribute to the "awesome hack by Dean Edwards"\n\t\t// Android Browser returns percentage for some values,\n\t\t// but width seems to be reliably pixels.\n\t\t// This is against the CSSOM draft spec:\n\t\t// http://dev.w3.org/csswg/cssom/#resolved-values\n\t\tif ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {\n\n\t\t\t// Remember the original values\n\t\t\twidth = style.width;\n\t\t\tminWidth = style.minWidth;\n\t\t\tmaxWidth = style.maxWidth;\n\n\t\t\t// Put in the new values to get a computed value out\n\t\t\tstyle.minWidth = style.maxWidth = style.width = ret;\n\t\t\tret = computed.width;\n\n\t\t\t// Revert the changed values\n\t\t\tstyle.width = width;\n\t\t\tstyle.minWidth = minWidth;\n\t\t\tstyle.maxWidth = maxWidth;\n\t\t}\n\t}\n\n\treturn ret !== undefined ?\n\n\t\t// Support: IE9-11+\n\t\t// IE returns zIndex value as an integer.\n\t\tret + "" :\n\t\tret;\n}\n\n\nfunction addGetHookIf( conditionFn, hookFn ) {\n\n\t// Define the hook, we\'ll check on the first run if it\'s really needed.\n\treturn {\n\t\tget: function() {\n\t\t\tif ( conditionFn() ) {\n\n\t\t\t\t// Hook not needed (or it\'s not possible to use it due\n\t\t\t\t// to missing dependency), remove it.\n\t\t\t\tdelete this.get;\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\t// Hook needed; redefine it so that the support test is not executed again.\n\t\t\treturn ( this.get = hookFn ).apply( this, arguments );\n\t\t}\n\t};\n}\n\n\nvar\n\n\t// Swappable if display is none or starts with table\n\t// except "table", "table-cell", or "table-caption"\n\t// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display\n\trdisplayswap = /^(none|table(?!-c[ea]).+)/,\n\n\tcssShow = { position: "absolute", visibility: "hidden", display: "block" },\n\tcssNormalTransform = {\n\t\tletterSpacing: "0",\n\t\tfontWeight: "400"\n\t},\n\n\tcssPrefixes = [ "Webkit", "O", "Moz", "ms" ],\n\temptyStyle = document.createElement( "div" ).style;\n\n// Return a css property mapped to a potentially vendor prefixed property\nfunction vendorPropName( name ) {\n\n\t// Shortcut for names that are not vendor prefixed\n\tif ( name in emptyStyle ) {\n\t\treturn name;\n\t}\n\n\t// Check for vendor prefixed names\n\tvar capName = name[ 0 ].toUpperCase() + name.slice( 1 ),\n\t\ti = cssPrefixes.length;\n\n\twhile ( i-- ) {\n\t\tname = cssPrefixes[ i ] + capName;\n\t\tif ( name in emptyStyle ) {\n\t\t\treturn name;\n\t\t}\n\t}\n}\n\nfunction setPositiveNumber( elem, value, subtract ) {\n\n\t// Any relative (+/-) values have already been\n\t// normalized at this point\n\tvar matches = rcssNum.exec( value );\n\treturn matches ?\n\n\t\t// Guard against undefined "subtract", e.g., when used as in cssHooks\n\t\tMath.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :\n\t\tvalue;\n}\n\nfunction augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {\n\tvar i = extra === ( isBorderBox ? "border" : "content" ) ?\n\n\t\t// If we already have the right measurement, avoid augmentation\n\t\t4 :\n\n\t\t// Otherwise initialize for horizontal or vertical properties\n\t\tname === "width" ? 1 : 0,\n\n\t\tval = 0;\n\n\tfor ( ; i < 4; i += 2 ) {\n\n\t\t// Both box models exclude margin, so add it if we want it\n\t\tif ( extra === "margin" ) {\n\t\t\tval += jQuery.css( elem, extra + cssExpand[ i ], true, styles );\n\t\t}\n\n\t\tif ( isBorderBox ) {\n\n\t\t\t// border-box includes padding, so remove it if we want content\n\t\t\tif ( extra === "content" ) {\n\t\t\t\tval -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );\n\t\t\t}\n\n\t\t\t// At this point, extra isn\'t border nor margin, so remove border\n\t\t\tif ( extra !== "margin" ) {\n\t\t\t\tval -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );\n\t\t\t}\n\t\t} else {\n\n\t\t\t// At this point, extra isn\'t content, so add padding\n\t\t\tval += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );\n\n\t\t\t// At this point, extra isn\'t content nor padding, so add border\n\t\t\tif ( extra !== "padding" ) {\n\t\t\t\tval += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );\n\t\t\t}\n\t\t}\n\t}\n\n\treturn val;\n}\n\nfunction getWidthOrHeight( elem, name, extra ) {\n\n\t// Start with offset property, which is equivalent to the border-box value\n\tvar valueIsBorderBox = true,\n\t\tval = name === "width" ? elem.offsetWidth : elem.offsetHeight,\n\t\tstyles = getStyles( elem ),\n\t\tisBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";\n\n\t// Some non-html elements return undefined for offsetWidth, so check for null/undefined\n\t// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285\n\t// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668\n\tif ( val <= 0 || val == null ) {\n\n\t\t// Fall back to computed then uncomputed css if necessary\n\t\tval = curCSS( elem, name, styles );\n\t\tif ( val < 0 || val == null ) {\n\t\t\tval = elem.style[ name ];\n\t\t}\n\n\t\t// Computed unit is not pixels. Stop here and return.\n\t\tif ( rnumnonpx.test( val ) ) {\n\t\t\treturn val;\n\t\t}\n\n\t\t// Check for style in case a browser which returns unreliable values\n\t\t// for getComputedStyle silently falls back to the reliable elem.style\n\t\tvalueIsBorderBox = isBorderBox &&\n\t\t\t( support.boxSizingReliable() || val === elem.style[ name ] );\n\n\t\t// Normalize "", auto, and prepare for extra\n\t\tval = parseFloat( val ) || 0;\n\t}\n\n\t// Use the active box-sizing model to add/subtract irrelevant styles\n\treturn ( val +\n\t\taugmentWidthOrHeight(\n\t\t\telem,\n\t\t\tname,\n\t\t\textra || ( isBorderBox ? "border" : "content" ),\n\t\t\tvalueIsBorderBox,\n\t\t\tstyles\n\t\t)\n\t) + "px";\n}\n\nfunction showHide( elements, show ) {\n\tvar display, elem, hidden,\n\t\tvalues = [],\n\t\tindex = 0,\n\t\tlength = elements.length;\n\n\tfor ( ; index < length; index++ ) {\n\t\telem = elements[ index ];\n\t\tif ( !elem.style ) {\n\t\t\tcontinue;\n\t\t}\n\n\t\tvalues[ index ] = dataPriv.get( elem, "olddisplay" );\n\t\tdisplay = elem.style.display;\n\t\tif ( show ) {\n\n\t\t\t// Reset the inline display of this element to learn if it is\n\t\t\t// being hidden by cascaded rules or not\n\t\t\tif ( !values[ index ] && display === "none" ) {\n\t\t\t\telem.style.display = "";\n\t\t\t}\n\n\t\t\t// Set elements which have been overridden with display: none\n\t\t\t// in a stylesheet to whatever the default browser style is\n\t\t\t// for such an element\n\t\t\tif ( elem.style.display === "" && isHidden( elem ) ) {\n\t\t\t\tvalues[ index ] = dataPriv.access(\n\t\t\t\t\telem,\n\t\t\t\t\t"olddisplay",\n\t\t\t\t\tdefaultDisplay( elem.nodeName )\n\t\t\t\t);\n\t\t\t}\n\t\t} else {\n\t\t\thidden = isHidden( elem );\n\n\t\t\tif ( display !== "none" || !hidden ) {\n\t\t\t\tdataPriv.set(\n\t\t\t\t\telem,\n\t\t\t\t\t"olddisplay",\n\t\t\t\t\thidden ? display : jQuery.css( elem, "display" )\n\t\t\t\t);\n\t\t\t}\n\t\t}\n\t}\n\n\t// Set the display of most of the elements in a second loop\n\t// to avoid the constant reflow\n\tfor ( index = 0; index < length; index++ ) {\n\t\telem = elements[ index ];\n\t\tif ( !elem.style ) {\n\t\t\tcontinue;\n\t\t}\n\t\tif ( !show || elem.style.display === "none" || elem.style.display === "" ) {\n\t\t\telem.style.display = show ? values[ index ] || "" : "none";\n\t\t}\n\t}\n\n\treturn elements;\n}\n\njQuery.extend( {\n\n\t// Add in style property hooks for overriding the default\n\t// behavior of getting and setting a style property\n\tcssHooks: {\n\t\topacity: {\n\t\t\tget: function( elem, computed ) {\n\t\t\t\tif ( computed ) {\n\n\t\t\t\t\t// We should always get a number back from opacity\n\t\t\t\t\tvar ret = curCSS( elem, "opacity" );\n\t\t\t\t\treturn ret === "" ? "1" : ret;\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t},\n\n\t// Don\'t automatically add "px" to these possibly-unitless properties\n\tcssNumber: {\n\t\t"animationIterationCount": true,\n\t\t"columnCount": true,\n\t\t"fillOpacity": true,\n\t\t"flexGrow": true,\n\t\t"flexShrink": true,\n\t\t"fontWeight": true,\n\t\t"lineHeight": true,\n\t\t"opacity": true,\n\t\t"order": true,\n\t\t"orphans": true,\n\t\t"widows": true,\n\t\t"zIndex": true,\n\t\t"zoom": true\n\t},\n\n\t// Add in properties whose names you wish to fix before\n\t// setting or getting the value\n\tcssProps: {\n\t\t"float": "cssFloat"\n\t},\n\n\t// Get and set the style property on a DOM Node\n\tstyle: function( elem, name, value, extra ) {\n\n\t\t// Don\'t set styles on text and comment nodes\n\t\tif ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {\n\t\t\treturn;\n\t\t}\n\n\t\t// Make sure that we\'re working with the right name\n\t\tvar ret, type, hooks,\n\t\t\torigName = jQuery.camelCase( name ),\n\t\t\tstyle = elem.style;\n\n\t\tname = jQuery.cssProps[ origName ] ||\n\t\t\t( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );\n\n\t\t// Gets hook for the prefixed version, then unprefixed version\n\t\thooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];\n\n\t\t// Check if we\'re setting a value\n\t\tif ( value !== undefined ) {\n\t\t\ttype = typeof value;\n\n\t\t\t// Convert "+=" or "-=" to relative numbers (#7345)\n\t\t\tif ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {\n\t\t\t\tvalue = adjustCSS( elem, name, ret );\n\n\t\t\t\t// Fixes bug #9237\n\t\t\t\ttype = "number";\n\t\t\t}\n\n\t\t\t// Make sure that null and NaN values aren\'t set (#7116)\n\t\t\tif ( value == null || value !== value ) {\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\t// If a number was passed in, add the unit (except for certain CSS properties)\n\t\t\tif ( type === "number" ) {\n\t\t\t\tvalue += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );\n\t\t\t}\n\n\t\t\t// Support: IE9-11+\n\t\t\t// background-* props affect original clone\'s values\n\t\t\tif ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {\n\t\t\t\tstyle[ name ] = "inherit";\n\t\t\t}\n\n\t\t\t// If a hook was provided, use that value, otherwise just set the specified value\n\t\t\tif ( !hooks || !( "set" in hooks ) ||\n\t\t\t\t( value = hooks.set( elem, value, extra ) ) !== undefined ) {\n\n\t\t\t\tstyle[ name ] = value;\n\t\t\t}\n\n\t\t} else {\n\n\t\t\t// If a hook was provided get the non-computed value from there\n\t\t\tif ( hooks && "get" in hooks &&\n\t\t\t\t( ret = hooks.get( elem, false, extra ) ) !== undefined ) {\n\n\t\t\t\treturn ret;\n\t\t\t}\n\n\t\t\t// Otherwise just get the value from the style object\n\t\t\treturn style[ name ];\n\t\t}\n\t},\n\n\tcss: function( elem, name, extra, styles ) {\n\t\tvar val, num, hooks,\n\t\t\torigName = jQuery.camelCase( name );\n\n\t\t// Make sure that we\'re working with the right name\n\t\tname = jQuery.cssProps[ origName ] ||\n\t\t\t( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );\n\n\t\t// Try prefixed name followed by the unprefixed name\n\t\thooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];\n\n\t\t// If a hook was provided get the computed value from there\n\t\tif ( hooks && "get" in hooks ) {\n\t\t\tval = hooks.get( elem, true, extra );\n\t\t}\n\n\t\t// Otherwise, if a way to get the computed value exists, use that\n\t\tif ( val === undefined ) {\n\t\t\tval = curCSS( elem, name, styles );\n\t\t}\n\n\t\t// Convert "normal" to computed value\n\t\tif ( val === "normal" && name in cssNormalTransform ) {\n\t\t\tval = cssNormalTransform[ name ];\n\t\t}\n\n\t\t// Make numeric if forced or a qualifier was provided and val looks numeric\n\t\tif ( extra === "" || extra ) {\n\t\t\tnum = parseFloat( val );\n\t\t\treturn extra === true || isFinite( num ) ? num || 0 : val;\n\t\t}\n\t\treturn val;\n\t}\n} );\n\njQuery.each( [ "height", "width" ], function( i, name ) {\n\tjQuery.cssHooks[ name ] = {\n\t\tget: function( elem, computed, extra ) {\n\t\t\tif ( computed ) {\n\n\t\t\t\t// Certain elements can have dimension info if we invisibly show them\n\t\t\t\t// but it must have a current display style that would benefit\n\t\t\t\treturn rdisplayswap.test( jQuery.css( elem, "display" ) ) &&\n\t\t\t\t\telem.offsetWidth === 0 ?\n\t\t\t\t\t\tswap( elem, cssShow, function() {\n\t\t\t\t\t\t\treturn getWidthOrHeight( elem, name, extra );\n\t\t\t\t\t\t} ) :\n\t\t\t\t\t\tgetWidthOrHeight( elem, name, extra );\n\t\t\t}\n\t\t},\n\n\t\tset: function( elem, value, extra ) {\n\t\t\tvar matches,\n\t\t\t\tstyles = extra && getStyles( elem ),\n\t\t\t\tsubtract = extra && augmentWidthOrHeight(\n\t\t\t\t\telem,\n\t\t\t\t\tname,\n\t\t\t\t\textra,\n\t\t\t\t\tjQuery.css( elem, "boxSizing", false, styles ) === "border-box",\n\t\t\t\t\tstyles\n\t\t\t\t);\n\n\t\t\t// Convert to pixels if value adjustment is needed\n\t\t\tif ( subtract && ( matches = rcssNum.exec( value ) ) &&\n\t\t\t\t( matches[ 3 ] || "px" ) !== "px" ) {\n\n\t\t\t\telem.style[ name ] = value;\n\t\t\t\tvalue = jQuery.css( elem, name );\n\t\t\t}\n\n\t\t\treturn setPositiveNumber( elem, value, subtract );\n\t\t}\n\t};\n} );\n\njQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,\n\tfunction( elem, computed ) {\n\t\tif ( computed ) {\n\t\t\treturn ( parseFloat( curCSS( elem, "marginLeft" ) ) ||\n\t\t\t\telem.getBoundingClientRect().left -\n\t\t\t\t\tswap( elem, { marginLeft: 0 }, function() {\n\t\t\t\t\t\treturn elem.getBoundingClientRect().left;\n\t\t\t\t\t} )\n\t\t\t\t) + "px";\n\t\t}\n\t}\n);\n\n// Support: Android 2.3\njQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,\n\tfunction( elem, computed ) {\n\t\tif ( computed ) {\n\t\t\treturn swap( elem, { "display": "inline-block" },\n\t\t\t\tcurCSS, [ elem, "marginRight" ] );\n\t\t}\n\t}\n);\n\n// These hooks are used by animate to expand properties\njQuery.each( {\n\tmargin: "",\n\tpadding: "",\n\tborder: "Width"\n}, function( prefix, suffix ) {\n\tjQuery.cssHooks[ prefix + suffix ] = {\n\t\texpand: function( value ) {\n\t\t\tvar i = 0,\n\t\t\t\texpanded = {},\n\n\t\t\t\t// Assumes a single number if not a string\n\t\t\t\tparts = typeof value === "string" ? value.split( " " ) : [ value ];\n\n\t\t\tfor ( ; i < 4; i++ ) {\n\t\t\t\texpanded[ prefix + cssExpand[ i ] + suffix ] =\n\t\t\t\t\tparts[ i ] || parts[ i - 2 ] || parts[ 0 ];\n\t\t\t}\n\n\t\t\treturn expanded;\n\t\t}\n\t};\n\n\tif ( !rmargin.test( prefix ) ) {\n\t\tjQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;\n\t}\n} );\n\njQuery.fn.extend( {\n\tcss: function( name, value ) {\n\t\treturn access( this, function( elem, name, value ) {\n\t\t\tvar styles, len,\n\t\t\t\tmap = {},\n\t\t\t\ti = 0;\n\n\t\t\tif ( jQuery.isArray( name ) ) {\n\t\t\t\tstyles = getStyles( elem );\n\t\t\t\tlen = name.length;\n\n\t\t\t\tfor ( ; i < len; i++ ) {\n\t\t\t\t\tmap[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );\n\t\t\t\t}\n\n\t\t\t\treturn map;\n\t\t\t}\n\n\t\t\treturn value !== undefined ?\n\t\t\t\tjQuery.style( elem, name, value ) :\n\t\t\t\tjQuery.css( elem, name );\n\t\t}, name, value, arguments.length > 1 );\n\t},\n\tshow: function() {\n\t\treturn showHide( this, true );\n\t},\n\thide: function() {\n\t\treturn showHide( this );\n\t},\n\ttoggle: function( state ) {\n\t\tif ( typeof state === "boolean" ) {\n\t\t\treturn state ? this.show() : this.hide();\n\t\t}\n\n\t\treturn this.each( function() {\n\t\t\tif ( isHidden( this ) ) {\n\t\t\t\tjQuery( this ).show();\n\t\t\t} else {\n\t\t\t\tjQuery( this ).hide();\n\t\t\t}\n\t\t} );\n\t}\n} );\n\n\nfunction Tween( elem, options, prop, end, easing ) {\n\treturn new Tween.prototype.init( elem, options, prop, end, easing );\n}\njQuery.Tween = Tween;\n\nTween.prototype = {\n\tconstructor: Tween,\n\tinit: function( elem, options, prop, end, easing, unit ) {\n\t\tthis.elem = elem;\n\t\tthis.prop = prop;\n\t\tthis.easing = easing || jQuery.easing._default;\n\t\tthis.options = options;\n\t\tthis.start = this.now = this.cur();\n\t\tthis.end = end;\n\t\tthis.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );\n\t},\n\tcur: function() {\n\t\tvar hooks = Tween.propHooks[ this.prop ];\n\n\t\treturn hooks && hooks.get ?\n\t\t\thooks.get( this ) :\n\t\t\tTween.propHooks._default.get( this );\n\t},\n\trun: function( percent ) {\n\t\tvar eased,\n\t\t\thooks = Tween.propHooks[ this.prop ];\n\n\t\tif ( this.options.duration ) {\n\t\t\tthis.pos = eased = jQuery.easing[ this.easing ](\n\t\t\t\tpercent, this.options.duration * percent, 0, 1, this.options.duration\n\t\t\t);\n\t\t} else {\n\t\t\tthis.pos = eased = percent;\n\t\t}\n\t\tthis.now = ( this.end - this.start ) * eased + this.start;\n\n\t\tif ( this.options.step ) {\n\t\t\tthis.options.step.call( this.elem, this.now, this );\n\t\t}\n\n\t\tif ( hooks && hooks.set ) {\n\t\t\thooks.set( this );\n\t\t} else {\n\t\t\tTween.propHooks._default.set( this );\n\t\t}\n\t\treturn this;\n\t}\n};\n\nTween.prototype.init.prototype = Tween.prototype;\n\nTween.propHooks = {\n\t_default: {\n\t\tget: function( tween ) {\n\t\t\tvar result;\n\n\t\t\t// Use a property on the element directly when it is not a DOM element,\n\t\t\t// or when there is no matching style property that exists.\n\t\t\tif ( tween.elem.nodeType !== 1 ||\n\t\t\t\ttween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {\n\t\t\t\treturn tween.elem[ tween.prop ];\n\t\t\t}\n\n\t\t\t// Passing an empty string as a 3rd parameter to .css will automatically\n\t\t\t// attempt a parseFloat and fallback to a string if the parse fails.\n\t\t\t// Simple values such as "10px" are parsed to Float;\n\t\t\t// complex values such as "rotate(1rad)" are returned as-is.\n\t\t\tresult = jQuery.css( tween.elem, tween.prop, "" );\n\n\t\t\t// Empty strings, null, undefined and "auto" are converted to 0.\n\t\t\treturn !result || result === "auto" ? 0 : result;\n\t\t},\n\t\tset: function( tween ) {\n\n\t\t\t// Use step hook for back compat.\n\t\t\t// Use cssHook if its there.\n\t\t\t// Use .style if available and use plain properties where available.\n\t\t\tif ( jQuery.fx.step[ tween.prop ] ) {\n\t\t\t\tjQuery.fx.step[ tween.prop ]( tween );\n\t\t\t} else if ( tween.elem.nodeType === 1 &&\n\t\t\t\t( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||\n\t\t\t\t\tjQuery.cssHooks[ tween.prop ] ) ) {\n\t\t\t\tjQuery.style( tween.elem, tween.prop, tween.now + tween.unit );\n\t\t\t} else {\n\t\t\t\ttween.elem[ tween.prop ] = tween.now;\n\t\t\t}\n\t\t}\n\t}\n};\n\n// Support: IE9\n// Panic based approach to setting things on disconnected nodes\nTween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {\n\tset: function( tween ) {\n\t\tif ( tween.elem.nodeType && tween.elem.parentNode ) {\n\t\t\ttween.elem[ tween.prop ] = tween.now;\n\t\t}\n\t}\n};\n\njQuery.easing = {\n\tlinear: function( p ) {\n\t\treturn p;\n\t},\n\tswing: function( p ) {\n\t\treturn 0.5 - Math.cos( p * Math.PI ) / 2;\n\t},\n\t_default: "swing"\n};\n\njQuery.fx = Tween.prototype.init;\n\n// Back Compat <1.8 extension point\njQuery.fx.step = {};\n\n\n\n\nvar\n\tfxNow, timerId,\n\trfxtypes = /^(?:toggle|show|hide)$/,\n\trrun = /queueHooks$/;\n\n// Animations created synchronously will run synchronously\nfunction createFxNow() {\n\twindow.setTimeout( function() {\n\t\tfxNow = undefined;\n\t} );\n\treturn ( fxNow = jQuery.now() );\n}\n\n// Generate parameters to create a standard animation\nfunction genFx( type, includeWidth ) {\n\tvar which,\n\t\ti = 0,\n\t\tattrs = { height: type };\n\n\t// If we include width, step value is 1 to do all cssExpand values,\n\t// otherwise step value is 2 to skip over Left and Right\n\tincludeWidth = includeWidth ? 1 : 0;\n\tfor ( ; i < 4 ; i += 2 - includeWidth ) {\n\t\twhich = cssExpand[ i ];\n\t\tattrs[ "margin" + which ] = attrs[ "padding" + which ] = type;\n\t}\n\n\tif ( includeWidth ) {\n\t\tattrs.opacity = attrs.width = type;\n\t}\n\n\treturn attrs;\n}\n\nfunction createTween( value, prop, animation ) {\n\tvar tween,\n\t\tcollection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),\n\t\tindex = 0,\n\t\tlength = collection.length;\n\tfor ( ; index < length; index++ ) {\n\t\tif ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {\n\n\t\t\t// We\'re done with this property\n\t\t\treturn tween;\n\t\t}\n\t}\n}\n\nfunction defaultPrefilter( elem, props, opts ) {\n\t/* jshint validthis: true */\n\tvar prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,\n\t\tanim = this,\n\t\torig = {},\n\t\tstyle = elem.style,\n\t\thidden = elem.nodeType && isHidden( elem ),\n\t\tdataShow = dataPriv.get( elem, "fxshow" );\n\n\t// Handle queue: false promises\n\tif ( !opts.queue ) {\n\t\thooks = jQuery._queueHooks( elem, "fx" );\n\t\tif ( hooks.unqueued == null ) {\n\t\t\thooks.unqueued = 0;\n\t\t\toldfire = hooks.empty.fire;\n\t\t\thooks.empty.fire = function() {\n\t\t\t\tif ( !hooks.unqueued ) {\n\t\t\t\t\toldfire();\n\t\t\t\t}\n\t\t\t};\n\t\t}\n\t\thooks.unqueued++;\n\n\t\tanim.always( function() {\n\n\t\t\t// Ensure the complete handler is called before this completes\n\t\t\tanim.always( function() {\n\t\t\t\thooks.unqueued--;\n\t\t\t\tif ( !jQuery.queue( elem, "fx" ).length ) {\n\t\t\t\t\thooks.empty.fire();\n\t\t\t\t}\n\t\t\t} );\n\t\t} );\n\t}\n\n\t// Height/width overflow pass\n\tif ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {\n\n\t\t// Make sure that nothing sneaks out\n\t\t// Record all 3 overflow attributes because IE9-10 do not\n\t\t// change the overflow attribute when overflowX and\n\t\t// overflowY are set to the same value\n\t\topts.overflow = [ style.overflow, style.overflowX, style.overflowY ];\n\n\t\t// Set display property to inline-block for height/width\n\t\t// animations on inline elements that are having width/height animated\n\t\tdisplay = jQuery.css( elem, "display" );\n\n\t\t// Test default display if display is currently "none"\n\t\tcheckDisplay = display === "none" ?\n\t\t\tdataPriv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;\n\n\t\tif ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {\n\t\t\tstyle.display = "inline-block";\n\t\t}\n\t}\n\n\tif ( opts.overflow ) {\n\t\tstyle.overflow = "hidden";\n\t\tanim.always( function() {\n\t\t\tstyle.overflow = opts.overflow[ 0 ];\n\t\t\tstyle.overflowX = opts.overflow[ 1 ];\n\t\t\tstyle.overflowY = opts.overflow[ 2 ];\n\t\t} );\n\t}\n\n\t// show/hide pass\n\tfor ( prop in props ) {\n\t\tvalue = props[ prop ];\n\t\tif ( rfxtypes.exec( value ) ) {\n\t\t\tdelete props[ prop ];\n\t\t\ttoggle = toggle || value === "toggle";\n\t\t\tif ( value === ( hidden ? "hide" : "show" ) ) {\n\n\t\t\t\t// If there is dataShow left over from a stopped hide or show\n\t\t\t\t// and we are going to proceed with show, we should pretend to be hidden\n\t\t\t\tif ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {\n\t\t\t\t\thidden = true;\n\t\t\t\t} else {\n\t\t\t\t\tcontinue;\n\t\t\t\t}\n\t\t\t}\n\t\t\torig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );\n\n\t\t// Any non-fx value stops us from restoring the original display value\n\t\t} else {\n\t\t\tdisplay = undefined;\n\t\t}\n\t}\n\n\tif ( !jQuery.isEmptyObject( orig ) ) {\n\t\tif ( dataShow ) {\n\t\t\tif ( "hidden" in dataShow ) {\n\t\t\t\thidden = dataShow.hidden;\n\t\t\t}\n\t\t} else {\n\t\t\tdataShow = dataPriv.access( elem, "fxshow", {} );\n\t\t}\n\n\t\t// Store state if its toggle - enables .stop().toggle() to "reverse"\n\t\tif ( toggle ) {\n\t\t\tdataShow.hidden = !hidden;\n\t\t}\n\t\tif ( hidden ) {\n\t\t\tjQuery( elem ).show();\n\t\t} else {\n\t\t\tanim.done( function() {\n\t\t\t\tjQuery( elem ).hide();\n\t\t\t} );\n\t\t}\n\t\tanim.done( function() {\n\t\t\tvar prop;\n\n\t\t\tdataPriv.remove( elem, "fxshow" );\n\t\t\tfor ( prop in orig ) {\n\t\t\t\tjQuery.style( elem, prop, orig[ prop ] );\n\t\t\t}\n\t\t} );\n\t\tfor ( prop in orig ) {\n\t\t\ttween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );\n\n\t\t\tif ( !( prop in dataShow ) ) {\n\t\t\t\tdataShow[ prop ] = tween.start;\n\t\t\t\tif ( hidden ) {\n\t\t\t\t\ttween.end = tween.start;\n\t\t\t\t\ttween.start = prop === "width" || prop === "height" ? 1 : 0;\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\n\t// If this is a noop like .hide().hide(), restore an overwritten display value\n\t} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {\n\t\tstyle.display = display;\n\t}\n}\n\nfunction propFilter( props, specialEasing ) {\n\tvar index, name, easing, value, hooks;\n\n\t// camelCase, specialEasing and expand cssHook pass\n\tfor ( index in props ) {\n\t\tname = jQuery.camelCase( index );\n\t\teasing = specialEasing[ name ];\n\t\tvalue = props[ index ];\n\t\tif ( jQuery.isArray( value ) ) {\n\t\t\teasing = value[ 1 ];\n\t\t\tvalue = props[ index ] = value[ 0 ];\n\t\t}\n\n\t\tif ( index !== name ) {\n\t\t\tprops[ name ] = value;\n\t\t\tdelete props[ index ];\n\t\t}\n\n\t\thooks = jQuery.cssHooks[ name ];\n\t\tif ( hooks && "expand" in hooks ) {\n\t\t\tvalue = hooks.expand( value );\n\t\t\tdelete props[ name ];\n\n\t\t\t// Not quite $.extend, this won\'t overwrite existing keys.\n\t\t\t// Reusing \'index\' because we have the correct "name"\n\t\t\tfor ( index in value ) {\n\t\t\t\tif ( !( index in props ) ) {\n\t\t\t\t\tprops[ index ] = value[ index ];\n\t\t\t\t\tspecialEasing[ index ] = easing;\n\t\t\t\t}\n\t\t\t}\n\t\t} else {\n\t\t\tspecialEasing[ name ] = easing;\n\t\t}\n\t}\n}\n\nfunction Animation( elem, properties, options ) {\n\tvar result,\n\t\tstopped,\n\t\tindex = 0,\n\t\tlength = Animation.prefilters.length,\n\t\tdeferred = jQuery.Deferred().always( function() {\n\n\t\t\t// Don\'t match elem in the :animated selector\n\t\t\tdelete tick.elem;\n\t\t} ),\n\t\ttick = function() {\n\t\t\tif ( stopped ) {\n\t\t\t\treturn false;\n\t\t\t}\n\t\t\tvar currentTime = fxNow || createFxNow(),\n\t\t\t\tremaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),\n\n\t\t\t\t// Support: Android 2.3\n\t\t\t\t// Archaic crash bug won\'t allow us to use `1 - ( 0.5 || 0 )` (#12497)\n\t\t\t\ttemp = remaining / animation.duration || 0,\n\t\t\t\tpercent = 1 - temp,\n\t\t\t\tindex = 0,\n\t\t\t\tlength = animation.tweens.length;\n\n\t\t\tfor ( ; index < length ; index++ ) {\n\t\t\t\tanimation.tweens[ index ].run( percent );\n\t\t\t}\n\n\t\t\tdeferred.notifyWith( elem, [ animation, percent, remaining ] );\n\n\t\t\tif ( percent < 1 && length ) {\n\t\t\t\treturn remaining;\n\t\t\t} else {\n\t\t\t\tdeferred.resolveWith( elem, [ animation ] );\n\t\t\t\treturn false;\n\t\t\t}\n\t\t},\n\t\tanimation = deferred.promise( {\n\t\t\telem: elem,\n\t\t\tprops: jQuery.extend( {}, properties ),\n\t\t\topts: jQuery.extend( true, {\n\t\t\t\tspecialEasing: {},\n\t\t\t\teasing: jQuery.easing._default\n\t\t\t}, options ),\n\t\t\toriginalProperties: properties,\n\t\t\toriginalOptions: options,\n\t\t\tstartTime: fxNow || createFxNow(),\n\t\t\tduration: options.duration,\n\t\t\ttweens: [],\n\t\t\tcreateTween: function( prop, end ) {\n\t\t\t\tvar tween = jQuery.Tween( elem, animation.opts, prop, end,\n\t\t\t\t\t\tanimation.opts.specialEasing[ prop ] || animation.opts.easing );\n\t\t\t\tanimation.tweens.push( tween );\n\t\t\t\treturn tween;\n\t\t\t},\n\t\t\tstop: function( gotoEnd ) {\n\t\t\t\tvar index = 0,\n\n\t\t\t\t\t// If we are going to the end, we want to run all the tweens\n\t\t\t\t\t// otherwise we skip this part\n\t\t\t\t\tlength = gotoEnd ? animation.tweens.length : 0;\n\t\t\t\tif ( stopped ) {\n\t\t\t\t\treturn this;\n\t\t\t\t}\n\t\t\t\tstopped = true;\n\t\t\t\tfor ( ; index < length ; index++ ) {\n\t\t\t\t\tanimation.tweens[ index ].run( 1 );\n\t\t\t\t}\n\n\t\t\t\t// Resolve when we played the last frame; otherwise, reject\n\t\t\t\tif ( gotoEnd ) {\n\t\t\t\t\tdeferred.notifyWith( elem, [ animation, 1, 0 ] );\n\t\t\t\t\tdeferred.resolveWith( elem, [ animation, gotoEnd ] );\n\t\t\t\t} else {\n\t\t\t\t\tdeferred.rejectWith( elem, [ animation, gotoEnd ] );\n\t\t\t\t}\n\t\t\t\treturn this;\n\t\t\t}\n\t\t} ),\n\t\tprops = animation.props;\n\n\tpropFilter( props, animation.opts.specialEasing );\n\n\tfor ( ; index < length ; index++ ) {\n\t\tresult = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );\n\t\tif ( result ) {\n\t\t\tif ( jQuery.isFunction( result.stop ) ) {\n\t\t\t\tjQuery._queueHooks( animation.elem, animation.opts.queue ).stop =\n\t\t\t\t\tjQuery.proxy( result.stop, result );\n\t\t\t}\n\t\t\treturn result;\n\t\t}\n\t}\n\n\tjQuery.map( props, createTween, animation );\n\n\tif ( jQuery.isFunction( animation.opts.start ) ) {\n\t\tanimation.opts.start.call( elem, animation );\n\t}\n\n\tjQuery.fx.timer(\n\t\tjQuery.extend( tick, {\n\t\t\telem: elem,\n\t\t\tanim: animation,\n\t\t\tqueue: animation.opts.queue\n\t\t} )\n\t);\n\n\t// attach callbacks from options\n\treturn animation.progress( animation.opts.progress )\n\t\t.done( animation.opts.done, animation.opts.complete )\n\t\t.fail( animation.opts.fail )\n\t\t.always( animation.opts.always );\n}\n\njQuery.Animation = jQuery.extend( Animation, {\n\ttweeners: {\n\t\t"*": [ function( prop, value ) {\n\t\t\tvar tween = this.createTween( prop, value );\n\t\t\tadjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );\n\t\t\treturn tween;\n\t\t} ]\n\t},\n\n\ttweener: function( props, callback ) {\n\t\tif ( jQuery.isFunction( props ) ) {\n\t\t\tcallback = props;\n\t\t\tprops = [ "*" ];\n\t\t} else {\n\t\t\tprops = props.match( rnotwhite );\n\t\t}\n\n\t\tvar prop,\n\t\t\tindex = 0,\n\t\t\tlength = props.length;\n\n\t\tfor ( ; index < length ; index++ ) {\n\t\t\tprop = props[ index ];\n\t\t\tAnimation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];\n\t\t\tAnimation.tweeners[ prop ].unshift( callback );\n\t\t}\n\t},\n\n\tprefilters: [ defaultPrefilter ],\n\n\tprefilter: function( callback, prepend ) {\n\t\tif ( prepend ) {\n\t\t\tAnimation.prefilters.unshift( callback );\n\t\t} else {\n\t\t\tAnimation.prefilters.push( callback );\n\t\t}\n\t}\n} );\n\njQuery.speed = function( speed, easing, fn ) {\n\tvar opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {\n\t\tcomplete: fn || !fn && easing ||\n\t\t\tjQuery.isFunction( speed ) && speed,\n\t\tduration: speed,\n\t\teasing: fn && easing || easing && !jQuery.isFunction( easing ) && easing\n\t};\n\n\topt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ?\n\t\topt.duration : opt.duration in jQuery.fx.speeds ?\n\t\t\tjQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;\n\n\t// Normalize opt.queue - true/undefined/null -> "fx"\n\tif ( opt.queue == null || opt.queue === true ) {\n\t\topt.queue = "fx";\n\t}\n\n\t// Queueing\n\topt.old = opt.complete;\n\n\topt.complete = function() {\n\t\tif ( jQuery.isFunction( opt.old ) ) {\n\t\t\topt.old.call( this );\n\t\t}\n\n\t\tif ( opt.queue ) {\n\t\t\tjQuery.dequeue( this, opt.queue );\n\t\t}\n\t};\n\n\treturn opt;\n};\n\njQuery.fn.extend( {\n\tfadeTo: function( speed, to, easing, callback ) {\n\n\t\t// Show any hidden elements after setting opacity to 0\n\t\treturn this.filter( isHidden ).css( "opacity", 0 ).show()\n\n\t\t\t// Animate to the value specified\n\t\t\t.end().animate( { opacity: to }, speed, easing, callback );\n\t},\n\tanimate: function( prop, speed, easing, callback ) {\n\t\tvar empty = jQuery.isEmptyObject( prop ),\n\t\t\toptall = jQuery.speed( speed, easing, callback ),\n\t\t\tdoAnimation = function() {\n\n\t\t\t\t// Operate on a copy of prop so per-property easing won\'t be lost\n\t\t\t\tvar anim = Animation( this, jQuery.extend( {}, prop ), optall );\n\n\t\t\t\t// Empty animations, or finishing resolves immediately\n\t\t\t\tif ( empty || dataPriv.get( this, "finish" ) ) {\n\t\t\t\t\tanim.stop( true );\n\t\t\t\t}\n\t\t\t};\n\t\t\tdoAnimation.finish = doAnimation;\n\n\t\treturn empty || optall.queue === false ?\n\t\t\tthis.each( doAnimation ) :\n\t\t\tthis.queue( optall.queue, doAnimation );\n\t},\n\tstop: function( type, clearQueue, gotoEnd ) {\n\t\tvar stopQueue = function( hooks ) {\n\t\t\tvar stop = hooks.stop;\n\t\t\tdelete hooks.stop;\n\t\t\tstop( gotoEnd );\n\t\t};\n\n\t\tif ( typeof type !== "string" ) {\n\t\t\tgotoEnd = clearQueue;\n\t\t\tclearQueue = type;\n\t\t\ttype = undefined;\n\t\t}\n\t\tif ( clearQueue && type !== false ) {\n\t\t\tthis.queue( type || "fx", [] );\n\t\t}\n\n\t\treturn this.each( function() {\n\t\t\tvar dequeue = true,\n\t\t\t\tindex = type != null && type + "queueHooks",\n\t\t\t\ttimers = jQuery.timers,\n\t\t\t\tdata = dataPriv.get( this );\n\n\t\t\tif ( index ) {\n\t\t\t\tif ( data[ index ] && data[ index ].stop ) {\n\t\t\t\t\tstopQueue( data[ index ] );\n\t\t\t\t}\n\t\t\t} else {\n\t\t\t\tfor ( index in data ) {\n\t\t\t\t\tif ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {\n\t\t\t\t\t\tstopQueue( data[ index ] );\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\n\t\t\tfor ( index = timers.length; index--; ) {\n\t\t\t\tif ( timers[ index ].elem === this &&\n\t\t\t\t\t( type == null || timers[ index ].queue === type ) ) {\n\n\t\t\t\t\ttimers[ index ].anim.stop( gotoEnd );\n\t\t\t\t\tdequeue = false;\n\t\t\t\t\ttimers.splice( index, 1 );\n\t\t\t\t}\n\t\t\t}\n\n\t\t\t// Start the next in the queue if the last step wasn\'t forced.\n\t\t\t// Timers currently will call their complete callbacks, which\n\t\t\t// will dequeue but only if they were gotoEnd.\n\t\t\tif ( dequeue || !gotoEnd ) {\n\t\t\t\tjQuery.dequeue( this, type );\n\t\t\t}\n\t\t} );\n\t},\n\tfinish: function( type ) {\n\t\tif ( type !== false ) {\n\t\t\ttype = type || "fx";\n\t\t}\n\t\treturn this.each( function() {\n\t\t\tvar index,\n\t\t\t\tdata = dataPriv.get( this ),\n\t\t\t\tqueue = data[ type + "queue" ],\n\t\t\t\thooks = data[ type + "queueHooks" ],\n\t\t\t\ttimers = jQuery.timers,\n\t\t\t\tlength = queue ? queue.length : 0;\n\n\t\t\t// Enable finishing flag on private data\n\t\t\tdata.finish = true;\n\n\t\t\t// Empty the queue first\n\t\t\tjQuery.queue( this, type, [] );\n\n\t\t\tif ( hooks && hooks.stop ) {\n\t\t\t\thooks.stop.call( this, true );\n\t\t\t}\n\n\t\t\t// Look for any active animations, and finish them\n\t\t\tfor ( index = timers.length; index--; ) {\n\t\t\t\tif ( timers[ index ].elem === this && timers[ index ].queue === type ) {\n\t\t\t\t\ttimers[ index ].anim.stop( true );\n\t\t\t\t\ttimers.splice( index, 1 );\n\t\t\t\t}\n\t\t\t}\n\n\t\t\t// Look for any animations in the old queue and finish them\n\t\t\tfor ( index = 0; index < length; index++ ) {\n\t\t\t\tif ( queue[ index ] && queue[ index ].finish ) {\n\t\t\t\t\tqueue[ index ].finish.call( this );\n\t\t\t\t}\n\t\t\t}\n\n\t\t\t// Turn off finishing flag\n\t\t\tdelete data.finish;\n\t\t} );\n\t}\n} );\n\njQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {\n\tvar cssFn = jQuery.fn[ name ];\n\tjQuery.fn[ name ] = function( speed, easing, callback ) {\n\t\treturn speed == null || typeof speed === "boolean" ?\n\t\t\tcssFn.apply( this, arguments ) :\n\t\t\tthis.animate( genFx( name, true ), speed, easing, callback );\n\t};\n} );\n\n// Generate shortcuts for custom animations\njQuery.each( {\n\tslideDown: genFx( "show" ),\n\tslideUp: genFx( "hide" ),\n\tslideToggle: genFx( "toggle" ),\n\tfadeIn: { opacity: "show" },\n\tfadeOut: { opacity: "hide" },\n\tfadeToggle: { opacity: "toggle" }\n}, function( name, props ) {\n\tjQuery.fn[ name ] = function( speed, easing, callback ) {\n\t\treturn this.animate( props, speed, easing, callback );\n\t};\n} );\n\njQuery.timers = [];\njQuery.fx.tick = function() {\n\tvar timer,\n\t\ti = 0,\n\t\ttimers = jQuery.timers;\n\n\tfxNow = jQuery.now();\n\n\tfor ( ; i < timers.length; i++ ) {\n\t\ttimer = timers[ i ];\n\n\t\t// Checks the timer has not already been removed\n\t\tif ( !timer() && timers[ i ] === timer ) {\n\t\t\ttimers.splice( i--, 1 );\n\t\t}\n\t}\n\n\tif ( !timers.length ) {\n\t\tjQuery.fx.stop();\n\t}\n\tfxNow = undefined;\n};\n\njQuery.fx.timer = function( timer ) {\n\tjQuery.timers.push( timer );\n\tif ( timer() ) {\n\t\tjQuery.fx.start();\n\t} else {\n\t\tjQuery.timers.pop();\n\t}\n};\n\njQuery.fx.interval = 13;\njQuery.fx.start = function() {\n\tif ( !timerId ) {\n\t\ttimerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );\n\t}\n};\n\njQuery.fx.stop = function() {\n\twindow.clearInterval( timerId );\n\n\ttimerId = null;\n};\n\njQuery.fx.speeds = {\n\tslow: 600,\n\tfast: 200,\n\n\t// Default speed\n\t_default: 400\n};\n\n\n// Based off of the plugin by Clint Helfers, with permission.\n// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/\njQuery.fn.delay = function( time, type ) {\n\ttime = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;\n\ttype = type || "fx";\n\n\treturn this.queue( type, function( next, hooks ) {\n\t\tvar timeout = window.setTimeout( next, time );\n\t\thooks.stop = function() {\n\t\t\twindow.clearTimeout( timeout );\n\t\t};\n\t} );\n};\n\n\n( function() {\n\tvar input = document.createElement( "input" ),\n\t\tselect = document.createElement( "select" ),\n\t\topt = select.appendChild( document.createElement( "option" ) );\n\n\tinput.type = "checkbox";\n\n\t// Support: iOS<=5.1, Android<=4.2+\n\t// Default value for a checkbox should be "on"\n\tsupport.checkOn = input.value !== "";\n\n\t// Support: IE<=11+\n\t// Must access selectedIndex to make default options select\n\tsupport.optSelected = opt.selected;\n\n\t// Support: Android<=2.3\n\t// Options inside disabled selects are incorrectly marked as disabled\n\tselect.disabled = true;\n\tsupport.optDisabled = !opt.disabled;\n\n\t// Support: IE<=11+\n\t// An input loses its value after becoming a radio\n\tinput = document.createElement( "input" );\n\tinput.value = "t";\n\tinput.type = "radio";\n\tsupport.radioValue = input.value === "t";\n} )();\n\n\nvar boolHook,\n\tattrHandle = jQuery.expr.attrHandle;\n\njQuery.fn.extend( {\n\tattr: function( name, value ) {\n\t\treturn access( this, jQuery.attr, name, value, arguments.length > 1 );\n\t},\n\n\tremoveAttr: function( name ) {\n\t\treturn this.each( function() {\n\t\t\tjQuery.removeAttr( this, name );\n\t\t} );\n\t}\n} );\n\njQuery.extend( {\n\tattr: function( elem, name, value ) {\n\t\tvar ret, hooks,\n\t\t\tnType = elem.nodeType;\n\n\t\t// Don\'t get/set attributes on text, comment and attribute nodes\n\t\tif ( nType === 3 || nType === 8 || nType === 2 ) {\n\t\t\treturn;\n\t\t}\n\n\t\t// Fallback to prop when attributes are not supported\n\t\tif ( typeof elem.getAttribute === "undefined" ) {\n\t\t\treturn jQuery.prop( elem, name, value );\n\t\t}\n\n\t\t// All attributes are lowercase\n\t\t// Grab necessary hook if one is defined\n\t\tif ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {\n\t\t\tname = name.toLowerCase();\n\t\t\thooks = jQuery.attrHooks[ name ] ||\n\t\t\t\t( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );\n\t\t}\n\n\t\tif ( value !== undefined ) {\n\t\t\tif ( value === null ) {\n\t\t\t\tjQuery.removeAttr( elem, name );\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\tif ( hooks && "set" in hooks &&\n\t\t\t\t( ret = hooks.set( elem, value, name ) ) !== undefined ) {\n\t\t\t\treturn ret;\n\t\t\t}\n\n\t\t\telem.setAttribute( name, value + "" );\n\t\t\treturn value;\n\t\t}\n\n\t\tif ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {\n\t\t\treturn ret;\n\t\t}\n\n\t\tret = jQuery.find.attr( elem, name );\n\n\t\t// Non-existent attributes return null, we normalize to undefined\n\t\treturn ret == null ? undefined : ret;\n\t},\n\n\tattrHooks: {\n\t\ttype: {\n\t\t\tset: function( elem, value ) {\n\t\t\t\tif ( !support.radioValue && value === "radio" &&\n\t\t\t\t\tjQuery.nodeName( elem, "input" ) ) {\n\t\t\t\t\tvar val = elem.value;\n\t\t\t\t\telem.setAttribute( "type", value );\n\t\t\t\t\tif ( val ) {\n\t\t\t\t\t\telem.value = val;\n\t\t\t\t\t}\n\t\t\t\t\treturn value;\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t},\n\n\tremoveAttr: function( elem, value ) {\n\t\tvar name, propName,\n\t\t\ti = 0,\n\t\t\tattrNames = value && value.match( rnotwhite );\n\n\t\tif ( attrNames && elem.nodeType === 1 ) {\n\t\t\twhile ( ( name = attrNames[ i++ ] ) ) {\n\t\t\t\tpropName = jQuery.propFix[ name ] || name;\n\n\t\t\t\t// Boolean attributes get special treatment (#10870)\n\t\t\t\tif ( jQuery.expr.match.bool.test( name ) ) {\n\n\t\t\t\t\t// Set corresponding property to false\n\t\t\t\t\telem[ propName ] = false;\n\t\t\t\t}\n\n\t\t\t\telem.removeAttribute( name );\n\t\t\t}\n\t\t}\n\t}\n} );\n\n// Hooks for boolean attributes\nboolHook = {\n\tset: function( elem, value, name ) {\n\t\tif ( value === false ) {\n\n\t\t\t// Remove boolean attributes when set to false\n\t\t\tjQuery.removeAttr( elem, name );\n\t\t} else {\n\t\t\telem.setAttribute( name, name );\n\t\t}\n\t\treturn name;\n\t}\n};\njQuery.each( jQuery.expr.match.bool.source.match( /\\w+/g ), function( i, name ) {\n\tvar getter = attrHandle[ name ] || jQuery.find.attr;\n\n\tattrHandle[ name ] = function( elem, name, isXML ) {\n\t\tvar ret, handle;\n\t\tif ( !isXML ) {\n\n\t\t\t// Avoid an infinite loop by temporarily removing this function from the getter\n\t\t\thandle = attrHandle[ name ];\n\t\t\tattrHandle[ name ] = ret;\n\t\t\tret = getter( elem, name, isXML ) != null ?\n\t\t\t\tname.toLowerCase() :\n\t\t\t\tnull;\n\t\t\tattrHandle[ name ] = handle;\n\t\t}\n\t\treturn ret;\n\t};\n} );\n\n\n\n\nvar rfocusable = /^(?:input|select|textarea|button)$/i,\n\trclickable = /^(?:a|area)$/i;\n\njQuery.fn.extend( {\n\tprop: function( name, value ) {\n\t\treturn access( this, jQuery.prop, name, value, arguments.length > 1 );\n\t},\n\n\tremoveProp: function( name ) {\n\t\treturn this.each( function() {\n\t\t\tdelete this[ jQuery.propFix[ name ] || name ];\n\t\t} );\n\t}\n} );\n\njQuery.extend( {\n\tprop: function( elem, name, value ) {\n\t\tvar ret, hooks,\n\t\t\tnType = elem.nodeType;\n\n\t\t// Don\'t get/set properties on text, comment and attribute nodes\n\t\tif ( nType === 3 || nType === 8 || nType === 2 ) {\n\t\t\treturn;\n\t\t}\n\n\t\tif ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {\n\n\t\t\t// Fix name and attach hooks\n\t\t\tname = jQuery.propFix[ name ] || name;\n\t\t\thooks = jQuery.propHooks[ name ];\n\t\t}\n\n\t\tif ( value !== undefined ) {\n\t\t\tif ( hooks && "set" in hooks &&\n\t\t\t\t( ret = hooks.set( elem, value, name ) ) !== undefined ) {\n\t\t\t\treturn ret;\n\t\t\t}\n\n\t\t\treturn ( elem[ name ] = value );\n\t\t}\n\n\t\tif ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {\n\t\t\treturn ret;\n\t\t}\n\n\t\treturn elem[ name ];\n\t},\n\n\tpropHooks: {\n\t\ttabIndex: {\n\t\t\tget: function( elem ) {\n\n\t\t\t\t// elem.tabIndex doesn\'t always return the\n\t\t\t\t// correct value when it hasn\'t been explicitly set\n\t\t\t\t// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/\n\t\t\t\t// Use proper attribute retrieval(#12072)\n\t\t\t\tvar tabindex = jQuery.find.attr( elem, "tabindex" );\n\n\t\t\t\treturn tabindex ?\n\t\t\t\t\tparseInt( tabindex, 10 ) :\n\t\t\t\t\trfocusable.test( elem.nodeName ) ||\n\t\t\t\t\t\trclickable.test( elem.nodeName ) && elem.href ?\n\t\t\t\t\t\t\t0 :\n\t\t\t\t\t\t\t-1;\n\t\t\t}\n\t\t}\n\t},\n\n\tpropFix: {\n\t\t"for": "htmlFor",\n\t\t"class": "className"\n\t}\n} );\n\n// Support: IE <=11 only\n// Accessing the selectedIndex property\n// forces the browser to respect setting selected\n// on the option\n// The getter ensures a default option is selected\n// when in an optgroup\nif ( !support.optSelected ) {\n\tjQuery.propHooks.selected = {\n\t\tget: function( elem ) {\n\t\t\tvar parent = elem.parentNode;\n\t\t\tif ( parent && parent.parentNode ) {\n\t\t\t\tparent.parentNode.selectedIndex;\n\t\t\t}\n\t\t\treturn null;\n\t\t},\n\t\tset: function( elem ) {\n\t\t\tvar parent = elem.parentNode;\n\t\t\tif ( parent ) {\n\t\t\t\tparent.selectedIndex;\n\n\t\t\t\tif ( parent.parentNode ) {\n\t\t\t\t\tparent.parentNode.selectedIndex;\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t};\n}\n\njQuery.each( [\n\t"tabIndex",\n\t"readOnly",\n\t"maxLength",\n\t"cellSpacing",\n\t"cellPadding",\n\t"rowSpan",\n\t"colSpan",\n\t"useMap",\n\t"frameBorder",\n\t"contentEditable"\n], function() {\n\tjQuery.propFix[ this.toLowerCase() ] = this;\n} );\n\n\n\n\nvar rclass = /[\\t\\r\\n\\f]/g;\n\nfunction getClass( elem ) {\n\treturn elem.getAttribute && elem.getAttribute( "class" ) || "";\n}\n\njQuery.fn.extend( {\n\taddClass: function( value ) {\n\t\tvar classes, elem, cur, curValue, clazz, j, finalValue,\n\t\t\ti = 0;\n\n\t\tif ( jQuery.isFunction( value ) ) {\n\t\t\treturn this.each( function( j ) {\n\t\t\t\tjQuery( this ).addClass( value.call( this, j, getClass( this ) ) );\n\t\t\t} );\n\t\t}\n\n\t\tif ( typeof value === "string" && value ) {\n\t\t\tclasses = value.match( rnotwhite ) || [];\n\n\t\t\twhile ( ( elem = this[ i++ ] ) ) {\n\t\t\t\tcurValue = getClass( elem );\n\t\t\t\tcur = elem.nodeType === 1 &&\n\t\t\t\t\t( " " + curValue + " " ).replace( rclass, " " );\n\n\t\t\t\tif ( cur ) {\n\t\t\t\t\tj = 0;\n\t\t\t\t\twhile ( ( clazz = classes[ j++ ] ) ) {\n\t\t\t\t\t\tif ( cur.indexOf( " " + clazz + " " ) < 0 ) {\n\t\t\t\t\t\t\tcur += clazz + " ";\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\n\t\t\t\t\t// Only assign if different to avoid unneeded rendering.\n\t\t\t\t\tfinalValue = jQuery.trim( cur );\n\t\t\t\t\tif ( curValue !== finalValue ) {\n\t\t\t\t\t\telem.setAttribute( "class", finalValue );\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\n\t\treturn this;\n\t},\n\n\tremoveClass: function( value ) {\n\t\tvar classes, elem, cur, curValue, clazz, j, finalValue,\n\t\t\ti = 0;\n\n\t\tif ( jQuery.isFunction( value ) ) {\n\t\t\treturn this.each( function( j ) {\n\t\t\t\tjQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );\n\t\t\t} );\n\t\t}\n\n\t\tif ( !arguments.length ) {\n\t\t\treturn this.attr( "class", "" );\n\t\t}\n\n\t\tif ( typeof value === "string" && value ) {\n\t\t\tclasses = value.match( rnotwhite ) || [];\n\n\t\t\twhile ( ( elem = this[ i++ ] ) ) {\n\t\t\t\tcurValue = getClass( elem );\n\n\t\t\t\t// This expression is here for better compressibility (see addClass)\n\t\t\t\tcur = elem.nodeType === 1 &&\n\t\t\t\t\t( " " + curValue + " " ).replace( rclass, " " );\n\n\t\t\t\tif ( cur ) {\n\t\t\t\t\tj = 0;\n\t\t\t\t\twhile ( ( clazz = classes[ j++ ] ) ) {\n\n\t\t\t\t\t\t// Remove *all* instances\n\t\t\t\t\t\twhile ( cur.indexOf( " " + clazz + " " ) > -1 ) {\n\t\t\t\t\t\t\tcur = cur.replace( " " + clazz + " ", " " );\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\n\t\t\t\t\t// Only assign if different to avoid unneeded rendering.\n\t\t\t\t\tfinalValue = jQuery.trim( cur );\n\t\t\t\t\tif ( curValue !== finalValue ) {\n\t\t\t\t\t\telem.setAttribute( "class", finalValue );\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\n\t\treturn this;\n\t},\n\n\ttoggleClass: function( value, stateVal ) {\n\t\tvar type = typeof value;\n\n\t\tif ( typeof stateVal === "boolean" && type === "string" ) {\n\t\t\treturn stateVal ? this.addClass( value ) : this.removeClass( value );\n\t\t}\n\n\t\tif ( jQuery.isFunction( value ) ) {\n\t\t\treturn this.each( function( i ) {\n\t\t\t\tjQuery( this ).toggleClass(\n\t\t\t\t\tvalue.call( this, i, getClass( this ), stateVal ),\n\t\t\t\t\tstateVal\n\t\t\t\t);\n\t\t\t} );\n\t\t}\n\n\t\treturn this.each( function() {\n\t\t\tvar className, i, self, classNames;\n\n\t\t\tif ( type === "string" ) {\n\n\t\t\t\t// Toggle individual class names\n\t\t\t\ti = 0;\n\t\t\t\tself = jQuery( this );\n\t\t\t\tclassNames = value.match( rnotwhite ) || [];\n\n\t\t\t\twhile ( ( className = classNames[ i++ ] ) ) {\n\n\t\t\t\t\t// Check each className given, space separated list\n\t\t\t\t\tif ( self.hasClass( className ) ) {\n\t\t\t\t\t\tself.removeClass( className );\n\t\t\t\t\t} else {\n\t\t\t\t\t\tself.addClass( className );\n\t\t\t\t\t}\n\t\t\t\t}\n\n\t\t\t// Toggle whole class name\n\t\t\t} else if ( value === undefined || type === "boolean" ) {\n\t\t\t\tclassName = getClass( this );\n\t\t\t\tif ( className ) {\n\n\t\t\t\t\t// Store className if set\n\t\t\t\t\tdataPriv.set( this, "__className__", className );\n\t\t\t\t}\n\n\t\t\t\t// If the element has a class name or if we\'re passed `false`,\n\t\t\t\t// then remove the whole classname (if there was one, the above saved it).\n\t\t\t\t// Otherwise bring back whatever was previously saved (if anything),\n\t\t\t\t// falling back to the empty string if nothing was stored.\n\t\t\t\tif ( this.setAttribute ) {\n\t\t\t\t\tthis.setAttribute( "class",\n\t\t\t\t\t\tclassName || value === false ?\n\t\t\t\t\t\t"" :\n\t\t\t\t\t\tdataPriv.get( this, "__className__" ) || ""\n\t\t\t\t\t);\n\t\t\t\t}\n\t\t\t}\n\t\t} );\n\t},\n\n\thasClass: function( selector ) {\n\t\tvar className, elem,\n\t\t\ti = 0;\n\n\t\tclassName = " " + selector + " ";\n\t\twhile ( ( elem = this[ i++ ] ) ) {\n\t\t\tif ( elem.nodeType === 1 &&\n\t\t\t\t( " " + getClass( elem ) + " " ).replace( rclass, " " )\n\t\t\t\t\t.indexOf( className ) > -1\n\t\t\t) {\n\t\t\t\treturn true;\n\t\t\t}\n\t\t}\n\n\t\treturn false;\n\t}\n} );\n\n\n\n\nvar rreturn = /\\r/g,\n\trspaces = /[\\x20\\t\\r\\n\\f]+/g;\n\njQuery.fn.extend( {\n\tval: function( value ) {\n\t\tvar hooks, ret, isFunction,\n\t\t\telem = this[ 0 ];\n\n\t\tif ( !arguments.length ) {\n\t\t\tif ( elem ) {\n\t\t\t\thooks = jQuery.valHooks[ elem.type ] ||\n\t\t\t\t\tjQuery.valHooks[ elem.nodeName.toLowerCase() ];\n\n\t\t\t\tif ( hooks &&\n\t\t\t\t\t"get" in hooks &&\n\t\t\t\t\t( ret = hooks.get( elem, "value" ) ) !== undefined\n\t\t\t\t) {\n\t\t\t\t\treturn ret;\n\t\t\t\t}\n\n\t\t\t\tret = elem.value;\n\n\t\t\t\treturn typeof ret === "string" ?\n\n\t\t\t\t\t// Handle most common string cases\n\t\t\t\t\tret.replace( rreturn, "" ) :\n\n\t\t\t\t\t// Handle cases where value is null/undef or number\n\t\t\t\t\tret == null ? "" : ret;\n\t\t\t}\n\n\t\t\treturn;\n\t\t}\n\n\t\tisFunction = jQuery.isFunction( value );\n\n\t\treturn this.each( function( i ) {\n\t\t\tvar val;\n\n\t\t\tif ( this.nodeType !== 1 ) {\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\tif ( isFunction ) {\n\t\t\t\tval = value.call( this, i, jQuery( this ).val() );\n\t\t\t} else {\n\t\t\t\tval = value;\n\t\t\t}\n\n\t\t\t// Treat null/undefined as ""; convert numbers to string\n\t\t\tif ( val == null ) {\n\t\t\t\tval = "";\n\n\t\t\t} else if ( typeof val === "number" ) {\n\t\t\t\tval += "";\n\n\t\t\t} else if ( jQuery.isArray( val ) ) {\n\t\t\t\tval = jQuery.map( val, function( value ) {\n\t\t\t\t\treturn value == null ? "" : value + "";\n\t\t\t\t} );\n\t\t\t}\n\n\t\t\thooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];\n\n\t\t\t// If set returns undefined, fall back to normal setting\n\t\t\tif ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {\n\t\t\t\tthis.value = val;\n\t\t\t}\n\t\t} );\n\t}\n} );\n\njQuery.extend( {\n\tvalHooks: {\n\t\toption: {\n\t\t\tget: function( elem ) {\n\n\t\t\t\tvar val = jQuery.find.attr( elem, "value" );\n\t\t\t\treturn val != null ?\n\t\t\t\t\tval :\n\n\t\t\t\t\t// Support: IE10-11+\n\t\t\t\t\t// option.text throws exceptions (#14686, #14858)\n\t\t\t\t\t// Strip and collapse whitespace\n\t\t\t\t\t// https://html.spec.whatwg.org/#strip-and-collapse-whitespace\n\t\t\t\t\tjQuery.trim( jQuery.text( elem ) ).replace( rspaces, " " );\n\t\t\t}\n\t\t},\n\t\tselect: {\n\t\t\tget: function( elem ) {\n\t\t\t\tvar value, option,\n\t\t\t\t\toptions = elem.options,\n\t\t\t\t\tindex = elem.selectedIndex,\n\t\t\t\t\tone = elem.type === "select-one" || index < 0,\n\t\t\t\t\tvalues = one ? null : [],\n\t\t\t\t\tmax = one ? index + 1 : options.length,\n\t\t\t\t\ti = index < 0 ?\n\t\t\t\t\t\tmax :\n\t\t\t\t\t\tone ? index : 0;\n\n\t\t\t\t// Loop through all the selected options\n\t\t\t\tfor ( ; i < max; i++ ) {\n\t\t\t\t\toption = options[ i ];\n\n\t\t\t\t\t// IE8-9 doesn\'t update selected after form reset (#2551)\n\t\t\t\t\tif ( ( option.selected || i === index ) &&\n\n\t\t\t\t\t\t\t// Don\'t return options that are disabled or in a disabled optgroup\n\t\t\t\t\t\t\t( support.optDisabled ?\n\t\t\t\t\t\t\t\t!option.disabled : option.getAttribute( "disabled" ) === null ) &&\n\t\t\t\t\t\t\t( !option.parentNode.disabled ||\n\t\t\t\t\t\t\t\t!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {\n\n\t\t\t\t\t\t// Get the specific value for the option\n\t\t\t\t\t\tvalue = jQuery( option ).val();\n\n\t\t\t\t\t\t// We don\'t need an array for one selects\n\t\t\t\t\t\tif ( one ) {\n\t\t\t\t\t\t\treturn value;\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\t// Multi-Selects return an array\n\t\t\t\t\t\tvalues.push( value );\n\t\t\t\t\t}\n\t\t\t\t}\n\n\t\t\t\treturn values;\n\t\t\t},\n\n\t\t\tset: function( elem, value ) {\n\t\t\t\tvar optionSet, option,\n\t\t\t\t\toptions = elem.options,\n\t\t\t\t\tvalues = jQuery.makeArray( value ),\n\t\t\t\t\ti = options.length;\n\n\t\t\t\twhile ( i-- ) {\n\t\t\t\t\toption = options[ i ];\n\t\t\t\t\tif ( option.selected =\n\t\t\t\t\t\tjQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1\n\t\t\t\t\t) {\n\t\t\t\t\t\toptionSet = true;\n\t\t\t\t\t}\n\t\t\t\t}\n\n\t\t\t\t// Force browsers to behave consistently when non-matching value is set\n\t\t\t\tif ( !optionSet ) {\n\t\t\t\t\telem.selectedIndex = -1;\n\t\t\t\t}\n\t\t\t\treturn values;\n\t\t\t}\n\t\t}\n\t}\n} );\n\n// Radios and checkboxes getter/setter\njQuery.each( [ "radio", "checkbox" ], function() {\n\tjQuery.valHooks[ this ] = {\n\t\tset: function( elem, value ) {\n\t\t\tif ( jQuery.isArray( value ) ) {\n\t\t\t\treturn ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );\n\t\t\t}\n\t\t}\n\t};\n\tif ( !support.checkOn ) {\n\t\tjQuery.valHooks[ this ].get = function( elem ) {\n\t\t\treturn elem.getAttribute( "value" ) === null ? "on" : elem.value;\n\t\t};\n\t}\n} );\n\n\n\n\n// Return jQuery for attributes-only inclusion\n\n\nvar rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;\n\njQuery.extend( jQuery.event, {\n\n\ttrigger: function( event, data, elem, onlyHandlers ) {\n\n\t\tvar i, cur, tmp, bubbleType, ontype, handle, special,\n\t\t\teventPath = [ elem || document ],\n\t\t\ttype = hasOwn.call( event, "type" ) ? event.type : event,\n\t\t\tnamespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];\n\n\t\tcur = tmp = elem = elem || document;\n\n\t\t// Don\'t do events on text and comment nodes\n\t\tif ( elem.nodeType === 3 || elem.nodeType === 8 ) {\n\t\t\treturn;\n\t\t}\n\n\t\t// focus/blur morphs to focusin/out; ensure we\'re not firing them right now\n\t\tif ( rfocusMorph.test( type + jQuery.event.triggered ) ) {\n\t\t\treturn;\n\t\t}\n\n\t\tif ( type.indexOf( "." ) > -1 ) {\n\n\t\t\t// Namespaced trigger; create a regexp to match event type in handle()\n\t\t\tnamespaces = type.split( "." );\n\t\t\ttype = namespaces.shift();\n\t\t\tnamespaces.sort();\n\t\t}\n\t\tontype = type.indexOf( ":" ) < 0 && "on" + type;\n\n\t\t// Caller can pass in a jQuery.Event object, Object, or just an event type string\n\t\tevent = event[ jQuery.expando ] ?\n\t\t\tevent :\n\t\t\tnew jQuery.Event( type, typeof event === "object" && event );\n\n\t\t// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)\n\t\tevent.isTrigger = onlyHandlers ? 2 : 3;\n\t\tevent.namespace = namespaces.join( "." );\n\t\tevent.rnamespace = event.namespace ?\n\t\t\tnew RegExp( "(^|\\\\.)" + namespaces.join( "\\\\.(?:.*\\\\.|)" ) + "(\\\\.|$)" ) :\n\t\t\tnull;\n\n\t\t// Clean up the event in case it is being reused\n\t\tevent.result = undefined;\n\t\tif ( !event.target ) {\n\t\t\tevent.target = elem;\n\t\t}\n\n\t\t// Clone any incoming data and prepend the event, creating the handler arg list\n\t\tdata = data == null ?\n\t\t\t[ event ] :\n\t\t\tjQuery.makeArray( data, [ event ] );\n\n\t\t// Allow special events to draw outside the lines\n\t\tspecial = jQuery.event.special[ type ] || {};\n\t\tif ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {\n\t\t\treturn;\n\t\t}\n\n\t\t// Determine event propagation path in advance, per W3C events spec (#9951)\n\t\t// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)\n\t\tif ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {\n\n\t\t\tbubbleType = special.delegateType || type;\n\t\t\tif ( !rfocusMorph.test( bubbleType + type ) ) {\n\t\t\t\tcur = cur.parentNode;\n\t\t\t}\n\t\t\tfor ( ; cur; cur = cur.parentNode ) {\n\t\t\t\teventPath.push( cur );\n\t\t\t\ttmp = cur;\n\t\t\t}\n\n\t\t\t// Only add window if we got to document (e.g., not plain obj or detached DOM)\n\t\t\tif ( tmp === ( elem.ownerDocument || document ) ) {\n\t\t\t\teventPath.push( tmp.defaultView || tmp.parentWindow || window );\n\t\t\t}\n\t\t}\n\n\t\t// Fire handlers on the event path\n\t\ti = 0;\n\t\twhile ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {\n\n\t\t\tevent.type = i > 1 ?\n\t\t\t\tbubbleType :\n\t\t\t\tspecial.bindType || type;\n\n\t\t\t// jQuery handler\n\t\t\thandle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&\n\t\t\t\tdataPriv.get( cur, "handle" );\n\t\t\tif ( handle ) {\n\t\t\t\thandle.apply( cur, data );\n\t\t\t}\n\n\t\t\t// Native handler\n\t\t\thandle = ontype && cur[ ontype ];\n\t\t\tif ( handle && handle.apply && acceptData( cur ) ) {\n\t\t\t\tevent.result = handle.apply( cur, data );\n\t\t\t\tif ( event.result === false ) {\n\t\t\t\t\tevent.preventDefault();\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\tevent.type = type;\n\n\t\t// If nobody prevented the default action, do it now\n\t\tif ( !onlyHandlers && !event.isDefaultPrevented() ) {\n\n\t\t\tif ( ( !special._default ||\n\t\t\t\tspecial._default.apply( eventPath.pop(), data ) === false ) &&\n\t\t\t\tacceptData( elem ) ) {\n\n\t\t\t\t// Call a native DOM method on the target with the same name name as the event.\n\t\t\t\t// Don\'t do default actions on window, that\'s where global variables be (#6170)\n\t\t\t\tif ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {\n\n\t\t\t\t\t// Don\'t re-trigger an onFOO event when we call its FOO() method\n\t\t\t\t\ttmp = elem[ ontype ];\n\n\t\t\t\t\tif ( tmp ) {\n\t\t\t\t\t\telem[ ontype ] = null;\n\t\t\t\t\t}\n\n\t\t\t\t\t// Prevent re-triggering of the same event, since we already bubbled it above\n\t\t\t\t\tjQuery.event.triggered = type;\n\t\t\t\t\telem[ type ]();\n\t\t\t\t\tjQuery.event.triggered = undefined;\n\n\t\t\t\t\tif ( tmp ) {\n\t\t\t\t\t\telem[ ontype ] = tmp;\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\n\t\treturn event.result;\n\t},\n\n\t// Piggyback on a donor event to simulate a different one\n\t// Used only for `focus(in | out)` events\n\tsimulate: function( type, elem, event ) {\n\t\tvar e = jQuery.extend(\n\t\t\tnew jQuery.Event(),\n\t\t\tevent,\n\t\t\t{\n\t\t\t\ttype: type,\n\t\t\t\tisSimulated: true\n\t\t\t}\n\t\t);\n\n\t\tjQuery.event.trigger( e, null, elem );\n\t}\n\n} );\n\njQuery.fn.extend( {\n\n\ttrigger: function( type, data ) {\n\t\treturn this.each( function() {\n\t\t\tjQuery.event.trigger( type, data, this );\n\t\t} );\n\t},\n\ttriggerHandler: function( type, data ) {\n\t\tvar elem = this[ 0 ];\n\t\tif ( elem ) {\n\t\t\treturn jQuery.event.trigger( type, data, elem, true );\n\t\t}\n\t}\n} );\n\n\njQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +\n\t"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +\n\t"change select submit keydown keypress keyup error contextmenu" ).split( " " ),\n\tfunction( i, name ) {\n\n\t// Handle event binding\n\tjQuery.fn[ name ] = function( data, fn ) {\n\t\treturn arguments.length > 0 ?\n\t\t\tthis.on( name, null, data, fn ) :\n\t\t\tthis.trigger( name );\n\t};\n} );\n\njQuery.fn.extend( {\n\thover: function( fnOver, fnOut ) {\n\t\treturn this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );\n\t}\n} );\n\n\n\n\nsupport.focusin = "onfocusin" in window;\n\n\n// Support: Firefox\n// Firefox doesn\'t have focus(in | out) events\n// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787\n//\n// Support: Chrome, Safari\n// focus(in | out) events fire after focus & blur events,\n// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order\n// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857\nif ( !support.focusin ) {\n\tjQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {\n\n\t\t// Attach a single capturing handler on the document while someone wants focusin/focusout\n\t\tvar handler = function( event ) {\n\t\t\tjQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );\n\t\t};\n\n\t\tjQuery.event.special[ fix ] = {\n\t\t\tsetup: function() {\n\t\t\t\tvar doc = this.ownerDocument || this,\n\t\t\t\t\tattaches = dataPriv.access( doc, fix );\n\n\t\t\t\tif ( !attaches ) {\n\t\t\t\t\tdoc.addEventListener( orig, handler, true );\n\t\t\t\t}\n\t\t\t\tdataPriv.access( doc, fix, ( attaches || 0 ) + 1 );\n\t\t\t},\n\t\t\tteardown: function() {\n\t\t\t\tvar doc = this.ownerDocument || this,\n\t\t\t\t\tattaches = dataPriv.access( doc, fix ) - 1;\n\n\t\t\t\tif ( !attaches ) {\n\t\t\t\t\tdoc.removeEventListener( orig, handler, true );\n\t\t\t\t\tdataPriv.remove( doc, fix );\n\n\t\t\t\t} else {\n\t\t\t\t\tdataPriv.access( doc, fix, attaches );\n\t\t\t\t}\n\t\t\t}\n\t\t};\n\t} );\n}\nvar location = window.location;\n\nvar nonce = jQuery.now();\n\nvar rquery = ( /\\?/ );\n\n\n\n// Support: Android 2.3\n// Workaround failure to string-cast null input\njQuery.parseJSON = function( data ) {\n\treturn JSON.parse( data + "" );\n};\n\n\n// Cross-browser xml parsing\njQuery.parseXML = function( data ) {\n\tvar xml;\n\tif ( !data || typeof data !== "string" ) {\n\t\treturn null;\n\t}\n\n\t// Support: IE9\n\ttry {\n\t\txml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );\n\t} catch ( e ) {\n\t\txml = undefined;\n\t}\n\n\tif ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {\n\t\tjQuery.error( "Invalid XML: " + data );\n\t}\n\treturn xml;\n};\n\n\nvar\n\trhash = /#.*$/,\n\trts = /([?&])_=[^&]*/,\n\trheaders = /^(.*?):[ \\t]*([^\\r\\n]*)$/mg,\n\n\t// #7653, #8125, #8152: local protocol detection\n\trlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,\n\trnoContent = /^(?:GET|HEAD)$/,\n\trprotocol = /^\\/\\//,\n\n\t/* Prefilters\n\t * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)\n\t * 2) These are called:\n\t *    - BEFORE asking for a transport\n\t *    - AFTER param serialization (s.data is a string if s.processData is true)\n\t * 3) key is the dataType\n\t * 4) the catchall symbol "*" can be used\n\t * 5) execution will start with transport dataType and THEN continue down to "*" if needed\n\t */\n\tprefilters = {},\n\n\t/* Transports bindings\n\t * 1) key is the dataType\n\t * 2) the catchall symbol "*" can be used\n\t * 3) selection will start with transport dataType and THEN go to "*" if needed\n\t */\n\ttransports = {},\n\n\t// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression\n\tallTypes = "*/".concat( "*" ),\n\n\t// Anchor tag for parsing the document origin\n\toriginAnchor = document.createElement( "a" );\n\toriginAnchor.href = location.href;\n\n// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport\nfunction addToPrefiltersOrTransports( structure ) {\n\n\t// dataTypeExpression is optional and defaults to "*"\n\treturn function( dataTypeExpression, func ) {\n\n\t\tif ( typeof dataTypeExpression !== "string" ) {\n\t\t\tfunc = dataTypeExpression;\n\t\t\tdataTypeExpression = "*";\n\t\t}\n\n\t\tvar dataType,\n\t\t\ti = 0,\n\t\t\tdataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];\n\n\t\tif ( jQuery.isFunction( func ) ) {\n\n\t\t\t// For each dataType in the dataTypeExpression\n\t\t\twhile ( ( dataType = dataTypes[ i++ ] ) ) {\n\n\t\t\t\t// Prepend if requested\n\t\t\t\tif ( dataType[ 0 ] === "+" ) {\n\t\t\t\t\tdataType = dataType.slice( 1 ) || "*";\n\t\t\t\t\t( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );\n\n\t\t\t\t// Otherwise append\n\t\t\t\t} else {\n\t\t\t\t\t( structure[ dataType ] = structure[ dataType ] || [] ).push( func );\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t};\n}\n\n// Base inspection function for prefilters and transports\nfunction inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {\n\n\tvar inspected = {},\n\t\tseekingTransport = ( structure === transports );\n\n\tfunction inspect( dataType ) {\n\t\tvar selected;\n\t\tinspected[ dataType ] = true;\n\t\tjQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {\n\t\t\tvar dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );\n\t\t\tif ( typeof dataTypeOrTransport === "string" &&\n\t\t\t\t!seekingTransport && !inspected[ dataTypeOrTransport ] ) {\n\n\t\t\t\toptions.dataTypes.unshift( dataTypeOrTransport );\n\t\t\t\tinspect( dataTypeOrTransport );\n\t\t\t\treturn false;\n\t\t\t} else if ( seekingTransport ) {\n\t\t\t\treturn !( selected = dataTypeOrTransport );\n\t\t\t}\n\t\t} );\n\t\treturn selected;\n\t}\n\n\treturn inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );\n}\n\n// A special extend for ajax options\n// that takes "flat" options (not to be deep extended)\n// Fixes #9887\nfunction ajaxExtend( target, src ) {\n\tvar key, deep,\n\t\tflatOptions = jQuery.ajaxSettings.flatOptions || {};\n\n\tfor ( key in src ) {\n\t\tif ( src[ key ] !== undefined ) {\n\t\t\t( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];\n\t\t}\n\t}\n\tif ( deep ) {\n\t\tjQuery.extend( true, target, deep );\n\t}\n\n\treturn target;\n}\n\n/* Handles responses to an ajax request:\n * - finds the right dataType (mediates between content-type and expected dataType)\n * - returns the corresponding response\n */\nfunction ajaxHandleResponses( s, jqXHR, responses ) {\n\n\tvar ct, type, finalDataType, firstDataType,\n\t\tcontents = s.contents,\n\t\tdataTypes = s.dataTypes;\n\n\t// Remove auto dataType and get content-type in the process\n\twhile ( dataTypes[ 0 ] === "*" ) {\n\t\tdataTypes.shift();\n\t\tif ( ct === undefined ) {\n\t\t\tct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );\n\t\t}\n\t}\n\n\t// Check if we\'re dealing with a known content-type\n\tif ( ct ) {\n\t\tfor ( type in contents ) {\n\t\t\tif ( contents[ type ] && contents[ type ].test( ct ) ) {\n\t\t\t\tdataTypes.unshift( type );\n\t\t\t\tbreak;\n\t\t\t}\n\t\t}\n\t}\n\n\t// Check to see if we have a response for the expected dataType\n\tif ( dataTypes[ 0 ] in responses ) {\n\t\tfinalDataType = dataTypes[ 0 ];\n\t} else {\n\n\t\t// Try convertible dataTypes\n\t\tfor ( type in responses ) {\n\t\t\tif ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {\n\t\t\t\tfinalDataType = type;\n\t\t\t\tbreak;\n\t\t\t}\n\t\t\tif ( !firstDataType ) {\n\t\t\t\tfirstDataType = type;\n\t\t\t}\n\t\t}\n\n\t\t// Or just use first one\n\t\tfinalDataType = finalDataType || firstDataType;\n\t}\n\n\t// If we found a dataType\n\t// We add the dataType to the list if needed\n\t// and return the corresponding response\n\tif ( finalDataType ) {\n\t\tif ( finalDataType !== dataTypes[ 0 ] ) {\n\t\t\tdataTypes.unshift( finalDataType );\n\t\t}\n\t\treturn responses[ finalDataType ];\n\t}\n}\n\n/* Chain conversions given the request and the original response\n * Also sets the responseXXX fields on the jqXHR instance\n */\nfunction ajaxConvert( s, response, jqXHR, isSuccess ) {\n\tvar conv2, current, conv, tmp, prev,\n\t\tconverters = {},\n\n\t\t// Work with a copy of dataTypes in case we need to modify it for conversion\n\t\tdataTypes = s.dataTypes.slice();\n\n\t// Create converters map with lowercased keys\n\tif ( dataTypes[ 1 ] ) {\n\t\tfor ( conv in s.converters ) {\n\t\t\tconverters[ conv.toLowerCase() ] = s.converters[ conv ];\n\t\t}\n\t}\n\n\tcurrent = dataTypes.shift();\n\n\t// Convert to each sequential dataType\n\twhile ( current ) {\n\n\t\tif ( s.responseFields[ current ] ) {\n\t\t\tjqXHR[ s.responseFields[ current ] ] = response;\n\t\t}\n\n\t\t// Apply the dataFilter if provided\n\t\tif ( !prev && isSuccess && s.dataFilter ) {\n\t\t\tresponse = s.dataFilter( response, s.dataType );\n\t\t}\n\n\t\tprev = current;\n\t\tcurrent = dataTypes.shift();\n\n\t\tif ( current ) {\n\n\t\t// There\'s only work to do if current dataType is non-auto\n\t\t\tif ( current === "*" ) {\n\n\t\t\t\tcurrent = prev;\n\n\t\t\t// Convert response if prev dataType is non-auto and differs from current\n\t\t\t} else if ( prev !== "*" && prev !== current ) {\n\n\t\t\t\t// Seek a direct converter\n\t\t\t\tconv = converters[ prev + " " + current ] || converters[ "* " + current ];\n\n\t\t\t\t// If none found, seek a pair\n\t\t\t\tif ( !conv ) {\n\t\t\t\t\tfor ( conv2 in converters ) {\n\n\t\t\t\t\t\t// If conv2 outputs current\n\t\t\t\t\t\ttmp = conv2.split( " " );\n\t\t\t\t\t\tif ( tmp[ 1 ] === current ) {\n\n\t\t\t\t\t\t\t// If prev can be converted to accepted input\n\t\t\t\t\t\t\tconv = converters[ prev + " " + tmp[ 0 ] ] ||\n\t\t\t\t\t\t\t\tconverters[ "* " + tmp[ 0 ] ];\n\t\t\t\t\t\t\tif ( conv ) {\n\n\t\t\t\t\t\t\t\t// Condense equivalence converters\n\t\t\t\t\t\t\t\tif ( conv === true ) {\n\t\t\t\t\t\t\t\t\tconv = converters[ conv2 ];\n\n\t\t\t\t\t\t\t\t// Otherwise, insert the intermediate dataType\n\t\t\t\t\t\t\t\t} else if ( converters[ conv2 ] !== true ) {\n\t\t\t\t\t\t\t\t\tcurrent = tmp[ 0 ];\n\t\t\t\t\t\t\t\t\tdataTypes.unshift( tmp[ 1 ] );\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\n\t\t\t\t// Apply converter (if not an equivalence)\n\t\t\t\tif ( conv !== true ) {\n\n\t\t\t\t\t// Unless errors are allowed to bubble, catch and return them\n\t\t\t\t\tif ( conv && s.throws ) {\n\t\t\t\t\t\tresponse = conv( response );\n\t\t\t\t\t} else {\n\t\t\t\t\t\ttry {\n\t\t\t\t\t\t\tresponse = conv( response );\n\t\t\t\t\t\t} catch ( e ) {\n\t\t\t\t\t\t\treturn {\n\t\t\t\t\t\t\t\tstate: "parsererror",\n\t\t\t\t\t\t\t\terror: conv ? e : "No conversion from " + prev + " to " + current\n\t\t\t\t\t\t\t};\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n\n\treturn { state: "success", data: response };\n}\n\njQuery.extend( {\n\n\t// Counter for holding the number of active queries\n\tactive: 0,\n\n\t// Last-Modified header cache for next request\n\tlastModified: {},\n\tetag: {},\n\n\tajaxSettings: {\n\t\turl: location.href,\n\t\ttype: "GET",\n\t\tisLocal: rlocalProtocol.test( location.protocol ),\n\t\tglobal: true,\n\t\tprocessData: true,\n\t\tasync: true,\n\t\tcontentType: "application/x-www-form-urlencoded; charset=UTF-8",\n\t\t/*\n\t\ttimeout: 0,\n\t\tdata: null,\n\t\tdataType: null,\n\t\tusername: null,\n\t\tpassword: null,\n\t\tcache: null,\n\t\tthrows: false,\n\t\ttraditional: false,\n\t\theaders: {},\n\t\t*/\n\n\t\taccepts: {\n\t\t\t"*": allTypes,\n\t\t\ttext: "text/plain",\n\t\t\thtml: "text/html",\n\t\t\txml: "application/xml, text/xml",\n\t\t\tjson: "application/json, text/javascript"\n\t\t},\n\n\t\tcontents: {\n\t\t\txml: /\\bxml\\b/,\n\t\t\thtml: /\\bhtml/,\n\t\t\tjson: /\\bjson\\b/\n\t\t},\n\n\t\tresponseFields: {\n\t\t\txml: "responseXML",\n\t\t\ttext: "responseText",\n\t\t\tjson: "responseJSON"\n\t\t},\n\n\t\t// Data converters\n\t\t// Keys separate source (or catchall "*") and destination types with a single space\n\t\tconverters: {\n\n\t\t\t// Convert anything to text\n\t\t\t"* text": String,\n\n\t\t\t// Text to html (true = no transformation)\n\t\t\t"text html": true,\n\n\t\t\t// Evaluate text as a json expression\n\t\t\t"text json": jQuery.parseJSON,\n\n\t\t\t// Parse text as xml\n\t\t\t"text xml": jQuery.parseXML\n\t\t},\n\n\t\t// For options that shouldn\'t be deep extended:\n\t\t// you can add your own custom options here if\n\t\t// and when you create one that shouldn\'t be\n\t\t// deep extended (see ajaxExtend)\n\t\tflatOptions: {\n\t\t\turl: true,\n\t\t\tcontext: true\n\t\t}\n\t},\n\n\t// Creates a full fledged settings object into target\n\t// with both ajaxSettings and settings fields.\n\t// If target is omitted, writes into ajaxSettings.\n\tajaxSetup: function( target, settings ) {\n\t\treturn settings ?\n\n\t\t\t// Building a settings object\n\t\t\tajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :\n\n\t\t\t// Extending ajaxSettings\n\t\t\tajaxExtend( jQuery.ajaxSettings, target );\n\t},\n\n\tajaxPrefilter: addToPrefiltersOrTransports( prefilters ),\n\tajaxTransport: addToPrefiltersOrTransports( transports ),\n\n\t// Main method\n\tajax: function( url, options ) {\n\n\t\t// If url is an object, simulate pre-1.5 signature\n\t\tif ( typeof url === "object" ) {\n\t\t\toptions = url;\n\t\t\turl = undefined;\n\t\t}\n\n\t\t// Force options to be an object\n\t\toptions = options || {};\n\n\t\tvar transport,\n\n\t\t\t// URL without anti-cache param\n\t\t\tcacheURL,\n\n\t\t\t// Response headers\n\t\t\tresponseHeadersString,\n\t\t\tresponseHeaders,\n\n\t\t\t// timeout handle\n\t\t\ttimeoutTimer,\n\n\t\t\t// Url cleanup var\n\t\t\turlAnchor,\n\n\t\t\t// To know if global events are to be dispatched\n\t\t\tfireGlobals,\n\n\t\t\t// Loop variable\n\t\t\ti,\n\n\t\t\t// Create the final options object\n\t\t\ts = jQuery.ajaxSetup( {}, options ),\n\n\t\t\t// Callbacks context\n\t\t\tcallbackContext = s.context || s,\n\n\t\t\t// Context for global events is callbackContext if it is a DOM node or jQuery collection\n\t\t\tglobalEventContext = s.context &&\n\t\t\t\t( callbackContext.nodeType || callbackContext.jquery ) ?\n\t\t\t\t\tjQuery( callbackContext ) :\n\t\t\t\t\tjQuery.event,\n\n\t\t\t// Deferreds\n\t\t\tdeferred = jQuery.Deferred(),\n\t\t\tcompleteDeferred = jQuery.Callbacks( "once memory" ),\n\n\t\t\t// Status-dependent callbacks\n\t\t\tstatusCode = s.statusCode || {},\n\n\t\t\t// Headers (they are sent all at once)\n\t\t\trequestHeaders = {},\n\t\t\trequestHeadersNames = {},\n\n\t\t\t// The jqXHR state\n\t\t\tstate = 0,\n\n\t\t\t// Default abort message\n\t\t\tstrAbort = "canceled",\n\n\t\t\t// Fake xhr\n\t\t\tjqXHR = {\n\t\t\t\treadyState: 0,\n\n\t\t\t\t// Builds headers hashtable if needed\n\t\t\t\tgetResponseHeader: function( key ) {\n\t\t\t\t\tvar match;\n\t\t\t\t\tif ( state === 2 ) {\n\t\t\t\t\t\tif ( !responseHeaders ) {\n\t\t\t\t\t\t\tresponseHeaders = {};\n\t\t\t\t\t\t\twhile ( ( match = rheaders.exec( responseHeadersString ) ) ) {\n\t\t\t\t\t\t\t\tresponseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tmatch = responseHeaders[ key.toLowerCase() ];\n\t\t\t\t\t}\n\t\t\t\t\treturn match == null ? null : match;\n\t\t\t\t},\n\n\t\t\t\t// Raw string\n\t\t\t\tgetAllResponseHeaders: function() {\n\t\t\t\t\treturn state === 2 ? responseHeadersString : null;\n\t\t\t\t},\n\n\t\t\t\t// Caches the header\n\t\t\t\tsetRequestHeader: function( name, value ) {\n\t\t\t\t\tvar lname = name.toLowerCase();\n\t\t\t\t\tif ( !state ) {\n\t\t\t\t\t\tname = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;\n\t\t\t\t\t\trequestHeaders[ name ] = value;\n\t\t\t\t\t}\n\t\t\t\t\treturn this;\n\t\t\t\t},\n\n\t\t\t\t// Overrides response content-type header\n\t\t\t\toverrideMimeType: function( type ) {\n\t\t\t\t\tif ( !state ) {\n\t\t\t\t\t\ts.mimeType = type;\n\t\t\t\t\t}\n\t\t\t\t\treturn this;\n\t\t\t\t},\n\n\t\t\t\t// Status-dependent callbacks\n\t\t\t\tstatusCode: function( map ) {\n\t\t\t\t\tvar code;\n\t\t\t\t\tif ( map ) {\n\t\t\t\t\t\tif ( state < 2 ) {\n\t\t\t\t\t\t\tfor ( code in map ) {\n\n\t\t\t\t\t\t\t\t// Lazy-add the new callback in a way that preserves old ones\n\t\t\t\t\t\t\t\tstatusCode[ code ] = [ statusCode[ code ], map[ code ] ];\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t} else {\n\n\t\t\t\t\t\t\t// Execute the appropriate callbacks\n\t\t\t\t\t\t\tjqXHR.always( map[ jqXHR.status ] );\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\treturn this;\n\t\t\t\t},\n\n\t\t\t\t// Cancel the request\n\t\t\t\tabort: function( statusText ) {\n\t\t\t\t\tvar finalText = statusText || strAbort;\n\t\t\t\t\tif ( transport ) {\n\t\t\t\t\t\ttransport.abort( finalText );\n\t\t\t\t\t}\n\t\t\t\t\tdone( 0, finalText );\n\t\t\t\t\treturn this;\n\t\t\t\t}\n\t\t\t};\n\n\t\t// Attach deferreds\n\t\tdeferred.promise( jqXHR ).complete = completeDeferred.add;\n\t\tjqXHR.success = jqXHR.done;\n\t\tjqXHR.error = jqXHR.fail;\n\n\t\t// Remove hash character (#7531: and string promotion)\n\t\t// Add protocol if not provided (prefilters might expect it)\n\t\t// Handle falsy url in the settings object (#10093: consistency with old signature)\n\t\t// We also use the url parameter if available\n\t\ts.url = ( ( url || s.url || location.href ) + "" ).replace( rhash, "" )\n\t\t\t.replace( rprotocol, location.protocol + "//" );\n\n\t\t// Alias method option to type as per ticket #12004\n\t\ts.type = options.method || options.type || s.method || s.type;\n\n\t\t// Extract dataTypes list\n\t\ts.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];\n\n\t\t// A cross-domain request is in order when the origin doesn\'t match the current origin.\n\t\tif ( s.crossDomain == null ) {\n\t\t\turlAnchor = document.createElement( "a" );\n\n\t\t\t// Support: IE8-11+\n\t\t\t// IE throws exception if url is malformed, e.g. http://example.com:80x/\n\t\t\ttry {\n\t\t\t\turlAnchor.href = s.url;\n\n\t\t\t\t// Support: IE8-11+\n\t\t\t\t// Anchor\'s host property isn\'t correctly set when s.url is relative\n\t\t\t\turlAnchor.href = urlAnchor.href;\n\t\t\t\ts.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==\n\t\t\t\t\turlAnchor.protocol + "//" + urlAnchor.host;\n\t\t\t} catch ( e ) {\n\n\t\t\t\t// If there is an error parsing the URL, assume it is crossDomain,\n\t\t\t\t// it can be rejected by the transport if it is invalid\n\t\t\t\ts.crossDomain = true;\n\t\t\t}\n\t\t}\n\n\t\t// Convert data if not already a string\n\t\tif ( s.data && s.processData && typeof s.data !== "string" ) {\n\t\t\ts.data = jQuery.param( s.data, s.traditional );\n\t\t}\n\n\t\t// Apply prefilters\n\t\tinspectPrefiltersOrTransports( prefilters, s, options, jqXHR );\n\n\t\t// If request was aborted inside a prefilter, stop there\n\t\tif ( state === 2 ) {\n\t\t\treturn jqXHR;\n\t\t}\n\n\t\t// We can fire global events as of now if asked to\n\t\t// Don\'t fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)\n\t\tfireGlobals = jQuery.event && s.global;\n\n\t\t// Watch for a new set of requests\n\t\tif ( fireGlobals && jQuery.active++ === 0 ) {\n\t\t\tjQuery.event.trigger( "ajaxStart" );\n\t\t}\n\n\t\t// Uppercase the type\n\t\ts.type = s.type.toUpperCase();\n\n\t\t// Determine if request has content\n\t\ts.hasContent = !rnoContent.test( s.type );\n\n\t\t// Save the URL in case we\'re toying with the If-Modified-Since\n\t\t// and/or If-None-Match header later on\n\t\tcacheURL = s.url;\n\n\t\t// More options handling for requests with no content\n\t\tif ( !s.hasContent ) {\n\n\t\t\t// If data is available, append data to url\n\t\t\tif ( s.data ) {\n\t\t\t\tcacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );\n\n\t\t\t\t// #9682: remove data so that it\'s not used in an eventual retry\n\t\t\t\tdelete s.data;\n\t\t\t}\n\n\t\t\t// Add anti-cache in url if needed\n\t\t\tif ( s.cache === false ) {\n\t\t\t\ts.url = rts.test( cacheURL ) ?\n\n\t\t\t\t\t// If there is already a \'_\' parameter, set its value\n\t\t\t\t\tcacheURL.replace( rts, "$1_=" + nonce++ ) :\n\n\t\t\t\t\t// Otherwise add one to the end\n\t\t\t\t\tcacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;\n\t\t\t}\n\t\t}\n\n\t\t// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.\n\t\tif ( s.ifModified ) {\n\t\t\tif ( jQuery.lastModified[ cacheURL ] ) {\n\t\t\t\tjqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );\n\t\t\t}\n\t\t\tif ( jQuery.etag[ cacheURL ] ) {\n\t\t\t\tjqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );\n\t\t\t}\n\t\t}\n\n\t\t// Set the correct header, if data is being sent\n\t\tif ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {\n\t\t\tjqXHR.setRequestHeader( "Content-Type", s.contentType );\n\t\t}\n\n\t\t// Set the Accepts header for the server, depending on the dataType\n\t\tjqXHR.setRequestHeader(\n\t\t\t"Accept",\n\t\t\ts.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?\n\t\t\t\ts.accepts[ s.dataTypes[ 0 ] ] +\n\t\t\t\t\t( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :\n\t\t\t\ts.accepts[ "*" ]\n\t\t);\n\n\t\t// Check for headers option\n\t\tfor ( i in s.headers ) {\n\t\t\tjqXHR.setRequestHeader( i, s.headers[ i ] );\n\t\t}\n\n\t\t// Allow custom headers/mimetypes and early abort\n\t\tif ( s.beforeSend &&\n\t\t\t( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {\n\n\t\t\t// Abort if not done already and return\n\t\t\treturn jqXHR.abort();\n\t\t}\n\n\t\t// Aborting is no longer a cancellation\n\t\tstrAbort = "abort";\n\n\t\t// Install callbacks on deferreds\n\t\tfor ( i in { success: 1, error: 1, complete: 1 } ) {\n\t\t\tjqXHR[ i ]( s[ i ] );\n\t\t}\n\n\t\t// Get transport\n\t\ttransport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );\n\n\t\t// If no transport, we auto-abort\n\t\tif ( !transport ) {\n\t\t\tdone( -1, "No Transport" );\n\t\t} else {\n\t\t\tjqXHR.readyState = 1;\n\n\t\t\t// Send global event\n\t\t\tif ( fireGlobals ) {\n\t\t\t\tglobalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );\n\t\t\t}\n\n\t\t\t// If request was aborted inside ajaxSend, stop there\n\t\t\tif ( state === 2 ) {\n\t\t\t\treturn jqXHR;\n\t\t\t}\n\n\t\t\t// Timeout\n\t\t\tif ( s.async && s.timeout > 0 ) {\n\t\t\t\ttimeoutTimer = window.setTimeout( function() {\n\t\t\t\t\tjqXHR.abort( "timeout" );\n\t\t\t\t}, s.timeout );\n\t\t\t}\n\n\t\t\ttry {\n\t\t\t\tstate = 1;\n\t\t\t\ttransport.send( requestHeaders, done );\n\t\t\t} catch ( e ) {\n\n\t\t\t\t// Propagate exception as error if not done\n\t\t\t\tif ( state < 2 ) {\n\t\t\t\t\tdone( -1, e );\n\n\t\t\t\t// Simply rethrow otherwise\n\t\t\t\t} else {\n\t\t\t\t\tthrow e;\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\n\t\t// Callback for when everything is done\n\t\tfunction done( status, nativeStatusText, responses, headers ) {\n\t\t\tvar isSuccess, success, error, response, modified,\n\t\t\t\tstatusText = nativeStatusText;\n\n\t\t\t// Called once\n\t\t\tif ( state === 2 ) {\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\t// State is "done" now\n\t\t\tstate = 2;\n\n\t\t\t// Clear timeout if it exists\n\t\t\tif ( timeoutTimer ) {\n\t\t\t\twindow.clearTimeout( timeoutTimer );\n\t\t\t}\n\n\t\t\t// Dereference transport for early garbage collection\n\t\t\t// (no matter how long the jqXHR object will be used)\n\t\t\ttransport = undefined;\n\n\t\t\t// Cache response headers\n\t\t\tresponseHeadersString = headers || "";\n\n\t\t\t// Set readyState\n\t\t\tjqXHR.readyState = status > 0 ? 4 : 0;\n\n\t\t\t// Determine if successful\n\t\t\tisSuccess = status >= 200 && status < 300 || status === 304;\n\n\t\t\t// Get response data\n\t\t\tif ( responses ) {\n\t\t\t\tresponse = ajaxHandleResponses( s, jqXHR, responses );\n\t\t\t}\n\n\t\t\t// Convert no matter what (that way responseXXX fields are always set)\n\t\t\tresponse = ajaxConvert( s, response, jqXHR, isSuccess );\n\n\t\t\t// If successful, handle type chaining\n\t\t\tif ( isSuccess ) {\n\n\t\t\t\t// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.\n\t\t\t\tif ( s.ifModified ) {\n\t\t\t\t\tmodified = jqXHR.getResponseHeader( "Last-Modified" );\n\t\t\t\t\tif ( modified ) {\n\t\t\t\t\t\tjQuery.lastModified[ cacheURL ] = modified;\n\t\t\t\t\t}\n\t\t\t\t\tmodified = jqXHR.getResponseHeader( "etag" );\n\t\t\t\t\tif ( modified ) {\n\t\t\t\t\t\tjQuery.etag[ cacheURL ] = modified;\n\t\t\t\t\t}\n\t\t\t\t}\n\n\t\t\t\t// if no content\n\t\t\t\tif ( status === 204 || s.type === "HEAD" ) {\n\t\t\t\t\tstatusText = "nocontent";\n\n\t\t\t\t// if not modified\n\t\t\t\t} else if ( status === 304 ) {\n\t\t\t\t\tstatusText = "notmodified";\n\n\t\t\t\t// If we have data, let\'s convert it\n\t\t\t\t} else {\n\t\t\t\t\tstatusText = response.state;\n\t\t\t\t\tsuccess = response.data;\n\t\t\t\t\terror = response.error;\n\t\t\t\t\tisSuccess = !error;\n\t\t\t\t}\n\t\t\t} else {\n\n\t\t\t\t// Extract error from statusText and normalize for non-aborts\n\t\t\t\terror = statusText;\n\t\t\t\tif ( status || !statusText ) {\n\t\t\t\t\tstatusText = "error";\n\t\t\t\t\tif ( status < 0 ) {\n\t\t\t\t\t\tstatus = 0;\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\n\t\t\t// Set data for the fake xhr object\n\t\t\tjqXHR.status = status;\n\t\t\tjqXHR.statusText = ( nativeStatusText || statusText ) + "";\n\n\t\t\t// Success/Error\n\t\t\tif ( isSuccess ) {\n\t\t\t\tdeferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );\n\t\t\t} else {\n\t\t\t\tdeferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );\n\t\t\t}\n\n\t\t\t// Status-dependent callbacks\n\t\t\tjqXHR.statusCode( statusCode );\n\t\t\tstatusCode = undefined;\n\n\t\t\tif ( fireGlobals ) {\n\t\t\t\tglobalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",\n\t\t\t\t\t[ jqXHR, s, isSuccess ? success : error ] );\n\t\t\t}\n\n\t\t\t// Complete\n\t\t\tcompleteDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );\n\n\t\t\tif ( fireGlobals ) {\n\t\t\t\tglobalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );\n\n\t\t\t\t// Handle the global AJAX counter\n\t\t\t\tif ( !( --jQuery.active ) ) {\n\t\t\t\t\tjQuery.event.trigger( "ajaxStop" );\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\n\t\treturn jqXHR;\n\t},\n\n\tgetJSON: function( url, data, callback ) {\n\t\treturn jQuery.get( url, data, callback, "json" );\n\t},\n\n\tgetScript: function( url, callback ) {\n\t\treturn jQuery.get( url, undefined, callback, "script" );\n\t}\n} );\n\njQuery.each( [ "get", "post" ], function( i, method ) {\n\tjQuery[ method ] = function( url, data, callback, type ) {\n\n\t\t// Shift arguments if data argument was omitted\n\t\tif ( jQuery.isFunction( data ) ) {\n\t\t\ttype = type || callback;\n\t\t\tcallback = data;\n\t\t\tdata = undefined;\n\t\t}\n\n\t\t// The url can be an options object (which then must have .url)\n\t\treturn jQuery.ajax( jQuery.extend( {\n\t\t\turl: url,\n\t\t\ttype: method,\n\t\t\tdataType: type,\n\t\t\tdata: data,\n\t\t\tsuccess: callback\n\t\t}, jQuery.isPlainObject( url ) && url ) );\n\t};\n} );\n\n\njQuery._evalUrl = function( url ) {\n\treturn jQuery.ajax( {\n\t\turl: url,\n\n\t\t// Make this explicit, since user can override this through ajaxSetup (#11264)\n\t\ttype: "GET",\n\t\tdataType: "script",\n\t\tasync: false,\n\t\tglobal: false,\n\t\t"throws": true\n\t} );\n};\n\n\njQuery.fn.extend( {\n\twrapAll: function( html ) {\n\t\tvar wrap;\n\n\t\tif ( jQuery.isFunction( html ) ) {\n\t\t\treturn this.each( function( i ) {\n\t\t\t\tjQuery( this ).wrapAll( html.call( this, i ) );\n\t\t\t} );\n\t\t}\n\n\t\tif ( this[ 0 ] ) {\n\n\t\t\t// The elements to wrap the target around\n\t\t\twrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );\n\n\t\t\tif ( this[ 0 ].parentNode ) {\n\t\t\t\twrap.insertBefore( this[ 0 ] );\n\t\t\t}\n\n\t\t\twrap.map( function() {\n\t\t\t\tvar elem = this;\n\n\t\t\t\twhile ( elem.firstElementChild ) {\n\t\t\t\t\telem = elem.firstElementChild;\n\t\t\t\t}\n\n\t\t\t\treturn elem;\n\t\t\t} ).append( this );\n\t\t}\n\n\t\treturn this;\n\t},\n\n\twrapInner: function( html ) {\n\t\tif ( jQuery.isFunction( html ) ) {\n\t\t\treturn this.each( function( i ) {\n\t\t\t\tjQuery( this ).wrapInner( html.call( this, i ) );\n\t\t\t} );\n\t\t}\n\n\t\treturn this.each( function() {\n\t\t\tvar self = jQuery( this ),\n\t\t\t\tcontents = self.contents();\n\n\t\t\tif ( contents.length ) {\n\t\t\t\tcontents.wrapAll( html );\n\n\t\t\t} else {\n\t\t\t\tself.append( html );\n\t\t\t}\n\t\t} );\n\t},\n\n\twrap: function( html ) {\n\t\tvar isFunction = jQuery.isFunction( html );\n\n\t\treturn this.each( function( i ) {\n\t\t\tjQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );\n\t\t} );\n\t},\n\n\tunwrap: function() {\n\t\treturn this.parent().each( function() {\n\t\t\tif ( !jQuery.nodeName( this, "body" ) ) {\n\t\t\t\tjQuery( this ).replaceWith( this.childNodes );\n\t\t\t}\n\t\t} ).end();\n\t}\n} );\n\n\njQuery.expr.filters.hidden = function( elem ) {\n\treturn !jQuery.expr.filters.visible( elem );\n};\njQuery.expr.filters.visible = function( elem ) {\n\n\t// Support: Opera <= 12.12\n\t// Opera reports offsetWidths and offsetHeights less than zero on some elements\n\t// Use OR instead of AND as the element is not visible if either is true\n\t// See tickets #10406 and #13132\n\treturn elem.offsetWidth > 0 || elem.offsetHeight > 0 || elem.getClientRects().length > 0;\n};\n\n\n\n\nvar r20 = /%20/g,\n\trbracket = /\\[\\]$/,\n\trCRLF = /\\r?\\n/g,\n\trsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,\n\trsubmittable = /^(?:input|select|textarea|keygen)/i;\n\nfunction buildParams( prefix, obj, traditional, add ) {\n\tvar name;\n\n\tif ( jQuery.isArray( obj ) ) {\n\n\t\t// Serialize array item.\n\t\tjQuery.each( obj, function( i, v ) {\n\t\t\tif ( traditional || rbracket.test( prefix ) ) {\n\n\t\t\t\t// Treat each array item as a scalar.\n\t\t\t\tadd( prefix, v );\n\n\t\t\t} else {\n\n\t\t\t\t// Item is non-scalar (array or object), encode its numeric index.\n\t\t\t\tbuildParams(\n\t\t\t\t\tprefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",\n\t\t\t\t\tv,\n\t\t\t\t\ttraditional,\n\t\t\t\t\tadd\n\t\t\t\t);\n\t\t\t}\n\t\t} );\n\n\t} else if ( !traditional && jQuery.type( obj ) === "object" ) {\n\n\t\t// Serialize object item.\n\t\tfor ( name in obj ) {\n\t\t\tbuildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );\n\t\t}\n\n\t} else {\n\n\t\t// Serialize scalar item.\n\t\tadd( prefix, obj );\n\t}\n}\n\n// Serialize an array of form elements or a set of\n// key/values into a query string\njQuery.param = function( a, traditional ) {\n\tvar prefix,\n\t\ts = [],\n\t\tadd = function( key, value ) {\n\n\t\t\t// If value is a function, invoke it and return its value\n\t\t\tvalue = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );\n\t\t\ts[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );\n\t\t};\n\n\t// Set traditional to true for jQuery <= 1.3.2 behavior.\n\tif ( traditional === undefined ) {\n\t\ttraditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;\n\t}\n\n\t// If an array was passed in, assume that it is an array of form elements.\n\tif ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {\n\n\t\t// Serialize the form elements\n\t\tjQuery.each( a, function() {\n\t\t\tadd( this.name, this.value );\n\t\t} );\n\n\t} else {\n\n\t\t// If traditional, encode the "old" way (the way 1.3.2 or older\n\t\t// did it), otherwise encode params recursively.\n\t\tfor ( prefix in a ) {\n\t\t\tbuildParams( prefix, a[ prefix ], traditional, add );\n\t\t}\n\t}\n\n\t// Return the resulting serialization\n\treturn s.join( "&" ).replace( r20, "+" );\n};\n\njQuery.fn.extend( {\n\tserialize: function() {\n\t\treturn jQuery.param( this.serializeArray() );\n\t},\n\tserializeArray: function() {\n\t\treturn this.map( function() {\n\n\t\t\t// Can add propHook for "elements" to filter or add form elements\n\t\t\tvar elements = jQuery.prop( this, "elements" );\n\t\t\treturn elements ? jQuery.makeArray( elements ) : this;\n\t\t} )\n\t\t.filter( function() {\n\t\t\tvar type = this.type;\n\n\t\t\t// Use .is( ":disabled" ) so that fieldset[disabled] works\n\t\t\treturn this.name && !jQuery( this ).is( ":disabled" ) &&\n\t\t\t\trsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&\n\t\t\t\t( this.checked || !rcheckableType.test( type ) );\n\t\t} )\n\t\t.map( function( i, elem ) {\n\t\t\tvar val = jQuery( this ).val();\n\n\t\t\treturn val == null ?\n\t\t\t\tnull :\n\t\t\t\tjQuery.isArray( val ) ?\n\t\t\t\t\tjQuery.map( val, function( val ) {\n\t\t\t\t\t\treturn { name: elem.name, value: val.replace( rCRLF, "\\r\\n" ) };\n\t\t\t\t\t} ) :\n\t\t\t\t\t{ name: elem.name, value: val.replace( rCRLF, "\\r\\n" ) };\n\t\t} ).get();\n\t}\n} );\n\n\njQuery.ajaxSettings.xhr = function() {\n\ttry {\n\t\treturn new window.XMLHttpRequest();\n\t} catch ( e ) {}\n};\n\nvar xhrSuccessStatus = {\n\n\t\t// File protocol always yields status code 0, assume 200\n\t\t0: 200,\n\n\t\t// Support: IE9\n\t\t// #1450: sometimes IE returns 1223 when it should be 204\n\t\t1223: 204\n\t},\n\txhrSupported = jQuery.ajaxSettings.xhr();\n\nsupport.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );\nsupport.ajax = xhrSupported = !!xhrSupported;\n\njQuery.ajaxTransport( function( options ) {\n\tvar callback, errorCallback;\n\n\t// Cross domain only allowed if supported through XMLHttpRequest\n\tif ( support.cors || xhrSupported && !options.crossDomain ) {\n\t\treturn {\n\t\t\tsend: function( headers, complete ) {\n\t\t\t\tvar i,\n\t\t\t\t\txhr = options.xhr();\n\n\t\t\t\txhr.open(\n\t\t\t\t\toptions.type,\n\t\t\t\t\toptions.url,\n\t\t\t\t\toptions.async,\n\t\t\t\t\toptions.username,\n\t\t\t\t\toptions.password\n\t\t\t\t);\n\n\t\t\t\t// Apply custom fields if provided\n\t\t\t\tif ( options.xhrFields ) {\n\t\t\t\t\tfor ( i in options.xhrFields ) {\n\t\t\t\t\t\txhr[ i ] = options.xhrFields[ i ];\n\t\t\t\t\t}\n\t\t\t\t}\n\n\t\t\t\t// Override mime type if needed\n\t\t\t\tif ( options.mimeType && xhr.overrideMimeType ) {\n\t\t\t\t\txhr.overrideMimeType( options.mimeType );\n\t\t\t\t}\n\n\t\t\t\t// X-Requested-With header\n\t\t\t\t// For cross-domain requests, seeing as conditions for a preflight are\n\t\t\t\t// akin to a jigsaw puzzle, we simply never set it to be sure.\n\t\t\t\t// (it can always be set on a per-request basis or even using ajaxSetup)\n\t\t\t\t// For same-domain requests, won\'t change header if already provided.\n\t\t\t\tif ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {\n\t\t\t\t\theaders[ "X-Requested-With" ] = "XMLHttpRequest";\n\t\t\t\t}\n\n\t\t\t\t// Set headers\n\t\t\t\tfor ( i in headers ) {\n\t\t\t\t\txhr.setRequestHeader( i, headers[ i ] );\n\t\t\t\t}\n\n\t\t\t\t// Callback\n\t\t\t\tcallback = function( type ) {\n\t\t\t\t\treturn function() {\n\t\t\t\t\t\tif ( callback ) {\n\t\t\t\t\t\t\tcallback = errorCallback = xhr.onload =\n\t\t\t\t\t\t\t\txhr.onerror = xhr.onabort = xhr.onreadystatechange = null;\n\n\t\t\t\t\t\t\tif ( type === "abort" ) {\n\t\t\t\t\t\t\t\txhr.abort();\n\t\t\t\t\t\t\t} else if ( type === "error" ) {\n\n\t\t\t\t\t\t\t\t// Support: IE9\n\t\t\t\t\t\t\t\t// On a manual native abort, IE9 throws\n\t\t\t\t\t\t\t\t// errors on any property access that is not readyState\n\t\t\t\t\t\t\t\tif ( typeof xhr.status !== "number" ) {\n\t\t\t\t\t\t\t\t\tcomplete( 0, "error" );\n\t\t\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\t\t\tcomplete(\n\n\t\t\t\t\t\t\t\t\t\t// File: protocol always yields status 0; see #8605, #14207\n\t\t\t\t\t\t\t\t\t\txhr.status,\n\t\t\t\t\t\t\t\t\t\txhr.statusText\n\t\t\t\t\t\t\t\t\t);\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\t\tcomplete(\n\t\t\t\t\t\t\t\t\txhrSuccessStatus[ xhr.status ] || xhr.status,\n\t\t\t\t\t\t\t\t\txhr.statusText,\n\n\t\t\t\t\t\t\t\t\t// Support: IE9 only\n\t\t\t\t\t\t\t\t\t// IE9 has no XHR2 but throws on binary (trac-11426)\n\t\t\t\t\t\t\t\t\t// For XHR2 non-text, let the caller handle it (gh-2498)\n\t\t\t\t\t\t\t\t\t( xhr.responseType || "text" ) !== "text"  ||\n\t\t\t\t\t\t\t\t\ttypeof xhr.responseText !== "string" ?\n\t\t\t\t\t\t\t\t\t\t{ binary: xhr.response } :\n\t\t\t\t\t\t\t\t\t\t{ text: xhr.responseText },\n\t\t\t\t\t\t\t\t\txhr.getAllResponseHeaders()\n\t\t\t\t\t\t\t\t);\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t};\n\t\t\t\t};\n\n\t\t\t\t// Listen to events\n\t\t\t\txhr.onload = callback();\n\t\t\t\terrorCallback = xhr.onerror = callback( "error" );\n\n\t\t\t\t// Support: IE9\n\t\t\t\t// Use onreadystatechange to replace onabort\n\t\t\t\t// to handle uncaught aborts\n\t\t\t\tif ( xhr.onabort !== undefined ) {\n\t\t\t\t\txhr.onabort = errorCallback;\n\t\t\t\t} else {\n\t\t\t\t\txhr.onreadystatechange = function() {\n\n\t\t\t\t\t\t// Check readyState before timeout as it changes\n\t\t\t\t\t\tif ( xhr.readyState === 4 ) {\n\n\t\t\t\t\t\t\t// Allow onerror to be called first,\n\t\t\t\t\t\t\t// but that will not handle a native abort\n\t\t\t\t\t\t\t// Also, save errorCallback to a variable\n\t\t\t\t\t\t\t// as xhr.onerror cannot be accessed\n\t\t\t\t\t\t\twindow.setTimeout( function() {\n\t\t\t\t\t\t\t\tif ( callback ) {\n\t\t\t\t\t\t\t\t\terrorCallback();\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t} );\n\t\t\t\t\t\t}\n\t\t\t\t\t};\n\t\t\t\t}\n\n\t\t\t\t// Create the abort callback\n\t\t\t\tcallback = callback( "abort" );\n\n\t\t\t\ttry {\n\n\t\t\t\t\t// Do send the request (this may raise an exception)\n\t\t\t\t\txhr.send( options.hasContent && options.data || null );\n\t\t\t\t} catch ( e ) {\n\n\t\t\t\t\t// #14683: Only rethrow if this hasn\'t been notified as an error yet\n\t\t\t\t\tif ( callback ) {\n\t\t\t\t\t\tthrow e;\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t},\n\n\t\t\tabort: function() {\n\t\t\t\tif ( callback ) {\n\t\t\t\t\tcallback();\n\t\t\t\t}\n\t\t\t}\n\t\t};\n\t}\n} );\n\n\n\n\n// Install script dataType\njQuery.ajaxSetup( {\n\taccepts: {\n\t\tscript: "text/javascript, application/javascript, " +\n\t\t\t"application/ecmascript, application/x-ecmascript"\n\t},\n\tcontents: {\n\t\tscript: /\\b(?:java|ecma)script\\b/\n\t},\n\tconverters: {\n\t\t"text script": function( text ) {\n\t\t\tjQuery.globalEval( text );\n\t\t\treturn text;\n\t\t}\n\t}\n} );\n\n// Handle cache\'s special case and crossDomain\njQuery.ajaxPrefilter( "script", function( s ) {\n\tif ( s.cache === undefined ) {\n\t\ts.cache = false;\n\t}\n\tif ( s.crossDomain ) {\n\t\ts.type = "GET";\n\t}\n} );\n\n// Bind script tag hack transport\njQuery.ajaxTransport( "script", function( s ) {\n\n\t// This transport only deals with cross domain requests\n\tif ( s.crossDomain ) {\n\t\tvar script, callback;\n\t\treturn {\n\t\t\tsend: function( _, complete ) {\n\t\t\t\tscript = jQuery( "<script>" ).prop( {\n\t\t\t\t\tcharset: s.scriptCharset,\n\t\t\t\t\tsrc: s.url\n\t\t\t\t} ).on(\n\t\t\t\t\t"load error",\n\t\t\t\t\tcallback = function( evt ) {\n\t\t\t\t\t\tscript.remove();\n\t\t\t\t\t\tcallback = null;\n\t\t\t\t\t\tif ( evt ) {\n\t\t\t\t\t\t\tcomplete( evt.type === "error" ? 404 : 200, evt.type );\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t);\n\n\t\t\t\t// Use native DOM manipulation to avoid our domManip AJAX trickery\n\t\t\t\tdocument.head.appendChild( script[ 0 ] );\n\t\t\t},\n\t\t\tabort: function() {\n\t\t\t\tif ( callback ) {\n\t\t\t\t\tcallback();\n\t\t\t\t}\n\t\t\t}\n\t\t};\n\t}\n} );\n\n\n\n\nvar oldCallbacks = [],\n\trjsonp = /(=)\\?(?=&|$)|\\?\\?/;\n\n// Default jsonp settings\njQuery.ajaxSetup( {\n\tjsonp: "callback",\n\tjsonpCallback: function() {\n\t\tvar callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );\n\t\tthis[ callback ] = true;\n\t\treturn callback;\n\t}\n} );\n\n// Detect, normalize options and install callbacks for jsonp requests\njQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {\n\n\tvar callbackName, overwritten, responseContainer,\n\t\tjsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?\n\t\t\t"url" :\n\t\t\ttypeof s.data === "string" &&\n\t\t\t\t( s.contentType || "" )\n\t\t\t\t\t.indexOf( "application/x-www-form-urlencoded" ) === 0 &&\n\t\t\t\trjsonp.test( s.data ) && "data"\n\t\t);\n\n\t// Handle iff the expected data type is "jsonp" or we have a parameter to set\n\tif ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {\n\n\t\t// Get callback name, remembering preexisting value associated with it\n\t\tcallbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?\n\t\t\ts.jsonpCallback() :\n\t\t\ts.jsonpCallback;\n\n\t\t// Insert callback into url or form data\n\t\tif ( jsonProp ) {\n\t\t\ts[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );\n\t\t} else if ( s.jsonp !== false ) {\n\t\t\ts.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;\n\t\t}\n\n\t\t// Use data converter to retrieve json after script execution\n\t\ts.converters[ "script json" ] = function() {\n\t\t\tif ( !responseContainer ) {\n\t\t\t\tjQuery.error( callbackName + " was not called" );\n\t\t\t}\n\t\t\treturn responseContainer[ 0 ];\n\t\t};\n\n\t\t// Force json dataType\n\t\ts.dataTypes[ 0 ] = "json";\n\n\t\t// Install callback\n\t\toverwritten = window[ callbackName ];\n\t\twindow[ callbackName ] = function() {\n\t\t\tresponseContainer = arguments;\n\t\t};\n\n\t\t// Clean-up function (fires after converters)\n\t\tjqXHR.always( function() {\n\n\t\t\t// If previous value didn\'t exist - remove it\n\t\t\tif ( overwritten === undefined ) {\n\t\t\t\tjQuery( window ).removeProp( callbackName );\n\n\t\t\t// Otherwise restore preexisting value\n\t\t\t} else {\n\t\t\t\twindow[ callbackName ] = overwritten;\n\t\t\t}\n\n\t\t\t// Save back as free\n\t\t\tif ( s[ callbackName ] ) {\n\n\t\t\t\t// Make sure that re-using the options doesn\'t screw things around\n\t\t\t\ts.jsonpCallback = originalSettings.jsonpCallback;\n\n\t\t\t\t// Save the callback name for future use\n\t\t\t\toldCallbacks.push( callbackName );\n\t\t\t}\n\n\t\t\t// Call if it was a function and we have a response\n\t\t\tif ( responseContainer && jQuery.isFunction( overwritten ) ) {\n\t\t\t\toverwritten( responseContainer[ 0 ] );\n\t\t\t}\n\n\t\t\tresponseContainer = overwritten = undefined;\n\t\t} );\n\n\t\t// Delegate to script\n\t\treturn "script";\n\t}\n} );\n\n\n\n\n// Argument "data" should be string of html\n// context (optional): If specified, the fragment will be created in this context,\n// defaults to document\n// keepScripts (optional): If true, will include scripts passed in the html string\njQuery.parseHTML = function( data, context, keepScripts ) {\n\tif ( !data || typeof data !== "string" ) {\n\t\treturn null;\n\t}\n\tif ( typeof context === "boolean" ) {\n\t\tkeepScripts = context;\n\t\tcontext = false;\n\t}\n\tcontext = context || document;\n\n\tvar parsed = rsingleTag.exec( data ),\n\t\tscripts = !keepScripts && [];\n\n\t// Single tag\n\tif ( parsed ) {\n\t\treturn [ context.createElement( parsed[ 1 ] ) ];\n\t}\n\n\tparsed = buildFragment( [ data ], context, scripts );\n\n\tif ( scripts && scripts.length ) {\n\t\tjQuery( scripts ).remove();\n\t}\n\n\treturn jQuery.merge( [], parsed.childNodes );\n};\n\n\n// Keep a copy of the old load method\nvar _load = jQuery.fn.load;\n\n/**\n * Load a url into a page\n */\njQuery.fn.load = function( url, params, callback ) {\n\tif ( typeof url !== "string" && _load ) {\n\t\treturn _load.apply( this, arguments );\n\t}\n\n\tvar selector, type, response,\n\t\tself = this,\n\t\toff = url.indexOf( " " );\n\n\tif ( off > -1 ) {\n\t\tselector = jQuery.trim( url.slice( off ) );\n\t\turl = url.slice( 0, off );\n\t}\n\n\t// If it\'s a function\n\tif ( jQuery.isFunction( params ) ) {\n\n\t\t// We assume that it\'s the callback\n\t\tcallback = params;\n\t\tparams = undefined;\n\n\t// Otherwise, build a param string\n\t} else if ( params && typeof params === "object" ) {\n\t\ttype = "POST";\n\t}\n\n\t// If we have elements to modify, make the request\n\tif ( self.length > 0 ) {\n\t\tjQuery.ajax( {\n\t\t\turl: url,\n\n\t\t\t// If "type" variable is undefined, then "GET" method will be used.\n\t\t\t// Make value of this field explicit since\n\t\t\t// user can override it through ajaxSetup method\n\t\t\ttype: type || "GET",\n\t\t\tdataType: "html",\n\t\t\tdata: params\n\t\t} ).done( function( responseText ) {\n\n\t\t\t// Save response for use in complete callback\n\t\t\tresponse = arguments;\n\n\t\t\tself.html( selector ?\n\n\t\t\t\t// If a selector was specified, locate the right elements in a dummy div\n\t\t\t\t// Exclude scripts to avoid IE \'Permission Denied\' errors\n\t\t\t\tjQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :\n\n\t\t\t\t// Otherwise use the full result\n\t\t\t\tresponseText );\n\n\t\t// If the request succeeds, this function gets "data", "status", "jqXHR"\n\t\t// but they are ignored because response was set above.\n\t\t// If it fails, this function gets "jqXHR", "status", "error"\n\t\t} ).always( callback && function( jqXHR, status ) {\n\t\t\tself.each( function() {\n\t\t\t\tcallback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );\n\t\t\t} );\n\t\t} );\n\t}\n\n\treturn this;\n};\n\n\n\n\n// Attach a bunch of functions for handling common AJAX events\njQuery.each( [\n\t"ajaxStart",\n\t"ajaxStop",\n\t"ajaxComplete",\n\t"ajaxError",\n\t"ajaxSuccess",\n\t"ajaxSend"\n], function( i, type ) {\n\tjQuery.fn[ type ] = function( fn ) {\n\t\treturn this.on( type, fn );\n\t};\n} );\n\n\n\n\njQuery.expr.filters.animated = function( elem ) {\n\treturn jQuery.grep( jQuery.timers, function( fn ) {\n\t\treturn elem === fn.elem;\n\t} ).length;\n};\n\n\n\n\n/**\n * Gets a window from an element\n */\nfunction getWindow( elem ) {\n\treturn jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;\n}\n\njQuery.offset = {\n\tsetOffset: function( elem, options, i ) {\n\t\tvar curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,\n\t\t\tposition = jQuery.css( elem, "position" ),\n\t\t\tcurElem = jQuery( elem ),\n\t\t\tprops = {};\n\n\t\t// Set position first, in-case top/left are set even on static elem\n\t\tif ( position === "static" ) {\n\t\t\telem.style.position = "relative";\n\t\t}\n\n\t\tcurOffset = curElem.offset();\n\t\tcurCSSTop = jQuery.css( elem, "top" );\n\t\tcurCSSLeft = jQuery.css( elem, "left" );\n\t\tcalculatePosition = ( position === "absolute" || position === "fixed" ) &&\n\t\t\t( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;\n\n\t\t// Need to be able to calculate position if either\n\t\t// top or left is auto and position is either absolute or fixed\n\t\tif ( calculatePosition ) {\n\t\t\tcurPosition = curElem.position();\n\t\t\tcurTop = curPosition.top;\n\t\t\tcurLeft = curPosition.left;\n\n\t\t} else {\n\t\t\tcurTop = parseFloat( curCSSTop ) || 0;\n\t\t\tcurLeft = parseFloat( curCSSLeft ) || 0;\n\t\t}\n\n\t\tif ( jQuery.isFunction( options ) ) {\n\n\t\t\t// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)\n\t\t\toptions = options.call( elem, i, jQuery.extend( {}, curOffset ) );\n\t\t}\n\n\t\tif ( options.top != null ) {\n\t\t\tprops.top = ( options.top - curOffset.top ) + curTop;\n\t\t}\n\t\tif ( options.left != null ) {\n\t\t\tprops.left = ( options.left - curOffset.left ) + curLeft;\n\t\t}\n\n\t\tif ( "using" in options ) {\n\t\t\toptions.using.call( elem, props );\n\n\t\t} else {\n\t\t\tcurElem.css( props );\n\t\t}\n\t}\n};\n\njQuery.fn.extend( {\n\toffset: function( options ) {\n\t\tif ( arguments.length ) {\n\t\t\treturn options === undefined ?\n\t\t\t\tthis :\n\t\t\t\tthis.each( function( i ) {\n\t\t\t\t\tjQuery.offset.setOffset( this, options, i );\n\t\t\t\t} );\n\t\t}\n\n\t\tvar docElem, win,\n\t\t\telem = this[ 0 ],\n\t\t\tbox = { top: 0, left: 0 },\n\t\t\tdoc = elem && elem.ownerDocument;\n\n\t\tif ( !doc ) {\n\t\t\treturn;\n\t\t}\n\n\t\tdocElem = doc.documentElement;\n\n\t\t// Make sure it\'s not a disconnected DOM node\n\t\tif ( !jQuery.contains( docElem, elem ) ) {\n\t\t\treturn box;\n\t\t}\n\n\t\tbox = elem.getBoundingClientRect();\n\t\twin = getWindow( doc );\n\t\treturn {\n\t\t\ttop: box.top + win.pageYOffset - docElem.clientTop,\n\t\t\tleft: box.left + win.pageXOffset - docElem.clientLeft\n\t\t};\n\t},\n\n\tposition: function() {\n\t\tif ( !this[ 0 ] ) {\n\t\t\treturn;\n\t\t}\n\n\t\tvar offsetParent, offset,\n\t\t\telem = this[ 0 ],\n\t\t\tparentOffset = { top: 0, left: 0 };\n\n\t\t// Fixed elements are offset from window (parentOffset = {top:0, left: 0},\n\t\t// because it is its only offset parent\n\t\tif ( jQuery.css( elem, "position" ) === "fixed" ) {\n\n\t\t\t// Assume getBoundingClientRect is there when computed position is fixed\n\t\t\toffset = elem.getBoundingClientRect();\n\n\t\t} else {\n\n\t\t\t// Get *real* offsetParent\n\t\t\toffsetParent = this.offsetParent();\n\n\t\t\t// Get correct offsets\n\t\t\toffset = this.offset();\n\t\t\tif ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {\n\t\t\t\tparentOffset = offsetParent.offset();\n\t\t\t}\n\n\t\t\t// Add offsetParent borders\n\t\t\tparentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );\n\t\t\tparentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );\n\t\t}\n\n\t\t// Subtract parent offsets and element margins\n\t\treturn {\n\t\t\ttop: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),\n\t\t\tleft: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )\n\t\t};\n\t},\n\n\t// This method will return documentElement in the following cases:\n\t// 1) For the element inside the iframe without offsetParent, this method will return\n\t//    documentElement of the parent window\n\t// 2) For the hidden or detached element\n\t// 3) For body or html element, i.e. in case of the html node - it will return itself\n\t//\n\t// but those exceptions were never presented as a real life use-cases\n\t// and might be considered as more preferable results.\n\t//\n\t// This logic, however, is not guaranteed and can change at any point in the future\n\toffsetParent: function() {\n\t\treturn this.map( function() {\n\t\t\tvar offsetParent = this.offsetParent;\n\n\t\t\twhile ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {\n\t\t\t\toffsetParent = offsetParent.offsetParent;\n\t\t\t}\n\n\t\t\treturn offsetParent || documentElement;\n\t\t} );\n\t}\n} );\n\n// Create scrollLeft and scrollTop methods\njQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {\n\tvar top = "pageYOffset" === prop;\n\n\tjQuery.fn[ method ] = function( val ) {\n\t\treturn access( this, function( elem, method, val ) {\n\t\t\tvar win = getWindow( elem );\n\n\t\t\tif ( val === undefined ) {\n\t\t\t\treturn win ? win[ prop ] : elem[ method ];\n\t\t\t}\n\n\t\t\tif ( win ) {\n\t\t\t\twin.scrollTo(\n\t\t\t\t\t!top ? val : win.pageXOffset,\n\t\t\t\t\ttop ? val : win.pageYOffset\n\t\t\t\t);\n\n\t\t\t} else {\n\t\t\t\telem[ method ] = val;\n\t\t\t}\n\t\t}, method, val, arguments.length );\n\t};\n} );\n\n// Support: Safari<7-8+, Chrome<37-44+\n// Add the top/left cssHooks using jQuery.fn.position\n// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084\n// Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280\n// getComputedStyle returns percent when specified for top/left/bottom/right;\n// rather than make the css module depend on the offset module, just check for it here\njQuery.each( [ "top", "left" ], function( i, prop ) {\n\tjQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,\n\t\tfunction( elem, computed ) {\n\t\t\tif ( computed ) {\n\t\t\t\tcomputed = curCSS( elem, prop );\n\n\t\t\t\t// If curCSS returns percentage, fallback to offset\n\t\t\t\treturn rnumnonpx.test( computed ) ?\n\t\t\t\t\tjQuery( elem ).position()[ prop ] + "px" :\n\t\t\t\t\tcomputed;\n\t\t\t}\n\t\t}\n\t);\n} );\n\n\n// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods\njQuery.each( { Height: "height", Width: "width" }, function( name, type ) {\n\tjQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },\n\t\tfunction( defaultExtra, funcName ) {\n\n\t\t// Margin is only for outerHeight, outerWidth\n\t\tjQuery.fn[ funcName ] = function( margin, value ) {\n\t\t\tvar chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),\n\t\t\t\textra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );\n\n\t\t\treturn access( this, function( elem, type, value ) {\n\t\t\t\tvar doc;\n\n\t\t\t\tif ( jQuery.isWindow( elem ) ) {\n\n\t\t\t\t\t// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there\n\t\t\t\t\t// isn\'t a whole lot we can do. See pull request at this URL for discussion:\n\t\t\t\t\t// https://github.com/jquery/jquery/pull/764\n\t\t\t\t\treturn elem.document.documentElement[ "client" + name ];\n\t\t\t\t}\n\n\t\t\t\t// Get document width or height\n\t\t\t\tif ( elem.nodeType === 9 ) {\n\t\t\t\t\tdoc = elem.documentElement;\n\n\t\t\t\t\t// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],\n\t\t\t\t\t// whichever is greatest\n\t\t\t\t\treturn Math.max(\n\t\t\t\t\t\telem.body[ "scroll" + name ], doc[ "scroll" + name ],\n\t\t\t\t\t\telem.body[ "offset" + name ], doc[ "offset" + name ],\n\t\t\t\t\t\tdoc[ "client" + name ]\n\t\t\t\t\t);\n\t\t\t\t}\n\n\t\t\t\treturn value === undefined ?\n\n\t\t\t\t\t// Get width or height on the element, requesting but not forcing parseFloat\n\t\t\t\t\tjQuery.css( elem, type, extra ) :\n\n\t\t\t\t\t// Set width or height on the element\n\t\t\t\t\tjQuery.style( elem, type, value, extra );\n\t\t\t}, type, chainable ? margin : undefined, chainable, null );\n\t\t};\n\t} );\n} );\n\n\njQuery.fn.extend( {\n\n\tbind: function( types, data, fn ) {\n\t\treturn this.on( types, null, data, fn );\n\t},\n\tunbind: function( types, fn ) {\n\t\treturn this.off( types, null, fn );\n\t},\n\n\tdelegate: function( selector, types, data, fn ) {\n\t\treturn this.on( types, selector, data, fn );\n\t},\n\tundelegate: function( selector, types, fn ) {\n\n\t\t// ( namespace ) or ( selector, types [, fn] )\n\t\treturn arguments.length === 1 ?\n\t\t\tthis.off( selector, "**" ) :\n\t\t\tthis.off( types, selector || "**", fn );\n\t},\n\tsize: function() {\n\t\treturn this.length;\n\t}\n} );\n\njQuery.fn.andSelf = jQuery.fn.addBack;\n\n\n\n\n// Register as a named AMD module, since jQuery can be concatenated with other\n// files that may use define, but not via a proper concatenation script that\n// understands anonymous AMD modules. A named AMD is safest and most robust\n// way to register. Lowercase jquery is used because AMD module names are\n// derived from file names, and jQuery is normally delivered in a lowercase\n// file name. Do this after creating the global so that if an AMD module wants\n// to call noConflict to hide this version of jQuery, it will work.\n\n// Note that for maximum portability, libraries that are not jQuery should\n// declare themselves as anonymous modules, and avoid setting a global if an\n// AMD loader is present. jQuery is a special case. For more information, see\n// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon\n\nif ( typeof define === "function" && define.amd ) {\n\tdefine( "jquery", [], function() {\n\t\treturn jQuery;\n\t} );\n}\n\n\n\nvar\n\n\t// Map over jQuery in case of overwrite\n\t_jQuery = window.jQuery,\n\n\t// Map over the $ in case of overwrite\n\t_$ = window.$;\n\njQuery.noConflict = function( deep ) {\n\tif ( window.$ === jQuery ) {\n\t\twindow.$ = _$;\n\t}\n\n\tif ( deep && window.jQuery === jQuery ) {\n\t\twindow.jQuery = _jQuery;\n\t}\n\n\treturn jQuery;\n};\n\n// Expose jQuery and $ identifiers, even in AMD\n// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)\n// and CommonJS for browser emulators (#13566)\nif ( !noGlobal ) {\n\twindow.jQuery = window.$ = jQuery;\n}\n\nreturn jQuery;\n}));\n';
    loader.global.define = undefined;
    loader.global.module = undefined;
    loader.global.exports = undefined;
    loader.__exec({
        'source': source,
        'address': module.uri
    });
    loader.global.require = require;
    loader.global.define = define;
    return loader.get('@@global-helpers').retrieveGlobal(module.id, 'jQuery');
});
/*can@2.3.24#util/can*/
define('can/util/can', [], function () {
    var glbl = typeof window !== 'undefined' ? window : typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope ? self : global;
    var can = {};
    if (typeof GLOBALCAN === 'undefined' || GLOBALCAN !== false) {
        glbl.can = can;
    }
    can.global = glbl;
    can.k = function () {
    };
    can.isDeferred = function (obj) {
        if (!!can.dev) {
            can.dev.warn('can.isDeferred: this function is deprecated and will be removed in a future release. can.isPromise replaces the functionality of can.isDeferred.');
        }
        return obj && typeof obj.then === 'function' && typeof obj.pipe === 'function';
    };
    can.isPromise = function (obj) {
        return !!obj && (window.Promise && obj instanceof Promise || can.isFunction(obj.then) && (can.List === undefined || !(obj instanceof can.List)));
    };
    can.isMapLike = function (obj) {
        return can.Map && (obj instanceof can.Map || obj && obj.___get);
    };
    var cid = 0;
    can.cid = function (object, name) {
        if (!object._cid) {
            cid++;
            object._cid = (name || '') + cid;
        }
        return object._cid;
    };
    can.VERSION = '@EDGE';
    can.simpleExtend = function (d, s) {
        for (var prop in s) {
            d[prop] = s[prop];
        }
        return d;
    };
    can.last = function (arr) {
        return arr && arr[arr.length - 1];
    };
    can.isDOM = function (el) {
        return (el.ownerDocument || el) === can.global.document;
    };
    can.childNodes = function (node) {
        var childNodes = node.childNodes;
        if ('length' in childNodes) {
            return childNodes;
        } else {
            var cur = node.firstChild;
            var nodes = [];
            while (cur) {
                nodes.push(cur);
                cur = cur.nextSibling;
            }
            return nodes;
        }
    };
    var protoBind = Function.prototype.bind;
    if (protoBind) {
        can.proxy = function (fn, context) {
            return protoBind.call(fn, context);
        };
    } else {
        can.proxy = function (fn, context) {
            return function () {
                return fn.apply(context, arguments);
            };
        };
    }
    can.frag = function (item, doc) {
        var document = doc || can.document || can.global.document;
        var frag;
        if (!item || typeof item === 'string') {
            frag = can.buildFragment(item == null ? '' : '' + item, document);
            if (!frag.childNodes.length) {
                frag.appendChild(document.createTextNode(''));
            }
            return frag;
        } else if (item.nodeType === 11) {
            return item;
        } else if (typeof item.nodeType === 'number') {
            frag = document.createDocumentFragment();
            frag.appendChild(item);
            return frag;
        } else if (typeof item.length === 'number') {
            frag = document.createDocumentFragment();
            can.each(item, function (item) {
                frag.appendChild(can.frag(item));
            });
            if (!can.childNodes(frag).length) {
                frag.appendChild(document.createTextNode(''));
            }
            return frag;
        } else {
            frag = can.buildFragment('' + item, document);
            if (!can.childNodes(frag).length) {
                frag.appendChild(document.createTextNode(''));
            }
            return frag;
        }
    };
    can.scope = can.viewModel = function (el, attr, val) {
        el = can.$(el);
        var scope = can.data(el, 'scope') || can.data(el, 'viewModel');
        if (!scope) {
            scope = new can.Map();
            can.data(el, 'scope', scope);
            can.data(el, 'viewModel', scope);
        }
        switch (arguments.length) {
        case 0:
        case 1:
            return scope;
        case 2:
            return scope.attr(attr);
        default:
            scope.attr(attr, val);
            return el;
        }
    };
    var parseURI = function (url) {
        var m = String(url).replace(/^\s+|\s+$/g, '').match(/^([^:\/?#]+:)?(\/\/(?:[^:@]*(?::[^:@]*)?@)?(([^:\/?#]*)(?::(\d*))?))?([^?#]*)(\?[^#]*)?(#[\s\S]*)?/);
        return m ? {
            href: m[0] || '',
            protocol: m[1] || '',
            authority: m[2] || '',
            host: m[3] || '',
            hostname: m[4] || '',
            port: m[5] || '',
            pathname: m[6] || '',
            search: m[7] || '',
            hash: m[8] || ''
        } : null;
    };
    can.joinURIs = function (base, href) {
        function removeDotSegments(input) {
            var output = [];
            input.replace(/^(\.\.?(\/|$))+/, '').replace(/\/(\.(\/|$))+/g, '/').replace(/\/\.\.$/, '/../').replace(/\/?[^\/]*/g, function (p) {
                if (p === '/..') {
                    output.pop();
                } else {
                    output.push(p);
                }
            });
            return output.join('').replace(/^\//, input.charAt(0) === '/' ? '/' : '');
        }
        href = parseURI(href || '');
        base = parseURI(base || '');
        return !href || !base ? null : (href.protocol || base.protocol) + (href.protocol || href.authority ? href.authority : base.authority) + removeDotSegments(href.protocol || href.authority || href.pathname.charAt(0) === '/' ? href.pathname : href.pathname ? (base.authority && !base.pathname ? '/' : '') + base.pathname.slice(0, base.pathname.lastIndexOf('/') + 1) + href.pathname : base.pathname) + (href.protocol || href.authority || href.pathname ? href.search : href.search || base.search) + href.hash;
    };
    can['import'] = function (moduleName, parentName) {
        var deferred = new can.Deferred();
        if (typeof window.System === 'object' && can.isFunction(window.System['import'])) {
            window.System['import'](moduleName, { name: parentName }).then(can.proxy(deferred.resolve, deferred), can.proxy(deferred.reject, deferred));
        } else if (window.define && window.define.amd) {
            window.require([moduleName], function (value) {
                deferred.resolve(value);
            });
        } else if (window.steal) {
            steal.steal(moduleName, function (value) {
                deferred.resolve(value);
            });
        } else if (window.require) {
            deferred.resolve(window.require(moduleName));
        } else {
            deferred.resolve();
        }
        return deferred.promise();
    };
    can.__observe = function () {
    };
    can.isNode = typeof process === 'object' && {}.toString.call(process) === '[object process]';
    can.isBrowserWindow = typeof window !== 'undefined' && typeof document !== 'undefined' && typeof SimpleDOM === 'undefined';
    can.isWebWorker = typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope;
    return can;
});
/*can@2.3.24#util/attr/attr*/
define('can/util/attr/attr', ['can/util/can'], function (can) {
    var setImmediate = can.global.setImmediate || function (cb) {
            return setTimeout(cb, 0);
        }, formElements = {
            'input': true,
            'textarea': true,
            'select': true
        }, hasProperty = function (el, attrName) {
            return attrName in el || can.document && formElements[el.nodeName.toLowerCase()];
        }, attr = {
            MutationObserver: can.global.MutationObserver || can.global.WebKitMutationObserver || can.global.MozMutationObserver,
            map: {
                'class': function (el, val) {
                    val = val || '';
                    if (el.namespaceURI === 'http://www.w3.org/2000/svg') {
                        el.setAttribute('class', val);
                    } else {
                        el.className = val;
                    }
                    return val;
                },
                'value': 'value',
                'innertext': 'innerText',
                'innerhtml': 'innerHTML',
                'textcontent': 'textContent',
                'for': 'htmlFor',
                'checked': true,
                'disabled': true,
                'readonly': function (el, val) {
                    el.readOnly = true;
                    return val;
                },
                'required': true,
                src: function (el, val) {
                    if (val == null || val === '') {
                        el.removeAttribute('src');
                        return null;
                    } else {
                        el.setAttribute('src', val);
                        return val;
                    }
                },
                style: function () {
                    var el = can.global.document && document.createElement('div');
                    if (el && el.style && 'cssText' in el.style) {
                        return function (el, val) {
                            return el.style.cssText = val || '';
                        };
                    } else {
                        return function (el, val) {
                            return el.setAttribute('style', val);
                        };
                    }
                }()
            },
            defaultValue: [
                'input',
                'textarea'
            ],
            setAttrOrProp: function (el, attrName, val) {
                attrName = attrName.toLowerCase();
                var prop = attr.map[attrName];
                if (prop === true && !val) {
                    this.remove(el, attrName);
                } else {
                    this.set(el, attrName, val);
                }
            },
            setSelectValue: function (el, val) {
                if (val != null) {
                    var options = el.getElementsByTagName('option');
                    for (var i = 0; i < options.length; i++) {
                        if (val == options[i].value) {
                            options[i].selected = true;
                            return;
                        }
                    }
                }
                el.selectedIndex = -1;
            },
            set: function (el, attrName, val) {
                var usingMutationObserver = can.isDOM(el) && attr.MutationObserver;
                attrName = attrName.toLowerCase();
                var oldValue;
                if (!usingMutationObserver) {
                    oldValue = attr.get(el, attrName);
                }
                var prop = attr.map[attrName], newValue;
                if (typeof prop === 'function') {
                    newValue = prop(el, val);
                } else if (prop === true && hasProperty(el, attrName)) {
                    newValue = el[attrName] = true;
                    if (attrName === 'checked' && el.type === 'radio') {
                        if (can.inArray((el.nodeName + '').toLowerCase(), attr.defaultValue) >= 0) {
                            el.defaultChecked = true;
                        }
                    }
                } else if (typeof prop === 'string' && hasProperty(el, prop)) {
                    newValue = val;
                    if (el[prop] !== val || el.nodeName.toUpperCase() === 'OPTION') {
                        el[prop] = val;
                    }
                    if (prop === 'value' && can.inArray((el.nodeName + '').toLowerCase(), attr.defaultValue) >= 0) {
                        el.defaultValue = val;
                    }
                } else {
                    attr.setAttribute(el, attrName, val);
                }
                if (!usingMutationObserver && newValue !== oldValue) {
                    attr.trigger(el, attrName, oldValue);
                }
            },
            setAttribute: function () {
                var doc = can.global.document;
                if (doc && document.createAttribute) {
                    try {
                        doc.createAttribute('{}');
                    } catch (e) {
                        var invalidNodes = {}, attributeDummy = document.createElement('div');
                        return function (el, attrName, val) {
                            var first = attrName.charAt(0), cachedNode, node;
                            if ((first === '{' || first === '(' || first === '*') && el.setAttributeNode) {
                                cachedNode = invalidNodes[attrName];
                                if (!cachedNode) {
                                    attributeDummy.innerHTML = '<div ' + attrName + '=""></div>';
                                    cachedNode = invalidNodes[attrName] = attributeDummy.childNodes[0].attributes[0];
                                }
                                node = cachedNode.cloneNode();
                                node.value = val;
                                el.setAttributeNode(node);
                            } else {
                                el.setAttribute(attrName, val);
                            }
                        };
                    }
                }
                return function (el, attrName, val) {
                    el.setAttribute(attrName, val);
                };
            }(),
            trigger: function (el, attrName, oldValue) {
                if (can.data(can.$(el), 'canHasAttributesBindings')) {
                    attrName = attrName.toLowerCase();
                    return setImmediate(function () {
                        can.trigger(el, {
                            type: 'attributes',
                            attributeName: attrName,
                            target: el,
                            oldValue: oldValue,
                            bubbles: false
                        }, []);
                    });
                }
            },
            get: function (el, attrName) {
                attrName = attrName.toLowerCase();
                var prop = attr.map[attrName];
                if (typeof prop === 'string' && hasProperty(el, prop)) {
                    return el[prop];
                } else if (prop === true && hasProperty(el, attrName)) {
                    return el[attrName];
                }
                return el.getAttribute(attrName);
            },
            remove: function (el, attrName) {
                attrName = attrName.toLowerCase();
                var oldValue;
                if (!attr.MutationObserver) {
                    oldValue = attr.get(el, attrName);
                }
                var setter = attr.map[attrName];
                if (typeof setter === 'function') {
                    setter(el, undefined);
                }
                if (setter === true && hasProperty(el, attrName)) {
                    el[attrName] = false;
                } else if (typeof setter === 'string' && hasProperty(el, setter)) {
                    el[setter] = '';
                } else {
                    el.removeAttribute(attrName);
                }
                if (!attr.MutationObserver && oldValue != null) {
                    attr.trigger(el, attrName, oldValue);
                }
            },
            has: function () {
                var el = can.global.document && document.createElement('div');
                if (el && el.hasAttribute) {
                    return function (el, name) {
                        return el.hasAttribute(name);
                    };
                } else {
                    return function (el, name) {
                        return el.getAttribute(name) !== null;
                    };
                }
            }()
        };
    return attr;
});
/*can@2.3.24#event/event*/
define('can/event/event', ['can/util/can'], function (can) {
    can.addEvent = function (event, handler) {
        var allEvents = this.__bindEvents || (this.__bindEvents = {}), eventList = allEvents[event] || (allEvents[event] = []);
        eventList.push({
            handler: handler,
            name: event
        });
        return this;
    };
    can.listenTo = function (other, event, handler) {
        var idedEvents = this.__listenToEvents;
        if (!idedEvents) {
            idedEvents = this.__listenToEvents = {};
        }
        var otherId = can.cid(other);
        var othersEvents = idedEvents[otherId];
        if (!othersEvents) {
            othersEvents = idedEvents[otherId] = {
                obj: other,
                events: {}
            };
        }
        var eventsEvents = othersEvents.events[event];
        if (!eventsEvents) {
            eventsEvents = othersEvents.events[event] = [];
        }
        eventsEvents.push(handler);
        can.bind.call(other, event, handler);
    };
    can.stopListening = function (other, event, handler) {
        var idedEvents = this.__listenToEvents, iterIdedEvents = idedEvents, i = 0;
        if (!idedEvents) {
            return this;
        }
        if (other) {
            var othercid = can.cid(other);
            (iterIdedEvents = {})[othercid] = idedEvents[othercid];
            if (!idedEvents[othercid]) {
                return this;
            }
        }
        for (var cid in iterIdedEvents) {
            var othersEvents = iterIdedEvents[cid], eventsEvents;
            other = idedEvents[cid].obj;
            if (!event) {
                eventsEvents = othersEvents.events;
            } else {
                (eventsEvents = {})[event] = othersEvents.events[event];
            }
            for (var eventName in eventsEvents) {
                var handlers = eventsEvents[eventName] || [];
                i = 0;
                while (i < handlers.length) {
                    if (handler && handler === handlers[i] || !handler) {
                        can.unbind.call(other, eventName, handlers[i]);
                        handlers.splice(i, 1);
                    } else {
                        i++;
                    }
                }
                if (!handlers.length) {
                    delete othersEvents.events[eventName];
                }
            }
            if (can.isEmptyObject(othersEvents.events)) {
                delete idedEvents[cid];
            }
        }
        return this;
    };
    can.removeEvent = function (event, fn, __validate) {
        if (!this.__bindEvents) {
            return this;
        }
        var events = this.__bindEvents[event] || [], i = 0, ev, isFunction = typeof fn === 'function';
        while (i < events.length) {
            ev = events[i];
            if (__validate ? __validate(ev, event, fn) : isFunction && ev.handler === fn || !isFunction && (ev.cid === fn || !fn)) {
                events.splice(i, 1);
            } else {
                i++;
            }
        }
        return this;
    };
    can.dispatch = function (event, args) {
        var events = this.__bindEvents;
        if (!events) {
            return;
        }
        var eventName;
        if (typeof event === 'string') {
            eventName = event;
            event = { type: event };
        } else {
            eventName = event.type;
        }
        var handlers = events[eventName];
        if (!handlers) {
            return;
        } else {
            handlers = handlers.slice(0);
        }
        var passed = [event];
        if (args) {
            passed.push.apply(passed, args);
        }
        for (var i = 0, len = handlers.length; i < len; i++) {
            handlers[i].handler.apply(this, passed);
        }
        return event;
    };
    can.one = function (event, handler) {
        var one = function () {
            can.unbind.call(this, event, one);
            return handler.apply(this, arguments);
        };
        can.bind.call(this, event, one);
        return this;
    };
    can.event = {
        on: function () {
            if (arguments.length === 0 && can.Control && this instanceof can.Control) {
                return can.Control.prototype.on.call(this);
            } else {
                return can.addEvent.apply(this, arguments);
            }
        },
        off: function () {
            if (arguments.length === 0 && can.Control && this instanceof can.Control) {
                return can.Control.prototype.off.call(this);
            } else {
                return can.removeEvent.apply(this, arguments);
            }
        },
        bind: can.addEvent,
        unbind: can.removeEvent,
        delegate: function (selector, event, handler) {
            return can.addEvent.call(this, event, handler);
        },
        undelegate: function (selector, event, handler) {
            return can.removeEvent.call(this, event, handler);
        },
        trigger: can.dispatch,
        one: can.one,
        addEvent: can.addEvent,
        removeEvent: can.removeEvent,
        listenTo: can.listenTo,
        stopListening: can.stopListening,
        dispatch: can.dispatch
    };
    return can.event;
});
/*can@2.3.24#util/fragment*/
define('can/util/fragment', ['can/util/can'], function (can) {
    var fragmentRE = /^\s*<(\w+)[^>]*>/, toString = {}.toString, fragment = function (html, name, doc) {
            if (name === undefined) {
                name = fragmentRE.test(html) && RegExp.$1;
            }
            if (html && toString.call(html.replace) === '[object Function]') {
                html = html.replace(/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, '<$1></$2>');
            }
            var container = doc.createElement('div'), temp = doc.createElement('div');
            if (name === 'tbody' || name === 'tfoot' || name === 'thead' || name === 'colgroup') {
                temp.innerHTML = '<table>' + html + '</table>';
                container = temp.firstChild.nodeType === 3 ? temp.lastChild : temp.firstChild;
            } else if (name === 'col') {
                temp.innerHTML = '<table><colgroup>' + html + '</colgroup></table>';
                container = temp.firstChild.nodeType === 3 ? temp.lastChild : temp.firstChild.firstChild;
            } else if (name === 'tr') {
                temp.innerHTML = '<table><tbody>' + html + '</tbody></table>';
                container = temp.firstChild.nodeType === 3 ? temp.lastChild : temp.firstChild.firstChild;
            } else if (name === 'td' || name === 'th') {
                temp.innerHTML = '<table><tbody><tr>' + html + '</tr></tbody></table>';
                container = temp.firstChild.nodeType === 3 ? temp.lastChild : temp.firstChild.firstChild.firstChild;
            } else if (name === 'option') {
                temp.innerHTML = '<select>' + html + '</select>';
                container = temp.firstChild.nodeType === 3 ? temp.lastChild : temp.firstChild;
            } else {
                container.innerHTML = '' + html;
            }
            var tmp = {}, children = can.childNodes(container);
            tmp.length = children.length;
            for (var i = 0; i < children.length; i++) {
                tmp[i] = children[i];
            }
            return [].slice.call(tmp);
        };
    can.buildFragment = function (html, doc) {
        if (html && html.nodeType === 11) {
            return html;
        }
        if (!doc) {
            doc = document;
        } else if (doc.length) {
            doc = doc[0];
        }
        var parts = fragment(html, undefined, doc), frag = (doc || document).createDocumentFragment();
        for (var i = 0, length = parts.length; i < length; i++) {
            frag.appendChild(parts[i]);
        }
        return frag;
    };
    (function () {
        var text = '<-\n>', frag = can.buildFragment(text, document);
        if (text !== frag.firstChild.nodeValue) {
            var oldBuildFragment = can.buildFragment;
            can.buildFragment = function (html, nodes) {
                var res = oldBuildFragment(html, nodes);
                if (res.childNodes.length === 1 && res.childNodes[0].nodeType === 3) {
                    res.childNodes[0].nodeValue = html;
                }
                return res;
            };
        }
    }());
    return can;
});
/*can@2.3.24#util/array/isArrayLike*/
define('can/util/array/isArrayLike', ['can/util/can'], function (can) {
    can.isArrayLike = function (obj) {
        var length = obj && typeof obj !== 'boolean' && typeof obj !== 'number' && 'length' in obj && obj.length;
        return typeof arr !== 'function' && (length === 0 || typeof length === 'number' && length > 0 && length - 1 in obj);
    };
});
/*can@2.3.24#util/array/each*/
define('can/util/array/each', [
    'can/util/can',
    'can/util/array/isArrayLike'
], function (can) {
    can.each = function (elements, callback, context) {
        var i = 0, key, len, item;
        if (elements) {
            if (can.isArrayLike(elements)) {
                if (can.List && elements instanceof can.List) {
                    for (len = elements.attr('length'); i < len; i++) {
                        item = elements.attr(i);
                        if (callback.call(context || item, item, i, elements) === false) {
                            break;
                        }
                    }
                } else {
                    for (len = elements.length; i < len; i++) {
                        item = elements[i];
                        if (callback.call(context || item, item, i, elements) === false) {
                            break;
                        }
                    }
                }
            } else if (typeof elements === 'object') {
                if (can.Map && elements instanceof can.Map || elements === can.route) {
                    var keys = can.Map.keys(elements);
                    for (i = 0, len = keys.length; i < len; i++) {
                        key = keys[i];
                        item = elements.attr(key);
                        if (callback.call(context || item, item, key, elements) === false) {
                            break;
                        }
                    }
                } else {
                    for (key in elements) {
                        if (Object.prototype.hasOwnProperty.call(elements, key) && callback.call(context || elements[key], elements[key], key, elements) === false) {
                            break;
                        }
                    }
                }
            }
        }
        return elements;
    };
    return can;
});
/*can@2.3.24#util/inserted/inserted*/
define('can/util/inserted/inserted', ['can/util/can'], function (can) {
    can.inserted = function (elems, document) {
        if (!elems.length) {
            return;
        }
        elems = can.makeArray(elems);
        var doc = document || elems[0].ownerDocument || elems[0], inDocument = false, root = can.$(doc.contains ? doc : doc.body), children;
        for (var i = 0, elem; (elem = elems[i]) !== undefined; i++) {
            if (!inDocument) {
                if (elem.getElementsByTagName) {
                    if (can.has(root, elem).length) {
                        inDocument = true;
                    } else {
                        return;
                    }
                } else {
                    continue;
                }
            }
            if (inDocument && elem.getElementsByTagName) {
                children = can.makeArray(elem.getElementsByTagName('*'));
                can.trigger(elem, 'inserted', [], false);
                for (var j = 0, child; (child = children[j]) !== undefined; j++) {
                    can.trigger(child, 'inserted', [], false);
                }
            }
        }
    };
    can.appendChild = function (el, child, document) {
        var children;
        if (child.nodeType === 11) {
            children = can.makeArray(can.childNodes(child));
        } else {
            children = [child];
        }
        el.appendChild(child);
        can.inserted(children, document);
    };
    can.insertBefore = function (el, child, ref, document) {
        var children;
        if (child.nodeType === 11) {
            children = can.makeArray(can.childNodes(child));
        } else {
            children = [child];
        }
        el.insertBefore(child, ref);
        can.inserted(children, document);
    };
});
/*can@2.3.24#util/jquery/jquery*/
define('can/util/jquery/jquery', [
    'jquery/jquery',
    'can/util/can',
    'can/util/attr/attr',
    'can/event/event',
    'can/util/fragment',
    'can/util/array/each',
    'can/util/inserted/inserted'
], function ($, can, attr, event) {
    var isBindableElement = function (node) {
        return node.nodeName && (node.nodeType === 1 || node.nodeType === 9) || node == window || node.addEventListener;
    };
    $ = $ || window.jQuery;
    $.extend(can, $, {
        trigger: function (obj, event, args, bubbles) {
            if (isBindableElement(obj)) {
                $.event.trigger(event, args, obj, !bubbles);
            } else if (obj.trigger) {
                obj.trigger(event, args);
            } else {
                if (typeof event === 'string') {
                    event = { type: event };
                }
                event.target = event.target || obj;
                if (args) {
                    if (args.length && typeof args === 'string') {
                        args = [args];
                    } else if (!args.length) {
                        args = [args];
                    }
                }
                if (!args) {
                    args = [];
                }
                can.dispatch.call(obj, event, args);
            }
        },
        event: can.event,
        addEvent: can.addEvent,
        removeEvent: can.removeEvent,
        buildFragment: can.buildFragment,
        $: $,
        each: can.each,
        bind: function (ev, cb) {
            if (this.bind && this.bind !== can.bind) {
                this.bind(ev, cb);
            } else if (isBindableElement(this)) {
                $.event.add(this, ev, cb);
            } else {
                can.addEvent.call(this, ev, cb);
            }
            return this;
        },
        unbind: function (ev, cb) {
            if (this.unbind && this.unbind !== can.unbind) {
                this.unbind(ev, cb);
            } else if (isBindableElement(this)) {
                $.event.remove(this, ev, cb);
            } else {
                can.removeEvent.call(this, ev, cb);
            }
            return this;
        },
        delegate: function (selector, ev, cb) {
            if (this.delegate) {
                this.delegate(selector, ev, cb);
            } else if (isBindableElement(this)) {
                $(this).delegate(selector, ev, cb);
            } else {
                can.bind.call(this, ev, cb);
            }
            return this;
        },
        undelegate: function (selector, ev, cb) {
            if (this.undelegate) {
                this.undelegate(selector, ev, cb);
            } else if (isBindableElement(this)) {
                $(this).undelegate(selector, ev, cb);
            } else {
                can.unbind.call(this, ev, cb);
            }
            return this;
        },
        proxy: can.proxy,
        attr: attr
    });
    can.on = can.bind;
    can.off = can.unbind;
    $.each([
        'append',
        'filter',
        'addClass',
        'remove',
        'data',
        'get',
        'has'
    ], function (i, name) {
        can[name] = function (wrapped) {
            return wrapped[name].apply(wrapped, can.makeArray(arguments).slice(1));
        };
    });
    var oldClean = $.cleanData;
    $.cleanData = function (elems) {
        $.each(elems, function (i, elem) {
            if (elem) {
                can.trigger(elem, 'removed', [], false);
            }
        });
        oldClean(elems);
    };
    var oldDomManip = $.fn.domManip, cbIndex;
    $.fn.domManip = function (args, cb1, cb2) {
        for (var i = 1; i < arguments.length; i++) {
            if (typeof arguments[i] === 'function') {
                cbIndex = i;
                break;
            }
        }
        return oldDomManip.apply(this, arguments);
    };
    $(document.createElement('div')).append(document.createElement('div'));
    var getChildNodes = function (node) {
        var childNodes = node.childNodes;
        if ('length' in childNodes) {
            return can.makeArray(childNodes);
        } else {
            var cur = node.firstChild;
            var nodes = [];
            while (cur) {
                nodes.push(cur);
                cur = cur.nextSibling;
            }
            return nodes;
        }
    };
    if (cbIndex === undefined) {
        $.fn.domManip = oldDomManip;
        can.each([
            'after',
            'prepend',
            'before',
            'append',
            'replaceWith'
        ], function (name) {
            var original = $.fn[name];
            $.fn[name] = function () {
                var elems = [], args = can.makeArray(arguments);
                if (args[0] != null) {
                    if (typeof args[0] === 'string') {
                        args[0] = can.buildFragment(args[0]);
                    }
                    if (args[0].nodeType === 11) {
                        elems = getChildNodes(args[0]);
                    } else if (can.isArrayLike(args[0])) {
                        elems = can.makeArray(args[0]);
                    } else {
                        elems = [args[0]];
                    }
                }
                var ret = original.apply(this, args);
                can.inserted(elems);
                return ret;
            };
        });
    } else {
        $.fn.domManip = cbIndex === 2 ? function (args, table, callback) {
            return oldDomManip.call(this, args, table, function (elem) {
                var elems;
                if (elem.nodeType === 11) {
                    elems = can.makeArray(can.childNodes(elem));
                }
                var ret = callback.apply(this, arguments);
                can.inserted(elems ? elems : [elem]);
                return ret;
            });
        } : function (args, callback) {
            return oldDomManip.call(this, args, function (elem) {
                var elems;
                if (elem.nodeType === 11) {
                    elems = can.makeArray(can.childNodes(elem));
                }
                var ret = callback.apply(this, arguments);
                can.inserted(elems ? elems : [elem]);
                return ret;
            });
        };
    }
    var oldAttr = $.attr;
    $.attr = function (el, attrName) {
        if (can.isDOM(el) && can.attr.MutationObserver) {
            return oldAttr.apply(this, arguments);
        } else {
            var oldValue, newValue;
            if (arguments.length >= 3) {
                oldValue = oldAttr.call(this, el, attrName);
            }
            var res = oldAttr.apply(this, arguments);
            if (arguments.length >= 3) {
                newValue = oldAttr.call(this, el, attrName);
            }
            if (newValue !== oldValue) {
                can.attr.trigger(el, attrName, oldValue);
            }
            return res;
        }
    };
    var oldRemove = $.removeAttr;
    $.removeAttr = function (el, attrName) {
        if (can.isDOM(el) && can.attr.MutationObserver) {
            return oldRemove.apply(this, arguments);
        } else {
            var oldValue = oldAttr.call(this, el, attrName), res = oldRemove.apply(this, arguments);
            if (oldValue != null) {
                can.attr.trigger(el, attrName, oldValue);
            }
            return res;
        }
    };
    $.event.special.attributes = {
        setup: function () {
            if (can.isDOM(this) && can.attr.MutationObserver) {
                var self = this;
                var observer = new can.attr.MutationObserver(function (mutations) {
                    mutations.forEach(function (mutation) {
                        var copy = can.simpleExtend({}, mutation);
                        can.trigger(self, copy, []);
                    });
                });
                observer.observe(this, {
                    attributes: true,
                    attributeOldValue: true
                });
                can.data(can.$(this), 'canAttributesObserver', observer);
            } else {
                can.data(can.$(this), 'canHasAttributesBindings', true);
            }
        },
        teardown: function () {
            if (can.isDOM(this) && can.attr.MutationObserver) {
                can.data(can.$(this), 'canAttributesObserver').disconnect();
                $.removeData(this, 'canAttributesObserver');
            } else {
                $.removeData(this, 'canHasAttributesBindings');
            }
        }
    };
    $.event.special.inserted = {};
    $.event.special.removed = {};
    return can;
});
/*can@2.3.24#util/util*/
define('can/util/util', ['can/util/jquery/jquery'], function (can) {
    return can;
});
/*can@2.3.24#util/bind/bind*/
define('can/util/bind/bind', ['can/util/util'], function (can) {
    can.bindAndSetup = function () {
        can.addEvent.apply(this, arguments);
        if (!this.__inSetup) {
            if (!this._bindings) {
                this._bindings = 1;
                if (this._bindsetup) {
                    this._bindsetup();
                }
            } else {
                this._bindings++;
            }
        }
        return this;
    };
    can.unbindAndTeardown = function (event, handler) {
        if (!this.__bindEvents) {
            return this;
        }
        var handlers = this.__bindEvents[event] || [];
        var handlerCount = handlers.length;
        can.removeEvent.apply(this, arguments);
        if (this._bindings === null) {
            this._bindings = 0;
        } else {
            this._bindings = this._bindings - (handlerCount - handlers.length);
        }
        if (!this._bindings && this._bindteardown) {
            this._bindteardown();
        }
        return this;
    };
    return can;
});
/*can@2.3.24#map/bubble*/
define('can/map/bubble', ['can/util/util'], function (can) {
    var bubble = can.bubble = {
        bind: function (parent, eventName) {
            if (!parent.__inSetup) {
                var bubbleEvents = bubble.events(parent, eventName), len = bubbleEvents.length, bubbleEvent;
                if (!parent._bubbleBindings) {
                    parent._bubbleBindings = {};
                }
                for (var i = 0; i < len; i++) {
                    bubbleEvent = bubbleEvents[i];
                    if (!parent._bubbleBindings[bubbleEvent]) {
                        parent._bubbleBindings[bubbleEvent] = 1;
                        bubble.childrenOf(parent, bubbleEvent);
                    } else {
                        parent._bubbleBindings[bubbleEvent]++;
                    }
                }
            }
        },
        unbind: function (parent, eventName) {
            var bubbleEvents = bubble.events(parent, eventName), len = bubbleEvents.length, bubbleEvent;
            for (var i = 0; i < len; i++) {
                bubbleEvent = bubbleEvents[i];
                if (parent._bubbleBindings) {
                    parent._bubbleBindings[bubbleEvent]--;
                }
                if (parent._bubbleBindings && !parent._bubbleBindings[bubbleEvent]) {
                    delete parent._bubbleBindings[bubbleEvent];
                    bubble.teardownChildrenFrom(parent, bubbleEvent);
                    if (can.isEmptyObject(parent._bubbleBindings)) {
                        delete parent._bubbleBindings;
                    }
                }
            }
        },
        add: function (parent, child, prop) {
            if (child instanceof can.Map && parent._bubbleBindings) {
                for (var eventName in parent._bubbleBindings) {
                    if (parent._bubbleBindings[eventName]) {
                        bubble.teardownFromParent(parent, child, eventName);
                        bubble.toParent(child, parent, prop, eventName);
                    }
                }
            }
        },
        addMany: function (parent, children) {
            for (var i = 0, len = children.length; i < len; i++) {
                bubble.add(parent, children[i], i);
            }
        },
        remove: function (parent, child) {
            if (child instanceof can.Map && parent._bubbleBindings) {
                for (var eventName in parent._bubbleBindings) {
                    if (parent._bubbleBindings[eventName]) {
                        bubble.teardownFromParent(parent, child, eventName);
                    }
                }
            }
        },
        removeMany: function (parent, children) {
            for (var i = 0, len = children.length; i < len; i++) {
                bubble.remove(parent, children[i]);
            }
        },
        set: function (parent, prop, value, current) {
            if (can.isMapLike(value)) {
                bubble.add(parent, value, prop);
            }
            if (can.isMapLike(current)) {
                bubble.remove(parent, current);
            }
            return value;
        },
        events: function (map, boundEventName) {
            return map.constructor._bubbleRule(boundEventName, map);
        },
        toParent: function (child, parent, prop, eventName) {
            can.listenTo.call(parent, child, eventName, function () {
                var args = can.makeArray(arguments), ev = args.shift();
                args[0] = (can.List && parent instanceof can.List ? parent.indexOf(child) : prop) + (args[0] ? '.' + args[0] : '');
                ev.triggeredNS = ev.triggeredNS || {};
                if (ev.triggeredNS[parent._cid]) {
                    return;
                }
                ev.triggeredNS[parent._cid] = true;
                can.trigger(parent, ev, args);
                if (eventName === 'change') {
                    can.trigger(parent, args[0], [
                        args[2],
                        args[3]
                    ]);
                }
            });
        },
        childrenOf: function (parent, eventName) {
            parent._each(function (child, prop) {
                if (child && child.bind) {
                    bubble.toParent(child, parent, prop, eventName);
                }
            });
        },
        teardownFromParent: function (parent, child, eventName) {
            if (child && child.unbind) {
                can.stopListening.call(parent, child, eventName);
            }
        },
        teardownChildrenFrom: function (parent, eventName) {
            parent._each(function (child) {
                bubble.teardownFromParent(parent, child, eventName);
            });
        },
        isBubbling: function (parent, eventName) {
            return parent._bubbleBindings && parent._bubbleBindings[eventName];
        }
    };
    return bubble;
});
/*can@2.3.24#util/object/isplain/isplain*/
define('can/util/object/isplain/isplain', ['can/util/can'], function (can) {
    var core_hasOwn = Object.prototype.hasOwnProperty, isWindow = function (obj) {
            return obj !== null && obj == obj.window;
        }, isPlainObject = function (obj) {
            if (!obj || typeof obj !== 'object' || obj.nodeType || isWindow(obj)) {
                return false;
            }
            try {
                if (obj.constructor && !core_hasOwn.call(obj, 'constructor') && !core_hasOwn.call(obj.constructor.prototype, 'isPrototypeOf')) {
                    return false;
                }
            } catch (e) {
                return false;
            }
            var key;
            for (key in obj) {
            }
            return key === undefined || core_hasOwn.call(obj, key);
        };
    can.isPlainObject = isPlainObject;
    return can;
});
/*can@2.3.24#map/map_helpers*/
define('can/map/map_helpers', [
    'can/util/util',
    'can/util/object/isplain/isplain'
], function (can) {
    var mapHelpers = {
        attrParts: function (attr, keepKey) {
            if (keepKey) {
                return [attr];
            }
            return typeof attr === 'object' ? attr : ('' + attr).split('.');
        },
        canMakeObserve: function (obj) {
            return obj && !can.isPromise(obj) && (can.isArray(obj) || can.isPlainObject(obj));
        },
        serialize: function () {
            var serializeMap = null;
            return function (map, how, where) {
                var cid = can.cid(map), firstSerialize = false;
                if (!serializeMap) {
                    firstSerialize = true;
                    serializeMap = {
                        attr: {},
                        serialize: {}
                    };
                }
                serializeMap[how][cid] = where;
                map.each(function (val, name) {
                    var result, isObservable = can.isMapLike(val), serialized = isObservable && serializeMap[how][can.cid(val)];
                    if (serialized) {
                        result = serialized;
                    } else {
                        if (map['___' + how]) {
                            result = map['___' + how](name, val);
                        } else {
                            result = mapHelpers.getValue(map, name, val, how);
                        }
                    }
                    if (result !== undefined) {
                        where[name] = result;
                    }
                });
                if (firstSerialize) {
                    serializeMap = null;
                }
                return where;
            };
        }(),
        getValue: function (map, name, val, how) {
            if (can.isMapLike(val)) {
                return val[how]();
            } else {
                return val;
            }
        },
        define: null,
        addComputedAttr: function (map, attrName, compute) {
            map._computedAttrs[attrName] = {
                compute: compute,
                count: 0,
                handler: function (ev, newVal, oldVal) {
                    map._triggerChange(attrName, 'set', newVal, oldVal, ev.batchNum);
                }
            };
        },
        addToMap: function addToMap(obj, instance) {
            var teardown;
            if (!madeMap) {
                teardown = teardownMap;
                madeMap = {};
            }
            var hasCid = obj._cid;
            var cid = can.cid(obj);
            if (!madeMap[cid]) {
                madeMap[cid] = {
                    obj: obj,
                    instance: instance,
                    added: !hasCid
                };
            }
            return teardown;
        },
        getMapFromObject: function (obj) {
            return madeMap && madeMap[obj._cid] && madeMap[obj._cid].instance;
        }
    };
    var madeMap = null;
    var teardownMap = function () {
        for (var cid in madeMap) {
            if (madeMap[cid].added) {
                delete madeMap[cid].obj._cid;
            }
        }
        madeMap = null;
    };
    return mapHelpers;
});
/*can@2.3.24#util/string/string*/
define('can/util/string/string', ['can/util/util'], function (can) {
    var strUndHash = /_|-/, strColons = /\=\=/, strWords = /([A-Z]+)([A-Z][a-z])/g, strLowUp = /([a-z\d])([A-Z])/g, strDash = /([a-z\d])([A-Z])/g, strReplacer = /\{([^\}]+)\}/g, strQuote = /"/g, strSingleQuote = /'/g, strHyphenMatch = /-+(.)?/g, strCamelMatch = /[a-z][A-Z]/g, getNext = function (obj, prop, add) {
            var result = obj[prop];
            if (result === undefined && add === true) {
                result = obj[prop] = {};
            }
            return result;
        }, isContainer = function (current) {
            return /^f|^o/.test(typeof current);
        }, convertBadValues = function (content) {
            var isInvalid = content === null || content === undefined || isNaN(content) && '' + content === 'NaN';
            return '' + (isInvalid ? '' : content);
        };
    can.extend(can, {
        esc: function (content) {
            return convertBadValues(content).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(strQuote, '&#34;').replace(strSingleQuote, '&#39;');
        },
        getObject: function (name, roots, add) {
            var parts = name ? name.split('.') : [], length = parts.length, current, r = 0, i, container, rootsLength;
            roots = can.isArray(roots) ? roots : [roots || window];
            rootsLength = roots.length;
            if (!length) {
                return roots[0];
            }
            for (r; r < rootsLength; r++) {
                current = roots[r];
                container = undefined;
                for (i = 0; i < length && isContainer(current); i++) {
                    container = current;
                    current = getNext(container, parts[i]);
                }
                if (container !== undefined && current !== undefined) {
                    break;
                }
            }
            if (add === false && current !== undefined) {
                delete container[parts[i - 1]];
            }
            if (add === true && current === undefined) {
                current = roots[0];
                for (i = 0; i < length && isContainer(current); i++) {
                    current = getNext(current, parts[i], true);
                }
            }
            return current;
        },
        capitalize: function (s, cache) {
            return s.charAt(0).toUpperCase() + s.slice(1);
        },
        camelize: function (str) {
            return convertBadValues(str).replace(strHyphenMatch, function (match, chr) {
                return chr ? chr.toUpperCase() : '';
            });
        },
        hyphenate: function (str) {
            return convertBadValues(str).replace(strCamelMatch, function (str, offset) {
                return str.charAt(0) + '-' + str.charAt(1).toLowerCase();
            });
        },
        underscore: function (s) {
            return s.replace(strColons, '/').replace(strWords, '$1_$2').replace(strLowUp, '$1_$2').replace(strDash, '_').toLowerCase();
        },
        sub: function (str, data, remove) {
            var obs = [];
            str = str || '';
            obs.push(str.replace(strReplacer, function (whole, inside) {
                var ob = can.getObject(inside, data, remove === true ? false : undefined);
                if (ob === undefined || ob === null) {
                    obs = null;
                    return '';
                }
                if (isContainer(ob) && obs) {
                    obs.push(ob);
                    return '';
                }
                return '' + ob;
            }));
            return obs === null ? obs : obs.length <= 1 ? obs[0] : obs;
        },
        replacer: strReplacer,
        undHash: strUndHash
    });
    return can;
});
/*can@2.3.24#construct/construct*/
define('can/construct/construct', ['can/util/string/string'], function (can) {
    var initializing = 0;
    var canGetDescriptor;
    try {
        Object.getOwnPropertyDescriptor({});
        canGetDescriptor = true;
    } catch (e) {
        canGetDescriptor = false;
    }
    var getDescriptor = function (newProps, name) {
            var descriptor = Object.getOwnPropertyDescriptor(newProps, name);
            if (descriptor && (descriptor.get || descriptor.set)) {
                return descriptor;
            }
            return null;
        }, inheritGetterSetter = function (newProps, oldProps, addTo) {
            addTo = addTo || newProps;
            var descriptor;
            for (var name in newProps) {
                if (descriptor = getDescriptor(newProps, name)) {
                    this._defineProperty(addTo, oldProps, name, descriptor);
                } else {
                    can.Construct._overwrite(addTo, oldProps, name, newProps[name]);
                }
            }
        }, simpleInherit = function (newProps, oldProps, addTo) {
            addTo = addTo || newProps;
            for (var name in newProps) {
                can.Construct._overwrite(addTo, oldProps, name, newProps[name]);
            }
        };
    can.Construct = function () {
        if (arguments.length) {
            return can.Construct.extend.apply(can.Construct, arguments);
        }
    };
    can.extend(can.Construct, {
        constructorExtends: true,
        newInstance: function () {
            var inst = this.instance(), args;
            if (inst.setup) {
                inst.__inSetup = true;
                args = inst.setup.apply(inst, arguments);
                delete inst.__inSetup;
            }
            if (inst.init) {
                inst.init.apply(inst, args || arguments);
            }
            return inst;
        },
        _inherit: canGetDescriptor ? inheritGetterSetter : simpleInherit,
        _defineProperty: function (what, oldProps, propName, descriptor) {
            Object.defineProperty(what, propName, descriptor);
        },
        _overwrite: function (what, oldProps, propName, val) {
            what[propName] = val;
        },
        setup: function (base, fullName) {
            this.defaults = can.extend(true, {}, base.defaults, this.defaults);
        },
        instance: function () {
            initializing = 1;
            var inst = new this();
            initializing = 0;
            return inst;
        },
        extend: function (name, staticProperties, instanceProperties) {
            var fullName = name, klass = staticProperties, proto = instanceProperties;
            if (typeof fullName !== 'string') {
                proto = klass;
                klass = fullName;
                fullName = null;
            }
            if (!proto) {
                proto = klass;
                klass = null;
            }
            proto = proto || {};
            var _super_class = this, _super = this.prototype, Constructor, parts, current, _fullName, _shortName, propName, shortName, namespace, prototype;
            prototype = this.instance();
            can.Construct._inherit(proto, _super, prototype);
            if (fullName) {
                parts = fullName.split('.');
                shortName = parts.pop();
            } else if (klass && klass.shortName) {
                shortName = klass.shortName;
            } else if (this.shortName) {
                shortName = this.shortName;
            }
            if (typeof constructorName === 'undefined') {
                Constructor = function () {
                    return init.apply(this, arguments);
                };
            }
            function init() {
                if (!initializing) {
                    return this.constructor !== Constructor && arguments.length && Constructor.constructorExtends ? Constructor.extend.apply(Constructor, arguments) : Constructor.newInstance.apply(Constructor, arguments);
                }
            }
            for (propName in _super_class) {
                if (_super_class.hasOwnProperty(propName)) {
                    Constructor[propName] = _super_class[propName];
                }
            }
            can.Construct._inherit(klass, _super_class, Constructor);
            if (fullName) {
                current = can.getObject(parts.join('.'), window, true);
                namespace = current;
                _fullName = can.underscore(fullName.replace(/\./g, '_'));
                _shortName = can.underscore(shortName);
                current[shortName] = Constructor;
            }
            can.extend(Constructor, {
                constructor: Constructor,
                prototype: prototype,
                namespace: namespace,
                _shortName: _shortName,
                fullName: fullName,
                _fullName: _fullName
            });
            if (shortName !== undefined) {
                Constructor.shortName = shortName;
            }
            Constructor.prototype.constructor = Constructor;
            var t = [_super_class].concat(can.makeArray(arguments)), args = Constructor.setup.apply(Constructor, t);
            if (Constructor.init) {
                Constructor.init.apply(Constructor, args || t);
            }
            return Constructor;
        }
    });
    can.Construct.prototype.setup = function () {
    };
    can.Construct.prototype.init = function () {
    };
    return can.Construct;
});
/*can@2.3.24#util/batch/batch*/
define('can/util/batch/batch', ['can/util/can'], function (can) {
    var batchNum = 1, transactions = 0, dispatchingBatch = null, collectingBatch = null, batches = [], dispatchingBatches = false;
    can.batch = {
        start: function (batchStopHandler) {
            transactions++;
            if (transactions === 1) {
                var batch = {
                    events: [],
                    callbacks: [],
                    number: batchNum++
                };
                batches.push(batch);
                if (batchStopHandler) {
                    batch.callbacks.push(batchStopHandler);
                }
                collectingBatch = batch;
            }
        },
        stop: function (force, callStart) {
            if (force) {
                transactions = 0;
            } else {
                transactions--;
            }
            if (transactions === 0) {
                collectingBatch = null;
                var batch;
                if (dispatchingBatches === false) {
                    dispatchingBatches = true;
                    var callbacks = [], i;
                    while (batch = batches.shift()) {
                        var events = batch.events;
                        callbacks.push.apply(callbacks, batch.callbacks);
                        dispatchingBatch = batch;
                        can.batch.batchNum = batch.number;
                        var len;
                        if (callStart) {
                            can.batch.start();
                        }
                        for (i = 0, len = events.length; i < len; i++) {
                            can.dispatch.apply(events[i][0], events[i][1]);
                        }
                        can.batch._onDispatchedEvents(batch.number);
                        dispatchingBatch = null;
                        can.batch.batchNum = undefined;
                    }
                    for (i = callbacks.length - 1; i >= 0; i--) {
                        callbacks[i]();
                    }
                    dispatchingBatches = false;
                }
            }
        },
        _onDispatchedEvents: function () {
        },
        trigger: function (item, event, args) {
            if (!item.__inSetup) {
                event = typeof event === 'string' ? { type: event } : event;
                if (collectingBatch) {
                    event.batchNum = collectingBatch.number;
                    collectingBatch.events.push([
                        item,
                        [
                            event,
                            args
                        ]
                    ]);
                } else if (event.batchNum) {
                    can.dispatch.call(item, event, args);
                } else if (batches.length) {
                    can.batch.start();
                    event.batchNum = collectingBatch.number;
                    collectingBatch.events.push([
                        item,
                        [
                            event,
                            args
                        ]
                    ]);
                    can.batch.stop();
                } else {
                    can.dispatch.call(item, event, args);
                }
            }
        },
        afterPreviousEvents: function (handler) {
            var batch = can.last(batches);
            if (batch) {
                var obj = {};
                can.bind.call(obj, 'ready', handler);
                batch.events.push([
                    obj,
                    [
                        { type: 'ready' },
                        []
                    ]
                ]);
            } else {
                handler({});
            }
        },
        after: function (handler) {
            var batch = collectingBatch || dispatchingBatch;
            if (batch) {
                batch.callbacks.push(handler);
            } else {
                handler({});
            }
        }
    };
});
/*can@2.3.24#compute/get_value_and_bind*/
define('can/compute/get_value_and_bind', ['can/util/util'], function (can) {
    function ObservedInfo(func, context, compute) {
        this.newObserved = {};
        this.oldObserved = null;
        this.func = func;
        this.context = context;
        this.compute = compute;
        this.onDependencyChange = can.proxy(this.onDependencyChange, this);
        this.depth = null;
        this.childDepths = {};
        this.ignore = 0;
        this.inBatch = false;
        this.ready = false;
        compute.observedInfo = this;
        this.setReady = can.proxy(this._setReady, this);
    }
    can.simpleExtend(ObservedInfo.prototype, {
        getPrimaryDepth: function () {
            return this.compute._primaryDepth;
        },
        _setReady: function () {
            this.ready = true;
        },
        getDepth: function () {
            if (this.depth !== null) {
                return this.depth;
            } else {
                return this.depth = this._getDepth();
            }
        },
        _getDepth: function () {
            var max = 0, childDepths = this.childDepths;
            for (var cid in childDepths) {
                if (childDepths[cid] > max) {
                    max = childDepths[cid];
                }
            }
            return max + 1;
        },
        addEdge: function (objEv) {
            objEv.obj.bind(objEv.event, this.onDependencyChange);
            if (objEv.obj.observedInfo) {
                this.childDepths[objEv.obj._cid] = objEv.obj.observedInfo.getDepth();
                this.depth = null;
            }
        },
        removeEdge: function (objEv) {
            objEv.obj.unbind(objEv.event, this.onDependencyChange);
            if (objEv.obj.observedInfo) {
                delete this.childDepths[objEv.obj._cid];
                this.depth = null;
            }
        },
        dependencyChange: function (ev) {
            if (this.bound && this.ready) {
                if (ev.batchNum !== undefined) {
                    if (ev.batchNum !== this.batchNum) {
                        ObservedInfo.registerUpdate(this);
                        this.batchNum = ev.batchNum;
                    }
                } else {
                    this.updateCompute(ev.batchNum);
                }
            }
        },
        onDependencyChange: function (ev, newVal, oldVal) {
            this.dependencyChange(ev, newVal, oldVal);
        },
        updateCompute: function (batchNum) {
            if (this.bound) {
                var oldValue = this.value;
                this.getValueAndBind();
                this.compute.updater(this.value, oldValue, batchNum);
            }
        },
        getValueAndBind: function () {
            this.bound = true;
            this.oldObserved = this.newObserved || {};
            this.ignore = 0;
            this.newObserved = {};
            this.ready = false;
            observedInfoStack.push(this);
            this.value = this.func.call(this.context);
            observedInfoStack.pop();
            this.updateBindings();
            can.batch.afterPreviousEvents(this.setReady);
        },
        updateBindings: function () {
            var newObserved = this.newObserved, oldObserved = this.oldObserved, name, obEv;
            for (name in newObserved) {
                obEv = newObserved[name];
                if (!oldObserved[name]) {
                    this.addEdge(obEv);
                } else {
                    oldObserved[name] = null;
                }
            }
            for (name in oldObserved) {
                obEv = oldObserved[name];
                if (obEv) {
                    this.removeEdge(obEv);
                }
            }
        },
        teardown: function () {
            this.bound = false;
            for (var name in this.newObserved) {
                var ob = this.newObserved[name];
                this.removeEdge(ob);
            }
            this.newObserved = {};
        }
    });
    var updateOrder = [], curPrimaryDepth = Infinity, maxPrimaryDepth = 0;
    ObservedInfo.registerUpdate = function (observeInfo, batchNum) {
        var depth = observeInfo.getDepth() - 1;
        var primaryDepth = observeInfo.getPrimaryDepth();
        curPrimaryDepth = Math.min(primaryDepth, curPrimaryDepth);
        maxPrimaryDepth = Math.max(primaryDepth, maxPrimaryDepth);
        var primary = updateOrder[primaryDepth] || (updateOrder[primaryDepth] = {
            observeInfos: [],
            current: Infinity,
            max: 0
        });
        var objs = primary.observeInfos[depth] || (primary.observeInfos[depth] = []);
        objs.push(observeInfo);
        primary.current = Math.min(depth, primary.current);
        primary.max = Math.max(depth, primary.max);
    };
    ObservedInfo.batchEnd = function (batchNum) {
        var cur;
        while (true) {
            if (curPrimaryDepth <= maxPrimaryDepth) {
                var primary = updateOrder[curPrimaryDepth];
                if (primary && primary.current <= primary.max) {
                    var last = primary.observeInfos[primary.current];
                    if (last && (cur = last.pop())) {
                        cur.updateCompute(batchNum);
                    } else {
                        primary.current++;
                    }
                } else {
                    curPrimaryDepth++;
                }
            } else {
                updateOrder = [];
                curPrimaryDepth = Infinity;
                maxPrimaryDepth = 0;
                return;
            }
        }
    };
    var observedInfoStack = [];
    can.__observe = function (obj, event) {
        var top = observedInfoStack[observedInfoStack.length - 1];
        if (top && !top.ignore) {
            var evStr = event + '', name = obj._cid + '|' + evStr;
            if (top.traps) {
                top.traps.push({
                    obj: obj,
                    event: evStr,
                    name: name
                });
            } else if (!top.newObserved[name]) {
                top.newObserved[name] = {
                    obj: obj,
                    event: evStr
                };
            }
        }
    };
    can.__reading = can.__observe;
    can.__trapObserves = function () {
        if (observedInfoStack.length) {
            var top = observedInfoStack[observedInfoStack.length - 1];
            var traps = top.traps = [];
            return function () {
                top.traps = null;
                return traps;
            };
        } else {
            return function () {
                return [];
            };
        }
    };
    can.__observes = function (observes) {
        var top = observedInfoStack[observedInfoStack.length - 1];
        if (top) {
            for (var i = 0, len = observes.length; i < len; i++) {
                var trap = observes[i], name = trap.name;
                if (!top.newObserved[name]) {
                    top.newObserved[name] = trap;
                }
            }
        }
    };
    can.__isRecordingObserves = function () {
        var len = observedInfoStack.length;
        return len && observedInfoStack[len - 1].ignore === 0;
    };
    can.__notObserve = function (fn) {
        return function () {
            if (observedInfoStack.length) {
                var top = observedInfoStack[observedInfoStack.length - 1];
                top.ignore++;
                var res = fn.apply(this, arguments);
                top.ignore--;
                return res;
            } else {
                return fn.apply(this, arguments);
            }
        };
    };
    can.batch._onDispatchedEvents = ObservedInfo.batchEnd;
    return ObservedInfo;
});
/*can@2.3.24#map/map*/
define('can/map/map', [
    'can/util/util',
    'can/util/bind/bind',
    './bubble',
    './map_helpers',
    'can/construct/construct',
    'can/util/batch/batch',
    'can/compute/get_value_and_bind'
], function (can, bind, bubble, mapHelpers) {
    var unobservable = { 'constructor': true };
    var Map = can.Map = can.Construct.extend({
        setup: function () {
            can.Construct.setup.apply(this, arguments);
            this._computedPropertyNames = [];
            if (can.Map) {
                if (!this.defaults) {
                    this.defaults = {};
                }
                for (var prop in this.prototype) {
                    if (prop !== 'define' && prop !== 'constructor' && (typeof this.prototype[prop] !== 'function' || this.prototype[prop].prototype instanceof can.Construct)) {
                        this.defaults[prop] = this.prototype[prop];
                    } else if (this.prototype[prop].isComputed) {
                        this._computedPropertyNames.push(prop);
                    }
                }
                if (mapHelpers.define) {
                    mapHelpers.define(this);
                }
            }
            if (can.List && !(this.prototype instanceof can.List)) {
                this.List = Map.List.extend({ Map: this }, {});
            }
        },
        shortName: 'Map',
        _bubbleRule: function (eventName) {
            return eventName === 'change' || eventName.indexOf('.') >= 0 ? ['change'] : [];
        },
        bind: can.bindAndSetup,
        unbind: can.unbindAndTeardown,
        id: 'id',
        keys: function (map) {
            var keys = [];
            can.__observe(map, '__keys');
            for (var keyName in map._data) {
                keys.push(keyName);
            }
            return keys;
        }
    }, {
        setup: function (obj) {
            if (obj instanceof can.Map) {
                obj = obj.serialize();
            }
            this._data = {};
            can.cid(this, '.map');
            this._setupComputedProperties();
            var teardownMapping = obj && mapHelpers.addToMap(obj, this);
            var defaultValues = this._setupDefaults(obj);
            var data = can.extend(can.extend(true, {}, defaultValues), obj);
            this.attr(data);
            if (teardownMapping) {
                teardownMapping();
            }
        },
        _setupComputedProperties: function () {
            this._computedAttrs = {};
            var computes = this.constructor._computedPropertyNames;
            for (var i = 0, len = computes.length; i < len; i++) {
                var attrName = computes[i];
                mapHelpers.addComputedAttr(this, attrName, this[attrName].clone(this));
            }
        },
        _setupDefaults: function () {
            return this.constructor.defaults || {};
        },
        attr: function (attr, val) {
            var type = typeof attr;
            if (attr === undefined) {
                return this._getAttrs();
            } else if (type !== 'string' && type !== 'number') {
                return this._setAttrs(attr, val);
            } else if (arguments.length === 1) {
                return this._get(attr + '');
            } else {
                this._set(attr + '', val);
                return this;
            }
        },
        _get: function (attr) {
            var dotIndex = attr.indexOf('.');
            if (dotIndex >= 0) {
                var value = this.___get(attr);
                if (value !== undefined) {
                    can.__observe(this, attr);
                    return value;
                }
                var first = attr.substr(0, dotIndex), second = attr.substr(dotIndex + 1);
                var current = this.__get(first);
                return current && current._get ? current._get(second) : undefined;
            } else {
                return this.__get(attr);
            }
        },
        __get: function (attr) {
            if (!unobservable[attr] && !this._computedAttrs[attr]) {
                can.__observe(this, attr);
            }
            return this.___get(attr);
        },
        ___get: function (attr) {
            if (attr !== undefined) {
                var computedAttr = this._computedAttrs[attr];
                if (computedAttr && computedAttr.compute) {
                    return computedAttr.compute();
                } else {
                    return this._data.hasOwnProperty(attr) ? this._data[attr] : undefined;
                }
            } else {
                return this._data;
            }
        },
        _set: function (attr, value, keepKey) {
            var dotIndex = attr.indexOf('.'), current;
            if (dotIndex >= 0 && !keepKey) {
                var first = attr.substr(0, dotIndex), second = attr.substr(dotIndex + 1);
                current = this.__inSetup ? undefined : this.___get(first);
                if (can.isMapLike(current)) {
                    current._set(second, value);
                } else {
                    throw new Error('can.Map: Object does not exist');
                }
            } else {
                current = this.__inSetup ? undefined : this.___get(attr);
                if (this.__convert) {
                    value = this.__convert(attr, value);
                }
                this.__set(attr, this.__type(value, attr), current);
            }
        },
        __type: function (value, prop) {
            if (typeof value === 'object' && !(value instanceof can.Map) && mapHelpers.canMakeObserve(value)) {
                var cached = mapHelpers.getMapFromObject(value);
                if (cached) {
                    return cached;
                }
                if (can.isArray(value)) {
                    var List = can.List;
                    return new List(value);
                } else {
                    var Map = this.constructor.Map || can.Map;
                    return new Map(value);
                }
            }
            return value;
        },
        __set: function (prop, value, current) {
            if (value !== current) {
                var computedAttr = this._computedAttrs[prop];
                var changeType = computedAttr || current !== undefined || this.___get().hasOwnProperty(prop) ? 'set' : 'add';
                this.___set(prop, typeof value === 'object' ? bubble.set(this, prop, value, current) : value);
                if (!computedAttr || !computedAttr.count) {
                    this._triggerChange(prop, changeType, value, current);
                }
                if (typeof current === 'object') {
                    bubble.teardownFromParent(this, current);
                }
            }
        },
        ___set: function (prop, val) {
            var computedAttr = this._computedAttrs[prop];
            if (computedAttr) {
                computedAttr.compute(val);
            } else {
                this._data[prop] = val;
            }
            if (typeof this.constructor.prototype[prop] !== 'function' && !computedAttr) {
                this[prop] = val;
            }
        },
        removeAttr: function (attr) {
            return this._remove(attr);
        },
        _remove: function (attr) {
            var parts = mapHelpers.attrParts(attr), prop = parts.shift(), current = this.___get(prop);
            if (parts.length && current) {
                return current.removeAttr(parts);
            } else {
                if (typeof attr === 'string' && !!~attr.indexOf('.')) {
                    prop = attr;
                }
                this.__remove(prop, current);
                return current;
            }
        },
        __remove: function (prop, current) {
            if (prop in this._data) {
                this.___remove(prop);
                this._triggerChange(prop, 'remove', undefined, current);
            }
        },
        ___remove: function (prop) {
            delete this._data[prop];
            if (!(prop in this.constructor.prototype)) {
                delete this[prop];
            }
        },
        ___serialize: function (name, val) {
            return mapHelpers.getValue(this, name, val, 'serialize');
        },
        _getAttrs: function () {
            return mapHelpers.serialize(this, 'attr', {});
        },
        _setAttrs: function (props, remove) {
            props = can.simpleExtend({}, props);
            var prop, self = this, newVal;
            can.batch.start();
            this._each(function (curVal, prop) {
                if (prop === '_cid') {
                    return;
                }
                newVal = props[prop];
                if (newVal === undefined) {
                    if (remove) {
                        self.removeAttr(prop);
                    }
                    return;
                }
                if (self.__convert) {
                    newVal = self.__convert(prop, newVal);
                }
                if (can.isMapLike(curVal) && mapHelpers.canMakeObserve(newVal)) {
                    curVal.attr(newVal, remove);
                } else if (curVal !== newVal) {
                    self.__set(prop, self.__type(newVal, prop), curVal);
                }
                delete props[prop];
            });
            for (prop in props) {
                if (prop !== '_cid') {
                    newVal = props[prop];
                    this._set(prop, newVal, true);
                }
            }
            can.batch.stop();
            return this;
        },
        serialize: function () {
            return mapHelpers.serialize(this, 'serialize', {});
        },
        _triggerChange: function (attr, how, newVal, oldVal, batchNum) {
            if (bubble.isBubbling(this, 'change')) {
                can.batch.trigger(this, {
                    type: 'change',
                    target: this,
                    batchNum: batchNum
                }, [
                    attr,
                    how,
                    newVal,
                    oldVal
                ]);
            }
            can.batch.trigger(this, {
                type: attr,
                target: this,
                batchNum: batchNum
            }, [
                newVal,
                oldVal
            ]);
            if (how === 'remove' || how === 'add') {
                can.batch.trigger(this, {
                    type: '__keys',
                    target: this,
                    batchNum: batchNum
                });
            }
        },
        _bindsetup: function () {
        },
        _bindteardown: function () {
        },
        one: can.one,
        bind: function (eventName, handler) {
            var computedBinding = this._computedAttrs && this._computedAttrs[eventName];
            if (computedBinding && computedBinding.compute) {
                if (!computedBinding.count) {
                    computedBinding.count = 1;
                    computedBinding.compute.bind('change', computedBinding.handler);
                } else {
                    computedBinding.count++;
                }
            }
            bubble.bind(this, eventName);
            return can.bindAndSetup.apply(this, arguments);
        },
        unbind: function (eventName, handler) {
            var computedBinding = this._computedAttrs && this._computedAttrs[eventName];
            if (computedBinding) {
                if (computedBinding.count === 1) {
                    computedBinding.count = 0;
                    computedBinding.compute.unbind('change', computedBinding.handler);
                } else {
                    computedBinding.count--;
                }
            }
            bubble.unbind(this, eventName);
            return can.unbindAndTeardown.apply(this, arguments);
        },
        compute: function (prop) {
            if (can.isFunction(this.constructor.prototype[prop])) {
                return can.compute(this[prop], this);
            } else {
                var reads = can.compute.read.reads(prop), last = reads.length - 1;
                return can.compute(function (newVal) {
                    if (arguments.length) {
                        can.compute.read(this, reads.slice(0, last)).value.attr(reads[last].key, newVal);
                    } else {
                        return can.compute.read(this, reads, { args: [] }).value;
                    }
                }, this);
            }
        },
        each: function () {
            return can.each.apply(undefined, [this].concat(can.makeArray(arguments)));
        },
        _each: function (callback) {
            var data = this.___get();
            for (var prop in data) {
                if (data.hasOwnProperty(prop)) {
                    callback(data[prop], prop);
                }
            }
        },
        dispatch: can.dispatch
    });
    Map.prototype.on = Map.prototype.bind;
    Map.prototype.off = Map.prototype.unbind;
    Map.on = Map.bind;
    Map.off = Map.unbind;
    return Map;
});
/*can@2.3.24#list/list*/
define('can/list/list', [
    'can/util/util',
    'can/map/map',
    'can/map/bubble',
    'can/map/map_helpers'
], function (can, Map, bubble, mapHelpers) {
    var splice = [].splice, spliceRemovesProps = function () {
            var obj = {
                0: 'a',
                length: 1
            };
            splice.call(obj, 0, 1);
            return !obj[0];
        }();
    var list = Map.extend({ Map: Map }, {
            setup: function (instances, options) {
                this.length = 0;
                can.cid(this, '.map');
                this._setupComputedProperties();
                instances = instances || [];
                var teardownMapping;
                if (can.isPromise(instances)) {
                    this.replace(instances);
                } else {
                    teardownMapping = instances.length && mapHelpers.addToMap(instances, this);
                    this.push.apply(this, can.makeArray(instances || []));
                }
                if (teardownMapping) {
                    teardownMapping();
                }
                can.simpleExtend(this, options);
            },
            _triggerChange: function (attr, how, newVal, oldVal) {
                Map.prototype._triggerChange.apply(this, arguments);
                var index = +attr;
                if (!~('' + attr).indexOf('.') && !isNaN(index)) {
                    if (how === 'add') {
                        can.batch.trigger(this, how, [
                            newVal,
                            index
                        ]);
                        can.batch.trigger(this, 'length', [this.length]);
                    } else if (how === 'remove') {
                        can.batch.trigger(this, how, [
                            oldVal,
                            index
                        ]);
                        can.batch.trigger(this, 'length', [this.length]);
                    } else {
                        can.batch.trigger(this, how, [
                            newVal,
                            index
                        ]);
                    }
                }
            },
            ___get: function (attr) {
                if (attr) {
                    var computedAttr = this._computedAttrs[attr];
                    if (computedAttr && computedAttr.compute) {
                        return computedAttr.compute();
                    } else {
                        return this[attr];
                    }
                } else {
                    return this;
                }
            },
            __set: function (prop, value, current) {
                prop = isNaN(+prop) || prop % 1 ? prop : +prop;
                if (typeof prop === 'number' && prop > this.length - 1) {
                    var newArr = new Array(prop + 1 - this.length);
                    newArr[newArr.length - 1] = value;
                    this.push.apply(this, newArr);
                    return newArr;
                }
                return can.Map.prototype.__set.call(this, '' + prop, value, current);
            },
            ___set: function (attr, val) {
                this[attr] = val;
                if (+attr >= this.length) {
                    this.length = +attr + 1;
                }
            },
            __remove: function (prop, current) {
                if (isNaN(+prop)) {
                    delete this[prop];
                    this._triggerChange(prop, 'remove', undefined, current);
                } else {
                    this.splice(prop, 1);
                }
            },
            _each: function (callback) {
                var data = this.___get();
                for (var i = 0; i < data.length; i++) {
                    callback(data[i], i);
                }
            },
            serialize: function () {
                return mapHelpers.serialize(this, 'serialize', []);
            },
            splice: function (index, howMany) {
                var args = can.makeArray(arguments), added = [], i, len, listIndex, allSame = args.length > 2;
                index = index || 0;
                for (i = 0, len = args.length - 2; i < len; i++) {
                    listIndex = i + 2;
                    args[listIndex] = this.__type(args[listIndex], listIndex);
                    added.push(args[listIndex]);
                    if (this[i + index] !== args[listIndex]) {
                        allSame = false;
                    }
                }
                if (allSame && this.length <= added.length) {
                    return added;
                }
                if (howMany === undefined) {
                    howMany = args[1] = this.length - index;
                }
                var removed = splice.apply(this, args);
                if (!spliceRemovesProps) {
                    for (i = this.length; i < removed.length + this.length; i++) {
                        delete this[i];
                    }
                }
                can.batch.start();
                if (howMany > 0) {
                    bubble.removeMany(this, removed);
                    this._triggerChange('' + index, 'remove', undefined, removed);
                }
                if (args.length > 2) {
                    bubble.addMany(this, added);
                    this._triggerChange('' + index, 'add', added, removed);
                }
                can.batch.stop();
                return removed;
            },
            _getAttrs: function () {
                return mapHelpers.serialize(this, 'attr', []);
            },
            _setAttrs: function (items, remove) {
                items = can.makeArray(items);
                can.batch.start();
                this._updateAttrs(items, remove);
                can.batch.stop();
            },
            _updateAttrs: function (items, remove) {
                var len = Math.min(items.length, this.length);
                for (var prop = 0; prop < len; prop++) {
                    var curVal = this[prop], newVal = items[prop];
                    if (can.isMapLike(curVal) && mapHelpers.canMakeObserve(newVal)) {
                        curVal.attr(newVal, remove);
                    } else if (curVal !== newVal) {
                        this._set(prop + '', newVal);
                    } else {
                    }
                }
                if (items.length > this.length) {
                    this.push.apply(this, items.slice(this.length));
                } else if (items.length < this.length && remove) {
                    this.splice(items.length);
                }
            }
        }), getArgs = function (args) {
            return args[0] && can.isArray(args[0]) ? args[0] : can.makeArray(args);
        };
    can.each({
        push: 'length',
        unshift: 0
    }, function (where, name) {
        var orig = [][name];
        list.prototype[name] = function () {
            can.batch.start();
            var args = [], len = where ? this.length : 0, i = arguments.length, res, val;
            while (i--) {
                val = arguments[i];
                args[i] = bubble.set(this, i, this.__type(val, i));
            }
            res = orig.apply(this, args);
            if (!this.comparator || args.length) {
                this._triggerChange('' + len, 'add', args, undefined);
            }
            can.batch.stop();
            return res;
        };
    });
    can.each({
        pop: 'length',
        shift: 0
    }, function (where, name) {
        list.prototype[name] = function () {
            if (!this.length) {
                return undefined;
            }
            var args = getArgs(arguments), len = where && this.length ? this.length - 1 : 0;
            var res = [][name].apply(this, args);
            can.batch.start();
            this._triggerChange('' + len, 'remove', undefined, [res]);
            if (res && res.unbind) {
                bubble.remove(this, res);
            }
            can.batch.stop();
            return res;
        };
    });
    can.extend(list.prototype, {
        indexOf: function (item, fromIndex) {
            can.__observe(this, 'length');
            return can.inArray(item, this, fromIndex);
        },
        join: function () {
            can.__observe(this, 'length');
            return [].join.apply(this, arguments);
        },
        reverse: function () {
            var list = [].reverse.call(can.makeArray(this));
            return this.replace(list);
        },
        slice: function () {
            can.__observe(this, 'length');
            var temp = Array.prototype.slice.apply(this, arguments);
            return new this.constructor(temp);
        },
        concat: function () {
            var args = [];
            can.each(can.makeArray(arguments), function (arg, i) {
                args[i] = arg instanceof can.List ? arg.serialize() : arg;
            });
            return new this.constructor(Array.prototype.concat.apply(this.serialize(), args));
        },
        forEach: function (cb, thisarg) {
            return can.each(this, cb, thisarg || this);
        },
        replace: function (newList) {
            if (can.isPromise(newList)) {
                if (this._promise) {
                    this._promise.__isCurrentPromise = false;
                }
                var promise = this._promise = newList;
                promise.__isCurrentPromise = true;
                var self = this;
                newList.then(function (newList) {
                    if (promise.__isCurrentPromise) {
                        self.replace(newList);
                    }
                });
            } else {
                this.splice.apply(this, [
                    0,
                    this.length
                ].concat(can.makeArray(newList || [])));
            }
            return this;
        },
        filter: function (callback, thisArg) {
            var filteredList = new this.constructor(), self = this, filtered;
            this.each(function (item, index, list) {
                filtered = callback.call(thisArg | self, item, index, self);
                if (filtered) {
                    filteredList.push(item);
                }
            });
            return filteredList;
        },
        map: function (callback, thisArg) {
            var filteredList = new can.List(), self = this;
            this.each(function (item, index, list) {
                var mapped = callback.call(thisArg | self, item, index, self);
                filteredList.push(mapped);
            });
            return filteredList;
        }
    });
    can.List = Map.List = list;
    return can.List;
});
/*when@3.7.7#es6-shim/Promise*/
define('when@3.7.7#es6-shim/Promise', [
    'module',
    '@loader'
], function (module, loader) {
    loader.get('@@global-helpers').prepareGlobal(module.id, []);
    var define = loader.global.define;
    var require = loader.global.require;
    var source = '!function(e){"object"==typeof exports?module.exports=e():"function"==typeof define&&define.amd?define(e):"undefined"!=typeof window?window.Promise=e():"undefined"!=typeof global?global.Promise=e():"undefined"!=typeof self&&(self.Promise=e())}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module \'"+o+"\'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){\n/** @license MIT License (c) copyright 2010-2014 original author or authors */\n/** @author Brian Cavalier */\n/** @author John Hann */\n\n/**\n * ES6 global Promise shim\n */\nvar unhandledRejections = require(\'../lib/decorators/unhandledRejection\');\nvar PromiseConstructor = unhandledRejections(require(\'../lib/Promise\'));\n\nmodule.exports = typeof global != \'undefined\' ? (global.Promise = PromiseConstructor)\n\t           : typeof self   != \'undefined\' ? (self.Promise   = PromiseConstructor)\n\t           : PromiseConstructor;\n\n},{"../lib/Promise":2,"../lib/decorators/unhandledRejection":4}],2:[function(require,module,exports){\n/** @license MIT License (c) copyright 2010-2014 original author or authors */\n/** @author Brian Cavalier */\n/** @author John Hann */\n\n(function(define) { \'use strict\';\ndefine(function (require) {\n\n\tvar makePromise = require(\'./makePromise\');\n\tvar Scheduler = require(\'./Scheduler\');\n\tvar async = require(\'./env\').asap;\n\n\treturn makePromise({\n\t\tscheduler: new Scheduler(async)\n\t});\n\n});\n})(typeof define === \'function\' && define.amd ? define : function (factory) { module.exports = factory(require); });\n\n},{"./Scheduler":3,"./env":5,"./makePromise":7}],3:[function(require,module,exports){\n/** @license MIT License (c) copyright 2010-2014 original author or authors */\n/** @author Brian Cavalier */\n/** @author John Hann */\n\n(function(define) { \'use strict\';\ndefine(function() {\n\n\t// Credit to Twisol (https://github.com/Twisol) for suggesting\n\t// this type of extensible queue + trampoline approach for next-tick conflation.\n\n\t/**\n\t * Async task scheduler\n\t * @param {function} async function to schedule a single async function\n\t * @constructor\n\t */\n\tfunction Scheduler(async) {\n\t\tthis._async = async;\n\t\tthis._running = false;\n\n\t\tthis._queue = this;\n\t\tthis._queueLen = 0;\n\t\tthis._afterQueue = {};\n\t\tthis._afterQueueLen = 0;\n\n\t\tvar self = this;\n\t\tthis.drain = function() {\n\t\t\tself._drain();\n\t\t};\n\t}\n\n\t/**\n\t * Enqueue a task\n\t * @param {{ run:function }} task\n\t */\n\tScheduler.prototype.enqueue = function(task) {\n\t\tthis._queue[this._queueLen++] = task;\n\t\tthis.run();\n\t};\n\n\t/**\n\t * Enqueue a task to run after the main task queue\n\t * @param {{ run:function }} task\n\t */\n\tScheduler.prototype.afterQueue = function(task) {\n\t\tthis._afterQueue[this._afterQueueLen++] = task;\n\t\tthis.run();\n\t};\n\n\tScheduler.prototype.run = function() {\n\t\tif (!this._running) {\n\t\t\tthis._running = true;\n\t\t\tthis._async(this.drain);\n\t\t}\n\t};\n\n\t/**\n\t * Drain the handler queue entirely, and then the after queue\n\t */\n\tScheduler.prototype._drain = function() {\n\t\tvar i = 0;\n\t\tfor (; i < this._queueLen; ++i) {\n\t\t\tthis._queue[i].run();\n\t\t\tthis._queue[i] = void 0;\n\t\t}\n\n\t\tthis._queueLen = 0;\n\t\tthis._running = false;\n\n\t\tfor (i = 0; i < this._afterQueueLen; ++i) {\n\t\t\tthis._afterQueue[i].run();\n\t\t\tthis._afterQueue[i] = void 0;\n\t\t}\n\n\t\tthis._afterQueueLen = 0;\n\t};\n\n\treturn Scheduler;\n\n});\n}(typeof define === \'function\' && define.amd ? define : function(factory) { module.exports = factory(); }));\n\n},{}],4:[function(require,module,exports){\n/** @license MIT License (c) copyright 2010-2014 original author or authors */\n/** @author Brian Cavalier */\n/** @author John Hann */\n\n(function(define) { \'use strict\';\ndefine(function(require) {\n\n\tvar setTimer = require(\'../env\').setTimer;\n\tvar format = require(\'../format\');\n\n\treturn function unhandledRejection(Promise) {\n\n\t\tvar logError = noop;\n\t\tvar logInfo = noop;\n\t\tvar localConsole;\n\n\t\tif(typeof console !== \'undefined\') {\n\t\t\t// Alias console to prevent things like uglify\'s drop_console option from\n\t\t\t// removing console.log/error. Unhandled rejections fall into the same\n\t\t\t// category as uncaught exceptions, and build tools shouldn\'t silence them.\n\t\t\tlocalConsole = console;\n\t\t\tlogError = typeof localConsole.error !== \'undefined\'\n\t\t\t\t? function (e) { localConsole.error(e); }\n\t\t\t\t: function (e) { localConsole.log(e); };\n\n\t\t\tlogInfo = typeof localConsole.info !== \'undefined\'\n\t\t\t\t? function (e) { localConsole.info(e); }\n\t\t\t\t: function (e) { localConsole.log(e); };\n\t\t}\n\n\t\tPromise.onPotentiallyUnhandledRejection = function(rejection) {\n\t\t\tenqueue(report, rejection);\n\t\t};\n\n\t\tPromise.onPotentiallyUnhandledRejectionHandled = function(rejection) {\n\t\t\tenqueue(unreport, rejection);\n\t\t};\n\n\t\tPromise.onFatalRejection = function(rejection) {\n\t\t\tenqueue(throwit, rejection.value);\n\t\t};\n\n\t\tvar tasks = [];\n\t\tvar reported = [];\n\t\tvar running = null;\n\n\t\tfunction report(r) {\n\t\t\tif(!r.handled) {\n\t\t\t\treported.push(r);\n\t\t\t\tlogError(\'Potentially unhandled rejection [\' + r.id + \'] \' + format.formatError(r.value));\n\t\t\t}\n\t\t}\n\n\t\tfunction unreport(r) {\n\t\t\tvar i = reported.indexOf(r);\n\t\t\tif(i >= 0) {\n\t\t\t\treported.splice(i, 1);\n\t\t\t\tlogInfo(\'Handled previous rejection [\' + r.id + \'] \' + format.formatObject(r.value));\n\t\t\t}\n\t\t}\n\n\t\tfunction enqueue(f, x) {\n\t\t\ttasks.push(f, x);\n\t\t\tif(running === null) {\n\t\t\t\trunning = setTimer(flush, 0);\n\t\t\t}\n\t\t}\n\n\t\tfunction flush() {\n\t\t\trunning = null;\n\t\t\twhile(tasks.length > 0) {\n\t\t\t\ttasks.shift()(tasks.shift());\n\t\t\t}\n\t\t}\n\n\t\treturn Promise;\n\t};\n\n\tfunction throwit(e) {\n\t\tthrow e;\n\t}\n\n\tfunction noop() {}\n\n});\n}(typeof define === \'function\' && define.amd ? define : function(factory) { module.exports = factory(require); }));\n\n},{"../env":5,"../format":6}],5:[function(require,module,exports){\n/** @license MIT License (c) copyright 2010-2014 original author or authors */\n/** @author Brian Cavalier */\n/** @author John Hann */\n\n/*global process,document,setTimeout,clearTimeout,MutationObserver,WebKitMutationObserver*/\n(function(define) { \'use strict\';\ndefine(function(require) {\n\t/*jshint maxcomplexity:6*/\n\n\t// Sniff "best" async scheduling option\n\t// Prefer process.nextTick or MutationObserver, then check for\n\t// setTimeout, and finally vertx, since its the only env that doesn\'t\n\t// have setTimeout\n\n\tvar MutationObs;\n\tvar capturedSetTimeout = typeof setTimeout !== \'undefined\' && setTimeout;\n\n\t// Default env\n\tvar setTimer = function(f, ms) { return setTimeout(f, ms); };\n\tvar clearTimer = function(t) { return clearTimeout(t); };\n\tvar asap = function (f) { return capturedSetTimeout(f, 0); };\n\n\t// Detect specific env\n\tif (isNode()) { // Node\n\t\tasap = function (f) { return process.nextTick(f); };\n\n\t} else if (MutationObs = hasMutationObserver()) { // Modern browser\n\t\tasap = initMutationObserver(MutationObs);\n\n\t} else if (!capturedSetTimeout) { // vert.x\n\t\tvar vertxRequire = require;\n\t\tvar vertx = vertxRequire(\'vertx\');\n\t\tsetTimer = function (f, ms) { return vertx.setTimer(ms, f); };\n\t\tclearTimer = vertx.cancelTimer;\n\t\tasap = vertx.runOnLoop || vertx.runOnContext;\n\t}\n\n\treturn {\n\t\tsetTimer: setTimer,\n\t\tclearTimer: clearTimer,\n\t\tasap: asap\n\t};\n\n\tfunction isNode () {\n\t\treturn typeof process !== \'undefined\' &&\n\t\t\tObject.prototype.toString.call(process) === \'[object process]\';\n\t}\n\n\tfunction hasMutationObserver () {\n\t\treturn (typeof MutationObserver === \'function\' && MutationObserver) ||\n\t\t\t(typeof WebKitMutationObserver === \'function\' && WebKitMutationObserver);\n\t}\n\n\tfunction initMutationObserver(MutationObserver) {\n\t\tvar scheduled;\n\t\tvar node = document.createTextNode(\'\');\n\t\tvar o = new MutationObserver(run);\n\t\to.observe(node, { characterData: true });\n\n\t\tfunction run() {\n\t\t\tvar f = scheduled;\n\t\t\tscheduled = void 0;\n\t\t\tf();\n\t\t}\n\n\t\tvar i = 0;\n\t\treturn function (f) {\n\t\t\tscheduled = f;\n\t\t\tnode.data = (i ^= 1);\n\t\t};\n\t}\n});\n}(typeof define === \'function\' && define.amd ? define : function(factory) { module.exports = factory(require); }));\n\n},{}],6:[function(require,module,exports){\n/** @license MIT License (c) copyright 2010-2014 original author or authors */\n/** @author Brian Cavalier */\n/** @author John Hann */\n\n(function(define) { \'use strict\';\ndefine(function() {\n\n\treturn {\n\t\tformatError: formatError,\n\t\tformatObject: formatObject,\n\t\ttryStringify: tryStringify\n\t};\n\n\t/**\n\t * Format an error into a string.  If e is an Error and has a stack property,\n\t * it\'s returned.  Otherwise, e is formatted using formatObject, with a\n\t * warning added about e not being a proper Error.\n\t * @param {*} e\n\t * @returns {String} formatted string, suitable for output to developers\n\t */\n\tfunction formatError(e) {\n\t\tvar s = typeof e === \'object\' && e !== null && (e.stack || e.message) ? e.stack || e.message : formatObject(e);\n\t\treturn e instanceof Error ? s : s + \' (WARNING: non-Error used)\';\n\t}\n\n\t/**\n\t * Format an object, detecting "plain" objects and running them through\n\t * JSON.stringify if possible.\n\t * @param {Object} o\n\t * @returns {string}\n\t */\n\tfunction formatObject(o) {\n\t\tvar s = String(o);\n\t\tif(s === \'[object Object]\' && typeof JSON !== \'undefined\') {\n\t\t\ts = tryStringify(o, s);\n\t\t}\n\t\treturn s;\n\t}\n\n\t/**\n\t * Try to return the result of JSON.stringify(x).  If that fails, return\n\t * defaultValue\n\t * @param {*} x\n\t * @param {*} defaultValue\n\t * @returns {String|*} JSON.stringify(x) or defaultValue\n\t */\n\tfunction tryStringify(x, defaultValue) {\n\t\ttry {\n\t\t\treturn JSON.stringify(x);\n\t\t} catch(e) {\n\t\t\treturn defaultValue;\n\t\t}\n\t}\n\n});\n}(typeof define === \'function\' && define.amd ? define : function(factory) { module.exports = factory(); }));\n\n},{}],7:[function(require,module,exports){\n/** @license MIT License (c) copyright 2010-2014 original author or authors */\n/** @author Brian Cavalier */\n/** @author John Hann */\n\n(function(define) { \'use strict\';\ndefine(function() {\n\n\treturn function makePromise(environment) {\n\n\t\tvar tasks = environment.scheduler;\n\t\tvar emitRejection = initEmitRejection();\n\n\t\tvar objectCreate = Object.create ||\n\t\t\tfunction(proto) {\n\t\t\t\tfunction Child() {}\n\t\t\t\tChild.prototype = proto;\n\t\t\t\treturn new Child();\n\t\t\t};\n\n\t\t/**\n\t\t * Create a promise whose fate is determined by resolver\n\t\t * @constructor\n\t\t * @returns {Promise} promise\n\t\t * @name Promise\n\t\t */\n\t\tfunction Promise(resolver, handler) {\n\t\t\tthis._handler = resolver === Handler ? handler : init(resolver);\n\t\t}\n\n\t\t/**\n\t\t * Run the supplied resolver\n\t\t * @param resolver\n\t\t * @returns {Pending}\n\t\t */\n\t\tfunction init(resolver) {\n\t\t\tvar handler = new Pending();\n\n\t\t\ttry {\n\t\t\t\tresolver(promiseResolve, promiseReject, promiseNotify);\n\t\t\t} catch (e) {\n\t\t\t\tpromiseReject(e);\n\t\t\t}\n\n\t\t\treturn handler;\n\n\t\t\t/**\n\t\t\t * Transition from pre-resolution state to post-resolution state, notifying\n\t\t\t * all listeners of the ultimate fulfillment or rejection\n\t\t\t * @param {*} x resolution value\n\t\t\t */\n\t\t\tfunction promiseResolve (x) {\n\t\t\t\thandler.resolve(x);\n\t\t\t}\n\t\t\t/**\n\t\t\t * Reject this promise with reason, which will be used verbatim\n\t\t\t * @param {Error|*} reason rejection reason, strongly suggested\n\t\t\t *   to be an Error type\n\t\t\t */\n\t\t\tfunction promiseReject (reason) {\n\t\t\t\thandler.reject(reason);\n\t\t\t}\n\n\t\t\t/**\n\t\t\t * @deprecated\n\t\t\t * Issue a progress event, notifying all progress listeners\n\t\t\t * @param {*} x progress event payload to pass to all listeners\n\t\t\t */\n\t\t\tfunction promiseNotify (x) {\n\t\t\t\thandler.notify(x);\n\t\t\t}\n\t\t}\n\n\t\t// Creation\n\n\t\tPromise.resolve = resolve;\n\t\tPromise.reject = reject;\n\t\tPromise.never = never;\n\n\t\tPromise._defer = defer;\n\t\tPromise._handler = getHandler;\n\n\t\t/**\n\t\t * Returns a trusted promise. If x is already a trusted promise, it is\n\t\t * returned, otherwise returns a new trusted Promise which follows x.\n\t\t * @param  {*} x\n\t\t * @return {Promise} promise\n\t\t */\n\t\tfunction resolve(x) {\n\t\t\treturn isPromise(x) ? x\n\t\t\t\t: new Promise(Handler, new Async(getHandler(x)));\n\t\t}\n\n\t\t/**\n\t\t * Return a reject promise with x as its reason (x is used verbatim)\n\t\t * @param {*} x\n\t\t * @returns {Promise} rejected promise\n\t\t */\n\t\tfunction reject(x) {\n\t\t\treturn new Promise(Handler, new Async(new Rejected(x)));\n\t\t}\n\n\t\t/**\n\t\t * Return a promise that remains pending forever\n\t\t * @returns {Promise} forever-pending promise.\n\t\t */\n\t\tfunction never() {\n\t\t\treturn foreverPendingPromise; // Should be frozen\n\t\t}\n\n\t\t/**\n\t\t * Creates an internal {promise, resolver} pair\n\t\t * @private\n\t\t * @returns {Promise}\n\t\t */\n\t\tfunction defer() {\n\t\t\treturn new Promise(Handler, new Pending());\n\t\t}\n\n\t\t// Transformation and flow control\n\n\t\t/**\n\t\t * Transform this promise\'s fulfillment value, returning a new Promise\n\t\t * for the transformed result.  If the promise cannot be fulfilled, onRejected\n\t\t * is called with the reason.  onProgress *may* be called with updates toward\n\t\t * this promise\'s fulfillment.\n\t\t * @param {function=} onFulfilled fulfillment handler\n\t\t * @param {function=} onRejected rejection handler\n\t\t * @param {function=} onProgress @deprecated progress handler\n\t\t * @return {Promise} new promise\n\t\t */\n\t\tPromise.prototype.then = function(onFulfilled, onRejected, onProgress) {\n\t\t\tvar parent = this._handler;\n\t\t\tvar state = parent.join().state();\n\n\t\t\tif ((typeof onFulfilled !== \'function\' && state > 0) ||\n\t\t\t\t(typeof onRejected !== \'function\' && state < 0)) {\n\t\t\t\t// Short circuit: value will not change, simply share handler\n\t\t\t\treturn new this.constructor(Handler, parent);\n\t\t\t}\n\n\t\t\tvar p = this._beget();\n\t\t\tvar child = p._handler;\n\n\t\t\tparent.chain(child, parent.receiver, onFulfilled, onRejected, onProgress);\n\n\t\t\treturn p;\n\t\t};\n\n\t\t/**\n\t\t * If this promise cannot be fulfilled due to an error, call onRejected to\n\t\t * handle the error. Shortcut for .then(undefined, onRejected)\n\t\t * @param {function?} onRejected\n\t\t * @return {Promise}\n\t\t */\n\t\tPromise.prototype[\'catch\'] = function(onRejected) {\n\t\t\treturn this.then(void 0, onRejected);\n\t\t};\n\n\t\t/**\n\t\t * Creates a new, pending promise of the same type as this promise\n\t\t * @private\n\t\t * @returns {Promise}\n\t\t */\n\t\tPromise.prototype._beget = function() {\n\t\t\treturn begetFrom(this._handler, this.constructor);\n\t\t};\n\n\t\tfunction begetFrom(parent, Promise) {\n\t\t\tvar child = new Pending(parent.receiver, parent.join().context);\n\t\t\treturn new Promise(Handler, child);\n\t\t}\n\n\t\t// Array combinators\n\n\t\tPromise.all = all;\n\t\tPromise.race = race;\n\t\tPromise._traverse = traverse;\n\n\t\t/**\n\t\t * Return a promise that will fulfill when all promises in the\n\t\t * input array have fulfilled, or will reject when one of the\n\t\t * promises rejects.\n\t\t * @param {array} promises array of promises\n\t\t * @returns {Promise} promise for array of fulfillment values\n\t\t */\n\t\tfunction all(promises) {\n\t\t\treturn traverseWith(snd, null, promises);\n\t\t}\n\n\t\t/**\n\t\t * Array<Promise<X>> -> Promise<Array<f(X)>>\n\t\t * @private\n\t\t * @param {function} f function to apply to each promise\'s value\n\t\t * @param {Array} promises array of promises\n\t\t * @returns {Promise} promise for transformed values\n\t\t */\n\t\tfunction traverse(f, promises) {\n\t\t\treturn traverseWith(tryCatch2, f, promises);\n\t\t}\n\n\t\tfunction traverseWith(tryMap, f, promises) {\n\t\t\tvar handler = typeof f === \'function\' ? mapAt : settleAt;\n\n\t\t\tvar resolver = new Pending();\n\t\t\tvar pending = promises.length >>> 0;\n\t\t\tvar results = new Array(pending);\n\n\t\t\tfor (var i = 0, x; i < promises.length && !resolver.resolved; ++i) {\n\t\t\t\tx = promises[i];\n\n\t\t\t\tif (x === void 0 && !(i in promises)) {\n\t\t\t\t\t--pending;\n\t\t\t\t\tcontinue;\n\t\t\t\t}\n\n\t\t\t\ttraverseAt(promises, handler, i, x, resolver);\n\t\t\t}\n\n\t\t\tif(pending === 0) {\n\t\t\t\tresolver.become(new Fulfilled(results));\n\t\t\t}\n\n\t\t\treturn new Promise(Handler, resolver);\n\n\t\t\tfunction mapAt(i, x, resolver) {\n\t\t\t\tif(!resolver.resolved) {\n\t\t\t\t\ttraverseAt(promises, settleAt, i, tryMap(f, x, i), resolver);\n\t\t\t\t}\n\t\t\t}\n\n\t\t\tfunction settleAt(i, x, resolver) {\n\t\t\t\tresults[i] = x;\n\t\t\t\tif(--pending === 0) {\n\t\t\t\t\tresolver.become(new Fulfilled(results));\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\n\t\tfunction traverseAt(promises, handler, i, x, resolver) {\n\t\t\tif (maybeThenable(x)) {\n\t\t\t\tvar h = getHandlerMaybeThenable(x);\n\t\t\t\tvar s = h.state();\n\n\t\t\t\tif (s === 0) {\n\t\t\t\t\th.fold(handler, i, void 0, resolver);\n\t\t\t\t} else if (s > 0) {\n\t\t\t\t\thandler(i, h.value, resolver);\n\t\t\t\t} else {\n\t\t\t\t\tresolver.become(h);\n\t\t\t\t\tvisitRemaining(promises, i+1, h);\n\t\t\t\t}\n\t\t\t} else {\n\t\t\t\thandler(i, x, resolver);\n\t\t\t}\n\t\t}\n\n\t\tPromise._visitRemaining = visitRemaining;\n\t\tfunction visitRemaining(promises, start, handler) {\n\t\t\tfor(var i=start; i<promises.length; ++i) {\n\t\t\t\tmarkAsHandled(getHandler(promises[i]), handler);\n\t\t\t}\n\t\t}\n\n\t\tfunction markAsHandled(h, handler) {\n\t\t\tif(h === handler) {\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\tvar s = h.state();\n\t\t\tif(s === 0) {\n\t\t\t\th.visit(h, void 0, h._unreport);\n\t\t\t} else if(s < 0) {\n\t\t\t\th._unreport();\n\t\t\t}\n\t\t}\n\n\t\t/**\n\t\t * Fulfill-reject competitive race. Return a promise that will settle\n\t\t * to the same state as the earliest input promise to settle.\n\t\t *\n\t\t * WARNING: The ES6 Promise spec requires that race()ing an empty array\n\t\t * must return a promise that is pending forever.  This implementation\n\t\t * returns a singleton forever-pending promise, the same singleton that is\n\t\t * returned by Promise.never(), thus can be checked with ===\n\t\t *\n\t\t * @param {array} promises array of promises to race\n\t\t * @returns {Promise} if input is non-empty, a promise that will settle\n\t\t * to the same outcome as the earliest input promise to settle. if empty\n\t\t * is empty, returns a promise that will never settle.\n\t\t */\n\t\tfunction race(promises) {\n\t\t\tif(typeof promises !== \'object\' || promises === null) {\n\t\t\t\treturn reject(new TypeError(\'non-iterable passed to race()\'));\n\t\t\t}\n\n\t\t\t// Sigh, race([]) is untestable unless we return *something*\n\t\t\t// that is recognizable without calling .then() on it.\n\t\t\treturn promises.length === 0 ? never()\n\t\t\t\t : promises.length === 1 ? resolve(promises[0])\n\t\t\t\t : runRace(promises);\n\t\t}\n\n\t\tfunction runRace(promises) {\n\t\t\tvar resolver = new Pending();\n\t\t\tvar i, x, h;\n\t\t\tfor(i=0; i<promises.length; ++i) {\n\t\t\t\tx = promises[i];\n\t\t\t\tif (x === void 0 && !(i in promises)) {\n\t\t\t\t\tcontinue;\n\t\t\t\t}\n\n\t\t\t\th = getHandler(x);\n\t\t\t\tif(h.state() !== 0) {\n\t\t\t\t\tresolver.become(h);\n\t\t\t\t\tvisitRemaining(promises, i+1, h);\n\t\t\t\t\tbreak;\n\t\t\t\t} else {\n\t\t\t\t\th.visit(resolver, resolver.resolve, resolver.reject);\n\t\t\t\t}\n\t\t\t}\n\t\t\treturn new Promise(Handler, resolver);\n\t\t}\n\n\t\t// Promise internals\n\t\t// Below this, everything is @private\n\n\t\t/**\n\t\t * Get an appropriate handler for x, without checking for cycles\n\t\t * @param {*} x\n\t\t * @returns {object} handler\n\t\t */\n\t\tfunction getHandler(x) {\n\t\t\tif(isPromise(x)) {\n\t\t\t\treturn x._handler.join();\n\t\t\t}\n\t\t\treturn maybeThenable(x) ? getHandlerUntrusted(x) : new Fulfilled(x);\n\t\t}\n\n\t\t/**\n\t\t * Get a handler for thenable x.\n\t\t * NOTE: You must only call this if maybeThenable(x) == true\n\t\t * @param {object|function|Promise} x\n\t\t * @returns {object} handler\n\t\t */\n\t\tfunction getHandlerMaybeThenable(x) {\n\t\t\treturn isPromise(x) ? x._handler.join() : getHandlerUntrusted(x);\n\t\t}\n\n\t\t/**\n\t\t * Get a handler for potentially untrusted thenable x\n\t\t * @param {*} x\n\t\t * @returns {object} handler\n\t\t */\n\t\tfunction getHandlerUntrusted(x) {\n\t\t\ttry {\n\t\t\t\tvar untrustedThen = x.then;\n\t\t\t\treturn typeof untrustedThen === \'function\'\n\t\t\t\t\t? new Thenable(untrustedThen, x)\n\t\t\t\t\t: new Fulfilled(x);\n\t\t\t} catch(e) {\n\t\t\t\treturn new Rejected(e);\n\t\t\t}\n\t\t}\n\n\t\t/**\n\t\t * Handler for a promise that is pending forever\n\t\t * @constructor\n\t\t */\n\t\tfunction Handler() {}\n\n\t\tHandler.prototype.when\n\t\t\t= Handler.prototype.become\n\t\t\t= Handler.prototype.notify // deprecated\n\t\t\t= Handler.prototype.fail\n\t\t\t= Handler.prototype._unreport\n\t\t\t= Handler.prototype._report\n\t\t\t= noop;\n\n\t\tHandler.prototype._state = 0;\n\n\t\tHandler.prototype.state = function() {\n\t\t\treturn this._state;\n\t\t};\n\n\t\t/**\n\t\t * Recursively collapse handler chain to find the handler\n\t\t * nearest to the fully resolved value.\n\t\t * @returns {object} handler nearest the fully resolved value\n\t\t */\n\t\tHandler.prototype.join = function() {\n\t\t\tvar h = this;\n\t\t\twhile(h.handler !== void 0) {\n\t\t\t\th = h.handler;\n\t\t\t}\n\t\t\treturn h;\n\t\t};\n\n\t\tHandler.prototype.chain = function(to, receiver, fulfilled, rejected, progress) {\n\t\t\tthis.when({\n\t\t\t\tresolver: to,\n\t\t\t\treceiver: receiver,\n\t\t\t\tfulfilled: fulfilled,\n\t\t\t\trejected: rejected,\n\t\t\t\tprogress: progress\n\t\t\t});\n\t\t};\n\n\t\tHandler.prototype.visit = function(receiver, fulfilled, rejected, progress) {\n\t\t\tthis.chain(failIfRejected, receiver, fulfilled, rejected, progress);\n\t\t};\n\n\t\tHandler.prototype.fold = function(f, z, c, to) {\n\t\t\tthis.when(new Fold(f, z, c, to));\n\t\t};\n\n\t\t/**\n\t\t * Handler that invokes fail() on any handler it becomes\n\t\t * @constructor\n\t\t */\n\t\tfunction FailIfRejected() {}\n\n\t\tinherit(Handler, FailIfRejected);\n\n\t\tFailIfRejected.prototype.become = function(h) {\n\t\t\th.fail();\n\t\t};\n\n\t\tvar failIfRejected = new FailIfRejected();\n\n\t\t/**\n\t\t * Handler that manages a queue of consumers waiting on a pending promise\n\t\t * @constructor\n\t\t */\n\t\tfunction Pending(receiver, inheritedContext) {\n\t\t\tPromise.createContext(this, inheritedContext);\n\n\t\t\tthis.consumers = void 0;\n\t\t\tthis.receiver = receiver;\n\t\t\tthis.handler = void 0;\n\t\t\tthis.resolved = false;\n\t\t}\n\n\t\tinherit(Handler, Pending);\n\n\t\tPending.prototype._state = 0;\n\n\t\tPending.prototype.resolve = function(x) {\n\t\t\tthis.become(getHandler(x));\n\t\t};\n\n\t\tPending.prototype.reject = function(x) {\n\t\t\tif(this.resolved) {\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\tthis.become(new Rejected(x));\n\t\t};\n\n\t\tPending.prototype.join = function() {\n\t\t\tif (!this.resolved) {\n\t\t\t\treturn this;\n\t\t\t}\n\n\t\t\tvar h = this;\n\n\t\t\twhile (h.handler !== void 0) {\n\t\t\t\th = h.handler;\n\t\t\t\tif (h === this) {\n\t\t\t\t\treturn this.handler = cycle();\n\t\t\t\t}\n\t\t\t}\n\n\t\t\treturn h;\n\t\t};\n\n\t\tPending.prototype.run = function() {\n\t\t\tvar q = this.consumers;\n\t\t\tvar handler = this.handler;\n\t\t\tthis.handler = this.handler.join();\n\t\t\tthis.consumers = void 0;\n\n\t\t\tfor (var i = 0; i < q.length; ++i) {\n\t\t\t\thandler.when(q[i]);\n\t\t\t}\n\t\t};\n\n\t\tPending.prototype.become = function(handler) {\n\t\t\tif(this.resolved) {\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\tthis.resolved = true;\n\t\t\tthis.handler = handler;\n\t\t\tif(this.consumers !== void 0) {\n\t\t\t\ttasks.enqueue(this);\n\t\t\t}\n\n\t\t\tif(this.context !== void 0) {\n\t\t\t\thandler._report(this.context);\n\t\t\t}\n\t\t};\n\n\t\tPending.prototype.when = function(continuation) {\n\t\t\tif(this.resolved) {\n\t\t\t\ttasks.enqueue(new ContinuationTask(continuation, this.handler));\n\t\t\t} else {\n\t\t\t\tif(this.consumers === void 0) {\n\t\t\t\t\tthis.consumers = [continuation];\n\t\t\t\t} else {\n\t\t\t\t\tthis.consumers.push(continuation);\n\t\t\t\t}\n\t\t\t}\n\t\t};\n\n\t\t/**\n\t\t * @deprecated\n\t\t */\n\t\tPending.prototype.notify = function(x) {\n\t\t\tif(!this.resolved) {\n\t\t\t\ttasks.enqueue(new ProgressTask(x, this));\n\t\t\t}\n\t\t};\n\n\t\tPending.prototype.fail = function(context) {\n\t\t\tvar c = typeof context === \'undefined\' ? this.context : context;\n\t\t\tthis.resolved && this.handler.join().fail(c);\n\t\t};\n\n\t\tPending.prototype._report = function(context) {\n\t\t\tthis.resolved && this.handler.join()._report(context);\n\t\t};\n\n\t\tPending.prototype._unreport = function() {\n\t\t\tthis.resolved && this.handler.join()._unreport();\n\t\t};\n\n\t\t/**\n\t\t * Wrap another handler and force it into a future stack\n\t\t * @param {object} handler\n\t\t * @constructor\n\t\t */\n\t\tfunction Async(handler) {\n\t\t\tthis.handler = handler;\n\t\t}\n\n\t\tinherit(Handler, Async);\n\n\t\tAsync.prototype.when = function(continuation) {\n\t\t\ttasks.enqueue(new ContinuationTask(continuation, this));\n\t\t};\n\n\t\tAsync.prototype._report = function(context) {\n\t\t\tthis.join()._report(context);\n\t\t};\n\n\t\tAsync.prototype._unreport = function() {\n\t\t\tthis.join()._unreport();\n\t\t};\n\n\t\t/**\n\t\t * Handler that wraps an untrusted thenable and assimilates it in a future stack\n\t\t * @param {function} then\n\t\t * @param {{then: function}} thenable\n\t\t * @constructor\n\t\t */\n\t\tfunction Thenable(then, thenable) {\n\t\t\tPending.call(this);\n\t\t\ttasks.enqueue(new AssimilateTask(then, thenable, this));\n\t\t}\n\n\t\tinherit(Pending, Thenable);\n\n\t\t/**\n\t\t * Handler for a fulfilled promise\n\t\t * @param {*} x fulfillment value\n\t\t * @constructor\n\t\t */\n\t\tfunction Fulfilled(x) {\n\t\t\tPromise.createContext(this);\n\t\t\tthis.value = x;\n\t\t}\n\n\t\tinherit(Handler, Fulfilled);\n\n\t\tFulfilled.prototype._state = 1;\n\n\t\tFulfilled.prototype.fold = function(f, z, c, to) {\n\t\t\trunContinuation3(f, z, this, c, to);\n\t\t};\n\n\t\tFulfilled.prototype.when = function(cont) {\n\t\t\trunContinuation1(cont.fulfilled, this, cont.receiver, cont.resolver);\n\t\t};\n\n\t\tvar errorId = 0;\n\n\t\t/**\n\t\t * Handler for a rejected promise\n\t\t * @param {*} x rejection reason\n\t\t * @constructor\n\t\t */\n\t\tfunction Rejected(x) {\n\t\t\tPromise.createContext(this);\n\n\t\t\tthis.id = ++errorId;\n\t\t\tthis.value = x;\n\t\t\tthis.handled = false;\n\t\t\tthis.reported = false;\n\n\t\t\tthis._report();\n\t\t}\n\n\t\tinherit(Handler, Rejected);\n\n\t\tRejected.prototype._state = -1;\n\n\t\tRejected.prototype.fold = function(f, z, c, to) {\n\t\t\tto.become(this);\n\t\t};\n\n\t\tRejected.prototype.when = function(cont) {\n\t\t\tif(typeof cont.rejected === \'function\') {\n\t\t\t\tthis._unreport();\n\t\t\t}\n\t\t\trunContinuation1(cont.rejected, this, cont.receiver, cont.resolver);\n\t\t};\n\n\t\tRejected.prototype._report = function(context) {\n\t\t\ttasks.afterQueue(new ReportTask(this, context));\n\t\t};\n\n\t\tRejected.prototype._unreport = function() {\n\t\t\tif(this.handled) {\n\t\t\t\treturn;\n\t\t\t}\n\t\t\tthis.handled = true;\n\t\t\ttasks.afterQueue(new UnreportTask(this));\n\t\t};\n\n\t\tRejected.prototype.fail = function(context) {\n\t\t\tthis.reported = true;\n\t\t\temitRejection(\'unhandledRejection\', this);\n\t\t\tPromise.onFatalRejection(this, context === void 0 ? this.context : context);\n\t\t};\n\n\t\tfunction ReportTask(rejection, context) {\n\t\t\tthis.rejection = rejection;\n\t\t\tthis.context = context;\n\t\t}\n\n\t\tReportTask.prototype.run = function() {\n\t\t\tif(!this.rejection.handled && !this.rejection.reported) {\n\t\t\t\tthis.rejection.reported = true;\n\t\t\t\temitRejection(\'unhandledRejection\', this.rejection) ||\n\t\t\t\t\tPromise.onPotentiallyUnhandledRejection(this.rejection, this.context);\n\t\t\t}\n\t\t};\n\n\t\tfunction UnreportTask(rejection) {\n\t\t\tthis.rejection = rejection;\n\t\t}\n\n\t\tUnreportTask.prototype.run = function() {\n\t\t\tif(this.rejection.reported) {\n\t\t\t\temitRejection(\'rejectionHandled\', this.rejection) ||\n\t\t\t\t\tPromise.onPotentiallyUnhandledRejectionHandled(this.rejection);\n\t\t\t}\n\t\t};\n\n\t\t// Unhandled rejection hooks\n\t\t// By default, everything is a noop\n\n\t\tPromise.createContext\n\t\t\t= Promise.enterContext\n\t\t\t= Promise.exitContext\n\t\t\t= Promise.onPotentiallyUnhandledRejection\n\t\t\t= Promise.onPotentiallyUnhandledRejectionHandled\n\t\t\t= Promise.onFatalRejection\n\t\t\t= noop;\n\n\t\t// Errors and singletons\n\n\t\tvar foreverPendingHandler = new Handler();\n\t\tvar foreverPendingPromise = new Promise(Handler, foreverPendingHandler);\n\n\t\tfunction cycle() {\n\t\t\treturn new Rejected(new TypeError(\'Promise cycle\'));\n\t\t}\n\n\t\t// Task runners\n\n\t\t/**\n\t\t * Run a single consumer\n\t\t * @constructor\n\t\t */\n\t\tfunction ContinuationTask(continuation, handler) {\n\t\t\tthis.continuation = continuation;\n\t\t\tthis.handler = handler;\n\t\t}\n\n\t\tContinuationTask.prototype.run = function() {\n\t\t\tthis.handler.join().when(this.continuation);\n\t\t};\n\n\t\t/**\n\t\t * Run a queue of progress handlers\n\t\t * @constructor\n\t\t */\n\t\tfunction ProgressTask(value, handler) {\n\t\t\tthis.handler = handler;\n\t\t\tthis.value = value;\n\t\t}\n\n\t\tProgressTask.prototype.run = function() {\n\t\t\tvar q = this.handler.consumers;\n\t\t\tif(q === void 0) {\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\tfor (var c, i = 0; i < q.length; ++i) {\n\t\t\t\tc = q[i];\n\t\t\t\trunNotify(c.progress, this.value, this.handler, c.receiver, c.resolver);\n\t\t\t}\n\t\t};\n\n\t\t/**\n\t\t * Assimilate a thenable, sending it\'s value to resolver\n\t\t * @param {function} then\n\t\t * @param {object|function} thenable\n\t\t * @param {object} resolver\n\t\t * @constructor\n\t\t */\n\t\tfunction AssimilateTask(then, thenable, resolver) {\n\t\t\tthis._then = then;\n\t\t\tthis.thenable = thenable;\n\t\t\tthis.resolver = resolver;\n\t\t}\n\n\t\tAssimilateTask.prototype.run = function() {\n\t\t\tvar h = this.resolver;\n\t\t\ttryAssimilate(this._then, this.thenable, _resolve, _reject, _notify);\n\n\t\t\tfunction _resolve(x) { h.resolve(x); }\n\t\t\tfunction _reject(x)  { h.reject(x); }\n\t\t\tfunction _notify(x)  { h.notify(x); }\n\t\t};\n\n\t\tfunction tryAssimilate(then, thenable, resolve, reject, notify) {\n\t\t\ttry {\n\t\t\t\tthen.call(thenable, resolve, reject, notify);\n\t\t\t} catch (e) {\n\t\t\t\treject(e);\n\t\t\t}\n\t\t}\n\n\t\t/**\n\t\t * Fold a handler value with z\n\t\t * @constructor\n\t\t */\n\t\tfunction Fold(f, z, c, to) {\n\t\t\tthis.f = f; this.z = z; this.c = c; this.to = to;\n\t\t\tthis.resolver = failIfRejected;\n\t\t\tthis.receiver = this;\n\t\t}\n\n\t\tFold.prototype.fulfilled = function(x) {\n\t\t\tthis.f.call(this.c, this.z, x, this.to);\n\t\t};\n\n\t\tFold.prototype.rejected = function(x) {\n\t\t\tthis.to.reject(x);\n\t\t};\n\n\t\tFold.prototype.progress = function(x) {\n\t\t\tthis.to.notify(x);\n\t\t};\n\n\t\t// Other helpers\n\n\t\t/**\n\t\t * @param {*} x\n\t\t * @returns {boolean} true iff x is a trusted Promise\n\t\t */\n\t\tfunction isPromise(x) {\n\t\t\treturn x instanceof Promise;\n\t\t}\n\n\t\t/**\n\t\t * Test just enough to rule out primitives, in order to take faster\n\t\t * paths in some code\n\t\t * @param {*} x\n\t\t * @returns {boolean} false iff x is guaranteed *not* to be a thenable\n\t\t */\n\t\tfunction maybeThenable(x) {\n\t\t\treturn (typeof x === \'object\' || typeof x === \'function\') && x !== null;\n\t\t}\n\n\t\tfunction runContinuation1(f, h, receiver, next) {\n\t\t\tif(typeof f !== \'function\') {\n\t\t\t\treturn next.become(h);\n\t\t\t}\n\n\t\t\tPromise.enterContext(h);\n\t\t\ttryCatchReject(f, h.value, receiver, next);\n\t\t\tPromise.exitContext();\n\t\t}\n\n\t\tfunction runContinuation3(f, x, h, receiver, next) {\n\t\t\tif(typeof f !== \'function\') {\n\t\t\t\treturn next.become(h);\n\t\t\t}\n\n\t\t\tPromise.enterContext(h);\n\t\t\ttryCatchReject3(f, x, h.value, receiver, next);\n\t\t\tPromise.exitContext();\n\t\t}\n\n\t\t/**\n\t\t * @deprecated\n\t\t */\n\t\tfunction runNotify(f, x, h, receiver, next) {\n\t\t\tif(typeof f !== \'function\') {\n\t\t\t\treturn next.notify(x);\n\t\t\t}\n\n\t\t\tPromise.enterContext(h);\n\t\t\ttryCatchReturn(f, x, receiver, next);\n\t\t\tPromise.exitContext();\n\t\t}\n\n\t\tfunction tryCatch2(f, a, b) {\n\t\t\ttry {\n\t\t\t\treturn f(a, b);\n\t\t\t} catch(e) {\n\t\t\t\treturn reject(e);\n\t\t\t}\n\t\t}\n\n\t\t/**\n\t\t * Return f.call(thisArg, x), or if it throws return a rejected promise for\n\t\t * the thrown exception\n\t\t */\n\t\tfunction tryCatchReject(f, x, thisArg, next) {\n\t\t\ttry {\n\t\t\t\tnext.become(getHandler(f.call(thisArg, x)));\n\t\t\t} catch(e) {\n\t\t\t\tnext.become(new Rejected(e));\n\t\t\t}\n\t\t}\n\n\t\t/**\n\t\t * Same as above, but includes the extra argument parameter.\n\t\t */\n\t\tfunction tryCatchReject3(f, x, y, thisArg, next) {\n\t\t\ttry {\n\t\t\t\tf.call(thisArg, x, y, next);\n\t\t\t} catch(e) {\n\t\t\t\tnext.become(new Rejected(e));\n\t\t\t}\n\t\t}\n\n\t\t/**\n\t\t * @deprecated\n\t\t * Return f.call(thisArg, x), or if it throws, *return* the exception\n\t\t */\n\t\tfunction tryCatchReturn(f, x, thisArg, next) {\n\t\t\ttry {\n\t\t\t\tnext.notify(f.call(thisArg, x));\n\t\t\t} catch(e) {\n\t\t\t\tnext.notify(e);\n\t\t\t}\n\t\t}\n\n\t\tfunction inherit(Parent, Child) {\n\t\t\tChild.prototype = objectCreate(Parent.prototype);\n\t\t\tChild.prototype.constructor = Child;\n\t\t}\n\n\t\tfunction snd(x, y) {\n\t\t\treturn y;\n\t\t}\n\n\t\tfunction noop() {}\n\n\t\tfunction initEmitRejection() {\n\t\t\t/*global process, self, CustomEvent*/\n\t\t\tif(typeof process !== \'undefined\' && process !== null\n\t\t\t\t&& typeof process.emit === \'function\') {\n\t\t\t\t// Returning falsy here means to call the default\n\t\t\t\t// onPotentiallyUnhandledRejection API.  This is safe even in\n\t\t\t\t// browserify since process.emit always returns falsy in browserify:\n\t\t\t\t// https://github.com/defunctzombie/node-process/blob/master/browser.js#L40-L46\n\t\t\t\treturn function(type, rejection) {\n\t\t\t\t\treturn type === \'unhandledRejection\'\n\t\t\t\t\t\t? process.emit(type, rejection.value, rejection)\n\t\t\t\t\t\t: process.emit(type, rejection);\n\t\t\t\t};\n\t\t\t} else if(typeof self !== \'undefined\' && typeof CustomEvent === \'function\') {\n\t\t\t\treturn (function(noop, self, CustomEvent) {\n\t\t\t\t\tvar hasCustomEvent = false;\n\t\t\t\t\ttry {\n\t\t\t\t\t\tvar ev = new CustomEvent(\'unhandledRejection\');\n\t\t\t\t\t\thasCustomEvent = ev instanceof CustomEvent;\n\t\t\t\t\t} catch (e) {}\n\n\t\t\t\t\treturn !hasCustomEvent ? noop : function(type, rejection) {\n\t\t\t\t\t\tvar ev = new CustomEvent(type, {\n\t\t\t\t\t\t\tdetail: {\n\t\t\t\t\t\t\t\treason: rejection.value,\n\t\t\t\t\t\t\t\tkey: rejection\n\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\tbubbles: false,\n\t\t\t\t\t\t\tcancelable: true\n\t\t\t\t\t\t});\n\n\t\t\t\t\t\treturn !self.dispatchEvent(ev);\n\t\t\t\t\t};\n\t\t\t\t}(noop, self, CustomEvent));\n\t\t\t}\n\n\t\t\treturn noop;\n\t\t}\n\n\t\treturn Promise;\n\t};\n});\n}(typeof define === \'function\' && define.amd ? define : function(factory) { module.exports = factory(); }));\n\n},{}]},{},[1])\n//# sourceMappingURL=Promise.js.map\n(1)\n});\n;';
    loader.global.define = undefined;
    loader.global.module = undefined;
    loader.global.exports = undefined;
    loader.__exec({
        'source': source,
        'address': module.uri
    });
    loader.global.require = require;
    loader.global.define = define;
    return loader.get('@@global-helpers').retrieveGlobal(module.id, undefined);
});
/*can-connect@0.5.5#helpers/helpers*/
define('can-connect/helpers/helpers', function (require, exports, module) {
    require('when/es6-shim/Promise');
    var strReplacer = /\{([^\}]+)\}/g, isContainer = function (current) {
            return /^f|^o/.test(typeof current);
        }, arrayProto = Array.prototype;
    var helpers;
    module.exports = helpers = {
        extend: function (d, s) {
            for (var name in s) {
                d[name] = s[name];
            }
            return d;
        },
        deferred: function () {
            var def = {};
            def.promise = new Promise(function (resolve, reject) {
                def.resolve = resolve;
                def.reject = reject;
            });
            return def;
        },
        each: function (obj, cb) {
            for (var prop in obj) {
                cb(obj[prop], prop);
            }
            return obj;
        },
        forEach: arrayProto.forEach || function (cb) {
            var i = 0, len = this.length;
            for (; i < len; i++) {
                cb(this[i], i);
            }
        },
        map: arrayProto.map || function (cb) {
            var out = [], arr = this;
            helpers.forEach.call(arr, function (o, i) {
                out.push(cb(o, i, arr));
            });
            return out;
        },
        indexOf: arrayProto.indexOf || function (item) {
            for (var i = 0, thisLen = this.length; i < thisLen; i++) {
                if (this[i] === item) {
                    return i;
                }
            }
            return -1;
        },
        getObject: function (prop, data, remove) {
            var res = data[prop];
            if (remove) {
                delete data[prop];
            }
            return res;
        },
        sub: function (str, data, remove) {
            var obs = [];
            str = str || '';
            obs.push(str.replace(strReplacer, function (whole, inside) {
                var ob = helpers.getObject(inside, data, remove);
                if (ob === undefined || ob === null) {
                    obs = null;
                    return '';
                }
                if (isContainer(ob) && obs) {
                    obs.push(ob);
                    return '';
                }
                return '' + ob;
            }));
            return obs === null ? obs : obs.length <= 1 ? obs[0] : obs;
        },
        keys: Object.keys || function () {
            var hasOwnProperty = Object.prototype.hasOwnProperty, hasDontEnumBug = !{ toString: null }.propertyIsEnumerable('toString'), dontEnums = [
                    'toString',
                    'toLocaleString',
                    'valueOf',
                    'hasOwnProperty',
                    'isPrototypeOf',
                    'propertyIsEnumerable',
                    'constructor'
                ], dontEnumsLength = dontEnums.length;
            return function (obj) {
                if (typeof obj !== 'object' && typeof obj !== 'function' || obj === null) {
                    throw new TypeError('Object.keys called on non-object');
                }
                var result = [];
                for (var prop in obj) {
                    if (hasOwnProperty.call(obj, prop)) {
                        result.push(prop);
                    }
                }
                if (hasDontEnumBug) {
                    for (var i = 0; i < dontEnumsLength; i++) {
                        if (hasOwnProperty.call(obj, dontEnums[i])) {
                            result.push(dontEnums[i]);
                        }
                    }
                }
                return result;
            };
        }(),
        defineProperty: function () {
            try {
                var tmp = {};
                Object.defineProperty(tmp, 'foo', {});
                return Object.defineProperty;
            } catch (_) {
                return function (obj, name, desc) {
                    if (desc.value) {
                        obj[name] = desc.value;
                    }
                };
            }
        }(),
        isArray: Array.isArray || function (arr) {
            return Object.prototype.toString.call(arr) === '[object Array]';
        },
        bind: function () {
            if (Function.prototype.bind) {
                return function (fn, ctx) {
                    return fn.bind(ctx);
                };
            } else {
                return function (fn, ctx) {
                    return function () {
                        return fn.apply(ctx, arguments);
                    };
                };
            }
        }()
    };
});
/*can-connect@0.5.5#can-connect*/
define('can-connect', function (require, exports, module) {
    var helpers = require('./helpers/helpers');
    var connect = function (behaviors, options) {
        behaviors = helpers.map.call(behaviors, function (behavior, index) {
            var sortedIndex;
            if (typeof behavior === 'string') {
                sortedIndex = helpers.indexOf.call(connect.order, behavior);
                behavior = behaviorsMap[behavior];
            } else if (behavior.isBehavior) {
            } else {
                behavior = connect.behavior(behavior);
            }
            return {
                originalIndex: index,
                sortedIndex: sortedIndex,
                behavior: behavior
            };
        }).sort(function (b1, b2) {
            if (b1.sortedIndex != null && b2.sortedIndex != null) {
                return b1.sortedIndex - b2.sortedIndex;
            }
            return b1.originalIndex - b2.originalIndex;
        });
        behaviors = helpers.map.call(behaviors, function (b) {
            return b.behavior;
        });
        var behavior = core(connect.behavior('options', function () {
            return options;
        })());
        helpers.forEach.call(behaviors, function (behave) {
            behavior = behave(behavior);
        });
        if (behavior.init) {
            behavior.init();
        }
        return behavior;
    };
    connect.order = [
        'data-localstorage-cache',
        'data-url',
        'data-parse',
        'cache-requests',
        'data-combine-requests',
        'constructor',
        'constructor-store',
        'can-map',
        'fall-through-cache',
        'data-inline-cache',
        'data-worker',
        'data-callbacks-cache',
        'data-callbacks',
        'constructor-callbacks-once'
    ];
    connect.behavior = function (name, behavior) {
        if (typeof name !== 'string') {
            behavior = name;
            name = undefined;
        }
        var behaviorMixin = function (base) {
            var Behavior = function () {
            };
            Behavior.name = name;
            Behavior.prototype = base;
            var newBehavior = new Behavior();
            var res = typeof behavior === 'function' ? behavior.apply(newBehavior, arguments) : behavior;
            helpers.extend(newBehavior, res);
            newBehavior.__behaviorName = name;
            return newBehavior;
        };
        if (name) {
            behaviorMixin.name = name;
            behaviorsMap[name] = behaviorMixin;
        }
        behaviorMixin.isBehavior = true;
        return behaviorMixin;
    };
    var behaviorsMap = {};
    var core = connect.behavior('base', function (base) {
        return {
            id: function (instance) {
                var ids = [], algebra = this.algebra;
                if (algebra && algebra.clauses && algebra.clauses.id) {
                    for (var prop in algebra.clauses.id) {
                        ids.push(instance[prop]);
                    }
                }
                if (this.idProp && !ids.length) {
                    ids.push(instance[this.idProp]);
                }
                if (!ids.length) {
                    ids.push(instance.id);
                }
                return ids.length > 1 ? ids.join('@|@') : ids[0];
            },
            idProp: base.idProp || 'id',
            listSet: function (list) {
                return list[this.listSetProp];
            },
            listSetProp: '__listSet',
            init: function () {
            }
        };
    });
    connect.base = core;
    module.exports = connect;
});
/*can@2.3.24#util/library*/
define('can/util/library', ['can/util/jquery/jquery'], function (can) {
    return can;
});
/*can-set@0.5.6#src/helpers*/
define('can-set/src/helpers', function (require, exports, module) {
    var IgnoreType = function () {
    };
    var helpers;
    module.exports = helpers = {
        extend: function (d, s) {
            for (var prop in s) {
                d[prop] = s[prop];
            }
            return d;
        },
        isArrayLike: function (arr) {
            return arr && typeof arr === 'object' && typeof arr.length === 'number' && arr.length >= 0 && (arr.length === 0 || arr.length - 1 in arr);
        },
        each: function (obj, cb) {
            if (helpers.isArrayLike(obj)) {
                for (var i = 0; i < obj.length; i++) {
                    if (cb(obj[i], i) === false) {
                        break;
                    }
                }
            } else {
                for (var prop in obj) {
                    if (obj.hasOwnProperty(prop)) {
                        if (cb(obj[prop], prop) === false) {
                            break;
                        }
                    }
                }
            }
            return obj;
        },
        eachInUnique: function (a, acb, b, bcb, defaultReturn) {
            var bCopy = helpers.extend({}, b), res;
            for (var prop in a) {
                res = acb(a[prop], b[prop], a, b, prop);
                if (res !== undefined) {
                    return res;
                }
                delete bCopy[prop];
            }
            for (prop in bCopy) {
                res = bcb(undefined, b[prop], a, b, prop);
                if (res !== undefined) {
                    return res;
                }
            }
            return defaultReturn;
        },
        makeArray: function (arr) {
            var array = [];
            helpers.each(arr, function (item) {
                array.push(item);
            });
            return array;
        },
        doubleLoop: function (arr, callbacks) {
            if (typeof callbacks === 'function') {
                callbacks = { iterate: callbacks };
            }
            var i = 0;
            while (i < arr.length) {
                if (callbacks.start) {
                    callbacks.start(arr[i]);
                }
                var j = i + 1;
                while (j < arr.length) {
                    if (callbacks.iterate(arr[j], j, arr[i], i) === false) {
                        arr.splice(j, 1);
                    } else {
                        j++;
                    }
                }
                if (callbacks.end) {
                    callbacks.end(arr[i]);
                }
                i++;
            }
        },
        identityMap: function (arr) {
            var map = {};
            helpers.each(arr, function (value) {
                map[value] = 1;
            });
            return map;
        },
        arrayUnionIntersectionDifference: function (arr1, arr2) {
            var map = {};
            var intersection = [];
            var union = [];
            var difference = arr1.slice(0);
            helpers.each(arr1, function (value) {
                map[value] = true;
                union.push(value);
            });
            helpers.each(arr2, function (value) {
                if (map[value]) {
                    intersection.push(value);
                    var index = helpers.indexOf.call(difference, value);
                    if (index !== -1) {
                        difference.splice(index, 1);
                    }
                } else {
                    union.push(value);
                }
            });
            return {
                intersection: intersection,
                union: union,
                difference: difference
            };
        },
        arraySame: function (arr1, arr2) {
            if (arr1.length !== arr2.length) {
                return false;
            }
            var map = helpers.identityMap(arr1);
            for (var i = 0; i < arr2.length; i++) {
                var val = map[arr2[i]];
                if (!val) {
                    return false;
                } else if (val > 1) {
                    return false;
                } else {
                    map[arr2[i]]++;
                }
            }
            return true;
        },
        indexOf: Array.prototype.indexOf || function (item) {
            for (var i = 0, thisLen = this.length; i < thisLen; i++) {
                if (this[i] === item) {
                    return i;
                }
            }
            return -1;
        },
        map: Array.prototype.map || function (cb) {
            var out = [];
            for (var i = 0, len = this.length; i < len; i++) {
                out.push(cb(this[i], i, this));
            }
            return out;
        },
        filter: Array.prototype.filter || function (cb) {
            var out = [];
            for (var i = 0, len = this.length; i < len; i++) {
                if (cb(this[i], i, this)) {
                    out.push(this[i]);
                }
            }
            return out;
        },
        isEmptyObject: function (obj) {
            var prop;
            for (prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    break;
                }
            }
            return prop === undefined;
        },
        ignoreType: new IgnoreType(),
        firstProp: function (set) {
            for (var prop in set) {
                return prop;
            }
        },
        last: function (arr) {
            return arr[arr.length - 1];
        },
        index: function (compare, items, props) {
            if (!items || !items.length) {
                return undefined;
            }
            if (compare(props, items[0]) === -1) {
                return 0;
            } else if (compare(props, helpers.last(items)) === 1) {
                return items.length;
            }
            var low = 0, high = items.length;
            while (low < high) {
                var mid = low + high >>> 1, item = items[mid], computed = compare(props, item);
                if (computed === -1) {
                    high = mid;
                } else {
                    low = mid + 1;
                }
            }
            return high;
        },
        defaultSort: function (sortPropValue, item1, item2) {
            var parts = sortPropValue.split(' ');
            var sortProp = parts[0];
            var item1Value = item1[sortProp];
            var item2Value = item2[sortProp];
            var temp;
            var desc = parts[1] || '';
            desc = desc.toLowerCase() === 'desc';
            if (desc) {
                temp = item1Value;
                item1Value = item2Value;
                item2Value = temp;
            }
            if (item1Value < item2Value) {
                return -1;
            }
            if (item1Value > item2Value) {
                return 1;
            }
            return 0;
        }
    };
});
/*can-set@0.5.6#src/clause*/
define('can-set/src/clause', function (require, exports, module) {
    var h = require('./helpers');
    var clause = {};
    module.exports = clause;
    clause.TYPES = [
        'where',
        'order',
        'paginate',
        'id'
    ];
    h.each(clause.TYPES, function (type) {
        var className = type.charAt(0).toUpperCase() + type.substr(1);
        clause[className] = function (compare) {
            h.extend(this, compare);
        };
        clause[className].type = type;
    });
});
/*can-set@0.5.6#src/compare*/
define('can-set/src/compare', function (require, exports, module) {
    var h = require('./helpers');
    var compareHelpers;
    var loop = function (a, b, aParent, bParent, prop, compares, options) {
        var checks = options.checks;
        for (var i = 0; i < checks.length; i++) {
            var res = checks[i](a, b, aParent, bParent, prop, compares || {}, options);
            if (res !== undefined) {
                return res;
            }
        }
        return options['default'];
    };
    var addIntersectedPropertyToResult = function (a, b, aParent, bParent, prop, compares, options) {
        var subsetCheck;
        if (!(prop in aParent)) {
            subsetCheck = 'subsetB';
        } else if (prop in bParent) {
            return false;
        }
        if (!(prop in bParent)) {
            subsetCheck = 'subsetA';
        }
        if (subsetCheck === 'subsetB') {
            options.result[prop] = b;
        } else {
            options.result[prop] = a;
        }
        return undefined;
    };
    var addToResult = function (fn, name) {
        return function (a, b, aParent, bParent, prop, compares, options) {
            var res = fn.apply(this, arguments);
            if (res === true) {
                if (prop !== undefined && !(prop in options.result)) {
                    options.result[prop] = a;
                }
                return true;
            } else {
                return res;
            }
        };
    };
    module.exports = compareHelpers = {
        equal: function (a, b, aParent, bParent, prop, compares, options) {
            options.checks = [
                compareHelpers.equalComparesType,
                compareHelpers.equalBasicTypes,
                compareHelpers.equalArrayLike,
                compareHelpers.equalObject
            ];
            options['default'] = false;
            return loop(a, b, aParent, bParent, prop, compares, options);
        },
        equalComparesType: function (a, b, aParent, bParent, prop, compares, options) {
            if (typeof compares === 'function') {
                var compareResult = compares(a, b, aParent, bParent, prop, options);
                if (typeof compareResult === 'boolean') {
                    return compareResult;
                } else if (compareResult && typeof compareResult === 'object') {
                    if ('intersection' in compareResult && !('difference' in compareResult)) {
                        var reverseResult = compares(b, a, bParent, aParent, prop, options);
                        return 'intersection' in reverseResult && !('difference' in reverseResult);
                    }
                    return false;
                }
                return compareResult;
            }
        },
        equalBasicTypes: function (a, b, aParent, bParent, prop, compares, options) {
            if (a === null || b === null) {
                return a === b;
            }
            if (a instanceof Date || b instanceof Date) {
                return a === b;
            }
            if (options.deep === -1) {
                return typeof a === 'object' || a === b;
            }
            if (typeof a !== typeof b || h.isArrayLike(a) !== h.isArrayLike(b)) {
                return false;
            }
            if (a === b) {
                return true;
            }
        },
        equalArrayLike: function (a, b, aParent, bParent, prop, compares, options) {
            if (h.isArrayLike(a) && h.isArrayLike(b)) {
                if (a.length !== b.length) {
                    return false;
                }
                for (var i = 0; i < a.length; i++) {
                    var compare = compares[i] === undefined ? compares['*'] : compares[i];
                    if (!loop(a[i], b[i], a, b, i, compare, options)) {
                        return false;
                    }
                }
                return true;
            }
        },
        equalObject: function (a, b, aParent, bParent, parentProp, compares, options) {
            var aType = typeof a;
            if (aType === 'object' || aType === 'function') {
                var bCopy = h.extend({}, b);
                if (options.deep === false) {
                    options.deep = -1;
                }
                for (var prop in a) {
                    var compare = compares[prop] === undefined ? compares['*'] : compares[prop];
                    if (!loop(a[prop], b[prop], a, b, prop, compare, options)) {
                        return false;
                    }
                    delete bCopy[prop];
                }
                for (prop in bCopy) {
                    if (compares[prop] === undefined || !loop(undefined, b[prop], a, b, prop, compares[prop], options)) {
                        return false;
                    }
                }
                return true;
            }
        },
        subset: function (a, b, aParent, bParent, prop, compares, options) {
            options.checks = [
                compareHelpers.subsetComparesType,
                compareHelpers.equalBasicTypes,
                compareHelpers.equalArrayLike,
                compareHelpers.subsetObject
            ];
            options.getSubsets = [];
            options['default'] = false;
            return loop(a, b, aParent, bParent, prop, compares, options);
        },
        subsetObject: function (a, b, aParent, bParent, parentProp, compares, options) {
            var aType = typeof a;
            if (aType === 'object' || aType === 'function') {
                return h.eachInUnique(a, function (a, b, aParent, bParent, prop) {
                    var compare = compares[prop] === undefined ? compares['*'] : compares[prop];
                    if (!loop(a, b, aParent, bParent, prop, compare, options) && prop in bParent) {
                        return false;
                    }
                }, b, function (a, b, aParent, bParent, prop) {
                    var compare = compares[prop] === undefined ? compares['*'] : compares[prop];
                    if (!loop(a, b, aParent, bParent, prop, compare, options)) {
                        return false;
                    }
                }, true);
            }
        },
        subsetComparesType: function (a, b, aParent, bParent, prop, compares, options) {
            if (typeof compares === 'function') {
                var compareResult = compares(a, b, aParent, bParent, prop, options);
                if (typeof compareResult === 'boolean') {
                    return compareResult;
                } else if (compareResult && typeof compareResult === 'object') {
                    if (compareResult.getSubset) {
                        if (h.indexOf.call(options.getSubsets, compareResult.getSubset) === -1) {
                            options.getSubsets.push(compareResult.getSubset);
                        }
                    }
                    if (compareResult.intersection === h.ignoreType || compareResult.difference === h.ignoreType) {
                        return true;
                    }
                    if ('intersection' in compareResult && !('difference' in compareResult)) {
                        var reverseResult = compares(b, a, bParent, aParent, prop, options);
                        return 'intersection' in reverseResult;
                    }
                    return false;
                }
                return compareResult;
            }
        },
        properSupersetObject: function (a, b, aParent, bParent, parentProp, compares, options) {
            var bType = typeof b;
            var hasAdditionalProp = false;
            if (bType === 'object' || bType === 'function') {
                var aCopy = h.extend({}, a);
                if (options.deep === false) {
                    options.deep = -1;
                }
                for (var prop in b) {
                    var compare = compares[prop] === undefined ? compares['*'] : compares[prop];
                    var compareResult = loop(a[prop], b[prop], a, b, prop, compare, options);
                    if (compareResult === h.ignoreType) {
                    } else if (!(prop in a) || options.performedDifference) {
                        hasAdditionalProp = true;
                    } else if (!compareResult) {
                        return false;
                    }
                    delete aCopy[prop];
                }
                for (prop in aCopy) {
                    if (compares[prop] === undefined || !loop(a[prop], undefined, a, b, prop, compares[prop], options)) {
                        return false;
                    }
                }
                return hasAdditionalProp;
            }
        },
        properSubsetComparesType: function (a, b, aParent, bParent, prop, compares, options) {
            if (typeof compares === 'function') {
                var compareResult = compares(a, b, aParent, bParent, prop, options);
                if (typeof compareResult === 'boolean') {
                    return compareResult;
                } else if (compareResult && typeof compareResult === 'object') {
                    if ('intersection' in compareResult && !('difference' in compareResult)) {
                        var reverseResult = compares(b, a, bParent, aParent, prop, options);
                        return 'intersection' in reverseResult && 'difference' in reverseResult;
                    }
                    return false;
                }
                return compareResult;
            }
        },
        difference: function (a, b, aParent, bParent, prop, compares, options) {
            options.result = {};
            options.performedDifference = 0;
            options.checks = [
                compareHelpers.differenceComparesType,
                addToResult(compareHelpers.equalBasicTypes, 'equalBasicTypes'),
                addToResult(compareHelpers.equalArrayLike, 'equalArrayLike'),
                addToResult(compareHelpers.properSupersetObject, 'properSubsetObject')
            ];
            options['default'] = true;
            var res = loop(a, b, aParent, bParent, prop, compares, options);
            if (res === true && options.performedDifference) {
                return options.result;
            }
            return res;
        },
        differenceComparesType: function (a, b, aParent, bParent, prop, compares, options) {
            if (typeof compares === 'function') {
                var compareResult = compares(a, b, aParent, bParent, prop, options);
                if (typeof compareResult === 'boolean') {
                    if (compareResult === true) {
                        options.result[prop] = a;
                        return true;
                    } else {
                        return compareResult;
                    }
                } else if (compareResult && typeof compareResult === 'object') {
                    if ('difference' in compareResult) {
                        if (compareResult.difference === h.ignoreType) {
                            return h.ignoreType;
                        } else if (compareResult.difference != null) {
                            options.result[prop] = compareResult.difference;
                            options.performedDifference++;
                            return true;
                        } else {
                            return true;
                        }
                    } else {
                        if (compareHelpers.equalComparesType.apply(this, arguments)) {
                            options.performedDifference++;
                            options.result[prop] = compareResult.union;
                        } else {
                            return false;
                        }
                    }
                }
            }
        },
        union: function (a, b, aParent, bParent, prop, compares, options) {
            options.result = {};
            options.performedUnion = 0;
            options.checks = [
                compareHelpers.unionComparesType,
                addToResult(compareHelpers.equalBasicTypes, 'equalBasicTypes'),
                addToResult(compareHelpers.unionArrayLike, 'unionArrayLike'),
                addToResult(compareHelpers.unionObject, 'unionObject')
            ];
            options.getUnions = [];
            options['default'] = false;
            var res = loop(a, b, aParent, bParent, prop, compares, options);
            if (res === true) {
                return options.result;
            }
            return false;
        },
        unionComparesType: function (a, b, aParent, bParent, prop, compares, options) {
            if (typeof compares === 'function') {
                var compareResult = compares(a, b, aParent, bParent, prop, options);
                if (typeof compareResult === 'boolean') {
                    if (compareResult === true) {
                        options.result[prop] = a;
                        return true;
                    } else {
                        return compareResult;
                    }
                } else if (compareResult && typeof compareResult === 'object') {
                    if (compareResult.getUnion) {
                        if (h.indexOf.call(options.getUnions, compareResult.getUnion) === -1) {
                            options.getUnions.push(compareResult.getUnion);
                        }
                    }
                    if ('union' in compareResult) {
                        if (compareResult.union === h.ignoreType) {
                            return compareResult.union;
                        }
                        if (compareResult.union !== undefined) {
                            options.result[prop] = compareResult.union;
                        }
                        options.performedUnion++;
                        return true;
                    }
                }
            }
        },
        unionObject: function (a, b, aParent, bParent, prop, compares, options) {
            var subsetCompare = function (a, b, aParent, bParent, prop) {
                var compare = compares[prop] === undefined ? compares['*'] : compares[prop];
                if (!loop(a, b, aParent, bParent, prop, compare, options)) {
                    var subsetCheck;
                    if (!(prop in aParent)) {
                        subsetCheck = 'subsetB';
                    }
                    if (!(prop in bParent)) {
                        subsetCheck = 'subsetA';
                    }
                    if (subsetCheck) {
                        if (!options.subset) {
                            options.subset = subsetCheck;
                        }
                        return options.subset === subsetCheck ? undefined : false;
                    }
                    return false;
                }
            };
            var aType = typeof a;
            if (aType === 'object' || aType === 'function') {
                return h.eachInUnique(a, subsetCompare, b, subsetCompare, true);
            }
        },
        unionArrayLike: function (a, b, aParent, bParent, prop, compares, options) {
            if (h.isArrayLike(a) && h.isArrayLike(b)) {
                var combined = h.makeArray(a).concat(h.makeArray(b));
                h.doubleLoop(combined, function (item, j, cur, i) {
                    var res = !compareHelpers.equal(cur, item, aParent, bParent, undefined, compares['*'], { 'default': false });
                    return res;
                });
                options.result[prop] = combined;
                return true;
            }
        },
        count: function (a, b, aParent, bParent, prop, compares, options) {
            options.checks = [
                compareHelpers.countComparesType,
                compareHelpers.equalBasicTypes,
                compareHelpers.equalArrayLike,
                compareHelpers.loopObject
            ];
            options['default'] = false;
            loop(a, b, aParent, bParent, prop, compares, options);
            if (typeof options.count === 'number') {
                return options.count;
            }
            return Infinity;
        },
        countComparesType: function (a, b, aParent, bParent, prop, compares, options) {
            if (typeof compares === 'function') {
                var compareResult = compares(a, b, aParent, bParent, prop, options);
                if (typeof compareResult === 'boolean') {
                    return true;
                } else if (compareResult && typeof compareResult === 'object') {
                    if (typeof compareResult.count === 'number') {
                        if (!('count' in options) || compareResult.count === options.count) {
                            options.count = compareResult.count;
                        } else {
                            options.count = Infinity;
                        }
                    }
                    return true;
                }
            }
        },
        loopObject: function (a, b, aParent, bParent, prop, compares, options) {
            var aType = typeof a;
            if (aType === 'object' || aType === 'function') {
                h.each(a, function (aValue, prop) {
                    var compare = compares[prop] === undefined ? compares['*'] : compares[prop];
                    loop(aValue, b[prop], a, b, prop, compare, options);
                });
                return true;
            }
        },
        intersection: function (a, b, aParent, bParent, prop, compares, options) {
            options.result = {};
            options.performedIntersection = 0;
            options.checks = [
                compareHelpers.intersectionComparesType,
                addToResult(compareHelpers.equalBasicTypes, 'equalBasicTypes'),
                addToResult(compareHelpers.intersectionArrayLike, 'intersectionArrayLike'),
                compareHelpers.intersectionObject
            ];
            options['default'] = false;
            var res = loop(a, b, aParent, bParent, prop, compares, options);
            if (res === true) {
                return options.result;
            }
            return false;
        },
        intersectionComparesType: function (a, b, aParent, bParent, prop, compares, options) {
            if (typeof compares === 'function') {
                var compareResult = compares(a, b, aParent, bParent, prop, options);
                if (typeof compareResult === 'boolean') {
                    if (compareResult === true) {
                        options.result[prop] = a;
                        return true;
                    } else {
                        return compareResult;
                    }
                } else if (compareResult && typeof compareResult === 'object') {
                    if ('intersection' in compareResult) {
                        if (compareResult.intersection !== undefined) {
                            options.result[prop] = compareResult.intersection;
                        }
                        options.performedIntersection++;
                        return true;
                    }
                }
            }
        },
        intersectionObject: function (a, b, aParent, bParent, prop, compares, options) {
            var subsetCompare = function (a, b, aParent, bParent, prop) {
                var compare = compares[prop] === undefined ? compares['*'] : compares[prop];
                if (!loop(a, b, aParent, bParent, prop, compare, options)) {
                    return addIntersectedPropertyToResult(a, b, aParent, bParent, prop, compares, options);
                }
            };
            var aType = typeof a;
            if (aType === 'object' || aType === 'function') {
                return h.eachInUnique(a, subsetCompare, b, subsetCompare, true);
            }
        },
        intersectionArrayLike: function (a, b, aParent, bParent, prop, compares, options) {
            if (h.isArrayLike(a) && h.isArrayLike(b)) {
                var intersection = [];
                h.each(h.makeArray(a), function (cur) {
                    for (var i = 0; i < b.length; i++) {
                        if (compareHelpers.equal(cur, b[i], aParent, bParent, undefined, compares['*'], { 'default': false })) {
                            intersection.push(cur);
                            break;
                        }
                    }
                });
                options.result[prop] = intersection;
                return true;
            }
        }
    };
});
/*can-set@0.5.6#src/get*/
define('can-set/src/get', function (require, exports, module) {
    var compare = require('./compare');
    var h = require('./helpers');
    var filterData = function (data, clause, comparators) {
        return h.filter.call(data, function (item) {
            var isSubset = compare.subset(item, clause, undefined, undefined, undefined, comparators, {});
            return isSubset;
        });
    };
    module.exports = {
        subsetData: function (a, b, bData, algebra) {
            var aClauseProps = algebra.getClauseProperties(a);
            var bClauseProps = algebra.getClauseProperties(b);
            var options = {};
            var aData = filterData(bData, aClauseProps.where, algebra.clauses.where);
            if (aData.length && (aClauseProps.enabled.order || bClauseProps.enabled.order)) {
                options = {};
                var propName = h.firstProp(aClauseProps.order), compareOrder = algebra.clauses.order[propName];
                aData = aData.sort(function (aItem, bItem) {
                    return compareOrder(a[propName], aItem, bItem);
                });
            }
            if (aData.length && (aClauseProps.enabled.paginate || bClauseProps.enabled.paginate)) {
                options = {};
                compare.subset(aClauseProps.paginate, bClauseProps.paginate, undefined, undefined, undefined, algebra.clauses.paginate, options);
                h.each(options.getSubsets, function (filter) {
                    aData = filter(a, b, aData, algebra, options);
                });
            }
            return aData;
        }
    };
});
/*can-set@0.5.6#src/set-core*/
define('can-set/src/set-core', function (require, exports, module) {
    var h = require('./helpers');
    var clause = require('./clause');
    var compare = require('./compare');
    var get = require('./get');
    function Translate(clause, options) {
        if (typeof options === 'string') {
            var path = options;
            options = {
                fromSet: function (set, setRemainder) {
                    return set[path] || {};
                },
                toSet: function (set, wheres) {
                    set[path] = wheres;
                    return set;
                }
            };
        }
        this.clause = clause;
        h.extend(this, options);
    }
    var Algebra = function () {
        var clauses = this.clauses = {
            where: {},
            order: {},
            paginate: {},
            id: {}
        };
        this.translators = {
            where: new Translate('where', {
                fromSet: function (set, setRemainder) {
                    return setRemainder;
                },
                toSet: function (set, wheres) {
                    return h.extend(set, wheres);
                }
            })
        };
        var self = this;
        h.each(arguments, function (arg) {
            if (arg) {
                if (arg instanceof Translate) {
                    self.translators[arg.clause] = arg;
                } else {
                    h.extend(clauses[arg.constructor.type || 'where'], arg);
                }
            }
        });
    };
    Algebra.make = function (compare, count) {
        if (compare instanceof Algebra) {
            return compare;
        } else {
            return new Algebra(compare, count);
        }
    };
    h.extend(Algebra.prototype, {
        getClauseProperties: function (set, options) {
            options = options || {};
            var setClone = h.extend({}, set);
            var clauses = this.clauses;
            var checkClauses = [
                'order',
                'paginate',
                'id'
            ];
            var clauseProps = {
                enabled: {
                    where: true,
                    order: false,
                    paginate: false,
                    id: false
                }
            };
            if (options.omitClauses) {
                checkClauses = h.arrayUnionIntersectionDifference(checkClauses, options.omitClauses).difference;
            }
            h.each(checkClauses, function (clauseName) {
                var valuesForClause = {};
                var prop;
                for (prop in clauses[clauseName]) {
                    if (prop in setClone) {
                        valuesForClause[prop] = setClone[prop];
                        delete setClone[prop];
                    }
                }
                clauseProps[clauseName] = valuesForClause;
                clauseProps.enabled[clauseName] = !h.isEmptyObject(valuesForClause);
            });
            clauseProps.where = options.isProperties ? setClone : this.translators.where.fromSet(set, setClone);
            return clauseProps;
        },
        getDifferentClauseTypes: function (aClauses, bClauses) {
            var self = this;
            var differentTypes = [];
            h.each(clause.TYPES, function (type) {
                if (!self.evaluateOperator(compare.equal, aClauses[type], bClauses[type], { isProperties: true }, { isProperties: true })) {
                    differentTypes.push(type);
                }
            });
            return differentTypes;
        },
        updateSet: function (set, clause, result, useSet) {
            if (result && typeof result === 'object' && useSet !== false) {
                if (this.translators[clause]) {
                    set = this.translators.where.toSet(set, result);
                } else {
                    set = h.extend(set, result);
                }
                return true;
            } else if (result) {
                return useSet === undefined ? undefined : false;
            } else {
                return false;
            }
        },
        evaluateOperator: function (operator, a, b, aOptions, bOptions, evaluateOptions) {
            aOptions = aOptions || {};
            bOptions = bOptions || {};
            evaluateOptions = h.extend({
                evaluateWhere: operator,
                evaluatePaginate: operator,
                evaluateOrder: operator,
                shouldEvaluatePaginate: function (aClauseProps, bClauseProps) {
                    return aClauseProps.enabled.paginate || bClauseProps.enabled.paginate;
                },
                shouldEvaluateOrder: function (aClauseProps, bClauseProps) {
                    return aClauseProps.enabled.order && compare.equal(aClauseProps.order, bClauseProps.order, undefined, undefined, undefined, {}, {});
                }
            }, evaluateOptions || {});
            var aClauseProps = this.getClauseProperties(a, aOptions), bClauseProps = this.getClauseProperties(b, bOptions), set = {}, useSet;
            var result = evaluateOptions.evaluateWhere(aClauseProps.where, bClauseProps.where, undefined, undefined, undefined, this.clauses.where, {});
            useSet = this.updateSet(set, 'where', result, useSet);
            if (result && evaluateOptions.shouldEvaluatePaginate(aClauseProps, bClauseProps)) {
                if (evaluateOptions.shouldEvaluateOrder(aClauseProps, bClauseProps)) {
                    result = evaluateOptions.evaluateOrder(aClauseProps.order, bClauseProps.order, undefined, undefined, undefined, {}, {});
                    useSet = this.updateSet(set, 'order', result, useSet);
                }
                if (result) {
                    result = evaluateOptions.evaluatePaginate(aClauseProps.paginate, bClauseProps.paginate, undefined, undefined, undefined, this.clauses.paginate, {});
                    useSet = this.updateSet(set, 'paginate', result, useSet);
                }
            } else if (result && evaluateOptions.shouldEvaluateOrder(aClauseProps, bClauseProps)) {
                result = operator(aClauseProps.order, bClauseProps.order, undefined, undefined, undefined, {}, {});
                useSet = this.updateSet(set, 'order', result, useSet);
            }
            return result && useSet ? set : result;
        },
        equal: function (a, b) {
            return this.evaluateOperator(compare.equal, a, b);
        },
        subset: function (a, b) {
            var aClauseProps = this.getClauseProperties(a);
            var bClauseProps = this.getClauseProperties(b);
            var compatibleSort = true;
            var result;
            if (bClauseProps.enabled.paginate && (aClauseProps.enabled.order || bClauseProps.enabled.order)) {
                compatibleSort = compare.equal(aClauseProps.order, bClauseProps.order, undefined, undefined, undefined, {}, {});
            }
            if (!compatibleSort) {
                result = false;
            } else {
                result = this.evaluateOperator(compare.subset, a, b);
            }
            return result;
        },
        properSubset: function (a, b) {
            return this.subset(a, b) && !this.equal(a, b);
        },
        difference: function (a, b) {
            var aClauseProps = this.getClauseProperties(a);
            var bClauseProps = this.getClauseProperties(b);
            var differentClauses = this.getDifferentClauseTypes(aClauseProps, bClauseProps);
            var result;
            switch (differentClauses.length) {
            case 0: {
                    result = false;
                    break;
                }
            case 1: {
                    var clause = differentClauses[0];
                    result = compare.difference(aClauseProps[clause], bClauseProps[clause], undefined, undefined, undefined, this.clauses[clause], {});
                    if (this.translators[clause] && typeof result === 'object') {
                        result = this.translators[clause].toSet({}, result);
                    }
                    break;
                }
            }
            return result;
        },
        union: function (a, b) {
            return this.evaluateOperator(compare.union, a, b);
        },
        intersection: function (a, b) {
            return this.evaluateOperator(compare.intersection, a, b);
        },
        count: function (a) {
            return this.evaluateOperator(compare.count, a, {});
        },
        has: function (set, props) {
            var aClauseProps = this.getClauseProperties(set);
            var propsClauseProps = this.getClauseProperties(props, { isProperties: true });
            var compatibleSort = true;
            var result;
            if ((propsClauseProps.enabled.paginate || aClauseProps.enabled.paginate) && (propsClauseProps.enabled.order || aClauseProps.enabled.order)) {
                compatibleSort = compare.equal(propsClauseProps.order, aClauseProps.order, undefined, undefined, undefined, {}, {});
            }
            if (!compatibleSort) {
                result = false;
            } else {
                result = this.evaluateOperator(compare.subset, props, set, { isProperties: true }, undefined);
            }
            return result;
        },
        index: function (set, items, item) {
            var aClauseProps = this.getClauseProperties(set);
            var propName = h.firstProp(aClauseProps.order), compare, orderValue;
            if (propName) {
                compare = this.clauses.order[propName];
                orderValue = set[propName];
                return h.index(function (itemA, itemB) {
                    return compare(orderValue, itemA, itemB);
                }, items, item);
            }
            propName = h.firstProp(this.clauses.id);
            if (propName) {
                compare = h.defaultSort;
                orderValue = propName;
                return h.index(function (itemA, itemB) {
                    return compare(orderValue, itemA, itemB);
                }, items, item);
            }
            return;
        },
        getSubset: function (a, b, bData) {
            var aClauseProps = this.getClauseProperties(a);
            var bClauseProps = this.getClauseProperties(b);
            var isSubset = this.subset(h.extend({}, aClauseProps.where, aClauseProps.paginate), h.extend({}, bClauseProps.where, bClauseProps.paginate));
            if (isSubset) {
                return get.subsetData(a, b, bData, this);
            }
        },
        getUnion: function (a, b, aItems, bItems) {
            var aClauseProps = this.getClauseProperties(a);
            var bClauseProps = this.getClauseProperties(b);
            var algebra = this;
            var options;
            if (this.subset(a, b)) {
                return bItems;
            } else if (this.subset(b, a)) {
                return aItems;
            }
            var combined;
            if (aClauseProps.enabled.paginate || bClauseProps.enabled.paginate) {
                options = {};
                var isUnion = compare.union(aClauseProps.paginate, bClauseProps.paginate, undefined, undefined, undefined, this.clauses.paginate, options);
                if (!isUnion) {
                    return;
                } else {
                    h.each(options.getUnions, function (filter) {
                        var items = filter(a, b, aItems, bItems, algebra, options);
                        aItems = items[0];
                        bItems = items[1];
                    });
                    combined = aItems.concat(bItems);
                }
            } else {
                combined = aItems.concat(bItems);
            }
            if (combined.length && aClauseProps.enabled.order && compare.equal(aClauseProps.order, bClauseProps.order, undefined, undefined, undefined, {}, {})) {
                options = {};
                var propName = h.firstProp(aClauseProps.order), compareOrder = algebra.clauses.order[propName];
                combined = combined.sort(function (aItem, bItem) {
                    return compareOrder(a[propName], aItem, bItem);
                });
            }
            return combined;
        }
    });
    var callOnAlgebra = function (methodName, algebraArgNumber) {
        return function () {
            var args = h.makeArray(arguments).slice(0, algebraArgNumber);
            var algebra = Algebra.make(arguments[algebraArgNumber]);
            return algebra[methodName].apply(algebra, args);
        };
    };
    module.exports = {
        Algebra: Algebra,
        Translate: Translate,
        difference: callOnAlgebra('difference', 2),
        equal: callOnAlgebra('equal', 2),
        subset: callOnAlgebra('subset', 2),
        properSubset: callOnAlgebra('properSubset', 2),
        union: callOnAlgebra('union', 2),
        intersection: callOnAlgebra('intersection', 2),
        count: callOnAlgebra('count', 1),
        has: callOnAlgebra('has', 2),
        index: callOnAlgebra('index', 3),
        getSubset: callOnAlgebra('getSubset', 3),
        getUnion: callOnAlgebra('getUnion', 4)
    };
});
/*can-set@0.5.6#src/comparators*/
define('can-set/src/comparators', function (require, exports, module) {
    var h = require('./helpers');
    var clause = require('./clause');
    var within = function (value, range) {
        return value >= range[0] && value <= range[1];
    };
    var numericProperties = function (setA, setB, property1, property2) {
        return {
            sAv1: +setA[property1],
            sAv2: +setA[property2],
            sBv1: +setB[property1],
            sBv2: +setB[property2]
        };
    };
    var diff = function (setA, setB, property1, property2) {
        var numProps = numericProperties(setA, setB, property1, property2);
        var sAv1 = numProps.sAv1, sAv2 = numProps.sAv2, sBv1 = numProps.sBv1, sBv2 = numProps.sBv2, count = sAv2 - sAv1 + 1;
        var after = {
            difference: [
                sBv2 + 1,
                sAv2
            ],
            intersection: [
                sAv1,
                sBv2
            ],
            union: [
                sBv1,
                sAv2
            ],
            count: count,
            meta: 'after'
        };
        var before = {
            difference: [
                sAv1,
                sBv1 - 1
            ],
            intersection: [
                sBv1,
                sAv2
            ],
            union: [
                sAv1,
                sBv2
            ],
            count: count,
            meta: 'before'
        };
        if (sAv1 === sBv1 && sAv2 === sBv2) {
            return {
                intersection: [
                    sAv1,
                    sAv2
                ],
                union: [
                    sAv1,
                    sAv2
                ],
                count: count,
                meta: 'equal'
            };
        } else if (sAv1 === sBv1 && sBv2 < sAv2) {
            return after;
        } else if (sAv2 === sBv2 && sBv1 > sAv1) {
            return before;
        } else if (within(sAv1, [
                sBv1,
                sBv2
            ]) && within(sAv2, [
                sBv1,
                sBv2
            ])) {
            return {
                intersection: [
                    sAv1,
                    sAv2
                ],
                union: [
                    sBv1,
                    sBv2
                ],
                count: count,
                meta: 'subset'
            };
        } else if (within(sBv1, [
                sAv1,
                sAv2
            ]) && within(sBv2, [
                sAv1,
                sAv2
            ])) {
            return {
                intersection: [
                    sBv1,
                    sBv2
                ],
                difference: [
                    null,
                    null
                ],
                union: [
                    sAv1,
                    sAv2
                ],
                count: count,
                meta: 'superset'
            };
        } else if (sAv1 < sBv1 && within(sAv2, [
                sBv1,
                sBv2
            ])) {
            return before;
        } else if (sBv1 < sAv1 && within(sBv2, [
                sAv1,
                sAv2
            ])) {
            return after;
        } else if (sAv2 === sBv1 - 1) {
            return {
                difference: [
                    sAv1,
                    sAv2
                ],
                union: [
                    sAv1,
                    sBv2
                ],
                count: count,
                meta: 'disjoint-before'
            };
        } else if (sBv2 === sAv1 - 1) {
            return {
                difference: [
                    sAv1,
                    sAv2
                ],
                union: [
                    sBv1,
                    sAv2
                ],
                count: count,
                meta: 'disjoint-after'
            };
        }
        if (!isNaN(count)) {
            return {
                count: count,
                meta: 'disjoint'
            };
        }
    };
    var cleanUp = function (value, enumData) {
        if (!value) {
            return enumData;
        }
        if (!h.isArrayLike(value)) {
            value = [value];
        }
        if (!value.length) {
            return enumData;
        }
        return value;
    };
    module.exports = {
        'enum': function (prop, enumData) {
            var compares = new clause.Where({});
            compares[prop] = function (vA, vB, A, B) {
                vA = cleanUp(vA, enumData);
                vB = cleanUp(vB, enumData);
                var data = h.arrayUnionIntersectionDifference(vA, vB);
                if (!data.difference.length) {
                    delete data.difference;
                }
                h.each(data, function (value, prop) {
                    if (h.isArrayLike(value)) {
                        if (h.arraySame(enumData, value)) {
                            data[prop] = undefined;
                        } else if (value.length === 1) {
                            data[prop] = value[0];
                        }
                    }
                });
                return data;
            };
            return compares;
        },
        rangeInclusive: function (startIndexProperty, endIndexProperty) {
            var compares = {};
            var makeResult = function (result, index) {
                var res = {};
                h.each([
                    'intersection',
                    'difference',
                    'union'
                ], function (prop) {
                    if (result[prop]) {
                        res[prop] = result[prop][index];
                    }
                });
                if (result.count) {
                    res.count = result.count;
                }
                return res;
            };
            compares[startIndexProperty] = function (vA, vB, A, B) {
                if (vA === undefined) {
                    return;
                }
                var res = diff(A, B, startIndexProperty, endIndexProperty);
                var result = makeResult(res, 0);
                result.getSubset = function (a, b, bItems, algebra, options) {
                    return bItems;
                };
                result.getUnion = function (a, b, aItems, bItems, algebra, options) {
                    return [
                        aItems,
                        bItems
                    ];
                };
                return result;
            };
            compares[endIndexProperty] = function (vA, vB, A, B) {
                if (vA === undefined) {
                    return;
                }
                var data = diff(A, B, startIndexProperty, endIndexProperty);
                var res = makeResult(data, 1);
                res.getSubset = function (a, b, bItems, algebra, options) {
                    var numProps = numericProperties(a, b, startIndexProperty, endIndexProperty);
                    var aStartValue = numProps.sAv1, aEndValue = numProps.sAv2;
                    var bStartValue = numProps.sBv1;
                    if (!(endIndexProperty in b) || !(endIndexProperty in a)) {
                        return bItems.slice(aStartValue, aEndValue + 1);
                    }
                    return bItems.slice(aStartValue - bStartValue, aEndValue - bStartValue + 1);
                };
                res.getUnion = function (a, b, aItems, bItems, algebra, options) {
                    if (data.meta.indexOf('after') >= 0) {
                        if (data.intersection) {
                            bItems = bItems.slice(0, data.intersection[0] - +b[startIndexProperty]);
                        }
                        return [
                            bItems,
                            aItems
                        ];
                    }
                    if (data.intersection) {
                        aItems = aItems.slice(0, data.intersection[0] - +a[startIndexProperty]);
                    }
                    return [
                        aItems,
                        bItems
                    ];
                };
                return res;
            };
            return new clause.Paginate(compares);
        },
        'boolean': function (propertyName) {
            var compares = new clause.Where({});
            compares[propertyName] = function (propA, propB) {
                var notA = !propA, notB = !propB;
                if (propA === notB && propB === notA) {
                    return {
                        difference: !propB,
                        union: undefined
                    };
                } else if (propA === undefined) {
                    return {
                        difference: !propB,
                        intersection: propB,
                        union: undefined
                    };
                }
            };
            return compares;
        },
        'sort': function (prop, sortFunc) {
            if (!sortFunc) {
                sortFunc = h.defaultSort;
            }
            var compares = {};
            compares[prop] = sortFunc;
            return new clause.Order(compares);
        },
        'id': function (prop) {
            var compares = {};
            compares[prop] = prop;
            return new clause.Id(compares);
        }
    };
});
/*can-set@0.5.6#src/set*/
define('can-set', function (require, exports, module) {
    var set = require('./set-core');
    var comparators = require('./comparators');
    set.comparators = comparators;
    set.helpers = require('./helpers');
    if (typeof window !== 'undefined' && !require.resolve) {
        window.set = set;
    }
    module.exports = set;
});
/*can@2.3.24#util/array/makeArray*/
define('can/util/array/makeArray', ['./each'], function (can) {
    can.makeArray = function (arr) {
        var ret = [];
        can.each(arr, function (a, i) {
            ret[i] = a;
        });
        return ret;
    };
    return can;
});
/*can@2.3.24#util/domless/domless*/
define('can/util/domless/domless', [
    'can/util/can',
    'can/util/attr/attr',
    'can/util/array/each',
    'can/util/array/makeArray'
], function (can, attr) {
    var core_trim = String.prototype.trim;
    var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
    function likeArray(obj) {
        return typeof obj.length === 'number';
    }
    function flatten(array) {
        return array.length > 0 ? Array.prototype.concat.apply([], array) : array;
    }
    can.isArray = function (arr) {
        if (Array.isArray) {
            return Array.isArray(arr);
        }
        return Object.prototype.toString.call(arr) === '[object Array]';
    };
    can.isFunction = function () {
        if (typeof document !== 'undefined' && typeof document.getElementsByTagName('body') === 'function') {
            return function (value) {
                return Object.prototype.toString.call(value) === '[object Function]';
            };
        } else {
            return function (value) {
                return typeof value === 'function';
            };
        }
    }();
    can.trim = core_trim && !core_trim.call('\uFEFF\xA0') ? function (text) {
        return text == null ? '' : core_trim.call(text);
    } : function (text) {
        return text == null ? '' : (text + '').replace(rtrim, '');
    };
    can.extend = function () {
        var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = false;
        if (typeof target === 'boolean') {
            deep = target;
            target = arguments[1] || {};
            i = 2;
        }
        if (typeof target !== 'object' && !can.isFunction(target)) {
            target = {};
        }
        if (length === i) {
            target = this;
            --i;
        }
        for (; i < length; i++) {
            if ((options = arguments[i]) != null) {
                for (name in options) {
                    src = target[name];
                    copy = options[name];
                    if (target === copy) {
                        continue;
                    }
                    if (deep && copy && (can.isPlainObject(copy) || (copyIsArray = can.isArray(copy)))) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && can.isArray(src) ? src : [];
                        } else {
                            clone = src && can.isPlainObject(src) ? src : {};
                        }
                        target[name] = can.extend(deep, clone, copy);
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }
        return target;
    };
    can.map = function (elements, callback) {
        var values = [], putValue = function (val, index) {
                var value = callback(val, index);
                if (value != null) {
                    values.push(value);
                }
            };
        if (likeArray(elements)) {
            for (var i = 0, l = elements.length; i < l; i++) {
                putValue(elements[i], i);
            }
        } else {
            for (var key in elements) {
                putValue(elements[key], key);
            }
        }
        return flatten(values);
    };
    can.proxy = function (cb, that) {
        return function () {
            return cb.apply(that, arguments);
        };
    };
    can.attr = attr;
    return can;
});
/*can@2.3.24#compute/read*/
define('can/compute/read', ['can/util/util'], function (can) {
    var read = function (parent, reads, options) {
        options = options || {};
        var state = { foundObservable: false };
        var cur = readValue(parent, 0, reads, options, state), type, prev, readLength = reads.length, i = 0;
        while (i < readLength) {
            prev = cur;
            for (var r = 0, readersLength = read.propertyReaders.length; r < readersLength; r++) {
                var reader = read.propertyReaders[r];
                if (reader.test(cur)) {
                    cur = reader.read(cur, reads[i], i, options, state);
                    break;
                }
            }
            i = i + 1;
            cur = readValue(cur, i, reads, options, state, prev);
            type = typeof cur;
            if (i < reads.length && (cur === null || type !== 'function' && type !== 'object')) {
                if (options.earlyExit) {
                    options.earlyExit(prev, i - 1, cur);
                }
                return {
                    value: undefined,
                    parent: prev
                };
            }
        }
        if (cur === undefined) {
            if (options.earlyExit) {
                options.earlyExit(prev, i - 1);
            }
        }
        return {
            value: cur,
            parent: prev
        };
    };
    var isAt = function (index, reads) {
        var prevRead = reads[index - 1];
        return prevRead && prevRead.at;
    };
    var readValue = function (value, index, reads, options, state, prev) {
        var usedValueReader;
        do {
            usedValueReader = false;
            for (var i = 0, len = read.valueReaders.length; i < len; i++) {
                if (read.valueReaders[i].test(value, index, reads, options)) {
                    value = read.valueReaders[i].read(value, index, reads, options, state, prev);
                }
            }
        } while (usedValueReader);
        return value;
    };
    read.valueReaders = [
        {
            name: 'compute',
            test: function (value, i, reads, options) {
                return value && value.isComputed && !isAt(i, reads);
            },
            read: function (value, i, reads, options, state) {
                if (options.readCompute === false && i === reads.length) {
                    return value;
                }
                if (!state.foundObservable && options.foundObservable) {
                    options.foundObservable(value, i);
                    state.foundObservable = true;
                }
                return value instanceof can.Compute ? value.get() : value();
            }
        },
        {
            name: 'function',
            test: function (value, i, reads, options) {
                var type = typeof value;
                return type === 'function' && !value.isComputed && !(can.Construct && value.prototype instanceof can.Construct) && !(can.route && value === can.route);
            },
            read: function (value, i, reads, options, state, prev) {
                if (isAt(i, reads)) {
                    return i === reads.length ? can.proxy(value, prev) : value;
                } else if (options.callMethodsOnObservables && can.isMapLike(prev)) {
                    return value.apply(prev, options.args || []);
                } else if (options.isArgument && i === reads.length) {
                    return options.proxyMethods !== false ? can.proxy(value, prev) : value;
                }
                return value.apply(prev, options.args || []);
            }
        }
    ];
    read.propertyReaders = [
        {
            name: 'map',
            test: can.isMapLike,
            read: function (value, prop, index, options, state) {
                if (!state.foundObservable && options.foundObservable) {
                    options.foundObservable(value, index);
                    state.foundObservable = true;
                }
                var res = value.attr(prop.key);
                if (res !== undefined) {
                    return res;
                } else {
                    return value[prop.key];
                }
            }
        },
        {
            name: 'promise',
            test: function (value) {
                return can.isPromise(value);
            },
            read: function (value, prop, index, options, state) {
                if (!state.foundObservable && options.foundObservable) {
                    options.foundObservable(value, index);
                    state.foundObservable = true;
                }
                var observeData = value.__observeData;
                if (!value.__observeData) {
                    observeData = value.__observeData = {
                        isPending: true,
                        state: 'pending',
                        isResolved: false,
                        isRejected: false,
                        value: undefined,
                        reason: undefined
                    };
                    can.cid(observeData);
                    can.simpleExtend(observeData, can.event);
                    value.then(function (value) {
                        observeData.isPending = false;
                        observeData.isResolved = true;
                        observeData.value = value;
                        observeData.state = 'resolved';
                        observeData.dispatch('state', [
                            'resolved',
                            'pending'
                        ]);
                    }, function (reason) {
                        observeData.isPending = false;
                        observeData.isRejected = true;
                        observeData.reason = reason;
                        observeData.state = 'rejected';
                        observeData.dispatch('state', [
                            'rejected',
                            'pending'
                        ]);
                    });
                }
                can.__observe(observeData, 'state');
                return prop.key in observeData ? observeData[prop.key] : value[prop.key];
            }
        },
        {
            name: 'object',
            test: function () {
                return true;
            },
            read: function (value, prop) {
                if (value == null) {
                    return undefined;
                } else {
                    if (prop.key in value) {
                        return value[prop.key];
                    } else if (prop.at && specialRead[prop.key] && '@' + prop.key in value) {
                        prop.at = false;
                        return value['@' + prop.key];
                    }
                }
            }
        }
    ];
    var specialRead = {
        index: true,
        key: true,
        event: true,
        element: true,
        viewModel: true
    };
    read.write = function (parent, key, value, options) {
        options = options || {};
        if (can.isMapLike(parent)) {
            if (!options.isArgument && parent._data && parent._data[key] && parent._data[key].isComputed) {
                return parent._data[key](value);
            } else {
                return parent.attr(key, value);
            }
        }
        if (parent[key] && parent[key].isComputed) {
            return parent[key](value);
        }
        if (typeof parent === 'object') {
            parent[key] = value;
        }
    };
    read.reads = function (key) {
        var keys = [];
        var last = 0;
        var at = false;
        if (key.charAt(0) === '@') {
            last = 1;
            at = true;
        }
        var keyToAdd = '';
        for (var i = last; i < key.length; i++) {
            var character = key.charAt(i);
            if (character === '.' || character === '@') {
                if (key.charAt(i - 1) !== '\\') {
                    keys.push({
                        key: keyToAdd,
                        at: at
                    });
                    at = character === '@';
                    keyToAdd = '';
                } else {
                    keyToAdd = keyToAdd.substr(0, keyToAdd.length - 1) + '.';
                }
            } else {
                keyToAdd += character;
            }
        }
        keys.push({
            key: keyToAdd,
            at: at
        });
        return keys;
    };
    return read;
});
/*can@2.3.24#compute/proto_compute*/
define('can/compute/proto_compute', [
    'can/util/util',
    'can/util/bind/bind',
    'can/compute/read',
    'can/compute/get_value_and_bind',
    'can/util/batch/batch'
], function (can, bind, read, ObservedInfo) {
    can.Compute = function (getterSetter, context, eventName, bindOnce) {
        can.cid(this, 'compute');
        var args = [];
        for (var i = 0, arglen = arguments.length; i < arglen; i++) {
            args[i] = arguments[i];
        }
        var contextType = typeof args[1];
        if (typeof args[0] === 'function') {
            this._setupGetterSetterFn(args[0], args[1], args[2], args[3]);
        } else if (args[1]) {
            if (contextType === 'string') {
                this._setupProperty(args[0], args[1], args[2]);
            } else if (contextType === 'function') {
                this._setupSetter(args[0], args[1], args[2]);
            } else {
                if (args[1] && args[1].fn) {
                    this._setupAsyncCompute(args[0], args[1]);
                } else {
                    this._setupSettings(args[0], args[1]);
                }
            }
        } else {
            this._setupSimpleValue(args[0]);
        }
        this._args = args;
        this._primaryDepth = 0;
        this.isComputed = true;
    };
    can.simpleExtend(can.Compute.prototype, {
        setPrimaryDepth: function (depth) {
            this._primaryDepth = depth;
        },
        _setupGetterSetterFn: function (getterSetter, context, eventName) {
            this._set = context ? can.proxy(getterSetter, context) : getterSetter;
            this._get = context ? can.proxy(getterSetter, context) : getterSetter;
            this._canObserve = eventName === false ? false : true;
            var handlers = setupComputeHandlers(this, getterSetter, context || this);
            can.simpleExtend(this, handlers);
        },
        _setupProperty: function (target, propertyName, eventName) {
            var isObserve = can.isMapLike(target), self = this, handler;
            if (isObserve) {
                handler = function (ev, newVal, oldVal) {
                    self.updater(newVal, oldVal, ev.batchNum);
                };
                this.hasDependencies = true;
                this._get = function () {
                    return target.attr(propertyName);
                };
                this._set = function (val) {
                    target.attr(propertyName, val);
                };
            } else {
                handler = function () {
                    self.updater(self._get(), self.value);
                };
                this._get = function () {
                    return can.getObject(propertyName, [target]);
                };
                this._set = function (value) {
                    var properties = propertyName.split('.'), leafPropertyName = properties.pop(), targetProperty = can.getObject(properties.join('.'), [target]);
                    targetProperty[leafPropertyName] = value;
                };
            }
            this._on = function (update) {
                can.bind.call(target, eventName || propertyName, handler);
                this.value = this._get();
            };
            this._off = function () {
                return can.unbind.call(target, eventName || propertyName, handler);
            };
        },
        _setupSetter: function (initialValue, setter, eventName) {
            this.value = initialValue;
            this._set = setter;
            can.simpleExtend(this, eventName);
        },
        _setupSettings: function (initialValue, settings) {
            this.value = initialValue;
            this._set = settings.set || this._set;
            this._get = settings.get || this._get;
            if (!settings.__selfUpdater) {
                var self = this, oldUpdater = this.updater;
                this.updater = function () {
                    oldUpdater.call(self, self._get(), self.value);
                };
            }
            this._on = settings.on ? settings.on : this._on;
            this._off = settings.off ? settings.off : this._off;
        },
        _setupAsyncCompute: function (initialValue, settings) {
            var self = this;
            this.value = initialValue;
            this._setUpdates = true;
            this.lastSetValue = new can.Compute(initialValue);
            this._set = function (newVal) {
                if (newVal === self.lastSetValue.get()) {
                    return this.value;
                }
                return self.lastSetValue.set(newVal);
            };
            this._get = function () {
                return getter.call(settings.context, self.lastSetValue.get());
            };
            var getter = settings.fn, bindings;
            if (getter.length === 0) {
                bindings = setupComputeHandlers(this, getter, settings.context);
            } else if (getter.length === 1) {
                bindings = setupComputeHandlers(this, function () {
                    return getter.call(settings.context, self.lastSetValue.get());
                }, settings);
            } else {
                var oldUpdater = this.updater, setValue = function (newVal) {
                        oldUpdater.call(self, newVal, self.value);
                    };
                this.updater = function (newVal) {
                    oldUpdater.call(self, newVal, self.value);
                };
                bindings = setupComputeHandlers(this, function () {
                    var res = getter.call(settings.context, self.lastSetValue.get(), setValue);
                    return res !== undefined ? res : this.value;
                }, this);
            }
            can.simpleExtend(this, bindings);
        },
        _setupSimpleValue: function (initialValue) {
            this.value = initialValue;
        },
        _bindsetup: can.__notObserve(function () {
            this.bound = true;
            this._on(this.updater);
        }),
        _bindteardown: function () {
            this._off(this.updater);
            this.bound = false;
        },
        bind: can.bindAndSetup,
        unbind: can.unbindAndTeardown,
        clone: function (context) {
            if (context && typeof this._args[0] === 'function') {
                this._args[1] = context;
            } else if (context) {
                this._args[2] = context;
            }
            return new can.Compute(this._args[0], this._args[1], this._args[2], this._args[3]);
        },
        _on: can.k,
        _off: can.k,
        get: function () {
            if (can.__isRecordingObserves() && this._canObserve !== false) {
                can.__observe(this, 'change');
                if (!this.bound) {
                    can.Compute.temporarilyBind(this);
                }
            }
            if (this.bound) {
                return this.value;
            } else {
                return this._get();
            }
        },
        _get: function () {
            return this.value;
        },
        set: function (newVal) {
            var old = this.value;
            var setVal = this._set(newVal, old);
            if (this._setUpdates) {
                return this.value;
            }
            if (this.hasDependencies) {
                return this._get();
            }
            if (setVal === undefined) {
                this.value = this._get();
            } else {
                this.value = setVal;
            }
            updateOnChange(this, this.value, old);
            return this.value;
        },
        _set: function (newVal) {
            return this.value = newVal;
        },
        updater: function (newVal, oldVal, batchNum) {
            this.value = newVal;
            updateOnChange(this, newVal, oldVal, batchNum);
        },
        toFunction: function () {
            return can.proxy(this._computeFn, this);
        },
        _computeFn: function (newVal) {
            if (arguments.length) {
                return this.set(newVal);
            }
            return this.get();
        }
    });
    var updateOnChange = function (compute, newValue, oldValue, batchNum) {
        var valueChanged = newValue !== oldValue && !(newValue !== newValue && oldValue !== oldValue);
        if (valueChanged) {
            can.batch.trigger(compute, {
                type: 'change',
                batchNum: batchNum
            }, [
                newValue,
                oldValue
            ]);
        }
    };
    var setupComputeHandlers = function (compute, func, context) {
        var readInfo = new ObservedInfo(func, context, compute);
        return {
            _on: function () {
                readInfo.getValueAndBind();
                compute.value = readInfo.value;
                compute.hasDependencies = !can.isEmptyObject(readInfo.newObserved);
            },
            _off: function () {
                readInfo.teardown();
            },
            getDepth: function () {
                return readInfo.getDepth();
            }
        };
    };
    can.Compute.temporarilyBind = function (compute) {
        var computeInstance = compute.computeInstance || compute;
        computeInstance.bind('change', can.k);
        if (!computes) {
            computes = [];
            setTimeout(unbindComputes, 10);
        }
        computes.push(computeInstance);
    };
    var computes, unbindComputes = function () {
            for (var i = 0, len = computes.length; i < len; i++) {
                computes[i].unbind('change', can.k);
            }
            computes = null;
        };
    can.Compute.async = function (initialValue, asyncComputer, context) {
        return new can.Compute(initialValue, {
            fn: asyncComputer,
            context: context
        });
    };
    can.Compute.truthy = function (compute) {
        return new can.Compute(function () {
            var res = compute.get();
            if (typeof res === 'function') {
                res = res.get();
            }
            return !!res;
        });
    };
    can.Compute.read = read;
    can.Compute.set = read.write;
    return can.Compute;
});
/*can@2.3.24#compute/compute*/
define('can/compute/compute', [
    'can/util/util',
    'can/util/bind/bind',
    'can/util/batch/batch',
    'can/compute/proto_compute'
], function (can, bind) {
    can.compute = function (getterSetter, context, eventName, bindOnce) {
        var internalCompute = new can.Compute(getterSetter, context, eventName, bindOnce);
        var bind = internalCompute.bind;
        var unbind = internalCompute.unbind;
        var compute = function (val) {
            if (arguments.length) {
                return internalCompute.set(val);
            }
            return internalCompute.get();
        };
        var cid = can.cid(compute, 'compute');
        var handlerKey = '__handler' + cid;
        compute.bind = function (ev, handler) {
            var computeHandler = handler && handler[handlerKey];
            if (handler && !computeHandler) {
                computeHandler = handler[handlerKey] = function () {
                    handler.apply(compute, arguments);
                };
            }
            return bind.call(internalCompute, ev, computeHandler);
        };
        compute.unbind = function (ev, handler) {
            var computeHandler = handler && handler[handlerKey];
            if (computeHandler) {
                delete handler[handlerKey];
                return internalCompute.unbind(ev, computeHandler);
            }
            return unbind.apply(internalCompute, arguments);
        };
        compute.isComputed = internalCompute.isComputed;
        compute.clone = function (ctx) {
            if (typeof getterSetter === 'function') {
                context = ctx;
            }
            return can.compute(getterSetter, context, ctx, bindOnce);
        };
        compute.computeInstance = internalCompute;
        return compute;
    };
    can.compute.truthy = function (compute) {
        return can.compute(function () {
            var res = compute();
            if (typeof res === 'function') {
                res = res();
            }
            return !!res;
        });
    };
    can.compute.async = function (initialValue, asyncComputer, context) {
        return can.compute(initialValue, {
            fn: asyncComputer,
            context: context
        });
    };
    can.compute.read = can.Compute.read;
    can.compute.set = can.Compute.set;
    can.compute.temporarilyBind = can.Compute.temporarilyBind;
    return can.compute;
});
/*can@2.3.24#map/define/define*/
define('can/map/define/define', [
    'can/util/util',
    'can/map/map_helpers',
    'can/map/map',
    'can/compute/compute'
], function (can, mapHelpers) {
    if (!can.define) {
        var define = can.define = {};
        var getPropDefineBehavior = function (behavior, attr, define) {
            var prop, defaultProp;
            if (define) {
                prop = define[attr];
                defaultProp = define['*'];
                if (prop && prop[behavior] !== undefined) {
                    return prop[behavior];
                } else if (defaultProp && defaultProp[behavior] !== undefined) {
                    return defaultProp[behavior];
                }
            }
        };
        mapHelpers.define = function (Map) {
            var definitions = Map.prototype.define;
            Map.defaultGenerators = {};
            for (var prop in definitions) {
                var type = definitions[prop].type;
                if (typeof type === 'string') {
                    if (typeof define.types[type] === 'object') {
                        delete definitions[prop].type;
                        can.extend(definitions[prop], define.types[type]);
                    }
                }
                if ('value' in definitions[prop]) {
                    if (typeof definitions[prop].value === 'function') {
                        Map.defaultGenerators[prop] = definitions[prop].value;
                    } else {
                        Map.defaults[prop] = definitions[prop].value;
                    }
                }
                if (typeof definitions[prop].Value === 'function') {
                    (function (Constructor) {
                        Map.defaultGenerators[prop] = function () {
                            return new Constructor();
                        };
                    }(definitions[prop].Value));
                }
            }
        };
        var oldSetupDefaults = can.Map.prototype._setupDefaults;
        can.Map.prototype._setupDefaults = function (obj) {
            var defaults = oldSetupDefaults.call(this), propsCommittedToAttr = {}, Map = this.constructor, originalGet = this._get;
            this._get = function (originalProp) {
                var prop = originalProp.indexOf('.') !== -1 ? originalProp.substr(0, originalProp.indexOf('.')) : originalProp;
                if (prop in defaults && !(prop in propsCommittedToAttr)) {
                    this.attr(prop, defaults[prop]);
                    propsCommittedToAttr[prop] = true;
                }
                return originalGet.apply(this, arguments);
            };
            for (var prop in Map.defaultGenerators) {
                if (!obj || !(prop in obj)) {
                    defaults[prop] = Map.defaultGenerators[prop].call(this);
                }
            }
            delete this._get;
            return defaults;
        };
        var proto = can.Map.prototype, oldSet = proto.__set;
        proto.__set = function (prop, value, current, success, error) {
            var errorCallback = function (errors) {
                    var stub = error && error.call(self, errors);
                    if (stub !== false) {
                        can.trigger(self, 'error', [
                            prop,
                            errors
                        ], true);
                    }
                    return false;
                }, self = this, setter = getPropDefineBehavior('set', prop, this.define), getter = getPropDefineBehavior('get', prop, this.define);
            if (setter) {
                can.batch.start();
                var setterCalled = false, setValue = setter.call(this, value, function (value) {
                        if (getter) {
                            self[prop](value);
                        } else {
                            oldSet.call(self, prop, value, current, success, errorCallback);
                        }
                        setterCalled = true;
                    }, errorCallback, getter ? this._computedAttrs[prop].compute.computeInstance.lastSetValue.get() : current);
                if (getter) {
                    if (setValue !== undefined && !setterCalled && setter.length >= 1) {
                        this._computedAttrs[prop].compute(setValue);
                    }
                    can.batch.stop();
                    return;
                } else if (setValue === undefined && !setterCalled && setter.length >= 1) {
                    can.batch.stop();
                    return;
                } else {
                    if (!setterCalled) {
                        oldSet.call(self, prop, setter.length === 0 && setValue === undefined ? value : setValue, current, success, errorCallback);
                    }
                    can.batch.stop();
                    return this;
                }
            } else {
                oldSet.call(self, prop, value, current, success, errorCallback);
            }
            return this;
        };
        define.types = {
            'date': function (str) {
                var type = typeof str;
                if (type === 'string') {
                    str = Date.parse(str);
                    return isNaN(str) ? null : new Date(str);
                } else if (type === 'number') {
                    return new Date(str);
                } else {
                    return str;
                }
            },
            'number': function (val) {
                if (val == null) {
                    return val;
                }
                return +val;
            },
            'boolean': function (val) {
                if (val === 'false' || val === '0' || !val) {
                    return false;
                }
                return true;
            },
            'htmlbool': function (val) {
                return typeof val === 'string' || !!val;
            },
            '*': function (val) {
                return val;
            },
            'string': function (val) {
                if (val == null) {
                    return val;
                }
                return '' + val;
            },
            'compute': {
                set: function (newValue, setVal, setErr, oldValue) {
                    if (newValue.isComputed) {
                        return newValue;
                    }
                    if (oldValue && oldValue.isComputed) {
                        oldValue(newValue);
                        return oldValue;
                    }
                    return newValue;
                },
                get: function (value) {
                    return value && value.isComputed ? value() : value;
                }
            }
        };
        var oldType = proto.__type;
        proto.__type = function (value, prop) {
            var type = getPropDefineBehavior('type', prop, this.define), Type = getPropDefineBehavior('Type', prop, this.define), newValue = value;
            if (typeof type === 'string') {
                type = define.types[type];
            }
            if (type || Type) {
                if (type) {
                    newValue = type.call(this, newValue, prop);
                }
                if (Type && !(newValue instanceof Type)) {
                    newValue = new Type(newValue);
                }
                return newValue;
            } else if (can.isPlainObject(newValue) && newValue.define) {
                newValue = can.Map.extend(newValue);
                newValue = new newValue();
            }
            return oldType.call(this, newValue, prop);
        };
        var oldRemove = proto.__remove;
        proto.__remove = function (prop, current) {
            var remove = getPropDefineBehavior('remove', prop, this.define), res;
            if (remove) {
                can.batch.start();
                res = remove.call(this, current);
                if (res === false) {
                    can.batch.stop();
                    return;
                } else {
                    res = oldRemove.call(this, prop, current);
                    can.batch.stop();
                    return res;
                }
            }
            return oldRemove.call(this, prop, current);
        };
        var oldSetupComputes = proto._setupComputedProperties;
        proto._setupComputedProperties = function () {
            oldSetupComputes.apply(this, arguments);
            for (var attr in this.define) {
                var def = this.define[attr], get = def.get;
                if (get) {
                    mapHelpers.addComputedAttr(this, attr, can.compute.async(undefined, get, this));
                }
            }
        };
        var oldSingleSerialize = proto.___serialize;
        proto.___serialize = function (name, val) {
            return serializeProp(this, name, val);
        };
        var serializeProp = function (map, attr, val) {
            var serializer = attr === '*' ? false : getPropDefineBehavior('serialize', attr, map.define);
            if (serializer === undefined) {
                return oldSingleSerialize.call(map, attr, val);
            } else if (serializer !== false) {
                return typeof serializer === 'function' ? serializer.call(map, val, attr) : oldSingleSerialize.call(map, attr, val);
            }
        };
        var oldSerialize = proto.serialize;
        proto.serialize = function (property) {
            var serialized = oldSerialize.apply(this, arguments);
            if (property) {
                return serialized;
            }
            var serializer, val;
            for (var attr in this.define) {
                if (!(attr in serialized)) {
                    serializer = this.define && this.define[attr] && this.define[attr].serialize;
                    if (serializer) {
                        val = serializeProp(this, attr, this.attr(attr));
                        if (val !== undefined) {
                            serialized[attr] = val;
                        }
                    }
                }
            }
            return serialized;
        };
        return can.define;
    }
});
/*lib/Params*/
define('can-restless/lib/Params', [
    'can/map/map',
    'can/list/list',
    'can/map/define/define'
], function ($__0, $__2, $__4) {
    'use strict';
    if (!$__0 || !$__0.__esModule)
        $__0 = { default: $__0 };
    if (!$__2 || !$__2.__esModule)
        $__2 = { default: $__2 };
    if (!$__4 || !$__4.__esModule)
        $__4 = { default: $__4 };
    var CanMap = $__0.default;
    var List = $__2.default;
    $__4;
    var FilterSerializers = {
        not_like: { operator: 'not_like' },
        like: {
            operator: 'like',
            serialize: function (val) {
                return [
                    '%',
                    val,
                    '%'
                ].join('');
            }
        },
        starts_with: {
            operator: 'like',
            serialize: function (val) {
                return [
                    val,
                    '%'
                ].join('');
            }
        },
        ends_with: {
            operator: 'like',
            serialize: function (val) {
                return [
                    '%',
                    val
                ].join('');
            }
        },
        equals: { operator: 'equals' },
        not_equal_to: { operator: 'not_equal_to' },
        greater_than: {
            operator: '>',
            serialize: function (val) {
                return parseFloat(val);
            }
        },
        less_than: {
            operator: '<',
            serialize: function (val) {
                return parseFloat(val);
            }
        },
        before: { operator: '<' },
        after: { operator: '>' }
    };
    var FilterMap = CanMap.extend({
        define: {
            name: {
                type: 'string',
                value: ''
            },
            operator: {
                serialize: false,
                value: 'like'
            },
            value: { serialize: false },
            op: {
                type: 'string',
                serialize: function () {
                    var val = this.attr('operator');
                    var op = FilterSerializers[val];
                    if (op) {
                        val = op.operator;
                    }
                    return val;
                }
            },
            val: {
                serialize: function () {
                    var val = this.attr('value');
                    if (val && this.attr('operator')) {
                        var op = FilterSerializers[this.attr('operator')];
                        if (op && op.serialize) {
                            return op.serialize(val);
                        }
                    }
                    return val;
                }
            }
        }
    });
    var FilterList = List.extend({ 'Map': FilterMap }, {});
    var SortMap = CanMap.extend({
        fieldName: null,
        type: 'asc'
    });
    var ParameterMap = CanMap.extend({
        define: {
            sort: {
                Type: SortMap,
                serialize: function (sort) {
                    if (!sort) {
                        return;
                    }
                    var field = sort.attr('fieldName');
                    if (!field) {
                        return;
                    }
                    return sort.attr('type') === 'asc' ? field : '-' + field;
                }
            },
            filters: {
                Type: FilterList,
                Value: FilterList,
                serialize: false
            },
            page: {
                type: 'number',
                value: 0,
                serialize: false
            },
            perPage: {
                type: 'number',
                value: 10,
                serialize: false
            },
            'filter[objects]': {
                serialize: function (val) {
                    var filters = this.attr('filters');
                    if (filters && filters.length) {
                        return JSON.stringify(filters.serialize());
                    } else {
                        return undefined;
                    }
                }
            },
            'page[number]': {
                serialize: function () {
                    if (this.attr('page')) {
                        return this.attr('page') + 1;
                    }
                    return undefined;
                }
            },
            'page[size]': {
                serialize: function () {
                    return this.attr('perPage');
                }
            }
        }
    });
    var $__default = ParameterMap;
    return {
        get FilterSerializers() {
            return FilterSerializers;
        },
        get FilterMap() {
            return FilterMap;
        },
        get FilterList() {
            return FilterList;
        },
        get SortMap() {
            return SortMap;
        },
        get ParameterMap() {
            return ParameterMap;
        },
        get default() {
            return $__default;
        },
        __esModule: true
    };
});
/*can-connect@0.5.5#helpers/weak-reference-map*/
define('can-connect/helpers/weak-reference-map', function (require, exports, module) {
    var helpers = require('can-connect/helpers/helpers');
    var WeakReferenceMap = function () {
        this.set = {};
    };
    helpers.extend(WeakReferenceMap.prototype, {
        has: function (key) {
            return !!this.set[key];
        },
        addReference: function (key, item) {
            var data = this.set[key];
            if (!data) {
                data = this.set[key] = {
                    item: item,
                    referenceCount: 0,
                    key: key
                };
            }
            data.referenceCount++;
        },
        deleteReference: function (key) {
            var data = this.set[key];
            if (data) {
                data.referenceCount--;
                if (data.referenceCount === 0) {
                    delete this.set[key];
                }
            }
        },
        get: function (key) {
            var data = this.set[key];
            if (data) {
                return data.item;
            }
        },
        forEach: function (cb) {
            for (var id in this.set) {
                cb(this.set[id].item, id);
            }
        }
    });
    module.exports = WeakReferenceMap;
});
/*can-connect@0.5.5#helpers/overwrite*/
define('can-connect/helpers/overwrite', function (require, exports, module) {
    module.exports = function (d, s, id) {
        for (var prop in d) {
            if (prop !== id && !(prop in s)) {
                delete d[prop];
            }
        }
        for (prop in s) {
            d[prop] = s[prop];
        }
        return d;
    };
});
/*can-connect@0.5.5#helpers/id-merge*/
define('can-connect/helpers/id-merge', function (require, exports, module) {
    var map = require('can-connect/helpers/helpers').map;
    module.exports = function (list, update, id, make) {
        var listIndex = 0, updateIndex = 0;
        while (listIndex < list.length && updateIndex < update.length) {
            var listItem = list[listIndex], updateItem = update[updateIndex], lID = id(listItem), uID = id(updateItem);
            if (id(listItem) === id(updateItem)) {
                listIndex++;
                updateIndex++;
                continue;
            }
            if (updateIndex + 1 < update.length && id(update[updateIndex + 1]) === lID) {
                list.splice(listIndex, 0, make(update[updateIndex]));
                listIndex++;
                updateIndex++;
                continue;
            } else if (listIndex + 1 < list.length && id(list[listIndex + 1]) === uID) {
                list.splice(listIndex, 1);
                listIndex++;
                updateIndex++;
                continue;
            } else {
                list.splice.apply(list, [
                    listIndex,
                    list.length - listIndex
                ].concat(map.call(update.slice(updateIndex), make)));
                return list;
            }
        }
        if (updateIndex === update.length && listIndex === list.length) {
            return;
        }
        list.splice.apply(list, [
            listIndex,
            list.length - listIndex
        ].concat(map.call(update.slice(updateIndex), make)));
        return;
    };
});
/*can-connect@0.5.5#helpers/wait*/
define('can-connect/helpers/wait', function (require, exports, module) {
    var helpers = require('can-connect/helpers/helpers');
    module.exports = addToCanWaitData;
    function sortedSetJson(set) {
        if (set == null) {
            return set;
        } else {
            var sorted = {};
            var keys = [];
            for (var k in set) {
                keys.push(k);
            }
            keys.sort();
            helpers.each(keys, function (prop) {
                sorted[prop] = set[prop];
            });
            return JSON.stringify(sorted);
        }
    }
    function addToCanWaitData(promise, name, set) {
        if (typeof canWait !== 'undefined' && canWait.data) {
            var addToData = canWait(function (resp) {
                var data = {};
                var keyData = data[name] = {};
                keyData[sortedSetJson(set)] = typeof resp.serialize === 'function' ? resp.serialize() : resp;
                canWait.data({ pageData: data });
                return resp;
            });
            promise.then(null, addToData);
            return promise.then(addToData);
        }
        return promise;
    }
});
/*can-connect@0.5.5#constructor/constructor*/
define('can-connect/constructor/constructor', function (require, exports, module) {
    var helpers = require('can-connect/helpers/helpers');
    var bind = helpers.bind;
    var isArray = helpers.isArray;
    var connect = require('can-connect');
    var WeakReferenceMap = require('can-connect/helpers/weak-reference-map');
    var overwrite = require('can-connect/helpers/overwrite');
    var idMerge = require('can-connect/helpers/id-merge');
    var helpers = require('can-connect/helpers/helpers');
    var addToCanWaitData = require('can-connect/helpers/wait');
    module.exports = connect.behavior('constructor', function (baseConnect) {
        var behavior = {
            cidStore: new WeakReferenceMap(),
            _cid: 0,
            get: function (params) {
                var self = this;
                return addToCanWaitData(this.getData(params).then(function (data) {
                    return self.hydrateInstance(data);
                }), this.name, params);
            },
            getList: function (set) {
                var self = this;
                return addToCanWaitData(this.getListData(set).then(function (data) {
                    return self.hydrateList(data, set);
                }), this.name, set);
            },
            hydrateList: function (listData, set) {
                if (isArray(listData)) {
                    listData = { data: listData };
                }
                var arr = [];
                for (var i = 0; i < listData.data.length; i++) {
                    arr.push(this.hydrateInstance(listData.data[i]));
                }
                listData.data = arr;
                if (this.list) {
                    return this.list(listData, set);
                } else {
                    var list = listData.data.slice(0);
                    list[this.listSetProp || '__listSet'] = set;
                    return list;
                }
            },
            hydrateInstance: function (props) {
                if (this.instance) {
                    return this.instance(props);
                } else {
                    return helpers.extend({}, props);
                }
            },
            save: function (instance) {
                var serialized = this.serializeInstance(instance);
                var id = this.id(instance);
                var self = this;
                if (id === undefined) {
                    var cid = this._cid++;
                    this.cidStore.addReference(cid, instance);
                    return this.createData(serialized, cid).then(function (data) {
                        if (data !== undefined) {
                            self.createdInstance(instance, data);
                        }
                        self.cidStore.deleteReference(cid, instance);
                        return instance;
                    });
                } else {
                    return this.updateData(serialized).then(function (data) {
                        if (data !== undefined) {
                            self.updatedInstance(instance, data);
                        }
                        return instance;
                    });
                }
            },
            destroy: function (instance) {
                var serialized = this.serializeInstance(instance), self = this;
                return this.destroyData(serialized).then(function (data) {
                    if (data !== undefined) {
                        self.destroyedInstance(instance, data);
                    }
                    return instance;
                });
            },
            createdInstance: function (instance, props) {
                helpers.extend(instance, props);
            },
            updatedInstance: function (instance, data) {
                overwrite(instance, data, this.idProp);
            },
            updatedList: function (list, listData, set) {
                var instanceList = [];
                for (var i = 0; i < listData.data.length; i++) {
                    instanceList.push(this.hydrateInstance(listData.data[i]));
                }
                idMerge(list, instanceList, bind(this.id, this), bind(this.hydrateInstance, this));
            },
            destroyedInstance: function (instance, data) {
                overwrite(instance, data, this.idProp);
            },
            serializeInstance: function (instance) {
                return helpers.extend({}, instance);
            },
            serializeList: function (list) {
                var self = this;
                return helpers.map.call(list, function (instance) {
                    return self.serializeInstance(instance);
                });
            },
            isNew: function (instance) {
                var id = this.id(instance);
                return !(id || id === 0);
            }
        };
        return behavior;
    });
});
/*can-connect@0.5.5#can/can*/
define('can-connect/can/can', function (require, exports, module) {
    var can = require('can/util/util');
    can.isPromise = can.isDeferred = function (obj) {
        return obj && (window.Promise && obj instanceof Promise || can.isFunction(obj.then) && can.isFunction(obj['catch'] || obj.fail));
    };
});
/*can-connect@0.5.5#can/map/map*/
define('can-connect/can/map/map', function (require, exports, module) {
    require('when/es6-shim/Promise');
    require('../can');
    var can = require('can/util/util');
    var connect = require('can-connect');
    var List = require('can/list/list');
    var Map = require('can/map/map');
    module.exports = connect.behavior('can-map', function (baseConnect) {
        var behavior = {
            init: function () {
                this.Map = this.Map || Map.extend({});
                this.List = this.List || List.extend({});
                overwrite(this, this.Map, mapOverwrites, mapStaticOverwrites);
                overwrite(this, this.List, listPrototypeOverwrites, listStaticOverwrites);
                baseConnect.init.apply(this, arguments);
            },
            id: function (instance) {
                if (instance instanceof can.Map) {
                    var ids = [], algebra = this.algebra;
                    if (algebra && algebra.clauses && algebra.clauses.id) {
                        for (var prop in algebra.clauses.id) {
                            ids.push(readObservabe(instance, prop));
                        }
                    }
                    if (this.idProp && !ids.length) {
                        ids.push(readObservabe(instance, this.idProp));
                    }
                    if (!ids.length) {
                        ids.push(readObservabe(instance, 'id'));
                    }
                    return ids.length > 1 ? ids.join('@|@') : ids[0];
                } else {
                    return baseConnect.id(instance);
                }
            },
            serializeInstance: function (instance) {
                return instance.serialize();
            },
            serializeList: function (list) {
                return list.serialize();
            },
            instance: function (props) {
                var _Map = this.Map || Map;
                return new _Map(props);
            },
            list: function (listData, set) {
                var _List = this.List || this.Map && this.Map.List || List;
                var list = new _List(listData.data);
                can.each(listData, function (val, prop) {
                    if (prop !== 'data') {
                        list.attr(prop, val);
                    }
                });
                list.__listSet = set;
                return list;
            },
            updatedList: function () {
                can.batch.start();
                var res = baseConnect.updatedList.apply(this, arguments);
                can.batch.stop();
                return res;
            },
            save: function (instance) {
                instance._saving = true;
                can.batch.trigger(instance, '_saving', [
                    true,
                    false
                ]);
                var done = function () {
                    instance._saving = false;
                    can.batch.trigger(instance, '_saving', [
                        false,
                        true
                    ]);
                };
                var base = baseConnect.save.apply(this, arguments);
                base.then(done, done);
                return base;
            },
            destroy: function (instance) {
                instance._destroying = true;
                can.batch.trigger(instance, '_destroying', [
                    true,
                    false
                ]);
                var done = function () {
                    instance._destroying = false;
                    can.batch.trigger(instance, '_destroying', [
                        false,
                        true
                    ]);
                };
                var base = baseConnect.destroy.apply(this, arguments);
                base.then(done, done);
                return base;
            }
        };
        can.each([
            'created',
            'updated',
            'destroyed'
        ], function (funcName) {
            behavior[funcName + 'Instance'] = function (instance, props) {
                var constructor = instance.constructor;
                if (props && typeof props === 'object') {
                    instance.attr(can.isFunction(props.attr) ? props.attr() : props, this.constructor.removeAttr || false);
                }
                can.dispatch.call(instance, {
                    type: funcName,
                    target: instance
                });
                can.dispatch.call(constructor, funcName, [instance]);
            };
        });
        return behavior;
    });
    var callCanReadingOnIdRead = true;
    var mapStaticOverwrites = {
        getList: function (base, connection) {
            return function (set) {
                return connection.getList(set);
            };
        },
        findAll: function (base, connection) {
            return function (set) {
                return connection.getList(set);
            };
        },
        get: function (base, connection) {
            return function (params) {
                return connection.get(params);
            };
        },
        findOne: function (base, connection) {
            return function (params) {
                return connection.get(params);
            };
        }
    };
    var mapOverwrites = {
        _bindsetup: function (base, connection) {
            return function () {
                callCanReadingOnIdRead = false;
                connection.addInstanceReference(this);
                callCanReadingOnIdRead = true;
                return base.apply(this, arguments);
            };
        },
        _bindteardown: function (base, connection) {
            return function () {
                callCanReadingOnIdRead = false;
                connection.deleteInstanceReference(this);
                callCanReadingOnIdRead = true;
                return base.apply(this, arguments);
            };
        },
        ___set: function (base, connection) {
            return function (prop, val) {
                base.apply(this, arguments);
                if (prop === connection.idProp && this._bindings) {
                    connection.addInstanceReference(this);
                }
            };
        },
        isNew: function (base, connection) {
            return function () {
                var id = connection.id(this);
                return !(id || id === 0);
            };
        },
        isSaving: function (base, connection) {
            return function () {
                can.__observe(this, '_saving');
                return !!this._saving;
            };
        },
        isDestroying: function (base, connection) {
            return function () {
                can.__observe(this, '_destroying');
                return !!this._destroying;
            };
        },
        save: function (base, connection) {
            return function (success, error) {
                var promise = connection.save(this);
                promise.then(success, error);
                return promise;
            };
        },
        destroy: function (base, connection) {
            return function (success, error) {
                var promise;
                if (this.isNew()) {
                    promise = Promise.resolve(this);
                    connection.destroyedInstance(this, {});
                } else {
                    promise = connection.destroy(this);
                }
                promise.then(success, error);
                return promise;
            };
        }
    };
    var listPrototypeOverwrites = {
        setup: function (base, connection) {
            return function (params) {
                if (can.isPlainObject(params) && !can.isArray(params)) {
                    this.__listSet = params;
                    base.apply(this);
                    this.replace(can.isDeferred(params) ? params : connection.getList(params));
                } else {
                    base.apply(this, arguments);
                }
                this._init = 1;
                this.bind('destroyed', can.proxy(this._destroyed, this));
                delete this._init;
            };
        },
        _destroyed: function () {
            return function (ev, attr) {
                if (/\w+/.test(attr)) {
                    var index;
                    while ((index = this.indexOf(ev.target)) > -1) {
                        this.splice(index, 1);
                    }
                }
            };
        },
        _bindsetup: function (base, connection) {
            return function () {
                connection.addListReference(this);
                return base.apply(this, arguments);
            };
        },
        _bindteardown: function (base, connection) {
            return function () {
                connection.deleteListReference(this);
                return base.apply(this, arguments);
            };
        }
    };
    var listStaticOverwrites = {
        _bubbleRule: function (base, connection) {
            return function (eventName, list) {
                var bubbleRules = base(eventName, list);
                bubbleRules.push('destroyed');
                return bubbleRules;
            };
        }
    };
    var readObservabe = function (instance, prop) {
        if (callCanReadingOnIdRead) {
            can.__observe(instance, prop);
        }
        return instance.__get(prop);
    };
    var overwrite = function (connection, Constructor, prototype, statics) {
        var prop;
        for (prop in prototype) {
            Constructor.prototype[prop] = prototype[prop](Constructor.prototype[prop], connection);
        }
        if (statics) {
            for (prop in statics) {
                Constructor[prop] = statics[prop](Constructor[prop], connection);
            }
        }
    };
});
/*can-connect@0.5.5#helpers/sorted-set-json*/
define('can-connect/helpers/sorted-set-json', function (require, exports, module) {
    var helpers = require('./helpers');
    var forEach = helpers.forEach;
    var keys = helpers.keys;
    module.exports = function (set) {
        if (set == null) {
            return set;
        } else {
            var sorted = {};
            forEach.call(keys(set).sort(), function (prop) {
                sorted[prop] = set[prop];
            });
            return JSON.stringify(sorted);
        }
    };
});
/*can-connect@0.5.5#constructor/store/store*/
define('can-connect/constructor/store/store', function (require, exports, module) {
    var connect = require('can-connect');
    var WeakReferenceMap = require('can-connect/helpers/weak-reference-map');
    var sortedSetJSON = require('can-connect/helpers/sorted-set-json');
    module.exports = connect.behavior('constructor-store', function (baseConnect) {
        var behavior = {
            instanceStore: new WeakReferenceMap(),
            listStore: new WeakReferenceMap(),
            _requestInstances: {},
            _requestLists: {},
            _pendingRequests: 0,
            _finishedRequest: function () {
                var id;
                this._pendingRequests--;
                if (this._pendingRequests === 0) {
                    for (id in this._requestInstances) {
                        this.instanceStore.deleteReference(id);
                    }
                    this._requestInstances = {};
                    for (id in this._requestLists) {
                        this.listStore.deleteReference(id);
                    }
                    this._requestLists = {};
                }
            },
            addInstanceReference: function (instance, id) {
                this.instanceStore.addReference(id || this.id(instance), instance);
            },
            addInstanceMetaData: function (instance, name, value) {
                var data = this.instanceStore.set[this.id(instance)];
                if (data) {
                    data[name] = value;
                }
            },
            getInstanceMetaData: function (instance, name) {
                var data = this.instanceStore.set[this.id(instance)];
                if (data) {
                    return data[name];
                }
            },
            deleteInstanceMetaData: function (instance, name) {
                var data = this.instanceStore.set[this.id(instance)];
                delete data[name];
            },
            deleteInstanceReference: function (instance) {
                this.instanceStore.deleteReference(this.id(instance), instance);
            },
            addListReference: function (list, set) {
                var id = sortedSetJSON(set || this.listSet(list));
                if (id) {
                    this.listStore.addReference(id, list);
                }
            },
            deleteListReference: function (list, set) {
                var id = sortedSetJSON(set || this.listSet(list));
                if (id) {
                    this.listStore.deleteReference(id, list);
                }
            },
            hydratedInstance: function (instance) {
                if (this._pendingRequests > 0) {
                    var id = this.id(instance);
                    if (!this._requestInstances[id]) {
                        this.addInstanceReference(instance);
                        this._requestInstances[id] = instance;
                    }
                }
            },
            hydrateInstance: function (props) {
                var id = this.id(props);
                if ((id || id === 0) && this.instanceStore.has(id)) {
                    var storeInstance = this.instanceStore.get(id);
                    this.updatedInstance(storeInstance, props);
                    return storeInstance;
                }
                var instance = baseConnect.hydrateInstance.call(this, props);
                this.hydratedInstance(instance);
                return instance;
            },
            hydratedList: function (list, set) {
                if (this._pendingRequests > 0) {
                    var id = sortedSetJSON(set || this.listSet(list));
                    if (id) {
                        if (!this._requestLists[id]) {
                            this.addListReference(list, set);
                            this._requestLists[id] = list;
                        }
                    }
                }
            },
            hydrateList: function (listData, set) {
                set = set || this.listSet(listData);
                var id = sortedSetJSON(set);
                if (id && this.listStore.has(id)) {
                    var storeList = this.listStore.get(id);
                    this.updatedList(storeList, listData, set);
                    return storeList;
                }
                var list = baseConnect.hydrateList.call(this, listData, set);
                this.hydratedList(list, set);
                return list;
            },
            getList: function (params) {
                var self = this;
                self._pendingRequests++;
                var promise = baseConnect.getList.call(this, params);
                promise.then(function (instances) {
                    self._finishedRequest();
                }, function () {
                    self._finishedRequest();
                });
                return promise;
            },
            get: function (params) {
                var self = this;
                self._pendingRequests++;
                var promise = baseConnect.get.call(this, params);
                promise.then(function (instance) {
                    self._finishedRequest();
                }, function () {
                    self._finishedRequest();
                });
                return promise;
            },
            save: function (instance) {
                var self = this;
                self._pendingRequests++;
                var updating = !this.isNew(instance);
                if (updating) {
                    this.addInstanceReference(instance);
                }
                var promise = baseConnect.save.call(this, instance);
                promise.then(function (instances) {
                    if (updating) {
                        self.deleteInstanceReference(instance);
                    }
                    self._finishedRequest();
                }, function () {
                    self._finishedRequest();
                });
                return promise;
            },
            destroy: function (instance) {
                var self = this;
                self._pendingRequests++;
                var promise = baseConnect.destroy.call(this, instance);
                promise.then(function (instance) {
                    self._finishedRequest();
                }, function () {
                    self._finishedRequest();
                });
                return promise;
            }
        };
        return behavior;
    });
});
/*can-connect@0.5.5#data/callbacks/callbacks*/
define('can-connect/data/callbacks/callbacks', function (require, exports, module) {
    var connect = require('can-connect');
    var helpers = require('can-connect/helpers/helpers');
    var pairs = {
        getListData: 'gotListData',
        createData: 'createdData',
        updateData: 'updatedData',
        destroyData: 'destroyedData'
    };
    module.exports = connect.behavior('data-callbacks', function (baseConnect) {
        var behavior = {};
        helpers.each(pairs, function (callbackName, name) {
            behavior[name] = function (params, cid) {
                var self = this;
                return baseConnect[name].call(this, params).then(function (data) {
                    if (self[callbackName]) {
                        return self[callbackName].call(self, data, params, cid);
                    } else {
                        return data;
                    }
                });
            };
        });
        return behavior;
    });
});
/*can-connect@0.5.5#data/callbacks-cache/callbacks-cache*/
define('can-connect/data/callbacks-cache/callbacks-cache', function (require, exports, module) {
    var connect = require('can-connect');
    var helpers = require('can-connect/helpers/helpers');
    var pairs = {
        createdData: 'createData',
        updatedData: 'updateData',
        destroyedData: 'destroyData'
    };
    module.exports = connect.behavior('data-callbacks-cache', function (baseConnect) {
        var behavior = {};
        helpers.each(pairs, function (cacheCallback, dataCallbackName) {
            behavior[dataCallbackName] = function (data, set, cid) {
                this.cacheConnection[cacheCallback](helpers.extend({}, data));
                return baseConnect[dataCallbackName].call(this, data, set, cid);
            };
        });
        return behavior;
    });
});
/*can-connect@0.5.5#data/inline-cache/inline-cache*/
define('can-connect/data/inline-cache/inline-cache', function (require, exports, module) {
    (function (global) {
        var connect = require('can-connect');
        var sortedSetJSON = require('can-connect/helpers/sorted-set-json');
        module.exports = connect.behavior('data-inline-cache', function (baseConnect) {
            if (typeof INLINE_CACHE === 'undefined') {
                return {};
            }
            var getData = function (id) {
                var type = INLINE_CACHE[this.name];
                if (type) {
                    var data = type[id];
                    if (data) {
                        delete type[id];
                        return data;
                    }
                }
            };
            return {
                getListData: function (set) {
                    var id = sortedSetJSON(set);
                    var data = getData.call(this, id);
                    if (data !== undefined) {
                        if (this.cacheConnection) {
                            this.cacheConnection.updateListData(data, set);
                        }
                        return Promise.resolve(data);
                    } else {
                        return baseConnect.getListData.apply(this, arguments);
                    }
                },
                getData: function (params) {
                    var id = this.id(params);
                    var data = getData.call(this, id);
                    if (data !== undefined) {
                        if (this.cacheConnection) {
                            this.cacheConnection.updateData(data);
                        }
                        return Promise.resolve(data);
                    } else {
                        return baseConnect.getData.apply(this, arguments);
                    }
                }
            };
        });
    }(function () {
        return this;
    }()));
});
/*can-connect@0.5.5#data/parse/parse*/
define('can-connect/data/parse/parse', function (require, exports, module) {
    var isArray = require('can-connect/helpers/helpers').isArray;
    var connect = require('can-connect');
    var helpers = require('can-connect/helpers/helpers');
    module.exports = connect.behavior('data-parse', function (baseConnect) {
        var behavior = {
            parseListData: function (responseData) {
                if (baseConnect.parseListData) {
                    responseData = baseConnect.parseListData.apply(this, arguments);
                }
                var result;
                if (isArray(responseData)) {
                    result = { data: responseData };
                } else {
                    var prop = this.parseListProp || 'data';
                    responseData.data = helpers.getObject(prop, responseData);
                    result = responseData;
                    if (prop !== 'data') {
                        delete responseData[prop];
                    }
                    if (!isArray(result.data)) {
                        throw new Error('Could not get any raw data while converting using .parseListData');
                    }
                }
                var arr = [];
                for (var i = 0; i < result.data.length; i++) {
                    arr.push(this.parseInstanceData(result.data[i]));
                }
                result.data = arr;
                return result;
            },
            parseInstanceData: function (props) {
                if (baseConnect.parseInstanceData) {
                    props = baseConnect.parseInstanceData.apply(this, arguments) || props;
                }
                return this.parseInstanceProp ? helpers.getObject(this.parseInstanceProp, props) || props : props;
            }
        };
        helpers.each(pairs, function (parseFunction, name) {
            behavior[name] = function (params) {
                var self = this;
                return baseConnect[name].call(this, params).then(function () {
                    return self[parseFunction].apply(self, arguments);
                });
            };
        });
        return behavior;
    });
    var pairs = {
        getListData: 'parseListData',
        getData: 'parseInstanceData',
        createData: 'parseInstanceData',
        updateData: 'parseInstanceData',
        destroyData: 'parseInstanceData'
    };
});
/*can-connect@0.5.5#helpers/ajax*/
define('can-connect/helpers/ajax', function (require, exports, module) {
    require('when/es6-shim/Promise');
    var helpers = require('can-connect/helpers/helpers');
    var xhrs = [
            function () {
                return new XMLHttpRequest();
            },
            function () {
                return new ActiveXObject('Microsoft.XMLHTTP');
            },
            function () {
                return new ActiveXObject('MSXML2.XMLHTTP.3.0');
            },
            function () {
                return new ActiveXObject('MSXML2.XMLHTTP');
            }
        ], _xhrf = null;
    var $ = {};
    $.xhr = function () {
        if (_xhrf != null) {
            return _xhrf();
        }
        for (var i = 0, l = xhrs.length; i < l; i++) {
            try {
                var f = xhrs[i], req = f();
                if (req != null) {
                    _xhrf = f;
                    return req;
                }
            } catch (e) {
                continue;
            }
        }
        return function () {
        };
    };
    $._xhrResp = function (xhr) {
        switch (xhr.getResponseHeader('Content-Type').split(';')[0]) {
        case 'text/xml':
            return xhr.responseXML;
        case 'text/json':
        case 'application/json':
        case 'text/javascript':
        case 'application/javascript':
        case 'application/x-javascript':
            return JSON.parse(xhr.responseText);
        default:
            return xhr.responseText;
        }
    };
    $._formData = function (o) {
        var kvps = [], regEx = /%20/g;
        for (var k in o) {
            kvps.push(encodeURIComponent(k).replace(regEx, '+') + '=' + encodeURIComponent(o[k].toString()).replace(regEx, '+'));
        }
        return kvps.join('&');
    };
    module.exports = function (o) {
        var xhr = $.xhr(), timer, n = 0;
        var deferred = helpers.deferred();
        o = helpers.extend({
            userAgent: 'XMLHttpRequest',
            lang: 'en',
            type: 'GET',
            data: null,
            dataType: 'application/x-www-form-urlencoded'
        }, o);
        if (o.timeout) {
            timer = setTimeout(function () {
                xhr.abort();
                if (o.timeoutFn) {
                    o.timeoutFn(o.url);
                }
            }, o.timeout);
        }
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (timer) {
                    clearTimeout(timer);
                }
                if (xhr.status < 300) {
                    if (o.success) {
                        o.success($._xhrResp(xhr));
                    }
                } else if (o.error) {
                    o.error(xhr, xhr.status, xhr.statusText);
                }
                if (o.complete) {
                    o.complete(xhr, xhr.statusText);
                }
                if (xhr.status === 200) {
                    deferred.resolve(JSON.parse(xhr.responseText));
                } else {
                    deferred.reject(JSON.parse(xhr.responseText));
                }
            } else if (o.progress) {
                o.progress(++n);
            }
        };
        var url = o.url, data = null;
        var isPost = o.type === 'POST' || o.type === 'PUT';
        if (!isPost && o.data) {
            url += '?' + $._formData(o.data);
        }
        xhr.open(o.type, url);
        if (isPost) {
            var isJson = o.dataType.indexOf('json') >= 0;
            data = isJson ? JSON.stringify(o.data) : $._formData(o.data);
            xhr.setRequestHeader('Content-Type', isJson ? 'application/json' : 'application/x-www-form-urlencoded');
        }
        xhr.send(data);
        return deferred.promise;
    };
});
/*can-connect@0.5.5#data/url/url*/
define('can-connect/data/url/url', function (require, exports, module) {
    var isArray = require('can-connect/helpers/helpers').isArray;
    var connect = require('can-connect');
    var helpers = require('can-connect/helpers/helpers');
    var ajax = require('can-connect/helpers/ajax');
    module.exports = connect.behavior('data-url', function (baseConnect) {
        var behavior = {};
        helpers.each(pairs, function (reqOptions, name) {
            behavior[name] = function (params) {
                if (typeof this.url === 'object') {
                    if (typeof this.url[reqOptions.prop] === 'function') {
                        return this.url[reqOptions.prop](params);
                    } else if (this.url[reqOptions.prop]) {
                        return makeAjax(this.url[reqOptions.prop], params, reqOptions.type, this.ajax || ajax);
                    }
                }
                var resource = typeof this.url === 'string' ? this.url : this.url.resource;
                if (resource && this.idProp) {
                    return makeAjax(createURLFromResource(resource, this.idProp, reqOptions.prop), params, reqOptions.type, this.ajax || ajax);
                }
                return baseConnect[name].call(this, params);
            };
        });
        return behavior;
    });
    var pairs = {
        getListData: {
            prop: 'getListData',
            type: 'GET'
        },
        getData: {
            prop: 'getData',
            type: 'GET'
        },
        createData: {
            prop: 'createData',
            type: 'POST'
        },
        updateData: {
            prop: 'updateData',
            type: 'PUT'
        },
        destroyData: {
            prop: 'destroyData',
            type: 'DELETE'
        }
    };
    var makeAjax = function (ajaxOb, data, type, ajax) {
        var params = {};
        if (typeof ajaxOb === 'string') {
            var parts = ajaxOb.split(/\s+/);
            params.url = parts.pop();
            if (parts.length) {
                params.type = parts.pop();
            }
        } else {
            helpers.extend(params, ajaxOb);
        }
        params.data = typeof data === 'object' && !isArray(data) ? helpers.extend(params.data || {}, data) : data;
        params.url = helpers.sub(params.url, params.data, true);
        return ajax(helpers.extend({
            type: type || 'post',
            dataType: 'json'
        }, params));
    };
    var createURLFromResource = function (resource, idProp, name) {
        var url = resource.replace(/\/+$/, '');
        if (name === 'getListData' || name === 'createData') {
            return url;
        } else {
            return url + '/{' + idProp + '}';
        }
    };
});
/*can-connect@0.5.5#helpers/get-items*/
define('can-connect/helpers/get-items', function (require, exports, module) {
    var isArray = require('can-connect/helpers/helpers').isArray;
    module.exports = function (data) {
        if (isArray(data)) {
            return data;
        } else {
            return data.data;
        }
    };
});
/*can-connect@0.5.5#helpers/set-add*/
define('can-connect/helpers/set-add', function (require, exports, module) {
    var canSet = require('can-set');
    module.exports = function (connection, setItems, items, item, algebra) {
        var index = canSet.index(setItems, items, item, algebra);
        if (index === undefined) {
            index = items.length;
        }
        var copy = items.slice(0);
        copy.splice(index, 0, item);
        return copy;
    };
});
/*can-connect@0.5.5#helpers/get-index-by-id*/
define('can-connect/helpers/get-index-by-id', function (require, exports, module) {
    module.exports = function (connection, props, items) {
        var id = connection.id(props);
        for (var i = 0; i < items.length; i++) {
            var connId = connection.id(items[i]);
            if (id == connId) {
                return i;
            }
        }
        return -1;
    };
});
/*can-connect@0.5.5#data/localstorage-cache/localstorage-cache*/
define('can-connect/data/localstorage-cache/localstorage-cache', function (require, exports, module) {
    var getItems = require('can-connect/helpers/get-items');
    var connect = require('can-connect');
    var sortedSetJSON = require('can-connect/helpers/sorted-set-json');
    var canSet = require('can-set');
    require('when/es6-shim/Promise');
    var helpers = require('can-connect/helpers/helpers');
    var forEach = helpers.forEach;
    var map = helpers.map;
    var setAdd = require('can-connect/helpers/set-add');
    var indexOf = require('can-connect/helpers/get-index-by-id');
    module.exports = connect.behavior('data-localstorage-cache', function (baseConnect) {
        var behavior = {
            _instances: {},
            getSetData: function () {
                var sets = {};
                var self = this;
                forEach.call(JSON.parse(localStorage.getItem(this.name + '-sets')) || [], function (set) {
                    var setKey = sortedSetJSON(set);
                    if (localStorage.getItem(self.name + '/set/' + setKey)) {
                        sets[setKey] = {
                            set: set,
                            setKey: setKey
                        };
                    }
                });
                return sets;
            },
            _getSets: function (setData) {
                var sets = [];
                setData = setData || this.getSetData();
                for (var setKey in setData) {
                    sets.push(setData[setKey].set);
                }
                return sets;
            },
            getInstance: function (id) {
                var res = localStorage.getItem(this.name + '/instance/' + id);
                if (res) {
                    return JSON.parse(res);
                }
            },
            getInstances: function (ids) {
                var self = this;
                return map.call(ids, function (id) {
                    return self.getInstance(id);
                });
            },
            removeSet: function (setKey, noUpdate) {
                var sets = this.getSetData();
                localStorage.removeItem(this.name + '/set/' + setKey);
                delete sets[setKey];
                if (noUpdate !== true) {
                    this.updateSets(sets);
                }
            },
            updateSets: function (sets) {
                var setData = this._getSets(sets);
                localStorage.setItem(this.name + '-sets', JSON.stringify(setData));
            },
            updateSet: function (setDatum, items, newSet) {
                var newSetKey = newSet ? sortedSetJSON(newSet) : setDatum.setKey;
                if (newSet) {
                    if (newSetKey !== setDatum.setKey) {
                        var sets = this.getSetData();
                        var oldSetKey = setDatum.setKey;
                        sets[newSetKey] = setDatum;
                        setDatum.setKey = newSetKey;
                        this.removeSet(oldSetKey);
                    }
                }
                setDatum.items = items;
                var self = this;
                var ids = map.call(items, function (item) {
                    var id = self.id(item);
                    localStorage.setItem(self.name + '/instance/' + id, JSON.stringify(item));
                    return id;
                });
                localStorage.setItem(this.name + '/set/' + newSetKey, JSON.stringify(ids));
            },
            addSet: function (set, data) {
                var items = getItems(data);
                var sets = this.getSetData();
                var setKey = sortedSetJSON(set);
                sets[setKey] = {
                    setKey: setKey,
                    items: items,
                    set: set
                };
                var self = this;
                var ids = map.call(items, function (item) {
                    var id = self.id(item);
                    localStorage.setItem(self.name + '/instance/' + id, JSON.stringify(item));
                    return id;
                });
                localStorage.setItem(this.name + '/set/' + setKey, JSON.stringify(ids));
                this.updateSets(sets);
            },
            _eachSet: function (cb) {
                var sets = this.getSetData();
                var self = this;
                var loop = function (setDatum, setKey) {
                    return cb.call(self, setDatum, setKey, function () {
                        if (!('items' in setDatum)) {
                            var ids = JSON.parse(localStorage.getItem(self.name + '/set/' + setKey));
                            setDatum.items = self.getInstances(ids);
                        }
                        return setDatum.items;
                    });
                };
                for (var setKey in sets) {
                    var setDatum = sets[setKey];
                    var result = loop(setDatum, setKey);
                    if (result !== undefined) {
                        return result;
                    }
                }
            },
            clear: function () {
                var sets = this.getSetData();
                for (var setKey in sets) {
                    localStorage.removeItem(this.name + '/set/' + setKey);
                }
                localStorage.removeItem(this.name + '-sets');
                var keys = [];
                for (var i = 0, len = localStorage.length; i < len; ++i) {
                    if (localStorage.key(i).indexOf(this.name + '/instance/') === 0) {
                        keys.push(localStorage.key(i));
                    }
                }
                forEach.call(keys, function (key) {
                    localStorage.removeItem(key);
                });
                this._instances = {};
            },
            getSets: function () {
                return Promise.resolve(this._getSets());
            },
            getListData: function (set) {
                var setKey = sortedSetJSON(set);
                var setDatum = this.getSetData()[setKey];
                if (setDatum) {
                    var localData = localStorage.getItem(this.name + '/set/' + setKey);
                    if (localData) {
                        return Promise.resolve({ data: this.getInstances(JSON.parse(localData)) });
                    }
                }
                return Promise.reject({
                    message: 'no data',
                    error: 404
                });
            },
            getData: function (params) {
                var id = this.id(params);
                var res = localStorage.getItem(this.name + '/instance/' + id);
                if (res) {
                    return Promise.resolve(JSON.parse(res));
                } else {
                    return Promise.reject({
                        message: 'no data',
                        error: 404
                    });
                }
            },
            updateListData: function (data, set) {
                var items = getItems(data);
                var sets = this.getSetData();
                var self = this;
                for (var setKey in sets) {
                    var setDatum = sets[setKey];
                    var union = canSet.union(setDatum.set, set, this.algebra);
                    if (union) {
                        return this.getListData(setDatum.set).then(function (setData) {
                            self.updateSet(setDatum, canSet.getUnion(setDatum.set, set, getItems(setData), items, this.algebra), union);
                        });
                    }
                }
                this.addSet(set, data);
                return Promise.resolve();
            },
            createData: function (props) {
                var self = this;
                this._eachSet(function (setDatum, setKey, getItems) {
                    if (canSet.has(setDatum.set, props, this.algebra)) {
                        self.updateSet(setDatum, setAdd(self, setDatum.set, getItems(), props, self.algebra), setDatum.set);
                    }
                });
                var id = this.id(props);
                localStorage.setItem(this.name + '/instance/' + id, JSON.stringify(props));
                return Promise.resolve({});
            },
            updateData: function (props) {
                var self = this;
                this._eachSet(function (setDatum, setKey, getItems) {
                    var items = getItems();
                    var index = indexOf(self, props, items);
                    if (canSet.has(setDatum.set, props, this.algebra)) {
                        if (index === -1) {
                            self.updateSet(setDatum, setAdd(self, setDatum.set, getItems(), props, self.algebra));
                        } else {
                            items.splice(index, 1, props);
                            self.updateSet(setDatum, items);
                        }
                    } else if (index !== -1) {
                        items.splice(index, 1);
                        self.updateSet(setDatum, items);
                    }
                });
                var id = this.id(props);
                localStorage.setItem(this.name + '/instance/' + id, JSON.stringify(props));
                return Promise.resolve({});
            },
            destroyData: function (props) {
                var self = this;
                this._eachSet(function (setDatum, setKey, getItems) {
                    var items = getItems();
                    var index = indexOf(self, props, items);
                    if (index !== -1) {
                        items.splice(index, 1);
                        self.updateSet(setDatum, items);
                    }
                });
                var id = this.id(props);
                localStorage.removeItem(this.name + '/instance/' + id);
                return Promise.resolve({});
            }
        };
        return behavior;
    });
});
/*can-connect@0.5.5#real-time/real-time*/
define('can-connect/real-time/real-time', function (require, exports, module) {
    var connect = require('../can-connect');
    var canSet = require('can-set');
    var setAdd = require('can-connect/helpers/set-add');
    var indexOf = require('can-connect/helpers/get-index-by-id');
    module.exports = connect.behavior('real-time', function (baseConnect) {
        return {
            createInstance: function (props) {
                var id = this.id(props);
                var instance = this.instanceStore.get(id);
                var serialized;
                if (instance) {
                    return this.updateInstance(props);
                } else {
                    instance = this.hydrateInstance(props);
                    serialized = this.serializeInstance(instance);
                    var self = this;
                    this.addInstanceReference(instance);
                    return Promise.resolve(this.createdData(props, serialized)).then(function () {
                        self.deleteInstanceReference(instance);
                        return instance;
                    });
                }
            },
            createdData: function (props, params, cid) {
                var instance;
                if (cid !== undefined) {
                    instance = this.cidStore.get(cid);
                } else {
                    instance = this.instanceStore.get(this.id(props));
                }
                this.addInstanceReference(instance, this.id(props));
                this.createdInstance(instance, props);
                create.call(this, this.serializeInstance(instance));
                this.deleteInstanceReference(instance);
                return undefined;
            },
            updatedData: function (props, params) {
                var instance = this.instanceStore.get(this.id(params));
                this.updatedInstance(instance, props);
                update.call(this, this.serializeInstance(instance));
                return undefined;
            },
            updateInstance: function (props) {
                var id = this.id(props);
                var instance = this.instanceStore.get(id);
                if (!instance) {
                    instance = this.hydrateInstance(props);
                }
                this.addInstanceReference(instance);
                var serialized = this.serializeInstance(instance), self = this;
                return Promise.resolve(this.updatedData(props, serialized)).then(function () {
                    self.deleteInstanceReference(instance);
                    return instance;
                });
            },
            destroyedData: function (props, params) {
                var id = this.id(params || props);
                var instance = this.instanceStore.get(id);
                if (!instance) {
                    instance = this.hydrateInstance(props);
                }
                var serialized = this.serializeInstance(instance);
                destroy.call(this, serialized);
                return undefined;
            },
            destroyInstance: function (props) {
                var id = this.id(props);
                var instance = this.instanceStore.get(id);
                if (!instance) {
                    instance = this.hydrateInstance(props);
                }
                this.addInstanceReference(instance);
                var serialized = this.serializeInstance(instance), self = this;
                return Promise.resolve(this.destroyedData(props, serialized)).then(function () {
                    self.deleteInstanceReference(instance);
                    return instance;
                });
            }
        };
    });
    var create = function (props) {
        var self = this;
        this.listStore.forEach(function (list, id) {
            var set = JSON.parse(id);
            var index = indexOf(self, props, list);
            if (canSet.has(set, props, self.algebra)) {
                if (index === -1) {
                    var items = self.serializeList(list);
                    self.updatedList(list, { data: setAdd(self, set, items, props, self.algebra) }, set);
                } else {
                }
            }
        });
    };
    var update = function (props) {
        var self = this;
        this.listStore.forEach(function (list, id) {
            var items;
            var set = JSON.parse(id);
            var index = indexOf(self, props, list);
            if (canSet.has(set, props, self.algebra)) {
                items = self.serializeList(list);
                if (index === -1) {
                    self.updatedList(list, { data: setAdd(self, set, items, props, self.algebra) }, set);
                } else {
                    var sortedIndex = canSet.index(set, items, props, self.algebra);
                    if (sortedIndex !== undefined && sortedIndex !== index) {
                        var copy = items.slice(0);
                        if (index < sortedIndex) {
                            copy.splice(sortedIndex, 0, props);
                            copy.splice(index, 1);
                        } else {
                            copy.splice(index, 1);
                            copy.splice(sortedIndex, 0, props);
                        }
                        self.updatedList(list, { data: copy }, set);
                    }
                }
            } else if (index !== -1) {
                items = self.serializeList(list);
                items.splice(index, 1);
                self.updatedList(list, { data: items }, set);
            }
        });
    };
    var destroy = function (props) {
        var self = this;
        this.listStore.forEach(function (list, id) {
            var set = JSON.parse(id);
            var index = indexOf(self, props, list);
            if (index !== -1) {
                var items = self.serializeList(list);
                items.splice(index, 1);
                self.updatedList(list, { data: items }, set);
            }
        });
    };
});
/*can-connect@0.5.5#fall-through-cache/fall-through-cache*/
define('can-connect/fall-through-cache/fall-through-cache', function (require, exports, module) {
    var connect = require('can-connect');
    var sortedSetJSON = require('../helpers/sorted-set-json');
    module.exports = connect.behavior('fall-through-cache', function (baseConnect) {
        var behavior = {
            hydrateList: function (listData, set) {
                set = set || this.listSet(listData);
                var id = sortedSetJSON(set);
                var list = baseConnect.hydrateList.call(this, listData, set);
                if (this._getHydrateListCallbacks[id]) {
                    this._getHydrateListCallbacks[id].shift()(list);
                    if (!this._getHydrateListCallbacks[id].length) {
                        delete this._getHydrateListCallbacks[id];
                    }
                }
                return list;
            },
            _getHydrateListCallbacks: {},
            _getHydrateList: function (set, callback) {
                var id = sortedSetJSON(set);
                if (!this._getHydrateListCallbacks[id]) {
                    this._getHydrateListCallbacks[id] = [];
                }
                this._getHydrateListCallbacks[id].push(callback);
            },
            getListData: function (set) {
                var self = this;
                return this.cacheConnection.getListData(set).then(function (data) {
                    self._getHydrateList(set, function (list) {
                        self.addListReference(list, set);
                        setTimeout(function () {
                            baseConnect.getListData.call(self, set).then(function (listData) {
                                self.cacheConnection.updateListData(listData, set);
                                self.updatedList(list, listData, set);
                                self.deleteListReference(list, set);
                            }, function (e) {
                                console.log('REJECTED', e);
                            });
                        }, 1);
                    });
                    return data;
                }, function () {
                    var listData = baseConnect.getListData.call(self, set);
                    listData.then(function (listData) {
                        self.cacheConnection.updateListData(listData, set);
                    });
                    return listData;
                });
            },
            hydrateInstance: function (props) {
                var id = this.id(props);
                var instance = baseConnect.hydrateInstance.apply(this, arguments);
                if (this._getMakeInstanceCallbacks[id]) {
                    this._getMakeInstanceCallbacks[id].shift()(instance);
                    if (!this._getMakeInstanceCallbacks[id].length) {
                        delete this._getMakeInstanceCallbacks[id];
                    }
                }
                return instance;
            },
            _getMakeInstanceCallbacks: {},
            _getMakeInstance: function (id, callback) {
                if (!this._getMakeInstanceCallbacks[id]) {
                    this._getMakeInstanceCallbacks[id] = [];
                }
                this._getMakeInstanceCallbacks[id].push(callback);
            },
            getData: function (params) {
                var self = this;
                return this.cacheConnection.getData(params).then(function (instanceData) {
                    self._getMakeInstance(self.id(instanceData) || self.id(params), function (instance) {
                        self.addInstanceReference(instance);
                        setTimeout(function () {
                            baseConnect.getData.call(self, params).then(function (instanceData2) {
                                self.cacheConnection.updateData(instanceData2);
                                self.updatedInstance(instance, instanceData2);
                                self.deleteInstanceReference(instance);
                            }, function (e) {
                                console.log('REJECTED', e);
                            });
                        }, 1);
                    });
                    return instanceData;
                }, function () {
                    var listData = baseConnect.getData.call(self, params);
                    listData.then(function (instanceData) {
                        self.cacheConnection.updateData(instanceData);
                    });
                    return listData;
                });
            }
        };
        return behavior;
    });
});
/*can-connect@0.5.5#constructor/callbacks-once/callbacks-once*/
define('can-connect/constructor/callbacks-once/callbacks-once', function (require, exports, module) {
    var connect = require('can-connect');
    var sortedSetJSON = require('can-connect/helpers/sorted-set-json');
    var helpers = require('can-connect/helpers/helpers');
    var callbacks = [
        'createdInstance',
        'updatedInstance',
        'destroyedInstance'
    ];
    module.exports = connect.behavior('constructor-callbacks-once', function (baseConnect) {
        var behavior = {};
        helpers.forEach.call(callbacks, function (name) {
            behavior[name] = function (instance, data) {
                var lastSerialized = this.getInstanceMetaData(instance, 'last-data');
                var serialize = sortedSetJSON(data), serialized = sortedSetJSON(this.serializeInstance(instance));
                if (lastSerialized !== serialize && serialized !== serialize) {
                    var result = baseConnect[name].apply(this, arguments);
                    this.addInstanceMetaData(instance, 'last-data', serialize);
                    return result;
                }
            };
        });
        return behavior;
    });
});
/*lib/CanRestless*/
define('can-restless/lib/CanRestless', [
    'can/list/list',
    'can/map/map',
    'can-connect',
    'can/util/library',
    'can-set',
    'can-restless/lib/Params',
    'can-connect/constructor/constructor',
    'can-connect/can/map/map',
    'can-connect/constructor/store/store',
    'can-connect/data/callbacks/callbacks',
    'can-connect/data/callbacks-cache/callbacks-cache',
    'can-connect/data/inline-cache/inline-cache',
    'can-connect/data/parse/parse',
    'can-connect/data/url/url',
    'can-connect/data/localstorage-cache/localstorage-cache',
    'can-connect/real-time/real-time',
    'can-connect/fall-through-cache/fall-through-cache',
    'can-connect/constructor/callbacks-once/callbacks-once'
], function ($__0, $__2, $__4, $__6, $__8, $__10, $__12, $__13, $__14, $__15, $__16, $__17, $__18, $__19, $__20, $__21, $__22, $__23) {
    'use strict';
    if (!$__0 || !$__0.__esModule)
        $__0 = { default: $__0 };
    if (!$__2 || !$__2.__esModule)
        $__2 = { default: $__2 };
    if (!$__4 || !$__4.__esModule)
        $__4 = { default: $__4 };
    if (!$__6 || !$__6.__esModule)
        $__6 = { default: $__6 };
    if (!$__8 || !$__8.__esModule)
        $__8 = { default: $__8 };
    if (!$__10 || !$__10.__esModule)
        $__10 = { default: $__10 };
    if (!$__12 || !$__12.__esModule)
        $__12 = { default: $__12 };
    if (!$__13 || !$__13.__esModule)
        $__13 = { default: $__13 };
    if (!$__14 || !$__14.__esModule)
        $__14 = { default: $__14 };
    if (!$__15 || !$__15.__esModule)
        $__15 = { default: $__15 };
    if (!$__16 || !$__16.__esModule)
        $__16 = { default: $__16 };
    if (!$__17 || !$__17.__esModule)
        $__17 = { default: $__17 };
    if (!$__18 || !$__18.__esModule)
        $__18 = { default: $__18 };
    if (!$__19 || !$__19.__esModule)
        $__19 = { default: $__19 };
    if (!$__20 || !$__20.__esModule)
        $__20 = { default: $__20 };
    if (!$__21 || !$__21.__esModule)
        $__21 = { default: $__21 };
    if (!$__22 || !$__22.__esModule)
        $__22 = { default: $__22 };
    if (!$__23 || !$__23.__esModule)
        $__23 = { default: $__23 };
    var List = $__0.default;
    var CanMap = $__2.default;
    var connect = $__4.default;
    var can = $__6.default;
    var set = $__8.default;
    var ParameterMap = $__10.ParameterMap;
    $__12;
    $__13;
    $__14;
    $__15;
    $__16;
    $__17;
    $__18;
    $__19;
    $__20;
    $__21;
    $__22;
    $__23;
    var PropertiesObject = CanMap.extend({
        define: {
            total: {
                type: 'number',
                value: 0
            },
            relationships: { Value: CanMap }
        }
    });
    function ConnectionFactory(options) {
        var Objectist = List.extend({ Map: options.map });
        var properties = new PropertiesObject();
        var idProp = options.idProp || 'id';
        var algebra = new set.Algebra({
            'filter[objects]': function () {
                console.log(arguments);
                return true;
            }
        }, set.comparators.id(idProp), set.comparators.rangeInclusive('page[number]'), set.comparators.sort('sort'));
        var cacheConnection = connect(['data-localstorage-cache'], { name: options.name });
        return connect([
            'constructor',
            'can-map',
            'constructor-store',
            'data-callbacks',
            'data-callbacks-cache',
            'data-inline-cache',
            'data-parse',
            'data-url',
            'real-time',
            'fall-through-cache',
            'constructor-callbacks-once'
        ], {
            cacheConnection: cacheConnection,
            idProp: idProp,
            algebra: algebra,
            baseURL: options.url,
            metadata: properties,
            Map: options.map,
            List: options.map.List,
            name: options.name,
            url: {
                resource: options.url,
                getListData: function (params) {
                    params = new ParameterMap(params);
                    var def = can.ajax({
                        url: this.resource,
                        headers: { 'Accept': 'application/vnd.api+json' },
                        method: 'GET',
                        data: params.serialize()
                    });
                    def.then(function (props) {
                        properties.attr('total', props.meta.total);
                    });
                    return def;
                },
                getData: function (params) {
                    var def = can.ajax({
                        url: this.resource + '/' + params[idProp],
                        headers: { 'Accept': 'application/vnd.api+json' },
                        method: 'GET'
                    });
                    return def;
                },
                createData: function (attrs) {
                    var data = {};
                    for (var a in attrs) {
                        if (attrs.hasOwnProperty(a) && !properties.attr('relationships.' + a)) {
                            data[a] = attrs[a];
                        }
                    }
                    return can.ajax({
                        url: this.resource,
                        headers: {
                            'Accept': 'application/vnd.api+json',
                            'Content-Type': 'application/vnd.api+json'
                        },
                        data: JSON.stringify({
                            data: {
                                attributes: data,
                                type: options.name
                            }
                        }),
                        method: 'POST'
                    });
                },
                updateData: function (attrs) {
                    var data = {};
                    for (var a in attrs) {
                        if (attrs.hasOwnProperty(a) && !properties.attr('relationships.' + a)) {
                            data[a] = attrs[a];
                        }
                    }
                    return can.ajax({
                        url: this.resource + '/' + attrs[idProp],
                        headers: {
                            'Accept': 'application/vnd.api+json',
                            'Content-Type': 'application/vnd.api+json'
                        },
                        data: JSON.stringify({
                            data: {
                                attributes: data,
                                type: options.name,
                                id: attrs[idProp]
                            }
                        }),
                        method: 'PATCH'
                    });
                },
                destroyData: function (attrs) {
                    return can.ajax({
                        url: this.resource + '/' + attrs[idProp],
                        headers: {
                            'Accept': 'application/vnd.api+json',
                            'Content-Type': 'application/vnd.api+json'
                        },
                        method: 'DELETE'
                    });
                }
            },
            parseListProp: 'data',
            parseInstanceData: function (props) {
                if (!props) {
                    return {};
                }
                if (props.data) {
                    props = props.data;
                }
                var obj = props.attributes;
                obj.id = props[this.idProp];
                can.batch.start();
                for (var rel in props.relationships) {
                    if (props.relationships.hasOwnProperty(rel) && props.relationships[rel].hasOwnProperty('data')) {
                        obj[rel] = Array.isArray(props.relationships[rel].data) ? props.relationships[rel].data.map(function (item) {
                            return item.id;
                        }) : props.relationships[rel].data ? props.relationships[rel].data.id : null;
                        properties.attr('relationships.' + rel, true);
                    }
                }
                can.batch.stop();
                return obj;
            }
        });
    }
    return {
        get ConnectionFactory() {
            return ConnectionFactory;
        },
        __esModule: true
    };
});
/*index*/
define('can-restless', ['can-restless/lib/CanRestless'], function ($__0) {
    'use strict';
    if (!$__0 || !$__0.__esModule)
        $__0 = { default: $__0 };
    var ConnectionFactory = $__0.ConnectionFactory;
    var $__default = ConnectionFactory;
    return {
        get default() {
            return $__default;
        },
        __esModule: true
    };
});
/*[global-shim-end]*/
(function(){ // jshint ignore:line
	window._define = window.define;
	window.define = window.define.orig;
}
)();