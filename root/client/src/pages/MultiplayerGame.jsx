import NetworkGame from './NetworkGame'
import MultiplayerMenu from './MultiplayerMenu'
import React, { useEffect, useState } from 'react'
import io from 'socket.io-client';

function MultiplayerGame() {
  
    const [player, setPlayer] = useState({name: ""})
    const [opponent, setOpponent] = useState({name: ""})
    const [room, setRoom] = useState("");
    const [started, setStarted] = useState(false)
    const [socket, setSocket] = useState()


    /*Use effects*/

    useEffect(() => {
        if(player.name && !socket){
            setSocket(
                io(window.location.origin, { 
                    transports : ['websocket'] , 
                    query:  `name=${player.name}`
                })
            );
        }
    }, [player])
     
 
    useEffect(() => {
        if(socket){
            socket.on("opponentLeft", ()=>{
                //addNotification("Le joueur a quitté la partie.")
            })

            // set le nom du joueur adverse
            socket.on("readyToPlay", (roomObj)=>{
            setOpponent({...opponent, name: roomObj.opponent})
            })
      
            socket.on("startToPlay", ()=>{
                setStarted(true);
            })
        }
    }, [socket])

  return (
    <div className='Multiplayer'>
        {started ? 
            <NetworkGame /> :
            <MultiplayerMenu 
                player={player}
                setPlayer={setPlayer}
                socket ={socket}
                room = {room}
                setRoom = {setRoom}
            />
        }
    </div>
    )

}

export default MultiplayerGame