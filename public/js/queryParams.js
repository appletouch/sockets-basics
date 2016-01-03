/**
 * Created by PKoolwijk on 2-1-2016.
 */
function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {

            //    / marks beginning and of regular expression
            //    \escapes the + sign as it has a special meaning in regular expressions
            //    g   replaces ALL plusisgns
            return decodeURIComponent(pair[1].replace(/\+/g, ' '));  //plus sign is replaced with space
        }
    }

    return undefined;
}