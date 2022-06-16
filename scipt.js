const gameBoard = (() => {
    // const board = ['x', 'x', 'x','o', 'o', 'o','x', 'x', 'x'];
    const board = ['', '', '','', '', '','', '', ''];
    const winConditions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

    const updateBoard = (index, value) => {
        board.splice(index, 1, value);
    }

    const checkWin = () => {
        let check = winConditions.some(winCon => {
            console.log(winCon)
            return winCon.every(e => {
                console.log(board[e] === 'x')
                return board[e] === 'x';
            })
        })
        console.log(check)
    }

    return {board, winConditions, updateBoard, checkWin};
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
                gameBoard.checkWin()
                // console.log(gameBoard.checkWin.value)
                // console.log(playGame.currentPlayer)
                // console.log(index);
                // console.log(gameBoard.board);
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

let numbers = [1, 3, 5];
let result = numbers.every(function (e) {
    console.log(e)
    return e > 0;
});

console.log(result);