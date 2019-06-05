'use strict';

let gMouseDown = 0;
let gIsOccupied = false;
let canvas;
let ctx;

function onInit() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth - 50
    canvas.height = window.innerHeight - 100
}

function checkMouseDown() {
    document.body.onmousedown =  () => ++gMouseDown;
    document.body.onmouseup =  () => --gMouseDown;
    return gMouseDown;
}

function drawDelay() {
    setTimeout(() => {
        gIsOccupied = false
    },50)
}

function draw(ev) {
    if (!checkMouseDown() || gIsOccupied) return
    drawDelay();
    gIsOccupied = true;
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








function uploadImg(elForm, ev) {
    ev.preventDefault();

    document.getElementById('imgData').value = canvas.toDataURL("image/jpeg");
   
    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        console.log('uploadedImgUrl', uploadedImgUrl);

        uploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        document.querySelector('.share-container').innerHTML = `
        <a class="w-inline-block social-share-btn fb" href="https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
           Share   
        </a>`
    }

    doUploadImg(elForm, onSuccess);
}

function doUploadImg(elForm, onSuccess) {
    var formData = new FormData(elForm);

    fetch('http://ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })
    .then(function (response) {
        return response.text()
    })
    .then(onSuccess)
    .catch(function (error) {
        console.error(error)
    })
}

function handleImageFromInput(ev, onImageReady) {
    document.querySelector('.share-container').innerHTML = ''
    var reader = new FileReader();

    reader.onload = function (event) {
        var img = new Image();
        img.onload = onImageReady.bind(null, img)
        img.src = event.target.result;
    }
    reader.readAsDataURL(ev.target.files[0]);
}

// facebook api
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = 'https://connect.facebook.net/he_IL/sdk.js#xfbml=1&version=v3.0&appId=807866106076694&autoLogAppEvents=1';
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));