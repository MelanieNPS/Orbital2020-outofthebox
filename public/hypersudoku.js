var k;
var clickmode=false;
var erase=false;
var Autocheck=false;
var Check = false;
var togglenote=false;
const template = "000000000011102220011102220011102220000000000033304440033304440033304440000000000"

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
            document.getElementById("notes").style.backgroundColor="#1a777a";
        }
        document.getElementById("erase").style.backgroundColor="rgb(61,4,39)";
    }
}

function clearAll(){
    let c = document.getElementsByClassName("cellnumber");
    let d = document.getElementsByClassName("notecell");
    for (let i = 0; i<81; i++){
        if(puzzle[i]==="0"){
            c[i].innerHTML = "&nbsp";
        }
    }
    for (let i = 0; i<729; i++){
        d[i].innerHTML = "";
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

function togglenotes(){
    if(togglenote){
        togglenote=false;
        document.getElementById("notes").style.backgroundColor="#1a777a";
    }
    else{
        togglenote=true;
        document.getElementById("notes").style.backgroundColor="rgb(61,4,39)";
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
        let counter=0;
        for (var i = 0; i < 81 ; i++){
            if (cellnumber[i].innerHTML == solved.charAt(i)){
                cells[i].classList.add("correct");
                counter++;
            } else {
                cells[i].classList.add("wrong");
            }
        }
        if(counter === 81){
            let hour=Math.floor(totaltime/3600);
            let minute=Math.floor(totaltime%3600/60);
            let second=totaltime%60;
            if(minute<10){
                minute="0"+minute;
            }
            if(second<10){
                second="0"+second;
            }
            alert(`YAY! \ntiming: ${hour}:${minute}:${second}`)
        }
        if(!timerPaused){
            togglePause()
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
            if(c.innerHTML===cell.innerHTML && c.innerHTML!=="&nbsp"){
                cell.style.color="red";
                correct=false;
            }
        }
        //checks for duplicate numbers in a column
        if(row!==`${i}`){
            let c=document.getElementById(`cell${i}${column}`).children[0];
            if(c.innerHTML===cell.innerHTML && c.innerHTML!=="&nbsp"){
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
                if(c.innerHTML===cell.innerHTML && c.innerHTML!=="&nbsp"){
                    cell.style.color="red";
                    correct=false;
                }
            }
        }
    }

    if(5<=row && row<=7 && 5<=column && column<=7){
        for(let i=5;i<8;i++){
            for(let j=5;j<8;j++){
                if(minibox!==`${i}${j}`){
                    let c=document.getElementById(`cell${i}${j}`).children[0];
                    if(c.innerHTML===cell.innerHTML && c.innerHTML!=="&nbsp"){
                        cell.style.color="red";
                        correct=false;
                    }
                }
            }
        }
    }

    if(1<=row && row<=3 && 1<=column && column<=3){
        for(let i=1;i<4;i++){
            for(let j=1;j<4;j++){
                if(minibox!==`${i}${j}`){
                    let c=document.getElementById(`cell${i}${j}`).children[0];
                    if(c.innerHTML===cell.innerHTML && c.innerHTML!=="&nbsp"){
                        cell.style.color="red";
                        correct=false;
                    }
                }
            }
        }
    }
    
    if(5<=row && row<=7 && 1<=column && column<=3){
        for(let i=5;i<8;i++){
            for(let j=1;j<4;j++){
                if(minibox!==`${i}${j}`){
                    let c=document.getElementById(`cell${i}${j}`).children[0];
                    if(c.innerHTML===cell.innerHTML && c.innerHTML!=="&nbsp"){
                        cell.style.color="red";
                        correct=false;
                    }
                }
            }
        }
    }

    if(1<=row && row<=3 && 5<=column && column<=7){
        for(let i=1;i<4;i++){
            for(let j=5;j<8;j++){
                if(minibox!==`${i}${j}`){
                    let c=document.getElementById(`cell${i}${j}`).children[0];
                    if(c.innerHTML===cell.innerHTML && c.innerHTML!=="&nbsp"){
                        cell.style.color="red";
                        correct=false;
                    }
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
                    var noteButton = /^[n]+$/;
                    var clickmode = /^[c]+$/;
                    var auto = /^[a]+$/;
                    var fillNote = /^[f]+$/;
                    if (numbers.test(h)){       //Only allow control from 1 to 9
                        for (let k =0; k< notecell.length; k++){
                            notecell[k].innerHTML="";
                        }
                        cellnumber[index].innerHTML=h;
                        if(Autocheck){
                            checkall();
                        }
                    } else if (noteButton.test(h)){
                        togglenotes();
                    } else if (clickmode.test(h)){
                        toggleclick();
                    } else if (auto.test(h)){
                        autocheck();
                    } else if (fillNote.test(h)){
                        fillnotes();
                    } else {
                        cellnumber[index].innerHTML = "&nbsp";
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
                if(togglenote && clickmode && puzzle[index]==="0"){
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
                    var noteButton = /^[m]+$/;
                    var clickmode = /^[c]+$/;
                    var auto = /^[a]+$/;
                    var fillNote = /^[f]+$/;
                    let notecell = cell.getElementsByClassName("notecell");    
                    if (numbers.test(h)){
                        cellnumber[index].innerHTML="&nbsp";  
                        if(notecell[h-1].innerHTML==h){         //If the cell already has the note remove it
                            notecell[h-1].innerHTML = "";
                        } else {                                //Else add the note to the cell
                            notecell[h - 1].innerHTML=h;
                        }
                    } else if (noteButton.test(h)){
                        togglenotes();
                    } else if (clickmode.test(h)){
                        toggleclick();
                    } else if (auto.test(h)){
                        autocheck();   
                    } else if (fillNote.test(h)){
                        fillnotes();
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



//Tools
function checkstring(pos,num,grid){
    //check row and column logic
    let colStart=pos%9;
    let rowStart=(Math.floor(pos/9))*9;
    for(let i=0;i<9;i++){
        let y=grid[rowStart+i];
        let x=grid[colStart+9*i]
        //row logic
        if(y==num){
            return false;
        }
        //column logic
        if(x==num){
            return false;
        }
    }
    //check block logic
    for(let i=0; i<3; i++){
        for(let j=0; j<3; j++){
            let X=Math.floor(colStart/3)*3;
            let Y=Math.floor(Math.floor(pos/9)/3)*3;
            if(grid[X+Y*9+i*9+j]==num){
                return false;
            }
        }
    }

    //extra hypersudoku constraints
    for(let i=0; i<3; i++){
        for(let j=0; j<3; j++){
            if(template[pos]==1){
                let X=1;
                let Y=1;
                if(grid[X+Y*9+i*9+j]==num){
                    return false;
                }
            }
            if(template[pos]==2){
                let X=5;
                let Y=1;
                if(grid[X+Y*9+i*9+j]==num){
                    return false;
                }
            }
            if(template[pos]==3){
                let X=1;
                let Y=5;
                if(grid[X+Y*9+i*9+j]==num){
                    return false;
                }
            }
            if(template[pos]==4){
                let X=5;
                let Y=5;
                if(grid[X+Y*9+i*9+j]==num){
                    return false;
                }
            }
        }
    }
    
    return true;
}
function fillnotes(){
    //capture current grid state into a string
    let grid="";
    let c=document.getElementsByClassName("cellnumber");
    let d=document.getElementsByClassName("note");
    let e=document.getElementsByClassName("notecell");
    for(let i=0; i<81; i++){
        let content=c[i].innerHTML;
        if(content === "&nbsp;"){
            grid+="0";
        }
        else{
            grid+=content;
        }
    }

    //clear all notes
    for (let i = 0; i<729; i++){
        e[i].innerHTML = "";
    }

    for(let i=0; i<81; i++){
        if(grid[i] === "0"){
            for( let j=0; j<9; j++){
                if(checkstring(i,j+1,grid)){
                    d[i].children[j].innerHTML=j+1;
                }
            }
        }
    }
}

function onenote(){
    //capture current grid state into a string
    let grid="";
    let c=document.getElementsByClassName("cellnumber");
    let d=document.getElementsByClassName("note");
    let e=document.getElementsByClassName("notecell");
    for(let i=0; i<81; i++){
        let content=c[i].innerHTML;
        if(content === "&nbsp;"){
            grid+="0";
        }
        else{
            grid+=content;
        }
    }

    //clear all notes
    for (let i = 0; i<729; i++){
        e[i].innerHTML = "";
    }

    for(let i=0; i<81; i++){
        if(grid[i] === "0" && k!==undefined){
            if(checkstring(i,k,grid)){
                d[i].children[k-1].innerHTML=k;
            }
        }
    }
}

function help(){
    alert("User Guide")
}


var shortcutPanel = false;
function showshortcutPanel(){
    if (shortcutPanel){
        shortcutPanel = false;
        document.getElementById("shortcutPanel").style.display = "none";
        document.getElementById("keyboardShortcut").innerHTML = "Display Keyboard Shortcuts";
    } else {
        shortcutPanel = true;
        document.getElementById("shortcutPanel").style.display = "block";
        document.getElementById("keyboardShortcut").innerHTML = "Hide Keyboard Shortcuts";
    }
}

function showuserGuide(){
    document.getElementById("userGuide").style.display = "block";
    document.getElementById("main").style.display = "none";
}
function showMain(){
    document.getElementById("userGuide").style.display = "none"
    document.getElementById("main").style.display ="block"
}
function openTab(tabName){
    var guideContent = document.getElementsByClassName("guideContent");
    for (var i = 0; i < guideContent.length; i++){
        guideContent[i].style.display = "none";
    }
    guideLinks = document.getElementsByClassName("guideLinks");
    for (var i = 0; i < guideLinks.length; i++){
        guideLinks[i].className = guideLinks[i].className.replace("active", "");
    }
    document.getElementById("tab" + tabName).style.display = "block";
    event.currentTarget.className += "active";
}

//Database functions
//one puzzle here is for testing purposes
var puzzle = "050178002000000000042903100730006080006000000004000000000000207060705004407030000";
var solved = "953178642178642953642953178731526489596487321824391765315864297269715834487239516";

async function readStringEasy(){
    try {
        const result = await fetch ("https://sudokudatabase.herokuapp.com/puzzleStringEasyHyper", {method:"GET"})
        const puzzleString = await result.json();  
        puzzleString.forEach (t => {
            puzzle = t.hyper_puzzle_string;
            solved = t.hyper_solved_string;
        })
    }
    catch (e) {
        console.log("error reading puzzleString")
    }
}
async function readStringMedium(){
    try {
        const result = await fetch ("https://sudokudatabase.herokuapp.com/puzzleStringMediumHyper", {method:"GET"})
        const puzzleString = await result.json();  
        puzzleString.forEach (t => {
            puzzle = t.hyper_puzzle_string;
            solved = t.hyper_solved_string;
        })
    }
    catch (e) {
        console.log("error reading puzzleString")
    }
}
async function readStringHard(){
    try {
        const result = await fetch ("https://sudokudatabase.herokuapp.com/puzzleStringHardHyper", {method:"GET"})
        const puzzleString = await result.json();  
        puzzleString.forEach (t => {
            puzzle = t.hyper_puzzle_string;
            solved = t.hyper_solved_string;
        })
    }
    catch (e) {
        console.log("error reading puzzleString")
    }
}
async function readStringExpert(){
    try {
        const result = await fetch ("https://sudokudatabase.herokuapp.com/puzzleStringExpertHyper", {method:"GET"})
        const puzzleString = await result.json();  
        puzzleString.forEach (t => {
            puzzle = t.hyper_puzzle_string;
            solved = t.hyper_solved_string;
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
            puzzle = t.hyper_puzzle_string;
            solved = t.hyper_solved_string;
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
    clearAll();
    let cellnumber = document.getElementsByClassName("cellnumber");
    for (var i = 0; i < 9; i++){
        for (var j = 0; j < 9; j++){
            let index = (i * 9) + j;
            if (puzzle.charAt(index) != 0){
                cellnumber[index].innerHTML= puzzle.charAt(index);
                cellnumber[index].style.color="white";
            } else {
                cellnumber[index].innerHTML="&nbsp";
                cellnumber[index].style.color="rgb(42,233,255)";
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
    clearAll();
    let cellnumber = document.getElementsByClassName("cellnumber");
    for (var i = 0; i < 9; i++){
        for (var j = 0; j < 9; j++){
            let index = (i * 9) + j;
            if (puzzle.charAt(index) != 0){
                cellnumber[index].innerHTML= puzzle.charAt(index);
                cellnumber[index].style.color="white";
            } else {
                cellnumber[index].innerHTML="&nbsp";
                cellnumber[index].style.color="rgb(42,233,255)";
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
    clearAll()    
    let cellnumber = document.getElementsByClassName("cellnumber");
    for (var i = 0; i < 9; i++){
        for (var j = 0; j < 9; j++){
            let index = (i * 9) + j;
            if (puzzle.charAt(index) != 0){
                cellnumber[index].innerHTML= puzzle.charAt(index);
                cellnumber[index].style.color="white";
            } else {
                cellnumber[index].innerHTML="&nbsp";
                cellnumber[index].style.color="rgb(42,233,255)";
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
    clearAll();    
    let cellnumber = document.getElementsByClassName("cellnumber");
    for (var i = 0; i < 9; i++){
        for (var j = 0; j < 9; j++){
            let index = (i * 9) + j;
            if (puzzle.charAt(index) != 0){
                cellnumber[index].innerHTML= puzzle.charAt(index);
                cellnumber[index].style.color="white";
            } else {
                cellnumber[index].innerHTML="&nbsp";
                cellnumber[index].style.color="rgb(42,233,255)";
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
    clearAll();    
    let cellnumber = document.getElementsByClassName("cellnumber");
    for (var i = 0; i < 9; i++){
        for (var j = 0; j < 9; j++){
            let index = (i * 9) + j;
            if (puzzle.charAt(index) != 0){
                cellnumber[index].innerHTML= puzzle.charAt(index);
                cellnumber[index].style.color="white";
            } else {
                cellnumber[index].innerHTML="&nbsp";
                cellnumber[index].style.color="rgb(42,233,255)";
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
