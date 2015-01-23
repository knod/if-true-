/* Created 01/21/15

Resources:
http://gabrielecirulli.github.io/2048/
*/

'use strict'

// Returns a random item from the given list
var chooseRandom = function ( choiceList ) {

	var chance = 1/choiceList.length;
	var random = Math.random();
	var choiceIndx = Math.ceil(random/chance) - 1;

	return choiceList[ choiceIndx ];

};  // end chooseRandom()

// Evaluates the string and returns how it acts as a bool
var determineBooly = function ( boolString ) {

	if ( eval(boolString) ) { return true; }
	else { return false; }

};  // end determineBooly()

// {} -> {}
var cellCoordsToRemNum = function ( cellCoords ) {
	// The mutiplyer is equal to the rem width of the tile element
	var xRemNum = cellCoords.x * 4;
	var yRemNum = cellCoords.y * 4;
	return { x: xRemNum, y: yRemNum };
};  // end cellCoordsToRemNum()

var numToRem = function ( num ) { return num.toString() + "rem"; };


// ==============
// TILE OBJECT
// ==============
var Tile = function ( boolString ) {
// Returns a Tile object that has properties containing
// its html, its operand, and the side it's on

	var thisTile = {};

	thisTile.html = null,
	thisTile.boolString = null,
	thisTile.value = null,
	thisTile.bool = null,
	thisTile.nodeL = {},
	thisTile.nodeR = {},
	thisTile.nodeT = {},
	thisTile.nodeB = {},
	thisTile.position = {},
	thisTile.previousPosition = {},
	thisTile.id = null

	// Updates position values. Should it also
	// move the tile there if it needs moving?
	thisTile.updatePosition = function ( position ) {

		var remPos = cellCoordsToRemNum( position );
		this.x = remPos.x;
		this.y = remPos.y;

		var xStr = numToRem( remPos.x );
		var yStr = numToRem( remPos.y );

		this.html.style.left = xStr;
		this.html.style.top = yStr;

		return this;

	};  // end Tile.updatePosition()

	// Sets the object id and the html id
	thisTile.setID = function ( idNum ) {
		this.id = idNum;
		this.html.id = "id_" + idNum;

		return this;
	};


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

		node.html = nodeHTML;
		node.operandAsStr = randOpPure;
		node.side = side;

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

	thisTile.html = tileHTML;
	thisTile.value = value;
	thisTile.boolString = boolString;
	thisTile.bool = bool;

	thisTile.nodeL = nodeL; thisTile.nodeR = nodeR;
	thisTile.nodeT = nodeT; thisTile.nodeB = nodeB;

	return thisTile;
};  // end Tile()


// ================
// TILE MANAGER
// ================
var TileManager = {};

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
// {}, int, str -> Tile
TileManager.addTile = function ( container, emptyCellXY, idNum, booly ) {

	// create a tile object
	var tile = Tile( booly );
	tile.setID( idNum );

	// Convert grid value to empty
	// Give a starting emptyCellXY
	tile.updatePosition( emptyCellXY );

	// Add to the DOM (belongs here?)
	container.appendChild( tile.html );

	return tile;

};

// ( obj, int ) -> Tile
// Add a random tile to the board
TileManager.addRandomTile = function ( container, grid, idNum ) {

	var self = this;

	// Pick a random empty location
	var emptyCellXY = chooseRandom( grid.emptyCellsXY );
	var booly = TileManager.randomBoolStr( TileManager.truthyStrings, TileManager.falsyStrings );

	var tile = self.addTile( container, emptyCellXY, idNum, booly );

	return tile;

};  // end TileManager.addRandomTile()

