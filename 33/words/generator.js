var chalk = require('chalk');

var generateLineOf = function(length)
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZКАСЯЛЬКА";

    for( var i=0; i < length; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

var generateSquare = function(x, y) {
    var square = '';
    for(var i=0; i<y; i++) {
        square += generateLineOf(x) + '\n';
    }

    return square;
}

var square = generateSquare(12,11);
console.log(square);