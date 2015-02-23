// set the My Object if it does not exist
window.My = window.My || {};

// require utilities
if ( ! My.Utilities) {
	console.log("Unable to load Test File. Missing Dependency: Utilities file");
	return;
}

var debug = true;

/**
	* Tests Object
	* @type {Object}
	*/
My.Test = {

	_testMode: false,

	/**
		* Group Similar Tests
		*
		* @param {[type]}   msg      [description]
		* @param {Function} callback [description]
		*/
	Collection: function( msg, callback ) {
		My.log( msg, "info" );
		callback();
	},

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

		var obj = {
			result: result,
			actual: actual,
			expected: expected,
			msg: msg,
		};

		return this._testResult( "assertEquals", obj );
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

		var obj = {
			result: result,
			actual: actual,
			expected: expected,
			msg: msg,
		};

		return this._testResult( "assertNotEquals", obj );
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

		var obj = {
			result: result,
			actual: actual,
			expected: null,
			msg: msg,
		};

		return this._testResult( "assertTrue", obj );
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

		var obj = {
			result: result,
			actual: actual,
			expected: null,
			msg: msg,
		};

		return this._testResult( "assertFalse", obj );
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

		var obj = {
			result: result,
			actual: actual,
			expected: null,
			msg: msg,
		};

		return this._testResult( "expectTrue", obj );
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

		var obj = {
			result: result,
			actual: actual,
			expected: null,
			msg: msg,
		};

		return this._testResult( "expectFalse", obj );
	},

	assertException: function( expected, callback, msg ) {
		try {
			var error_thrown = false;
			var error_message;
			var result = false;
			callback();
		}
		catch( error ) {
			error_thrown = true;
			error_message = error

			if ( expected === error_message ) {
				result = true;
			}
		}

		var obj = {
			result: result,
			actual: error_message,
			expected: expected,
			msg: msg,
		};

		return this._testResult( "assertException", obj );
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
	_testResult: function( name, obj ) {

		var status = "";
		var color = "";
		var output = "";

		if ( obj.result ) {
			status = "PASSED";
			color = "success";
		} else {
			status = "FAILED";
			color = "error";
		}

		switch ( name ) {
			case "assertEquals":
				output = 'TEST {0}: "{1}" == "{2}"'.sprintf( status, obj.actual, obj.expected );
				break;

			case "assertNotEquals":
				output = 'TEST {0}: "{1}" != "{2}"'.sprintf( status, obj.actual, obj.expected );
				break;

			case "assertTrue":
				output = 'TEST {0}: "{1}" is true'.sprintf( status, obj.actual );
				break;

			case "assertFalse":
				output = 'TEST {0}: "{1}" is false'.sprintf( status, obj.actual );
				break;

			case "expectTrue":
				output = 'TEST {0}: "{1}" is STRICTLY true'.sprintf( status, obj.actual );
				break;

			case "expectFalse":
				output = 'TEST {0}: "{1}" is STRICTLY false'.sprintf( status, obj.actual );
				break;

			case "assertException":
				// no error thrown
				if ( ! obj.result && typeof obj.actual == "undefined" ) {
					output = 'TEST FAILED: no error thrown, expected error: "{0}"'.sprintf( obj.expected );
					break;
				}

				// error message mismatch
				if ( ! obj.result ) {
					output = 'TEST FAILED: "{0}" does not equal "{1}"'.sprintf( obj.actual, obj.expected );
					break;
				}

				output = 'TEST PASSED: "{0}" equals "{1}"'.sprintf( obj.actual, obj.expected );
				break;

			default:
				output = 'TEST {0} with Arguments: name => "{1}", obj => "{2}"'.sprintf(
					status,
					name,
					obj
					);
				break;
		}

		// append message to output if it exists
		if ( typeof obj.msg != "undefined" ) {
			output += ' ({0})'.sprintf( obj.msg );
		}

		// if test mode is enabled, simply return the output
		if ( this._testMode ) {
			return output;
		}

		My.log(output, color);

	},

	/**
		* Unit Tests for the My.Test methods
		*/
	testMode: function( callback ) {
		this._testMode = true;
		var output = callback();
		this._testMode = false;

		return output;
	},

};