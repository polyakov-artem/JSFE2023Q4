# RSS Nonograms

## Criteria for evaluation:

**Maximum score for the task: 250 points**

### Basic scope +80 points

- layout, design, responsive UI: `+20`
- at the beginning state of the game, the frame has size 5x5. The sequence of numbers is logically arranged and help the player solve the nonogram: `+20`
- cells and clues are divided by dividers as described in Basic block: `+5`
- when user clicks on cells using mouse left-click - it should be mark as dark. When user click on dark cell - it should be mark as empty (white) cell: `+15`
- the game should end when the player reveals all **black** cells correctly and related message is displayed at the end of the game: `+20`

### Advanced scope +90 points

- the game should have at least 5 templates for easy level (5x5) and the player is able to choose what picture he/she wants to solve. `+15`
- a player is able to fill in a cell in the grid changing the color of the grid to crossed-cell(X) using right mouse-click. Context menu doesn't appear: `+20`
- the game can be restarted without reloading the page: `+15`
- game duration is displayed, stop-watch will start after first click on field (not on clues) and related message is displayed at the end of the game: `+10`
- sound accompaniment (on/off) for every events (see **Advanced** block): `+15`
- implemented saving the state of the latest game and "Continue last game" button: `+15`

### Hacker scope +80 points

- option to choose different themes for the game board (dark/light themes): `+15`
- ability to change the size (5x5, 10x10, 15x15) is implemented and there are least 5 templates for each level: `+20`
- implemented saving the latest 5 win results with sorting: `+15`
- "random game" button is implemented. When player clicks on button - the random template appears (both template and level must be chosen randomly by algorithm): `+15`
- "Solution" button is implemented. When player clicks on button - the field is filled in cells with right solution. Such games is not recorded into winning table: `+15`
