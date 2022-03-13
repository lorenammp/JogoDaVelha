const table = document.getElementById("game-table");
const gameMatrix = [];
let gameArr = [];
let availableCells = [];
let cellValue = 1;


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

let count = 0;

let winner;

while(winner == false) {

}

function selectRandom(arr) {
    return arr[Math.floor((Math.random() * arr.length))];
}

function computerClick(id) {
    document.getElementById(id).click();
}

function computerPlay(id) {
    let clickId = 0;


    for(let i = 0; i < 9; i++) {
        if(gameArr[i] % 2 !== 0 && Number.isInteger(gameArr[i])) {
            availableCells.push(gameArr[i]);
        }
    }

    console.log(availableCells.length);
    console.log("Slice arr: " + availableCells);

    if(availableCells.length == 0) {
        for(let i = 0; i < 9; i++) {
            if(Number.isInteger(gameArr[i])) {
                availableCells.push(gameArr[i]);
            }
        }
    }
    console.log("Random: " + selectRandom(availableCells));

    clickId = selectRandom(availableCells);
    availableCells = [];
    computerClick("cell-id-" + clickId);


    console.log("Id: " + id);
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

function winCheck() {

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

        for(let i = 1; i <= 9; i++) {
            if(e.target.id == "cell-id-" + i) {
                gameArr[i-1] = e.target.innerText;

                arrToMatrix(gameArr, 3);

                if(count % 2 !== 0 && count < 8)
                    computerPlay(i);
            }
        }
        console.log(gameArr);
    }    
}

for(let i = 1; i <= 9; i++) {
    const cellClick = document.getElementById("cell-id-" + i);
    cellClick.addEventListener("click", makePlay);
}
