/* Created 01/21/15

Resources:
http://gabrielecirulli.github.io/2048/
*/

'use strict'

// ==============
// TILE OBJECT
// ==============
// Somehow need to integrate cellPos into creation of tile
var Tile = function ( boolString, cellPos, idNum ) {
// Returns a Tile object that has properties containing
// its html, its operand, and the side it's on

	var thisTile = {};

	thisTile._id           = idNum;
	thisTile._boolString   = boolString;
	thisTile._html         = null;
	thisTile._cellClass	   = 'cell-0';  // default
	thisTile._value        = null;
	thisTile._bool         = null;

	thisTile._cell         = cellPos;
	thisTile._previousCell = {};  // Is this value needed?

	// thisTile._nodeL        = {};
	thisTile._nodeR        = {};
	// thisTile._nodeT        = {};
	thisTile._nodeB        = {};

	thisTile._wasMerged    = false;

	// Updates position values. Should it also
	// move the tile there if it needs moving?
	// ( {col, row} ) -> Tile
	thisTile._updatePosition = function ( cellColRow ) {
		var self = this;

		var html = self._html;
		var row = cellColRow.row;
		var col = cellColRow.col;

		// Converts from row and col to number of
		// cell (0 to 15)
		var cellNum = (col + ( row * 4 ));
		var cellClass = 'cell-' + cellNum;

		// This changes self._html. Do this here?
		html.classList.remove( self._cellClass );
		html.classList.add( cellClass );

		// var remPos = cellCoordsToRemNum( cellColRow );
		// var xStr = numToRem( remPos.x );
		// var yStr = numToRem( remPos.y );

		// self._html.style.left = xStr;
		// self._html.style.top  = yStr;

		// Here? Needed at all?
		self._cell.row  = cellColRow.row;
		self._cell.col  = cellColRow.col;
		self._cellClass = cellClass;

		return self;

	};  // end Tile.updatePosition()

	// // Sets the object id and the html id
	// thisTile._setID = function ( idNum ) {
	// 	var self = this;
	// 	self._id = idNum;
	// 	return self;
	// };  // end Tile.setID()

	// Returns a 'node' object that has properties containing
	// its html, its operand, and the side it's on
	thisTile._createNode = function ( side ) {

		var opperands = [ '&&', '| |', '| |' ];
		var randOp = chooseRandom( opperands );
		// Need string without spaces for operations later
		var randOpPure = randOp.replace( ' ', '' );

		var node = {};

		var nodeHTML = document.createElement('div');
		nodeHTML.className = 'node node-' + side + ' op-' + randOpPure;
		var opTxtNode = document.createTextNode( randOp );
		nodeHTML.appendChild( opTxtNode );

		node.html         = nodeHTML;
		node.operandAsStr = randOpPure;
		node.side         = side;

		return node;

	};  // end Tile.createNode()


	// BUILD THE TILE
	thisTile._buildHTML = function ( boolString, booly, cellPos ) {
		var self = this;

		var tileHTML = document.createElement('div');
		// INCLUDING THE DEFAULT CLASS IS IMPORTANT!!
		tileHTML.className = 'tile ' + self._cellClass;

		var boolHTML = document.createElement('div');
		var boolTxtNode = document.createTextNode( boolString );
		boolHTML.appendChild( boolTxtNode );

		boolHTML.className = 'booly' + ' ' + booly;

		// Here?
		var nodeR = self._createNode( 'right' );
		var nodeB = self._createNode( 'bottom' );

		tileHTML.appendChild( boolHTML );
		tileHTML.appendChild(  nodeR.html );
		tileHTML.appendChild( nodeB.html );

		tileHTML.id = "tile-" + self._id;

		// Here?
		self._nodeR = nodeR;
		self._nodeB = nodeB;

		// Hmmm, which one?
		self._html = tileHTML;
		return tileHTML;
	};  // thisTile._buildHTML

	// var tileHTML = document.createElement('div');
	// tileHTML.className = 'tile';

	// var boolHTML = document.createElement('div');
	// var boolTxtNode = document.createTextNode( boolString );
	// boolHTML.appendChild( boolTxtNode );

	var value = eval( boolString );
	var bool = determineBooly( boolString );
	var booly;
	if ( bool === false ) { booly = 'falsy'; }
	else { booly = 'truthy'; }

	// boolHTML.className = 'booly' + ' ' + booly;

	// var nodeR = createNode( 'right' );
	// var nodeB = createNode( 'bottom' );

	// tileHTML.appendChild( boolHTML );
	// tileHTML.appendChild( nodeR.html );
	// tileHTML.appendChild( nodeB.html );

	// Set self._html here?
	thisTile._buildHTML( boolString, booly, cellPos );

	// thisTile._html       = tileHTML;
	thisTile._value      = value;
	// thisTile._boolString = boolString;
	thisTile._bool       = bool;

	// thisTile._nodeR = nodeR; thisTile._nodeB = nodeB;

	// // Place Tile
	// var remPos = cellCoordsToRemNum( thisTile._cell );
	// var xStr = numToRem( remPos.x );
	// var yStr = numToRem( remPos.y );

	// thisTile._html.style.left = xStr;
	// thisTile._html.style.top  = yStr;

	// Sets another class name, which determines position
	thisTile._updatePosition( cellPos );

	return thisTile;
};  // end Tile()


// ================
// TILE MANAGER
// ================
var TileManager = {};

TileManager._idCount = 0;

TileManager._falsyStrings = [
	'false', 'null', 'undefined', '0',
	'""', "NaN"
];

TileManager._truthyStrings = [
	'true', '1', '2', '16', '[]', '{}',
	'"false"', '"NaN"', '"null"', '"0"'
];

// Should this be here in TileManager? I think not...
// TileManager._tileList = [];

// ( [str], [str] ) -> str
TileManager._randomBoolStr = function ( truthys, falsys ) {

	var boolStr;
	var whichBool = chooseRandom( [false, true] );

	if ( whichBool ) {
		return chooseRandom( truthys );
	} else {
		return chooseRandom( falsys );
	}

};  // end TileManager._randomBoolStr()


// Needed?
// ( domObj, {}, str ) -> Tile
TileManager._addTile = function ( booly, cellPos, grid ) {
	var self = this;

	// create a tile object
	var tile = Tile( booly, cellPos );
	tile._setID( idNum );
	// self._idCount++

	// // Convert grid value to empty
	// // Give a starting cellPos
	// tile.updatePosition( cellPos );
	// self._tileList.push( tile );

	// Add to the DOM (belongs here?)
	grid.container.appendChild( tile.html );

	return tile;

};

// // ( Grid ) -> Tile
// // Add a random tile to the board
// TileManager._addRandomTile = function ( grid ) {

// 	var self = this;

// 	// Pick a random empty location
// 	var emptyCellColRow = chooseRandom( grid.getEmptyCells() );
// 	var booly = TileManager._randomBoolStr( TileManager._truthyStrings, TileManager._falsyStrings );

// 	var tile = self._addTile( grid.container, emptyCellColRow, booly );

// 	return tile;

// };  // end TileManager._addRandomTile()


TileManager._addTrueTile = function ( grid, cellColRow ) {
	var self = this;

	var booly = 'true';
	tile.html.className += 'too-true';
	var tile = self._addTile( booly, cellColRow, grid.container  );

	return tile;

};  // end TileManager._addTrueTile()


TileManager._moveRight = function ( grid ) {

	var cells = grid.cells;

	// var 

	// for ( var rowIndx = 0; rowIndx < cells.length; rowIndx++ ) {

	// 	var row = cells[ rowIndx ];
	// 	var tile = row[ (row.length - 1) ];

	// 	if ( tile !== null ) {};

	// 	if ( tile && !tile.merged ) {
	// 		//??
	// 	}

	// }

};  // end TileManager._moveRight()

// ( Grid ) -> TileManager
TileManager._endRound = function ( grid ) {
	var self = this;

	// ( Grid, {col, row} ) -> Grid
	grid.forEachCell( function ( grid, cellPos ) {

		// Reset move checks so they can be checked next time
		var contents = grid.cells[ cellPos.col ][ cellPos.row ];
		if ( contents !== null ) { contents.wasMerged = false; }

	});

	// Should I return grid instead?
	return self;

};  // end TileManager._endRound();

// Get the vector representing the chosen direction
TileManager._getVector = function (direction) {
	// Vectors representing tile movement
	var map = {
		"right": { x:  1,  y:  0 },  // Right
		"left":  { x: -1,  y:  0 },  // Left
		"up":    { x:  0,  y: -1 },  // Up
		"down":  { x:  0,  y:  1 }   // Down
	};

	return map[ direction ];
};  // end TileManager._getVector()

// Build a list of positions to traverse in the right order
// Determines order of movement/merge checking
TileManager._buildTraversals = function (vector) {
	var traversals = { x: [], y: [] };

	for ( var pos = 0; pos < this.size; pos++ ) {
		traversals.x.push(pos);
		traversals.y.push(pos);
	}

	// Always traverse from the farthest cell in the chosen direction
	if ( vector.x === 1 ) { traversals.x = traversals.x.reverse(); }
	if ( vector.y === 1 ) { traversals.y = traversals.y.reverse(); }

	return traversals;
};  // end TileManager._buildTraversals()

