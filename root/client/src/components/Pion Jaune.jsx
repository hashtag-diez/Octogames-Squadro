import styled, { keyframes } from 'styled-components'
import React, { useState, useEffect } from 'react'
import { ReactComponent as Yellow } from '../assets/Pion Jaune.svg'

const PionJaune = ({ x, y, powerGo, powerReturn, handlePlay }) => {
  const [posX, setPosX] = useState(x)
  const [animateSlide, setAnimateSlide] = useState('')
  const [animateRotate, setAnimateRotate] = useState('')
  const [currPower, setCurrPower] = useState(powerGo)
  const handleMovement = (e) => {
    e.preventDefault()
    if (currPower !== 0) {
      const newPosX = handlePlay(posX, y, currPower)
      setPosX(newPosX)
    } else {
      console.log('%cPion inactif...', 'font-style: italic')
    }
  }
  useEffect(() => {
    if (posX !== 0 || animateRotate === 'true') {
      setAnimateSlide('true')
      if (posX === 0 && animateRotate === 'true') {
        const timer = setTimeout(() => {
          setCurrPower(0)
        }, 500) // The duration of the animation defined in the CSS file
        return () => {
          clearTimeout(timer)
        }
      }
      if (posX === 6) {
        const timer = setTimeout(() => {
          setAnimateSlide('false')
          setAnimateRotate('true')
          setCurrPower(powerReturn)
        }, 400) // The duration of the animation defined in the CSS file
        return () => {
          clearTimeout(timer)
        }
      }
    }
  }, [posX])
  return (
    <StyledDiv animateSlide={animateSlide} animateRotate={animateRotate} curr={posX} step={currPower} onClick={(e) => handleMovement(e)}>
      <Yellow />
    </StyledDiv>
  )
}
const slideGo = (a, b) =>
  keyframes`
    0%{
      transform: translateY(${a}px);
    }
    100%{
      transform: translateY(${b}px);
    }
`
const slideReturn = (a, b) =>
  keyframes`
    0%{
      transform: translateY(${a}px) rotate(180deg);
    }
    100%{
      transform: translateY(${b}px) rotate(180deg);
    }
`
const rotate = keyframes`
  0%{
    transform: translateY(calc(6*94px)) rotate(0deg);
  }
  100%{
    transform: translateY(calc(6*94px)) rotate(180deg);
  }
`
const StyledDiv = styled.div`
  animation: ${({ animateSlide, curr, step }) => (animateSlide === 'true' ? slideGo(curr * 94 - step * 94, curr * 94) : '')} 0.3s ease-in-out forwards, 
  ${({ animateRotate }) => (animateRotate === 'true' ? rotate : '')} 0.3s ease-in-out forwards,
  ${({ animateSlide, animateRotate, curr, step }) => (animateRotate === 'true' && animateSlide === 'true' ? slideReturn(curr * 94 - step * 94, curr * 94) : '')} 0.3s ease-in-out forwards;
`
export default PionJaune
