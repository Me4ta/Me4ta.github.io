(function(){

    var startDateTime = moment([2015, 01, 14, 18, 20, 0]);
    var intervalDurationMin = 6;
    var intervalId;
    

    var getMinutesPassed = function() {    
        var difInMinutes = moment().diff(startDateTime, 'minutes');
        return difInMinutes;
    }

    var getIntervalsPassed = function() {
        return Math.floor(getMinutesPassed() / intervalDurationMin);
    }

    var intervalsPassed = getIntervalsPassed();;

    var doEvery = function(){
        
        if (getMinutesPassed() < 0) {
            //var startingIn = moment.duration();
            $('.time-left').text('Starting at ' + startDateTime.format('hh:mm a') + '...') ;
            return;
        }

        intervalsPassed = getIntervalsPassed() + 1;
        
        var secondsPassedFromStart = moment().diff(startDateTime, 'seconds');
        var durationPassed = moment.duration(intervalDurationMin * intervalsPassed, 'minutes');
        var timeLeftToNext = durationPassed.asSeconds() - secondsPassedFromStart;
        var momentDuration = moment.duration(timeLeftToNext, 'seconds');
        
        
        $('.time-left').text(momentDuration.minutes() + ' min ' 
            + momentDuration.seconds() + ' sec ');

        if (momentDuration.minutes() == 0 && momentDuration.seconds() == 1) {
            updateCurrentTo(intervalsPassed);
        }
    }

    var updateCurrentTo = function(i) {
            console.log(i);
            if (i == 1) {
                $('.heart.1').addClass('current');
                $('.lists li.1').addClass('current');
                return;
            }

            if (i == 14) {
                $('.heart.current').removeClass('current').addClass('past');

                $('.lists li.current').removeClass('current').addClass('past');
                $('.lists li.' + i).addClass('current');

                $('.heart-big-wrapper').addClass('current');
                $('.heart.past').addClass('final');

                $('.time-left').hide();
                clearInterval(intervalId);

                i = 1;
                return;
            }

            $('.heart.current').removeClass('current').addClass('past');
            $('.heart.'+ i).addClass('current');

            $('.lists li.current').removeClass('current').addClass('past');
            $('.lists li.' + i).addClass('current');
    }

    $(function() {
        var i;
        for (i = 1; i <= intervalsPassed; i++) {
            updateCurrentTo(i);
        }

        if (intervalsPassed < 14) {
            intervalId = setInterval(doEvery, 1000);
        }
    });
})();

