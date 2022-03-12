const table = document.getElementById("game-table");

function createTable() {
    const gameMatrix = [];
    let count = 0;

    for(let i = 0; i < 3; i++) {
        gameMatrix[i] = [];
        const tableRow = document.createElement("tr");
        tableRow.classList.add("row-id-" + i);
        
        for(let j = 0; j < 3; j++) {
            const tableCell = document.createElement("td");
            tableCell.classList.add("cell-id-" + count);
            gameMatrix[i].push(false);
            tableRow.appendChild(tableCell);
            count++;
        }
        table.appendChild(tableRow);
    }
    return console.log(gameMatrix);
}

createTable();