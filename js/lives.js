'use strict'

function renderLives(){
    var strHTML = ''
    for(var i = 0; i < gCurrLives; i++){
        strHTML += HEART
    }
    const elLives = document.querySelector('.lives span')
    elLives.innerHTML = strHTML  
}

function handleLives(i, j){
    gBoard[i][j].isShown = true
    renderBoard(gBoard)
    setTimeout(()=>{
        gBoard[i][j].isShown = false
        renderBoard(gBoard)
    },1000)
    gCurrLives--
    renderLives()
}

function renderFlags(){
    const elFlags = document.querySelector('.flags')
    elFlags.innerText = gFlags
}