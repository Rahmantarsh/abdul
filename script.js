// Select the canvas and get its context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Set canvas size
canvas.width = 600;
canvas.height = 400;

// Ball properties
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    dx: 3, // Ball speed (X direction)
    dy: -3, // Ball speed (Y direction)
    color: "red"
};

// Paddle properties
const paddle = {
    width: 100,
    height: 10,
    x: (canvas.width - 100) / 2,
    y: canvas.height - 20,
    color: "blue"
};

// Touch event listener
canvas.addEventListener("touchmove", function(event) {
    let touchX = event.touches[0].clientX - canvas.getBoundingClientRect().left;
    
    // Center the paddle where the touch happens
    paddle.x = touchX - paddle.width / 2;

    // Prevent paddle from going out of bounds
    if (paddle.x < 0) paddle.x = 0;
    if (paddle.x + paddle.width > canvas.width) paddle.x = canvas.width - paddle.width;
});

// Function to draw the ball
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();
}

// Function to draw the paddle
function drawPaddle() {
    ctx.fillStyle = paddle.color;
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

// Function to move the ball
function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Ball collision with walls
    if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
        ball.dx *= -1; // Reverse X direction
    }

    // Ball collision with top wall
    if (ball.y - ball.radius < 0) {
        ball.dy *= -1; // Reverse Y direction
    }

    // Ball collision with paddle
    if (
        ball.y + ball.radius > paddle.y &&
        ball.x > paddle.x &&
        ball.x < paddle.x + paddle.width
    ) {
        ball.dy *= -1; // Reverse Y direction
    }

    // Ball falls below the paddle (Game Over)
    if (ball.y + ball.radius > canvas.height) {
        alert("Game Over! Refresh to try again.");
        document.location.reload();
    }
}

// Function to update the game
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
    drawBall();
    drawPaddle();
    moveBall();
    requestAnimationFrame(update);
}

// Start the game
update();

