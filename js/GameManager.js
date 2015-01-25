/* Created 01/24/15

*/

'use strict'

// ( Grid, TileManager, PageManager ) -> GameManager
// Need to pass Tile into here too?
var GameManager = function ( Grid, TileMan, PageMan ) {

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

		// If there's a second tile
			// Call TileManager's merge function (needs direction):
				// Use grid position and direction to determine which node R or 
				// node B to use (Always use leftmost or topmost Tile's node)
				// Check if Tiles add up to true

				// If neither Tile .wasMerged && if they add up to true
					// Set z-axis based on grid position
						// TODO: check on negative z-axis value behavior
					// Move the second tile into the first tile cell
					// Destroy the DOM of the two tiles
					// Create a new tile in their place (using a "true" Tile)
					// Set its .wasMerged to true
					// Return the new tile
				// else return null
		// if the result is a tile
			// Increase the points (diff the more you've gotten?)
			// Destroy tiles 1 and 2 in grid (why is this in here, but destroying html is not in here?)
			// Add the new tile to the grid data

		// If there's a third tile, do the same with #2 and #3
		// Same for #3 and #4

		// If all cells have something in them by the end of this process
		// End the game

		// Reset the Tile values

		return points;

	}; // end thisMan._move



};  // end GameManager()
