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
})({"js/custom.js":[function(require,module,exports) {
/*global jQuery:false */
(function ($) {
  var wow = new WOW({
    boxClass: 'wow',
    // animated element css class (default is wow)
    animateClass: 'animated',
    // animation css class (default is animated)
    offset: 0,
    // distance to the element when triggering the animation (default is 0)
    mobile: false // trigger animations on mobile devices (true is default)

  });
  wow.init(); //jQuery to collapse the navbar on scroll

  $(window).scroll(function () {
    if ($(".navbar").offset().top > 50) {
      $(".navbar-fixed-top").addClass("top-nav-collapse");
      $(".top-area").addClass("top-padding");
      $(".navbar-brand").addClass("reduce");
      $(".navbar-custom ul.nav ul.dropdown-menu").css("margin-top", "11px");
    } else {
      $(".navbar-fixed-top").removeClass("top-nav-collapse");
      $(".top-area").removeClass("top-padding");
      $(".navbar-brand").removeClass("reduce");
      $(".navbar-custom ul.nav ul.dropdown-menu").css("margin-top", "16px");
    }
  }); //scroll to top

  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('.scrollup').fadeIn();
    } else {
      $('.scrollup').fadeOut();
    }
  });
  $('.scrollup').click(function () {
    $("html, body").animate({
      scrollTop: 0
    }, 1000);
    return false;
  }); //jQuery for page scrolling feature - requires jQuery Easing plugin

  $(function () {
    $('.navbar-nav li a').bind('click', function (event) {
      var $anchor = $(this);
      var nav = $($anchor.attr('href'));

      if (nav.length) {
        $('html, body').stop().animate({
          scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
      }
    });
    $('.page-scroll a').bind('click', function (event) {
      var $anchor = $(this);
      $('html, body').stop().animate({
        scrollTop: $($anchor.attr('href')).offset().top
      }, 1500, 'easeInOutExpo');
      event.preventDefault();
    });
  }); //owl carousel

  $('#owl-works').owlCarousel({
    items: 4,
    itemsDesktop: [1199, 5],
    itemsDesktopSmall: [980, 5],
    itemsTablet: [768, 5],
    itemsTabletSmall: [550, 2],
    itemsMobile: [480, 2]
  }); //nivo lightbox

  $('.owl-carousel .item a').nivoLightbox({
    effect: 'fadeScale',
    // The effect to use when showing the lightbox
    theme: 'default',
    // The lightbox theme to use
    keyboardNav: true,
    // Enable/Disable keyboard navigation (left/right/escape)
    clickOverlayToClose: true,
    // If false clicking the "close" button will be the only way to close the lightbox
    onInit: function onInit() {},
    // Callback when lightbox has loaded
    beforeShowLightbox: function beforeShowLightbox() {},
    // Callback before the lightbox is shown
    afterShowLightbox: function afterShowLightbox(lightbox) {},
    // Callback after the lightbox is shown
    beforeHideLightbox: function beforeHideLightbox() {},
    // Callback before the lightbox is hidden
    afterHideLightbox: function afterHideLightbox() {},
    // Callback after the lightbox is hidden
    onPrev: function onPrev(element) {},
    // Callback when the lightbox gallery goes to previous item
    onNext: function onNext(element) {},
    // Callback when the lightbox gallery goes to next item
    errorMessage: 'The requested content cannot be loaded. Please try again later.' // Error message when content can't be loaded

  });
  jQuery('.appear').appear();
  jQuery(".appear").on("appear", function (data) {
    var id = $(this).attr("id");
    jQuery('.nav li').removeClass('active');
    jQuery(".nav a[href='#" + id + "']").parent().addClass("active");
  }); //parallax

  if ($('.parallax').length) {
    $(window).stellar({
      responsive: true,
      scrollProperty: 'scroll',
      parallaxElements: false,
      horizontalScrolling: false,
      horizontalOffset: 0,
      verticalOffset: 0
    });
  }

  (function ($, window, document, undefined) {
    var gridContainer = $('#grid-container'),
        filtersContainer = $('#filters-container'); // init cubeportfolio

    gridContainer.cubeportfolio({
      defaultFilter: '*',
      animationType: 'sequentially',
      gapHorizontal: 50,
      gapVertical: 40,
      gridAdjustment: 'responsive',
      caption: 'fadeIn',
      displayType: 'lazyLoading',
      displayTypeSpeed: 100,
      // lightbox
      lightboxDelegate: '.cbp-lightbox',
      lightboxGallery: true,
      lightboxTitleSrc: 'data-title',
      lightboxShowCounter: true,
      // singlePage popup
      singlePageDelegate: '.cbp-singlePage',
      singlePageDeeplinking: true,
      singlePageStickyNavigation: true,
      singlePageShowCounter: true,
      singlePageCallback: function singlePageCallback(url, element) {
        // to update singlePage content use the following method: this.updateSinglePage(yourContent)
        var t = this;
        $.ajax({
          url: url,
          type: 'GET',
          dataType: 'html',
          timeout: 5000
        }).done(function (result) {
          t.updateSinglePage(result);
        }).fail(function () {
          t.updateSinglePage("Error! Please refresh the page!");
        });
      },
      // singlePageInline
      singlePageInlineDelegate: '.cbp-singlePageInline',
      singlePageInlinePosition: 'above',
      singlePageInlineShowCounter: true,
      singlePageInlineInFocus: true,
      singlePageInlineCallback: function singlePageInlineCallback(url, element) {// to update singlePageInline content use the following method: this.updateSinglePageInline(yourContent)
      }
    }); // add listener for filters click

    filtersContainer.on('click', '.cbp-filter-item', function (e) {
      var me = $(this),
          wrap; // get cubeportfolio data and check if is still animating (reposition) the items.

      if (!$.data(gridContainer[0], 'cubeportfolio').isAnimating) {
        if (filtersContainer.hasClass('cbp-l-filters-dropdown')) {
          wrap = $('.cbp-l-filters-dropdownWrap');
          wrap.find('.cbp-filter-item').removeClass('cbp-filter-item-active');
          wrap.find('.cbp-l-filters-dropdownHeader').text(me.text());
          me.addClass('cbp-filter-item-active');
        } else {
          me.addClass('cbp-filter-item-active').siblings().removeClass('cbp-filter-item-active');
        }
      } // filter the items


      gridContainer.cubeportfolio('filter', me.data('filter'), function () {});
    }); // activate counter for filters

    gridContainer.cubeportfolio('showCounter', filtersContainer.find('.cbp-filter-item'));
  })(jQuery, window, document);
})(jQuery);

$(window).load(function () {
  $(".loader").delay(100).fadeOut();
  $("#page-loader").delay(100).fadeOut("fast");
});
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
},{}]},{},["../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/custom.js"], null)
//# sourceMappingURL=/custom.a62a38dd.map