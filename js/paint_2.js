$(document).ready(function() {

    var mouse = {x: 0, y: 0};
    var last_mouse = {x: 0, y: 0};
    var ppts = [];

    function create_canvas(id) {
        var array = ['q1', 'q2', 'q3', 'q4'];

        for (var id of array) {
            var canvas  = document.getElementById(id);
            var context = canvas.getContext('2d')
        }
    }
    //create_canvas();

    var canvas  = document.getElementById('q1');
    var context = canvas.getContext('2d');

    var canvas2  = document.getElementById('q2');
    var context2 = canvas2.getContext('2d');

    var canvas3  = document.getElementById('q3');
    var context3 = canvas3.getContext('2d');

    var canvas4  = document.getElementById('q4');
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
        context.strokeStyle = '#00ffcc';
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

    var clearBtn = document.getElementById("clear");
    clearBtn.addEventListener("click",function(e) {
        canvas.width = canvas.width; // this is all it takes to clear!
        canvas2.width = canvas2.width; // this is all it takes to clear!
        context.strokeStyle = '#ffffff';
        context.fillRect(0,0, canvas.width, canvas.height);
    });
});
