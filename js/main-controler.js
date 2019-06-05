'use strict';

let canvas;
let ctx;

function onInit() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth - 50
    canvas.height = window.innerHeight - 100
}

function draw(ev) {
    ctx.save()
    const { offsetX, offsetY } = ev

    switch (document.querySelector('.select').value) {
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
    ctx.lineTo(x+50, y);
    ctx.lineTo(x+50, y-50);
    ctx.closePath();
    ctx.strokeStyle = getColor();
    ctx.stroke();
}