
jQuery.fn.spectragram.accessData = {
    accessToken: '[43740318.0ae94b8.a3d05ebf373b49f28ac29322bff00f09]',
    clientID: '[0ae94b89dc6e49628434dba83e32afba]'
};

// jQuery
jQuery(function() {
    var $window = $(window);

    init();
});

init = function() {
    $('#photo-list').spectragram('getUserFeed', {
        query: ''
    });
};