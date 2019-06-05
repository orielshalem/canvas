

const canvas = document.getElementById('canvas');
console.log(canvas)
const ctx = canvas.getContext('2d');


let gCurrElement = 'triangle'


function draw(ev) {
    ctx.save()
    const { offsetX, offsetY } = ev

    switch (gCurrElement) {
        case 'triangle':
            drawTriangle(offsetX, offsetY)
            break;
        case 'rect':
            drawRect(offsetX, offsetY)
            break;
        case 'arc':
            drawArc(offsetX, offsetY)
            break;
    }
    ctx.restore()
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


function drawRect(x, y) {
    ctx.rect(x, y, 150, 200)
    ctx.fillStyle = 'white'
    ctx.fillRect(x, y, 150, 150)
    ctx.stroke()
}