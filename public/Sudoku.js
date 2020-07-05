var k;
var clickmode=false;
var erase=false;
var Autocheck=false;
var Check = false;
var togglenote=false;

function Erase(){
    if(erase){
        erase=false;
        document.getElementById("erase").style.backgroundColor="#1a777a";
    }
    else{
        erase=true;
        if(clickmode || togglenote){
            clickmode=false;
            togglenote=false;
            document.getElementById("click").style.backgroundColor="#1a777a";
            document.getElementById("Notes").style.backgroundColor="#1a777a";
        }
        document.getElementById("erase").style.backgroundColor="rgb(61,4,39)";
    }
}

function clearAll(){
    let c = document.getElementsByClassName("cellnumber");
    let d = document.getElementsByClassName("notecell");
    for (let i = 0; i<81; i++){
        if(puzzle[i]==="0"){
            c[i].innerHTML = "";
        }
    }
    for (let i = 0; i<729; i++){
        if(puzzle[Math.floor(i/9)]==="0"){
            d[i].innerHTML = "";
        }
    }
}

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

function Notes(){
    if(togglenote){
        togglenote=false;
        document.getElementById("Notes").style.backgroundColor="#1a777a";
    }
    else{
        togglenote=true;
        document.getElementById("Notes").style.backgroundColor="rgb(61,4,39)";
        if(erase){
            erase=false;
            document.getElementById("erase").style.backgroundColor="#1a777a";
        }
    }

}

function toggleCheck(){
    let cells = document.getElementsByClassName("cell");
    let cellnumber = document.getElementsByClassName("cellnumber");
    if (Check){
        Check = false;
        document.getElementById("check").style.backgroundColor="#1a777a";
        for (var i = 0; i < 81; i++){
            cells[i].classList.remove("correct");
            cells[i].classList.remove("wrong");
        }
    } else {
        Check = true;
        document.getElementById("check").style.backgroundColor="rgb(61,4,39)";
        for (var i = 0; i < 81 ; i++){
            if (cellnumber[i].innerHTML == solved.charAt(i)){
                cells[i].classList.add("correct");
            } else {
                cells[i].classList.add("wrong");
            }
        }
    }
}

function autocheck(){
    if(Autocheck){
        Autocheck=false;
        let c=document.getElementsByClassName("cellnumber");
        for(let i=0;i<81;i++){
            if(puzzle[i]!=="0"){
                c[i].style.color="white";
            }
            else{
                c[i].style.color="rgb(42,233,255)";
            }
        }
        document.getElementById("autocheck").style.backgroundColor="#1a777a";
    }
    else{
        Autocheck=true;
        checkall();
        document.getElementById("autocheck").style.backgroundColor="rgb(61,4,39)";
    }
}

function check(cell){
    let name=cell.id;
    let row=name[4];
    let column=name[5];
    let minibox=name.slice(4,6);
    let R=Math.floor(row/3)*3;
    let C=Math.floor(column/3)*3;
    let correct=true;
    let index=(+row)*9+(+column);
    cell=cell.children[0];

    
    for(let i=0;i<9;i++){
        //checks for duplicate numbers in a row
        if(column!==`${i}`){
            let c=document.getElementById(`cell${row}${i}`).children[0];
            if(c.innerHTML===cell.innerHTML && c.innerHTML!==""){
                cell.style.color="red";
                correct=false;
            }
        }
        //checks for duplicate numbers in a column
        if(row!==`${i}`){
            let c=document.getElementById(`cell${i}${column}`).children[0];
            if(c.innerHTML===cell.innerHTML && c.innerHTML!==""){
                cell.style.color="red";
                correct=false;
            }
        }
    }
    
    //checks for duplicate numbers in a 3 by 3 box
    for(let i=R;i<R+3;i++){
        for(let j=C;j<C+3;j++){
            if(minibox!==`${i}${j}`){
                let c=document.getElementById(`cell${i}${j}`).children[0];
                if(c.innerHTML===cell.innerHTML && c.innerHTML!==""){
                    cell.style.color="red";
                    correct=false;
                }
            }
        }
    }

    if(correct){
        if(puzzle[index]!=="0"){
            cell.style.color="white";
        }
        else{
            cell.style.color="rgb(42,223,255)";
        }
    }
}

function checkall(){
    let c = document.getElementsByClassName("cell");
    for (let i = 0; i<81; i++){
       check(c[i]);
    }
}

//click / keyboard functions for the table cells
function group(){
    let cellnumber = document.getElementsByClassName("cellnumber");
    for(let i=0;i<9;i++){
        for(let j=0; j<9; j++){
            let c = document.getElementById("cell" + i + j);
            let notecell = c.getElementsByClassName("notecell");
            let index = (i * 9) + j;
            c.addEventListener("click",change);
            c.addEventListener("click", eraseCell);
            c.addEventListener("keypress",keyboard);
            function keyboard(event){
                if(!togglenote && puzzle[index]==="0"){
                    let h=event.key;
                    var numbers = /^[1-9]+$/;
                    if (numbers.test(h)){       //Only allow control from 1 to 9
                        for (let k =0; k< notecell.length; k++){
                            notecell[k].innerHTML="";
                        }
                        cellnumber[index].innerHTML=h;
                        if(Autocheck){
                            checkall();
                        }
                    } else {
                        cellnumber[index].innerHTML = "";
                        if(Autocheck){
                            checkall();
                        }
                    }
                } 
            }
            function change(){
                if(clickmode && k!==undefined && !togglenote && puzzle[index]==="0"){
                    for (let k =0; k< notecell.length; k++){
                        notecell[k].innerHTML="";
                    }
                    cellnumber[index].innerHTML = k;
                    if(Autocheck){
                        checkall();
                    }
                } 
            }
            function eraseCell(){
                if(erase && !(clickmode || togglenote) && puzzle[index]==="0"){
                    cellnumber[index].innerHTML = "&nbsp";
                    for (let k =0; k< notecell.length; k++){
                        notecell[k].innerHTML="";
                    }
                    if(Autocheck){
                        checkall();
                    } 
                } else {}
            }
        }
    }
}
        

function choose(i){
    k=i+1;
}

group();

//Highlights the number clicked on
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


//Section for notes
function notes(){
    let cellnumber = document.getElementsByClassName("cellnumber");
    for(let i=0;i<9;i++){
        for(let j=0; j<9; j++){
            let cell = document.getElementById("cell" + i + j);
            let notecell = cell.getElementsByClassName("notecell");
            let index = (i * 9) + j;
            cell.addEventListener("click", changeNote);
            cell.addEventListener("keypress", changeKeyboard)
            function changeNote() {
                if(togglenote && clickmode){
                    cellnumber[index].innerHTML="&nbsp";
                    if(notecell[k-1].innerHTML == k){
                        notecell[k-1].innerHTML = "";
                    } else {
                        notecell[k - 1].innerHTML = k;
                    }
                }
            }
            function changeKeyboard(){
                if (togglenote && puzzle[index]==="0") {
                    let h=event.key;
                    var numbers = /^[1-9]+$/;
                    let notecell = cell.getElementsByClassName("notecell");    
                    if (numbers.test(h)){
                        cellnumber[index].innerHTML="&nbsp";  
                        if(notecell[h-1].innerHTML==h){         //If the cell already has the note remove it
                            notecell[h-1].innerHTML = "";
                        } else {                                //Else add the note to the cell
                            notecell[h - 1].innerHTML=h;
                        }
                    } else {
                        notecell[h - 1].innerHTML = "";
                    }
                }
            }
        }
    }
}
notes();



//Section for timer
var hours = document.getElementById("hours");
var minutes = document.getElementById("minutes");
var seconds = document.getElementById("seconds");
let totaltime = 0;
var timerPaused = false;
var timerHidden = false;
var timeInterval = setInterval(increaseTime, 1000);

function increaseTime() {
    totaltime += 1;
    hours.innerHTML = change (parseInt(totaltime / 3600));
    minutes.innerHTML = change (parseInt((totaltime % 3600) / 60));
    seconds.innerHTML = change((totaltime % 3600) % 60);
}
function change(time){
    var timing = time + "";
    if (timing.length < 2) {
        return "0" + timing;
    } 
    return timing;
}
function togglePause() {
    if (!timerPaused){
        clearInterval (timeInterval);
        timerPaused = true;
        document.getElementById("togglePause").innerHTML = "Start Timer";
    } else {
        timeInterval = setInterval(increaseTime, 1000);
        timerPaused = false;
        document.getElementById("togglePause").innerHTML = "Stop Timer";
    }
}
function toggleShowTimer(){
    if(!timerHidden){
        document.getElementById("timer").style.display = "none";
        timerHidden = true;
        document.getElementById("toggleShowTimer").innerHTML = "Show Timer"
    } else {
        document.getElementById("timer").style.display = "block";
        timerHidden = false;
        document.getElementById("toggleShowTimer").innerHTML = "Hide Timer"
    }
}
function resetTimer(){
    clearInterval(timeInterval);
    totaltime = 0;
    document.getElementById("hours").innerHTML = "00";
    document.getElementById ("minutes").innerHTML = "00";
    document.getElementById("seconds").innerHTML = "00";
    timeInterval = setInterval(increaseTime, 1000);
}



//Database functions
var puzzle = "000000000000000000000000000000000000000000000000000000000000000000000000000000000";
var solved = "000000000000000000000000000000000000000000000000000000000000000000000000000000000";

async function readStringEasy(){
    try {
        const result = await fetch ("https://sudokudatabase.herokuapp.com/puzzleStringEasy", {method:"GET"})
        const puzzleString = await result.json();  
        puzzleString.forEach (t => {
            puzzle = t.puzzle_string;
            solved = t.solved_string;
        })
    }
    catch (e) {
        console.log("error reading puzzleString")
    }
}
async function readStringMedium(){
    try {
        const result = await fetch ("https://sudokudatabase.herokuapp.com/puzzleStringMedium", {method:"GET"})
        const puzzleString = await result.json();  
        puzzleString.forEach (t => {
            puzzle = t.puzzle_string;
            solved = t.solved_string;
        })
    }
    catch (e) {
        console.log("error reading puzzleString")
    }
}
async function readStringHard(){
    try {
        const result = await fetch ("https://sudokudatabase.herokuapp.com/puzzleStringHard", {method:"GET"})
        const puzzleString = await result.json();  
        puzzleString.forEach (t => {
            puzzle = t.puzzle_string;
            solved = t.solved_string;
        })
    }
    catch (e) {
        console.log("error reading puzzleString")
    }
}
async function readStringExpert(){
    try {
        const result = await fetch ("https://sudokudatabase.herokuapp.com/puzzleStringExpert", {method:"GET"})
        const puzzleString = await result.json();  
        puzzleString.forEach (t => {
            puzzle = t.puzzle_string;
            solved = t.solved_string;
        })
    }
    catch (e) {
        console.log("error reading puzzleString")
    }
}
async function readStringRandom(){
    try {
        const result = await fetch ("https://sudokudatabase.herokuapp.com/puzzleStringRandom", {method:"GET"})
        const puzzleString = await result.json();  
        puzzleString.forEach (t => {
            puzzle = t.puzzle_string;
            solved = t.solved_string;
        })
    }
    catch (e) {
        console.log("error reading puzzleString")
    }
}


function newgameEasy(){
    document.getElementById("difficulty").innerHTML = "Easy";
    readStringEasy()
    .then(()=>{
    let cellnumber = document.getElementsByClassName("cellnumber");
    for (var i = 0; i < 9; i++){
        for (var j = 0; j < 9; j++){
            let index = (i * 9) + j;
            if (puzzle.charAt(index) != 0){
                cellnumber[index].innerHTML= puzzle.charAt(index);
                cellnumber[index].style.color="black";
            } else {
                cellnumber[index].innerHTML="&nbsp";
                cellnumber[index].style.color="blue";
            }
        }
    }
    resetTimer()
    })
    .catch((e)=>console.log(e))
}
function newgameMedium(){
    document.getElementById("difficulty").innerHTML = "Medium";
    readStringMedium()
    .then(()=>{
    let cellnumber = document.getElementsByClassName("cellnumber");
    for (var i = 0; i < 9; i++){
        for (var j = 0; j < 9; j++){
            let index = (i * 9) + j;
            if (puzzle.charAt(index) != 0){
                cellnumber[index].innerHTML= puzzle.charAt(index);
                cellnumber[index].style.color="black";
            } else {
                cellnumber[index].innerHTML="&nbsp";
                cellnumber[index].style.color="blue";
            }
        }
    }
    resetTimer();
    })
    .catch((e)=>console.log(e))
}
function newgameHard(){
    document.getElementById("difficulty").innerHTML = "Hard";
    readStringHard()
    .then(()=>{
    let cellnumber = document.getElementsByClassName("cellnumber");
    for (var i = 0; i < 9; i++){
        for (var j = 0; j < 9; j++){
            let index = (i * 9) + j;
            if (puzzle.charAt(index) != 0){
                cellnumber[index].innerHTML= puzzle.charAt(index);
                cellnumber[index].style.color="black";
            } else {
                cellnumber[index].innerHTML="&nbsp";
                cellnumber[index].style.color="blue";
            }
        }
    }
    resetTimer();
    })
    .catch((e)=>console.log(e))
}
function newgameExpert(){
    document.getElementById("difficulty").innerHTML = "Expert";
    readStringExpert()
    .then(()=>{
    let cellnumber = document.getElementsByClassName("cellnumber");
    for (var i = 0; i < 9; i++){
        for (var j = 0; j < 9; j++){
            let index = (i * 9) + j;
            if (puzzle.charAt(index) != 0){
                cellnumber[index].innerHTML= puzzle.charAt(index);
                cellnumber[index].style.color="black";
            } else {
                cellnumber[index].innerHTML="&nbsp";
                cellnumber[index].style.color="blue";
            }
        }
    }
    resetTimer();
    })
    .catch((e)=>console.log(e))
}
function newgameRandom(){
    document.getElementById("difficulty").innerHTML = "Random";
    readStringRandom()
    .then(()=>{
    let cellnumber = document.getElementsByClassName("cellnumber");
    for (var i = 0; i < 9; i++){
        for (var j = 0; j < 9; j++){
            let index = (i * 9) + j;
            if (puzzle.charAt(index) != 0){
                cellnumber[index].innerHTML= puzzle.charAt(index);
                cellnumber[index].style.color="black";
            } else {
                cellnumber[index].innerHTML="&nbsp";
                cellnumber[index].style.color="blue";
            }
        }
    }
    resetTimer();
    })
    .catch((e)=>console.log(e))
}
function newgame(){
    var difficulty = document.getElementById("difficulty").innerHTML;
    switch (difficulty){
        case "Easy":  newgameEasy();  break;
        case "Medium": newgameMedium(); break;
        case "Hard": newgameHard(); break;
        case "Expert": newgameExpert(); break;
        default: newgameRandom(); 
    }
    resetTimer();
}


function showSolved(){
    clearAll()
    let cellnumber = document.getElementsByClassName("cellnumber");
    for (var i = 0; i < 9; i++){
        for (var j = 0; j < 9; j++){
            let index = (i * 9) + j;
            cellnumber[index].innerHTML= solved.charAt(index);
            if(puzzle[index]!=="0"){
                cellnumber[index].style.color="white";
            }
            else{
                cellnumber[index].style.color="rgb(42,233,255)";
            }
        }
    }
}


