import React from 'react'
import '../style/Plateau.css'
import PionJaune from './Pion Jaune'
import PionRouge from './Pion Rouge'
import { ReactComponent as Board } from '../assets/Plateau.svg'

export const Plateau = () => {
  return (
    <div className='board-wrapper'>
      <Board />
      <div className='red-row'>
        <PionRouge />
        <PionRouge />
        <PionRouge />
        <PionRouge />
        <PionRouge />
      </div>
      <div className='yellow-row'>
        <PionJaune />
        <PionJaune />
        <PionJaune />
        <PionJaune />
        <PionJaune />
      </div>
    </div>
  )
}

export default Plateau
