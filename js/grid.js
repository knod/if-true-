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
	// List of x, y values of empty cells
	thisGrid.emptyCellsColRow = [];

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

		var emptyCellsColRow = [];

		for ( var colNum = 0; colNum < self.numCells; colNum++ ) {
			for ( var rowNum = 0; rowNum < self.numCells; rowNum++ ) {
				
				var occupant = self.cells[colNum][rowNum];
				if ( occupant === null ) {

					emptyCellsColRow.push( {col: colNum, row: rowNum} );

				}
			}
		}

		return emptyCellsColRow;

	};  // end Grid.getEmptyCells()

	thisGrid.addTile = function ( container ) {
		var self = this;

		var tile = TileManager.addRandomTile( self );
		self.cells[tile.cell.col][tile.cell.row] = tile;
		self.emptyCellsColRow = self.getEmptyCells();

		return tile;

	};  // end Grid.addTile()

	thisGrid.initGrid = function ( idNum ) {
		var self = this;

		self.container = document.createElement( 'div' );
		self.container.className = 'grid-container';

		var container = self.container;

		//self.id = idNum;
		self.cells = self.buildEmptyGridData();
		self.idNum = idNum;
		self.html = self.buildHTML( container, idNum );
		// Start with a list of all the empty cells;
		self.emptyCellsColRow = self.getEmptyCells();

		// Add three tiles to start us off
		var numStartTiles = 3;
		for ( var tileNum = 1; tileNum < (numStartTiles + 1); tileNum++ ) {
			self.addTile( container );
		}

		document.body.appendChild( self.container );

		return self;
	};

	return thisGrid;
};  // end Grid()

