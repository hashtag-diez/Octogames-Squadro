/* Express - START */
const express = require('express');
const socket = require('socket.io');
const path = require('path');
const http = require('http');
const PORT = process.env.PORT || 5000
const app = express();
const server = http.createServer(app);
const io = socket(server, {cors: {origin: "*", methods: ["GET", "POST"]}});
const { v4: uuidv4 } = require('uuid')


//using .json files
app.use(express.json());
//On relit le back aux statics
/* app.use(express.static('../client/build'));
//single page app -> on renvoit tout sur le static .html (sauf l'api, plus haut, dès que le build aura marché)
app.get('/*', (_, res) =>{
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
}); */
server.listen(PORT);
/*Express - END*/





var activeRooms = [];
var roomIdLength = 6;

//Creation de l'id d'une salle + vérification de son unicité
const createID = () => {
    do {
        var num = uuidv4().slice(0, 10);
    } while(checkIfIdExists(num));
    return num;
}

const checkIfIdExists = (roomId) => {
    var found = false;
    console.log(activeRooms);
    activeRooms.forEach(Aroom => {
        if(Aroom.id == roomId){
            found = true;
            return found;
        }
    })
    return found;
}

//Cree une salle

const createRoom = (socket, room) => {
    var roomObj = { 
        id:room, //createID();
        members: [],
    }
    roomObj.members.push(socket)
    activeRooms.push(roomObj)
    socket.join(room)
    return roomObj;
}

//Rejoindre une salle
const joinRoom = (socket, room) => { 
    var roomFound= false;
    var roomObj = false;

    activeRooms.map((Aroom) => {
        if(Aroom.id === room){
            roomFound = true;

            // si < 2 rejoindre la partie
            if(Aroom.members.length < 2){
                Aroom.members.push(socket)
                socket.join(room);
                roomObj = Aroom;
                console.log(Aroom.members)
            }
            if(roomObj && Aroom.members.length == 2){

                // Joueur 1
                socket.to(Aroom.id).emit("readyToPlayHost", {
                                opponent: { 
                                    name: Aroom.members[1].username,
                                    sprite: Aroom.members[1].sprite
                                },
                                yourPosition: true //Pions du joueur
                            })

                // Joueur 2
                Aroom.members[1].emit("readyToPlayGuest", {
                                    opponent: { 
                                        name: Aroom.members[0].username,
                                        sprite: Aroom.members[0].sprite
                                    },
                                    yourPosition: false //Pions de l'adversaire
                                })

                setTimeout(()=>{
                    if(Aroom.members.length == 2 ){
                        socket.to(Aroom.id).emit("startToPlay")
                        Aroom.members[1].emit("startToPlay")
                    }
                    }, 500)
            }
        }
        return Aroom;
    })
    if(!roomFound){
        roomObj = createRoom(socket, room);
        //roomFound = true;
    }
    return roomObj;
}

// exitTheRoom -> Supprime la room crée lorsqu'il n'a plus de joueurs + fait quitter le joueur
//qui souhaite quitter + envois une notification lorsqu'un joeur quitte la partie
const exitTheRoom = (socket) => {

    // chercher la socket dans les rooms actives
    activeRooms.map((room)=>{
        if(room.members.includes(socket)){
            socket.leave(room.id)
            room.members = room.members.filter((member)=> member != socket);

            // notification
            //on utilise ça lorsque les deux joueurs sont en pleine partie
            if(room.members.length > 0){
                room.members[0].emit("opponentLeft")
                room.members[0].leave(room.id)
                room.members.pop()
            }
        }
        return room;
    })

    // Trier les parties sans joueurs
    activeRooms = activeRooms.filter((room)=>room.members.length > 0)
}

io.on('connection', (socket) => {
    socket.username = socket.handshake.query.token;
    socket.sprite =  socket.handshake.query.sprite;
    console.log(socket.username + ' joined');

    //Si pas de salle -> retourne l'id de la salle + add le joueur
    socket.on("getRoomId",()=>{
        var roomId = createID();
        joinRoom(socket, roomId);
        socket.emit("sendRoomId", roomId);
    })

    // Si <2 joueurs dans la salle mais que la salle existe
    socket.on("tryToJoin", (roomId)=>{
        if(checkIfIdExists(roomId)){
            if(joinRoom(socket, roomId)){
                socket.emit("resultJoiningRoom",{status: true, text: "Bienvenue !"})
            }else{
                socket.emit("resultJoiningRoom",{status: false, text: "Partie pleine"})
            }
        }else{
            socket.emit("resultJoiningRoom",{status: false, text: "Partie inexistante"})
        } //chercher ce qui se passe si les deux joueurs se connectent en meme temps 
    })

    //Mouvements des pions (à modifier)
    //Lorsqu'un pion est déplacé, son numéro est envoyé au serveur, le serveur envoit un message 
    //au client qui va déplacer ce pion
    socket.on("myMove", (side, pawn, room) => {
        console.log("Le server a reçu un messaage de "+side+" pour l'indice "+pawn)
        socket.to(room).emit('opponentMove', { side: side, pawn: pawn });
    })

    socket.on("exitRoom", ()=>{
        exitTheRoom(socket)
    })

    socket.on("disconnect",()=>{
        console.log(socket.username, ' disconnected');
    })
})