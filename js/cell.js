'use strict'

function onCellClicked(elCell, i, j){
    if (!gGame.isOn) return
    if (isFirstClick){
        gBoard[i][j].isShown = true
        revealNeighbors(i,j)
        setMineInRandomPos()
        setMinesNegsCount(gBoard)
        renderBoard(gBoard)
        isFirstClick = false
        return
    }
    const cell = gBoard[i][j]
    const neigsCount = cell.minesAroundCount
    
    if (cell.isMine){
        elCell.innerText = MINE
        cell.isShown = true
        gameOver()
    } 
    if (neigsCount > 0){
        elCell.innerText = neigsCount
        cell.isShown = true
    }
    renderBoard(gBoard)
    // if (neigsCount === 0) {
    //     revealNeighbors(i,j)
    // }
}

function revealNeighbors(i,j){
    const neighbors = getNeigsArray(i,j)
    for (var i = 0; i < neighbors.length; i++){
        const emptyCell = neighbors[i]
        const cellInBoard = gBoard[emptyCell.i][emptyCell.j]
        cellInBoard.isShown = true
    }
}

function getNeigsArray (cellI,cellJ){
    var neighbors = []
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue
            if (j < 0 || j >= gBoard[0].length) continue
            neighbors.push({i,j})
        }
    }
    return neighbors
}