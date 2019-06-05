

const canvas = document.getElementById('canvas');
console.log(canvas)
const ctx = canvas.getContext('2d');


let gCurrElement = 'rect'


function draw(ev) {
    ctx.save()
    console.log(ev)
    const {offsetX, offsetY} = ev

    switch (gCurrElement) {
        case 'triangle':
            drawTriangle()
            break;
        case 'rect':
            drawRect(offsetX, offsetY)
            break;
        case 'text':
            drawText('test',offsetX, offsetY)
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
    ctx.stroke()
    // ctx.fill()
}