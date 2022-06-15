const gameBoard = (() => {
    const board = () => ['x', 'x', 'x','o', 'o', 'o','x', 'x', 'x'];

    return {board};
})();

const displayController = (() => {
    const gameGrid = document.querySelector('.game-board');
    const gridCube = document.querySelectorAll('.game-board-cube');

    const populateGrid = () => {
        gridCube.forEach((cube, index) => {
            cube.innerText = gameBoard.board()[index];
        });
    };

    // const selection = () => {
    //     gridCube.forEach(cube => {
    //         cube.addEventListener('click', (e) => {
    //             console.log(cube.innerText)
    //         })
    //     })
    // }

    return {populateGrid, selection}

})();

const Player = (name) => {
    const sayName = () => console.log(`my name is ${name}`);
    return {sayName};
};

console.log(gameBoard.board())

displayController.populateGrid()
displayController.selection()