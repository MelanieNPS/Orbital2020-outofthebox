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
