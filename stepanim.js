/**
 * @fileoverview Step Anim Module.
 * @author ChenCheng <sorrycc@gmail.com>
 */

(function() {

  function StepAnim(el, config) {
    if (!el) {
      throw Error('el not valid');
    }
    this.el = el;
    mix(this, config);
    mix(this, {
      isStoped: true,
      to      : ('to' in this) ? this.to : (this.length - 1),
      size    : ('size' in this) ? this.size : this.el.clientWidth
    });
  }

  mix(StepAnim.prototype, {

    run: function() {
      this.isStoped = false;
      this._run();
      return this;
    },

    stop: function() {
      this.isStoped = true;
      return this;
    },

    set: function(key, value) {
      this[key] = value;
      return this;
    },

    goto: function(index) {
      this.next = index;
      this._anim();
    },

    _run: function() {
      this._anim();
      this._delayRun();
    },

    _anim: function() {
      this.el.style.backgroundPosition = '-'+(this.next||0)*this.size+'px 0';
      this.current = this.next;
      this._calulateNext();
    },

    _delayRun: function() {
      if (this.isStoped) return;
      if (!this.isInfinity && this.current === this.to) {
        this.isStoped = true;
        this.complete && this.complete.call(this);
        return;
      }
      var self = this;
      setTimeout(function() {
        self._run();
      }, this.delay || 84);
    },

    _calulateNext: function() {
      this.next = (this.current < this.length - 1) ? (this.current + 1) : 0;
    }
  });

  window.StepAnim = StepAnim;

  //////////////////////////////
  // utils

  function mix(r, s) {
    for (var k in s) {
      r[k] = s[k];
    }
  }

})();