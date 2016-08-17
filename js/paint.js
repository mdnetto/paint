//http://codetheory.in/html5-canvas-drawing-lines-with-smooth-edges/

$(document).ready(function() {

    var canvas = document.querySelector('#paint');
    var ctx = canvas.getContext('2d');

    var sketch = document.querySelector('#sketch');
    var sketch_style = getComputedStyle(sketch);
    canvas.width = parseInt(sketch_style.getPropertyValue('width'));
    canvas.height = parseInt(sketch_style.getPropertyValue('height'));

    // Creating a tmp canvas
    var tmp_canvas = document.createElement('canvas');
    var tmp_ctx = tmp_canvas.getContext('2d');
    tmp_canvas.id = 'tmp_canvas';
    tmp_canvas.width = canvas.width;
    tmp_canvas.height = canvas.height;

    sketch.appendChild(tmp_canvas);

    var mouse = {x: 0, y: 0};

    // Pencil Points
    var ppts = [];

    /* Mouse Capturing Work */
    tmp_canvas.addEventListener('mousemove', function(e) {
        mouse.x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
        mouse.y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;
    }, false);

  /* Drawing on Paint App */
    tmp_ctx.lineWidth = 3;
    tmp_ctx.lineJoin = 'round';
    tmp_ctx.lineCap = 'round';
    tmp_ctx.strokeStyle = '#00ffcc';
    tmp_ctx.fillStyle = '#00ffcc';

    tmp_canvas.addEventListener('mousedown', function(e) {
        tmp_canvas.addEventListener('mousemove', onPaint, false);
        mouse.x = typeof e.offsetX !== 'undefined' ? e.offfsetX : e.layerX;
        mouse.y = typeof e.offsetY !== 'undefined' ? e.offfsetY : e.layerY;
        //ppts.push({x: mouse.x, y: mouse.y});
        onPaint(mouse.x, mouse.y);
        //onPaint();
    }, false);

    tmp_canvas.addEventListener('mouseup', function() {
        tmp_canvas.removeEventListener('mousemove', onPaint, false);
        ctx.drawImage(tmp_canvas, 0, 0);
        tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);
        ppts = [];
    }, false);

    var onPaint() = function() {
        ppts.push({x: x, y: y});

        if (ppts.length < 3) {
            var b = ppts[0];
            tmp_ctx.beginPath();
            tmp_ctx.arc(b.x, b.y, tmp_ctx.lineWidth / 2, 0, Math.PI * 2, !0);
            tmp_ctx.fill();
            tmp_ctx.closePath();
            return;
        }

      tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);
      tmp_ctx.beginPath();
      tmp_ctx.moveTo(ppts[0].x, ppts[0].y);

      for (var i = 1; i < ppts.length - 2; i++) {
          var c = (ppts[i].x + ppts[i + 1].x) / 2;
          var d = (ppts[i].y + ppts[i + 1].y) / 2;
          tmp_ctx.quadraticCurveTo(ppts[i].x, ppts[i].y, c, d);
      }

      tmp_ctx.quadraticCurveTo(
          ppts[i].x,
          ppts[i].y,
          ppts[i + 1].x,
          ppts[i + 1].y
      );
      tmp_ctx.stroke();
    };
});
