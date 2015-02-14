(function(){
    var doEvery = function(){
        console.log(moment().hours());
    }

    $(function() {
        setInterval(doEvery, 1000);
        var i = 1;
        $('#do').click(function () {
            i++;

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
        })
    });
})();

