function openpage(pagename) {
    let tabcontent = document.getElementsByClassName("tabcontent");
    let tablinks = document.getElementsByClassName("tablink");
    for (let i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    for (let i = 0; i < tablinks.length; i++) {
      tablinks[i].style.backgroundColor = "";
    }
    document.getElementById(pagename).style.display = "block";
    document.getElementById(pagename+"tab").style.backgroundColor = "#89ada3";
  }


function showDS3Solution(){
  document.getElementById("DS3solution").style.display = "block";
  document.getElementById("DS3button").style.display = "none";
}  
function CL2show(){
  document.getElementById("CL1").src = "Images/Candidate lines2.PNG";
  document.getElementById("CL2").style.display = "block";
  document.getElementById("CL2button").style.display="none";
}
function showXW1(){
  document.getElementById("XW2").style.display = "none";
  document.getElementById("XW1").style.display = "block";
}
function showXW2(){
  document.getElementById("XW1").style.display = "none";
  document.getElementById("XW3").style.display = "none";
  document.getElementById("XW2").style.display = "block";
}
function showXW3(){
  document.getElementById("XW2").style.display = "none";
  document.getElementById("XW4").style.display = "none";
  document.getElementById("XW3").style.display = "block";
}
function showXW4(){
  document.getElementById("XW3").style.display = "none";
  document.getElementById("XW5").style.display = "none";
  document.getElementById("XW4").style.display = "block";
}
function showXW5(){
  document.getElementById("XW4").style.display = "none";
  document.getElementById("XW5").style.display = "block";
}