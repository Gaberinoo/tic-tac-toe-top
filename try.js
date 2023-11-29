const GameBoard = (function (){
    const firstRow = [ , , ,
                       , , ,
                       , , , ];
    const placeMarker = function(spot, x, marker){
        spot[x] = marker;
        logBoard();
    }
    const logBoard = function() {
        console.log(firstRow);
    }; 
    return { firstRow, placeMarker, logBoard };
})();

const GameBoar = (function (){
    const firstRow = [,,,];
    const secondRow = [,,,];
    const thirdRow = [,,,];
    const placeMarker = function(spot, x, marker){
        spot[x] = marker;
        logBoard();
    }
    const logBoard = function() {
        console.log(firstRow);
        console.log(secondRow);
        console.log(thirdRow);
    }; 
    return { firstRow, secondRow, thirdRow, placeMarker, logBoard };
})();

const checkHorizontal = function() {
    outerLoop: for (let i = 0; i < GameBoard.row.length; i++) {
        for (let j = 0; j < GameBoard.row.length; i++) {
            if (GameBoard.row[i][j] === ' ' &&
                GameBoard.row[i][j + 1] === ' ' &&
                GameBoard.row[i][j + 2] === ' ') {
                console.log('not yet');
                break;
            }
            if (GameBoard.row[i][j] === GameBoard.row[i][j + 1] &&
                GameBoard.row[i][j] === GameBoard.row[i][j + 2]) {
                console.log('you win');
                break outerLoop;
            } else {
                console.log('not yet');
                break;
            }
        }
    }
}