'use strict';

var gNums;
var gTimmerInterval;
var gLastClickedCell = 0;
var gTimmer = 0;
var gBestTimeEasy = Infinity;
var gBestTimeHard = Infinity;
var gBestTimeExtreme = Infinity;
var gBorderSize = 16;
var elHeader = document.querySelector('th');
//var gElImg = document.querySelector('.fire');  

function init() {
    resetGlobal();
    gNums = genNums();
    renderBoard(gNums);

}

function resetGlobal() {
    gLastClickedCell = 0;
    gTimmer = 0;
    elHeader.innerText = 'Start Game';
    //gElImg.style.display = 'none';
}

function setDifficulty(elDifficulty) {
    
    var elSetHeader = document.querySelector('.header');    

    if (elDifficulty.value === 'Easy') {
        gBorderSize = 16;
        elSetHeader.colSpan = 4;    
    } else if (elDifficulty.value === 'Hard') {
        gBorderSize = 25;
        elSetHeader.colSpan = 5;
    } else if (elDifficulty.value === 'Extreme') {
        gBorderSize = 36;
        elSetHeader.colSpan = 6;
    }
    init();
}


function genNums() {
    var nums = [];
    for (var i = 0; i < gBorderSize; i++) {
        nums.push(i + 1);
    };
    dShuffle(nums);

    return nums;
}

function renderBoard(board) {
    const BOARD_ROW = Math.sqrt(gBorderSize);
    var strHTML = '';
    var boardIDX = 0;
    var className = '';
    for (var i = 0; i < BOARD_ROW; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < BOARD_ROW; j++) {
            strHTML += `<td class="${className}" data-num="${board[boardIDX]}"  onclick="cellClicked(${board[boardIDX]})" >${board[boardIDX]}</td>`;
            boardIDX++;
        }
        strHTML += '</tr>';
    }
    console.log('strHTML',strHTML );
    var elTable = document.querySelector('.board');
    elTable.innerHTML = strHTML;

}


function cellClicked(clickedNum) {

    const GAME_FREQ = 1000;
    var currClickedCell = clickedNum;

    const BEST_TIME = 'Best time: ';
    const HEADR_TXT = 'Last cliked: ';
    //If its the first click we start counting
    
    //i made that if because the user can start the game by pressing on number 1
    //or press the start button - so he can press on both
    if (gLastClickedCell === 0 && (gTimmerInterval === undefined || gTimmerInterval === null)) {
        gTimmerInterval = setInterval(activateTimmer, GAME_FREQ);
    }
    //If the clicked number is the right one we start, else we show wrong message       
    if (gLastClickedCell + 1 === currClickedCell) {

        gLastClickedCell++;
        //I add class for the color of corrct number
        var elCellNum = document.querySelector(`[data-num="${clickedNum}"]`);
        elCellNum.className = 'cliked';

        elHeader.innerText = HEADR_TXT + gLastClickedCell;
        if (gLastClickedCell === gBorderSize) {
            clearInterval(gTimmerInterval);
            gTimmerInterval = null;
            var applauseSound = new Audio('audio/Applause.wav');
            applauseSound.play();
            elHeader.innerText = 'YOU WIN';
            // gElImg.style.display = 'inline';
            setBestTime();
            var elBtnStart = document.querySelector('button');
            elBtnStart.style.visibility = 'visible';

        }
    } else {
        if (gLastClickedCell === gBorderSize) {
            elHeader.innerText = 'Press start over';
        } else if (gLastClickedCell + 1 !== currClickedCell) {
            elHeader.innerText = 'Wrong number!!';
            var failedSound = new Audio('audio/fail.wav');
            failedSound.play();
        }
    };
}

function setBestTime(){
    if (gBorderSize === 16 && gTimmer < gBestTimeEasy) {
        gBestTimeEasy = gTimmer;
        var elTdEasy = document.querySelector('.easyTr');
        elTdEasy.innerText = gBestTimeEasy.toFixed(3);
    } else if (gBorderSize === 25 && gTimmer < gBestTimeHard) {
        gBestTimeHard = gTimmer;
        var elTdHard = document.querySelector('.hardTr');
        elTdHard.innerText = gBestTimeHard.toFixed(3);
    } else if (gBorderSize === 36 && gTimmer < gBestTimeExtreme) {
        gBestTimeExtreme = gTimmer;
        var elTdExtreme = document.querySelector('.extremeTr');
        elTdExtreme.innerText = gBestTimeExtreme.toFixed(3);
    }
}

function activateTimmer() {
    const TIME_PLAY = 'Time play:  ';
    gTimmer += 0.001

    var elPTimmer = document.querySelector('.timmer span');
    elPTimmer.innerText = gTimmer.toFixed(3);

}

