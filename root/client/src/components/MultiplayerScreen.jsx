import React from 'react'
import WelcomeScreen from './WelcomeScreen'
import WaitingScreen from './WaitingScreen'

function MultiplayerScreen({socket, room, player, setRoom, opponent, setPlayer}) {
    return (
        <>
        //Si on trouve un joueur
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