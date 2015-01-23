/* Created 01/22/15

Resources:
http://gabrielecirulli.github.io/2048/
*/

'use strict'

var Grid = function () {

	var thisGrid = {};

	thisGrid.id = null;
	thisGrid.numCells = 4;
	thisGrid.html = null;
	// List of nulls and Tile objects
	thisGrid.cells = [];
	// List of x, y values of empty cells
	thisGrid.emptyCellsXY = [];

	// Perhaps build this dynamically in future
	thisGrid.positions = [
		{ x:0, y:0}, { x:0, y:4}, { x:0, y:8}, { x:0, y:12},
		{ x:4, y:0}, { x:4, y:4}, { x:4, y:8}, { x:4, y:12},
		{ x:8, y:0}, { x:8, y:4}, { x:8, y:8}, { x:8, y:12},
		{ x:12, y:0}, { x:12, y:4}, { x:12, y:8}, { x:12, y:12}
	];  // end Grid.positions;

	// (int) -> []
	thisGrid.buildEmptyGridData = function () {
		var cells = [];

		for (var colNum = 0; colNum < this.numCells; colNum++) {

			cells[ colNum ] = [];
			var column = cells[ colNum ];
			for (var rownNum = 0; rownNum < this.numCells; rownNum++) {
				column.push(null);
			}
		}

		return cells;
	};  // end Grid.buildEmptyGrid()

	// (int) -> str
	thisGrid.buildHTML = function ( idNum ) {

		var gridHTML = document.createElement( 'table' );
		gridHTML.className = 'grid';
		// gridHTML.id = 'id-' + idNum;

		for (var colNum = 0; colNum < this.numCells; colNum++) {
			
			var col = document.createElement( 'tr' );
			for (var rownNum = 0; rownNum < this.numCells; rownNum++) {
				var cell = document.createElement( 'td' );
				
				// For borders for the cells
				// box-sizing doesn't work for table cells
				var borderCell = document.createElement( 'div' );
				borderCell.className = 'border-cell';
				cell.appendChild( borderCell );

				col.appendChild( cell );
			}
			gridHTML.appendChild( col );
		}

		return gridHTML
	};


	thisGrid.isCellOccupied = function ( position ) {
		if ( position.x === tileObj.x && position.y === tileObj.y ) {
			return true;
		} else { return false; }
	};  // end Grid.isCellOccupied()

	// Gives a list containing objects containing the indexes for
	// empty cells
	thisGrid.avilableCells = function ( position ) {

		var emptyCellIndexes = [];

		for ( var colNum = 0; colNum < this.numCells; colNum++ ) {
			for ( var rowNum = 0; rowNum < this.numCells; rowNum++ ) {
				var occupant = this.cells[colNum][rowNum];
				if ( occupant === null ) {
					emptyCellIndexes.push( {col: colNum, row: rowNum} );
				}
			}
		}

		return emptyCellIndexes;

	};  // end Grid.availableCells()

	thisGrid.initGrid = function ( idNum ) {

		//this.id = idNum;
		this.cells = this.buildEmptyGridData();
		// Needs id number
		this.html = this.buildHTML();

		// Add three tiles to start us off


		return this.cells;
	};

	return thisGrid;
};  // end Grid()


// Test of filling cells
var count = 1;
var x = Grid();
x.initGrid();
var container = document.getElementsByClassName( 'grid-container' )[0];
container.appendChild( x.html );

for ( var colNum = 0; colNum < x.numCells; colNum++ ) {
	for ( var rowNum = 0; rowNum < x.numCells; rowNum++ ) {
		//emptyCellXY, idNum, booly
		TileManager.addTile( container, {x: colNum, y: rowNum}, count, '[]' );

	}
}

