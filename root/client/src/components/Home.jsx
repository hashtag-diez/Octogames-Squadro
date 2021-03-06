import React, {useState} from 'react'
import {Link} from "react-router-dom"
import logo from '../assets/Logo.png'
import octogames from '../assets/Octogame.png'
import { ReactComponent as Board } from '../assets/Plateau.svg'
import { ReactComponent as Rules } from '../assets/Regles.svg'
import { ReactComponent as Medal } from '../assets/Medaille.svg'
import { ReactComponent as Arrow } from '../assets/Fleche.svg'
import { ReactComponent as Return } from '../assets/Retour.svg'
import { ReactComponent as Danger } from '../assets/Danger.svg'
import { ReactComponent as Bot } from '../assets/bot.svg'
import { ReactComponent as Duel } from '../assets/duel.svg'

import styled from 'styled-components'
import MultiplayersPopUp from "./MultiplayersPopUp";
import cross from "../assets/croix.png";
const Home = () => {
    const[trigger,setTrigger]=useState(false)
    return (
        <>
            <StyledHeader>
                <img src={logo} alt='logo' />
            </StyledHeader>
            <StyledMain>
                <Board />
                <aside>
                    <h1 >Le <StyledSpan yellow>meilleur</StyledSpan> <br /> endroit pour jouer. <br /> Tout <StyledSpan yellow={false}>simplement</StyledSpan>.</h1>
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
                    <Link to="/sologame"><Button color='#E02016'>  <br /> <Bot /> Jouer contre <br /> l'ordinateur  <br /> </Button></Link>
                    <Link to="/local_multiplayerGame"><Button color='#DAA25D'> <Duel /> Jouer contre <br /> un adversaire  <br /> en local</Button></Link>
                    <Button color='#DEB887' onClick={()=>setTrigger(true)}> <Duel /> Jouer contre <br /> un adversaire <br /> à distance</Button>
                    <MultiplayersPopUp trigger={trigger} setTrigger={setTrigger}></MultiplayersPopUp>
                </aside>
            </StyledMain>
            <StyledFooter>
               <Styledimg><Link to="/AboutUs"><img src={octogames} alt="About us"/></Link></Styledimg>
            </StyledFooter>
        </>
    )
}
const StyledHeader = styled.header`
  height: 11%;
  padding-top : 20px;
  padding-left : 35px;
  img{
  width:15em
  }
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
  width: auto;
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
  }
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
    h1 {
      margin: 0;
      font-size: 42px;
      line-height: 114.5%;
      letter-spacing: 1.4px;
      font-weight: 700;
      width: auto;
      color:black
    }
  }
`
const Styledimg=styled.div`
    img{
        width:4em;
        height:4em
    }

`
export default Home
