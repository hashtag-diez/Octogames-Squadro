import React from 'react'
import { ReactComponent as Red } from '../assets/Pion Rouge.svg'
import '../style/Pion.css'
const PionRouge = (order) => {
  const style = { '--order': order }
  return (
    <>
      <Red id='redpiece' style={style} />
    </>
  )
}

export default PionRouge
