const gameBoard = (() => {
    const board = ['', '', '','', '', '','', '', ''];
    const winConditions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

    const updateBoard = (index, value) => {
        board.splice(index, 1, value);
    };

    const clearBoard = () => {
        board.splice(0, 9, '', '', '','', '', '','', '', '');
    };

    const checkWin = (currentPlayer) => {
        return winConditions.some(winCon => {
            return winCon.every(index => {
                return board[index] === `${currentPlayer.value}`;
            });
        });
    };

    const checkTie = () => {
        return board.some(value => {
            return value === '';
        });
    };

    return {board, winConditions, updateBoard, clearBoard, checkWin, checkTie};
})();

const displayController = (() => {
    const gridCube = document.querySelectorAll('.game-board-cube');
    const currentTurn = document.querySelector('.current-player');
    const modalOutcome = document.querySelector('.game-modal-outcome');
    const endGameModal = document.querySelector('.game-modal');
    const formModal = document.querySelector('.form-modal');
    const formModalSubmit = document.querySelector('.form-modal-container');
    const formModalInputOne = document.querySelector('#player-one');
    const formModalInputTwo = document.querySelector('#player-two');
    const gridCubeIcons = document.querySelectorAll('[data-cube-img]')

    const grabFormSubmit = (updateName) => {
        formModalSubmit.addEventListener('submit', (e) => {
            e.preventDefault();
            updateName(formModalInputOne.value, formModalInputTwo.value)
            formModal.classList.remove('active');
            currentTurn.innerText = formModalInputOne.value;
        })
    }

    const showFormModal = () => {
        formModal.classList.add('active');
    }

    const showEndGameModal = () => {
        endGameModal.classList.add('active');
        endGameModal.addEventListener('click', (e) => {
            endGameModal.classList.remove('active');
        }, {once: true});
    };

    const updateModal = (outcome, winner) => {
        outcome === 'win' ? modalOutcome.innerText = `${winner} Wins!` : modalOutcome.innerText = 'Its a Tie!';
    };

    const populateGrid = () => {
        gridCube.forEach((cube, index) => {
            if (gameBoard.board[index] === 'x') {
                cube.id = gameBoard.board[index];
                gridCubeIcons[index].setAttribute('src', './icons/xmark-solid.svg');
            } else if (gameBoard.board[index] === 'o') {
                cube.id = gameBoard.board[index];
                gridCubeIcons[index].setAttribute('src', './icons/o-solid.svg');
            } else {
                cube.id = gameBoard.board[index];
                gridCubeIcons[index].setAttribute('src', '');
            }
        });
    };

    const selection = (currentPlayer, updatePlayer, restartGame) => {
        currentTurn.innerText = currentPlayer[0].name;
        gridCube.forEach((cube, index) => {
            cube.addEventListener('click', (e) => {
                if (cube.id === '') {
                    gameBoard.updateBoard(index, currentPlayer[0].value);
                    populateGrid();
                    gameBoard.checkWin(currentPlayer[0]) === false ? updatePlayer() : restartGame('win');
                    if (gameBoard.checkTie() === false) restartGame('tie');
                    currentTurn.innerText = currentPlayer[0].name;
                    // console.log(gameBoard.board);
                } 
            });
        });
    };

    return {populateGrid, selection, updateModal, showEndGameModal, showFormModal, grabFormSubmit};
})();

const Player = (name, value) => {
    return {name, value};
};

const playGame = (() => {
    const playerOne = Player('Player One', 'x');
    const playerTwo = Player('Player Two', 'o');
    let currentPlayer = [playerOne];

    const updateName = (nameOne, nameTwo) => {
        playerOne.name = nameOne;
        playerTwo.name = nameTwo;
   }

    const updatePlayer = () => {
        currentPlayer[0] === playerOne ? currentPlayer.splice(0, 1, playerTwo) : currentPlayer.splice(0, 1, playerOne);
    }

    const restartGame = (condition) => {
        gameBoard.clearBoard();
        displayController.populateGrid();
        condition === 'win' ? displayController.updateModal(condition, currentPlayer[0].name) : displayController.updateModal('tie');
        displayController.showEndGameModal()
        currentPlayer.splice(0, 1, playerOne);
    }

    displayController.showFormModal();
    displayController.grabFormSubmit(updateName);
    displayController.selection(currentPlayer, updatePlayer, restartGame, updateName);
    return;
})();