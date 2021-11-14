var backBtnEl = document.querySelector("#back-btn");
var scoreListEl = document.querySelector("#score-list");

var highScores = [];
var topFive = [];

var goHome = function () {
    location.href = "./index.html";
    console.log("test")
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
    for (var i = 0; i < 5; i++) {
        topFive.push(sortedScores[i])
    }
}

var printScores = function () {
    var score1 = document.createElement("li");
    score1.setAttribute("id", "score-1");
    score1.textContent = topFive[0].playerName + ": " + topFive[0].playerScore;
    scoreListEl.appendChild(score1);

    var score2 = document.createElement("li");
    score2.setAttribute("id", "score-2");
    score2.textContent = topFive[1].playerName + ": " + topFive[1].playerScore;
    scoreListEl.appendChild(score2);

    var score3 = document.createElement("li");
    score3.setAttribute("id", "score-3");
    score3.textContent = topFive[2].playerName + ": " + topFive[2].playerScore;
    scoreListEl.appendChild(score3);

    var score4 = document.createElement("li");
    score4.setAttribute("id", "score-4");
    score4.textContent = topFive[3].playerName + ": " + topFive[3].playerScore;
    scoreListEl.appendChild(score4);

    var score5 = document.createElement("li");
    score5.setAttribute("id", "score-4");
    score5.textContent = topFive[4].playerName + ": " + topFive[4].playerScore;
    scoreListEl.appendChild(score5);
}









loadHighScore();
getTopFive();
printScores();

backBtnEl.addEventListener("click", goHome);