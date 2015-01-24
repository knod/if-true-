/* Created 01/23/15

*/

'use strict'

var keypress = new window.keypress.Listener();

// ( [str], {}, function ) -> [str]
// Sets function to trigger on keydown
var setEachKey = function ( keyList, options, funct ) {

	for ( var keyIndx = 0; keyIndx < keyList.length; keyIndx++ ) {

		var keyCombo = keyList[ keyIndx ];

		keypress.register_combo({
		    "keys"              : keyCombo,
		    "on_keydown"        : funct,
		    "prevent_default"   : true,
		});
	}

	return keyList;

};  // end setEachKey()


var rightKeys  = [ 'right', 'd' ];
var leftKeys   = [ 'left',  'a' ];
var upKeys     = [ 'up',    'w' ];
var downKeys   = [ 'down',  's' ];

// Placeholders
var moveRight = function () { console.log("You moved right."); };
var moveLeft = function () { console.log("You moved left."); };
var moveUp = function () { console.log("You moved up."); };
var moveDown = function () { console.log("You moved down."); };


setEachKey( rightKeys, {}, moveRight );
setEachKey( leftKeys, {}, moveLeft );
setEachKey( upKeys, {}, moveUp );
setEachKey( downKeys, {}, moveDown );


// ==================
// KEYPRESS TEMPLATE
// ==================
// keypress.register_combo({
// 	"keys"              : null,
// 	"on_keydown"        : null,
// 	"on_keyup"          : null,
// 	"on_release"        : null,
// 	"this"              : undefined,
// 	"prevent_default"   : false,
// 	"prevent_repeat"    : false,
// 	"is_unordered"      : false,
// 	"is_counting"       : false,
// 	"is_exclusive"      : false,
// 	"is_solitary"       : false,
// 	"is_sequence"       : false
// });
