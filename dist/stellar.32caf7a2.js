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
})({"js/stellar.js":[function(require,module,exports) {
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!
 * Stellar.js v0.6.2
 * http://markdalgleish.com/projects/stellar.js
 * 
 * Copyright 2013, Mark Dalgleish
 * This content is released under the MIT license
 * http://markdalgleish.mit-license.org
 */
;

(function ($, window, document, undefined) {
  var pluginName = 'stellar',
      defaults = {
    scrollProperty: 'scroll',
    positionProperty: 'position',
    horizontalScrolling: true,
    verticalScrolling: true,
    horizontalOffset: 0,
    verticalOffset: 0,
    responsive: false,
    parallaxBackgrounds: true,
    parallaxElements: true,
    hideDistantElements: true,
    hideElement: function hideElement($elem) {
      $elem.hide();
    },
    showElement: function showElement($elem) {
      $elem.show();
    }
  },
      scrollProperty = {
    scroll: {
      getLeft: function getLeft($elem) {
        return $elem.scrollLeft();
      },
      setLeft: function setLeft($elem, val) {
        $elem.scrollLeft(val);
      },
      getTop: function getTop($elem) {
        return $elem.scrollTop();
      },
      setTop: function setTop($elem, val) {
        $elem.scrollTop(val);
      }
    },
    position: {
      getLeft: function getLeft($elem) {
        return parseInt($elem.css('left'), 10) * -1;
      },
      getTop: function getTop($elem) {
        return parseInt($elem.css('top'), 10) * -1;
      }
    },
    margin: {
      getLeft: function getLeft($elem) {
        return parseInt($elem.css('margin-left'), 10) * -1;
      },
      getTop: function getTop($elem) {
        return parseInt($elem.css('margin-top'), 10) * -1;
      }
    },
    transform: {
      getLeft: function getLeft($elem) {
        var computedTransform = getComputedStyle($elem[0])[prefixedTransform];
        return computedTransform !== 'none' ? parseInt(computedTransform.match(/(-?[0-9]+)/g)[4], 10) * -1 : 0;
      },
      getTop: function getTop($elem) {
        var computedTransform = getComputedStyle($elem[0])[prefixedTransform];
        return computedTransform !== 'none' ? parseInt(computedTransform.match(/(-?[0-9]+)/g)[5], 10) * -1 : 0;
      }
    }
  },
      positionProperty = {
    position: {
      setLeft: function setLeft($elem, left) {
        $elem.css('left', left);
      },
      setTop: function setTop($elem, top) {
        $elem.css('top', top);
      }
    },
    transform: {
      setPosition: function setPosition($elem, left, startingLeft, top, startingTop) {
        $elem[0].style[prefixedTransform] = 'translate3d(' + (left - startingLeft) + 'px, ' + (top - startingTop) + 'px, 0)';
      }
    }
  },
      // Returns a function which adds a vendor prefix to any CSS property name
  vendorPrefix = function () {
    var prefixes = /^(Moz|Webkit|Khtml|O|ms|Icab)(?=[A-Z])/,
        style = $('script')[0].style,
        prefix = '',
        prop;

    for (prop in style) {
      if (prefixes.test(prop)) {
        prefix = prop.match(prefixes)[0];
        break;
      }
    }

    if ('WebkitOpacity' in style) {
      prefix = 'Webkit';
    }

    if ('KhtmlOpacity' in style) {
      prefix = 'Khtml';
    }

    return function (property) {
      return prefix + (prefix.length > 0 ? property.charAt(0).toUpperCase() + property.slice(1) : property);
    };
  }(),
      prefixedTransform = vendorPrefix('transform'),
      supportsBackgroundPositionXY = $('<div />', {
    style: 'background:#fff'
  }).css('background-position-x') !== undefined,
      setBackgroundPosition = supportsBackgroundPositionXY ? function ($elem, x, y) {
    $elem.css({
      'background-position-x': x,
      'background-position-y': y
    });
  } : function ($elem, x, y) {
    $elem.css('background-position', x + ' ' + y);
  },
      getBackgroundPosition = supportsBackgroundPositionXY ? function ($elem) {
    return [$elem.css('background-position-x'), $elem.css('background-position-y')];
  } : function ($elem) {
    return $elem.css('background-position').split(' ');
  },
      requestAnimFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
    setTimeout(callback, 1000 / 60);
  };

  function Plugin(element, options) {
    this.element = element;
    this.options = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;
    this.init();
  }

  Plugin.prototype = {
    init: function init() {
      this.options.name = pluginName + '_' + Math.floor(Math.random() * 1e9);

      this._defineElements();

      this._defineGetters();

      this._defineSetters();

      this._handleWindowLoadAndResize();

      this._detectViewport();

      this.refresh({
        firstLoad: true
      });

      if (this.options.scrollProperty === 'scroll') {
        this._handleScrollEvent();
      } else {
        this._startAnimationLoop();
      }
    },
    _defineElements: function _defineElements() {
      if (this.element === document.body) this.element = window;
      this.$scrollElement = $(this.element);
      this.$element = this.element === window ? $('body') : this.$scrollElement;
      this.$viewportElement = this.options.viewportElement !== undefined ? $(this.options.viewportElement) : this.$scrollElement[0] === window || this.options.scrollProperty === 'scroll' ? this.$scrollElement : this.$scrollElement.parent();
    },
    _defineGetters: function _defineGetters() {
      var self = this,
          scrollPropertyAdapter = scrollProperty[self.options.scrollProperty];

      this._getScrollLeft = function () {
        return scrollPropertyAdapter.getLeft(self.$scrollElement);
      };

      this._getScrollTop = function () {
        return scrollPropertyAdapter.getTop(self.$scrollElement);
      };
    },
    _defineSetters: function _defineSetters() {
      var self = this,
          scrollPropertyAdapter = scrollProperty[self.options.scrollProperty],
          positionPropertyAdapter = positionProperty[self.options.positionProperty],
          setScrollLeft = scrollPropertyAdapter.setLeft,
          setScrollTop = scrollPropertyAdapter.setTop;
      this._setScrollLeft = typeof setScrollLeft === 'function' ? function (val) {
        setScrollLeft(self.$scrollElement, val);
      } : $.noop;
      this._setScrollTop = typeof setScrollTop === 'function' ? function (val) {
        setScrollTop(self.$scrollElement, val);
      } : $.noop;

      this._setPosition = positionPropertyAdapter.setPosition || function ($elem, left, startingLeft, top, startingTop) {
        if (self.options.horizontalScrolling) {
          positionPropertyAdapter.setLeft($elem, left, startingLeft);
        }

        if (self.options.verticalScrolling) {
          positionPropertyAdapter.setTop($elem, top, startingTop);
        }
      };
    },
    _handleWindowLoadAndResize: function _handleWindowLoadAndResize() {
      var self = this,
          $window = $(window);

      if (self.options.responsive) {
        $window.bind('load.' + this.name, function () {
          self.refresh();
        });
      }

      $window.bind('resize.' + this.name, function () {
        self._detectViewport();

        if (self.options.responsive) {
          self.refresh();
        }
      });
    },
    refresh: function refresh(options) {
      var self = this,
          oldLeft = self._getScrollLeft(),
          oldTop = self._getScrollTop();

      if (!options || !options.firstLoad) {
        this._reset();
      }

      this._setScrollLeft(0);

      this._setScrollTop(0);

      this._setOffsets();

      this._findParticles();

      this._findBackgrounds(); // Fix for WebKit background rendering bug


      if (options && options.firstLoad && /WebKit/.test(navigator.userAgent)) {
        $(window).load(function () {
          var oldLeft = self._getScrollLeft(),
              oldTop = self._getScrollTop();

          self._setScrollLeft(oldLeft + 1);

          self._setScrollTop(oldTop + 1);

          self._setScrollLeft(oldLeft);

          self._setScrollTop(oldTop);
        });
      }

      this._setScrollLeft(oldLeft);

      this._setScrollTop(oldTop);
    },
    _detectViewport: function _detectViewport() {
      var viewportOffsets = this.$viewportElement.offset(),
          hasOffsets = viewportOffsets !== null && viewportOffsets !== undefined;
      this.viewportWidth = this.$viewportElement.width();
      this.viewportHeight = this.$viewportElement.height();
      this.viewportOffsetTop = hasOffsets ? viewportOffsets.top : 0;
      this.viewportOffsetLeft = hasOffsets ? viewportOffsets.left : 0;
    },
    _findParticles: function _findParticles() {
      var self = this,
          scrollLeft = this._getScrollLeft(),
          scrollTop = this._getScrollTop();

      if (this.particles !== undefined) {
        for (var i = this.particles.length - 1; i >= 0; i--) {
          this.particles[i].$element.data('stellar-elementIsActive', undefined);
        }
      }

      this.particles = [];
      if (!this.options.parallaxElements) return;
      this.$element.find('[data-stellar-ratio]').each(function (i) {
        var $this = $(this),
            horizontalOffset,
            verticalOffset,
            positionLeft,
            positionTop,
            marginLeft,
            marginTop,
            $offsetParent,
            offsetLeft,
            offsetTop,
            parentOffsetLeft = 0,
            parentOffsetTop = 0,
            tempParentOffsetLeft = 0,
            tempParentOffsetTop = 0; // Ensure this element isn't already part of another scrolling element

        if (!$this.data('stellar-elementIsActive')) {
          $this.data('stellar-elementIsActive', this);
        } else if ($this.data('stellar-elementIsActive') !== this) {
          return;
        }

        self.options.showElement($this); // Save/restore the original top and left CSS values in case we refresh the particles or destroy the instance

        if (!$this.data('stellar-startingLeft')) {
          $this.data('stellar-startingLeft', $this.css('left'));
          $this.data('stellar-startingTop', $this.css('top'));
        } else {
          $this.css('left', $this.data('stellar-startingLeft'));
          $this.css('top', $this.data('stellar-startingTop'));
        }

        positionLeft = $this.position().left;
        positionTop = $this.position().top; // Catch-all for margin top/left properties (these evaluate to 'auto' in IE7 and IE8)

        marginLeft = $this.css('margin-left') === 'auto' ? 0 : parseInt($this.css('margin-left'), 10);
        marginTop = $this.css('margin-top') === 'auto' ? 0 : parseInt($this.css('margin-top'), 10);
        offsetLeft = $this.offset().left - marginLeft;
        offsetTop = $this.offset().top - marginTop; // Calculate the offset parent

        $this.parents().each(function () {
          var $this = $(this);

          if ($this.data('stellar-offset-parent') === true) {
            parentOffsetLeft = tempParentOffsetLeft;
            parentOffsetTop = tempParentOffsetTop;
            $offsetParent = $this;
            return false;
          } else {
            tempParentOffsetLeft += $this.position().left;
            tempParentOffsetTop += $this.position().top;
          }
        }); // Detect the offsets

        horizontalOffset = $this.data('stellar-horizontal-offset') !== undefined ? $this.data('stellar-horizontal-offset') : $offsetParent !== undefined && $offsetParent.data('stellar-horizontal-offset') !== undefined ? $offsetParent.data('stellar-horizontal-offset') : self.horizontalOffset;
        verticalOffset = $this.data('stellar-vertical-offset') !== undefined ? $this.data('stellar-vertical-offset') : $offsetParent !== undefined && $offsetParent.data('stellar-vertical-offset') !== undefined ? $offsetParent.data('stellar-vertical-offset') : self.verticalOffset; // Add our object to the particles collection

        self.particles.push({
          $element: $this,
          $offsetParent: $offsetParent,
          isFixed: $this.css('position') === 'fixed',
          horizontalOffset: horizontalOffset,
          verticalOffset: verticalOffset,
          startingPositionLeft: positionLeft,
          startingPositionTop: positionTop,
          startingOffsetLeft: offsetLeft,
          startingOffsetTop: offsetTop,
          parentOffsetLeft: parentOffsetLeft,
          parentOffsetTop: parentOffsetTop,
          stellarRatio: $this.data('stellar-ratio') !== undefined ? $this.data('stellar-ratio') : 1,
          width: $this.outerWidth(true),
          height: $this.outerHeight(true),
          isHidden: false
        });
      });
    },
    _findBackgrounds: function _findBackgrounds() {
      var self = this,
          scrollLeft = this._getScrollLeft(),
          scrollTop = this._getScrollTop(),
          $backgroundElements;

      this.backgrounds = [];
      if (!this.options.parallaxBackgrounds) return;
      $backgroundElements = this.$element.find('[data-stellar-background-ratio]');

      if (this.$element.data('stellar-background-ratio')) {
        $backgroundElements = $backgroundElements.add(this.$element);
      }

      $backgroundElements.each(function () {
        var $this = $(this),
            backgroundPosition = getBackgroundPosition($this),
            horizontalOffset,
            verticalOffset,
            positionLeft,
            positionTop,
            marginLeft,
            marginTop,
            offsetLeft,
            offsetTop,
            $offsetParent,
            parentOffsetLeft = 0,
            parentOffsetTop = 0,
            tempParentOffsetLeft = 0,
            tempParentOffsetTop = 0; // Ensure this element isn't already part of another scrolling element

        if (!$this.data('stellar-backgroundIsActive')) {
          $this.data('stellar-backgroundIsActive', this);
        } else if ($this.data('stellar-backgroundIsActive') !== this) {
          return;
        } // Save/restore the original top and left CSS values in case we destroy the instance


        if (!$this.data('stellar-backgroundStartingLeft')) {
          $this.data('stellar-backgroundStartingLeft', backgroundPosition[0]);
          $this.data('stellar-backgroundStartingTop', backgroundPosition[1]);
        } else {
          setBackgroundPosition($this, $this.data('stellar-backgroundStartingLeft'), $this.data('stellar-backgroundStartingTop'));
        } // Catch-all for margin top/left properties (these evaluate to 'auto' in IE7 and IE8)


        marginLeft = $this.css('margin-left') === 'auto' ? 0 : parseInt($this.css('margin-left'), 10);
        marginTop = $this.css('margin-top') === 'auto' ? 0 : parseInt($this.css('margin-top'), 10);
        offsetLeft = $this.offset().left - marginLeft - scrollLeft;
        offsetTop = $this.offset().top - marginTop - scrollTop; // Calculate the offset parent

        $this.parents().each(function () {
          var $this = $(this);

          if ($this.data('stellar-offset-parent') === true) {
            parentOffsetLeft = tempParentOffsetLeft;
            parentOffsetTop = tempParentOffsetTop;
            $offsetParent = $this;
            return false;
          } else {
            tempParentOffsetLeft += $this.position().left;
            tempParentOffsetTop += $this.position().top;
          }
        }); // Detect the offsets

        horizontalOffset = $this.data('stellar-horizontal-offset') !== undefined ? $this.data('stellar-horizontal-offset') : $offsetParent !== undefined && $offsetParent.data('stellar-horizontal-offset') !== undefined ? $offsetParent.data('stellar-horizontal-offset') : self.horizontalOffset;
        verticalOffset = $this.data('stellar-vertical-offset') !== undefined ? $this.data('stellar-vertical-offset') : $offsetParent !== undefined && $offsetParent.data('stellar-vertical-offset') !== undefined ? $offsetParent.data('stellar-vertical-offset') : self.verticalOffset;
        self.backgrounds.push({
          $element: $this,
          $offsetParent: $offsetParent,
          isFixed: $this.css('background-attachment') === 'fixed',
          horizontalOffset: horizontalOffset,
          verticalOffset: verticalOffset,
          startingValueLeft: backgroundPosition[0],
          startingValueTop: backgroundPosition[1],
          startingBackgroundPositionLeft: isNaN(parseInt(backgroundPosition[0], 10)) ? 0 : parseInt(backgroundPosition[0], 10),
          startingBackgroundPositionTop: isNaN(parseInt(backgroundPosition[1], 10)) ? 0 : parseInt(backgroundPosition[1], 10),
          startingPositionLeft: $this.position().left,
          startingPositionTop: $this.position().top,
          startingOffsetLeft: offsetLeft,
          startingOffsetTop: offsetTop,
          parentOffsetLeft: parentOffsetLeft,
          parentOffsetTop: parentOffsetTop,
          stellarRatio: $this.data('stellar-background-ratio') === undefined ? 1 : $this.data('stellar-background-ratio')
        });
      });
    },
    _reset: function _reset() {
      var particle, startingPositionLeft, startingPositionTop, background, i;

      for (i = this.particles.length - 1; i >= 0; i--) {
        particle = this.particles[i];
        startingPositionLeft = particle.$element.data('stellar-startingLeft');
        startingPositionTop = particle.$element.data('stellar-startingTop');

        this._setPosition(particle.$element, startingPositionLeft, startingPositionLeft, startingPositionTop, startingPositionTop);

        this.options.showElement(particle.$element);
        particle.$element.data('stellar-startingLeft', null).data('stellar-elementIsActive', null).data('stellar-backgroundIsActive', null);
      }

      for (i = this.backgrounds.length - 1; i >= 0; i--) {
        background = this.backgrounds[i];
        background.$element.data('stellar-backgroundStartingLeft', null).data('stellar-backgroundStartingTop', null);
        setBackgroundPosition(background.$element, background.startingValueLeft, background.startingValueTop);
      }
    },
    destroy: function destroy() {
      this._reset();

      this.$scrollElement.unbind('resize.' + this.name).unbind('scroll.' + this.name);
      this._animationLoop = $.noop;
      $(window).unbind('load.' + this.name).unbind('resize.' + this.name);
    },
    _setOffsets: function _setOffsets() {
      var self = this,
          $window = $(window);
      $window.unbind('resize.horizontal-' + this.name).unbind('resize.vertical-' + this.name);

      if (typeof this.options.horizontalOffset === 'function') {
        this.horizontalOffset = this.options.horizontalOffset();
        $window.bind('resize.horizontal-' + this.name, function () {
          self.horizontalOffset = self.options.horizontalOffset();
        });
      } else {
        this.horizontalOffset = this.options.horizontalOffset;
      }

      if (typeof this.options.verticalOffset === 'function') {
        this.verticalOffset = this.options.verticalOffset();
        $window.bind('resize.vertical-' + this.name, function () {
          self.verticalOffset = self.options.verticalOffset();
        });
      } else {
        this.verticalOffset = this.options.verticalOffset;
      }
    },
    _repositionElements: function _repositionElements() {
      var scrollLeft = this._getScrollLeft(),
          scrollTop = this._getScrollTop(),
          horizontalOffset,
          verticalOffset,
          particle,
          fixedRatioOffset,
          background,
          bgLeft,
          bgTop,
          isVisibleVertical = true,
          isVisibleHorizontal = true,
          newPositionLeft,
          newPositionTop,
          newOffsetLeft,
          newOffsetTop,
          i; // First check that the scroll position or container size has changed


      if (this.currentScrollLeft === scrollLeft && this.currentScrollTop === scrollTop && this.currentWidth === this.viewportWidth && this.currentHeight === this.viewportHeight) {
        return;
      } else {
        this.currentScrollLeft = scrollLeft;
        this.currentScrollTop = scrollTop;
        this.currentWidth = this.viewportWidth;
        this.currentHeight = this.viewportHeight;
      } // Reposition elements


      for (i = this.particles.length - 1; i >= 0; i--) {
        particle = this.particles[i];
        fixedRatioOffset = particle.isFixed ? 1 : 0; // Calculate position, then calculate what the particle's new offset will be (for visibility check)

        if (this.options.horizontalScrolling) {
          newPositionLeft = (scrollLeft + particle.horizontalOffset + this.viewportOffsetLeft + particle.startingPositionLeft - particle.startingOffsetLeft + particle.parentOffsetLeft) * -(particle.stellarRatio + fixedRatioOffset - 1) + particle.startingPositionLeft;
          newOffsetLeft = newPositionLeft - particle.startingPositionLeft + particle.startingOffsetLeft;
        } else {
          newPositionLeft = particle.startingPositionLeft;
          newOffsetLeft = particle.startingOffsetLeft;
        }

        if (this.options.verticalScrolling) {
          newPositionTop = (scrollTop + particle.verticalOffset + this.viewportOffsetTop + particle.startingPositionTop - particle.startingOffsetTop + particle.parentOffsetTop) * -(particle.stellarRatio + fixedRatioOffset - 1) + particle.startingPositionTop;
          newOffsetTop = newPositionTop - particle.startingPositionTop + particle.startingOffsetTop;
        } else {
          newPositionTop = particle.startingPositionTop;
          newOffsetTop = particle.startingOffsetTop;
        } // Check visibility


        if (this.options.hideDistantElements) {
          isVisibleHorizontal = !this.options.horizontalScrolling || newOffsetLeft + particle.width > (particle.isFixed ? 0 : scrollLeft) && newOffsetLeft < (particle.isFixed ? 0 : scrollLeft) + this.viewportWidth + this.viewportOffsetLeft;
          isVisibleVertical = !this.options.verticalScrolling || newOffsetTop + particle.height > (particle.isFixed ? 0 : scrollTop) && newOffsetTop < (particle.isFixed ? 0 : scrollTop) + this.viewportHeight + this.viewportOffsetTop;
        }

        if (isVisibleHorizontal && isVisibleVertical) {
          if (particle.isHidden) {
            this.options.showElement(particle.$element);
            particle.isHidden = false;
          }

          this._setPosition(particle.$element, newPositionLeft, particle.startingPositionLeft, newPositionTop, particle.startingPositionTop);
        } else {
          if (!particle.isHidden) {
            this.options.hideElement(particle.$element);
            particle.isHidden = true;
          }
        }
      } // Reposition backgrounds


      for (i = this.backgrounds.length - 1; i >= 0; i--) {
        background = this.backgrounds[i];
        fixedRatioOffset = background.isFixed ? 0 : 1;
        bgLeft = this.options.horizontalScrolling ? (scrollLeft + background.horizontalOffset - this.viewportOffsetLeft - background.startingOffsetLeft + background.parentOffsetLeft - background.startingBackgroundPositionLeft) * (fixedRatioOffset - background.stellarRatio) + 'px' : background.startingValueLeft;
        bgTop = this.options.verticalScrolling ? (scrollTop + background.verticalOffset - this.viewportOffsetTop - background.startingOffsetTop + background.parentOffsetTop - background.startingBackgroundPositionTop) * (fixedRatioOffset - background.stellarRatio) + 'px' : background.startingValueTop;
        setBackgroundPosition(background.$element, bgLeft, bgTop);
      }
    },
    _handleScrollEvent: function _handleScrollEvent() {
      var self = this,
          ticking = false;

      var update = function update() {
        self._repositionElements();

        ticking = false;
      };

      var requestTick = function requestTick() {
        if (!ticking) {
          requestAnimFrame(update);
          ticking = true;
        }
      };

      this.$scrollElement.bind('scroll.' + this.name, requestTick);
      requestTick();
    },
    _startAnimationLoop: function _startAnimationLoop() {
      var self = this;

      this._animationLoop = function () {
        requestAnimFrame(self._animationLoop);

        self._repositionElements();
      };

      this._animationLoop();
    }
  };

  $.fn[pluginName] = function (options) {
    var args = arguments;

    if (options === undefined || _typeof(options) === 'object') {
      return this.each(function () {
        if (!$.data(this, 'plugin_' + pluginName)) {
          $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
        }
      });
    } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
      return this.each(function () {
        var instance = $.data(this, 'plugin_' + pluginName);

        if (instance instanceof Plugin && typeof instance[options] === 'function') {
          instance[options].apply(instance, Array.prototype.slice.call(args, 1));
        }

        if (options === 'destroy') {
          $.data(this, 'plugin_' + pluginName, null);
        }
      });
    }
  };

  $[pluginName] = function (options) {
    var $window = $(window);
    return $window.stellar.apply($window, Array.prototype.slice.call(arguments, 0));
  }; // Expose the scroll and position property function hashes so they can be extended


  $[pluginName].scrollProperty = scrollProperty;
  $[pluginName].positionProperty = positionProperty; // Expose the plugin class so it can be modified

  window.Stellar = Plugin;
})(jQuery, this, document);
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
},{}]},{},["../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/stellar.js"], null)
//# sourceMappingURL=/stellar.32caf7a2.map