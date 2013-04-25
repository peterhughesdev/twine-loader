;var Loader = function() {
  // Cache dirs
	var cache = {
		root: "", scripts: "", macros: "", styles: ""
	}

	// Cache head element for marginal perf. win
	var head = document.getElementsByTagName("head")[0];

	// Builder function
	var build = function(tag, attr, callback) {
		var el = document.createElement(tag);
		var attrs =  attrs || {};

		for (var a in attr) {
			el.setAttribute(a, attr[a]);
		}

		// Provide callback for once the element has loaded
		if (callback && typeof callback === 'function') {
			el.onload = el.onreadstatechange = function(e) {
				if (e.type === 'load' || (/loaded|complete/.test(ele.readyState) && (!document.documentMode || document.documentMode < 9))) {
					el.onload = el.onreadystatechange = null;
					callback.call(el);
				}
			}
		}

		head.appendChild(el);
	}

	// Public API
	return {
		set: function(key, val) {
			cache[key] = val;
		},
		get: function(key) {
			return cache[key];
		},
		css: function(file) {
			build("link", {rel: "stylesheet", type: "text/css", href: cache.root + cache.styles + file});
		},
		script: function(file) {
			build("script", {src: cache.root + cache.scripts + file});
		},
		macro: function(file, name) {
			var callback = (function()  {
				return function(el) {
					console.log(name + " : loaded");
					if (macros[name] && macros[name].init && typeof macros[name].init === "function") {
						macros[name].init();
						
					}
				}
			}());

			build("script", {src: cache.root + cache.macros + file}, callback);
		}
	}
}

// Bootstrap macro
try {
	version.extensions.loadMacro = { 
		major: 0, minor: 1, revision:0
	};

	macros.load = { 
		loader: Loader(),
		init: function(){},
		handler: function(place, state, params) {
			var fn = params.shift();
			this.loader[fn] && this.loader[fn].apply({}, params);
		}
	};

} catch(e) {
	throwError(place, "Loader error: " + e.message);
};
