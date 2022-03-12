const table = document.getElementById("game-table");
let gameMatrix = [];

function createTable() {
    for(let i = 0; i < 3; i++) {
        const tableRow = document.createElement("tr");
        tableRow.setAttribute("id", "row-id-" + i);
        gameMatrix[i] = [];

        for(let j = 0; j < 3; j++) {
            const tableCell = document.createElement("td");
            tableCell.setAttribute("id", "cell-id-" + i + j);

            gameMatrix[i].push(false);

            const cellValue = document.createTextNode(gameMatrix[i][j]);
            tableCell.appendChild(cellValue);
            tableRow.appendChild(tableCell);
        }
        table.appendChild(tableRow);
    }
    return gameMatrix;
}
console.log(gameMatrix);


console.log(createTable())
