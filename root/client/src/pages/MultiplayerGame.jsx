import OnlineGame from './OnlineGame'
import MultiplayerMenu from './MultiplayerMenu'
import React, { useEffect, useState } from 'react'
import socketIOClient from 'socket.io-client'
const ENDPOINT = 'http://localhost:5000'

function MultiplayerGame() {
  
    const [player, setPlayer] = useState({name: "", sprite: ""})
    const [host, setHost] = useState({name: "", sprite: ""})
    const [guest, setGuest] = useState({name: "", sprite: ""})
    const [room, setRoom] = useState("");
    const [started, setStarted] = useState(false)
    const [socket, setSocket] = useState()


    /*Use effects*/

    useEffect(() => {
        if(player.name && !socket){
            setSocket(
                socketIOClient(ENDPOINT,
                {
                    query: {
                        token: player.name,
                        sprite: player.sprite
                    }
                })
            );
            console.log("On a ouvert le socket !")
        }
    }, [player])
     
 
    useEffect(() => {
        if(socket){
            socket.on("opponentLeft", ()=>{
                //addNotification("Le joueur a quitté la partie.")
            })

            // set le nom du joueur adverse
            socket.on("readyToPlayGuest", (roomObj)=>{
                console.log("On est arrivé chez l'hôte !", roomObj.opponent.name, ", ", roomObj.opponent.sprite )
                setHost({ name : roomObj.opponent.name, sprite : roomObj.opponent.sprite })
                setGuest(player)
            })
            socket.on("readyToPlayHost", (roomObj)=> {
                console.log("On a reçu a un invité ! ", roomObj.opponent.name, ", ", roomObj.opponent.sprite)
                setHost(player)
                setGuest({ name : roomObj.opponent.name, sprite : roomObj.opponent.sprite })
            })
      
            socket.on("startToPlay", ()=>{
                setStarted(true);
            })
        }
    }, [socket])

  return (
    <div className='App'>
        {started ? 
            <OnlineGame 
                player={player}
                socket={socket}
                room={room}
                host={host}
                guest={guest}
                /> :
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