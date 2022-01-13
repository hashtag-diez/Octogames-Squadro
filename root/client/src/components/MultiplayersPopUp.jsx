import {Link} from "react-router-dom";
import React, {useState} from "react";
import '../style/MultiplayersPopUp.css'
import cross from "../assets/croix.png";


function MultiplayersPopUp(props){
    return (props.trigger)?(
        <div className='popup'>
            <div id='popup_inner' >
                <h1 id="title">Jeu à distance</h1>
                <button type="button" id="HomeButton" onClick={()=>props.setTrigger(false)}><img src={cross} alt="Go Home"/></button>
                <div id='create' >
                    <h2>Créer une partie</h2>
                    Vous pouvez jouer avec un(e) ami(e) à distance.<br />
                    En cliquant sur le bouton, vous aurez un lien d'invitation.<br />
                    <Link to='/multiplayerGame'><button>Je crée une partie</button></Link>
                    {props.children}
                </div>
                <div id='join' >
                    <h2>Rejoindre une partie</h2>
                    Votre amie vous invite à jouer une partie ?<br />
                    Saisissez le lien qui vous a envoyé .<br />
                    <input type="text" name="name" /><br />
                    <Link to="/"><button onClick={()=>props.setTrigger(false)}>Je rejoins une partie</button></Link>
                    {props.children}
                </div>
                </div>
        </div>
    ):"";
}

export default MultiplayersPopUp

