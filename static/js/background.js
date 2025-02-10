(function() {
    const canvas = document.getElementById("background-canvas");
    const ctx = canvas.getContext("2d");

    // Set canvas dimensions to fill the window.
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Draw a simple maze-like grid.
    function drawMaze() {
        const cellSize = 50;
        ctx.strokeStyle = "rgba(64, 64, 64, 0.5)"; // dark gray lines
        ctx.lineWidth = 2;

        // Draw vertical grid lines
        for (let x = 0; x <= canvas.width; x += cellSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }
        // Draw horizontal grid lines
        for (let y = 0; y <= canvas.height; y += cellSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }

        // (Optional) More complex maze drawing can be implemented here.
    }

    // Create and animate dark purple balls.
    let balls = [];
    function initBalls(num) {
        for (let i = 0; i < num; i++) {
            balls.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: 5 + Math.random() * 10,
                vx: -1 + Math.random() * 2, // Horizontal speed
                vy: -1 + Math.random() * 2  // Vertical speed
            });
        }
    }

    function drawBalls() {
        ctx.fillStyle = "darkviolet"; // Dark purple
        balls.forEach(ball => {
            ctx.beginPath();
            ctx.arc(ball.x, ball.y, ball.r, 0, 2 * Math.PI);
            ctx.fill();
        });
    }

    function updateBalls() {
        balls.forEach(ball => {
            ball.x += ball.vx;
            ball.y += ball.vy;
            // Bounce off canvas edges.
            if (ball.x - ball.r < 0 || ball.x + ball.r > canvas.width) ball.vx *= -1;
            if (ball.y - ball.r < 0 || ball.y + ball.r > canvas.height) ball.vy *= -1;
        });
    }

    // Main animation loop.
    function animate() {
        // Clear the canvas with a solid black fill.
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw the maze grid.
        drawMaze();
        // Update and draw the moving balls.
        updateBalls();
        drawBalls();
        requestAnimationFrame(animate);
    }

    initBalls(20); // Initialize 20 moving balls.
    animate();
})(); 