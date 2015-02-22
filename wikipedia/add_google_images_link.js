/**
 * Add Google Images Link
 *
 * requires: Utilities, Tests
 */

/**************************************
 * CHANGE DEBUG TO TRUE, TO RUN TESTS
 *************************************/
var debug = false;

$(function() {

    // get name of wiki page
    var wiki_name = wiki_page_name();
    if (debug) My.log("wiki name: " + wiki_name);
    if (debug) wiki_page_name_tests(); // run tests against wiki name determining function

    // generate google images link from wiki name
    var google_image_link = get_google_image_link(wiki_name);
    if (debug) My.log("google image link " + google_image_link);

    // append name to target
    var target = "h1#firstHeading";
    $(target).append(google_image_link);

    // add css to google image link
    var style = '<style type="text/css">';
    style   += 'a.google_image_link {';
    style   +=      'color: rgb(6, 69, 178);';
    style   +=      'font-size: 14px;';
    style   +=      'vertical-align: middle;';
    style   += '}';
    style   += '</style>';

    $('body').append(style);
});

/**
 * method to extract name
 * @return name of wiki page
 */
var wiki_page_name = function(name) {
    // extract name from url if not provided
    // name is provided in the case of running tests
    if ( typeof name == "undefined" ) {
        var pathname = window.location.pathname;
        if (debug) My.log("URL Pathname " + pathname);

        name = pathname.substr(6);
        if (debug) My.log("URL Pathname Substring:" + name);
    }

    // replace all special characters with single space
    name = name.replace(/[^a-zA-Z0-9]/g, " ");

    return name;
}

/**
 * run tests to see if wiki page names are correctly extracted
 */
var wiki_page_name_tests = function() {
    My.Tests.assertEquals(wiki_page_name("Sharwanand"), "Sharwanand");
    My.Tests.assertEquals(wiki_page_name("Allu_Arjun"), "Allu Arjun");
    My.Tests.assertEquals(wiki_page_name("Wikipedia:Policies_and_guidelines"), "Wikipedia Policies and guidelines");
    My.Tests.assertEquals(wiki_page_name("RC2"), "RC2");
    My.Tests.assertEquals(wiki_page_name("xxx"), "This Test Should FAIL");
    My.Tests.assertEquals(wiki_page_name("Portal:Contents/Overviews"), "Portal Contents Overviews");
}

/**
 * Generate google image search url from string
 * @return google search link
 */
var get_google_image_link = function(str) {
    var link = ' <a class="google_image_link" href="https://www.google.com/search?q={0}&tbm=isch">(Google Images)</a>';
    var str_encoded = encodeURIComponent(str);

    var link_seeded = link.sprintf(str_encoded)

    return link_seeded;
}