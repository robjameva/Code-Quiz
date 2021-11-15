// HTML Element Selectors
var timerEl = document.querySelector("#timer");
var titleEl = document.querySelector("#title");
var startEl = document.querySelector("#start");
var startContainerEl = document.querySelector(".start-btn")
var buttensEl = document.querySelector(".btns");
var saveEl = document.createElement("button");
var playAgainEl = document.createElement("button");
var highScoreBtnEl = document.querySelector("#high-score-btn");
var responseEl = document.querySelector(".response")

// Gloabl Variables
var timer = 30;
var playerId = 0;
var playerPoints = 0;
var questionNum = 0;
var questions = ["Which of the following characters are used to hold objects in JS?", "JavaScript can be used to write:",
    "Which of the following is not a valid JavaScript data type?", "How do add a debug statement in JavaScript?",
    "How do you persist data using only JavaScript in the browser?"];
var answers = {
    ans1: ["[square brackets]", "Front End Code", "number", "debugger;", "data.persist();"],
    ans2: ["{curley brackets}", "Back End Code", "string", "fixError;", "persist.data();"],
    ans3: ["<angled brackets>", "Both of the Above", "for loop", "startDebugger;", "localStorage.getData();"],
    ans4: ["|pipes|", "None of the Above", "boolean", "error;", "localStorage.setItem();"]
}
var playerObj = {
    playerId: 0,
    playerName: "",
    playerScore: 0
}

// Game Logic
var setTimer = function () {
    var intervalId = setInterval(function () {
        timerEl.textContent = "Time Remaining: " + timer;
        //function;
        timer -= 1;
        if (timer == -1 || questionNum > 4) {
            clearInterval(intervalId)
            calculateFinalScore();
            deleteBtns();
        }
    }, 1000);
}

var createBtns = function () {
    var ans1 = document.createElement("button");
    ans1.setAttribute("id", "answer-1");
    buttensEl.appendChild(ans1);

    var ans2 = document.createElement("button");
    ans2.setAttribute("id", "answer-2");
    buttensEl.appendChild(ans2);

    var ans3 = document.createElement("button");
    ans3.setAttribute("id", "answer-3");
    buttensEl.appendChild(ans3);

    var ans4 = document.createElement("button");
    ans4.setAttribute("id", "answer-4");
    buttensEl.appendChild(ans4);
}

var deleteBtns = function () {
    var ans1El = document.querySelector("#answer-1");
    var ans2El = document.querySelector("#answer-2");
    var ans3El = document.querySelector("#answer-3");
    var ans4El = document.querySelector("#answer-4");

    buttensEl.removeChild(ans1El);
    buttensEl.removeChild(ans2El);
    buttensEl.removeChild(ans3El);
    buttensEl.removeChild(ans4El);
}

var nextQuestion = function () {
    var ans1El = document.querySelector("#answer-1");
    var ans2El = document.querySelector("#answer-2");
    var ans3El = document.querySelector("#answer-3");
    var ans4El = document.querySelector("#answer-4");

    if (questionNum < 5) {
        titleEl.textContent = questions[questionNum];

        ans1El.textContent = answers.ans1[questionNum];
        ans2El.textContent = answers.ans2[questionNum];
        ans3El.textContent = answers.ans3[questionNum];
        ans4El.textContent = answers.ans4[questionNum];
    }
}

var getUserAnswer = function (event) {
    var userAnswerEl = event.target;
    calculatePoints(userAnswerEl);
    questionNum++;
    nextQuestion();
}

var rightAnswer = function () {
    playerPoints += 5;
    timer += 5;

    var correct = document.createElement("p");
    correct.setAttribute("id", "response");
    correct.textContent = "You are correct 🎉"
    responseEl.appendChild(correct);

    responseTimer();
};

var wrongAnswer = function () {
    timer -= 3;

    var wrong = document.createElement("p");
    wrong.setAttribute("id", "response");
    wrong.textContent = "Sorry, wrong asnwer 🙁"
    responseEl.appendChild(wrong);

    responseTimer();
}

var responseTimer = function () {
    var localTimer = 0
    var intervalId = setInterval(function () {
        localTimer++
        if (localTimer == 1) {
            clearInterval(intervalId)
            removeResponse();
        }
    }, 1500);
}

var removeResponse = function () {
    var responseChildEl = document.querySelector("#response");
    responseEl.removeChild(responseChildEl);
}

var calculatePoints = function (answer) {
    switch (questionNum) {
        case 0:
            answer.matches("#answer-2") ? rightAnswer() : wrongAnswer();
            break;
        case 1:
            answer.matches("#answer-3") ? rightAnswer() : wrongAnswer();
            break;
        case 2:
            answer.matches("#answer-3") ? rightAnswer() : wrongAnswer();
            break;
        case 3:
            answer.matches("#answer-1") ? rightAnswer() : wrongAnswer();
            break;
        case 4:
            answer.matches("#answer-4") ? rightAnswer() : wrongAnswer();
            break;
    }
}

var calculateFinalScore = function () {
    playerPoints += timer;
    titleEl.textContent = "You Finished The Game with: " + playerPoints + " points!";

    showEndGameBtns();
}

var showEndGameBtns = function () {
    saveEl.setAttribute("id", "save");
    saveEl.textContent = "Save Score"
    buttensEl.appendChild(saveEl);

    playAgainEl.setAttribute("id", "play-again");
    playAgainEl.textContent = "Play Again"
    buttensEl.appendChild(playAgainEl);
}

var saveScore = function () {
    var getName = prompt("Please enter your name");
    playerObj.playerId = playerId;
    playerObj.playerName = getName;
    playerObj.playerScore = playerPoints;

    var savedScore = JSON.stringify(playerObj);
    localStorage.setItem("Player ID: " + playerId, savedScore)
}

var loadHighScore = function () {
    highScores = [];
    for (var i = 0; i < localStorage.length; i++) {
        var score = localStorage.getItem("Player ID: " + i)
        highScores.push(JSON.parse(score));
    }
    playerId = highScores.length;
    console.log(highScores);
}

var viewHighScores = function () {
    location.href = "./high_score.html";
}

var startGame = function () {
    loadHighScore();
    // Remove Start Game button
    startContainerEl.removeChild(startEl)

    // Aligns text to the left by removing the class of "center" from the title element
    titleEl.removeAttribute("class")

    setTimer();
    createBtns();
    nextQuestion();
}

var resetGame = function () {
    timer = 30;
    playerPoints = 0;
    questionNum = 0;
    playerObj.playerName = ""
    playerObj.playerScore = 0;

    buttensEl.removeChild(saveEl);
    buttensEl.removeChild(playAgainEl);
}

var rePlay = function (event) {
    event.stopPropagation();
    loadHighScore();
    resetGame();
    setTimer();
    createBtns();
    nextQuestion();
}

// Event Listeners
startEl.addEventListener("click", startGame);
buttensEl.addEventListener("click", getUserAnswer);
playAgainEl.addEventListener("click", rePlay);
saveEl.addEventListener("click", saveScore);
highScoreBtnEl.addEventListener("click", viewHighScores);