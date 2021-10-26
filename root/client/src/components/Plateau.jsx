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
  const handleRedPlay = (x, y, power) => {
    const currBoard = [...board]
    let distance = power
    let i
    for (i = y; i < y + distance; i++) {
      if (currBoard[x][i] === 'y') {
        distance += 1
        currBoard[x][i] = '+'
        currBoard[0][i] = 'y'
      }
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
    for (i = x; i < x + distance; i++) {
      if (currBoard[i][y] === 'r') {
        distance += 1
        currBoard[i][y] = '+'
        currBoard[i][0] = 'r'
      }
    }
    if (x === 0 || x === 6) currBoard[x][y] = '|'
    else currBoard[x][y] = '+'
    currBoard[x + distance][y] = 'y'
    setBoard(currBoard)
    console.log(board)
    return x + distance
  }
  return (
    <div className='board-wrapper'>
      <Board />
      <div className='red-row'>
        <PionRouge x={1} y={0} power={3} handlePlay={handleRedPlay} />
        <PionRouge x={2} y={0} power={1} handlePlay={handleRedPlay} />
        <PionRouge x={3} y={0} power={2} handlePlay={handleRedPlay} />
        <PionRouge x={4} y={0} power={1} handlePlay={handleRedPlay} />
        <PionRouge x={5} y={0} power={3} handlePlay={handleRedPlay} />
      </div>
      <div className='yellow-row'>
        <PionJaune x={0} y={1} power={1} handlePlay={handleYellowPlay} />
        <PionJaune x={0} y={2} power={3} handlePlay={handleYellowPlay} />
        <PionJaune x={0} y={3} power={2} handlePlay={handleYellowPlay} />
        <PionJaune x={0} y={4} power={3} handlePlay={handleYellowPlay} />
        <PionJaune x={0} y={5} power={1} handlePlay={handleYellowPlay} />
      </div>
    </div>
  )
}

export default Plateau
