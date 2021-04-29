"use strict";

// ---- variables
let order = [];
let playerOrder = [];
let flash;
let tern;
let good;
let compTurn;
let intervalID;
let strict = false;
let noise = true;
let on = false;
let win;

// ---- const
const turnCounter = document.getElementById("turn");
const topLeft = document.getElementById("topleft");
const topRight = document.getElementById("topright");
const bottomLeft = document.getElementById("bottomleft");
const bottomRight = document.getElementById("bottomright");
const strictButton = document.getElementById("strict");
const onButton = document.getElementById("on");
const startButton = document.getElementById("start");

// ---- functions
function play() {
	win = false;
	order = [];
	playerOrder = [];
	flash = 0;
	intervalID = 0;
	turn = 1;
	turnCounter.innerHTML = 1;
	good = true;
	// 20 - num of games
	for (let i = 0; i < 20; i += 1) {
		order.push(Math.floor(Math.random() * 4) + 1);
	}
	
	compTurn = true;

	intervalID = setInterval(gameTurn, 800);
}

function gameTurn() {
	on = false;

	if (flash === turn) {
		clearInterval(intervalID);
		compTurn = false;
		clearColor();
		on = true;
	}

	if (compTurn) {
		clearColor();
		setTimeout( () => {
			if (order[flash] === 1) one();
			if (order[flash] === 2) two();
			if (order[flash] === 3) three();
			if (order[flash] === 4) four();
			flash += 1;
		}, 200);
	}
}

function one() {
	if (noise) {
		let audio = document.getElementById("clip1");
		audio.play();
	}

	noise = true;
	topLeft.style.backgroundColor = "lightgreen";
}

function two() {
	if (noise) {
		let audio = document.getElementById("clip2");
		audio.play();
	}

	noise = true;
	topRight.style.backgroundColor = "tomato";
}

function three() {
	if (noise) {
		let audio = document.getElementById("clip3");
		audio.play();
	}

	noise = true;
	bottomLeft.style.backgroundColor = "yellow";
}

function four() {
	if (noise) {
		let audio = document.getElementById("clip4");
		audio.play();
	}

	noise = true;
	bottomRight.style.backgroundColor = "lightskyblue";
}

function clearColor() {
	topLeft.style.backgroundColor = "darkgreen";
	bottomLeft.style.backgroundColor = "goldenrod";
	topRight.style.backgroundColor = "darkred";
	bottomRight.style.backgroundColor = "darkblue";
}

function check() {
	if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1]) {
		good = false;
	}
	// 20 is num of games
	if (playerOrder.length === 20 && good) {
		winGame();
	}

	if (!good) {
		flashColor();
		turnCounter.innerHTML = "NO!";
		setTimeout(() => {
			turnCounter.innerHTML = turn;
			clearColor();

			if (strict) {
				play();
			} else {
				compTurn = true;
				flash = 0;
				playerOrder = [];
				good = true;
				intervalID = setInterval(gameTurn, 800);
			}
		}, 800);

		noise = false;
	}

	if (turn === playerOrder.length && good && !win) {
		turn += 1;
		playerOrder = [];
		compTurn = true;
		flash = 0;
		turnCounter.innerHTML = turn;
		intervalID = setInterval(gameTurn, 800);
	}
}

function flashColor() {
	topLeft.style.backgroundColor = "lightgreen";
	bottomLeft.style.backgroundColor = "tomato";
	topRight.style.backgroundColor = "yellow";
	bottomRight.style.backgroundColor = "lightskyblue";
}
// ---- addEventListeners
strictButton.addEventListener("click", () => {
	strict = strictButton.checked ? true : false;
});

onButton.addEventListener("click", () => {
	if (onButton.checked) {
		on = true;
		turnCounter.innerHTML = "-";
	} else {
		on = false;
		turnCounter.innerHTML = "";
		clearColor();
		clearInterval(intervalID);
	}
});

startButton.addEventListener("click", () => {
	if (on || win) {
		play();
	}
});

topLeft.addEventListener("click", () => {
	if (on) {
		playerOrder.push(1);
	}
	check();
	one();
	if(!win) {
		setTimeout(() => {
			clearColor();
		}, 300);
	}
});

topRight.addEventListener("click", () => {
	if (on) {
		playerOrder.push(2);
	}
	check();
	two();
	if(!win) {
		setTimeout(() => {
			clearColor();
		}, 300);
	}
});

bottomLeft.addEventListener("click", () => {
	if (on) {
		playerOrder.push(3);
	}
	check();
	three();
	if(!win) {
		setTimeout(() => {
			clearColor();
		}, 300);
	}
});

bottomRight.addEventListener("click", () => {
	if (on) {
		playerOrder.push(4);
	}
	check();
	four();
	if(!win) {
		setTimeout(() => {
			clearColor();
		}, 300);
	}
});