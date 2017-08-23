'use strict';

var firebase = require('./firebaseApp');

var canvas = document.getElementById('boatCanvas');
var ctx = canvas.getContext('2d');

var isClicked = 'isClicked';
var hasBoat = 'hasBoat';
var halfWidth = (canvas.width/10)/2;
var halfHeight = (canvas.height/10)/2;

var canvasArea = {
  drawGrid: () => {
    for (var x = 0; x < canvas.width; x += canvas.width/10) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
    }

    for (var y = 0; y < canvas.height; y += canvas.height/10) {
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
    }
    ctx.stroke();
    let boardRef = firebase.getBoardRef();
    boardRef.on("value", function(data) {
      let eachRow = data.val();
      let eachRowKey = Object.keys(eachRow);
      $(eachRowKey).each((lindex, litem) => {
        let eachLetter = eachRow[litem];
        let eachLetterKey = Object.keys(eachLetter);
        $(eachLetterKey).each((nindex, nitem) => {
          let thisTile = eachLetter[nitem];
          let thisTileClickRef = firebase.getTileChildRef(litem, nitem, isClicked);
          console.log(thisTile);
          if (thisTile.isClicked === true) {
            console.log(thisTileClickRef);
            ctx.fillStyle = "red";
            ctx.fillRect(thisTile.x-halfWidth, thisTile.y-halfHeight, 60, 60);
          }
        });
      });
    });
  },

  getCoords: function(e) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  },

  clickDetect: function() {
    $('canvas').on('click', canvasArea.updateIsClicked);
  },

  updateIsClicked: function(e) {
    let mousePos = canvasArea.getCoords(e);
    let boardRef = firebase.getBoardRef();
    boardRef.once("value", function(data) {
      let eachRow = data.val();
      let eachRowKey = Object.keys(eachRow);
      $(eachRowKey).each((lindex, litem) => {
        let eachLetter = eachRow[litem];
        let eachLetterKey = Object.keys(eachLetter);
        $(eachLetterKey).each((nindex, nitem) => {
          let thisTile = eachLetter[nitem];
          if ((thisTile.x - mousePos.x < halfWidth && thisTile.y - mousePos.y < halfHeight) && (mousePos.x -thisTile.x < halfWidth && mousePos.y - thisTile.y < halfHeight)) {
            let thisTileRef = firebase.getEachTileRef(litem, nitem);
            thisTileRef.update({
              'isClicked': true
            });
          }
        });
      });
    });
    canvasArea.draw();
  },

  draw: function() {
    canvasArea.drawGrid();
    canvasArea.clickDetect();
  }
};


module.exports = canvasArea;
