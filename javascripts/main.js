'use strict';

var fire = require('./firebaseApp');
var gridArea = require('./canvas');

fire.getTypesRef();
fire.resetGame();
setTimeout(gridArea.draw, 10);
