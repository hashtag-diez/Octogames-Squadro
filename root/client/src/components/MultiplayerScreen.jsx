import React from 'react'
import WelcomeScreen from './WelcomeScreen'
import WaitingScreen from './WaitingScreen'

function MultiplayerScreen({socket, room, player, setRoom, opponent, setPlayer}) {
  /**socket.on('opponentMove', ({ side, pawn }) => {
    triggerClick(pawn, side)
  })    
  const triggerClick = (i, side) => {
      const pawn = (side==='red' ? document.querySelector('.red-row').childNodes[i-1] : document.querySelector('.yellow-row').childNodes[i-1])
      const event = new Event('click', { bubbles : true })
      pawn.dispatchEvent(event)
  }**/
    return (
        <>
        {opponent.name? <WaitingScreen/>:
        <WelcomeScreen 
          player={player}
          setPlayer={setPlayer}
          socket ={socket}
          room = {room}
          setRoom = {setRoom}
          />}
        </>
    )
}

export default MultiplayerScreen