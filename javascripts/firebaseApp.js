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
    console.log("fdr", fdr.ref('/types'));
    let typesRef = fdr.ref('/types');
    typesRef.on("value", function(data) {
      $('.test').append(`<button id=addShip>Add</button><br>`);
      $('#addShip').on("click", function() {
        $('.test').html('');
        let typesRef = fdr.ref('/types');
        typesRef.push({
          length: 2,
          name: "Patrol Boat"
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
        `<div class=${types[eachKey].name}><h2>${types[eachKey].name}</h2><button id=${types[eachKey].name}${i}>Delete</button></div><br>`
      );
      $(`#${types[eachKey].name}${i}`).on("click", function(e) {
        $('.test').html('');
        let typesRef = fdr.ref('/types');
        typesRef.child(`${types[eachKey].name}`).remove();
      });
    }

  }
};

module.exports = fire;
