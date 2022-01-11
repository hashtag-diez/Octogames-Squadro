import Evaluation from './fonctionEvaluation.js'
import Plateau from "../../components/Plateau";

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

function nextMove(listYellow, listRed, board) {
    const depth = 5

    //dans le front appeller nextMove([...yellow], [...red], [...board])

    //définir depth en fonction de la précision nécessaire
    const nodes = createTree(board, depth, listYellow, listRed)
    
    //minMax + élagage
    nodes.forEach(node => {
        MinMax(node, depth, true);
    })

    let idPion = nodes[0].idPawn
    let highScore = nodes[0].score
    for(var i = 1; i < nodes.length; i++) {
        if(nodes[i].score > highScore) {
            idPion = nodes[i].idPawn
            highScore = nodes[i].score
        }
    }
    return idPion;
}

const updateYellows = (node, x, y, power) => {
    const newYellows = [...node.yellows];
    newYellows[y - 1].x = x;
    newYellows[y - 1].currentPower = power;
    node.yellows = newYellows ;
}

const updateReds = (node, x, y, power) => {
    const newReds = [...node.reds];
    newReds[x - 1].x = x;
    newReds[x - 1].currentPower = power;
    node.reds = newReds ;
}


function handleNode(parentNode, depth){
    if(depth == 0) {
        return
    } 
    const isYellow = parentNode.pion.isYellow
    
    //simulation du mouvement
    if(isYellow) {
        movePawnYellow(parentNode)
    } else {
        movePawnRed(parentNode)
    } 
    
    //création des noeuds de la profondeur suivante
    let currentList = (isYellow) ? parentNode.reds : parentNode.yellows
    currentList.forEach(pion => {
        const p = new Pion(pion.id, pion.x, pion.y, pion.currentPower, !isYellow);
        let node = new TreeNode(false, parentNode.currentBoard, p.id, p, parentNode.reds, parentNode.yellows);
        handleNode(parentNode, depth - 1);
        parentNode.children.push(node)
    })
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

function movePawnYellow(node){
    const currentBoard = node.currentBoard;
    let deadPawns = [];

    let reds = node.reds;

    const pion = node.pion;
    const x = pion.x;
    const y = pion.y;
    const currentPower = pion.currentPower;

    let distance = (x + currentPower >= 6 ? 6 - x : (x + currentPower <= 0 ? 0 - x : currentPower));

    for(let i = x; (currentPower > 0 ? i <= y + distance : i >= y + distance);(currentPower > 0 ? i++ : i--)){
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
    const arrivee = x + distance; /* coordonnée d'arrivée */

    if(currentPower < 0 && arrivee == 0) {
        deletePawn(node, pion.id, true);
    }
    else{
        if(currentPower > 0 && arrivee == 6){ /* le pion a fait un aller */
            pion.aller = 1;
            pion.currentPower = powers[currentPower];
        }
        currentBoard[arrivee][y] = "y";
        currentBoard[x][y] = "+";   /* libération ancienne case */
        pion.x = arrivee;
        updateYellows(node, pion.x, pion.y, pion.currentPower);
    }
    /* MAJ pions mangés -> retour case départ */
    deadPawns.forEach(i =>{

        /* retrouver le pion rouge a l'aide de la coordonnée i (x) stockée dans deadPawns */
        for(let j = 0 ; j < reds.length; j++) {
            const pion = reds[j]
            if(pion.x === i && pion.y === y){
                const power = pion.currentPower;
                const caseDepart = (power > 0 ? 6 : 0); /* pour connaitre la bonne case départ */
                pion.y = caseDepart;
                currentBoard[pion.x][pion.y] = "r"; /* MAJ board -> retour case départ pion rouge */
            }
        }
    });
}

function createTree(board, depth, listYellow, listRed){
    const root = [];
    let listYellows = getPawns(listYellow, true);
    let listReds = getPawns(listRed, false);

    listYellow.forEach(pion => {
    const p = new Pion(pion.id, pion.x, pion.y, pion.currentPower, true);
    let node = new TreeNode(false, board, p.id, p, listReds, listYellows);
    handleNode(node, depth);
    root.push(node)
    })
    return root;
}

export default function MinMax(node, depth, maximizingPlayer){
    // listYellow, listRed, currPlateau
    const listYellow = node.yellows
    const listRed = node.reds
    let value;

    if (depth == 0 || node.children.isEmpty()){
        return Evaluation(node.idPawn, listYellow, listRed,node.currentBoard, node.currentPower);
    }
    const children = node.children;

    if (maximizingPlayer){
        value = -Infinity;
        children.forEach(child =>{
            value = Math.max(value,MinMax(node, depth-1, false, listYellow, listRed));
        })
        return value;
    }
    else{
        value = Infinity;
        children.forEach(child =>{
            value = Math.min(value,MinMax(node, depth-1, true, listYellow, listRed));
        })
        return value;
    }

}
