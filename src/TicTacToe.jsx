import React, { useState } from 'react'
import './TicTacToe.css'

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [isXNext, setIsXNext] = useState(true)
  const [winningLine, setWinningLine] = useState(null)
  
  const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  const checkWinner = (squares) => {
    for (let i = 0; i < winningLines.length; i++) {
      const [a, b, c] = winningLines[i]
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line: winningLines[i] }
      }
    }
    return null
  }

  const handleCellClick = (index) => {
    // Don't allow moves if game is over or cell is already filled
    if (board[index] || winningLine) return

    const newBoard = [...board]
    newBoard[index] = isXNext ? 'X' : 'O'
    setBoard(newBoard)

    const winInfo = checkWinner(newBoard)
    if (winInfo) {
      setWinningLine(winInfo.line)
    } else {
      setIsXNext(!isXNext)
    }
  }

  const getGameStatus = () => {
    if (winningLine) {
      const winner = board[winningLine[0]]
      return `Winner: ${winner}`
    }
    
    if (board.every(cell => cell !== null)) {
      return 'Draw!'
    }
    
    return `Next turn: ${isXNext ? 'X' : 'O'}`
  }

  const restartGame = () => {
    setBoard(Array(9).fill(null))
    setIsXNext(true)
    setWinningLine(null)
  }

  const renderCell = (index) => {
    const isWinningCell = winningLine && winningLine.includes(index)
    return (
      <button
        key={index}
        className={`cell ${isWinningCell ? 'winning-cell' : ''}`}
        onClick={() => handleCellClick(index)}
      >
        {board[index]}
      </button>
    )
  }

  return (
    <div className="tic-tac-toe">
      <h1>Tic-Tac-Toe</h1>
      <div className="game-info">
        <div className={`status ${winningLine ? 'winner' : ''}`}>
          {getGameStatus()}
        </div>
        <button className="restart-button" onClick={restartGame}>
          Restart Game
        </button>
      </div>
      <div className="board">
        {board.map((cell, index) => renderCell(index))}
      </div>
    </div>
  )
}

export default TicTacToe