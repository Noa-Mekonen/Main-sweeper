'use strict'

function onSafeClick(){
    if (gIsSafeBtnClicked) return
    gIsSafeBtnClicked = true
    const pos = getEmptyCell()
    const elCell = document.querySelector(`.cell-${pos.i}-${pos.j}`)
    gBoard[pos.i][pos.j].isShown = true
    elCell.classList.add('safe')

    setTimeout(() => {
        elCell.classList.remove('safe') 
        gBoard[pos.i][pos.j].isShown = false

    }, 1000);
}