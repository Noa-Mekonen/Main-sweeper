'use strict'

function rightClick(clickEvent,i,j) { 
    if(gBoard[i][j].isMarked) return
    gGame.markedCount++
    clickEvent.preventDefault();
    if(isFirstClick) return
    if(gBoard[i][j].isShown) return
    gBoard[i][j].isMarked = true
    updateSmiley(FLAG_SMILEY)
    checkIsVictory()
    gFlags--
    renderFlags()
    renderBoard(gBoard)
}

function onCellClicked(elCell, i, j){
    if (!gGame.isOn) return

    if (isFirstClick){
        startTimer()
        gBoard[i][j].isShown = true
        revealNeighbors(i,j)
        setMineInRandomPos()
        setMinesNegsCount(gBoard)
        isFirstClick = false
        updateSmiley(OPEN_NEIGS_SMILY)
    }
    const cell = gBoard[i][j]
    const neigsCount = cell.minesAroundCount

    if (cell.isMarked){
        gFlags++
        renderFlags()
        gGame.markedCount--
        cell.isMarked = false
    } 
    if (cell.isMine){
        updateSmiley(MINE_SMILEY)
        elCell.innerText = MINE
        cell.isShown = true
        if (gCurrLives) handleLives(i,j)
        else {
            gameOver(false)
        }    
    } 
    if (neigsCount > 0){
        elCell.innerText = neigsCount
        cell.isShown = true
        gGame.shownCount++
        updateSmiley(DEFAULT_SMILEY)
        checkIsVictory()
    }
    if (neigsCount === 0 && !cell.isMine) {
        revealNeighbors(i, j) 
        updateSmiley(OPEN_NEIGS_SMILY)
        checkIsVictory()
    }
    renderBoard(gBoard)
}

function revealNeighbors(i,j){
    const neighbors = getNeigsArray(i,j)
    for (var i = 0; i < neighbors.length; i++){
        
        const emptyCell = neighbors[i]
        const cellInBoard = gBoard[emptyCell.i][emptyCell.j]
        cellInBoard.isShown = true
        cellInBoard.isMarked = false
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

function updateSmiley(img){
    const elSmiley = document.querySelector('.smiley')
    elSmiley.innerHTML = img
}
