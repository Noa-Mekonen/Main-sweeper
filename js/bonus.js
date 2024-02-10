'use strict'

function onSafeClick(){
    if (!gGame.isOn) return
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

function updateRecord(seconds , milliSeconds){
    console.log(localStorage.BestLevel1);
    if(localStorage.BestLevel1){
        var times = (localStorage.getItem("BestLevel1").split(':'))
        if(seconds < +times[0] || seconds === +times[0] && milliSeconds > +times[1]){
           localStorage.setItem("BestLevel1", seconds+':'+milliSeconds);
           const elTimer = document.getElementById("record").innerHTML
           elTimer.innerText = localStorage.getItem("BestLevel1");
        }
    }else{
        localStorage.setItem("BestLevel1", seconds+':'+milliSeconds)
        const elTimer = document.getElementById("record").innerHTML
        elTimer.innerText = localStorage.getItem("BestLevel1");
    }
}
