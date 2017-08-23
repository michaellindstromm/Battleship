'use strict';

var fire = require('./firebaseApp');
var gridArea = require('./canvas');
console.log("gridArea", gridArea);

fire.getTypesRef();
fire.resetGame();
setTimeout(gridArea.draw, 10);
