(function(){
    var doEvery = function(){
        console.log(moment().hours());
    }

    $(function() {
        setInterval(doEvery, 1000);
        $('#do').click(function () {
            console.log('clicked');
        })
    });
})();

