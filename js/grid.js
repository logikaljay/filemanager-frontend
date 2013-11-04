$(function() {
	var w = getWindowWidth(),
		h = getWindowHeight(),
		m = 25;
		$g = $(".grid"),
		$c = $(".col-13, .col-23");
	
	// set grid width & height to the window width and height - margin * 2
	$g.width(w - (m * 2));
	$g.height(h - (m * 2));
	
	// set any column heights to the window height - any header elements
	$c.height(h - (m * 2) - $(".header").outerHeight(true));
	
	$(".action-required").show();
});

/**
 * Cross Browser window height & width functions.
 * from http://www.softcomplex.com/docs/get_window_size_and_scrollbar_position.html
 *
 * Copyright ©2002-2010 SoftComplex Inc. All rights reserved.
 */
function getWindowHeight() // viewport, not document
{
    var windowHeight = 0;
    if (typeof(window.innerHeight) == 'number')
    {
        // DOM compliant, IE9+
        windowHeight = window.innerHeight;
    }
    else
    {
        // IE6-8 workaround, Note: document can be smaller than window
        var ieStrict = document.documentElement.clientHeight; // w/out DTD gives 0
        var ieQuirks = document.body.clientHeight; // w/DTD gives document height
        windowHeight = (ieStrict > 0) ? ieStrict : ieQuirks;
    }
    return windowHeight;
}
 
function getWindowWidth() // viewport, not document
{
    var windowWidth = 0;
    if (typeof(window.innerWidth) == 'number')
    {
        // DOM compliant, IE9+
        windowWidth = window.innerWidth;
    }
    else
    {
        // IE6-8 workaround, Note: document can be smaller than window
        var ieStrict = document.documentElement.clientWidth; // w/out DTD gives 0
        var ieQuirks = document.body.clientWidth; // w/DTD gives document width
        windowWidth = (ieStrict > 0) ? ieStrict : ieQuirks;
    }
    return windowWidth;
}