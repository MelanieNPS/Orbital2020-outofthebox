var k=0;
var numbers=["one","two","three","four","five","six","seven","eight","nine"];
var arr=["red","green","blue","cyan","yellow","magenta","orange","pink","violet"];

function group(num){
    let c=document.getElementById(num).children;
    for(let i=0;i<9;i++){
        c[i].addEventListener("click",change);
        function change(){
            c[i].style.backgroundColor=arr[k];
        }
    }
}

function choose(i){
    k=i
}

for(let i=0;i<9;i++){
    group(numbers[i]);
}