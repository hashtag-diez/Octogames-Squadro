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
  const [yellows, setYellows] = useState(
    [
      { id: 1, x: 0, y: 1, powerGo: 1, powerReturn: -3 },
      { id: 2, x: 0, y: 2, powerGo: 3, powerReturn: -1 },
      { id: 3, x: 0, y: 3, powerGo: 2, powerReturn: -2 },
      { id: 4, x: 0, y: 4, powerGo: 3, powerReturn: -1 },
      { id: 5, x: 0, y: 5, powerGo: 1, powerReturn: -3 }
    ]
  )
  const [reds, setReds] = useState(
    [
      { id: 1, x: 1, y: 0, powerGo: 3, powerReturn: -1 },
      { id: 2, x: 2, y: 0, powerGo: 1, powerReturn: -3 },
      { id: 3, x: 3, y: 0, powerGo: 2, powerReturn: -2 },
      { id: 4, x: 4, y: 0, powerGo: 1, powerReturn: -3 },
      { id: 5, x: 5, y: 0, powerGo: 3, powerReturn: -1 }
    ]
  )

  const [score, setScore] = useState([0, 0])
  const [turn, setTurn] = useState('y')
  const replaceRedPawn = (list) => {
    const newReds = [...reds]
    list.forEach(x => {
      const [powerGo, powerReturn] = [newReds[x - 1].powerGo, newReds[x - 1].powerReturn]
      delete newReds[x - 1]
      newReds[x - 1] = { id: Date.now() + x, x: x, y: 0, powerGo: powerGo, powerReturn: powerReturn }
    })
    setReds(newReds)
  }
  const replaceYellowPawn = (list) => {
    const newYellows = [...yellows]
    list.forEach(y => {
      const [powerGo, powerReturn] = [newYellows[y - 1].powerGo, newYellows[y - 1].powerReturn]
      delete newYellows[y - 1]
      newYellows[y - 1] = { id: Date.now() + y, x: 0, y: y, powerGo: powerGo, powerReturn: powerReturn }
    })
    setYellows(newYellows)
  }
  const updateYellows = (x, y) => {
    const newYellows = [...yellows]
    newYellows[y - 1].x = x
    setYellows(newYellows)
  }
  const updateReds = (x, y) => {
    const newReds = [...reds]
    newReds[x - 1].y = y
    setReds(newReds)
  }
  const handleRedPlay = (x, y, power) => {
    const currBoard = [...board]
    // Liste contenant les pions éliminés lors du tour
    const deadPawn = []
    // On vérifie que le déplacement n'engendre pas un dépassement des limites du plateau
    let distance = (y + power >= 6 ? 6 - y : (y + power <= 0 ? 0 - y : power))
    let i
    /*
      Opérateur condititonnel -> ( condition ? instruction : instruction ), remplace le if/else
      Le sens de parcours de la ligne dépend de la valeur de power, si on est en aller ou en retour
      Les operateurs conditionnels dans la boucle for permet de fixer ce sens de parcours
      Permet de réduire le code et la répétition des boucles
    */
    for (i = y; (power > 0 ? i <= y + distance : i >= y + distance) ; (power > 0 ? i++ : i--)) {
      // Si un pion Jaune est rencontré, retour à la case départ et incrémentation de la distance
      if (currBoard[x][i] === 'y') {
        distance = (power > 0 ? distance + 1 : distance - 1)
        deadPawn.push(i)
        currBoard[x][i] = '+'
        currBoard[0][i] = 'y'
      }
    }
    // Si dépassement imprévu, on replace le pion aux bordures du plateau
    const res = (power > 0 ? (i > 6 ? 6 : i - 1) : (i < 0 ? 0 : i + 1))
    replaceYellowPawn(deadPawn)
    // Si un aller-retour complet réalisé, incrémentation du score
    if (res === 0 && power < 0) {
      const newScore = [...score]
      newScore[0]++
      console.log('%cPion Rouge n°' + x + ' a fait un aller-retour complet ! +1 point pour les Rouges !', 'color: green')
      setScore(newScore)
      return 0
    }
    // Si le pion a quitté une bordure de sa ligne/colonne
    if (y === 0 || y === 6) currBoard[x][y] = '—'
    else currBoard[x][y] = '+'
    currBoard[x][res] = 'r'
    updateReds(x, res)
    setBoard(currBoard)
    setTurn('y')
    // console.log(board)
    console.log('%cPion Rouge n °' + x + ' a bougé de ' + y + ' à ' + res, 'color: #E02016')
    return res
  }
  const handleYellowPlay = (x, y, power) => {
    const currBoard = [...board]
    const deadPawn = []
    let distance = (x + power >= 6 ? 6 - x : (x + power <= 0 ? 0 - x : power))
    let i
    console.log(x + distance)
    /*
      Opérateur condititonnel -> ( condition ? instruction : instruction ), remplace le if/else
      Le sens de parcours de la ligne/colonne dépend de la valeur de power, si on est en al`ler ou en retour
      Les operateurs conditionnels dans la boucle for permet de fixer ce sens de parcours
      Permet de réduire le code et la répétition des boucles
    */
    for (i = x; (power > 0 ? i <= x + distance : i >= x + distance); (power > 0 ? i++ : i--)) {
      // Si un pion Rouge est rencontré, retour à la case départ et incrémentation de la distance
      if (currBoard[i][y] === 'r') {
        distance = (power > 0 ? distance + 1 : distance - 1)
        deadPawn.push(i)
        currBoard[i][y] = '+'
        currBoard[i][0] = 'r'
      }
    }
    const res = (power > 0 ? (i > 6 ? 6 : i - 1) : (i < 0 ? 0 : i + 1))
    replaceRedPawn(deadPawn)
    // Si un aller-retour complet réalisé, incrémentation du score
    if (res === 0 && power < 0) {
      const newScore = [...score]
      newScore[1]++
      console.log('%cPion Jaune n°' + y + ' a fait un aller-retour complet ! +1 point pour les Jaunes !', 'color: green')
      setScore(newScore)
      return 0
    }
    // Si le pion a quitté une bordure de sa ligne/colonne
    console.log(res)
    if (x === 0 || x === 6) currBoard[x][y] = '|'
    else currBoard[x][y] = '+'
    currBoard[res][y] = 'y'
    updateYellows(res, y)
    setBoard(currBoard)
    setTurn('r')
    // console.log(board)
    console.log('%cPion Jaune n°' + y + ' a bougé de ' + x + ' à ' + res, 'color: #DAA25D')
    return res
  }
  return (
    <>
      <h1>
        Rouge : {score[0]}
        &emsp;
        Jaune : {score[1]}
      </h1>
      {
        (turn === 'r' ? <h2 style={{ color: '#E02016' }}> Tour des Rouges</h2> : <h2 style={{ color: '#DAA25D' }}> Tour des Jaunes</h2>)
      }
      <div className='board-wrapper'>
        <Board />
        <div className='red-row'>
          {
            reds.map(red => (
              <PionRouge
                key={red.id}
                x={red.x}
                y={red.y}
                powerGo={red.powerGo}
                powerReturn={red.powerReturn}
                handlePlay={handleRedPlay}
                turn={turn}
              />
            ))
          }
        </div>
        <div className='yellow-row'>
          {
            yellows.map(yellow => (
              <PionJaune
                key={yellow.id}
                x={yellow.x}
                y={yellow.y}
                powerGo={yellow.powerGo}
                powerReturn={yellow.powerReturn}
                handlePlay={handleYellowPlay}
                turn={turn}
              />
            ))
          }
        </div>
      </div>
    </>
  )
}

export default Plateau
