const GameBoard = (function () {
    const grid = [[' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' ']];
    const placeMarker = function (x, y, marker) {
        grid[x][y] = marker;
    }
    const clearBoard = function () {
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid.length; j++) {
                grid[i][j] = ' ';
            }
        }
    }
    return { grid, placeMarker, clearBoard };
})();

const CheckGameState = (function () {

    let a, b, c;

    let winCon = [];

    let tie = [];

    const getBoard = function () {
        [a, b, c] = GameBoard.grid;
        return [a, b, c];
    }

    const checkHorizontal = function () {
        getBoard();
        for (let i = 0; i < GameBoard.grid.length; i++) {
            if ((a[i] === a[i + 1] &&
                a[i] === a[i + 2] && a[i] != ' ') ||
                (b[i] === b[i + 1] &&
                    b[i] === b[i + 2] && b[i] != ' ') ||
                (c[i] === c[i + 1] &&
                    c[i] === c[i + 2] && c[i] != ' ')) {
                winCon.push(null);
                break;
            } else {
                break;
            }
        }
    }

    const checkVertical = function () {
        getBoard();
        for (let i = 0; i < GameBoard.grid.length; i++) {
            if ((a[i] === b[i] && a[i] === c[i] && a[i] != ' ') ||
                (a[i + 1] === b[i + 1] && a[i + 1] === c[i + 1] && a[i + 1] != ' ') ||
                (a[i + 2] === b[i + 2] && a[i + 2] === c[i + 2] && a[i + 2] != ' ')) {
                winCon.push(null);
                break;
            } else {
                break;
            }
        }
    }

    const checkDiagonal = function () {
        getBoard();
        for (let i = 0; i < GameBoard.grid.length; i++) {
            if (b[1] === ' ') {
                break;
            }
            if (a[i] === b[i + 1] &&
                a[i] === c[i + 2] ||
                a[i + 2] === b[i + 1] &&
                a[i + 2] === c[i]) {
                winCon.push(null);
                break;
            } else {
                break;
            }
        }
    }

    const checkTie = function () {
        getBoard();
        let arr = a.concat(b, c);
        if (!arr.includes(' ') && !winCon.includes(null)) {
            tie.push(null);
        }
    }

    const reset = function () {
        winCon.pop();
        tie.pop();
    }

    return { winCon, tie, checkHorizontal, checkVertical, checkDiagonal, checkTie, reset };
})();

const computerPlayer = {
    marker: 'O',

    a: null,

    b: null,

    win: 0,

    reset: function () {
        this.win = 0;
    },

    computerPicker: function () {
        function randomize() {
            computerPlayer.a = Math.floor(Math.random() * 3);
            computerPlayer.b = Math.floor(Math.random() * 3);
        }
        randomize();
        while (GameBoard.grid[computerPlayer.a][computerPlayer.b] != ' ') {
            randomize();
        }
        GameBoard.placeMarker(computerPlayer.a, computerPlayer.b, computerPlayer.marker)
        return GameBoard.grid;
    }
}

const userPlayer = {
    marker: 'X',

    win: 0,

    reset: function () {
        this.win = 0;
    }
}

const board = document.querySelector('.board-container')

board.addEventListener('click', (e) => {
    if (!e.target.getAttribute('data-coordinate')) {
        return;
    }
    let arr = e.target.getAttribute('data-coordinate').split('');
    let [a, b] = arr;
    if (GameBoard.grid[a][b] != ' ') {
        alert('Please pick a different tile.');
        return;
    }
    GameBoard.placeMarker(a, b, `${userPlayer.marker}`);
    e.target.textContent = `${userPlayer.marker}`;
    CheckGameState.checkTie();
    if (CheckGameState.tie.length > 0) {
        return;
    }
    CheckGameState.checkHorizontal();
    CheckGameState.checkVertical();
    CheckGameState.checkDiagonal();
    if (CheckGameState.winCon.length > 0) {
        userPlayer.win = 1;
        return;
    }
    computerPlayer.computerPicker();
    CheckGameState.checkHorizontal();
    CheckGameState.checkVertical();
    CheckGameState.checkDiagonal();
    let cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        if (cell.getAttribute('data-coordinate') === `${computerPlayer.a}` + `${computerPlayer.b}`) {
            cell.textContent = `${computerPlayer.marker}`
        }
    })
    if (CheckGameState.winCon.length > 0) {
        computerPlayer.win = 1;
        return;
    }
})

board.addEventListener('click', (e) => {
    if (!e.target.getAttribute('data-coordinate')) {
        return;
    }
    if (userPlayer.win > 0) {
        document.querySelector('dialog').showModal();
        document.querySelector('.winner').innerHTML = `<span>${userPlayer.marker}</span><br>won!`;
        return;
    } else if (computerPlayer.win > 0) {
        document.querySelector('dialog').showModal();
        document.querySelector('.winner').innerHTML = `<span>${computerPlayer.marker}</span><br>won!`;
        return;
    } else if (CheckGameState.tie.length > 0) {
        document.querySelector('dialog').showModal();
        document.querySelector('.winner').textContent = `It's a tie!`;
        return;
    }
})

document.querySelector('dialog').addEventListener('close', () => {
    GameBoard.clearBoard();
    computerPlayer.reset();
    userPlayer.reset();
    CheckGameState.reset();
    let cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.textContent = ' ');
})

document.querySelector('.btn').addEventListener('click', () => {
    document.querySelector('dialog').close();
})