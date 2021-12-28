import Evaluation from './fonctionEvaluation.js'

function clone(currentBoard) {
    return undefined;
}

let TreeNode = class TreeNode {
    /*const isMaxPlayer;  /!* boolean *!/
    const idPawn;
    var x , y;           /!* int ->pour déplacer le pion*!/
    const score;        /!* int -> min ou max des children en fonction du joueur ou sinon eval si c'est une feuille *!/
    var newBoard;       /!* Board *!/
    var children;       /!* List<Node> *!/*/
    constructor(isMaxPlayer, currentBoard, idPawn,  x, y, currentPower) {
        this.isMaxPlayer = isMaxPlayer;
        this.newBoard = clone(currentBoard)
        this.idPawn = idPawn;
        this.x = x;
        this.y = y;
        this.currentPower = currentPower;
        this.children = [];
        this.score = 0;
    }
}

function createTree(listYellow, listRed, depth){
//    creer tous les noeuds à partir des pions jusqu'a une certaine profondeur
//    return la racine de l'arbre
}

export default function MinMax(node, depth, maximizingPlayer, listYellow, listRed){
    // listYellow, listRed, currPlateau
    let value;

    if (depth == 0 || node.children.isEmpty()){
        return Evaluation(node.idPawn, listYellow, listRed,node.newBoard, node.currentPower);
    }
    const children = node.children;

    if (maximizingPlayer){
        value = -Infinity;
        children.forEach(child =>{
            value = Math.max(value,MinMax(node, depth-1, true, listYellow, listRed));
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
