(function(){

    var startDateTime = moment([2015, 01, 14, 15, 43, 0]);
    var intervalDurationMin = 1;
    var intervalsPassed = 1;

    var getMinutesPassed = function() {    
        var difInMinutes = moment().diff(startDateTime, 'minutes');
        return difInMinutes;
    }


    var doEvery = function(){
        //intervalsPassed = Math.floor(getMinutesPassed() / intervalDurationMin);
        
        var minutesPassedFromStart = moment().diff(startDateTime, 'seconds');
        var momentDuration = moment.duration(minutesPassedFromStart, 'seconds');
        
        $('.time-left').text(momentDuration.minutes() + ' min ' 
            + momentDuration.seconds() + ' sec ');
    }

    var updateCurrentTo = function(i) {
            console.log(i);
            if (i == 1) {
                $('.heart.1').addClass('current');
                $('.lists li.1').addClass('current');
            }

            if (i == 14) {
                $('.heart.current').removeClass('current').addClass('past');

                $('.lists li.current').removeClass('current').addClass('past');
                $('.lists li.' + i).addClass('current');

                $('.heart-big-wrapper').addClass('current');
                $('.heart.past').addClass('final');

                i = 1;
                return;
            }

            $('.heart.current').removeClass('current').addClass('past');
            $('.heart.'+ i).addClass('current');

            $('.lists li.current').removeClass('current').addClass('past');
            $('.lists li.' + i).addClass('current');
    }

    $(function() {
        setInterval(doEvery, 1000);

        var i;
        for (i = 1; i <= intervalsPassed; i++) {
            updateCurrentTo(i);
        }

        $('#do').click(function () {
            updateCurrentTo(i);
            i++;
        })
    });
})();

