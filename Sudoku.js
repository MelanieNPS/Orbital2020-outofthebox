var k;
var numbers=["one","two","three","four","five","six","seven","eight","nine"];
var clickmode=false;

function Erase(){
    k=10;
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
    let c=document.getElementById(num).children;
    let d=document.getElementById("control").children;
    for(let i=0;i<9;i++){
        c[i].addEventListener("click",change);
        c[i].addEventListener("keypress",keyboard);
        d[i].children[0].style.backgroundPosition=-(i%3)*40+"px "+Math.floor(i/3)*(-40)+"px";
        function keyboard(event){
            let h=event.key-1;
            c[i].children[0].style.backgroundPosition=-(h%3)*40+"px "+Math.floor(h/3)*(-40)+"px";
        }
        function change(){
            if(clickmode){
                c[i].children[0].style.backgroundPosition=-(k%3)*40+"px "+Math.floor(k/3)*(-40)+"px";
            }
        }
    }
}

function choose(i){
    k=i;
}

for(let i=0;i<9;i++){
    group(numbers[i]);
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
