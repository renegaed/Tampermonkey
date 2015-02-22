// set the My Object if it does not exist
window.My = window.My || {};

// require utilities
if ( ! My.Utilities) {
	console.log("Unable to load Test File. Missing Dependency: Utilities file");
}