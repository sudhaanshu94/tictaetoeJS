const boxes = document.querySelectorAll('.box');
const resetButton = document.getElementById('reset');
const msgContainer = document.querySelector('.msg-container');
const msg = document.getElementById('msg');
const newGameButton = document.getElementById('new-btn');

const heading = document.querySelector('h1'); 
heading.addEventListener("mousedown", (e) => e.preventDefault());



let currentPlayer = 'X';
let gameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


function checkWinner() {
    const board = Array.from(boxes).map(box => box.textContent);
    console.log(board);
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return board.includes('') ? null : 'Tie';
}


function handleBoxClick(event) {
    if (!gameActive) return;

    const box = event.target;
    if (box.textContent === '') {
        box.textContent = currentPlayer;
        box.disabled = true;

        const winner = checkWinner();
        
        if (winner) {
            if(winner === 'O'){
                msgContainer.classList.add('winnerbgO');
                msgContainer.classList.remove('winnerbgX');
            }
            else if(winner === 'X'){
                msgContainer.classList.add('winnerbgX');
                msgContainer.classList.remove('winnerbgO');
            }else{
                msgContainer.classList.remove('winnerbgX');
                msgContainer.classList.remove('winnerbgO');
            }
            gameActive = false;
            msg.textContent = winner === 'Tie' ? "It's a Tie!" : `${winner} Wins!`;
            msgContainer.classList.remove('hide');
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function resetGame() {
    boxes.forEach(box => {
        box.textContent = '';
        box.disabled = false;
    });
    currentPlayer = 'X';
    gameActive = true;
    msgContainer.classList.add('hide');
}


boxes.forEach(box => box.addEventListener('click', handleBoxClick));

resetButton.addEventListener('click', resetGame);

newGameButton.addEventListener('click', resetGame);


boxes.forEach(box => {
    box.addEventListener('mouseover', () => {
        if(currentPlayer === 'X')
            box.style.backgroundColor = "rgba(0, 80, 157, 0.4)";
        if(currentPlayer === 'O')
            box.style.backgroundColor = "rgba(253, 197, 0, 0.4)";
    });
    box.addEventListener('mouseout', () => {
        box.style.backgroundColor = ""; 
    });
});
