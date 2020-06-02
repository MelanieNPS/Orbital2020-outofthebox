var k;
var clickmode=false;
var Autocheck=false;
var togglenote=false;

function Erase(){
    k="";
}

function clearAll(){
    let c = document.getElementsByClassName("cell");
    for (let i = 0; i<81; i++){
        c[i].innerHTML = "";
    }
}

function toggleclick(){
    if(clickmode){
        clickmode=false;
        document.getElementById("click").style.backgroundColor="#F1CDB0";
    }
    else{
        clickmode=true;
        document.getElementById("click").style.backgroundColor="#C04000";
    }
}

function Notes(){
    if(togglenote){
        togglenote=false;
        document.getElementById("Notes").style.backgroundColor="#F1CDB0";
    }
    else{
        togglenote=true;
        document.getElementById("Notes").style.backgroundColor="#C04000";
    }

}

function autocheck(){
    if(Autocheck){
        Autocheck=false;
        let c=document.getElementsByClassName("cell");
        for(let i=0;i<81;i++){
            c[i].style.color="black";
        }
        document.getElementById("autocheck").style.backgroundColor="#F1CDB0";
    }
    else{
        Autocheck=true;
        checkall();
        document.getElementById("autocheck").style.backgroundColor="#C04000";
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

    
    for(let i=0;i<9;i++){
        //checks for duplicate numbers in a row
        if(column!==`${i}`){
            let c=document.getElementById(`cell${row}${i}`);
            if(c.innerHTML===cell.innerHTML && c.innerHTML!==""){
                cell.style.color="red";
                correct=false;
            }
        }
        //checks for duplicate numbers in a column
        if(row!==`${i}`){
            let c=document.getElementById(`cell${i}${column}`);
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
                let c=document.getElementById(`cell${i}${j}`);
                if(c.innerHTML===cell.innerHTML && c.innerHTML!==""){
                    cell.style.color="red";
                    correct=false;
                }
            }
        }
    }

    if(correct){
        cell.style.color="black";
    }
}

function checkall(){
    let c = document.getElementsByClassName("cell");
    for (let i = 0; i<81; i++){
       check(c[i]);
    }
}

function group(){
    let c=document.getElementsByClassName("cell");
    for(let i=0;i<81;i++){
        c[i].addEventListener("click",change);
        c[i].addEventListener("keypress",keyboard);
        function keyboard(event){
            let h=event.key;
            var control = /^[1-9]+$/;
            if (control.test(h)){       //Only allow control from 1 to 9
                c[i].innerHTML=h;
                if(Autocheck){
                    checkall();
                }
            } else {
                var otherwise = h.slice(0, -5);
                c[i].innerHTML = otherwise;
            }
        }
        function change(){
            if(clickmode && k!==undefined){
                c[i].innerHTML=k;
                if(Autocheck){
                    checkall();
                }
            } 
        }
    }
}

function choose(i){
    k=i+1;
}

function openTab(evt, tabName){
    var tabcontent = document.getElementsByClassName("tab-content");
    for (var i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    var tabButton = document.getElementsByClassName("tabButton");
    for (var j = 0; j < tabButton.length; j++){
        tabButton[j].className = tabButton[j].className.replace("active", "");
    }

    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += "active";
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



