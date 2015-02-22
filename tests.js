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
My.Tests = {

	/**
	 * Create assert equals acceptance testing
	 */
	assertEquals: function(one, two) {
    var test_status = "";
    var color = "";
    var output = "";

    if (two === one) {
        test_status = "PASSED";
        color = "success";
    } else {
        test_status = "FAILED";
        color = "error";
    }

    output = 'TEST {0}: "{1}" == "{2}"'.sprintf(test_status, two, one);

    My.Utilities.log(output, color);
};