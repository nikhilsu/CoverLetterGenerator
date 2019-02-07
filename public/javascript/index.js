let registerEvents = function () {
    $('.headline-error').delay(3000).fadeOut(800);

    $('input').on('input', function () {
        if ($(this).hasClass('error-input')) {
            $(this).removeClass('error-input');
            $(this).siblings('p.error-message').hide();
        }
    });
};
$(document).ready(registerEvents);
$(window).on('load', registerEvents);
