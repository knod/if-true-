/* Created 01/25/15

Uses Grid and Tiles
Is called by GameManager
*/

var TileManager = function ( container, newTManID ) {

	var thisTMan = {};

	// ===============
	// NOT FUNCTIONS
	// ===============
	thisTMan._container = container;

	thisTMan.id 		= newTManID;
	thisTMan._newGridID = 0;
	thisTMan._newTileID = 0;

	thisTMan._falsyStrings = [
		'false' , 'null', 'undefined', '0'
		,'""'   , "NaN"
	];  // end thisTMan._falsyStrings()
	thisTMan._truthyStrings = [
		'true'	   , '1'	  , '2'		, '16'
		, '[]'	   , '{}'	  , '"0"'   , '"null"'
		, '"false"', '"NaN"'  , '"undefined"'
	];  // end thisTMan._truthyStrings()

	// ===============
	// FUNCTIONS
	// ===============
	thisTMan._createGrid = function ( idNum ) {
		var self = this;

		return null;
	};  // end thisTMan._createGrid()

	thisTMan._addGrid? = function () {
		var self = this;

		return null;
	};  // end thisTMan._addGrid()

	thisTMan._randomBooly = function () {
		var self = this;

		return null;
	};  // end thisTMan._randomBooly()

	thisTMan._createTile = function () {
		var self = this;

		return null;
	};  // end thisTMan._createTile()

	thisTMan._createTrueTile? = function () {
		var self = this;

		return null;
	};  // end thisTMan._createTrueTile()

	thisTMan._addTile?	 = function () {
		var self = this;

		return null;
	};  // end thisTMan._addTile()

	thisTMan._addObjToDOM? = function () {
		var self = this;

		return null;
	};  // end thisTMan._addObjToDOM()

	thisTMan._addRandomTile = function () {
		var self = this;

		return null;
	};  // end thisTMan._addRandomTile()
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

}}; // end TileManager()
