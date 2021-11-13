var titleEl = document.querySelector("#title");
var startEl = document.querySelector("#start");
var startContainerEl = document.querySelector(".start-btn")
var buttensEl = document.querySelector(".btns");

var questionNum = 0;
var questions = ["Question 1", "Question 2", "Question 3", "Question 4", "Question 5"];
var answers = {
    ans1: ["test1", "test5", "test9", "test13", "test17"],
    ans2: ["test2", "test6", "test10", "test14", "test18"],
    ans3: ["test3", "test7", "test11", "test15", "test19"],
    ans4: ["test4", "test8", "test12", "test16", "test20"]
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

var nextQuestion = function () {
    titleEl.textContent = questions[questionNum];

    var ans1El = document.querySelector("#answer-1");
    var ans2El = document.querySelector("#answer-2");
    var ans3El = document.querySelector("#answer-3");
    var ans4El = document.querySelector("#answer-4");

    ans1El.textContent = answers.ans1[questionNum];
    ans2El.textContent = answers.ans2[questionNum];
    ans3El.textContent = answers.ans3[questionNum];
    ans4El.textContent = answers.ans4[questionNum];
    questionNum++;
}


var startGame = function () {
    createBtns();
    startContainerEl.removeChild(startEl)
    nextQuestion();
}




// when click on start game

//show new quesions


//show new answer options
// create 4 buttons
// add those buttons to the container
// add text to the buttons based on the question










startEl.addEventListener("click", startGame)
buttensEl.addEventListener("click", nextQuestion)