const gameBoard = (() => {
    const board = ['', '', '','', '', '','', '', ''];
    const winConditions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

    const updateBoard = (index, value) => {
        board.splice(index, 1, value);
    }

    const clearBoard = () => {
        board.splice(0, 9, '', '', '','', '', '','', '', '');
    }

    const checkWin = (currentPlayer) => {
        return winConditions.some(winCon => {
            return winCon.every(index => {
                return board[index] === `${currentPlayer.value}`;
            })
        })
    }

    const checkTie = () => {
        return board.some(value => {
            return value === '';
        })
    }

    return {board, winConditions, updateBoard, clearBoard, checkWin, checkTie};
})();

const displayController = (() => {
    const gameGrid = document.querySelector('.game-board');
    const gridCube = document.querySelectorAll('.game-board-cube');
    const currentTurn = document.querySelector('.current-player')

    const populateGrid = () => {
        gridCube.forEach((cube, index) => {
            cube.innerText = gameBoard.board[index];
        });
    };

    const selection = (currentPlayer, updatePlayer, restartGame) => {
        currentTurn.innerText = currentPlayer[0].name;
        gridCube.forEach((cube, index) => {
            cube.addEventListener('click', (e) => {
                if(cube.innerText === '') {
                    gameBoard.updateBoard(index, currentPlayer[0].value);
                    populateGrid();
                    gameBoard.checkWin(currentPlayer[0]) === false ? updatePlayer() : restartGame('win');
                    if (gameBoard.checkTie() === false) restartGame('tie');
                    currentTurn.innerText = currentPlayer[0].name;
                    console.log(gameBoard.board)
                } 
            });
        });
    }

    return {populateGrid, selection}

})();

const Player = (name, value) => {
    return {name, value};
};

const playGame = (() => {
    const playerOne = Player('Player One', 'x');
    const playerTwo = Player('Player Two', 'o');
    let currentPlayer = [playerOne];

    const updatePlayer = () => {
        currentPlayer[0] === playerOne ? currentPlayer.splice(0, 1, playerTwo) : currentPlayer.splice(0, 1, playerOne);
    }

    const restartGame = (condition) => {
        gameBoard.clearBoard()
        displayController.populateGrid()
        condition === 'win' ? console.log(`WINNER ${currentPlayer[0].name}`) : console.log(`TIE`);
        currentPlayer.splice(0, 1, playerOne)
    }

    displayController.selection(currentPlayer, updatePlayer, restartGame)

    return;
})();

// displayController.populateGrid()
// displayController.selection()
// console.log(gameBoard.board)