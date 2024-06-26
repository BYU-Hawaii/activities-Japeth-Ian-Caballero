document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const restartButton = document.getElementById('restartButton');
    const carWidth = 40;
    const carHeight = 60;
    const laneWidth = canvas.width / 3; // Divide canvas into 3 lanes
    let playerCar, obstacles, score, gameOver;

    function init() {
        playerCar = { x: laneWidth, y: canvas.height - carHeight - 10, width: carWidth, height: carHeight, lane: 1 };
        obstacles = [];
        score = 0;
        gameOver = false;
        document.getElementById('score').textContent = `Score: ${score}`;
        update();
    }

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
                obstacles[i].y < playerCar.y + playerCar.height &&
                obstacles[i].lane === playerCar.lane
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
            const lane = Math.floor(Math.random() * 3); // Random lane index (0, 1, or 2)
            const x = lane * laneWidth + (laneWidth - carWidth) / 2;
            const y = -carHeight;
            const speed = 2 + Math.random() * 2;
            obstacles.push({ x, y, width: carWidth, height: carHeight, speed, lane });
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
        if (key === 'ArrowLeft' && playerCar.lane > 0) {
            playerCar.lane--;
            playerCar.x = playerCar.lane * laneWidth + (laneWidth - carWidth) / 2;
        } else if (key === 'ArrowRight' && playerCar.lane < 2) {
            playerCar.lane++;
            playerCar.x = playerCar.lane * laneWidth + (laneWidth - carWidth) / 2;
        }
    }

    document.addEventListener('keydown', moveCar);
    restartButton.addEventListener('click', init);
    init();
});
