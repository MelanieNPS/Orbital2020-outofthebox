var k=0;
var numbers=["one","two","three","four","five","six","seven","eight","nine"];
var arr=["red","green","blue","cyan","yellow","magenta","orange","pink","violet"];

function group(num){
    let c=document.getElementById(num).children;
    let d=document.getElementById("control").children;
    for(let i=0;i<9;i++){
        c[i].addEventListener("click",change);
        d[i].children[0].style.backgroundPosition=-(i%3)*40+"px "+Math.floor(i/3)*(-40)+"px";
        function change(){
            c[i].children[0].style.backgroundPosition=-(k%3)*40+"px "+Math.floor(k/3)*(-40)+"px";
        }
    }
}

function choose(i){
    k=i
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
