( function (document, window, index)
	{
		'use strict';

		// arrow scroll to event animation
		var downArrow = document.querySelector("#down-arrow");

		if(downArrow){
			downArrow.addEventListener("click", function(e){
            	e.preventDefault();
            	var target = document.getElementById("about-section");
            	scrollTo(document.body, target.offsetTop, 800);
       		});
		}
}( document, window, 0 ));


function scrollTo(target, to, duration) {
    if (duration < 0) return;
    var difference = to - target.scrollTop;
    var perTick = difference / duration * 10;

    setTimeout(function() {
        target.scrollTop = target.scrollTop + perTick;
        if (target.scrollTop === to) return;
        scrollTo(target, to, duration - 10);
    }, 10);
}