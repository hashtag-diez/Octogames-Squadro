import styled, { keyframes } from 'styled-components'
import React, { useState } from 'react'
import { ReactComponent as Red } from '../assets/Pion Rouge.svg'

import '../style/Pion.css'
const PionRouge = ({ x, y, powerGo, powerReturn, handlePlay }) => {
  const [animate, setAnimate] = useState('')
  const [posY, setPosY] = useState(y)
  const [currPower, setCurrPower] = useState(powerGo)
  const handleMovement = (e) => {
    e.preventDefault()
    if (currPower !== 0) {
      const newPosY = handlePlay(x, posY, currPower)
      if (newPosY === 0) setCurrPower(0)
      if (newPosY === 6) {
        console.log('%cLimite atteinte, changement de sens', 'font-weight: bold')
        setCurrPower(powerReturn)
      }
      setPosY(newPosY)
      setAnimate('true')
    } else {
      console.log('%cPion inactif...', 'font-style: italic')
    }
  }
  return (
    <>
      <StyledRed animate={animate} curr={posY} step={currPower} onClick={(e) => handleMovement(e)} />
    </>

  )
}
const slide = (a, b) =>
  keyframes`
    0%{
      transform: translateX(${a}px);
    }
    100%{
      transform: translateX(${b}px);
    }
`
const StyledRed = styled(Red)`
  animation: ${({ animate, curr, step }) => (animate === 'true' ? slide(curr * 94 - step * 94, curr * 94) : '')} 0.3s ease-in-out forwards;
`

export default PionRouge
