// set the My Object if it does not exist
window.My = window.My || {};

/**
 * Utility Methods
 */
 My.Utilities = {

	//

};

/**
 * Add color to console.log
 * @param mixed msg message to be output
 */
 My.log = function(msg, color) {
  color = color || "black";
  bgc = "White";
  switch (color) {
    case "success":  color = "Green";      bgc = "#BEFAA4";       	break;
    case "info":     color = "DodgerBlue"; bgc = "#C1F7FC";       	break;
    case "error":    color = "Red";        bgc = "#FCC1C1";        	break;
    case "warning":  color = "#FF9E0A";    bgc = "#FCF2C1";         break;
    default: color = color;
  }

  if (typeof msg == "object") {
    console.log(msg);
  } else if (typeof color == "object"){
    console.log("%c" + msg, "color: PowderBlue;font-weight:bold; background-color: RoyalBlue;");
    console.log(color);
  } else {
    console.log("%c" + msg, "color:" + color + ";font-weight:bold; background-color: " + bgc + ";");
  }
};

/**
 * Create the url object for manipulating urls
 * @type {Object}
 */
 My.Url = {

  /**
   * returns the query string by name
   *
   * usage: urlParams["name"]
   * usage: if ( empty( urlParams["name"] ) ) --> true/false
   * 
   * @param { string } name   the string to search for
   * @param { string } url    the url to search through, defaults to the current page url
   */
   getQueryString: function( name, url ) {

    if ( url ) {
      url = url.substring( url.indexOf('?') + 1 );
    } else {
      url = window.location.search.substring(1);
    }

    var querystring = {};

    var match,
      pl     = /\+/g,  // Regex for replacing addition symbol with a space
      search = /([^&=]+)=?([^&]*)/g,
      decode = function (s) { return decodeURIComponent( s.replace( pl, " " )); },
      query  = url;

      
      while ( match = search.exec(query) ) {
        querystring[ decode( match[1] ) ] = decode( match[2] );
      }

      return querystring[name];
    },

 /**
   * replace/update/remove the querystring
   * 
   * 
   * @param {string}  key   the querystring parameter in question
   * @param {string}  value (optional) the querystring value
   *                        supplying a value will add/update the parameter
   *                        not supplying a value will remove the parameter
   * @param {string}  url   (optional) the url to parse, defaults to window.location
   */
   updateQueryString: function( key, value, url ) {
    if ( ! url ) {
      url = window.location.href;
    }

    var re = new RegExp( "([?&])" + key + "=.*?(&|#|$)(.*)", "gi" );
    var hash;
    
    if ( re.test( url ) ) {
      if ( typeof value !== "undefined" && value !== null ) {
        return url.replace(re, '$1' + key + "=" + value + '$2$3');
      }
      else {
        hash = url.split('#');
        url = hash[0].replace(re, '$1$3').replace(/(&|\?)$/, '');

        if ( typeof hash[1] !== 'undefined' && hash[1] !== null ) {
          url += '#' + hash[1];
        }

        return url;
      }
    }
    else {
      if ( typeof value !== 'undefined' && value !== null ) {
        var separator = url.indexOf('?') !== -1 ? '&' : '?';
        hash = url.split('#');
        url = hash[0] + separator + key + '=' + value;

        if (typeof hash[1] !== 'undefined' && hash[1] !== null) {
          url += '#' + hash[1];
        }

        return url;
      }
      else {
        return url;
      }
    }
  },

};

/**
 * Create a very rudimentary sprintf function
 * wildcard format:
 * 	{0} -> first item to be replaced
 * 	{1} -> second item to be replaced
 * 	{2} -> third item to be replaced
 * 	etc.
 */
 String.prototype.sprintf = function() {
   var args = arguments;
   return this.replace(/{(\d+)}/g, function(match, number) {
    return typeof args[number] != 'undefined'
    ? args[number]
    : match
    ;
  });
 };

 /**
 * Add CSS to a page using object notation
 * 
 * @param object  cssObj              a nested css object
 * @param boolean returnGeneratedCSS  whether to return the generated css, instead of adding it to the page
 * @return void
 */
 My.InjectCSS = function( cssObj, returnGeneratedCSS ) {
  var css = "";

  // returnGeneratedCSS default value false 
  if ( typeof returnGeneratedCSS == "undefined" ) {
    returnGeneratedCSS = false;
  }

  css = My._InjectCSSLoopSelector( cssObj, 1 );

  // if asking to return the generated css, simply do so
  if ( returnGeneratedCSS ) {
    return css;
  }

  // css needs to be injected into the page
  var style = document.createElement( "style" );
  style.type = "text/css";
  style.innerHTML = css;
  document.getElementsByTagName( "head" )[0].appendChild( style );

 }

 /** 
 * Continuously loop through css object until you reach a string
 * the string is assumed to be the final css property value
 * 
 * @param object   obj   the css object
 * @param int   count   the number of times the loop has run
 */
 My._InjectCSSLoopSelector = function( obj, count ) {
  css = "";

  // expect an object
  if ( count == 1 && typeof obj != "object" ) {
    throw "expected first parameter to be an object";
  }

  for ( val in obj ) {
    if ( ! obj.hasOwnProperty( val ) ) {
      continue;
    }

    // first nesting must be an object
    if ( count == 1 && typeof obj[val] != "object" ) {
      throw "expected css property '" + obj[val] + "'  to be an object";
    }

    // loop through value recursively until we run out of objects
    if ( typeof obj[val] == "object" ) {
      css += val;
      css += "{";
      css += My._InjectCSSLoopSelector( obj[val], ++count );
      css += "}";
    // finally exausted all objects, assume we have reached a "property: value"
    } else {
      css += val;
      css += ":";
      css += obj[val];
      css += ";";
    }
  }

  return css;
}

/**
 * Copy text to the clipboard
 * 
 * @param  string text the text to copy to the clipboard
 * @return null
 */
My.copyToClipboard( text ) {
  var body = document.body;
  var copyFrom = document.createElement( "textarea" );
  
  copyFrom.textContent = text;
  body.appendChild( copyFrom );
  copyFrom.select();
  document.execCommand( "copy" );
  body.removeChild( copyFrom );
}