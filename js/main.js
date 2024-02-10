'use strict'

const MINE = '💥'
const FLAG = '🚩'
const EMPTY = '  '
const COLORS = ['white', 'black', 'green', 'orangered', 'red', 'red', 'red', 'red', 'red', 'red']
const HEART = '❤️'

const LOSE_SMILEY = '😒'
const OPEN_NEIGS_SMILY = '🤠'
const DEFAULT_SMILEY = '😊'
const FLAG_SMILEY = '😮'
const WIN_SMILEY = '😍'
const MINE_SMILEY = '😰'

var gRecordFunction
var gIsSafeBtnClicked 
var gFlags
var gSeconds
var gMilliSeconds
var gIntervalId
var gCurrLives
var gBoard
var isFirstClick
var mines = []
var gLevel = {
    SIZE: 4,
    MINES: 2, 
    LIVES: 2
}
var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0 
}

function onInit(){
    document.getElementById("record").innerHTML = localStorage.getItem("BestLevel1");
    document.querySelector('.second').innerText = '00'
    document.querySelector('.millisecond').innerText = '000'

    gGame.markedCount = 0
    gIsSafeBtnClicked = false
    gFlags = gLevel.MINES
    gGame.isOn = true
    isFirstClick = true
    mines = []

    clearInterval(gIntervalId)
    closeModal()
    gBoard = buildBoard()

    renderBoard(gBoard)
    gCurrLives = gLevel.LIVES
    renderLives()  

    updateSmiley(DEFAULT_SMILEY)
    renderFlags()
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
    return board
}

function renderBoard(board) {
    var strHTML = ''
    
    for (var i = 0; i < board.length; i++) {
        var strHTML = ''
        for (var i = 0; i < board.length; i++) {
            strHTML += '<tr>\n'
            for (var j = 0; j < board[0].length; j++) {
                var className = `cell cell-${i}-${j}`
                const cell = gBoard[i][j]
                var type

                if (!cell.isShown) type = EMPTY
                if (cell.isShown && !cell.isMine){
                    cell.color = COLORS[cell.minesAroundCount]
                    type = cell.minesAroundCount
                    className +=  ' opened'
                } 
                if (cell.minesAroundCount === 0){
                    type = EMPTY
                }
                if (cell.isMine && cell.isShown) type = MINE 
                if (cell.isMarked) type = FLAG
                

                strHTML += `\t<td style="color: ${cell.color};" oncontextmenu="rightClick(event, ${i}, ${j})" onclick="onCellClicked(this, ${i}, ${j})" class="${className}">${type}</td>\n`
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

function gameOver(isVictory){
    clearInterval(gIntervalId)

    for (var i = 0; i < mines.length; i++){
        const pos = mines[i]
        gBoard[pos.i][pos.j].isShown = true
        gBoard[pos.i][pos.j].isMarked = false
        renderBoard(gBoard)
    }  
    if(!isVictory){
        updateSmiley(LOSE_SMILEY)
        openModal(false)
    } 
    else{
        if(gLevel.SIZE === 4) updateRecord(gSeconds , gMilliSeconds)


 
        updateSmiley(WIN_SMILEY)
        openModal(true)
    } 
    gGame.isOn = false
}

function checkIsVictory(){
    if(countAllShownCells() !== gLevel.SIZE**2-gLevel.MINES) return 
    if(gGame.markedCount !== gLevel.MINES) return 

    gameOver(true)
}

function countAllShownCells(){
    var countShown = 0
    for(var i = 0; i < gBoard.length; i++){
        for(var j = 0; j < gBoard[0].length; j++){
            if (gBoard[i][j].isShown) countShown++
        }
    }
    return countShown
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

function startTimer(){
    if(gIntervalId) clearInterval(gIntervalId)

    var startTime = Date.now()
    gIntervalId = setInterval(()=> {
        const timeDiff = Date.now() - startTime

        gSeconds = getFormatSeconds(timeDiff)
        gMilliSeconds = getFormatMilliSeconds(timeDiff)
        document.querySelector('.second').innerText = gSeconds
        document.querySelector('.millisecond').innerText = gMilliSeconds
    })
}

function getFormatSeconds(timeDiff) {
    const seconds = Math.floor(timeDiff / 1000)
    return (seconds + '').padStart(2, '0')
}

function getFormatMilliSeconds(timeDiff) {
    const milliSeconds = new Date(timeDiff).getMilliseconds()
    return (milliSeconds + '').padStart(3, '0')
}

function onSelectLevel(val) {
    const elFirstRecord = document.querySelector('.record')

    if (val === 'Easy'){
        gLevel.SIZE = 4
        gLevel.MINES = 2
        gLevel.LIVES = 2
        elFirstRecord.classList.remove('hidden')
    }
    if (val === 'Medium'){
        gLevel.SIZE = 8
        gLevel.MINES = 14
        gLevel.LIVES = 3
        elFirstRecord.classList.add('hidden')
    }
    if (val === 'Hard'){
        gLevel.SIZE = 12
        gLevel.MINES = 32
        gLevel.LIVES = 4
        elFirstRecord.classList.add('hidden')
    }
    onInit()
}

function openModal(isVictory){
    const elModal = document.querySelector('.modal')
    elModal.hidden = false
    const elResult = document.querySelector('.result')
    elResult.innerText = isVictory ? 'YOU WON!!' : 'MAYBE NEXT TIME..'
}

function closeModal(){
    const elModal = document.querySelector('.modal')
    elModal.hidden = true
}



