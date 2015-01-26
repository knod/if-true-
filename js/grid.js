/* Created 01/22/15

Resources:
http://gabrielecirulli.github.io/2048/
*/

'use strict'

var Grid = function () {

	var thisGrid = {};

	thisGrid._container        = null;
	thisGrid._id               = null;
	thisGrid._numCells         = 4;
	thisGrid._html             = null;
	// List of nulls and Tile objects
	thisGrid._cells            = [];
	// Tiles in the grid
	thisGrid._tiles            = [];

	// // Perhaps build this dynamically in future
	// thisGrid._positions = [
	// 	{ x:0, y:0}, { x:0, y:4}, { x:0, y:8}, { x:0, y:12},
	// 	{ x:4, y:0}, { x:4, y:4}, { x:4, y:8}, { x:4, y:12},
	// 	{ x:8, y:0}, { x:8, y:4}, { x:8, y:8}, { x:8, y:12},
	// 	{ x:12, y:0}, { x:12, y:4}, { x:12, y:8}, { x:12, y:12}
	// ];  // end Grid.positions[];

	// (int) -> []
	thisGrid._buildEmptyGridData = function () {
		var self = this;
		var cells = [];

		for (var colNum = 0; colNum < self._numCells; colNum++) {

			cells[ colNum ] = [];
			var column = cells[ colNum ];
			for (var rownNum = 0; rownNum < self._numCells; rownNum++) {
				column.push(null);
			}
		}

		return cells;
	};  // end Grid.buildEmptyGrid()

	// (int) -> str
	thisGrid._buildHTML = function ( container, idNum ) {
		var self = this;

		for (var colNum = 0; colNum < self._numCells; colNum++) {
			for (var rownNum = 0; rownNum < self._numCells; rownNum++) {
				
				var borderCell = document.createElement( 'div' );
				borderCell.className = 'grid-cell';
				container.appendChild( borderCell );

			}
		}

		return container
	};  // end Grid.buildHTML()

	// TODO: NEEDS UPDATING TO NEW FUNCTIONALITY {col, row}
	// {} -> bool
	thisGrid._isCellOccupied = function ( position ) {

		if ( position.x === tileObj.x && position.y === tileObj.y ) {
			return true;
		} else { return false; }

	};  // end Grid.isCellOccupied()


	// Gives a list containing objects containing the indexes for
	// empty cells
	// (none) -> [ {} ]
	thisGrid._getEmptyCells = function () {
		var self = this;

		var emptyCellsPos = [];

		// ( Grid, {col, row} ) -> Grid
		self._forEachCell( function ( grid, cellPos ) {

			var col = cellPos.col,
				row = cellPos.row;

			var contents = self._cells[ col ][ row ];
			if ( contents === null ) {
				emptyCellsPos.push( {col: col, row: row} );
			}

		});

		return emptyCellsPos;

	};  // end Grid.getEmptyCells()


	// ( none ) -> [ Tile ]
	thisGrid._getGridTiles = function () {
		var self = this;

		var tiles = [];

		// ( Grid, {col, row} ) -> Grid
		self._forEachCell( function ( grid, cellPos ) {

			var contents = grid.cells[ cellPos.col ][ cellPos.row ];
			if ( contents !== null ) { tiles.push( contents ); }

		});

		return tiles;

	};  // end Grid.getGridTiles()

	// Updates Grid.cells based on acitive tiles
	// Not sure how to do this
	thisGrid._updateGrid = function () {
	};

	// Not sure how to depict this
	// ( funct ( Grid, {col, row} ) ) -> ( Grid ) 
	// Cycles through the cells of the grid, performing a function based
	// on the Grid object and the cell col and row values
	thisGrid._forEachCell = function ( funct ) {
		var self = this;

		for ( var colNum = 0; colNum < self._numCells; colNum++ ) {
			for ( var rowNum = 0; rowNum < self._numCells; rowNum++ ) {

				funct( self, {col: colNum, row: rowNum} );

			}
		}

		return self;
	};


	// This function seems a little wonky, but I'm not sure why
	// Maybe tile needs to be passed in?
	// Maybe it shouldn't change its own property?
	// Should this return cells or tile?
	thisGrid._addTile = function ( tile ) {
		var self = this;
		self._cells[tile._cell.col][tile._cell.row] = tile;
		return self;
	};  // end Grid.addTile()

	// Removes a tile._ Not sure when to remove tiles yet, or
	// when/how to remove them from the board, but
	// we'll work on it
	thisGrid._removeTile = function ( tile ) {
		var self = this;
		self._cells[ tile._cell.col ][ tile._cell.row ] = null;
		return self;
	};  // end removeTile

	// Don't worry about the tiles, just do stuff for yourself
	thisGrid._initGrid = function ( idNum ) {
		var self = this;

		self._container = document.createElement( 'div' );
		self._container.className = 'grid-container';

		var container = self._container;

		//self._id = idNum;
		self._cells = self._buildEmptyGridData();
		self._idNum = idNum;
		self._html = self._buildHTML( container, idNum );

		document.body.appendChild( self._container );

		return self;
	};

	return thisGrid;
};  // end Grid()

