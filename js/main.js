/* Created 01/21/15

*/

'use strict'




// WILL NEED TO BE PUT INTO OBJECT AT SOME POINT

// Returns a random item from the given list
var chooseRandom = function ( choiceList ) {

	var chance     = 1/choiceList.length;
	var random     = Math.random();
	var choiceIndx = Math.ceil(random/chance) - 1;

	return choiceList[ choiceIndx ];

};  // end chooseRandom()

// Evaluates the string and returns how it acts as a bool
var determineBooly = function ( boolString ) {

	if ( eval(boolString) ) { return true; }
	else { return false; }

};  // end determineBooly()

// {} -> {}
var cellCoordsToRemNum = function ( cellColRow ) {
	// The mutiplyer is equal to the rem width of the tile element
	var xRemNum = cellColRow.col * 4;
	var yRemNum = cellColRow.row * 4;
	return { x: xRemNum, y: yRemNum };
};  // end cellCoordsToRemNum()

var numToRem = function ( num ) { return num.toString() + "rem"; };





var addRandomTile = function ( grid ) {

	var emptyCellPos = chooseRandom( grid.getEmptyCells() );
	var booly = TileManager._randomBoolStr( TileManager._truthyStrings, TileManager._falsyStrings );
	var tile = Tile( booly, emptyCellPos );
	grid.addTile( tile );

	tile._setID( tileIDCount );
	tileIDCount++

	// Add tile to the DOM
	grid.container.appendChild( tile._html );

};  // end .addRandomTile()




// ==============
// START
// ==============

// Test of initiating grid
var tileIDCount = 0;
var gridIDCount = 0;

var createGrid = function () {

	var grid = Grid();
	grid.initGrid( gridIDCount );
	gridIDCount ++;

	return grid;
};

var x = createGrid();

// Add three tiles to start us off
var numStartTiles = 3;
for ( var tileNum = 1; tileNum < (numStartTiles + 1); tileNum++ ) {
	addRandomTile( x );
}

