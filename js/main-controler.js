

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



function drawRect(x,y) {
    ctx.rect(x,y, 150, 200)
    ctx.fillStyle = 'white'
    ctx.fillRect(x,y, 150, 150)
    ctx.stroke()
    // ctx.fill()
}