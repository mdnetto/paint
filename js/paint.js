$(document).ready(function () { // eslint-disable-line no-undef
  var mouse = {x: 0, y: 0}
  var lastMouse = {x: 0, y: 0}

  var canvas = document.getElementById('q1')
  var canvas2 = document.getElementById('q2')
  var canvas3 = document.getElementById('q3')
  var canvas4 = document.getElementById('q4')

  var context = canvas.getContext('2d')
  var context2 = canvas2.getContext('2d')
  var context3 = canvas3.getContext('2d')
  var context4 = canvas4.getContext('2d')

  canvas.addEventListener('mousemove', function (e) {
    lastMouse.x = mouse.x
    lastMouse.y = mouse.y
    mouse.x = e.pageX - this.offsetLeft
    mouse.y = e.pageY - this.offsetTop
  }, false)

  function defineLineStyles (context) {
    context.lineWidth = 3
    context.lineJoin = 'round'
    context.lineCap = 'round'
    context.strokeStyle = '#999'
  }

  defineLineStyles(context)
  defineLineStyles(context2)
  defineLineStyles(context3)
  defineLineStyles(context4)

  canvas.addEventListener('mousedown', function (e) {
    canvas.addEventListener('mousemove', onPaint, false)
  }, false)

  canvas.addEventListener('mouseup', function () {
    canvas.removeEventListener('mousemove', onPaint, false)
  }, false)

  var onPaint = function () {
    context.beginPath()
    context.moveTo(lastMouse.x, lastMouse.y)
    context.lineTo(mouse.x, mouse.y)
    context.closePath()
    context.stroke()

    context2.beginPath()
    context2.moveTo(400 - lastMouse.x, lastMouse.y)
    context2.lineTo(400 - mouse.x, mouse.y)
    context2.closePath()
    context2.stroke()

    context3.beginPath()
    context3.moveTo(lastMouse.x, 400 - lastMouse.y)
    context3.lineTo(mouse.x, 400 - mouse.y)
    context3.closePath()
    context3.stroke()

    context4.beginPath()
    context4.moveTo(400 - lastMouse.x, 400 - lastMouse.y)
    context4.lineTo(400 - mouse.x, 400 - mouse.y)
    context4.closePath()
    context4.stroke()
  }

  var palette = document.getElementById('palette')
  var swatches = palette.children
  var currentSwatch // we'll keep track of what swatch is active in this.

  for (var i = 0; i < swatches.length; i++) {
    var swatch = swatches[i]
    if (i === 0) { // eslint-disable-line no-undef
      currentSwatch = swatch
    }

    // when we click on a swatch...
    swatch.addEventListener('click', function (evt) {
      this.className = 'active' // give the swatch a class of 'active', which will trigger the CSS border.
      currentSwatch.className = '' // remove the 'active' class from the previously selected swatch
      currentSwatch = this // set this to the current swatch so next time we'll take 'active' off of this.
      context.strokeStyle = this.style.backgroundColor // set the background color for the canvas.
      context2.strokeStyle = this.style.backgroundColor
      context3.strokeStyle = this.style.backgroundColor
      context4.strokeStyle = this.style.backgroundColor
    })
  }

  var clearBtn = document.getElementById('clear')

  clearBtn.addEventListener('click', function (e) {
    canvas.width = canvas.width
    context.strokeStyle = '#002b36'
    context.fillRect(0, 0, canvas.width, canvas.height)
  })
})

/* http://stackoverflow.com/questions/11807231/how - to - dynamically - create - javascript - variables - from - an - array */
