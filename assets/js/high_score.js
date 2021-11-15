var backBtnEl = document.querySelector("#back-btn");
var scoreListEl = document.querySelector("#score-list");

var highScores = [];
var topFive = [];

var goHome = function () {
    location.href = "index.html";
}

var loadHighScore = function () {
    for (var i = 0; i < localStorage.length; i++) {
        var score = localStorage.getItem("Player ID: " + i)
        highScores.push(JSON.parse(score));
    }
}

var getTopFive = function () {
    var sortedScores = highScores.sort((a, b) => {
        return b.playerScore - a.playerScore;
    });
    //Checking if there are less than 5 scores to avoid console errors in the print score function
    if (sortedScores.length < 5) {
        for (var i = 0; i < sortedScores.length; i++) {
            topFive.push(sortedScores[i])
        }
    }
    else {
        for (var i = 0; i < 5; i++) {
            topFive.push(sortedScores[i])
        }
    }
}

var printScores = function () {
    for (var i = 0; i < topFive.length; i++) {
        var score = document.createElement("li");
        score.textContent = topFive[i].playerName + ": " + topFive[i].playerScore;
        scoreListEl.appendChild(score);
    }
}




loadHighScore();
getTopFive();
printScores();

backBtnEl.addEventListener("click", goHome);