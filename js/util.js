'use strict'

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max); 
    return Math.floor(Math.random() * (max - min)) + min;
}

function drawNum(nums) {
    var randIdx = getRandomInt(0, gNums2.length)
    var num = nums[randIdx]
    nums.splice(randIdx, 1)
    return num
}

function resetNums() {
    nums = []
    for (var i = 1; i < 100; i++) {
        nums.push(i)
    }
    return nums
}

function getClassName(location) {
    return `cell-${location.i}-${location.j}`
}

function countNeighbors(cellI, cellJ) {
    var neighborsCount = 0
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue
            if (j < 0 || j >= gBoard[0].length) continue
            neighborsCount++
        }
    }
    return neighborsCount
}

function createMat(ROWS, COLS) {
    const mat = []
    for (var i = 0; i < ROWS; i++) {
        const row = []
        for (var j = 0; j < COLS; j++) {
            row.push('')
        }
        mat.push(row)
    }
    return mat
}

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


