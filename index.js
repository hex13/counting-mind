// js13k 2024 entry by Łukasz Lityński

const rnd = (max) => ~~(Math.random() * max);

const equationEl = document.getElementById('equation');
const resultEl = document.getElementById('result');
const pointsEl = document.getElementById('points');
const barEl = document.getElementById('bar');
const goodOrBadEl = document.getElementById('good-or-bad');
const okEl = document.getElementById('ok');

function generateEquation(result) {
	let a, b;
	let label;
	a = rnd(20) + 1;
	if (a <= result) {
		b = result - a;
		label = `${a} + ${b}`;
	} else {
		b = a - result;
		label = `${a} - ${b}`;
	}
	return label;
}

function generateResult() {
	let number;
	if (Math.random() < 0.5) {
		number = 13;
	} else {
		number = rnd(21);
		if (number >= 13) number++;
	}
	return number;
}

let points = 0;

let equation;

function nextEquation() {
	const result = generateResult();
	const label = generateEquation(result);
	equation = {result, label};
	equationEl.innerText = label;
	pointsEl.innerText = 'points: ' + points;
}

let autoAnswerTimeout;

function answer(is13) {
	barEl.classList.remove('waiting');
	okEl.style.visibility = 'hidden';
	resultEl.innerText = ' = ' + equation.result;

	if (is13 != (equation.result == 13)) {
		goodOrBadEl.innerText = 'Wrong!';
		barEl.classList.add('wrong');
		points--;
	} else {
		goodOrBadEl.innerText = 'Good!';
		points++;
		barEl.classList.add('good');
	}
	pointsEl.innerText = 'points: ' + points;

	setTimeout(() => {
		nextChallenge();
	}, 2000);
}

function nextChallenge() {
		okEl.style.visibility = 'visible';
		resultEl.innerText = '';
		barEl.classList.remove('good');
		barEl.classList.remove('wrong');
		goodOrBadEl.innerText = '';
		barEl.classList.add('waiting');
		nextEquation();
		autoAnswerTimeout = setTimeout(() => {
			answer(true);
		}, 2000);
}

nextChallenge();

document.getElementById('ok').addEventListener('click', () => {
	clearTimeout(autoAnswerTimeout);
	answer(false);
});