import React, { useState, useEffect } from 'react'
import '../style/Plateau.css'
import PionJaune from './Pion Jaune'
import PionRouge from './Pion Rouge'
import nextMove from '../js/bot/minMax.js'
import { ReactComponent as Board } from '../assets/Plateau.svg'

export const Plateau = ({ score, setScore, isAgainstBot, socket, room, guest, host, player, isOnline, turn, setTurn }) => {
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
      { id: 1, x: 0, y: 1, powerGo: 1, powerReturn: -3, currentPower : 1, hasArrived : false },
      { id: 2, x: 0, y: 2, powerGo: 3, powerReturn: -1, currentPower : 3, hasArrived : false },
      { id: 3, x: 0, y: 3, powerGo: 2, powerReturn: -2, currentPower : 2, hasArrived : false },
      { id: 4, x: 0, y: 4, powerGo: 3, powerReturn: -1, currentPower : 3, hasArrived : false },
      { id: 5, x: 0, y: 5, powerGo: 1, powerReturn: -3, currentPower : 1, hasArrived : false }
    ]
  )
  const [reds, setReds] = useState(
    [
      { id: 1, x: 1, y: 0, powerGo: 3, powerReturn: -1, currentPower : 1, hasArrived : false },
      { id: 2, x: 2, y: 0, powerGo: 1, powerReturn: -3, currentPower : 3, hasArrived : false },
      { id: 3, x: 3, y: 0, powerGo: 2, powerReturn: -2, currentPower : 2, hasArrived : false },
      { id: 4, x: 4, y: 0, powerGo: 1, powerReturn: -3, currentPower : 3, hasArrived : false },
      { id: 5, x: 5, y: 0, powerGo: 3, powerReturn: -1, currentPower : 1, hasArrived : false }
    ]
  )
  
  const replaceRedPawn = (list) => {
    const newReds = [...reds]
    list.forEach(x => {
      const [powerGo, powerReturn, origin, currentPower, hasArrived] = [newReds[x - 1].powerGo, newReds[x - 1].powerReturn, board[newReds[x - 1].x][0], newReds[x - 1].currentPower, newReds[x - 1].hasArrived]
      delete newReds[x - 1]
      newReds[x - 1] = { id: Date.now() * 10 + x, x: x, y: (origin === 'r' ? 0 : 6), powerGo: powerGo, powerReturn: powerReturn, currentPower: currentPower, hasArrived: hasArrived }
    })
    setReds(newReds)
  }
  const replaceYellowPawn = (list) => {
    const newYellows = [...yellows]
    list.forEach(y => {
      const [powerGo, powerReturn, origin, currentPower, hasArrived] = [newYellows[y - 1].powerGo, newYellows[y - 1].powerReturn, board[0][newYellows[y - 1].y], newYellows[y - 1].currentPower, newYellows[y - 1].hasArrived]
      delete newYellows[y - 1]
      newYellows[y - 1] = { id: Date.now() * 10 + y, x: (origin === 'y' ? 0 : 6), y: y, powerGo: powerGo, powerReturn: powerReturn, currentPower: currentPower, hasArrived : hasArrived }
    })
    setYellows(newYellows)
  }
  const updateYellows = (x, y, power) => {
    const newYellows = [...yellows]
    newYellows[y - 1].x = x
    newYellows[y - 1].currentPower = power
    setYellows(newYellows)
  }
  const updateReds = (x, y, power) => {
    const newReds = [...reds]
    newReds[x - 1].y = y
    newReds[x - 1].currentPower = power
    setReds(newReds)
  }
  const updateArrived = (id, isYellow) => {
    const newPawns = isYellow ? [...yellows] : [...reds]
    newPawns[id - 1].hasArrived = true
    if(isYellow) {
      setYellows(newPawns)
    } else {
      setReds(newPawns)
    }
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
    let future=y+currPower
    if(future>6){ future=6}
    else if(future<0){ future=0}
    let i
    if(currPower>0){
      for (i =y+1;i<=future ; i++){
        if(currBoard[x][i].toLowerCase()==='y'){
          list[i]=2
          future++
        }else{
          list[i]=1
        }
      }
    }
    else{
      for (i =y-1;i>=future ; i--){
        if(currBoard[x][i].toLowerCase()==='y'){
          list[i]=2
          future--
        }else{
          list[i]=1
        }
      }
    }
    console.log("pion ")
    return list
  }
  const handleRedPlay = (isTrusted, x, y, power) => {
    if(isOnline && isTrusted){
      console.log('emission !!!!')
      socket.emit("myMove", "red", x, room)
    }
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
    setBoard(currBoard)
    setTurn('y')
    updateReds(x, res, power)
    if (res === 0 && power < 0) {
      const newScore = [...score]
      newScore[0]++
      console.log('%cPion Rouge n°' + x + ' a fait un aller-retour complet ! +1 point pour les Rouges !', 'color: green')
      setScore(newScore)
      updateArrived(x, false)
      return 0
    } else {
      console.log('%cPion Rouge n °' + x + ' a bougé de ' + y + ' à ' + res, 'color: #E02016')
      return res
    }
  }
  const handleBotPlay = () => {
    let idNextPawn = nextMove([...yellows], [...reds], [...board])
    const pawn = yellows[idNextPawn - 1]
    triggerClick(idNextPawn, 'yellow')
  }
  const triggerClick = (i, side) => {
    const pawn = (side==='red' ? document.querySelector('.red-row').childNodes[i-1] : document.querySelector('.yellow-row').childNodes[i-1])
    const event = new Event('click', { bubbles : true })
    pawn.dispatchEvent(event)
  } 
  const handleYellowPlay = (isTrusted, x, y, power) => {
    if(isOnline && isTrusted){
      socket.emit("myMove","yellow", y, room)
    }
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
    updateYellows(res, y, power)
    // Si un aller-retour complet réalisé, incrémentation du score
    if (res === 0 && power < 0) {
      const newScore = [...score]
      newScore[1]++
      console.log('%cPion Jaune n°' + y + ' a fait un aller-retour complet ! +1 point pour les Jaunes !', 'color: green')
      setScore(newScore)
      updateArrived(y, true)
      return 0
    } else  {
      console.log('%cPion Jaune n°' + y + ' a bougé de ' + x + ' à ' + res, 'color: #DAA25D')
      return res
    }
  }

  return (
    <>
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
                handleBotPlay={handleBotPlay}
                isAgainstBot={isAgainstBot}
                isOnline={isOnline}
                player={player} 
                host={host} 
                hoverlist={setRedHover}
              />
            ))
          }
        </div>
        <div className='yellow-row'>
          {
            yellows.map(yellow => (
              <PionJaune
                id={"y" + yellow.id}
                key={yellow.id}
                x={yellow.x}
                y={yellow.y}
                powerGo={yellow.powerGo}
                powerReturn={yellow.powerReturn}
                handlePlay={handleYellowPlay}
                turn={turn}
                isOnline={isOnline}
                isAgainstBot={isAgainstBot}
                player={player} 
                guest={guest}
              hoverlist={setYellowHover}
              />
            ))
          }
        </div>
      </div>
    </>
  )
}

export default Plateau
