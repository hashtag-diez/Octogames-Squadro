import React, { useState } from 'react'
import { ReactComponent as Red } from '../assets/Pion Rouge.svg'

import '../style/Pion.css'
const PionRouge = ({ x, y, power, handlePlay }) => {
  const [posY, setPosY] = useState(y)
  const handleMovement = () => {
    setPosY(handlePlay(x, posY, power))
  }
  return (
    <>
      <Red id='redpiece' onClick={() => handleMovement()} />
    </>
  )
}

export default PionRouge
