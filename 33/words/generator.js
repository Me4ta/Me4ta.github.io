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

var higlightWord = function(word, color, squareOfWords, errorCallback) {
    var wordToHiglight = word.replace(/ /g,'');
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
        //log.fail('  ' +chalk.blue(wordToHiglight) + ' is not whole');
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

    var currentWord = [];

    for(var i = 0; i < square.length; i++) {
        
        if (i % options.lineLength === 0 && i !== 0) {
            currentWord.push('\n');
        }

        var color = square[i].color;
        var letter = square[i].letter;

        currentWord.push(chalk[color](letter));
    }

    process.stdout.write(currentWord.join(''));    
    console.log();
}

var _printColoredSquareSplit = function(square, options, quadProcessingFunc) {
    var options = options || {
        lineLength: 12
    };

    var currentQuad = [];

    for(var i = 0; i < square.length; i++) {
        if (i % 4 === 0 && i !== 0) {
            process.stdout.write(quadProcessingFunc(currentQuad).join(''));    
            currentQuad = [];
            process.stdout.write(' ');
        }

        if (i % options.lineLength === 0 && i !== 0) {
            console.log();
        }

        var color = square[i].color;
        var letter = square[i].letter;

        currentQuad.push(chalk[color](letter));
        
    }

    process.stdout.write(quadProcessingFunc(currentQuad).join(''));    
    console.log();
}

var printColoredSquareSplit = function(square, options){
    _printColoredSquareSplit(square, options, function(currentQuad){
        return currentQuad;
    })
}

var printColoredSquareSplitReversed = function(square, options){
 _printColoredSquareSplit(square, options, function(currentQuad){
        return currentQuad.reverse();
    })
}

//todo: write tests verifying that it's able to find all words in a square
var wordsToCheck = [
    'Phoebe', 'Wallie', 'Chandler', 'Baby', 'Bike', 'Me4ta', 'Restuta', 'Racing',
    'Will', 'You', 'Marry', 'Me?', 'California', '8', 'Sex', 'Music', 
    'Time', 'Together', 'Sunset', 'Ocean', 'Coffee', 'Hue', 'Wine', 'Morning', 
    'Касялька', 'USA', 'Talks', 'Travel','Vegas', 'Respect', 'Books', 'Unicorn'
]; // + love

var words = [
    'Chan', 'Phoebe', 'Wallie', 
    'Me', 'dler', 'Bike', 'Travel', 
    '4ta', 'Will', 'Coffee', 'res', 'tuta',
    'You', 'Baby','Wine',  'To',  
    'Sex', 'Marry','Respect',
    'gether', 'time?', 'Music',
    'Касялька', 'Unicorn',  '8',
    'books','racing','Vegas'
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


// var i = 0;
// var doEvery = function() {
//     var currentWord = wordsToCheck[(i == 31 ? (i) : (i++))];
//     var higlightColor = 'cyan';
//     var square = coloredSquare;

//     if (_.contains(['will', 'you', 'marry', 'me?'], currentWord.toLowerCase())) {
//          return;
//     }


//         if (i == 31){
//             console.log(i);
//         clearScreen();
//         square = higlightSeveral(['will', 'you', 'marry', 'me?'], 'magenta', square);    
//         //return;
//     } else {
//         clearScreen();
//         console.log(currentWord);
//         square = higlightSeveral([currentWord], higlightColor, square);
//     }

//     console.log();
//     console.log(chalk.red('      LOVE      '));
//     printColoredSquare(square, {lineLength: 16});
//     console.log();
// }

 var square = coloredSquare;
square = higlightSeveral(['coffee', ''], 'magenta', square);    
square = higlightSeveral(['', 'chandler'], 'cyan', square);    

printColoredSquare(square, {lineLength: 16});
console.log();

// printColoredSquareSplitReversed(square, {lineLength: 16});
// console.log();

//console.log(chalk.grey('--- done ---') + '\n');
//var timer = setInterval(doEvery, 5000);

var clearScreen = function(){
    console.log('\033[2J');
}

