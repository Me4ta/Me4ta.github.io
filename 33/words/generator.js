var chalk = require('chalk');
var _ = require('lodash');
var S = require('string');
var log = require('./utils').log;


var generateLineOf = function(length){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZКАСЯЛЬКА8";

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

var higlightWord = function(wordToHiglight, color, squareOfWords) {
    var coloredSquare = '';
    var wordToHiglightArray = wordToHiglight.split('');
    var currentLetter = wordToHiglightArray.shift();
    var chalkColor = color || 'white';

    _.each(squareOfWords, function(letter) {
        if (letter == currentLetter) {
            coloredSquare += chalk[chalkColor](letter);
            currentLetter = wordToHiglightArray.shift();
        } else {
            coloredSquare += chalk.gray(letter);
        }    
    });    
    console.log(coloredSquare);
}

var checkWordsCount = function(words) {
    if (words.length == 33) {
        log.ok('total words: ' + chalk.yellow(words.length));
    } else {
        log.fail('total words: ' + chalk.yellow(words.length));    
    }
}

var checkCharsCount = function(chars) {
    var expectedCount = 132 //33 years * 4 (code lenght);
    if (chars.length == expectedCount) { 
        log.ok('total chars: ' + chalk.yellow(chars.length));
    } else {
        log.fail('total chars: ' + chalk.yellow(chars.length));    
    }   
}

var words = [
    'Phoebe', 'Wallie', 'Chandler', 'Baby', 'Bike', 'Me4ta', 'Restuta', 'Racing',
    'Love', 'Will', 'You', 'Marry', 'Me', 'California', '8', 'Sex', 'Music', 'Time',
    'Together', 'Sunset', 'Ocean', 'Coffee', 'Hue', 'Wine', 'Morning', 'Касялька', 
    'BayArea', 'Talks', 'Travel', 'Vegas', 'Respect', 'Books', 'Unicorns'
];

checkWordsCount(words);
checkCharsCount(words.join('').split(''));
console.log();


var createSquareFromWords = function(words, options) {
    var options = options || {
        lineLength: 12
    };

    var wordsJoined = words.join('').toUpperCase();
    var wordsWithNewLines = '';
    var currentLineLength = 0;

    for(var i = 0; i < wordsJoined.length; i++) {
        wordsWithNewLines += wordsJoined[i];

        if (i % options.lineLength === 0 && i !== 0) {
            wordsWithNewLines += '\n';
        }
    }

    return wordsWithNewLines;
}

var squareOfWords = createSquareFromWords(words, {lineLength: 12});
console.log(squareOfWords);

//var squareOfWords = generateSquare(12,11);

//higlightWord('LOVE', 'red', squareOfWords);
//higlightWord('WILL', 'white', squareOfWords);


console.log(chalk.grey('--- done ---') + '\n');

