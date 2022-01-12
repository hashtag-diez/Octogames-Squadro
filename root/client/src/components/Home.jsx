import React from 'react'
import squadro from '../assets/squadro.png'
import octogames from '../assets/Octogame.png'
import '../style/Home.css'
import {BrowserRouter as Router,Link} from "react-router-dom";



export const Home = () => {
  return (
      <>

     <div id="games">
         <Link to="/sologame"><button className="options" type="button">Jouer contre l'odinateur</button></Link>
         <Link to="/local_multiplayerGame"><button className="options" type="button">Jouer à plusieurs sur le même ordinateur</button></Link>
         <Link to="/multiplayerGame"><button className="options" type="button">Jouer à plusieurs à distance</button></Link>
     </div>
     <div id="text">

     </div>

      </>

  )
}
 export default Home