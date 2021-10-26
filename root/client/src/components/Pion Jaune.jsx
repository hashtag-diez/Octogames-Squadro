import React, { useState } from 'react'
import { ReactComponent as Yellow } from '../assets/Pion Jaune.svg'
import '../style/Pion.css'

const PionJaune = ({ x, y, power, handlePlay }) => {
  const [posX, setPosX] = useState(x)
  const handleMovement = () => {
    setPosX(handlePlay(posX, y, power))
  }
  return (
    <>
      <Yellow id='yellowpiece' onClick={() => handleMovement()} />
    </>
  )
}

export default PionJaune
