/* Created 01/23/15

*/

'use strict'

var keypress = new window.keypress.Listener();

keypress.simple_combo("right", function() {
    console.log("You pressed right arrow.");
});
