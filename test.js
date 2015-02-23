// set the My Object if it does not exist
window.My = window.My || {};

// require utilities
if ( ! My.Utilities) {
	console.log("Unable to load Test File. Missing Dependency: Utilities file");
}

/**
 * Tests Object
 * @type {Object}
 */
My.Test = {

	/**/
	Collection: function( msg, callback ) {
		My.log( msg, "info" );
		callback();
	}

	/**
	 * Create assert equals test
	 *
	 * @param  {[mixed]} 	actual   the actual result
	 * @param  {[type]} 	expected the expected result
	 * @param  {[type]} 	msg      (optional) output message
	 */
	assertEquals: function( actual, expected, msg ) {
		var result;

		if ( actual === expected ) {
			result = true;
		} else {
			result = false;
		}

		this._testResult( "assertEquals", result, actual, expected, msg );
	},

	/**
	 * Create assert not equals test
	 *
	 * @param  {[mixed]} 	actual   the actual result
	 * @param  {[type]} 	expected the expected result
	 * @param  {[type]} 	msg      (optional) output message
	 */
	assertNotEquals: function( actual, expected, msg ) {
		var result;

		if ( actual !== expected ) {
			result = true;
		} else {
			result = false;
		}

		this._testResult( "assertNotEquals", result, actual, expected, msg );
	},

	/**
	 * Create assert true
	 *
	 * @param  {[mixed]} 	actual   the actual result
	 * @param  {[type]} 	msg      (optional) output message
	 */
	assertTrue: function( actual, msg ) {
		var result;

		if ( actual == true ) {
			result = true;
		} else {
			result = false;
		}

		this._testResult( "assertTrue", result, actual, null, msg );
	},

	/**
	 * Create assert false
	 *
	 * @param  {[mixed]} 	actual   the actual result
	 * @param  {[type]} 	msg      (optional) output message
	 */
	assertFalse: function( actual, msg ) {
		var result;

		if ( actual == false ) {
			result = true;
		} else {
			result = false;
		}

		this._testResult( "assertFalse", result, actual, null, msg );
	},

	/**
	 * Create expect true, STRICT comparison
	 *
	 * @param  {[mixed]} 	actual   the actual result
	 * @param  {[type]} 	msg      (optional) output message
	 */
	expectTrue: function( actual, msg ) {
		var result;

		if ( actual === true ) {
			result = true;
		} else {
			result = false;
		}

		this._testResult( "expectTrue", result, actual, null, msg );
	},

	/**
	 * Create expect false, STRICT comparison
	 *
	 * @param  {[mixed]} 	actual   the actual result
	 * @param  {[type]} 	msg      (optional) output message
	 */
	expectFalse: function( actual, msg ) {
		var result;

		if ( actual === false ) {
			result = true;
		} else {
			result = false;
		}

		this._testResult( "expectFalse", result, actual, null, msg );
	},

	/**
	 * Output the result of the test
	 *
	 * @param  {string} 	name   		the name of the test which ran
	 * @param  {bool} 		result   	whether test passed or failed
	 * @param  {mixed} 		expected 	the expected result
	 * @param  {mixed} 		actual   	the actual result
	 * @param  {string}		msg				(optional) output message
	 */
	_testResult: function( name, result, expected, actual, msg ) {

		var status = "";
  	var color = "";
  	var output = "";

		if ( result ) {
			status = "PASSED";
			color = "success";
		} else {
			status = "FAILED";
			color = "error";
		}

		// format variables for output
		// assume 'name' and 'result' are defined for now
		if ( typeof expected == "undefined" ) expected = "undefined";
		if ( typeof actual == "undefined" ) actual = "undefined";
		if ( typeof msg == "undefined" ) msg = "undefined";

		switch (name) {
			case "assertEquals":
				output = 'TEST {0}: "{1}" == "{2}"'.sprintf( status, expected, actual );
				break;

			case "assertNotEquals":
				output = 'TEST {0}: "{1}" != "{2}"'.sprintf( status, expected, actual );
				break;

			case "assertTrue":
				output = 'TEST {0}: {1} is true'.sprintf( status, expected );
				break;

			case "assertFalse":
				output = 'TEST {0}: {1} is false'.sprintf( status, expected );
				break;

			case "expectTrue":
				output = 'TEST {0}: {1} is STRICTLY true'.sprintf( status, expected );
				break;

			case "expectFalse":
				output = 'TEST {0}: {1} is STRICTLY false'.sprintf( status, expected );
				break;

			default:
				// don't know what test just ran,
				// account for the rest of the arguments being undefined. to look pretty!
				if ( typeof name == "undefined" ) name = "undefined";
				if ( typeof result == "undefined" ) result = "undefined";

				output = 'TEST {0} with Arguments: name => "{1}", result => "{2}", expected => "{3}", actual => "{4}", msg => "{5}"'.sprintf(
          status,
          name,
          result,
          expected,
          actual,
          msg
        );
				break;
		}

		// appned output message if it exists
		if ( typeof msg != "undefined" ) {
			output += ' ({0})'.sprintf( msg );
		}

		My.log(output, color);

	},

};
