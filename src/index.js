export default class MicroEmitter {
  constructor() {
    this._listeners = {};
  }

  /**
   * Adds a listener function to the specified event.
   * @param {String} type
   * @param {Function} listener
   * @param {Boolean} once
   */
  _addListener(type, listener, once) {
    this._listeners[type] = this._listeners[type] || [];
    this._listeners[type].push({ listener: listener, once: once });
    return this;
  }

  /**
   * Adds a listener function to the specified event.
   * @param {String} type
   * @param {Function} listener
   * @return {Object} Current instance of MicroEmitter for chaining.
   */
  addListener(type, listener) {
    return this._addListener(type, listener, false);
  }

  /* Alias of addListener */
  on(type, listener) {
    return this.addListener(type, listener);
  }

  addOnceListener(type, listener) {
    return this._addListener(type, listener, true);
  }

  /* Alias of addOnceListener */
  once(type, listener) {
    return this.addOnceListener(type, listener);
  }

  /**
   * Removes a listener function to the specified event.
   * @param {String} type
   * @param {Function} listener
   * @return {Object} Current instance of MicroEmitter for chaining.
   */
  removeListener(type, listener) { // alias
    let isRemoved = false;

    if (!this._listeners[type].length) return this;
    if (!listener) {
      delete this._listeners[type];
      return this;
    }
    this._listeners[type] = this._listeners[type].filter((_listener) => {
      if (_listener.listener === listener) {
        isRemoved = true;
        return false;
      } else {
        return true;
      }
    });
    if (!isRemoved) console.warn('not registered this listener.');
    return this;
  }

  /* Alias of removeListener */
  off(type, listener) {
    return this.removeListener(type, listener);
  }

  /**
   * Emits an specified event.
   * @param {String} type
   * @param {Object} payload
   * @return {Object} Current instance of MicroEmitter for chaining.
   */
  emit(type, payload) {
    if (!this._listeners[type]) return this;
    for (let index = 0; index < this._listeners[type].length; index++) {
      this._listeners[type][index].listener.apply(this, [payload]);
      if (this._listeners[type][index].once) {
        this.removeListener(type, this._listeners[type][index].listener);
        index--;
      }
    }
    return this;
  }

  /* Alias of emit */
  trigger(type, payload) {
    return this.emit(type, payload);
  }
}
