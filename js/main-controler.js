'use strict';

let gMouseDown = 0;
let gIsOccupied = false;
let canvas;
let ctx;

function onInit() {
    createShapes();
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth - 50
    canvas.height = window.innerHeight - 100
}

function resetCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function checkMouseDown() {
    document.body.onmousedown = () => ++gMouseDown;
    document.body.onmouseup = () => --gMouseDown;
    return gMouseDown;
}

function drawDelay(option) {
    if (option === 'random') {
        setTimeout(() => {
            gIsOccupied = false
        }, 200)
    } else {
        setTimeout(() => {
            gIsOccupied = false
        }, 10)
    }
}

function draw(ev) {
    if (!checkMouseDown() || gIsOccupied) return
    let option = document.querySelector('.select').value
    drawDelay(option);
    gIsOccupied = true;
    ctx.save()
    const { offsetX, offsetY } = ev
    let randomShape = randomShapes();
    switch (option) {
        case 'special triangle':
            drawSpecialTriangle(offsetX, offsetY)
            break;
        case 'rect':
            drawRect(offsetX, offsetY)
            break;
        case 'circle':
            drawArc(offsetX, offsetY)
            break;
        case 'triangle':
            drawTriangle(offsetX, offsetY)
            break;
        case 'random':
            if (randomShape === 'rect') {
                drawRect(offsetX, offsetY);
                break;
            }
            if (randomShape === 'circle') {
                drawArc(offsetX, offsetY);
                break;
            }
            if (randomShape === 'triangle') {
                drawTriangle(offsetX, offsetY);
                break;
            }
    }
    ctx.restore()
}

function getShape() {
    return document.querySelector('.select').value;
}

function getColor() {
    return document.querySelector('.color').value;
}

function drawRect(x, y) {
    ctx.rect(x, y, 50, 50)
    ctx.strokeStyle = getColor()
    ctx.strokeRect(x, y, 50, 50)
}

function drawArc(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, 50, 0, 2 * Math.PI);
    ctx.strokeStyle = getColor();
    ctx.stroke();
}

function drawSpecialTriangle(x, y) {
    ctx.beginPath();
    ctx.moveTo(y, y - 30);
    ctx.lineTo(x, y);
    ctx.lineTo(x, x - 5);
    ctx.closePath()
    ctx.strokeStyle = getColor();
    ctx.stroke();
}

function drawTriangle(x, y) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 50, y);
    ctx.lineTo(x + 50, y - 50);
    ctx.closePath();
    ctx.strokeStyle = getColor();
    ctx.stroke();
}

function downloadCanvas(elLink) {
    const data = canvas.toDataURL();
    elLink.href = data;
    elLink.download = 'my-img.jpg';
}