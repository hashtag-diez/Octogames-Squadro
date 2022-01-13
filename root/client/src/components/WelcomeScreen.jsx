import React, { useEffect, useState } from 'react'


export default function WelcomeScreen({ player, setPlayer, socket ,room, setRoom }) {
    const [name, setName] = useState(player.name);
    const [error, setError] = useState();
    const [roomText, setRoomText] = useState("");
    const [createRoom, setCreateRoom] = useState(false);
    const [joinRoom, setJoinRoom] = useState(false);

    //set le nom d'utilisateur 
    const handleFormUsername = (e) => {
        e.preventDefault();
        setPlayer({ ...player,  name: name})
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
            socket.on('sendRoomId', (data)=>{
                setRoom(data)
            })
        }
    }, [createRoom])

    return (
            <div className="info-pannel">
                    <h2 style={{letterSpacing : "1px", padding: "8px 0px"}}>Bienvenue !</h2>
                    <hr />
                    {player.name ? 
                    //Nom d'utilisateur renseigné + option "créer une partie" choisi
                        createRoom ?
                            (
                                <div className="create-room">
                                    Code d'accès : 
                                    <br/>
                                    {room}
                                    <br/>
                                    <span> Partages ce code avec tes amis ! </span>
                                    <br/>
                                    <span> En attente de joueur..</span>
                                    <button onClick={()=>{socket.emit("exitRoom"); setRoom(); setJoinRoom(false); setCreateRoom(false)}}>Exit</button>
                                </div>   
                            ):
                            joinRoom ?
                            //Nom d'utilisateur renseigné + option "rejoindre une partie" choisi
                                (
                                    <form className="join-room" onSubmit={handleFormID}>
                                        Entrez le code :
                                        <br />
                                            <input type="text" name="id" id="id" autoComplete="off" 
                                                autoFocus="true"
                                                pattern="[0-9]{6}"
                                                title="Le code doit contenir 6 chiffres"
                                                value={roomText} onChange={(e)=>setRoomText(e.target.value)}/>
                                        <br/>
                                        <i style={{color :"#dd3300", fontSize: "15px"}}>{error}</i>
                                        <br />
                                        <button type="submit">Rejoindre</button>

                                        <button onClick={()=>{setRoom(); setJoinRoom(false); setCreateRoom(false); setRoomText(); setError("")}}>Retour</button>
                                    </form>
                                ):
                                
                                // Cas ou seul le pseudo est renseigné
                                (<div className="join-create-menu">
                                    Choisis ton mode de jeu :
                                    <br />
                                    <button onClick={() => setCreateRoom(true)}>Crée ta partie !</button>
                                    <button onClick={() => setJoinRoom(true)}>Rejoins un ami !</button>
                                </div>)
                    :
                    // Pas encore de nom d'utilisateur, demandez de rentrer un pseudo avant de continuer
                    <form className="players-name" onSubmit={handleFormUsername} >
                            Enter Your name
                            <br />
                            <input type="text" name="name" id="name" autoComplete="off" autoFocus="true"
                                pattern="[A-Za-z ]{4,}"
                                title="Le nom d'utilisateur doit contenir au moins 4 lettres"
                                value={name} onChange={(e)=>setName(e.target.value)}/>
                            <br />
                            <button type="submit">Submit</button>
                    </form>
                    }
            </div>
    )
}