import React, { useState } from 'react'
import logo from '../assets/Logo.png'
import { ReactComponent as Board } from '../assets/Plateau.svg'
import { ReactComponent as Rules } from '../assets/Regles.svg'
import { ReactComponent as Medal } from '../assets/Medaille.svg'
import { ReactComponent as Arrow } from '../assets/Fleche.svg'
import { ReactComponent as Return } from '../assets/Retour.svg'
import { ReactComponent as Danger } from '../assets/Danger.svg'
import { ReactComponent as Bot } from '../assets/bot.svg'
import { ReactComponent as Duel } from '../assets/duel.svg'
import { ReactComponent as Local } from '../assets/local.svg'
import { ReactComponent as Network } from '../assets/wifi.svg'
import { ReactComponent as Back } from '../assets/back arrow.svg'

import styled from 'styled-components'

const Home = () => {
  const [multi, setMulti] = useState()
  const [local, setLocal] = useState()

  /* if (!multi) {
    // return(Route page BotGame)
  } else if (multi && local) {
    // return(Route page LocalGame)
  } else if (multi && !local) {
    // return(Route page NetworkGame)
  } else { */
  return (
      <>
        <StyledHeader>
          <img src={logo} alt='logo' />
        </StyledHeader>
        <StyledMain>
          <Board />
          <aside>
            <h1>Le <StyledSpan yellow>meilleur</StyledSpan> <br /> endroit pour jouer. <br /> Tout <StyledSpan yellow={false}>simplement</StyledSpan>.</h1>
            <List>
              <HeaderList>
                <Rules />
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
            <ButtonsWrapper>
              {!multi ?
                <>
                  <Button color='#34495e' onClick={() => setMulti(false)}> <Bot /> Jouer contre <br /> l'ordinateur </Button>
                  <Button color='#da8012' onClick={() => setMulti(true)}> <Duel /> Jouer contre <br /> un adversaire </Button>
                </>
                :
                <>
                  <Button color='#E02016' onClick={() => setLocal(false)}> <Local /> Jeu en local </Button>
                  <Button color='#DAA25D' onClick={() => setLocal(false)}> <Network /> Jeu en réseau </Button>
                  <BackButton color='#34495e9e' onClick={() => setMulti()}><Back /> </BackButton>
                </>
              }
            </ButtonsWrapper>
          </aside>
        </StyledMain>
        <StyledFooter>
          <p>
            Sorbonne Université © - 2021
          </p>
        </StyledFooter>
      </>
    )
  }
// }
const StyledHeader = styled.header`
  height: 11%;
  padding-top : 20px;
  padding-left : 35px;
`
const List = styled.div`
  max-width: 75%;
`
const Button = styled.button`
  display: flex;
  align-items: center;
  border-radius: 50px;
  border: none;
  color: white;
  font-family: 'Manrope', sans-serif;
  margin-top: 10px;
  font-size: 18px;
  font-weight: 700;
  width: 260px;
  height: 73px;
  line-height: 108.5%;
  letter-spacing: 2px;
  margin: 25px 0px;
  background-color: ${({ color }) => color};
  padding: 17px 40px 17px 20px;
  text-align: left;
  box-shadow: 0px 3px 20px #969696;
  gap: 15px;
  svg{
    width: 18% !important;
    min-height: 38px;
  }
`
const ButtonsWrapper = styled.div`
  position: relative;
  overflow: visible;
`
const BackButton = styled(Button)`
  position: absolute;
  bottom: -50px;
  margin-left: auto !important;
  margin-right: auto !important;
  left: 0;
  right: 0;
  svg{
    width: 10px !important;
    height: 20px !important;
  }
  width: auto;
  padding: 3px 15px;
  opacity: 0.7;
  margin: 0px 0px;
  height: auto;
`
const StyledFooter = styled.footer`
  display: flex;
  font-family: 'Manrope' sans-serif;
  font-weight: 700;
  line-height: 87.5%;
  letter-spacing: 1.5px;
  height: 8%;
  align-items: flex-end;
  padding-left: 15px;
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
const StyledSpan = styled.span`
  color: ${({ yellow }) => (yellow ? '#DAA25D' : '#E02016')};
`
const StyledMain = styled.main`
  display: flex;
  gap: 45px;
  padding-left: 180px;
  padding-right: 90px;
  height: 78%;
  svg { //653
    width: 60%;
    height: 100%;
  }
  aside { //387
    display: flex;
    flex-direction : column;
    height: 100%;
    width: 40%;
    align-items: center;
    justify-content: center;
    overflow: visible;

    h1 {
      margin: 0;
      font-size: 42px;
      line-height: 114.5%;
      letter-spacing: 1.4px;
      font-weight: 700;
      width: auto;
    }
  }
`
export default Home
