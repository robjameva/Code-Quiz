var backBtnEl = document.querySelector("#back-btn");

var goHome = function () {
    location.href = "./index.html";
    console.log("test")
}

backBtnEl.addEventListener("click", goHome);