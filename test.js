const fs = require('fs');
const path = require('path')
fs.writeFile('./e/mynewfile3.txt', 'This is my text', function (err) {
    if (err) throw err;
    console.log('Replaced!');
  });