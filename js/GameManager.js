/* Created 01/24/15

TODO:
- Does a merged tile inherit the node of its parents or
does it have new random nodes?
- Where does the container go? Does it have to be passed down all
the way to Tile and Grid?
*/

'use strict'

// ( Grid, TileManager, PageManager ) -> GameManager
// Need to pass Tile into here too?
var GameManager = function ( Grid, TileMan, PageMan, container ) {

	thisGMan = {};

	thisGMan._numCols 	=       4;

	thisGMan._newTileID 	=       0;
	thisGMan._newGridID 	=       0;

	thisGMan._score		=       0;

	thisGMan._Grid 		=    Grid;
	thisGMan._grid 		=    null;
	thisGMan._TileMan 	= TileMan;
	thisGMan._PageMan 	= PageMan;

	thisGMan._container 	= container;

	// ( Str ) -> int
	thisGMan._move = function ( direction ) {
		var self = this;

		var points = 0;

		// Get x and y movement (vector) using direction

		// Get order to move tiles using vector

		// Go through a row (the following depend on the existance of each tile)

		// Move the first tile till it hits a wall

		// If there's a second tile
			// Call TileManager's merge function (needs direction and tiles):
				// Use grid position and direction to determine which node R or 
					// node B to use (Always use leftmost or topmost Tile's node)
				// Check if Tiles add up to true

				// If neither Tile .wasMerged && if they add up to true
					// Set z-axis based on grid position
						// TODO: check on negative z-axis value behavior
					// Move the second tile into the first tile cell
					
					// Create a new tile in their place (using a "true" Tile)
					// Possibly have the new tile inherit the nodes of the tile
						// with the higher z-axis
					// Set its .wasMerged to true

					// Destroy the DOM of the two tiles (not here?)
					// Return the new tile
				// else return null

		// if the result is a tile
			// Maybe add the tile html here (does that mean tile DOMs
				// should be destroyed here too?)
				// (What about the RULES in Plan.txt?)
			// Set tile id num? Should TileManager have that?
				// (What about the RULES in Plan.txt?)

			// Increase the points (diff the more you've gotten?)
			
			// Destroy tiles 1 and 2 in grid (why is this in here, but
				// destroying html is not in here?)
			// Add the new tile to the grid data

		// If there's a third tile, do the same with #2 and #3
		// Same for #3 and #4

		// If all cells have something in them by the end of this process
			// End the game
		// else add a new tile to the board

		// Reset the Tile values

		return points;

	}; // end thisGMan._move

	// ( int ) -> GameManager
	thisGMan._lose = function ( points ) {
		var self = this;

		console.log("Game Over");

		return self;
	};  // end GameManager._lose()

	// ( int ) -> Grid
	thisGMan._addGrid = function ( idNum ) {
		var self = this;

		// Create grid with id
		var grid = "new Grid";

		// Prepare newGridID for next grid
		// If I'm setting _newGridID in here, do I need to pass in an id number?

		// Add grid to DOM?

		console.log("You should add a grid now")

		// Add grid to self?
		self._grid = grid;
		// Should I return idNum or grid instead?
		return self;
	};  // end GameManager._addGrid()

	// Should I have a function for increasing id numbers?
	thisGMan._increaseGridID = function ( idNum ) {
		var self = this;
		self._newGridID = idNum++;
		return self;
	};  // end GameManager._increaseGridID()
	thisGMan._increaseTileID = function ( idNum ) {
		var self = this;
		self._newTileID = idNum++;
		return self;
	};  // end GameManager._increaseGridID()

	


	return thisGMan;

};  // end GameManager()
