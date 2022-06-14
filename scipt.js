const gameBoard = (() => {
    const board = [];
})();

const displayController = (() => {

})();

const Player = (name) => {
    const sayName = () => console.log(`my name is ${name}`);
    return {sayName};
};

let test = Player('Test');

jeff.sayName()