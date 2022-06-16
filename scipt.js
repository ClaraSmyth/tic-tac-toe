const gameBoard = (() => {
    // const board = ['x', 'x', 'x','o', 'o', 'o','x', 'x', 'x'];
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

    return {board, winConditions, updateBoard, clearBoard, checkWin};
})();

const displayController = (() => {
    const gameGrid = document.querySelector('.game-board');
    const gridCube = document.querySelectorAll('.game-board-cube');

    const populateGrid = () => {
        gridCube.forEach((cube, index) => {
            cube.innerText = gameBoard.board[index];
        });
    };

    const selection = () => {
        gridCube.forEach((cube, index) => {
            cube.addEventListener('click', (e) => {
                if(cube.innerText === '') {
                    gameBoard.updateBoard(index, playGame.currentPlayer[0].value);
                    populateGrid();
                    gameBoard.checkWin(playGame.currentPlayer[0]) === false ? playGame.updatePlayer() : playGame.restartGame();
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
    const playerOne = Player('Clara', 'x');
    const playerTwo = Player('P2', 'o');
    let currentPlayer = [playerOne];

    const updatePlayer = () => {
        currentPlayer[0] === playerOne ? currentPlayer.splice(0, 1, playerTwo) : currentPlayer.splice(0, 1, playerOne);
    }

    const restartGame = () => {
        console.log(`Winner is ${currentPlayer[0].name}`)
        gameBoard.clearBoard()
        displayController.populateGrid()
    }

    displayController.selection()

    return {currentPlayer, updatePlayer, restartGame};
})();

// displayController.populateGrid()
// displayController.selection()
// console.log(gameBoard.board)