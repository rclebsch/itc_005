//Make the menu float
var windowWidth = 0;
function enableFloatMenu() {
    var $sidebar   = $("#float-menu"),
        $window    = $(window),
        offset     = $sidebar.offset(),
        topPadding = 15;
    $window.scroll(function() {
        if ($window.scrollTop() > offset.top) {
            $sidebar.stop().animate({
                marginTop: $window.scrollTop() - offset.top + topPadding
            });
        } else {
            $sidebar.stop().animate({
                marginTop: 0
            });
        }
    });
}

function disableFloatMenu() {
    $(window).scroll(null);
}

function onResize() {
    var newWindowWidth = window.innerWidth;
    if ((windowWidth < 768) && (newWindowWidth >= 768)) {
        enableFloatMenu();
    } else if ((windowWidth >= 768) && (newWindowWidth < 768)) {
        disableFloatMenu();
    }
    windowWidth = newWindowWidth;
}

$(function() {
    $(window).resize(onResize);
    onResize();
});
