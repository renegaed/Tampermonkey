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
   * usage: "empty" in urlParams --> true/false
   * 
   * @param  {string}
   */
  getQuerystring: function( name ) {
    var match,
      pl     = /\+/g,  // Regex for replacing addition symbol with a space
      search = /([^&=]+)=?([^&]*)/g,
      decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
      query  = window.location.search.substring(1);

    urlParams = {};
    while (match = search.exec(query)) {
      urlParams[decode(match[1])] = decode(match[2]);
    }

    return urlParams;
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