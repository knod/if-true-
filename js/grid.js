/* Created 01/22/15

Resources:
http://gabrielecirulli.github.io/2048/
*/

'use strict'

var Grid = function () {

	var thisGrid = {};

	thisGrid.container        = null;
	thisGrid.id               = null;
	thisGrid.numCells         = 4;
	thisGrid.html             = null;
	// List of nulls and Tile objects
	thisGrid.cells            = [];
	// Tiles in the grid
	thisGrid.tiles            = [];

	// // Perhaps build this dynamically in future
	// thisGrid.positions = [
	// 	{ x:0, y:0}, { x:0, y:4}, { x:0, y:8}, { x:0, y:12},
	// 	{ x:4, y:0}, { x:4, y:4}, { x:4, y:8}, { x:4, y:12},
	// 	{ x:8, y:0}, { x:8, y:4}, { x:8, y:8}, { x:8, y:12},
	// 	{ x:12, y:0}, { x:12, y:4}, { x:12, y:8}, { x:12, y:12}
	// ];  // end Grid.positions[];

	// (int) -> []
	thisGrid.buildEmptyGridData = function () {
		var self = this;
		var cells = [];

		for (var colNum = 0; colNum < self.numCells; colNum++) {

			cells[ colNum ] = [];
			var column = cells[ colNum ];
			for (var rownNum = 0; rownNum < self.numCells; rownNum++) {
				column.push(null);
			}
		}

		return cells;
	};  // end Grid.buildEmptyGrid()

	// (int) -> str
	thisGrid.buildHTML = function ( container, idNum ) {
		var self = this;

		for (var colNum = 0; colNum < self.numCells; colNum++) {
			for (var rownNum = 0; rownNum < self.numCells; rownNum++) {
				
				var borderCell = document.createElement( 'div' );
				borderCell.className = 'grid-cell';
				container.appendChild( borderCell );

			}
		}

		return container
	};  // end Grid.buildHTML()

	// TODO: NEEDS UPDATING TO NEW FUNCTIONALITY {col, row}
	// {} -> bool
	thisGrid.isCellOccupied = function ( position ) {

		if ( position.x === tileObj.x && position.y === tileObj.y ) {
			return true;
		} else { return false; }

	};  // end Grid.isCellOccupied()


	// Gives a list containing objects containing the indexes for
	// empty cells
	// (none) -> [ {} ]
	thisGrid.getEmptyCells = function () {
		var self = this;

		var emptyCellsPos = [];

		// ( Grid, {col, row} ) -> Grid
		self.forEachCell( function ( grid, cellPos ) {

			var col = cellPos.col,
				row = cellPos.row;

			var contents = grid.cells[ col ][ row ];
			if ( contents === null ) {
				emptyCellsPos.push( {col: col, row: row} );
			}

		});

		return emptyCellsPos;

	};  // end Grid.getEmptyCells()


	// ( none ) -> [ Tile ]
	thisGrid.getGridTiles = function () {
		var self = this;

		var tiles = [];

		// ( Grid, {col, row} ) -> Grid
		self.forEachCell( function ( grid, cellPos ) {

			var contents = grid.cells[ cellPos.col ][ cellPos.row ];
			if ( contents !== null ) { tiles.push( contents ); }

		});

		return tiles;

	};  // end Grid.getGridTiles()

	// Updates Grid.cells based on acitive tiles
	// Not sure how to do this
	thisGrid.updateGrid = function () {
	};

	// Not sure how to depict this
	// ( funct ( Grid, {col, row} ) ) -> ( Grid ) 
	// Cycles through the cells of the grid, performing a function based
	// on the Grid object and the cell col and row values
	thisGrid.forEachCell = function ( funct ) {
		var self = this;

		for ( var colNum = 0; colNum < self.numCells; colNum++ ) {
			for ( var rowNum = 0; rowNum < self.numCells; rowNum++ ) {

				funct( self, {col: colNum, row: rowNum} );

			}
		}

		return self;
	};


	// This function seems a little wonky, but I'm not sure why
	// Maybe tile needs to be passed in?
	// Maybe it shouldn't change its own property?
	thisGrid.addTile = function ( tile ) {
		this.cells.push( [tile._cell.col][tile._cell.row] );

		var self = this;

		var tile = TileManager.addRandomTile( self );
		self.cells[tile._cell.col][tile._cell.row] = tile;
		self.emptyCellsColRow = self.getEmptyCells();

		return tile;

	};  // end Grid.addTile()

	// Removes a tile._ Not sure when to remove tiles yet, or
	// when/how to remove them from the board, but
	// we'll work on it
	thisGrid.removeTile = function ( tile ) {
		var self = this;

		var col = tile._cell.col,
			row = tile._cell.row;

		self.cells[ col ][ row ] = null;

		return self.cells;
	};  // end removeTile

	// Don't worry about the tiles, just do stuff for yourself
	thisGrid.initGrid = function ( idNum ) {
		var self = this;

		self.container = document.createElement( 'div' );
		self.container.className = 'grid-container';

		var container = self.container;

		//self.id = idNum;
		self.cells = self.buildEmptyGridData();
		self.idNum = idNum;
		self.html = self.buildHTML( container, idNum );

		document.body.appendChild( self.container );

		return self;
	};

	return thisGrid;
};  // end Grid()

