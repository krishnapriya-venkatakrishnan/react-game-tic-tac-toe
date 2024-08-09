## React- Tic tac toe game

### Overview
Web application to play tic tac toe game. This holds the history of moves. To go to a move, click on the respective move button. 
With this, the game can also be modified.

### Tree view
Displayed using ReacTree

![Tree](https://github.com/user-attachments/assets/d90fdcac-6363-44f3-8863-6322fe3bdbf4)

### Components and its usage
- App: Maintains the states to hold the player, current move, and the history of moves. After each move, this component checks if the game is over or draw.
  Logic of handling move change is done here. When done, the respective values are passed to its children to reflect the current updated move.
- GameBoard: The current board values are received and displayed on the page. If the game is won by a player, then the winning positions are highlighted.
- History: Displays the list of move buttons. When clicked, the parent component is notified and the board is updated.

### Concepts used
- Hooks: useState, useHook
- History of moves are maintained using an array. This array contains list of arrays of each moves.

### Live Demo
(https://scrimba-krishna-v-react-tic-tac-toe.netlify.app/)
