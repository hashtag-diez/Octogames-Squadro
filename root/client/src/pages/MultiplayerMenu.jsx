import React, { useEffect, useState } from 'react'
import { StyledMain, StyledHeader, StyledFooter, Button, StyledSpan } from '../style/commonStyle'
import '../style/MultiplayerMenu.scss'
import Icone from '../components/Icone'


export default function MultiplayerMenu({ player, setPlayer, socket ,room, setRoom }) {
    const [error, setError] = useState();
    const [roomText, setRoomText] = useState("");
    const [createRoom, setCreateRoom] = useState(false);
    const [joinRoom, setJoinRoom] = useState(false);
    const [user, setUser] = useState({name: 'p', sprite: 'adventurer'})
    //set le nom d'utilisateur 
    const handleFormUsername = (e) => {
        e.preventDefault();
        setPlayer(user)
    }

    //Envois l'IDRoom au serveur et gère les erreurs
    const handleFormID = (e) => {
        setError("")
        e.preventDefault();
        
        socket.emit("tryToJoin", roomText);
        socket.on("resultJoiningRoom", (data)=>{
            if(!data.status){
                setError(data.text)
            }else{
                setRoom(roomText)
            }
        })
    }

    // communique avec le serveur pour créer une room et y ajouter le joueur
    useEffect(() => {
        if(createRoom){
            socket.emit("getRoomId");
            socket.on("sendRoomId", (data)=>{
                setRoom(data)
            })
        }
    }, [createRoom])

    return (
            <div className="all">
                    <hr />
                    {player.name ? 
                    //Nom d'utilisateur renseigné + option "créer une partie" choisi
                        createRoom ?
                            (
                                <div className="thing">
                                <div class="form">
                                    <div class="titre">Code d'accès :</div>
                                    <br/>
                                    <div class="code">{room}</div>
                                    <br/>
                                    <span> En attente de joueur..</span>
                                    <Button color='grey' onClick={()=>{socket.emit("exitRoom"); setRoom(); setJoinRoom(false); setCreateRoom(false)}}>   Retour </Button>
                                </div>   
                                </div>
                            ):
                            joinRoom ?
                            //Nom d'utilisateur renseigné + option "rejoindre une partie" choisi
                                (   <div className="thing">
                                    <form class="form" onSubmit={handleFormID}>
                                        <div class="titre">Code d'accès :</div>
                                        <br/>
                                            <input class="form__input" type="text" name="id" id="id" autoComplete="off" placeholder="ID de la partie"
                                                value={roomText} onChange={(e)=>setRoomText(e.target.value)}/>
                                        <br/>
                                        <i style={{color :"#dd3300", fontSize: "15px"}}>{error}</i>
                                        <br />
                                        <Button color='#DAA25D' type="submit">    Rejoindre</Button>

                                        <Button color='grey' onClick={()=>{setRoom(); setJoinRoom(false); setCreateRoom(false); setRoomText(); setError("")}}>   Retour</Button>
                                    </form>
                                    </div>  
                                ):
                                
                                // Cas ou seul le pseudo est renseigné
                                (<div class="thing">
                                    <div class="form">
                                    <div class="titre">Choisis ton mode de jeu :</div>
                                    <br />
                                    <Button color='#DAA25D' onClick={() => setCreateRoom(true)}>Crée ta partie !</Button>
                                    <Button color='#DAA25D' onClick={() => setJoinRoom(true)}>Rejoins un ami !</Button>
                                    </div>
                                </div>)
                    :
                    // Pas encore de nom d'utilisateur, demandez de rentrer un pseudo avant de continuer
                    <div class="thing">
                    <form class="form" onSubmit={handleFormUsername} >
                            <Icone editor setUser={setUser} user={user} />
                            <Button color='#DAA25D' type="submit">Submit</Button>
                    </form>
                    </div>  
                    }
            </div>
    )
}