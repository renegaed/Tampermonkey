/**
 * tests for Utilities file
 */

var testInjectCSS = true;

/**
 * Test My.InjectCSS
 */
My.Test.Collection( "My.InjectCSS Tests", function() {

	if ( ! testInjectCSS) {
		return;
	}

	My.Test.assertException( "expected first parameter to be an object", function() {
		css = My.InjectCSS("", true );
	});

	css = My.InjectCSS({}, true );
	My.Test.assertEquals( "", css, "empty object" );

	My.Test.assertException( "expected css property 'color:blue;'  to be an object", function() {
		css = My.InjectCSS({
	    "#my-window1": "color:blue;"
	}, true );
	});

	css = My.InjectCSS({
	    "#my-window1": {}
	}, true );
	My.Test.assertEquals( "#my-window1{}", css, "empty selector" );

	css = My.InjectCSS({
    "#my-window1": {
        "position": "fixed",
        "z-index": 102
    }
	}, true );
	My.Test.assertEquals( "#my-window1{position:fixed;z-index:102;}", css, "selector with css properties" );

	css = My.InjectCSS({
	    "#my-window1": {
	    },
	    "#my-window2": {
	        "position": "fixed",
	        "z-index": 102,
	        "top": "50%",
	        "left": "50%"
	    },
	    "body": {
	    	"background": "red",
	    }
	}, true );
	My.Test.assertEquals( "#my-window1{}#my-window2{position:fixed;z-index:102;top:50%;left:50%;}body{background:red;}"
		, css
		, "mulitple selectors with css properties"
	);

});