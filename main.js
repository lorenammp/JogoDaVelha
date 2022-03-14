const table = document.getElementById("game-table");
const gameMatrix = [];
let gameArr = [];
let availableCells = [];
let cellValue = 1;
let count = 0;
let winner = false;

for(let i = 0; i < 3; i++) {
    const tableRow = document.createElement("tr");
    tableRow.setAttribute("id", "row-id-" + i);

    for(let j = 0; j < 3; j++) {
        const tableCell = document.createElement("td");
        tableCell.setAttribute("id", "cell-id-" + cellValue);

        gameArr.push(cellValue);

        tableRow.appendChild(tableCell);
        cellValue++;
    }
    table.appendChild(tableRow);
}

function selectRandom(arr) {
    return arr[Math.floor((Math.random() * arr.length))];
}

function computerClick(id) {
    document.getElementById(id).click();
}

function findTwos(matrix) {
    let count = 0, countNum = 0;
    let char;
    for(let i = 0; i < matrix.length; i++) {
        for(let j = 0; j < matrix[i].length; i++) {
            if(Number.isInteger(matrix[i][j]) === false) {
                if(char == matrix[i][j]) {
                    count++;
                }
                char = matrix[i][j];
            }
            else {
                countNum++;
            }
        }
        count = 0;
        countNum = 0;
    }
    
}

function computerPlay(id) {
    let clickId = 0;

    for(let i = 0; i < 9; i++) {
        if(gameArr[i] % 2 !== 0 && Number.isInteger(gameArr[i])) {
            availableCells.push(gameArr[i]);
        }
    }

    if(availableCells.length == 0) {
        for(let i = 0; i < 9; i++) {
            if(Number.isInteger(gameArr[i])) {
                availableCells.push(gameArr[i]);
            }
        }
    }

    clickId = selectRandom(availableCells);
    availableCells = [];
    computerClick("cell-id-" + clickId);
}

function arrToMatrix(arr, rowNum) {
    for(let i = 0, k = -1; i < arr.length; i++) {
        if(i % rowNum === 0) {
            k++;
            gameMatrix[k] = [];
        }
        gameMatrix[k].push(arr[i]);
    }

    console.table(gameMatrix);
    return gameMatrix;
}

const allEqual = arr => arr.every(v => v === arr[0])

const arrayColumn = (arr, n) => arr.map(x => x[n]);

function getDiagonals(arr, n) {
    const newArray = [];
    if(n === 1) {
        for(let i = 0; i < arr.length; i++) {
            for(j = 0; j < arr[i].length; j++) {
                if(i === j) {
                    newArray.push(arr[i][j]);
                } 
            }
        }
    }

    else {
        for(let i = 0; i < arr.length; i++) {
            for(j = 0; j < arr[i].length; j++) {
                if(i === 0 && j === 2) {
                    newArray.push(arr[i][j]);
                }
                else if(i === 1 && j === 1) {
                    newArray.push(arr[i][j]);
                }
                else if(i === 2 && j === 0) {
                    newArray.push(arr[i][j]);
                }
            }
        }
    }
    console.log("Diagonal: " + newArray);
    return newArray;
}

function winCheck(matrix) {
    for(let i = 0; i < 3; i++) {
        if(allEqual(matrix[i])) {
            winner = true;
        }
        if(allEqual(arrayColumn(matrix,i))) {
            winner = true;
        }
        if(allEqual(getDiagonals(matrix, 1))) {
            winner = true;
        }
        if(allEqual(getDiagonals(matrix, 2))) {
            winner = true;
        }
    }

    console.log(arrayColumn(matrix,0));
    console.log(allEqual(matrix[0]));
    return winner;
}

function makePlay(e) {
    if(e.target.innerText == "") {
        if(count % 2 === 0) {
            e.target.innerText = "X";
        }
        else {
            e.target.innerText = "O";
        }
        count++;
        console.log("Count: " + count);
        console.log("Winner: " + winner);
        for(let i = 1; i <= 9; i++) {
            if(e.target.id == "cell-id-" + i) {
                gameArr[i-1] = e.target.innerText;

                if(winCheck(arrToMatrix(gameArr, 3))) {
                    for(let i = 1; i <= 9; i++) {
                        const cellClick = document.getElementById("cell-id-" + i);
                        cellClick.removeEventListener("click", makePlay);
                    }
                }
                
                else if(count % 2 !== 0 && count < 8)
                    computerPlay(i);
            }
        }
        console.log("Gamearr: " + gameArr);
    }    
}

function resetBoard() {
    gameArr = [];
    count = 0;
    winner = false;
    
    for(let i = 1; i <= 9; i++) {
        const cellId = document.getElementById("cell-id-" + i);
        cellId.innerText = "";
        gameArr.push(i);
    }

    for(let i = 1; i <= 9; i++) {
        const cellClick = document.getElementById("cell-id-" + i);
        cellClick.addEventListener("click", makePlay);
    }
}

for(let i = 1; i <= 9; i++) {
    const cellClick = document.getElementById("cell-id-" + i);
    cellClick.addEventListener("click", makePlay);
}

const resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", resetBoard);