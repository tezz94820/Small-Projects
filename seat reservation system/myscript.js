const left = document.querySelector('#left');
const middle = document.querySelector('#middle');
const right = document.querySelector('#right');


function leftSection(lower, upper, label) {
    left.innerHTML += `<div class="label">${label}</div>`;
    for (let i = lower; i <= upper; i++) {
        left.innerHTML += `<div id="a${i}">${i}</div>`;
    }
}

function middleSection(lower, upper) {
    for (let i = lower; i <= upper; i++) {
        middle.innerHTML += `<div id="a${i}">${i}</div>`;
    }
}

function rightSection(lower, upper, label) {
    for (let i = lower; i <= upper; i++) {
        right.innerHTML += `<div id="a${i}">${i}</div>`;
    }
    right.innerHTML += `<div class="label">${label}</div>`;
}

const nextChar = ch => String.fromCharCode(ch.charCodeAt(0) + 1);


let n = 100;
n = n > 26 ? 26 : n;
let upLow = 0;
let label = '@';
for (let i = 1; i <= n; i++) {
    label = nextChar(label);
    leftSection(++upLow, upLow += 2, label);
    middleSection(++upLow, upLow += 8);
    rightSection(++upLow, upLow += 2, label);
}