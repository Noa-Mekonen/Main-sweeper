'use strict'

const MINE = '💥'
const FLAG = '🚩'
const EMPTY = '  '

var gBoard
var gLevel = {
    SIZE: 4,
    MINES: 2 
}
var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0 
}

function onInit(){
    gBoard = buildBoard()
    // setMineInRandomPos()
    setMinesNegsCount(gBoard)
    renderBoard(gBoard)
}

function buildBoard(){
    const board = []

    for (var i = 0; i < gLevel.SIZE; i++) {
        board.push([])

        for (var j = 0; j < gLevel.SIZE; j++) {
            const cell = {
                minesAroundCount : 0,
                isShown : false,
                isMine: false,
                isMarked : false
            }
            board[i][j] = cell 
        }
    }
    board[1][1].isMine = true
    board[1][2].isMine = true
    board[1][3].isMine = true

    // console.table(board)
    return board
}

function renderBoard(board) {
    var strHTML = ''
    
    for (var i = 0; i < board.length; i++) {
        var strHTML = ''
        for (var i = 0; i < board.length; i++) {
            strHTML += '<tr>\n'
            for (var j = 0; j < board[0].length; j++) {
                const className = `cell cell-${i}-${j}`
                var cell
                if (!gBoard[i][j].isShown) cell = EMPTY
                if (gBoard[i][j].isMine && gBoard[i][j].isShown) cell = MINE 
                strHTML += `\t<td onclick="onCellClicked(this, ${i}, ${j})" class="${className}">${cell}</td>\n`
            }
            strHTML += '</tr>\n'
        }
    }
    const elContainer = document.querySelector('.board')
    elContainer.innerHTML = strHTML    
}

function onCellClicked(elCell, i, j){
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
    // if (neigsCount === 0) 
}

function setMineInRandomPos(){
    for (var i = 0; i < gLevel.MINES; i++){
        const pos = getEmptyCell()
        gBoard[pos.i][pos.j].isMine = true
    }
}

function getEmptyCell(){
    var emptyCells = []
    for (var i = 0; i < gBoard.length; i++){
        for(var j = 0; j < gBoard[0].length; j++){
            if (!gBoard[i][j].isShown && !gBoard[i][j].isMine){
                emptyCells.push({i , j})
            }
        }
    }
    const pos = emptyCells[getRandomInt(0,emptyCells.length)]
    return pos
}

function gameOver(){
    console.log('game over');
}

function setMinesNegsCount(board){
    for (var i =0; i < board.length; i++){
        for (var j = 0; j < board[0].length; j++){
            const cell = board[i][j]

            if(!cell.isMine){
                const neigsCount = countMinesNeighbors(i,j)
                cell.minesAroundCount = neigsCount
            }
        }
    }
}

function countMinesNeighbors(cellI, cellJ) {
    var neighborsCount = 0
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue
            if (j < 0 || j >= gBoard[0].length) continue
            const cell = gBoard[i][j]
            if (cell.isMine) neighborsCount++
        }
    }
    return neighborsCount
}

function onSelectLevel(val) {
    if (val === 'Easy'){
        gLevel.SIZE = 4
        gLevel.MINES = 2
    }
    if (val === 'Medium'){
        gLevel.SIZE = 8
        gLevel.MINES = 14
    }
    if (val === 'Hard'){
        gLevel.SIZE = 12
        gLevel.MINES = 32
    }
    onInit()
}