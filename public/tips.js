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
function showXW(x){
  if (x == 5){
    document.getElementById("XW" + (x - 1)).style.display = "none";
  } else if (x == 1) {
    document.getElementById("XW" + (x + 1)).style.display = "none";
  } else {
    document.getElementById("XW" + (x - 1)).style.display = "none";
    document.getElementById("XW" + (x + 1)).style.display = "none"; 
  }
  document.getElementById ("XW" + x).style.display = "block";
}


function showFC(x){
  if(x == 4){
    document.getElementById("FC" + (x - 1)).style.display = "none";
  } else if (x == 1){
    document.getElementById("FC" + (x + 1)).style.display = "none";
  } else {
    document.getElementById("FC" + (x - 1)).style.display = "none";
    document.getElementById("FC" + (x + 1)).style.display = "none";
  }
  document.getElementById("FC"+ x).style.display = "block";
}