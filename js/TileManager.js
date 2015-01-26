/* Created 01/25/15

Uses Grid and Tiles
Is called by GameManager
*/

var TileManager2 = function ( newTManID ) {

	var thisTMan = {};

	// ===============
	// NOT FUNCTIONS
	// ===============
	// thisTMan._container 	= null;
	thisTMan._grid 			= null;

	thisTMan._TManID 		= newTManID;
	thisTMan._newGridID 	= 0;
	thisTMan._newTileID 	= 0;
	// Should there be an html property too?
	thisTMan._html			= null;

	// Add number of rows? Need to be passed in?
	thisTMan._size			= 4;
	thisTMan._numStartTiles = 3;
	thisTMan._falsyStrings 	= [
		'false' , 'null', 'undefined', '0'
		,'""'   , "NaN"
	];  // end thisTMan._falsyStrings()
	thisTMan._truthyStrings = [
		'true'	   , '1'	  , '2'		, '"16"'
		, '[]'	   , '{}'	  , '"0"'   , '"null"'
		, '"false"', '"NaN"'  , '"undefined"'
	];  // end thisTMan._truthyStrings()

	// ===============
	// FUNCTIONS
	// ===============

	thisTMan._initGrid = function () {
		var self = this;

		self._grid = self._createGrid();
		self._addFirstTiles( self._numStartTiles );
		// better name?
		self._addGame();

		return self._grid;
	};  // end TileManager._initGrid()

	thisTMan._createGrid = function () {
		var self = this;

		self._html = document.createElement( 'div' );
		var container = self._html;
		container.className = 'grid-container';

		var grid = Grid( self._newGridID, self._size );
		// grid._initGrid( self._newGridID );

		// Belongs elsewhere?
		container.appendChild( grid._html );
		// document.body.appendChild( container );

		// // Add start tiles
		// for ( var tileNum = 1; tileNum < (self._numStartTiles + 1); tileNum++ ) {
		// 	var tile = self._createRandomTile();

		// 	// Add tile to the DOM
		// 	self._container.appendChild( tile._html );
		// }

		// container already updated self._html
		self._newGridID += 1;

		return grid;
	};  // end thisTMan._createGrid()

	thisTMan._addFirstTiles = function ( numTiles ) {
		var self = this;

		// Add start tiles
		for ( var tileNum = 1; tileNum < (numTiles + 1); tileNum++ ) {
			
			var tile = self._createRandomTile();
			// Add tile to the DOM
			self._html.appendChild( tile._html );
		
		}

		return self;
	};  // end TileManager._addFirstTiles()

	// Needed? Redundant?
	// better name?
	thisTMan._addGame = function () {
		var self = this;
		document.body.appendChild( self._html );
		return self;
	};  // end thisTMan._addGame()

	thisTMan._randomBooly = function () {
		var self = this;

		return null;
	};  // end thisTMan._randomBooly()

	thisTMan._createTile = function () {
		var self = this;

		return null;
	};  // end thisTMan._createTile()

	// Needed here?
	thisTMan._createTrueTile = function () {
		var self = this;

		return null;
	};  // end thisTMan._createTrueTile()

	// Needed here?
	thisTMan._addTile	 = function () {
		var self = this;

		return null;
	};  // end thisTMan._addTile()

	// Needed here?
	thisTMan._addObjToDOM = function () {
		var self = this;

		return null;
	};  // end thisTMan._addObjToDOM()

	thisTMan._createRandomTile = function () {
		var self = this;

		var emptyCellPos = chooseRandom( self._grid._getEmptyCells() );
		var booly = TileManager._randomBoolStr( TileManager._truthyStrings, TileManager._falsyStrings );
		var tile = Tile( booly, emptyCellPos );
		self._grid._addTile( tile );

		tile._setID( self._newTileID );
		self._newTileID++

		return tile;
	};  // end thisTMan._createRandomTile()
		// to DOM
		// to Grid

	// Tests if tiles can be merged, then acts
	// appropriately
	thisTMan._mergeTiles = function () {
		var self = this;

		return null;
	};  // end thisTMan._mergeTiles()

	// Chooses which tile's nodes to use
	thisTMan._chooseNode = function () {
		var self = this;

		return null;
	};  // end thisTMan._chooseNode()

	// (maybe elsewhere)
	thisTMan._testMergable = function () {
		var self = this;

		return null;
	};  // end thisTMan._testMergable()

	// At end of round
	thisTMan._resetTiles = function () {
		var self = this;

		return null;
	};  // end thisTMan._resetTiles()

	// (maybe elsewhere)
	thisTMan._getVector = function () {
		var self = this;

		return null;
	};  // end thisTMan._getVector()

	// (maybe elsewhere)
	thisTMan._getTraversals = function () {
		var self = this;

		return null;
	};  // end thisTMan._getTraversals()


	return thisTMan;

}; // end TileManager()
