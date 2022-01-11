/* Express - START */
const express = require('express');
const socket = require('socket.io');
const path = require('path');
const http = require('http');
const PORT = process.env.PORT || 5000
const app = express();
const server = http.createServer(app);
const io = socket(server, {cors: {origin: "*", methods: ["GET", "POST"]}});


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
var roomIdLength = 4;

//Creation de l'id d'une salle + vérification de son unicité
const createID = () => {
	do {
		var i = 0;
		var roomId = 0;
		while (i < roomIdLength) {
			roomId = (roomId*10) + Math.random()%10 ;
			i++;
		}
	} while (checkIfIdExists(roomId));
	return roomId.toString();
}

const checkIfIdExists = (roomId) => {
    activeRooms.forEach(Aroom => {
        if(Aroom.id == roomId){
            return true;
        }
    })
    return false;
}

//Cree une salle

const createRoom = (socket, room) => {
    var roomObj = { 
        id:room, //createID();
        members: [socket]
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
                                yourPosition: true //Pions Rouges
                            })

                // Joueur 2
                Aroom.members[1].emit("readyToPlay", {
                                    opponent: Aroom.members[0].username,
                                    yourPosition: false //Pions Jaunes
                                })

                setTimeout(()=>{
                    if(Aroom.members.length == 2 ){
                        socket.to(Aroom.id).emit("startToPlay")
                        Aroom.members[1].emit("startToPlay")
                    }
                    }, 5000)
            }
        }
    })
    if(!roomFound){
        roomObj = createRoom(socket, room);
        roomFound = true;
    }
    return roomFound;
}



io.on('connection', (socket) => {
    var newConnexion = socket.handshake.query.token;
    socket.username = newConnexion;
    console.log("${newConnexion} joined");

    //Si pas de salle -> retourne l'id de la salle + add le joueur
    socket.on("getRoomId",()=>{
        var roomId = createID();
        joinRoom(socket, roomId);
        socket.emit("sendRoomId", roomId);
    })

    // Si <2 joueurs dans la salle mais que la salle existe
    socket.on("tryToJoin", (roomId)=>{
        if(checkRoomExist(roomId)){
            if(joinRoom(socket, roomId)){
                socket.emit("resultJoiningRoom",{status: true, text: "Bienvenue !"})
            }else{
                socket.emit("resultJoiningRoom",{status: false, text: "Partie pleine"})
            }
        }else{
            socket.emit("resultJoiningRoom",{status: false, text: "Partie inexistante"})
        }
    })

    //Mouvements des pions (à modifier)
    //Lorsqu'un pion est déplacé, son numéro est envoyé au serveur, le serveur envoit un message 
    //au client qui va déplacer ce pion
    socket.on("pionMove", (numPion, room) => {
        // console.log(numPion, room);
        socket.to(room).emit("opponentPionMove", numPion);
    })

    socket.on("disconnect",()=>{
        console.log('${socket.username} Disconnected');
    })
})

