import React, { useState } from 'react'
import logo from '../assets/Logo.png'
import Rules from '../components/static/Rules'
import { ReactComponent as Retry } from '../assets/retry.svg'
import { StyledMain, StyledHeader, StyledFooter, Button, StyledSpan } from '../style/commonStyle'
import Plateau from '../components/Plateau'

const LocalGame = ({ isAgainstBot }) => {
  const [score, setScore] = useState([0, 0])
  const [key, setKey] = useState(Date.now())
  const [turn, setTurn] = useState('r')
  const handleReset = e => {
    e.preventDefault()
    setScore([0, 0])
    setKey(Date.now())
  }
  return (
    <>
      <StyledHeader>
        <img src={logo} alt='logo' />
      </StyledHeader>
      <StyledMain>
        <Plateau key={key} score={score} setScore={setScore} isAgainstBot={isAgainstBot} turn={turn} setTurn={setTurn} />
        <aside>
          {
            score[0] === 4 || score[1] === 4
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
            score[0] === 4 || score[1] === 4 ?
              <Button color="#da8012" onClick={(e) => handleReset(e)}> <Retry />Recommencer</Button>
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

export default LocalGame
