// ==UserScript==
// @name         Wikipedia Modifications
// @namespace    renegaed
// @version      1.0
// @description  Modifications to the WIkipedia Page
// @author       Vijay Madas
// @include      http*://*wikipedia.org/wiki/*
// @require      https://code.jquery.com/jquery-2.1.3.min.js
// @require      https://raw.githubusercontent.com/renegaed/tampermonkey/18eedb66251cef40eef0088e988478138a0b87fa/utilities.js
// @require      https://raw.githubusercontent.com/renegaed/tampermonkey/13cb37d0e2350276f43e5a6eb48bfc7c0c39e7fe/test.js
// @grant        none
// ==/UserScript==

var debug = false;

$(function() {
	
	Wikipedia.addGoogleImagesLink();
	Wikipedia.addMediaQuery();
    
});

var Wikipedia = {
	
	addGoogleImagesLink: function() {
		var target = $("h1#firstHeading");
		var wikiPageHeading = target.text();
		var wikiPageQueryString = encodeURIComponent( wikiPageHeading );
		var googleImagesURL = "https://www.google.com.au/search?tbm=isch&q={0}".sprintf( wikiPageQueryString );
		
		if (debug) console.log( "Heading: " + wikiPageHeading );
		if (debug) console.log( "Query String: " + wikiPageQueryString );
		
		// add link to page
        var googleImagesLink = '<small><a href="{0}" target="_blank">{1}</a></small>'
								.sprintf( googleImagesURL, "(Google Images)" );
		target.append( googleImagesLink );
		
		// google images link css
		My.InjectCSS({
			"h1#firstHeading small": {
				"margin-left": "10px",
				"font-size": "18px"
			}
		});
	},
	
	addMediaQuery: function() {
		My.InjectCSS({
			"@media only screen and (max-width : 700px) ": {
				"#mw-navigation": {
					"display": "none"
				},
				"#mw-page-base": {
					"display": "none"
				},
				"#content": {
					"margin-left": "0"
				}
			}
		});
	}
	
}