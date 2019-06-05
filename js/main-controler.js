'use strict';

const canvas = document.getElementById('canvas');
console.log(canvas)
const ctx = canvas.getContext('2d');

function draw(ev) {
    ctx.save()
    const { offsetX, offsetY } = ev

    switch (document.querySelector('.select').value) {
        case 'triangle':
            drawTriangle(offsetX, offsetY)
            break;
        case 'rect':
            drawRect(offsetX, offsetY)
            break;
        case 'circle':
            drawArc(offsetX, offsetY)
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

function drawRect(x,y) {
    ctx.rect(x,y, 50, 50)
    ctx.fillStyle = getColor()
    ctx.fillRect(x,y, 50, 50)
}

function drawArc(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, 50, 0, 2 * Math.PI);
    ctx.stroke();
}

function drawTriangle(x, y) {
    ctx.beginPath();
    ctx.moveTo(y, y-30);
    ctx.lineTo(x, y);
    ctx.lineTo(x, x-5);
    ctx.closePath()
    ctx.stroke();
}