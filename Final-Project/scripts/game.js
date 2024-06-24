document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const carWidth = 40;
    const carHeight = 60;
    const playerCar = { x: canvas.width / 2 - carWidth / 2, y: canvas.height - carHeight - 10, width: carWidth, height: carHeight };
    let obstacles = [];
    let score = 0;
    let gameOver = false;

    function drawCar(car, color) {
        ctx.fillStyle = color;
        ctx.fillRect(car.x, car.y, car.width, car.height);
    }

    function updateObstacles() {
        for (let i = 0; i < obstacles.length; i++) {
            obstacles[i].y += obstacles[i].speed;
            if (obstacles[i].y > canvas.height) {
                obstacles.splice(i, 1);
                i--;
                score++;
                document.getElementById('score').textContent = `Score: ${score}`;
            } else if (
                obstacles[i].y + obstacles[i].height > playerCar.y &&
                obstacles[i].x < playerCar.x + playerCar.width &&
                obstacles[i].x + obstacles[i].width > playerCar.x
            ) {
                gameOver = true;
            }
        }
    }

    function drawObstacles() {
        for (let obstacle of obstacles) {
            drawCar(obstacle, 'red');
        }
    }

    function addObstacle() {
        if (Math.random() < 0.03) {
            const x = Math.random() * (canvas.width - carWidth);
            const y = -carHeight;
            const speed = 2 + Math.random() * 2;
            obstacles.push({ x, y, width: carWidth, height: carHeight, speed });
        }
    }

    function update() {
        if (gameOver) {
            ctx.fillStyle = 'black';
            ctx.font = '30px Arial';
            ctx.fillText('Game Over', canvas.width / 2 - 70, canvas.height / 2);
            return;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawCar(playerCar, 'blue');
        updateObstacles();
        drawObstacles();
        addObstacle();

        requestAnimationFrame(update);
    }

    function moveCar(event) {
        const key = event.key;
        if (key === 'ArrowLeft' && playerCar.x > 0) {
            playerCar.x -= 20;
        } else if (key === 'ArrowRight' && playerCar.x + playerCar.width < canvas.width) {
            playerCar.x += 20;
        }
    }

    document.addEventListener('keydown', moveCar);
    update();
});
