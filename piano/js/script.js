let start = document.querySelector(".start");
let startButton = document.querySelector(".start-button");
let blurPage = document.querySelector(".blur");
let loosePage = document.querySelector(".loose");
let help = document.querySelector(".help");

let win = document.querySelector(".win")




startButton.addEventListener("click", ()=>{
  start.remove();
  blurPage.remove();
});

document.querySelector(".back").addEventListener("click", ()=>{
  document.querySelector(".skip").style.display = "none";
})

help.addEventListener("click", ()=>{
  document.querySelector(".skip").style.display = "flex";
})

let numClick = -1;
let userPattern = [];
let correctPattern = [];
let possibleNotes = ["a", "b", "c", "d", "e"];
let level = 0;

document.querySelectorAll(".tile").forEach(singleTile =>{
  singleTile.addEventListener("click", function(buttonClicked){
    numClick++;
    let note = buttonClicked.target.id;
    clickAnimation("#" + note)
    playAudio(note);
    checkAnswer(note);
  })
})

function checkAnswer(note){
  userPattern.push(note);
  if(note == correctPattern[numClick]){
    if(userPattern.length == correctPattern.length){
      setTimeout(function(){
        userPattern = [];
        numClick = -1;
        nextSequence();
      }, 1000)
    }
  }else{
    document.querySelector(".loose").style.display = "flex";
    userPattern = [];
    correctPattern = [];
    level = 0;
    numClick = -1;
  }
}

function nextSequence(){
  level++;
  document.querySelector(".level-number").innerText = level;
  let rand = Math.floor(Math.random() * 4);
  let note = possibleNotes[rand];
  correctPattern.push(note);
  playAudio(note);
  clickAnimation("#" + note);
  if(level === 11){
    win.style.display = "flex";
  }
}

function playAudio(note){
  let relPath = `stock/sounds/${note}.wav`;
  let audio = new Audio(relPath);
  audio.play();
}

function clickAnimation(id){
  document.querySelector(id).style.backgroundColor = "rgba(0, 0, 0, .6)";
  setTimeout(()=>{
    document.querySelector(id).style.backgroundColor = "#dbdbdb";
  }, 500)
}

document.querySelector(".start-button").addEventListener("click", function(){
  if(level <= 0){
    setTimeout(()=>{
      nextSequence();
    }, 500)
  }
})