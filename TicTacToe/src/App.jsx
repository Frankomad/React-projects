import { useState } from 'react'
import Player from './components/Player.jsx'
import GameBoard from './components/Gameboard.jsx'
import Log from './components/Log.jsx'
import { WINNING_COMBINATIONS } from './winning_combinations.js'
import GameOver from './components/GameOver.jsx'

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X"

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O"
  }

  return currentPlayer
}

function deriveWinner(gameBoard, players) {
  let winner = null;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column]
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = players[firstSquareSymbol]
    }
  }
  return winner;
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...initialGameBoard.map(row => [...row])];

  for (const turn of gameTurns) {
    const { square, player } = turn
    const { row, col } = square
    gameBoard[row][col] = player
  }

  return gameBoard
}

function App() {
  const [gameTurns, setGameTurns] = useState([])
  const [players, setPlayers] = useState({
    "X": "Player 1",
    "O": "Player 2"
  })

  const activePlayer = deriveActivePlayer(gameTurns)

  let gameBoard = deriveGameBoard(gameTurns)

  const winner = deriveWinner(gameBoard, players)

  const hasDraw = gameTurns.length === 9 && !winner

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns)

      const updatedTurns = [{
        square: {
          row: rowIndex,
          col: colIndex
        },
        player: currentPlayer
      }, ...prevTurns]

      return updatedTurns;
    })
  }

  function handleRematch() {
    setGameTurns([])
  }

  function handlePlayerNameChange(symbol, name) {
    setPlayers((prevPlayers) => {
      const updatedPlayers = {
        ...prevPlayers,
        [symbol]: name
      }

      return updatedPlayers
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className='highlight-player'>
          <Player name={players.X} symbol="X" isActive={activePlayer === "X"} onChangeName={handlePlayerNameChange} />
          <Player name={players.O} symbol="O" isActive={activePlayer === "O"} onChangeName={handlePlayerNameChange} />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} rematch={handleRematch} />}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} board={gameBoard} />
    </main>
  )
}

export default App
