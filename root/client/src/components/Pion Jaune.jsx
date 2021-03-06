import styled, { keyframes } from 'styled-components'
import React, { useState, useEffect } from 'react'
import { ReactComponent as Yellow } from '../assets/Pion Jaune.svg'
import { ReactComponent as NormalHover } from '../assets/Hover Normal Jaune.svg'
import { ReactComponent as HitHover } from '../assets/Hover Hit Jaune.svg'

const PionJaune = ({ x, y, powerGo, powerReturn, handlePlay, turn, hoverlist, isOnline, isAgainstBot, player, guest  }) => {
  const [posX, setPosX] = useState(x)
  const [animateSlide, setAnimateSlide] = useState(false)
  const [animateRotate, setAnimateRotate] = useState(false)
  const [currPower, setCurrPower] = useState((x === 6 ? powerReturn : powerGo))
  const [distance, setDistance] = useState(0)
  const [startAtTheOtherSide, setStartAtTheOtherSide] = useState(false)
  const [hover, setHover] = useState(false)
/*   const [hoverDiv, setHoverDiv] = useState(hoverlist(posX,y,currPower)) // 0 : rien, 1 : normal, 2 : colission, 3 : final
 */  const handleMovement = (e) => {
    e.preventDefault()
    if (isAgainstBot && !e.isTrusted) {
      if (currPower !== 0) {
        console.log('position '+x+' power '+currPower)
        const newPosX = handlePlay(e.isTrusted, posX, y, currPower)
        setDistance(newPosX - posX)
        setPosX(newPosX)
      } else {
        console.log('%cPion inactif...', 'font-style: italic')
      }
    } else if(isOnline && (player.name === guest.name || !e.isTrusted)) {
      if (currPower !== 0) {
        console.log('position '+x+' power '+currPower)
        const newPosX = handlePlay(e.isTrusted, posX, y, currPower)
        setDistance(newPosX - posX)
        setPosX(newPosX)
      } else {
        console.log('%cPion inactif...', 'font-style: italic')
      }
    } else if(!isOnline && !isAgainstBot && turn === 'y') {
      if (currPower !== 0) {
        console.log('position '+x+' power '+currPower)
        const newPosX = handlePlay(e.isTrusted, posX, y, currPower)
        setDistance(newPosX - posX)
        setPosX(newPosX)
      } else {
        console.log('%cPion inactif...', 'font-style: italic')
      }
    }
  }
  const getCurrentPower = () => {
    return currPower
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
  useEffect(()=>{
    console.log('position '+posX+' power '+currPower);
      },[posX,currPower])

  if (!startAtTheOtherSide) {
    return (
      <StyledDiv turn={turn} animateSlide={animateSlide} animateRotate={animateRotate} curr={posX} step={distance} onClick={(e) => handleMovement(e)}>
        <Yellow />
      </StyledDiv>
    )
  } else {
    return (
      <StyledDivReversed turn={turn} animateSlide={animateSlide} curr={posX} step={distance} onClick={(e) => handleMovement(e)}>
        <Yellow />
      </StyledDivReversed>
    )
  }
}
const spawn = (direction) =>
    keyframes`
    0%{
      opacity : 0;
      transform: ${(direction === 'back' ? 'translateY(calc(564px)) rotate(180deg)' : 'translateY(0px) rotate(0deg)')}
    }
    100%{
      opacity : 100;
      transform: ${(direction === 'back' ? 'translateY(calc(564px)) rotate(180deg)' : 'translateY(0) rotate(0deg)')}
    }
  `
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
const PawnWrapper = styled.div`
  position: relative;
`
const StyledDiv = styled.div`
  filter: ${({ turn }) => (turn === 'r' ? 'grayscale(100%)' : '')};
  animation: ${spawn('go')} 0.5s ease-in-out forwards, ${({ animateSlide, curr, step }) => (animateSlide && step !== 0 ? slideGo(curr * 94 - step * 94, curr * 94) : '')} 0.3s ease-in-out forwards, 
  ${({ animateSlide, animateRotate }) => (animateRotate && !animateSlide ? rotate : '')} 0.3s ease-in-out forwards,
  ${({ animateSlide, animateRotate, curr, step }) => (animateRotate && animateSlide ? slideReturn(curr * 94 - step * 94, curr * 94) : '')} 0.3s ease-in-out forwards;
`
const StyledDivReversed = styled(StyledDiv)`
  animation: ${spawn('back')} 0.5s ease-in-out forwards, ${({ animateSlide, curr, step }) => (animateSlide && step !== 0 ? slideReturn(curr * 94 - step * 94, curr * 94) : '')} 0.3s ease-in-out forwards;
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

export default PionJaune
