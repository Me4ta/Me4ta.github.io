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
    var expectedCount = 32;
    if (words.length == expectedCount) {
        log.ok('total words: ' + chalk.yellow(words.length));
    } else {
        log.fail('total words: ' + chalk.yellow(words.length) + chalk.grey('/' + expectedCount));    
    }
}

var testCharsCount = function(chars) {
    var expectedCount = 128 //32 years * 4 (code lenght); + 4 is from LOVE extra
    if (chars.length == expectedCount) { 
        log.ok('total chars: ' + chalk.yellow(chars.length));
    } else {
        log.fail('total chars: ' + chalk.yellow(chars.length) + chalk.grey('/' + expectedCount));    
    }   
}

var testWordsAreInSquare = function(words, square) {
    var allOk = true;

    _.each(words, function(word){
        var failed = false;

        higlightWord(word, 'white', square, function(notHiglightedWord, msg){
            log.fail(notHiglightedWord + chalk.grey(' is not higligted'));
            failed = true;
            allOk = false;
        });

        // if (!failed) {
        //     log.ok(word);
        // }
    });

    if (allOk) {
        log.ok('all ' + chalk.yellow(words.length) + ' words were found in Square');
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

var createSquareAndSuffle = function(words){
    var suffledWords = words;

    return createColoredSquareFromWords(suffledWords);
}

var higlightWord = function(wordToHiglight, color, squareOfWords, errorCallback) {
    var coloredSquare = _.clone(squareOfWords, /*deep*/true);
    var higlightColor = color || 'white';
    var highlightedCount = 0;

    var allWordsInOneString = _.map(squareOfWords, function(item){
        return item.letter;
    }).join('');

    var indexOfWordToHiglight = allWordsInOneString.indexOf(wordToHiglight.toUpperCase());

    //meaning word can be higligted as a whole
    if (indexOfWordToHiglight >= 0) {

        var startIndex = indexOfWordToHiglight;
        var endIndex = indexOfWordToHiglight + wordToHiglight.length - 1;

        for(var i = startIndex; i <= endIndex; i++) {
            coloredSquare[i].color = higlightColor;
        }

        highlightedCount = wordToHiglight.length;
    } else { //if can't be higlighted as a whole search through
        log.fail('  ' +chalk.blue(wordToHiglight) + ' is not whole');
        var wordToHiglightArray = wordToHiglight.toUpperCase().split('');
        var currentLetter = wordToHiglightArray.shift();

        _.each(coloredSquare, function(item) {
            if (item.letter == currentLetter) {
                item.color = higlightColor;
                currentLetter = wordToHiglightArray.shift();
                highlightedCount++;
            }
        });
    }

    if (errorCallback && highlightedCount !== wordToHiglight.length) {
        errorCallback(wordToHiglight, 'Word ' + wordToHiglight + ' cat not be higligted fully');
    }    
    
    return coloredSquare;
}

var higlightSeveral = function(words, color, squareOfWords){
    var square = squareOfWords;

    _.each(words, function(word){
        square = higlightWord(word, color, square);
    });

    return square;
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
var wordsToCheck = [
    'Phoebe', 'Wallie', 'Chandler', 'Baby', 'Bike', 'Me4ta', 'Restuta', 'Racing',
    'Will', 'You', 'Marry', 'Me', 'California', '8', 'Sex', 'Music', 'Time',
    'Together', 'Sunset', 'Ocean', 'Coffee', 'Hue', 'Wine', 'Morning', 
    'Касялька', 'USA', 'Talks', 'Travel','Vegas', 'Respect', 'Books', 'Unicorns'
]; // + love

var words = [
    'Chan', 'Phoebe', 'Wallie', 
    'dler', '8','Bike', 'Travel', 
    'Me4ta', 'Will', 'Coffee', 'restuta',
    'You', 'Baby','Wine', 'To',  
    'Sex', 'Music', 'gether', 'Marry','Respect', 
    'Ti', 'Касялька', 'Unicorns', 
    'books','racing','Vegas','me'
]; // + love


var coloredSquare = createColoredSquareFromWords(words);
//var coloredSquare = createColoredSquareFromWords(_.shuffle(words));
//var coloredSquare = createSquareAndSuffle(_.shuffle(words));
//var coloredSquare = createColoredSquareFromWords(['PHOEBEWALLIECHANDLERBAYIKEME4TARESTUTARCINGLOVEILYOUMRECFORNIA8SEXICTGETHERNAFEEGКАСЯЛЬКАKSPECT']);


testWordsCount(wordsToCheck);
testCharsCount(coloredSquare);
testWordsAreInSquare(wordsToCheck, coloredSquare);
console.log();

//higlight all one by one
// var squareWithHiglights = coloredSquare;
// _.each(words, function(word){
//     //squareWithHiglights = higlightWord(word, 'white', squareWithHiglights);

//     var x = higlightWord(word, 'white', squareWithHiglights);
//     printColoredSquare(x, {lineLength: 12});  
//     console.log();  
// });

var square = coloredSquare;
square = higlightSeveral(['will', 'you', 'marry', 'sme'], 'white', square);
//square = higlightSeveral(['tttttogether'], 'cyan', square);
printColoredSquare(square, {lineLength: 16});



//can higlight whole word by using "contains", but higligting closest is tough task
    /* brute version casn be:
        01: contains "TRAVEL" ?
            02: no => contains "TRAVE"
                03: yes => search for "L"
                04: no => goto 02

    */

console.log(chalk.grey('--- done ---') + '\n');

