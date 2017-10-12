(function (window) {

function Draggable (el) {
  const _this = this
  
  el.addEventListener('mousedown', onMouseDown)

  function onMouseDown (e) {
    _this.emit.call(_this, 'click', e)
    document.body.addEventListener('mouseup', onStopDrag)
    document.body.addEventListener('mousemove', onDrag)
  }

  function onStopDrag (e) {
    document.body.removeEventListener('mouseup', onStopDrag)
    document.body.removeEventListener('mousemove', onDrag)
    _this.emit.call(_this, 'dragstop', e)
  } 

  function onDrag (e) {
    _this.emit.call(_this, 'drag', e)
  }
}

Draggable.prototype = Object.create(EventEmitter.prototype)

function EventEmitter () {
  this._listeners = {}
}

EventEmitter.prototype.on = function (eventName, cb) {
  if (!this._listeners[eventName]) this._listeners[eventName] = []
  this._listeners[eventName].push(cb)
}

EventEmitter.prototype.emit = function (eventName, data) {
  if (!this._listeners[eventName]) return
  this._listeners[eventName].forEach(cb => cb(data))
}

window.Draggable = Draggable

})(window)
