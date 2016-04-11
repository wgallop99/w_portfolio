
console.log("We have js!!!");
( function ( document, window, index )
    {
        'use strict';

        var hideBar   = 'main-header--hidden',
            scrollNav   = 'main-header--narrow',
            navOffset  = 100,
            throttleTimeout = 200,
            element         = document.querySelector( '.main-header' );

        if( !element ) return true;

        var docHeight         = 0,
            winHeight         = 0,
            winScrollCurrent  = 0,
            winScrollPre   = 0,
            winScrollDiff     = 0,

            hasElementClass     = function( element, className ){ return element.classList ? element.classList.contains( className ) : new RegExp( '(^| )' + className + '( |$)', 'gi' ).test( element.className ); },
            addElementClass     = function( element, className ){ element.classList ? element.classList.add( className ) : element.className += ' ' + className; },
            removeElementClass  = function( element, className ){ element.classList ? element.classList.remove( className ) : element.className = element.className.replace( new RegExp( '(^|\\b)' + className.split( ' ' ).join( '|' ) + '(\\b|$)', 'gi' ), ' ' ); },

            throttle = function( delay, fn )
            {
                var last, deferTimer;
                return function()

                {
                    var context = this, args = arguments, now = +new Date;
                    if( last && now < last + delay ) {
                        clearTimeout( deferTimer );
                        deferTimer = setTimeout( function(){ last = now; fn.apply( context, args ); }, delay );
                    } else {
                        last = now;
                        fn.apply( context, args );
                    }
                };
            };

        window.addEventListener( 'scroll', throttle( throttleTimeout, function()
        {
            docHeight         = document.body.offsetHeight;
            winHeight         = window.innerHeight;
            winScrollCurrent  = window.pageYOffset;
            winScrollDiff     = winScrollPre - winScrollCurrent;

            if( winScrollCurrent > navOffset ) {

                if( !hasElementClass( element, scrollNav ) ) {

                    addElementClass( element, scrollNav );
                }
                    
            } else {

                removeElementClass( element, scrollNav );

            } 

            if( winScrollCurrent <= 0 ) {

                removeElementClass( element, hideBar );

            } else if ( winScrollDiff > 0 && hasElementClass( element, hideBar ) ) {

                removeElementClass( element, hideBar );

            } else if( winScrollDiff < 0 ) {

                if( winScrollCurrent + winHeight >= docHeight && hasElementClass( element, hideBar ) ) {
                    removeElementClass( element, hideBar );

                } else {
                    addElementClass( element, hideBar );
                }
            }

            winScrollPre = winScrollCurrent;

        }));


    //responsive nav 

    document.querySelector( "#nav-toggle" ).addEventListener( "click", function(e) {
        e.preventDefault();
        this.classList.toggle( "open" );

        document.querySelector("#mobile-menu").classList.toggle("cover");

        document.querySelector('html').classList.toggle("noScroll");

    });

}( document, window, 0 ));

    
