console.log("We have js!!!");

( function ( document, window, index )
{
    'use strict';
    
    var header = document.querySelector('.main-header'),
        // elShrink = 'header--shrink',
        // elShrinkOffset = 100,


    if( !header ) return true;

    var elHeight        = 0,
        elTop           = 0,
        dHeight         = 0,
        wHeight         = 0,
        scrollCurr  = 0,
        scrollLast   = 0,
        scrollDiff     = 0;

    window.addEventListener( 'scroll', function()
    {
        elHeight        = header.offsetHeight;
        dHeight         = document.body.offsetHeight;
        wHeight         = window.innerHeight;
        scrollCurr      = window.scrollY;
        scrollDiff      = scrollLast - scrollCurr;
        elTop           = parseInt( window.getComputedStyle( header ).getPropertyValue( 'top' ) ) + scrollDiff;

        if( scrollCurr <= 0 ) // scrolled to the very top; header sticks to the top
            header.style.top = '0px';

        else if( scrollDiff > 0 ) // scrolled up; header slides in
            header.style.top = ( elTop > 0 ? 0 : elTop ) + 'px';

        else if( scrollDiff < 0 ) // scrolled down
        {
            if( scrollCurr + wHeight >= dHeight - elHeight )  // scrolled to the very bottom; header slides in
                header.style.top = ( ( elTop = scrollCurr + wHeight - dHeight ) < 0 ? elTop : 0 ) + 'px';

            else // scrolled down; header slides out
                header.style.top = ( Math.abs( elTop ) > elHeight ? - elHeight : elTop ) + 'px';
        }

        scrollLast = scrollCurr;
    });

}( document, window, 0 ));