var hideHeadline = function () {
    $('.headline-error').delay(3000).fadeOut(800);
};
$(document).ready(hideHeadline);
$(window).on("load", hideHeadline);