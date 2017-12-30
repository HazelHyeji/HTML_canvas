window.onload = function () {

    //get the canvas and context and stroe in vars
    var canvas = document.getElementById("sky");
    var ctx = canvas.getContext("2d");

    //set canvas dims to window height and width
    var W = window.innerWidth;
    var H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    //generate the snowflakes and apply attributes
    var mf = 100; //maximum flakes
    var flakes = [];

    //loop through the empty flakes and apply attributes
    for (let i = 0; i < mf; i++) {
        flakes.push({
            x: Math.random() * W,
            y: Math.random() * H,
            r: Math.random() * 5 + 2, //min of 2px and max of 7px
            d: Math.random() + 1 //density of the lake
        })
    }

    //draw flakes onto canvas
    function drawFlakes() {
        ctx.clearRect(0, 0, W, H);
        ctx.fillStyle = "white";
        ctx.beginPath(); // im about to begin a path or shape on the canvas
        for (var i = 0; i < mf; i++) {
            var f = flakes[i];
            ctx.moveTo(f.x, f.y);
            ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2, true);
        }
        ctx.fill();
        moveFlakes();
    }

    //animate flakes
    var angle = 0;

    function moveFlakes() {
        angle += 0.01; // increment the angle , gonna control left or right movement of flakes
        for (var i = 0; i < mf; i++) {
            //store surrent flake
            var f = flakes[i];

            //update X and Y coordinates of each snowflakes
            f.y += Math.pow(f.d, 2) + 1;
            f.x += Math.sin(angle) * 2;//to make flakes' moving natural

            //if the snow flakes reaches the bottom, send a new one to the top
            if (f.y > H) {
                flakes[i] = { x: Math.random() * W, y: 0, f: f.r, d: f.d };
            }
        }
    }
    setInterval(drawFlakes, 25);
}