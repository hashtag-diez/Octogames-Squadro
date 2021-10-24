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
        <PionRouge order={1} />
        <PionRouge order={2} />
        <PionRouge order={3} />
        <PionRouge order={4} />
        <PionRouge order={5} />
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
