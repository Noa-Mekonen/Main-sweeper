'use strict'

const MINE = '💥'
const FLAG = '🚩'
const EMPTY = '  '
const COLORS = ['white', 'black', 'green', 'orangered', 'red', 'red', 'red', 'red', 'red', 'red', 'red']


var gBoard
var isFirstClick
var mines = []

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
    gGame.isOn = true
    closeModal()
    mines = []
    isFirstClick = true
    gBoard = buildBoard()
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
                isMarked : false, 
            }

            board[i][j] = cell 
        }
    }
    // board[1][1].isMine = true
    // board[1][2].isMine = true
    // board[1][3].isMine = true

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
                const cell = gBoard[i][j]
                var type
                if (!cell.isShown) type = EMPTY
                if (cell.isShown && !cell.isMine){
                    cell.color = COLORS[cell.minesAroundCount]
                    type = cell.minesAroundCount
                } 
                if (cell.minesAroundCount === 0) type = EMPTY
                if (cell.isMine && cell.isShown) type = MINE 
                

                strHTML += `\t<td style="color: ${cell.color};" onclick="onCellClicked(this, ${i}, ${j})" class="${className}">${type}</td>\n`
            }
            strHTML += '</tr>\n'
        }
    }
    const elContainer = document.querySelector('.board')
    elContainer.innerHTML = strHTML    
}

function setMineInRandomPos(){
    for (var i = 0; i < gLevel.MINES; i++){
        const pos = getEmptyCell()
        mines.push(pos)
        gBoard[pos.i][pos.j].isMine = true
    }
}

function gameOver(){
    for (var i = 0; i < mines.length; i++){
        const pos = mines[i]
        gBoard[pos.i][pos.j].isShown = true
    }
    gGame.isOn = false
    openModal()
    
    console.log('game over');
    // onInit()
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

function openModal(){
    const elModal = document.querySelector('.modal')
    elModal.hidden = false
}

function closeModal(){
    const elModal = document.querySelector('.modal')
    elModal.hidden = true
}

function onHandleKey(event){
    console.log(event);
}