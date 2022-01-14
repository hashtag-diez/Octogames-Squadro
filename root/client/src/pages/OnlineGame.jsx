import React, { useState, useEffect } from 'react'
import { ReactComponent as Retry } from '../assets/retry.svg'
import logo from '../assets/Logo.png'
import Rules from '../components/static/Rules'
import Icone from '../components/Icone'
import { StyledMain, StyledHeader, StyledFooter, Button, StyledSpan } from '../style/commonStyle'
import Plateau from '../components/Plateau'
import styled from 'styled-components'
const OnlineGame = ({ player, socket, room, host, guest }) => {
  const [score, setScore] = useState([0, 0])
  const [key, setKey] = useState(Date.now())
  const [turn, setTurn] = useState('r')
  useEffect(() => {
    socket.on('resetGame', () => {
      socket.off('opponentMove')
      setScore([0, 0])
      setKey(Date.now())
      socket.on('opponentMove', ({ side, pawn }) => {
        console.log(key + " : L'ennemi a reçu un message de "+side+" pour l'indice "+pawn)
        triggerClick(pawn, side)
      })  
    })
  }, [])
  useEffect(() => {
    socket.on('opponentMove', ({ side, pawn }) => {
      console.log(key + " : L'ennemi a reçu un message de "+side+" pour l'indice "+pawn)
      triggerClick(pawn, side)
    })
  }, [])
  const handleReset = () => {
    setScore([0, 0])
    setKey(Date.now())
    socket.emit('resetGame', room)
    socket.off('opponentMove')
    socket.on('opponentMove', ({ side, pawn }) => {
      console.log(key + " : L'ennemi a reçu un message de "+side+" pour l'indice "+pawn)
      triggerClick(pawn, side)
    })
  }
  const triggerClick = (i, side) => {
    const pawn = (side==='red' ? document.querySelector('.red-row').childNodes[i-1] : document.querySelector('.yellow-row').childNodes[i-1])
    const event = new Event('click', { bubbles : true })
    pawn.dispatchEvent(event)
  } 
  return (
    <>
    <StyledHeader>
    <img src={logo} alt='logo' />
    </StyledHeader>
    <StyledMain>
      <BoardWrapper>
        <Icone editor={false} name={host.name} theme={host.sprite} isHost player={player}/>
        <Icone editor={false} name={guest.name} theme={guest.sprite} isHost={false} player={player}/>
        <Plateau key={key} score={score} setScore={setScore} socket={socket} room={room} isOnline player={player} host={host} guest={guest} isAgainstBot={false} turn={turn} setTurn={setTurn}  />
      </BoardWrapper>
      <aside>
        {
         ((score[0] === 4 || score[1] === 4))
            ? <h1 style={{ marginBottom: '30px' }}>
              Les {(score[0] === 4 ? <StyledSpan red>Rouges</StyledSpan> : <StyledSpan yellow>Jaunes</StyledSpan>)}
              <br />
              ont gagné 🎉
              </h1>
            : <h1 style={{ marginBottom: '30px' }}>
              <StyledSpan yellow={false} turn={turn}>Rouge</StyledSpan>&nbsp; : {score[0]}
              <br />
              <StyledSpan yellow turn={turn}>Jaune</StyledSpan>&nbsp;&nbsp;&nbsp;: {score[1]}
              </h1>
        }
        <Rules />
        {
          ((score[0] === 4 || score[1] === 4)  && player.name === host.name)?
            <Button color="#da8012" onClick={() => handleReset()}> <Retry />Recommencer</Button>
            : ''
        }
      </aside>
    </StyledMain>
    <StyledFooter>
      <p>
        Sorbonne Université © - 2021
      </p>
    </StyledFooter>
    </>
  )
}

const BoardWrapper = styled.div`
  position: relative;
`

export default OnlineGame
