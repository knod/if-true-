/* Created 01/24/15

*/

'use strict'

// ( Grid, TileManager, PageManager ) -> GameManager
// Need to pass Tile into here too?
var GameManager = function ( Grid, TileMan, Tile, PageMan ) {

	thisMan = {};

	thisMan._numRows = 4;
	thisMan._Grid = Grid;
	thisMan._TileMan = TileMan;

	thisMan._move = function ( direction ) {
		var self = this;

		var points = 0;

		// Get x and y movement (vector) using direction

		// Get order to move tiles using vector

		// Go through a row (the following depend on the existance of each tile)

		// Move the first tile till it hits a wall

		// if there's a second tile
			// Call TileManager's merge function. It:
				// Checks if the second tile can merge with the first tile
				// if so
					// Move the second tile over the first tile
					// Destroy the DOM of the two tiles
					// Create a new tile in their place (using a "true" Tile)
					// Return the new tile
				// else return null
		// if the result is a tile increase the points



		// Move all the tiles with the TileManager, get back a list of
		// tiles to destroy and tiles to add?

		// Destroy and add tiles to Grid

		return points;

	}; // end thisMan._move



};  // end GameManager()
