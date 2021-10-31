import styled, { keyframes } from 'styled-components'
import React, { useState } from 'react'
import { ReactComponent as Yellow } from '../assets/Pion Jaune.svg'
import '../style/Pion.css'

const PionJaune = ({ x, y, powerGo, powerReturn, handlePlay }) => {
  const [posX, setPosX] = useState(x)
  const [animate, setAnimate] = useState('')
  const [currPower, setCurrPower] = useState(powerGo)
  const handleMovement = (e) => {
    setAnimate('false')
    e.preventDefault()
    if (currPower !== 0) {
      const newPosX = handlePlay(posX, y, currPower)
      if (newPosX === 0) setCurrPower(0)
      if (newPosX === 6) {
        console.log('%cLimite atteinte, changement de sens', 'font-weight: bold')
        setCurrPower(powerReturn)
      }
      setPosX(newPosX)
    } else {
      console.log('%cPion inactif...', 'font-style: italic')
    }
    setAnimate('true')
  }
  return (
    <StyledDiv animate={animate} curr={posX} step={currPower} onClick={(e) => handleMovement(e)}>
      <Yellow />
    </StyledDiv>
  )
}
const StaticSlide = keyframes`
  0%{
    transform: translateY(0px);
  }
  100%{
    transform: translateY(92px);
  }
`
const slide = (a, b) =>
  keyframes`
    0%{
      transform: translateY(${a}px);
    }
    100%{
      transform: translateY(${b}px);
    }
`
/* const slideWithRotate = (a, b) => {
  keyframes`
  0% {
    transform: translateY(${a}px);
  }
  75%{
    transform: translateY(${b}px) rotate(0deg);
  }
  100%{
    transform: translateY(${b}px) rotate(180deg);
  }`
} */
const StyledDiv = styled.div`
  animation: ${({ animate, curr, step }) => (animate === 'true' ? slide(curr * 94 - step * 94, curr * 94) : '')} 0.3s ease-in-out forwards;
`
export default PionJaune
