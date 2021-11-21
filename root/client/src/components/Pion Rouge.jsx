import styled, { keyframes } from 'styled-components'
import React, { useState, useEffect } from 'react'
import { ReactComponent as Red } from '../assets/Pion Rouge.svg'
import {ReactComponent as NormalHover} from "../assets/Hover Normal Rouge.svg";
import {ReactComponent as HitHover} from "../assets/Hover Hit Rouge.svg";

const PionRouge = ({ x, y, powerGo, powerReturn, handlePlay, turn , isAgainstBot}) => {
  const [posY, setPosY] = useState(y)
  const [animateSlide, setAnimateSlide] = useState(false)
  const [animateRotate, setAnimateRotate] = useState(false)
  const [currPower, setCurrPower] = useState((y === 6 ? powerReturn : powerGo))
  const [distance, setDistance] = useState(0)
  const [startAtTheOtherSide, setStartAtTheOtherSide] = useState(false)
  const [hover, setHover] = useState(false)
  //const [hoverDiv, setHoverDiv] = useState(hoverlist(x,posY,currPower)) // 0 : rien, 1 : normal, 2 : colission
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
  const getCurrentPower = () => {
    return currPower
  }
  useEffect(() => {
    if (y === 6) {
      setStartAtTheOtherSide(true)
    }
  }, [])
  useEffect(() => {
    if (posY !== 0 || animateRotate) {
      setAnimateSlide(true)
      if (posY === 0 && animateRotate) {
        const timer = setTimeout(() => {
          setCurrPower(0)
        }, 500) // The duration of the animation defined in the CSS file
        return () => {
          clearTimeout(timer)
        }
      }
      if (posY === 6) {
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
  }, [posY])
  if (!startAtTheOtherSide) {
    return (
      <>
        <StyledRed turn={turn} animateSlide={animateSlide} animateRotate={animateRotate} curr={posY} step={distance} onClick={(e) => handleMovement(e)} />
      </>
    )
  } else {
    return (
      <>
        <StyledRedReversed turn={turn} animateSlide={animateSlide} curr={posY} step={distance} onClick={(e) => handleMovement(e)} />
      </>
    )
  }
}
const spawn = (direction) =>
    keyframes`
    0%{
      opacity : 0;
      transform: ${(direction === 'back' ? 'translateX(calc(564px)) rotate(180deg)' : 'translateX(calc(0*94px)) rotate(0deg)')}
    }
    100%{
      opacity : 100;
      transform: ${(direction === 'back' ? 'translateX(calc(564px)) rotate(180deg)' : 'translateX(calc(0*94px)) rotate(0deg)')}
    }
  `
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
  filter: ${({ turn }) => (turn === 'y' ? 'grayscale(100%)' : '')};
  animation: ${spawn('go')} 0.5s ease-in-out forwards, ${({ animateSlide, curr, step }) => (animateSlide && step !== 0 ? slideGo(curr * 94 - step * 94, curr * 94) : '')} 0.3s ease-in-out forwards, 
  ${({ animateSlide, animateRotate }) => (animateRotate && !animateSlide ? rotate : '')} 0.3s ease-in-out forwards,
  ${({ animateSlide, animateRotate, curr, step }) => (animateRotate && animateSlide ? slideReturn(curr * 94 - step * 94, curr * 94) : '')} 0.3s ease-in-out forwards;
`
const StyledRedReversed = styled(StyledRed)`
  animation:  ${spawn('back')} 1.5s ease-in-out forwards, ${({ animateSlide, curr, step }) => (animateSlide && step !== 0 ? slideReturn(curr * 94 - step * 94, curr * 94) : '')} 0.3s ease-in-out forwards;
`
const PawnWrapper = styled.div`
  position: relative;
`

const HoverDivNormal = styled(NormalHover)`
  position: absolute;
  top: ${({ i }) => `calc(${i}*94px)`};
  left: -3px;
`
const HoverDivHit = styled(HitHover)`
   position: absolute;
  top: ${({ i }) => `calc(${i}*94px)`};
  left: -3px;
`

export default PionRouge
