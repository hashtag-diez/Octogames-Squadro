import React from 'react'
import styled from 'styled-components'
import { ReactComponent as Rule } from '../../assets/Regles.svg'
import { ReactComponent as Medal } from '../../assets/Medaille.svg'
import { ReactComponent as Arrow } from '../../assets/Fleche.svg'
import { ReactComponent as Return } from '../../assets/Retour.svg'
import { ReactComponent as Danger } from '../../assets/Danger.svg'
const Rules = () => {
  return (
    <>
      <List>
        <HeaderList>
          <Rule />
          <h2>Règles</h2>
        </HeaderList>
        <ElementList>
          <Medal />
          <p>Le premier à faire un aller-retour avec 4 de ses 5 pièces sur le plateau a gagné</p>
        </ElementList>
        <ElementList>
          <Arrow />
          <p>Les pions avancent selon la force indiquée sur leur zone de départ</p>
        </ElementList>
        <ElementList>
          <Return />
          <p>Une fois de l’autre côté, les pions se retournent et avancent selon la force indiquée sur cette zone</p>
        </ElementList>
        <ElementList>
          <Danger />
          <p>Si un pion est traversé par un pion adverse,  il retourne dans sa base</p>
        </ElementList>
      </List>
    </>
  )
}
const List = styled.div`
  max-width: 75%;
`
const HeaderList = styled.div`
  display: flex;
  flex-direction: row;
  width: auto;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: #8F92A3;
  font-size: 16px;
  h2{
    margin: 15px 0px;
  }
  svg{
    width: auto !important;
    height: 30px !important;
  }
`
const ElementList = styled.div`
  display: flex;
  width : 100%;
  flex-direction: row;
  color: #8F92A3;
  line-height: 150%;
  font-weight: 600;
  align-items: flex-start;
  font-size: 16px;
  gap: 15px;
  margin : 10px 0px;
  svg { //653
      max-width: 30px !important;
      height: 40px !important;
  } 
  p{
    margin: 0;
  }
`
export default Rules
