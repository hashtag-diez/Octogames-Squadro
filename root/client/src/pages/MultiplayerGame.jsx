import React, { useState, useEffect } from 'react'
import socketIOClient from 'socket.io-client'
const ENDPOINT = 'http://localhost:5000'
let socket

const MultiplayerGame = () => {
  const [roomID, setRoomID] = useState('')
  const [side, setSide] = useState('')
  const [pawn, setPawn] = useState(1)
  useEffect(() => {
    socket = socketIOClient(ENDPOINT,
      {
        query: {
          token: 'Diez' + parseInt(Math.random() * 10)
        }
      })
    socket.on('sendRoomId', data => {
      console.log(data)
      setRoomID(data)
    })
    socket.on('resultJoiningRoom', data => {
      console.log(data)
    })
    socket.on('opponentMove', ({ side, pawn }) => {
      console.log("L'ennemi du côté " + side + ' a joué le pion n°' + pawn)
    })
    socket.on('disconnect', (name) => {
      console.log(name + 's\'est déconnecté')
    })
    socket.on('joinGame', (name) => {
      console.log(name + 's\'est connecté à la room !')
    })
  }, [])
  const getRoomId = (e) => {
    e.preventDefault()
    socket.emit('getRoomId')
  }
  const joinRoom = (e) => {
    e.preventDefault()
    socket.emit('tryToJoin', roomID)
  }
  const simulateMove = (e) => {
    e.preventDefault()
    socket.emit('myMove', side, pawn, roomID)
  }
  return (
    <>
      <div>
        <button onClick={(e) => getRoomId(e)}> getRoomId</button>
      </div>
      <div>
        {
          roomID !== '' ?
          'Link : http://localhost:3000/' + roomID
          :
          ''
        }
      </div>
      <br/>
      <div>
        <input onChange={(e) =>{ setRoomID(e.target.value) }} type="text" name="" id=""/>
      </div>
      <div>
        <button onClick={(e) => joinRoom(e)}> joinRoom</button>
      </div>
      <br/>
      <div>
        <input onChange={(e) =>{ setSide(e.target.value) }} type="text" name="" id=""/> &emsp;
        <input onChange={(e) =>{ setPawn(e.target.value) }} type="number" name="" id=""/>

      </div>
      <div>
        <button onClick={(e) => simulateMove(e)}> send my moove</button>
      </div>
    </>
  )
}

export default MultiplayerGame
