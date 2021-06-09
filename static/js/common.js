$(document).ready(function() {
    $('.mobile-nav-toggle').click(function() {
        if ($('body').hasClass('mobile-nav-opened')) {
            $('body').removeClass('mobile-nav-opened');
        } else {
            $('body').addClass('mobile-nav-opened');
        }
    });
});