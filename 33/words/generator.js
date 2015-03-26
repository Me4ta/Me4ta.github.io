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

var testWordsCount = function(words) {
    var expectedCount = 33;
    if (words.length == expectedCount) {
        log.ok('total words: ' + chalk.yellow(words.length));
    } else {
        log.fail('total words: ' + chalk.yellow(words.length) + chalk.grey('/' + expectedCount));    
    }
}

var testCharsCount = function(chars) {
    var expectedCount = 132 //33 years * 4 (code lenght);
    if (chars.length == expectedCount) { 
        log.ok('total chars: ' + chalk.yellow(chars.length));
    } else {
        log.fail('total chars: ' + chalk.yellow(chars.length) + chalk.grey('/' + expectedCount));    
    }   
}

var createColoredSquareFromWords = function(words){
    var wordsJoined = words.join('').toUpperCase();

    return _(wordsJoined).map(function(letter){
        return {
            letter: letter,
            color: 'gray'
        }
    }).value();   
}

var higlightWord = function(wordToHiglight, color, squareOfWords) {
    var coloredSquare = [];

    var wordToHiglightArray = wordToHiglight.toUpperCase().split('');
    
    var currentLetter = wordToHiglightArray.shift();
    var higlightColor = color || 'white';
    var highlightedCount = 0;

    _.each(squareOfWords, function(item) {
        var itemCopy = _.clone(item);

        if (item.letter == currentLetter) {
            itemCopy.color = higlightColor;
            currentLetter = wordToHiglightArray.shift();
            highlightedCount++;
        }

        coloredSquare.push(itemCopy);
    });

    if (highlightedCount !== wordToHiglight.length) {
        throw 'Word ' + wordToHiglight + ' cat not be higligted fully';
    }    
    
    return coloredSquare;
}


var printColoredSquare = function(square, options){
    var options = options || {
        lineLength: 12
    };

    for(var i = 0; i < square.length; i++) {
        if (i % options.lineLength === 0 && i !== 0) {
            console.log();
        }

        var color = square[i].color;
        var letter = square[i].letter;

        //if (color != 'gray') 
            process.stdout.write(chalk[color](letter));
        
        
    }
    console.log();
}

//todo: write tests verifying that it's able to find all words in a square
var words = [
    'Phoebe', 'Wallie', 'Chandler', 'Baby', 'Bike', 'Me4ta', 'Restuta', 'Racing',
    'Love', 'Will', 'You', 'Marry', 'Me', 'California', '8', 'Sex', 'Music', 'Time',
    'Together', 'Sunset', 'Ocean', 'Coffee', 'Hue', 'Wine', 'Morning', 'Касялька', 
    'BayArea', 'Talks', 'Travel', 'Vegas', 'Respect', 'Books', 'Unicorns'
];

testWordsCount(words);
testCharsCount(words.join('').split(''));
console.log();

//var coloredSquare = createColoredSquareFromWords(words);
var coloredSquare = createColoredSquareFromWords(
    ['PHOEBEWALLIECHANDLERBAYIKEME4TARESTUTARCINGLOVEILYOUMRECFORNIA8SEXICTGETHERNAFEEGКАСЯЛЬКАKSPECT']);

var squareWithHiglights = coloredSquare;
_.each(words, function(word){
    squareWithHiglights = higlightWord(word, 'white', squareWithHiglights);
});
    
printColoredSquare(squareWithHiglights, {lineLength: 12});



//can higlight whole word by using "contains", but higligting closest is tough task
    /* brute version casn be:
        01: contains "TRAVEL" ?
            02: no => contains "TRAVE"
                03: yes => search for "L"
                04: no => goto 02

    */

console.log(chalk.grey('--- done ---') + '\n');

