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
    /*
      Opérateur condititonnel -> ( condition ? instruction : instruction ), remplace le if/else
      Le sens de parcours de la ligne dépend de la valeur de power, si on est en aller ou en retour
      Les operateurs conditionnels dans la boucle for permet de fixer ce sens de parcours
      Permet de réduire le code et la répétition des boucles
    */
    for (i = y; (power > 0 ? i < y + distance : i > y + distance) ; (power > 0 ? i++ : i--)) {
      // Si un pion Jaune est rencontré, retour à la case départ et incrémentation de la distance
      if (currBoard[x][i] === 'y') {
        distance += 1
        currBoard[x][i] = '+'
        currBoard[0][i] = 'y'
      }
    }
    // Si un aller-retour complet réalisé, incrémentation du score
    if (i === 0 && power < 0) {
      const newScore = [...score]
      newScore[0]++
      console.log('%cPion Rouge n°' + x + ' a fait un aller-retour complet ! +1 point pour les Rouges !', 'color: green')
      setScore(newScore)
      return 0
    }
    // Si le pion a quitté une bordure de sa ligne/colonne
    if (y === 0 || y === 6) currBoard[x][y] = '—'
    else currBoard[x][y] = '+'
    currBoard[x][y + distance] = 'r'
    setBoard(currBoard)
    // console.log(board)
    console.log('%cPion Rouge n °' + x + ' a bougé de ' + y + ' à ' + i, 'color: #E02016')
    return y + distance
  }
  const handleYellowPlay = (x, y, power) => {
    const currBoard = [...board]
    let distance = power
    let i
    /*
      Opérateur condititonnel -> ( condition ? instruction : instruction ), remplace le if/else
      Le sens de parcours de la ligne/colonne dépend de la valeur de power, si on est en aller ou en retour
      Les operateurs conditionnels dans la boucle for permet de fixer ce sens de parcours
      Permet de réduire le code et la répétition des boucles
    */
    for (i = x; (power > 0 ? i < x + distance : i > x + distance); (power > 0 ? i++ : i--)) {
      // Si un pion Rouge est rencontré, retour à la case départ et incrémentation de la distance
      if (currBoard[i][y] === 'r') {
        distance += 1
        currBoard[i][y] = '+'
        currBoard[i][0] = 'r'
      }
    }
    // Si un aller-retour complet réalisé, incrémentation du score
    if (i === 0 && power < 0) {
      const newScore = [...score]
      newScore[1]++
      console.log('%cPion Jaune n°' + y + ' a fait un aller-retour complet ! +1 point pour les Jaunes !', 'color: green')
      setScore(newScore)
      return 0
    }
    // Si le pion a quitté une bordure de sa ligne/colonne
    if (x === 0 || x === 6) currBoard[x][y] = '|'
    else currBoard[x][y] = '+'
    currBoard[x + distance][y] = 'y'
    setBoard(currBoard)
    // console.log(board)
    console.log('%cPion Jaune n°' + y + ' a bougé de ' + x + ' à ' + i, 'color: #DAA25D')
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
