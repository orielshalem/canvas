'use strict';

let gShapes;

function createShapes() {
    let shapes = ['rect', 'circle', 'triangle'];
    gShapes = shapes;
}

function randomShapes() {
    let randomNum = getRandomInt(0,3);
    return gShapes[randomNum];
}