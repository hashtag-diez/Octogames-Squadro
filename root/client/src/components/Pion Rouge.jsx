import React, { useState } from 'react'
import { ReactComponent as Red } from '../assets/Pion Rouge.svg'

import '../style/Pion.css'
const PionRouge = ({ x, y, powerGo, powerReturn, handlePlay }) => {
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
    } else {
      console.log('%cPion inactif...', 'font-style: italic')
    }
  }
  return (
    <>
      <Red id='redpiece' onClick={(e) => handleMovement(e)} />
    </>
  )
}

export default PionRouge
