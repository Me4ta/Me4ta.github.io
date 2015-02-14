(function(){

    var startDateTime = moment([2015, 01, 14, 10, 0, 0]);
    var halfAnHoursPassed = 13;

    var getMinutesPassed = function() {    
        var difInMinutes = moment().diff(startDateTime, 'minutes');
        return difInMinutes;
    }


    var doEvery = function(){
        // halfAnHoursPassed = Math.floor(getMinutesPassed() / 30);
        // console.log(halfAnHoursPassed);
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
        for (i = 1; i <= halfAnHoursPassed; i++) {
            updateCurrentTo(i);
        }

        $('#do').click(function () {
            updateCurrentTo(i);
            i++;
        })
    });
})();

