var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var time = 0;
setInterval(function () {
    time++;
    increment_time_on_screen();
}, 1000);
var game_piece = /** @class */ (function () {
    function game_piece(x, y, dx, dy) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
    }
    return game_piece;
}());
var game_bar = new game_piece(160, 384, 40, 0);
var ball = new game_piece(206, 6, -2, 6);
//main game loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw_bar();
    draw_ball();
    change_dy_dx_of_ball();
    if (ball.y - 15 > canvas.height) {
        alert('Game over.You lasted for ' + time + ' seconds.');
    }
    requestAnimationFrame(animate);
}
animate();
/*-------------------end of main game loop------------------*/
document.addEventListener('keydown', function (e) {
    if (e.key == 'ArrowRight' && game_bar.x != 320) {
        game_bar.x += game_bar.dx;
    }
    else if (e.key == 'ArrowLeft' && game_bar.x != 0) {
        game_bar.x -= game_bar.dx;
    }
});
//functions
function draw_bar() {
    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.fillRect(game_bar.x, game_bar.y, 80, 16);
}
function draw_ball() {
    ball.x += ball.dx;
    ball.y += ball.dy;
    ctx.beginPath();
    ctx.fillStyle = 'blue';
    ctx.arc(ball.x, ball.y, 12, 0 * Math.PI, 2 * Math.PI);
    ctx.fill();
}
function change_dy_dx_of_ball() {
    if (ball.y + 12 == game_bar.y && ball.x >= game_bar.x && ball.x <= game_bar.x + 80) { //if ball collides with the bar
        ball.dy *= -1;
        if (ball.x - 12 == 0 || ball.x + 12 == 400) {
            ball.dx *= -1;
        }
    }
    else if (ball.y - 12 == 0 && ball.dy < 0) { //if ball collides with the top
        ball.dy *= -1;
    }
    else if (ball.x - 12 == 0 || ball.x + 12 == 400) { //if ball collides with the left & right wall
        ball.dx *= -1;
    }
}
function increment_time_on_screen() {
    document.querySelector('#time').innerHTML = 'Time: ' + time + '   seconds';
}
/*---------------------end of functions-------------------------*/ 
