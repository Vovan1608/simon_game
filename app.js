"use strict";

// ---- variables
let order = [];
let playerOrder = [];
let flash;
let tern;
let good;
let compTern;
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

// ---- addEventListeners
strictButton.addEventListener("click", (e) => {
	strict = strictButton.checked ? true : false;
});

onButton.addEventListener("click", (e) => {
	if (on.checked) {
		on = true;
		turnCounter.innerHTML = "-";
	} else {
		on = false;
		turnCounter.innerHTML = "";
		clearColor();
		clearInterval(intervalID);
	}
});

startButton.addEventListener("click", (e) => {
	if (on || win) {
		play();
	}
});

// ---- functions
function play() {}