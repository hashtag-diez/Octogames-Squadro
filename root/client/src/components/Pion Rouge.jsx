import styled, { keyframes } from 'styled-components'
import React, { useState, useEffect } from 'react'
import { ReactComponent as Red } from '../assets/Pion Rouge.svg'

const PionRouge = ({ x, y, powerGo, powerReturn, handlePlay, turn }) => {
  const [posY, setPosY] = useState(y)
  const [animateSlide, setAnimateSlide] = useState('')
  const [animateRotate, setAnimateRotate] = useState('')
  const [currPower, setCurrPower] = useState(powerGo)
  const [distance, setDistance] = useState(0)
  const handleMovement = (e) => {
    e.preventDefault()
    if (turn === 'r') {
      if (currPower !== 0) {
        const newPosY = handlePlay(x, posY, currPower)
        setDistance(newPosY - posY)
        setPosY(newPosY)
      } else {
        console.log('%cPion inactif...', 'font-style: italic')
      }
    }
  }
  useEffect(() => {
    if (posY !== 0 || animateRotate === 'true') {
      setAnimateSlide('true')
      if (posY === 0 && animateRotate === 'true') {
        const timer = setTimeout(() => {
          setCurrPower(0)
        }, 500) // The duration of the animation defined in the CSS file
        return () => {
          clearTimeout(timer)
        }
      }
      if (posY === 6) {
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
  }, [posY])
  return (
    <>
      <StyledRed animateSlide={animateSlide} animateRotate={animateRotate} curr={posY} step={distance} onClick={(e) => handleMovement(e)} />
    </>

  )
}
const slideGo = (a, b) =>
  keyframes`
    0%{
      transform: translateX(${a}px);
    }
    100%{
      transform: translateX(${b}px);
    }
`
const slideReturn = (a, b) =>
  keyframes`
    0%{
      transform: translateX(${a}px) rotate(180deg);
    }
    100%{
      transform: translateX(${b}px) rotate(180deg);
    }
`
const rotate = keyframes`
  0%{
    transform: translateX(calc(6*94px)) rotate(0deg);
  }
  100%{
    transform: translateX(calc(6*94px)) rotate(180deg);
  }
`
const StyledRed = styled(Red)`
  animation: ${({ animateSlide, curr, step }) => (animateSlide === 'true' ? slideGo(curr * 94 - step * 94, curr * 94) : '')} 0.3s ease-in-out forwards, 
  ${({ animateSlide, animateRotate }) => (animateRotate === 'true' && animateSlide === 'false' ? rotate : '')} 0.3s ease-in-out forwards,
  ${({ animateSlide, animateRotate, curr, step }) => (animateRotate === 'true' && animateSlide === 'true' ? slideReturn(curr * 94 - step * 94, curr * 94) : '')} 0.3s ease-in-out forwards;
`

export default PionRouge
