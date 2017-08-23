'use strict';

var firebase = require('../lib/node_modules/firebase');

var config = {
   apiKey: "AIzaSyB5c3npYlEk8n-9kAnMzrbHkbE2D_JAf6I",
   authDomain: "battleship-600bc.firebaseapp.com",
   databaseURL: "https://battleship-600bc.firebaseio.com",
   projectId: "battleship-600bc",
   storageBucket: "battleship-600bc.appspot.com",
   messagingSenderId: "1058713267582"
};

firebase.initializeApp(config);

var fdr = firebase.database();

var fire = {
  getTypesRef: function() {
    let typesRef = fdr.ref('/types');
    typesRef.on("value", function(data) {
      $('.test').html('');
      $('.test').append(`<button id=addShip>Add</button><br>`);
      $('#addShip').on("click", function() {
        $('.test').html('');
        let typesRef = fdr.ref('/types');
        typesRef.push({
          length: 2,
          name: "P Boat"
        });
      });
      fire.showTypes(data.val());
    });
  },

  showTypes: function(types) {
    let keys = Object.keys(types);
    for (var i = 0; i < keys.length; i++) {
      let eachKey = keys[i];
      $('.test').append(
        `<div class=${types[eachKey].name}><h2>${types[eachKey].name}</h2><button id=delete${eachKey}>Delete</button></div><br>`
      );
      $(`#delete${eachKey}`).on("click", function(e) {
        $('.test').html('');
        let typesRef = fdr.ref('/types');
        typesRef.child(`${eachKey}`).remove();
      });
    }
  },

  addRootChild: function(name) {
    return fdr.ref().child(name);
  },

  getBoardRef: function() {
    return fdr.ref('testBoard');
  },

  getEachTileRef: function(letter, number) {
    return fdr.ref(`testBoard/${letter}/${number}`);
  },

  getTileChildRef: function(letter, number, key) {
    return fdr.ref(`testBoard/${letter}/${number}/${key}`);
  },

  resetGame: function() {
    let testBoardRef = fdr.ref('testBoard/');
    testBoardRef.set({
      a: {1: {x: 30, y: 30, hasBoat: false, isClicked: false}, 2: {x: 30, y:90, hasBoat: false, isClicked: false}, 3: {x: 30, y:150, hasBoat: false, isClicked: false}, 4: {x: 30, y:210, hasBoat: false, isClicked: false}, 5: {x: 30, y:270, hasBoat: false, isClicked: false}, 6: {x: 30, y:330, hasBoat: false, isClicked: false}, 7: {x: 30, y:390, hasBoat: false, isClicked: false}, 8: {x: 30, y:450, hasBoat: false, isClicked: false}, 9: {x: 30, y:510, hasBoat: false, isClicked: false}, 10: {x: 30, y:570, hasBoat: false, isClicked: false}},

      b: {1: {x: 90, y: 30, hasBoat: false, isClicked: false}, 2: {x: 90, y:90, hasBoat: false, isClicked: false}, 3: {x: 90, y:150, hasBoat: false, isClicked: false}, 4: {x: 90, y:210, hasBoat: false, isClicked: false}, 5: {x: 90, y:270, hasBoat: false, isClicked: false}, 6: {x: 90, y:330, hasBoat: false, isClicked: false}, 7: {x: 90, y:390, hasBoat: false, isClicked: false}, 8: {x: 90, y:450, hasBoat: false, isClicked: false}, 9: {x: 90, y:510, hasBoat: false, isClicked: false}, 10: {x: 90, y:570, hasBoat: false, isClicked: false}},

      c: {1: {x: 150, y: 30, hasBoat: false, isClicked: false}, 2: {x: 150, y:90, hasBoat: false, isClicked: false}, 3: {x: 150, y:150, hasBoat: false, isClicked: false}, 4: {x: 150, y:210, hasBoat: false, isClicked: false}, 5: {x: 150, y:270, hasBoat: false, isClicked: false}, 6: {x: 150, y:330, hasBoat: false, isClicked: false}, 7: {x: 150, y:390, hasBoat: false, isClicked: false}, 8: {x: 150, y:450, hasBoat: false, isClicked: false}, 9: {x: 150, y:510, hasBoat: false, isClicked: false}, 10: {x: 150, y:570, hasBoat: false, isClicked: false}},

      d: {1: {x: 210, y: 30, hasBoat: false, isClicked: false}, 2: {x: 210, y:90, hasBoat: false, isClicked: false}, 3: {x: 210, y:150, hasBoat: false, isClicked: false}, 4: {x: 210, y:210, hasBoat: false, isClicked: false}, 5: {x: 210, y:270, hasBoat: false, isClicked: false}, 6: {x: 210, y:330, hasBoat: false, isClicked: false}, 7: {x: 210, y:390, hasBoat: false, isClicked: false}, 8: {x: 210, y:450, hasBoat: false, isClicked: false}, 9: {x: 210, y:510, hasBoat: false, isClicked: false}, 10: {x: 210, y:570, hasBoat: false, isClicked: false}},

      e: {1: {x: 270, y: 30, hasBoat: false, isClicked: false}, 2: {x: 270, y:90, hasBoat: false, isClicked: false}, 3: {x: 270, y:150, hasBoat: false, isClicked: false}, 4: {x: 270, y:210, hasBoat: false, isClicked: false}, 5: {x: 270, y:270, hasBoat: false, isClicked: false}, 6: {x: 270, y:330, hasBoat: false, isClicked: false}, 7: {x: 270, y:390, hasBoat: false, isClicked: false}, 8: {x: 270, y:450, hasBoat: false, isClicked: false}, 9: {x: 270, y:510, hasBoat: false, isClicked: false}, 10: {x: 270, y:570, hasBoat: false, isClicked: false}},

      f: {1: {x: 330, y: 30, hasBoat: false, isClicked: false}, 2: {x: 330, y:90, hasBoat: false, isClicked: false}, 3: {x: 330, y:150, hasBoat: false, isClicked: false}, 4: {x: 330, y:210, hasBoat: false, isClicked: false}, 5: {x: 330, y:270, hasBoat: false, isClicked: false}, 6: {x: 330, y:330, hasBoat: false, isClicked: false}, 7: {x: 330, y:390, hasBoat: false, isClicked: false}, 8: {x: 330, y:450, hasBoat: false, isClicked: false}, 9: {x: 330, y:510, hasBoat: false, isClicked: false}, 10: {x: 330, y:570, hasBoat: false, isClicked: false}},

      g: {1: {x: 390, y: 30, hasBoat: false, isClicked: false}, 2: {x: 390, y:90, hasBoat: false, isClicked: false}, 3: {x: 390, y:150, hasBoat: false, isClicked: false}, 4: {x: 390, y:210, hasBoat: false, isClicked: false}, 5: {x: 390, y:270, hasBoat: false, isClicked: false}, 6: {x: 390, y:330, hasBoat: false, isClicked: false}, 7: {x: 390, y:390, hasBoat: false, isClicked: false}, 8: {x: 390, y:450, hasBoat: false, isClicked: false}, 9: {x: 390, y:510, hasBoat: false, isClicked: false}, 10: {x: 390, y:570, hasBoat: false, isClicked: false}},

      h: {1: {x: 450, y: 30, hasBoat: false, isClicked: false}, 2: {x: 450, y:90, hasBoat: false, isClicked: false}, 3: {x: 450, y:150, hasBoat: false, isClicked: false}, 4: {x: 450, y:210, hasBoat: false, isClicked: false}, 5: {x: 450, y:270, hasBoat: false, isClicked: false}, 6: {x: 450, y:330, hasBoat: false, isClicked: false}, 7: {x: 450, y:390, hasBoat: false, isClicked: false}, 8: {x: 450, y:450, hasBoat: false, isClicked: false}, 9: {x: 450, y:510, hasBoat: false, isClicked: false}, 10: {x: 450, y:570, hasBoat: false, isClicked: false}},

      i: {1: {x: 510, y: 30, hasBoat: false, isClicked: false}, 2: {x: 510, y:90, hasBoat: false, isClicked: false}, 3: {x: 510, y:150, hasBoat: false, isClicked: false}, 4: {x: 510, y:210, hasBoat: false, isClicked: false}, 5: {x: 510, y:270, hasBoat: false, isClicked: false}, 6: {x: 510, y:330, hasBoat: false, isClicked: false}, 7: {x: 510, y:390, hasBoat: false, isClicked: false}, 8: {x: 510, y:450, hasBoat: false, isClicked: false}, 9: {x: 510, y:510, hasBoat: false, isClicked: false}, 10: {x: 510, y:570, hasBoat: false, isClicked: false}},

      j: {1: {x: 570, y: 30, hasBoat: false, isClicked: false}, 2: {x: 570, y:90, hasBoat: false, isClicked: false}, 3: {x: 570, y:150, hasBoat: false, isClicked: false}, 4: {x: 570, y:210, hasBoat: false, isClicked: false}, 5: {x: 570, y:270, hasBoat: false, isClicked: false}, 6: {x: 570, y:330, hasBoat: false, isClicked: false}, 7: {x: 570, y:390, hasBoat: false, isClicked: false}, 8: {x: 570, y:450, hasBoat: false, isClicked: false}, 9: {x: 570, y:510, hasBoat: false, isClicked: false}, 10: {x: 570, y:570, hasBoat: false, isClicked: false}},
    });
  }
};




module.exports = fire;
