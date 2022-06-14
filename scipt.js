const gameBoard = (() => {
    const board = () => ['x', 'x', 'x','o', 'o', 'o','x', 'x', 'x',];

    return {board};
})();

const displayController = (() => {
    const gameGrid = document.querySelector('.game-board');
    const gridCube = document.querySelectorAll('.game-board-cube');

    const populateGrid = () => {
        gameBoard.board().forEach(item => {
            gridCube.forEach(cube => cube.innerText = item);
        });
    };

    return {populateGrid}

})();

const Player = (name) => {
    const sayName = () => console.log(`my name is ${name}`);
    return {sayName};
};

console.log(gameBoard.board())

displayController.populateGrid()