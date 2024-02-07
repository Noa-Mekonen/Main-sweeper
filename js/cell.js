'use strict'


function rightClick(clickEvent, elCell,i,j) { 
    gGame.markedCount++
    console.log('flags: ',gGame.markedCount);
    clickEvent.preventDefault();
    if(isFirstClick) return
    if(gBoard[i][j].isShown) return
    gBoard[i][j].isMarked = true
    renderBoard(gBoard)
}

function onCellClicked(elCell, i, j){
    if (!gGame.isOn) return

    if (isFirstClick){
        gBoard[i][j].isShown = true
        revealNeighbors(i,j)
        setMineInRandomPos()
        setMinesNegsCount(gBoard)
        isFirstClick = false
    }
    const cell = gBoard[i][j]
    const neigsCount = cell.minesAroundCount

    if (cell.isMarked){
        gGame.markedCount--
        cell.isMarked = false
        // return renderBoard(gBoard)
    } 
    if (cell.isMine){
        elCell.innerText = MINE
        cell.isShown = true
        if (gCurrLives) handleLives(i,j)
        else gameOver(false)
    } 
    if (neigsCount > 0){
        elCell.innerText = neigsCount
        cell.isShown = true
        gGame.shownCount++
        console.log('shownCount: ', gGame.shownCount);
        // if(isVictory) return gameOver(true)
    }
    if (neigsCount === 0 && !cell.isMine) {
        revealNeighbors(i, j) 
        // if(isVictory) return gameOver(true)
    }
    renderBoard(gBoard)
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
            if (j < 0 || j >= gBoard[0].length) continue
            neighbors.push({i,j})
        }
    }
    return neighbors
}
