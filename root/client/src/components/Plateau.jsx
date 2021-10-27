import React, { useState } from 'react'
import '../style/Plateau.css'
import PionJaune from './Pion Jaune'
import PionRouge from './Pion Rouge'
import { ReactComponent as Board } from '../assets/Plateau.svg'

export const Plateau = () => {
  const [board, setBoard] = useState(
    [['x', 'y', 'y', 'y', 'y', 'y', 'x'],
      ['r', '+', '+', '+', '+', '+', '—'],
      ['r', '+', '+', '+', '+', '+', '—'],
      ['r', '+', '+', '+', '+', '+', '—'],
      ['r', '+', '+', '+', '+', '+', '—'],
      ['r', '+', '+', '+', '+', '+', '—'],
      ['x', '|', '|', '|', '|', '|', 'x']
    ]
  )
  const [score, setScore] = useState([0, 0])
  const handleRedPlay = (x, y, power) => {
    const currBoard = [...board]
    let distance = power
    let i
    for (i = y; (power > 0 ? i < y + distance : i > y + distance) ; (power > 0 ? i++ : i--)) {
      if (currBoard[x][i] === 'y') {
        distance += 1
        currBoard[x][i] = '+'
        currBoard[0][i] = 'y'
      }
    }
    if (i === 0 && power < 0) {
      const newScore = [...score]
      newScore[0]++
      setScore(newScore)
      return 0
    }
    if (y === 0 || y === 6) currBoard[x][y] = '—'
    else currBoard[x][y] = '+'
    currBoard[x][y + distance] = 'r'
    setBoard(currBoard)
    console.log(board)
    return y + distance
  }
  const handleYellowPlay = (x, y, power) => {
    const currBoard = [...board]
    let distance = power
    let i
    for (i = x; (power > 0 ? i < x + distance : i > x + distance); (power > 0 ? i++ : i--)) {
      if (currBoard[i][y] === 'r') {
        distance += 1
        currBoard[i][y] = '+'
        currBoard[i][0] = 'r'
      }
    }
    if (i === 0 && power < 0) {
      const newScore = [...score]
      newScore[1]++
      setScore(newScore)
      return 0
    }
    if (x === 0 || x === 6) currBoard[x][y] = '|'
    else currBoard[x][y] = '+'
    currBoard[x + distance][y] = 'y'
    setBoard(currBoard)
    console.log(board)
    return x + distance
  }
  return (
    <>
      <h1>
        Rouge : {score[0]}
        &emsp;
        Jaune : {score[1]}
      </h1>
      <div className='board-wrapper'>
        <Board />
        <div className='red-row'>
          <PionRouge x={1} y={0} powerGo={3} powerReturn={-1} handlePlay={handleRedPlay} />
          <PionRouge x={2} y={0} powerGo={1} powerReturn={-3} handlePlay={handleRedPlay} />
          <PionRouge x={3} y={0} powerGo={2} powerReturn={-2} handlePlay={handleRedPlay} />
          <PionRouge x={4} y={0} powerGo={1} powerReturn={-3} handlePlay={handleRedPlay} />
          <PionRouge x={5} y={0} powerGo={3} powerReturn={-1} handlePlay={handleRedPlay} />
        </div>
        <div className='yellow-row'>
          <PionJaune x={0} y={1} powerGo={1} powerReturn={-3} handlePlay={handleYellowPlay} />
          <PionJaune x={0} y={2} powerGo={3} powerReturn={-1} handlePlay={handleYellowPlay} />
          <PionJaune x={0} y={3} powerGo={2} powerReturn={-2} handlePlay={handleYellowPlay} />
          <PionJaune x={0} y={4} powerGo={3} powerReturn={-1} handlePlay={handleYellowPlay} />
          <PionJaune x={0} y={5} powerGo={1} powerReturn={-3} handlePlay={handleYellowPlay} />
        </div>
      </div>
    </>
  )
}

export default Plateau
