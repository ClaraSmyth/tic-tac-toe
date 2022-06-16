const gameBoard = (() => {
    // const board = ['x', 'x', 'x','o', 'o', 'o','x', 'x', 'x'];
    const board = ['', '', '','', '', '','', '', ''];

    const updateBoard = (index, value) => {
        board.splice(index, 1, value);
    }

    return {board, updateBoard};
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
                gameBoard.updateBoard(index, playGame.currentPlayer[0].value);
                populateGrid();
                playGame.updatePlayer()
                console.log(playGame.currentPlayer)
                console.log(index);
                console.log(gameBoard.board);
            },{once: true});
        });
    }

    return {populateGrid, selection}

})();

const Player = (name, value) => {
    return {name, value};
};

const playGame = (() => {
    const playerOne = Player('Clara', 'x');
    const playerTwo = Player('Computer', 'o');
    let currentPlayer = [playerOne];

    const updatePlayer = () => {
        currentPlayer[0] === playerOne ? currentPlayer.splice(0, 1, playerTwo) : currentPlayer.splice(0, 1, playerOne);
    }

    displayController.selection()

    return {currentPlayer, updatePlayer};
})();

// displayController.populateGrid()
// displayController.selection()
// console.log(gameBoard.board)
