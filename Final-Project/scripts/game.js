document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('game-container');

    const gameDescription = document.createElement('p');
    gameDescription.textContent = 'Guess the number I\'m thinking of between 1 and 100!';
    gameContainer.appendChild(gameDescription);

    const input = document.createElement('input');
    input.type = 'number';
    input.min = 1;
    input.max = 100;
    gameContainer.appendChild(input);

    const button = document.createElement('button');
    button.textContent = 'Guess';
    gameContainer.appendChild(button);

    const result = document.createElement('p');
    gameContainer.appendChild(result);

    const numberToGuess = Math.floor(Math.random() * 100) + 1;

    button.addEventListener('click', () => {
        const userGuess = parseInt(input.value);
        if (userGuess === numberToGuess) {
            result.textContent = 'Congratulations! You guessed it right!';
        } else if (userGuess < numberToGuess) {
            result.textContent = 'Too low! Try again.';
        } else {
            result.textContent = 'Too high! Try again.';
        }
    });
});
