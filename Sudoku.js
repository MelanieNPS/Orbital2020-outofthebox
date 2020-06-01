var k;
var control=["one","two","three","four","five","six","seven","eight","nine"];
var clickmode=false;

function Erase(){
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
    }
    else{
        clickmode=true;
    }
}

function group(num){
    let c=document.getElementsByClassName("cell");
    for(let i=0;i<81;i++){
        c[i].addEventListener("click",change);
        c[i].addEventListener("keypress",keyboard);
        function keyboard(event){
            let h=event.key;
            var control = /^[1-9]+$/;
            if (control.test(h)){       //Only allow control from 1 to 9
                c[i].innerHTML=h;
            } else {
                var otherwise = h.slice(0, -5);
                c[i].innerHTML = otherwise;
            }
        }
        function change(){
            if(clickmode){
                c[i].innerHTML=k + 1;
            } 
        }
    }
}

function choose(i){
    k=i;
}

for(let i=0;i<9;i++){
    group(control[i]);
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



