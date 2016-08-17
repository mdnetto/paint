$(document).ready(function() {

    var mouse = {x: 0, y: 0};
    var last_mouse = {x: 0, y: 0};
    var ppts = [];

    //create_canvas();
    var canvas = document.getElementById('q1');
    var canvas2 = document.getElementById('q2');
    var canvas3 = document.getElementById('q3');
    var canvas4 = document.getElementById('q4');

    var context = canvas.getContext('2d');
    var context2 = canvas2.getContext('2d');
    var context3 = canvas3.getContext('2d');
    var context4 = canvas4.getContext('2d');

    canvas.addEventListener("mousemove", function(e) {
        last_mouse.x = mouse.x;
        last_mouse.y = mouse.y;
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
    }, false);

    function define_line_styles(context) {
        context.lineWidth = 3;
        context.lineJoin = 'round';
        context.lineCap = 'round';
        context.strokeStyle = '#999';
    }

    define_line_styles(context);
    define_line_styles(context2);
    define_line_styles(context3);
    define_line_styles(context4);

    canvas.addEventListener("mousedown", function(e) {
        canvas.addEventListener("mousemove", onPaint, false);
    }, false);


    canvas.addEventListener("mouseup", function() {
        canvas.removeEventListener('mousemove', onPaint, false);
    }, false);

    var onPaint = function() {
        context.beginPath();
        context.moveTo(last_mouse.x, last_mouse.y);
        context.lineTo(mouse.x, mouse.y);
        context.closePath();
        context.stroke();

        context2.beginPath();
        context2.moveTo(400-last_mouse.x, last_mouse.y);
        context2.lineTo(400-mouse.x, mouse.y);
        context2.closePath();
        context2.stroke();

        context3.beginPath();
        context3.moveTo(last_mouse.x, 400-last_mouse.y);
        context3.lineTo(mouse.x, 400-mouse.y);
        context3.closePath();
        context3.stroke();

        context4.beginPath();
        context4.moveTo(400-last_mouse.x, 400-last_mouse.y);
        context4.lineTo(400-mouse.x, 400-mouse.y);
        context4.closePath();
        context4.stroke();
    };

    var palette = document.getElementById("palette");
    var swatches = palette.children;
    var currentSwatch; // we'll keep track of what swatch is active in this.

    for (var i = 0; i < swatches.length; i++) {
        var swatch = swatches[i];
        if (i == 0) {
            currentSwatch = swatch;
        }

        // when we click on a swatch...
        swatch.addEventListener("click",function (evt) {
            this.className = "active"; // give the swatch a class of "active", which will trigger the CSS border.
            currentSwatch.className = ""; // remove the "active" class from the previously selected swatch
            currentSwatch = this; // set this to the current swatch so next time we'll take "active" off of this.
            context.strokeStyle = this.style.backgroundColor; // set the background color for the canvas.
            context2.strokeStyle = this.style.backgroundColor;
            context3.strokeStyle = this.style.backgroundColor;
            context4.strokeStyle = this.style.backgroundColor;
        });
    }

    var clearBtn = document.getElementById("clear");

    clearBtn.addEventListener("click",function(e) {
        canvas.width = canvas.width;
        context.strokeStyle = '#ffffff';
        context.fillRect(0,0, canvas.width, canvas.height);
    });
});

/* Make clear work, save work, change color work*/
//http://stackoverflow.com/questions/11807231/how-to-dynamically-create-javascript-variables-from-an-array
