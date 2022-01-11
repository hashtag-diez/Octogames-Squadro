mport React, { useEffect, useState } from 'react'


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
            <div className="welcome-page">
                    <h2>Welcome !</h2>
                    <hr />
                    {player.name ? 
                        //Create room opt and Join room opt 
                    
                    :
                    // Rentrer le nom d'utilsateur
                    <form className="player-name" onSubmit={handleFormUsername} >
                            Enter Your name
                            <br />
                            <input type="text" name="name" id="name" autoComplete="off" autoFocus="true"
                                pattern="[A-Za-z ]{4,}"
                                title="Name should contain atleast 4 alphabets"
                                value={name} onChange={(e)=>setName(e.target.value)}/>
                            <br />
                            <button type="submit">Submit</button>
                    </form>
                    }
            </div>
    )
}