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
app.use(express.static('../client/build'));
//single page app -> on renvoit tout sur le static .html (sauf l'api, plus haut, dès que le build aura marché)
app.get('/*', (_, res) =>{
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
server.listen(PORT);
/*Express - END*/





var activeRooms = [];
var roomIdLength = 6;

//Creation de l'id d'une salle + vérification de son unicité
const createID = () => {
    return uuidv4().slice(0, 10)
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
        members: [socket],
    }
    activeRooms.push(roomObj)
    socket.join(room)
    return roomObj;
}

//Rejoindre une salle
const joinRoom = (socket, room) => { 
    var roomFound= false;
    var roomObj = {};

    activeRooms.map((Aroom) => {
        if(Aroom.id === room){

            // si < 2 rejoindre la partie
            if(Aroom.members.length < 2){
                Aroom.members.push(socket)
                socket.join(room);
                roomObj = Aroom;
            }
            if(roomObj && Aroom.members.length == 2){

                // Joueur 1
                socket.to(Aroom.id).emit("readyToPlay", {
                                opponent: Aroom.members[1].username,
                                yourPosition: true //Pions du joueur
                            })

                // Joueur 2
                Aroom.members[1].emit("readyToPlay", {
                                    opponent: Aroom.members[0].username,
                                    yourPosition: false //Pions de l'adversaire
                                })

                setTimeout(()=>{
                    if(Aroom.members.length == 2 ){
                        socket.to(Aroom.id).emit("startToPlay")
                        Aroom.members[1].emit("startToPlay")
                    }
                    }, 1000)
            }
        }
    })
    if(!roomFound){
        roomObj = createRoom(socket, room);
        roomFound = true;
        console.log(activeRooms);
    }
    console.log(roomFound);
    return roomFound;
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
    var newConnexion = socket.handshake.query.token;
    socket.username = newConnexion;
    console.log(`${newConnexion} joined`);

    //Si pas de salle -> retourne l'id de la salle + add le joueur
    socket.on("getRoomId",()=>{
        var roomId = createID();
        joinRoom(socket, roomId);
        socket.emit("sendRoomId", roomId);
    })

    // Si <2 joueurs dans la salle mais que la salle existe
    socket.on("tryToJoin", (roomId)=>{
        console.log(checkIfIdExists(roomId));
        console.log(roomId);
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
        socket.to(room).emit('opponentMove', { side: side, pawn: pawn });
    })

    socket.on("exitRoom", ()=>{
        exitTheRoom(socket)
    })

    socket.on("disconnect",()=>{
        console.log(`${socket.username} Disconnected'`);
    })

})