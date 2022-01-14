import Plateau from './components/Plateau'
import MultiplayerScreen from './components/MultiplayerScreen'
import io from 'socket.io-client';
import { useEffect, useState } from 'react';
function App () {

  //Constantes
  const [playerPosition, setPlayerPosition] = useState(true)
  // True -> pions jaunes || False => pions rouges
  
  const [player, setPlayer] = useState({name: ""})
  const [opponent, setOpponent] = useState({name: ""})

  const [notification, setNotification] = useState([])
  const [room, setRoom] = useState("");

  const [started, setStarted] = useState(false)
  const [socket, setSocket] = useState()


    //Fonctions 

    /*const addNotification = (notificationText) =>{
        // add the notification to the notificationList
        setNotification([...notification,  notificationText]);
    }*/

    //Use effects

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
    <div className='App'>
        {started ? 
            <Plateau 
            isNetwork
            room = {room}
            socket = {socket}
            /> :
            <MultiplayerScreen 
            player={player}
            opponent={opponent}
            setPlayer={setPlayer}
            setOpponent={setOpponent}
            socket ={socket}
            room = {room}
            setRoom = {setRoom}
          />
        }
    </div>
    )
}

export default App
