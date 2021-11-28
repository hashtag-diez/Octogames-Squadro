import styled, { keyframes } from 'styled-components'
import React, { useState, useEffect } from 'react'
import { ReactComponent as Yellow } from '../assets/Pion Jaune.svg'

const PionJaune = ({ x, y, powerGo, powerReturn, handlePlay, turn }) => {
  const [posX, setPosX] = useState(x)
  const [animateSlide, setAnimateSlide] = useState(false)
  const [animateRotate, setAnimateRotate] = useState(false)
  const [currPower, setCurrPower] = useState(powerGo)
  const [distance, setDistance] = useState(0)
  const [startAtTheOtherSide, setStartAtTheOtherSide] = useState(false)
  const handleMovement = (e) => {
    e.preventDefault()
    if (turn === 'y') {
      if (currPower !== 0) {
        const newPosX = handlePlay(posX, y, currPower)
        setDistance(newPosX - posX)
        setPosX(newPosX)
      } else {
        console.log('%cPion inactif...', 'font-style: italic')
      }
    }
  }
  useEffect(() => {
    if (x === 6) {
      setStartAtTheOtherSide(true)
    }
  }, [])
  useEffect(() => {
    if (posX !== 0 || animateRotate) {
      setAnimateSlide(true)
      if (posX === 0 && animateRotate) {
        const timer = setTimeout(() => {
          setCurrPower(0)
        }, 500) // The duration of the animation defined in the CSS file
        return () => {
          clearTimeout(timer)
        }
      }
      if (posX === 6) {
        const timer = setTimeout(() => {
          setAnimateSlide(false)
          setAnimateRotate(true)
          setCurrPower(powerReturn)
        }, 400) // The duration of the animation defined in the CSS file
        return () => {
          clearTimeout(timer)
        }
      }
    }
  }, [posX])
  if (!startAtTheOtherSide) {
    return (
      <StyledDiv animateSlide={animateSlide} animateRotate={animateRotate} curr={posX} step={distance} onClick={(e) => handleMovement(e)}>
        <Yellow />
      </StyledDiv>
    )
  } else {
    return (
      <StyledDivReversed animateSlide={animateSlide} curr={posX} step={distance} onClick={(e) => handleMovement(e)}>
        <Yellow />
      </StyledDivReversed>
    )
  }
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
  animation: ${({ animateSlide, curr, step }) => (animateSlide ? slideGo(curr * 94 - step * 94, curr * 94) : '')} 0.3s ease-in-out forwards, 
  ${({ animateSlide, animateRotate }) => (animateRotate && !animateSlide ? rotate : '')} 0.3s ease-in-out forwards,
  ${({ animateSlide, animateRotate, curr, step }) => (animateRotate && animateSlide ? slideReturn(curr * 94 - step * 94, curr * 94) : '')} 0.3s ease-in-out forwards;
`
const StyledDivReversed = styled(StyledDiv)`
  transform: translateY(calc(6*94px)) rotate(180deg);
  animation: ${({ animateSlide, curr, step }) => (animateSlide ? slideReturn(curr * 94 - step * 94, curr * 94) : '')} 0.3s ease-in-out forwards;
`
export default PionJaune
