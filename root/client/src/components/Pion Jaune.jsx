import React, { useState } from 'react'
import { ReactComponent as Yellow } from '../assets/Pion Jaune.svg'
import '../style/Pion.css'

const PionJaune = ({ x, y, powerGo, powerReturn, handlePlay }) => {
  const [posX, setPosX] = useState(x)
  const [currPower, setCurrPower] = useState(powerGo)
  const handleMovement = (e) => {
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
  }
  return (
    <>
      <Yellow id='yellowpiece' onClick={(e) => handleMovement(e)} />
    </>
  )
}

export default PionJaune
