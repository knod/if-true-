/* Created 01/21/15

Resources:
http://gabrielecirulli.github.io/2048/
*/

'use strict'

// ==============
// TILE OBJECT
// ==============
// Somehow need to integrate cellPos into creation of tile
var Tile = function ( boolString, cellPos ) {
// Returns a Tile object that has properties containing
// its html, its operand, and the side it's on

	var thisTile = {};

	thisTile._html         = null;
	thisTile._boolString   = null;
	thisTile._value        = null;
	thisTile._bool         = null;
	thisTile._id           = null;

	thisTile._nodeL        = {};
	thisTile._nodeR        = {};
	thisTile._nodeT        = {};
	thisTile._nodeB        = {};

	thisTile._cell         = cellPos;
	thisTile._previousCell = {};  // Is this value needed?

	thisTile._wasMerged    = false;

	// Updates position values. Should it also
	// move the tile there if it needs moving?
	// ( {col, row} ) -> Tile
	thisTile._updatePosition = function ( cellColRow ) {
		var self = this;

		self._cell.row = cellColRow.row;
		self._cell.col = cellColRow.col;

		var remPos = cellCoordsToRemNum( cellColRow );
		var xStr = numToRem( remPos.x );
		var yStr = numToRem( remPos.y );

		self._html.style.left = xStr;
		self._html.style.top  = yStr;

		return self;

	};  // end Tile.updatePosition()

	// Sets the object id and the html id
	thisTile._setID = function ( idNum ) {
		var self = this;

		self._id = idNum;
		self._html.id = "id_" + idNum;

		return self;
	};  // end Tile.setID()


	// PRIVATE FUNCTIONS
	// Returns a 'node' object that has properties containing
	// its html, its operand, and the side it's on
	var createNode = function ( side ) {

		var opperands = [ '&&', '&&', '| |' ];
		var randOp = chooseRandom( opperands );
		// Need string without spaces for operations later
		var randOpPure = randOp.replace( ' ', '' );

		var node = {};

		var nodeHTML = document.createElement('div');
		nodeHTML.className = 'node' + ' ' + 'node-' + side + ' op-' + randOpPure;
		var opTxtNode = document.createTextNode( randOp );
		nodeHTML.appendChild( opTxtNode );

		node.html         = nodeHTML;
		node.operandAsStr = randOpPure;
		node.side         = side;

		return node;

	};  // end Tile.createNode()


	// BUILD THE TILE
	var tileHTML = document.createElement('div');
	tileHTML.className = 'tile';

	var boolHTML = document.createElement('div');
	var boolTxtNode = document.createTextNode( boolString );
	boolHTML.appendChild( boolTxtNode );

	var value = eval( boolString );
	var bool = determineBooly( boolString );
	var booly;
	if ( bool === false ) { booly = 'falsy'; }
	else { booly = 'truthy'; }

	boolHTML.className = 'bool' + ' ' + booly;

	var nodeL = createNode( 'left' );
	var nodeR = createNode( 'right' );
	var nodeT = createNode( 'top' );
	var nodeB = createNode( 'bottom' );

	tileHTML.appendChild( boolHTML );
	tileHTML.appendChild( nodeL.html );
	tileHTML.appendChild( nodeR.html );
	tileHTML.appendChild( nodeT.html );
	tileHTML.appendChild( nodeB.html );

	thisTile._html       = tileHTML;
	thisTile._value      = value;
	thisTile._boolString = boolString;
	thisTile._bool       = bool;

	thisTile._nodeL = nodeL; thisTile._nodeR = nodeR;
	thisTile._nodeT = nodeT; thisTile._nodeB = nodeB;

	// Place Tile
	var remPos = cellCoordsToRemNum( thisTile._cell );
	var xStr = numToRem( remPos.x );
	var yStr = numToRem( remPos.y );

	thisTile._html.style.left = xStr;
	thisTile._html.style.top  = yStr;

	return thisTile;
};  // end Tile()


// ================
// TILE MANAGER
// ================
var TileManager = {};

TileManager.idCount = 0;

TileManager.falsyStrings = [
	'false', 'null', 'undefined', '0',
	'""', "NaN"
];

TileManager.truthyStrings = [
	'true', '1', '2', '16', '[]', '{}',
	'"false"', '"NaN"', '"null"', '"0"'
];

// Should this be here in TileManager? I think not...
TileManager.tileList = [];

// ( [str], [str] ) -> str
TileManager.randomBoolStr = function ( truthys, falsys ) {

	var boolStr;
	var whichBool = chooseRandom( [false, true] );

	if ( whichBool ) {
		return chooseRandom( truthys );
	} else {
		return chooseRandom( falsys );
	}

};  // end TileManager.randomBoolStr()


// Needed?
// ( domObj, {}, str ) -> Tile
TileManager.addTile = function ( container, cellColRow, booly ) {
	var self = this;

	// create a tile object
	var tile = Tile( booly );
	tile.setID( self._idCount );
	self._idCount++

	// Convert grid value to empty
	// Give a starting cellColRow
	tile.updatePosition( cellColRow );
	self._tileList.push( tile );

	// Add to the DOM (belongs here?)
	container.appendChild( tile.html );

	return tile;

};

// ( Grid ) -> Tile
// Add a random tile to the board
TileManager.addRandomTile = function ( grid ) {

	var self = this;

	// Pick a random empty location
	var emptyCellColRow = chooseRandom( grid.getEmptyCells() );
	var booly = TileManager.randomBoolStr( TileManager.truthyStrings, TileManager.falsyStrings );

	var tile = self._addTile( grid.container, emptyCellColRow, booly );

	return tile;

};  // end TileManager.addRandomTile()


TileManager.addTrueTile = function ( grid, cellColRow ) {
	var self = this;

	var booly = 'true';
	var tile = self._addTile( grid.container, cellColRow, booly );

	return tile;

};  // end TileManager.addTrueTile()


TileManager.moveRight = function ( grid ) {

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

};  // end TileManager.moveRight()

// ( Grid ) -> TileManager
TileManager.endRound = function ( grid ) {
	var self = this;

	// ( Grid, {col, row} ) -> Grid
	grid.forEachCell( function ( grid, cellPos ) {

		// Reset move checks so they can be checked next time
		var contents = grid.cells[ cellPos.col ][ cellPos.row ];
		if ( contents !== null ) { contents.wasMerged = false; }

	});

	// Should I return grid instead?
	return self;

};  // end TileManager.endRound();

// Get the vector representing the chosen direction
TileManager.getVector = function (direction) {
	// Vectors representing tile movement
	var map = {
		"right": { x:  1,  y:  0 },  // Right
		"left":  { x: -1,  y:  0 },  // Left
		"up":    { x:  0,  y: -1 },  // Up
		"down":  { x:  0,  y:  1 }   // Down
	};

	return map[ direction ];
};  // end TileManager.getVector()

// Build a list of positions to traverse in the right order
// Determines order of movement/merge checking
TileManager.buildTraversals = function (vector) {
	var traversals = { x: [], y: [] };

	for ( var pos = 0; pos < this.size; pos++ ) {
		traversals.x.push(pos);
		traversals.y.push(pos);
	}

	// Always traverse from the farthest cell in the chosen direction
	if ( vector.x === 1 ) { traversals.x = traversals.x.reverse(); }
	if ( vector.y === 1 ) { traversals.y = traversals.y.reverse(); }

	return traversals;
};  // end TileManager.buildTraversals()

