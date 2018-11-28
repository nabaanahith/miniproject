// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"js/nivo-lightbox.min.js":[function(require,module,exports) {
/*
 * Nivo Lightbox v1.0
 * http://dev7studios.com/nivo-lightbox
 *
 * Copyright 2013, Dev7studios
 * Free to use and abuse under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */
(function (e, t, n, r) {
  function o(t, n) {
    this.el = t;
    this.$el = e(this.el);
    this.options = e.extend({}, s, n);
    this._defaults = s;
    this._name = i;
    this.init();
  }

  var i = "nivoLightbox",
      s = {
    effect: "fade",
    theme: "default",
    keyboardNav: true,
    onInit: function onInit() {},
    beforeShowLightbox: function beforeShowLightbox() {},
    afterShowLightbox: function afterShowLightbox(e) {},
    beforeHideLightbox: function beforeHideLightbox() {},
    afterHideLightbox: function afterHideLightbox() {},
    onPrev: function onPrev(e) {},
    onNext: function onNext(e) {},
    errorMessage: "The requested content cannot be loaded. Please try again later."
  };
  o.prototype = {
    init: function init() {
      var t = this;
      this.$el.on("click", function (e) {
        e.preventDefault();
        t.showLightbox();
      });

      if (this.options.keyboardNav) {
        e("body").off("keyup").on("keyup", function (n) {
          var r = n.keyCode ? n.keyCode : n.which;
          if (r == 27) t.destructLightbox();
          if (r == 37) e(".nivo-lightbox-prev").trigger("click");
          if (r == 39) e(".nivo-lightbox-next").trigger("click");
        });
      }

      this.options.onInit.call(this);
    },
    showLightbox: function showLightbox() {
      var t = this;
      this.options.beforeShowLightbox.call(this);
      var n = this.constructLightbox();
      if (!n) return;
      var r = n.find(".nivo-lightbox-content");
      if (!r) return;
      var i = this.$el;
      e("body").addClass("nivo-lightbox-body-effect-" + this.options.effect);
      this.processContent(r, i);

      if (this.$el.attr("data-lightbox-gallery")) {
        var t = this,
            s = e('[data-lightbox-gallery="' + this.$el.attr("data-lightbox-gallery") + '"]');
        e(".nivo-lightbox-nav").show();
        e(".nivo-lightbox-prev").off("click").on("click", function (n) {
          n.preventDefault();
          var o = s.index(i);
          i = s.eq(o - 1);
          if (!e(i).length) i = s.last();
          t.processContent(r, i);
          t.options.onPrev.call(this, [i]);
        });
        e(".nivo-lightbox-next").off("click").on("click", function (n) {
          n.preventDefault();
          var o = s.index(i);
          i = s.eq(o + 1);
          if (!e(i).length) i = s.first();
          t.processContent(r, i);
          t.options.onNext.call(this, [i]);
        });
      }

      setTimeout(function () {
        n.addClass("nivo-lightbox-open");
        t.options.afterShowLightbox.call(this, [n]);
      }, 1);
    },
    processContent: function processContent(n, r) {
      var i = this;
      var s = r.attr("href");
      n.html("").addClass("nivo-lightbox-loading");

      if (this.isHidpi() && r.attr("data-lightbox-hidpi")) {
        s = r.attr("data-lightbox-hidpi");
      }

      if (s.match(/\.(jpeg|jpg|gif|png)$/) != null) {
        var o = e("<img>", {
          src: s
        });
        o.one("load", function () {
          var r = e('<div class="nivo-lightbox-image" />');
          r.append(o);
          n.html(r).removeClass("nivo-lightbox-loading");
          r.css({
            "line-height": e(".nivo-lightbox-content").height() + "px",
            height: e(".nivo-lightbox-content").height() + "px"
          });
          e(t).resize(function () {
            r.css({
              "line-height": e(".nivo-lightbox-content").height() + "px",
              height: e(".nivo-lightbox-content").height() + "px"
            });
          });
        }).each(function () {
          if (this.complete) e(this).load();
        });
        o.error(function () {
          var t = e('<div class="nivo-lightbox-error"><p>' + i.options.errorMessage + "</p></div>");
          n.html(t).removeClass("nivo-lightbox-loading");
        });
      } else if (video = s.match(/(youtube|youtu|vimeo)\.(com|be)\/(watch\?v=(\w+)|(\w+))/)) {
        var u = "",
            a = "nivo-lightbox-video";

        if (video[1] == "youtube") {
          u = "http://www.youtube.com/v/" + video[4];
          a = "nivo-lightbox-youtube";
        }

        if (video[1] == "youtu") {
          u = "http://www.youtube.com/v/" + video[3];
          a = "nivo-lightbox-youtube";
        }

        if (video[1] == "vimeo") {
          u = "http://player.vimeo.com/video/" + video[3];
          a = "nivo-lightbox-vimeo";
        }

        if (u) {
          var f = e("<iframe>", {
            src: u,
            "class": a,
            frameborder: 0,
            vspace: 0,
            hspace: 0,
            scrolling: "auto"
          });
          n.html(f);
          f.load(function () {
            n.removeClass("nivo-lightbox-loading");
          });
        }
      } else if (r.attr("data-lightbox-type") == "ajax") {
        var i = this;
        e.ajax({
          url: s,
          cache: false,
          success: function success(r) {
            var i = e('<div class="nivo-lightbox-ajax" />');
            i.append(r);
            n.html(i).removeClass("nivo-lightbox-loading");

            if (i.outerHeight() < n.height()) {
              i.css({
                position: "relative",
                top: "50%",
                "margin-top": -(i.outerHeight() / 2) + "px"
              });
            }

            e(t).resize(function () {
              if (i.outerHeight() < n.height()) {
                i.css({
                  position: "relative",
                  top: "50%",
                  "margin-top": -(i.outerHeight() / 2) + "px"
                });
              }
            });
          },
          error: function error() {
            var t = e('<div class="nivo-lightbox-error"><p>' + i.options.errorMessage + "</p></div>");
            n.html(t).removeClass("nivo-lightbox-loading");
          }
        });
      } else if (s.substring(0, 1) == "#") {
        if (e(s).length) {
          var l = e('<div class="nivo-lightbox-inline" />');
          l.append(e(s).clone().show());
          n.html(l).removeClass("nivo-lightbox-loading");

          if (l.outerHeight() < n.height()) {
            l.css({
              position: "relative",
              top: "50%",
              "margin-top": -(l.outerHeight() / 2) + "px"
            });
          }

          e(t).resize(function () {
            if (l.outerHeight() < n.height()) {
              l.css({
                position: "relative",
                top: "50%",
                "margin-top": -(l.outerHeight() / 2) + "px"
              });
            }
          });
        } else {
          var l = e('<div class="nivo-lightbox-error"><p>' + i.options.errorMessage + "</p></div>");
          n.html(l).removeClass("nivo-lightbox-loading");
        }
      } else {
        var f = e("<iframe>", {
          src: s,
          "class": "nivo-lightbox-item",
          frameborder: 0,
          vspace: 0,
          hspace: 0,
          scrolling: "auto"
        });
        n.html(f);
        f.load(function () {
          n.removeClass("nivo-lightbox-loading");
        });
      }

      if (r.attr("title")) {
        var c = e("<span>", {
          "class": "nivo-lightbox-title"
        });
        c.text(r.attr("title"));
        e(".nivo-lightbox-title-wrap").html(c);
      } else {
        e(".nivo-lightbox-title-wrap").html("");
      }
    },
    constructLightbox: function constructLightbox() {
      if (e(".nivo-lightbox-overlay").length) return e(".nivo-lightbox-overlay");
      var t = e("<div>", {
        "class": "nivo-lightbox-overlay nivo-lightbox-theme-" + this.options.theme + " nivo-lightbox-effect-" + this.options.effect
      });
      var n = e("<div>", {
        "class": "nivo-lightbox-wrap"
      });
      var r = e("<div>", {
        "class": "nivo-lightbox-content"
      });
      var i = e('<a href="#" class="nivo-lightbox-nav nivo-lightbox-prev">Previous</a><a href="#" class="nivo-lightbox-nav nivo-lightbox-next">Next</a>');
      var s = e('<a href="#" class="nivo-lightbox-close" title="Close">Close</a>');
      var o = e("<div>", {
        "class": "nivo-lightbox-title-wrap"
      });
      var u = 0;
      if (u) t.addClass("nivo-lightbox-ie");
      n.append(r);
      n.append(o);
      t.append(n);
      t.append(i);
      t.append(s);
      e("body").append(t);
      var a = this;
      t.on("click", function (t) {
        if (t.target === this || e(t.target).hasClass("nivo-lightbox-content") || e(t.target).hasClass("nivo-lightbox-image")) a.destructLightbox();
      });
      s.on("click", function (e) {
        e.preventDefault();
        a.destructLightbox();
      });
      return t;
    },
    destructLightbox: function destructLightbox() {
      var t = this;
      this.options.beforeHideLightbox.call(this);
      e(".nivo-lightbox-overlay").removeClass("nivo-lightbox-open");
      e(".nivo-lightbox-nav").hide();
      e("body").removeClass("nivo-lightbox-body-effect-" + t.options.effect);
      var n = 0;

      if (n) {
        e(".nivo-lightbox-overlay iframe").attr("src", " ");
        e(".nivo-lightbox-overlay iframe").remove();
      }

      e(".nivo-lightbox-prev").off("click");
      e(".nivo-lightbox-next").off("click");
      this.options.afterHideLightbox.call(this);
    },
    isHidpi: function isHidpi() {
      var e = "(-webkit-min-device-pixel-ratio: 1.5),							  (min--moz-device-pixel-ratio: 1.5),							  (-o-min-device-pixel-ratio: 3/2),							  (min-resolution: 1.5dppx)";
      if (t.devicePixelRatio > 1) return true;
      if (t.matchMedia && t.matchMedia(e).matches) return true;
      return false;
    }
  };

  e.fn[i] = function (t) {
    return this.each(function () {
      if (!e.data(this, i)) {
        e.data(this, i, new o(this, t));
      }
    });
  };
})(jQuery, window, document);
},{}],"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "60778" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/nivo-lightbox.min.js"], null)
//# sourceMappingURL=/nivo-lightbox.min.fe7ff3f5.map