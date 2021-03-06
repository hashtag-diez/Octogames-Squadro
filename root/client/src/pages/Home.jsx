import React, { useState } from 'react'
import logo from '../assets/Logo.png'
import {Link} from "react-router-dom"
import { ReactComponent as Board } from '../assets/Plateau.svg'
import { ReactComponent as Bot } from '../assets/bot.svg'
import { ReactComponent as Duel } from '../assets/duel.svg'
import { ReactComponent as Local } from '../assets/local.svg'
import { ReactComponent as Network } from '../assets/wifi.svg'
import { ReactComponent as Back } from '../assets/back arrow.svg'

import Rules from '../components/static/Rules'
import { StyledMain, StyledHeader, StyledFooter, Button, StyledSpan } from '../style/commonStyle'
import styled from 'styled-components'

const Home = () => {
  const [multi, setMulti] = useState()
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
            <Rules />
            <ButtonsWrapper>
              {!multi ?
                <>
                  <StyledLink to="/bot"> <Button color='#34495e' > <Bot /> Jouer contre <br /> l'ordinateur </Button> </StyledLink>
                  <Button color='#da8012' onClick={() => setMulti(true)}> <Duel /> Jouer contre <br /> un adversaire </Button>
                </>
                :
                <>
                  <StyledLink to="/local"><Button color='#E02016' > <Local isAgainstBot={false} /> Jeu en local </Button> </StyledLink>
                  <StyledLink to="/network"> <Button color='#DAA25D' > <Network /> Jeu en réseau </Button> </StyledLink>
                  <BackButton color='#34495e9e' onClick={() => setMulti(false)}><Back /> </BackButton>
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

const ButtonsWrapper = styled.div`
  position: relative;
  overflow: visible;
`
const StyledLink = styled(Link)`
  text-decoration: none;
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



export default Home
