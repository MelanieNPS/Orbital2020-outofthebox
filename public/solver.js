var k;
var clickmode = false;
erase = false;

function toggleclick(){
    if(clickmode){
        clickmode=false;
        document.getElementById("click").style.backgroundColor="#1a777a";
    }
    else{
        clickmode=true;
        document.getElementById("click").style.backgroundColor="rgb(61,4,39)";
        if(erase){
            erase=false;
            document.getElementById("erase").style.backgroundColor="#1a777a";
        }
    }
}
function Erase(){
    if(erase){
        erase=false;
        document.getElementById("erase").style.backgroundColor="#1a777a";
    }
    else{
        erase=true;
        if(clickmode){
            clickmode=false;
            document.getElementById("click").style.backgroundColor="#1a777a";
        }
        document.getElementById("erase").style.backgroundColor="rgb(61,4,39)";
    }
}
function Reset(){
    var c = document.getElementsByClassName("cellnumber");
    for (let i = 0; i<81; i++){
        c[i].innerHTML = "";
    }
}



function group(){
    let cellnumber = document.getElementsByClassName("cellnumber");
    for(let i=0;i<9;i++){
        for(let j=0; j<9; j++){
            let c = document.getElementById("cell" + i + j);
            let index = (i * 9) + j;
            c.addEventListener("click",change);
            c.addEventListener("click", eraseCell)
            c.addEventListener("keypress",keyboard);
            function keyboard(event){
                let h=event.key;
                var numbers = /^[1-9]+$/;
                if (numbers.test(h)){       //Only allow control from 1 to 9
                    cellnumber[index].innerHTML=h;
                } else {
                    cellnumber[index].innerHTML = "&nbsp";
                }
            }
            
            function change(){
                if(clickmode && k!==undefined){
                    cellnumber[index].innerHTML = k;    
                } 
            }

            function eraseCell(){
                if(erase){
                    cellnumber[index].innerHTML = "&nbsp";
                } else {}
            }
        }
    }
}

function choose(i){
    k=i+1;
}
group();
 

var control = document.getElementById("control");
var numbers = control.getElementsByClassName("numbers");
for (var i = 0; i < numbers.length; i++) {
  numbers[i].addEventListener("click", changeColor);
}
function changeColor(){
    var current = document.getElementsByClassName("active");
    if (current.length != 0){
        current[0].className = current[0].className.replace(" active", "");
    }
    this.className += " active";
}



//Solver functions
var board;
function createBoard(){
    var cellnumber = document.getElementsByClassName("cellnumber");
    var board = [];
    for (var i = 0; i< 9; i++ ){
        board[i] = [];
        for(var j = 0; j <9; j++){
            let index = (i * 9) + j;
            if (0 < cellnumber[index].innerHTML < 10){
                board[i][j] = cellnumber[index].innerHTML;
            } else {
                board[i][j] = 0;
            }
        }
    }
    return board;
}


function valid(){
    function validRow(row){
        var arr = [];
        for (var i = 0; i < 9; i++){
            if (board[row][i] !== ""){
                if (arr[board[row][i]] === undefined){
                    arr[board[row][i]] = 1;
                } else {
                    return false;
                }
            }
        }
        return true;
    }

    function validColumn (column){
        var arr = [];
        for (var i = 0; i < 9; i++){
            if (board[i][column] !== ""){
                if (arr[board[i][column]] === undefined){
                    arr[board[i][column]] = 1;
                } else {
                    return false;
                }
            }
        }
        return true;
    }

    function validSquare (row, column){
        var arr = [];
        for (var i = 0; i < 3; i++){
            for (var j = 0; j < 3; j++){
                if (board[row + i][column + j] !== ""){
                    if (arr[board[row + i][column + j]] === undefined){
                        arr[board[row + i][column + j]] = 1;
                    } else {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    for (var i = 0; i < 9; i++){
        for (var j = 0; j < 9; j++){
            if (!(validRow(i) && validColumn(j) && validSquare(i - i%3, j - j%3))){
                return false;
            }
        }
    }
    return true;
}

function solveRecursion() {
    for (var row = 0; row < 9; row++) {
        for (var column = 0; column < 9; column++) {
            if (board[row][column] == 0) {
                for (var number = 1; number <= 9; number++) {
                    if (stillValid(row, column, number)) {
                        board[row][column] = number;
                        if (solveRecursion())
                            return true;
                        else
                            board[row][column] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

function stillValid( row, column, number) {
    var rowStart = row - row % 3;
    var colStart = column - column % 3;
    for (var i = rowStart; i < rowStart + 3; i++) {
        for (var j = colStart; j < colStart + 3; j++) {
            if (board[i][j] == number)
                return false;
        }
    }
    for (var i = 0; i < board.length; i++){
        if ((board[i][column] == number) || (board[row][i] == number)){
            return false;
        }
    }
    return true;
}

function output(){
    var cellnumber = document.getElementsByClassName("cellnumber");

    for (var i = 0; i < 9; i++){
        for (var j = 0; j < 9; j++){
            let index = (i * 9) + j;
            cellnumber[index].innerHTML = board[i][j];
        }
    }
}

function Solve(){
    board = createBoard();
    if (valid()){
        solveRecursion();
        output();
    } else {
        alert ("Invalid Input");
    }
}

