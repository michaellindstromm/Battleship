'use strict';

var firebase = require('./firebaseApp');

var canvas = document.getElementById('boatCanvas');
var ctx = canvas.getContext('2d');
console.log("ctx", ctx);

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

  },

  getCoords: function(e) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  },

  clickDetect: function() {
    $('canvas').on('click', function(e) {
      let mousePos = canvasArea.getCoords(e);
      let testBoardRef = firebase.getTestRef();
      testBoardRef.once("value", function(data) {
        console.log(data);
        let eachRow = data.val();
        let eachRowKey = Object.keys(eachRow);
        $(eachRowKey).each((nindex, nitem) => {
          let eachLetter = eachRow[nitem];
          let eachLetterKey = Object.keys(eachLetter);
          $(eachLetterKey).each((lindex, litem) => {
            let thisTile = eachLetter[litem];
            if ((thisTile.x - mousePos.x < 30 && thisTile.y - mousePos.y < 30) && (mousePos.x -thisTile.x < 30 && mousePos.y - thisTile.y < 30)) {
              console.log("x", mousePos.x);
              console.log("y", mousePos.y);
              console.log("thisTile.x", thisTile.x);
              console.log("thisTile.y", thisTile.y);
              console.log("ThisTile", nitem, litem);
              ctx.fillStyle = "red";
              ctx.fillRect(thisTile.x-30, thisTile.y-30, 60, 60);
              let thisTileRef = firebase.getEachTileRef(nitem, litem);
              thisTileRef.update({
                'isClicked': true
              });
            }
          });
        });
      });
    });
  },


  draw: function() {
    canvasArea.drawGrid();
    canvasArea.clickDetect();
  }
};


module.exports = canvasArea;
