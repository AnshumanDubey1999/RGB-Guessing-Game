var squares = document.querySelectorAll("#board .square")
var rectangles = document.querySelectorAll("#lifeLine .rectangle")
var heading = document.querySelector("#rgbValues")
var game = document.querySelector("#game")
var rgb, rightGuess
var reset = document.querySelector("#reset")
var msg = document.querySelector("#msg")
var mode = "HARD"
var lives = 3
var resets = 3
var score = 0
var highScore = 0
var playerName = "player1"
var name = "Player1"
var isNewPlayer = false


reset.addEventListener("click",function(){
    if(resets!=0){
        rectangles[6-resets].classList.add("used")
        rectangles[6-resets--].classList.remove("unused")
        score-=20
        resetBoard(mode=="EASY"?3:6)
    }
    else{
        for(i=3;i<6;i++)
            rectangles[i].classList.add("error")
        setTimeout(() => {
            for(i=3;i<6;i++)
                rectangles[i].classList.remove("error")
        }, 300)
        
    }
})

for(var i=0;i<squares.length;i++){
    squares[i].addEventListener("click",function(){
        if(this.style.backgroundColor==rgb)
            correctGuess()
        else{
            rectangles[lives-1].classList.add("used")
            rectangles[--lives].classList.remove("unused")
            this.style.backgroundColor = "rgba(0,0,0,0)"
            if(lives==0)
                endGame()
            else
                msg.textContent = "Try Again!"
        }   
    })
}

function resetBoard(len){
    document.querySelector("#heading").style.backgroundColor = "steelblue"
    reset.disabled = false;
    msg.textContent = score==0?"Make a Guess!":"SCORE: "+score
    reset.textContent = "NEW COLORS"
    rightGuess = Math.floor(Math.random()*len)
    var x,y,z
    for(i=0; i<len;i++){
        x = Math.floor(Math.random()*256)
        y = Math.floor(Math.random()*256)
        z = Math.floor(Math.random()*256)
        if(rightGuess==i){
            rgb = "rgb("+x+", "+y+", "+z+")"
            heading.textContent = "RGB("+x+", "+y+", "+z+")"
        }
        squares[i].style.backgroundColor = "rgb("+x+","+y+","+z+")"
    }
    for(i=0;i<6;i++){
        rectangles[i].removeAttribute("style")
    }
    while(len<6){
        squares[len].style.backgroundColor =  "rgba(0,0,0,0)"
        len++;
    }
}

function correctGuess(){
    score += 100;
    msg.textContent = "SCORE: "+score
    reset.disabled = true
    document.querySelector("#heading").style.backgroundColor = rgb
    for(i=0;i< (mode=="EASY"?3:6);i++){
        squares[i].style.backgroundColor = rgb
    }
    for(i=0;i<6;i++){
        if(!rectangles[i].classList.contains("used")){
            rectangles[i].style.backgroundColor = rgb;
        }
    }
    setTimeout(() => {resetBoard(mode=="EASY"?3:6)}, 1000)
}



resetBoard(6)


//HELP INSTRUCTION____________________________________________________________________________________________________
var helpBox = document.querySelector("#helpBox")
var cross = document.querySelector("#help .cross")
var info = document.querySelector("#nav #info")

cross.addEventListener("click", function(){
    game.classList.remove("blur")
    helpBox.classList.add("dontDisplay")
})

info.addEventListener("click", function() {
    game.classList.add("blur")
    helpBox.classList.remove("dontDisplay")
})


//ENDGAME___________________________________________________________________________________________________________________
var endgameBox = document.querySelector("#endgameBox")
var newGame = document.querySelector("#endgame button")
var scoreBox = document.querySelector("#endgame h1")
var highscoreBox = document.querySelector("#endgame div div:last-child")

function endGame(){
    game.classList.add("blur")
    endgameBox.classList.remove("dontDisplay")
    scoreBox.textContent = score
    if(score>highScore){
        highScore = score
        localStorage.setItem(playerName+mode, score)
    }
    highscoreBox.textContent = highScore
}

newGame.addEventListener("click", function(){
    game.classList.remove("blur")
    endgameBox.classList.add("dontDisplay")
    score = 0
    for(i=0;i<6;i++){
        rectangles[i].classList.remove("used")
        rectangles[i].classList.add("unused")
    }
    resets = 3
    lives = 3
    resetBoard(mode=="EASY"?3:6)
})

//INTRODUCTION_________________________________________________________

var label = document.querySelector("#intro label")
var input = document.querySelector("#intro input")
var welcome = document.querySelector("#intro #phase1 h1")
var startButton = document.querySelector("#intro #phase1 button")
var playButton = document.querySelector("#intro #phase2 #appearLast button")
var easy = document.querySelector("#easy")
var hard = document.querySelector("#hard")
var finalSlide = document.querySelector("#intro #phase2 div:last-child")
var phase1 = document.querySelector("#phase1")
var phase2 = document.querySelector("#phase2")
var phase2Player = document.querySelector("#phase2 h1")
var phase2HS = document.querySelector("#phase2 .highScore div:last-child")


easy.addEventListener("click", function(){
    easy.classList.add("modeSelected")
    hard.classList.remove("modeSelected")  
    finalSlide.classList.remove("slim")
    phase2HS.textContent = localStorage.getItem(playerName+"EASY");
    if(isNewPlayer)
        setTimeout(() => {document.querySelector("#phase2 #appearLast").style.bottom = "-78px"}, 000)
    mode = "EASY"
})
hard.addEventListener("click", function(){
    hard.classList.add("modeSelected")
    easy.classList.remove("modeSelected") 
    finalSlide.classList.remove("slim")
    phase2HS.textContent = localStorage.getItem(playerName+"HARD");
    mode = "HARD"
    if(isNewPlayer)
        setTimeout(() => {document.querySelector("#phase2 #appearLast").style.bottom = "-78px"}, 000)
    
})

input.addEventListener("focus", function(){
    label.classList.add("smallLabel")
    welcome.classList.add("disappear")
    setTimeout(() => {welcome.classList.add("dontDisplay")}, 500)
})

startButton.addEventListener("click", function(){
    playerName = input.value

    if(playerName == ""){
        label.classList.add("smallLabel")
        welcome.classList.add("disappear")
        setTimeout(() => {welcome.classList.add("dontDisplay")}, 500)
    }
    else{
        introPhase2()
    }
})


function introPhase2(){
    phase1.classList.add("slim1");

    phase2.classList.remove("slim2");
    name = playerName.charAt(0).toUpperCase() + playerName.slice(1).toLowerCase()
    playerName = playerName.toLowerCase()
    console.log(name+" "+playerName)
    isNewPlayer = localStorage.getItem(playerName) === null
    if(isNewPlayer){            //NEW PLAYER
        localStorage.setItem(playerName, name)
        localStorage.setItem(playerName+"EASY", 0)
        localStorage.setItem(playerName+"HARD", 0)
        document.querySelector("#phase2 .highScore").style.display = "none"
        
        console.log("New Player")
    }
    else{
        console.log("old PLayer")
        document.querySelector("#phase2 h4").textContent = "Welcome Back"
       
    }
    phase2Player.textContent = name;
}

playButton.addEventListener("click", function(){
    document.querySelector("#introBox").style.display = "none"
    game.classList.remove("blur")
    score = 0
    highScore = Number(localStorage.getItem(playerName+mode))
    console.log(mode+" "+highScore)
    resetBoard(mode=="EASY"?3:6)
})