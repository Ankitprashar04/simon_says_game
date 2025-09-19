let gameseq = [];
let userseq = [];
let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
    if (!started) {
        console.log("Game started");
        started = true;
        level = 0;
        gameseq = [];
        levelup();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 500);
}

function userFlash(btn) {
    btn.classList.add("user-flash");
    setTimeout(function () {
        btn.classList.remove("user-flash");
    }, 500);
}

function levelup() {
    userseq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randbtn = document.querySelector(`.${randColor}`);
    gameseq.push(randColor);
    gameFlash(randbtn);
}

function checkAns(idx) {
    if (userseq[idx] === gameseq[idx]) {
        if (userseq.length === gameseq.length) {
            setTimeout(levelup, 1000);
        }
    } else {
        h2.innerText = `Game Over! Your score was ${level - 1}. Press any key to start`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userseq.push(userColor);

    checkAns(userseq.length - 1);
}

let allbtn = document.querySelectorAll(".btn");
for (let btn of allbtn) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
}
