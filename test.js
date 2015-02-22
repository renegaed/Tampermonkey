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

	/**
	 * Create assert equals test
	 *
	 * @param  {[mixed]} 	actual   the actual result
	 * @param  {[type]} 	expected the expected result
	 * @param  {[type]} 	msg      (optional) output message
	 */
	assertEquals: function(actual, expected, msg) {
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
	assertNotEquals: function(actual, expected, msg) {
		var result;

		if ( actual !== expected ) {
			result = true;
		} else {
			result = false;
		}

		this._testResult( "assertNotEquals", result, actual, expected, msg );
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

		// if output message exists,
		// display and exit
		if (typeof msg != "undefined") {
			My.log(msg, color);
			return;
		}

		switch (name) {
			case "assertEquals":
				output = 'TEST {0}: "{1}" == "{2}"'.sprintf( status, expected, actual );
				break;

			case "assertNotEquals":
				output = 'TEST {0}: "{1}" != "{2}"'.sprintf( status, expected, actual );
				break;

			default:
				// for output purposes,
				// replace all undefined variables with the string "undefined"
				for ( index in arguments ) {
					if ( typeof arguments[index] == "undefined" ) {
						arguments[index] = "undefined" //
					}
				}

				output = 'TEST {0} with Arguments: name => "{1}", result => "{2}", expected => "{3}", actual => "{4}", msg => "{5}"'.sprintf(
                    status,
                    arguments[0],
                    arguments[1],
                    arguments[2],
                    arguments[3],
                    arguments[4]
                );
				break;
		}

		My.log(output, color);

	},

};
