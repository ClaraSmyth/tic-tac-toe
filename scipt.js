const gameBoard = (() => {
    // const board = ['x', 'x', 'x','o', 'o', 'o','x', 'x', 'x'];
    const board = ['', '', '','', '', '','', '', ''];

    const updateBoard = (value) => {
        board.splice(value, 1, 'x');
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
                gameBoard.updateBoard(index)
                populateGrid()
                console.log(index)
                console.log(gameBoard.board)
            })
        })
    }

    return {populateGrid, selection}

})();

const Player = (name) => {
    const sayName = () => console.log(`my name is ${name}`);
    return {sayName};
};


displayController.populateGrid()
displayController.selection()
console.log(gameBoard.board)