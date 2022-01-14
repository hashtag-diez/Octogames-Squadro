import Evaluation from './fonctionEvaluation.js'

const powers ={
    1 : -3,
    2 : -2,
    3 : -1
}

let Pion = class Pion {
    constructor(id, x, y, currentPower, isYellow) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.currentPower = currentPower;
        this.aller = 0; /* par défaut chaque pion a fait 0 aller */
        this.isYellow = isYellow;
    }
}

let TreeNode = class TreeNode {
    constructor(isMaxPlayer, currentBoard, idPawn, pion, listRed, listYellow) {
        this.isMaxPlayer = isMaxPlayer;
        this.currentBoard = clone(currentBoard);
        this.pion = pion;
        this.reds = listRed;
        this.yellows = listYellow;
        this.idPawn = idPawn;
        this.children = [];
        this.score = 0;
        this.playerScore = 0; /* pour savoir s'il y a un gagnant */
        this.botScore = 0;
    }
}

function clone(currentBoard) {
    const newBoard = currentBoard.map(x => {
        return x.slice();
    });
    return newBoard;
}

function getPawns(list, isYellow){
    let pawns = [];
    list.forEach(pawn => {
        let newPawn = new Pion(pawn.id, pawn.x, pawn.y, pawn.currentPower, isYellow);
        pawns.push(newPawn);
    });
    return pawns;
}

function deletePawn(node, id, isYellow){
    if(isYellow){
        let newYellows = [];
        let yellows = node.yellows;
        yellows.forEach(pawn =>{
            if(pawn.id != id){
                newYellows.push(pawn);
            }
        });
        node.yellows = newYellows;
    }else{
        let newReds = [];
        let reds = node.reds;
        reds.forEach(pawn =>{
            if(pawn.id != id){
                newReds.push(pawn);
            }
        });
        node.reds = newReds;
    }

}

function checkWinner(node) {
    if(node.playerScore === 4){
        return "HUMAN";
    }
    else if(node.botScore === 4){
        return "BOT";
    }
    return null;
}

function movePawnYellow(node){

    const winner = checkWinner(node);
    if(winner!= null){
        console.log(winner, " HAS WON THE GAME !");
        return;
    }
    if(node.pion == null){
        console.log("pion est null");
        return;
    }
    const currentBoard = node.currentBoard;
    let deadPawns = [];

    let reds = node.reds;

    const pion = node.pion;
    const x = pion.x;
    const y = pion.y;
    const currentPower = pion.currentPower;
    let distance = (x + currentPower >= 6 ? 6 - x : (x + currentPower <= 0 ? 0 - x : currentPower));
    for(let i = x; (currentPower > 0 ? i < x + distance : i > x + distance);(currentPower > 0 ? i++ : i--)){
        if(i<0) break
        if(i>6) break
        /* si pion adverse présent sur ma ligne */
        if(currentBoard[i][y] === 'r'){
            if(x + distance >= 0 || x + distance <= 6){ /* pour ne pas dépasser du tableau */
                distance = (currentPower > 0 ? distance + 1 : distance - 1);
            }
            deadPawns.push(i);
            currentBoard[i][y] = "+"; /* libération de la case*/
        }
    }

    /* déplacement du pion */
    var arrivee = x + distance; /* coordonnée d'arrivée */
    if(arrivee <= 0) arrivee = 0
    if(arrivee >= 6) arrivee = 6
    if(currentPower < 0 && arrivee == 0) {
        deletePawn(node, pion.id, true);
        node.botScore++;
        return;
    }
    if(pion.currentPower > 0 && arrivee === 6){ /* le pion a fait un aller */
        pion.aller = 1;
        pion.currentPower = powers[currentPower];
    }
    currentBoard[arrivee][y] = "y";
    currentBoard[x][y] = "+";   /* libération ancienne case */
    pion.x = arrivee;

    updateYellows(node, pion.id, pion.x, pion.y, pion.currentPower, pion.aller);
    majRedDeadPawn(node, y, deadPawns)
    node.pion = pion
    node.currentBoard = currentBoard
}

function movePawnRed(node){
    const winner = checkWinner(node);
    if(winner!= null){
        console.log(winner, " HAS WON THE GAME !");
        return;
    }
    if(node.pion == null){
        console.log("pion est null");
        return;
    }
    const currentBoard = node.currentBoard;
    let deadPawns = [];

    let yellows = node.yellows;

    const pion = node.pion;
    const x = pion.x;
    const y = pion.y;
    const currentPower = pion.currentPower;
    let distance = (x + currentPower >= 6 ? 6 - x : (x + currentPower <= 0 ? 0 - x : currentPower));

    for(let i = y; (currentPower > 0 ? i < y + distance : i > y + distance);(currentPower > 0 ? i++ : i--)){
        /* si pion adverse présent sur ma ligne */
        if(currentBoard[x][i] === 'y'){
            if(x + distance >= 0 || x + distance <= 6){ /* pour ne pas dépasser du tableau */
                distance = (currentPower > 0 ? distance + 1 : distance - 1);
            }
            deadPawns.push(i);
            currentBoard[i][y] = "+"; /* libération de la case*/
        }
    }

    /* déplacement du pion */
    var arrivee = y + distance; /* coordonnée d'arrivée */
    if(arrivee <= 0) arrivee = 0
    if(arrivee >= 6) arrivee = 6

    if(currentPower < 0 && arrivee == 0) {
        deletePawn(node, pion.id, false);
        node.playerScore++;
        return;
    }
    if(pion.currentPower > 0 && arrivee === 6){ /* le pion a fait un aller */
        pion.aller = 1;
        pion.currentPower = powers[currentPower];
    }
    currentBoard[arrivee][y] = "r";
    currentBoard[x][y] = "+";   /* libération ancienne case */
    pion.y = arrivee;

    updateReds(node, pion.id, pion.x, pion.y, pion.currentPower, pion.aller);
    majYellowDeadPawn(node, x, deadPawns);
    node.pion = pion
    node.currentBoard = currentBoard
}

function majRedDeadPawn(node, y, list){
    let reds = node.reds;
    /* MAJ pions mangés -> retour case départ */
    list.forEach(i =>{

        /* retrouver le pion rouge a l'aide de la coordonnée i (x) stockée dans deadPawns */
        for(let j = 0 ; j < reds.length; j++) {
            const pion = reds[j]
            if(pion.x === i && pion.y === y){
                const power = pion.currentPower;
                const caseDepart = (power > 0 ? 6 : 0); /* pour connaitre la bonne case départ */
                pion.y = caseDepart;
                node.currentBoard[pion.x][pion.y] = "r"; /* MAJ board -> retour case départ pion rouge */
            }
        }
    });
}

function majYellowDeadPawn(node, x, list){
    let yellows = node.yellows;
    /* MAJ pions mangés -> retour case départ */
    list.forEach(i =>{

        /* retrouver le pion rouge a l'aide de la coordonnée i (x) stockée dans deadPawns */
        for(let j = 0 ; j < yellows.length; j++) {
            const pion = yellows[j]
            if(pion.x === x && pion.y === i){
                const power = pion.currentPower;
                const caseDepart = (power > 0 ? 6 : 0); /* pour connaitre la bonne case départ */
                pion.x = caseDepart;
                node.currentBoard[pion.x][pion.y] = "y"; /* MAJ board -> retour case départ pion rouge */
            }
        }
    });
}

const updateYellows = (node, id, x, y, power, aller) => {
    //let yellows = node.yellows;
    node.yellows.forEach(pawn =>{
        if(pawn.id === id){
            pawn.x = x;
            pawn.currentPower = power;
            pawn.aller = aller;
            return;
        }
    });
}

const updateReds = (node, id, x, y, power, aller) => {

    node.reds.forEach(pawn =>{
        if(pawn.id == id){
            pawn.y = y ;
            pawn.currentPower = power;
            pawn.aller = aller;
            return;
        }
    });
}

function handleNode(parentNode, depth){
    if(depth === 0) {
        return;
    }
    const isYellow = parentNode.pion.isYellow;
    if(isYellow) {
        movePawnYellow(parentNode)
    } else {
        movePawnRed(parentNode)
    }
    //création des noeuds de la profondeur suivante
    let currentList = (isYellow) ? parentNode.reds : parentNode.yellows;
    currentList.forEach(pion => {
        const p = new Pion(pion.id % 10, pion.x, pion.y, pion.currentPower, !isYellow);
        let node = new TreeNode(!parentNode.isMaxPlayer, parentNode.currentBoard, p.id, p, parentNode.reds, parentNode.yellows);
        parentNode.children.push(node);
        handleNode(node, depth - 1);
    });
}

function createTree(board, depth, listYellow, listRed){
    const root = [];

    listYellow.forEach(pion => {
        if(pion.hasArrived) {
            console.log(pion.currentPower, pion.x)
        } else {
            const p = new Pion(pion.id % 10, pion.x, pion.y, pion.currentPower, true);
            let node = new TreeNode(false, board, p.id, p, listRed, listYellow);
            handleNode(node, depth);
            root.push(node);
        }
    })
    
    return root;
}

function MinMax(node, depth, maximizingPlayer, alpha, beta){
    // listYellow, listRed, currPlateau
    let value;
    if (depth === 0 || node.children.length <= 0){
        let color = (maximizingPlayer ? "yellow" : "red");
        let evaluation = Evaluation(node, node.pion, color);
        node.score = evaluation
        return;
    }

    if (maximizingPlayer){
        value = -100000;
        const children = node.children;
        for(let i = 0; i < children.length; i++) {
            MinMax(children[i], depth-1, false, alpha, beta);
            var newValMax = children[i].score
            value = Math.max(value, newValMax);
            alpha = Math.max(alpha, newValMax);
            if(beta <= alpha) break;
        }
        node.score = value
        return value;
    }
    else{
        value = 100000;
        const children = node.children;
        for(let i = 0; i < children.length; i++) {
            MinMax(children[i], depth-1, true, alpha, beta);
            var newValMin = children[i].score
            value = Math.min(value, newValMin);
            beta = Math.min(beta, newValMin);
            if(beta <= alpha) break;
        }
        node.score = value
        return value;
    }

}

export default function nextMove(listYellow, listRed, board) {
    const depth = 6

    //dans le front appeller nextMove([...yellow], [...red], [...board])

    //définir depth en fonction de la précision nécessaire
    const nodes = createTree(board, depth, listYellow, listRed);

    //minMax + élagage
    nodes.forEach(node => {
        MinMax(node, depth, true, -100000, 100000);
    })

    let idPion = nodes[0].idPawn;
    let highScore = nodes[0].score;

    for(let i = 1; i < nodes.length; i++) {
        if(nodes[i].score > highScore) {
            idPion = nodes[i].idPawn;
            highScore = nodes[i].score;
        }
    }
    return idPion;
}
