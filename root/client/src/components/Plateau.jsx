import React, { useState } from 'react'
import '../style/Plateau.css'
import PionJaune from './Pion Jaune'
import PionRouge from './Pion Rouge'
import Evaluation from '../js/bot/fonctionEvaluation.js'
import { ReactComponent as Board } from '../assets/Plateau.svg'

export const Plateau = ({ score, setScore, isAgainstBot, mode }) => {
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

  const [turn, setTurn] = useState('y')
  const replaceRedPawn = (list) => {
    const newReds = [...reds]
    list.forEach(x => {
      const [powerGo, powerReturn, origin] = [newReds[x - 1].powerGo, newReds[x - 1].powerReturn, board[newReds[x - 1].x][0]]
      delete newReds[x - 1]
      newReds[x - 1] = { id: Date.now() + x, x: x, y: (origin === 'r' ? 0 : 6), powerGo: powerGo, powerReturn: powerReturn }
    })
    setReds(newReds)
  }
  const replaceYellowPawn = (list) => {
    const newYellows = [...yellows]
    list.forEach(y => {
      const [powerGo, powerReturn, origin] = [newYellows[y - 1].powerGo, newYellows[y - 1].powerReturn, board[0][newYellows[y - 1].y]]
      delete newYellows[y - 1]
      newYellows[y - 1] = { id: Date.now() + y, x: (origin === 'y' ? 0 : 6), y: y, powerGo: powerGo, powerReturn: powerReturn }
    })
    setYellows(newYellows)
  }
  const updateYellows = (x, y) => {
    const newYellows = [...yellows]
    newYellows[y - 1].x = x
    newYellows[y - 1].currentPower = getUpdatePower( y, 'y')
    setYellows(newYellows)
  }
  const updateReds = (x, y) => {
    const newReds = [...reds]
    newReds[x - 1].y = y
    newReds[x - 1].currentPower = getUpdatePower(x, 'r')
    setReds(newReds)
  }

const setYellowHover=(x,y,currPower)=>{
  const currBoard = [...board]
  let list=[0,0,0,0,0,0]
  if(currPower===0){ return list}
  let future=x+currPower
  if(future>6){ future=6}
  else if(future<0){ future=0}
  let i
    if(currPower>0){
      for (i =x+1;i<=future ; i++){
        if(currBoard[i][y].toLowerCase()==='r'){
          list[i]=2
          future++
        }else{
          list[i]=1
        }
      }
    }
    else{
      for (i =x-1;i>=future ; i--){
        if(currBoard[i][y].toLowerCase()==='r'){
          list[i]=2
          future--
        }else{
          list[i]=1
        }
      }
    }
    return list
  }

  const setRedHover=(x,y,currPower)=>{
    const currBoard = [...board]
    let list=[0,0,0,0,0,0]
    if(currPower===0){ return list}
    let future=x+currPower
    if(future>6){ future=6}
    else if(future<0){ future=0}
    let i
    if(currPower>0){
      for (i =x+1;i<=future ; i++){
        if(currBoard[x][i].toLowerCase()==='y'){
          list[i]=2
          future++
        }else{
          list[i]=1
        }
      }
    }
    else{
      for (i =x-1;i>=future ; i--){
        if(currBoard[x][i].toLowerCase()==='y'){
          list[i]=2
          future--
        }else{
          list[i]=1
        }
      }
    }
    return list
  }
  const handleRedPlay = (x, y, power) => {
    const currBoard = [...board]
    // Liste contenant les pions éliminés lors du tour
    const deadPawn = []
    // Etat actuel du pion dans la matrice, en aller ou en retour
    const state = currBoard[x][y]
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
      if (i > 0 && i < 6 && currBoard[x][i].toLowerCase() === 'y') {
        distance = (power > 0 ? distance + 1 : distance - 1)
        deadPawn.push(i)
        currBoard[(currBoard[x][i] === 'y' ? 0 : 6)][i] = currBoard[x][i]
        currBoard[x][i] = '+'
      }
    }
    // Si dépassement imprévu, on replace le pion aux bordures du plateau
    const res = (power > 0 ? (i > 6 ? 6 : i - 1) : (i < 0 ? 0 : i + 1))
    replaceYellowPawn(deadPawn)
    if (res === 6) currBoard[x][res] = 'R'
    else currBoard[x][res] = state
    replaceYellowPawn(deadPawn)
    if (res === 6) currBoard[x][res] = 'R'
    else currBoard[x][res] = state
    // Si le pion a quitté une bordure de sa ligne/colonne
    if (y === 0 || y === 6) currBoard[x][y] = '—'
    else currBoard[x][y] = '+'
    // Si un aller-retour complet réalisé, incrémentation du score
    setTurn('y')
    setBoard(currBoard)
    updateReds(x, res)
    if (res === 0 && power < 0) {
      const newScore = [...score]
      newScore[0]++
      console.log('%cPion Rouge n°' + x + ' a fait un aller-retour complet ! +1 point pour les Rouges !', 'color: green')
      setScore(newScore)
      if (newScore[0] === 4) setTurn('')
      return 0
    } else {
      console.log('%cPion Rouge n °' + x + ' a bougé de ' + y + ' à ' + res, 'color: #E02016')
      return res
    }
  }
  const getId = (type, id) => {
    const newId = `${type}${id}`
    console.log(newId)
    return newId
  }
  const handleYellowPlay = (x, y, power) => {

    const currBoard = [...board]
    const deadPawn = []
    // Etat actuel du pion dans la matrice, en aller ou en retour
    const state = currBoard[x][y]
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
      if (i > 0 && i < 6 && currBoard[i][y].toLowerCase() === 'r') {
        distance = (power > 0 ? distance + 1 : distance - 1)
        console.log('On va regarder la case [',i,',',y,']')
        deadPawn.push(i)
        currBoard[i][(currBoard[i][y] === 'r' ? 0 : 6)] = currBoard[i][y]
        currBoard[i][y] = '+'
      }
    }
    const res = (power > 0 ? (i > 6 ? 6 : i - 1) : (i < 0 ? 0 : i + 1))
    replaceRedPawn(deadPawn)
    if (res === 6) currBoard[res][y] = 'Y'
    else currBoard[res][y] = state
    if (x === 0 || x === 6) currBoard[x][y] = '|'
    else currBoard[x][y] = '+'
    // Si un aller-retour complet réalisé, incrémentation du score
    setBoard(currBoard)
    setTurn('r')
    updateYellows(res, y)
    // console.log(board)
    if (res === 0 && power < 0) {
      const newScore = [...score]
      newScore[1]++
      console.log('%cPion Jaune n°' + y + ' a fait un aller-retour complet ! +1 point pour les Jaunes !', 'color: green')
      setScore(newScore)
      if (newScore[1] === 4) setTurn('')
      return 0
    }
    else{
      console.log('%cPion Jaune n°' + y + ' a bougé de ' + x + ' à ' + res, 'color: #DAA25D')
      return res
    }
  }
  return (
    <>
      {/*
        (turn === 'r' ? <h2 style={{ color: '#E02016' }}> Tour des Rouges</h2> : <h2 style={{ color: '#DAA25D' }}> Tour des Jaunes</h2>)
      */}
      <div className='board-wrapper'>
        <Board />
        <div className='red-row'>
          {
            reds.map(red => (
              <PionRouge
                key={getId('r', red.x)}
                x={red.x}
                y={red.y}
                powerGo={red.powerGo}
                powerReturn={red.powerReturn}
                handlePlay={handleRedPlay}
                isAgainstBot={isAgainstBot}
                turn={turn}
              />
            ))
          }
        </div>
        <div className='yellow-row'>
          {
            yellows.map(yellow => (
              <PionJaune
                key={getId('y', yellow.y)}
                x={yellow.x}
                y={yellow.y}
                powerGo={yellow.powerGo}
                powerReturn={yellow.powerReturn}
                handlePlay={handleYellowPlay}
                turn='y'
              />
            ))
          }
        </div>
      </div>
    </>
  )
}

export default Plateau
