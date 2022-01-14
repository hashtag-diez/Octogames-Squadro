import PARAMETRES from '../../json/evaluation.json'

//retourne la valeur d'un coup
export default function Evaluation(node, pion, color){
    const x = pion.x;
    const y = pion.y;
    const aller = pion.currPower >= 0;
    const currPower = pion.currentPower;
    const currPlateau = node.currentBoard;
    const listYellow = node.yellows
    const listRed = node.reds
    const checkWinnerConst = checkWinner(node)
    const pawnParameters = {
        id: pion.id,
        move : currPower,
        presentRisk : evalPresentRisk(x, y, color , currPower, currPlateau, listYellow, listRed),
        futureRisk : evalFutureRisk(x, y, color, currPower, currPlateau, listYellow, listRed),
        menace : evalMenace(x, y, color, currPower, currPlateau),
        staking : evalStack(x,y, color, listYellow, listRed),
        distance : evalDistance(color === "yellow" ? x : y, currPower)
    }
    const allerRetour = (aller) ? PARAMETRES['A/R']['RETOUR'] : PARAMETRES['A/R']['ALLER'];
    const deplacement = PARAMETRES['DEPLACEMENT'][`${pawnParameters.move}`];
    const risquePresent = pawnParameters.distance * pawnParameters.presentRisk * PARAMETRES["RISQUE"]["PRESENT"];
    const risqueFutur = pawnParameters.distance * pawnParameters.futureRisk * PARAMETRES["RISQUE"]["FUTUR"];
    const menace = pawnParameters.menace * PARAMETRES.MENACE;
    const staking = pawnParameters.staking * PARAMETRES.STAKING;
    const total = allerRetour + deplacement + risquePresent + risqueFutur + menace + staking + checkWinnerConst;
    return total;
}

function checkWinner(node) {
    if(node.playerScore === 4){
        return 30;
    }
    else if(node.botScore === 4){
        return 20;
    }
    else return 0.1
}

function evalDistance(coordonee, currPower){
    const distance = (coordonee + currPower > 6 && currPower > 0 ? 6 : (coordonee + currPower < 0 && currPower < 0 ? 0 :  coordonee + currPower));
    return distance
}

function evalFutureRisk(x, y, color, currPower, currPlateau, listYellow, listRed){
    let coordonee = (color === "yellow" ? x : y); /* coordonnée variant en fonction de si on est rouge ou jaune */
    const next = evalDistance(coordonee, currPower)
    
    if(color === "yellow"){
        const pionAdverse = listRed.filter(pion => pion.x === next); /* y a t-il un pion adverse sur la prochaine ligne où je me déplace ? */
        if(pionAdverse.length > 0){
        const horsDePortee = (pionAdverse[0].currentPower < 0 && pionAdverse[0].y < y); /* le pion adverse ne peut pas me manger */

            if(horsDePortee === false){
                return pionAdverse[0].currentPower; /* je risque de me faire manger si je me déplace a cette case*/
            }
        }
    }
    else{
        const pionAdverse = listYellow.filter(pion => pion.y === next); /* y a t-il un pion adverse sur la prochaine ligne où je me déplace ? */
        if(pionAdverse.length > 0){
        const horsDePortee = (pionAdverse[0].currentPower < 0 && pionAdverse[0].x < x); /* le pion adverse ne peut pas me manger */
            if(horsDePortee){
                return pionAdverse[0].currentPower;
            }
        }
    }
    return 0.1;
}

function evalPresentRisk(x, y, color, currPower, currPlateau, listYellow, listRed){
    let pionNonProteges = 0;
    if(color === "yellow"){
        const pionAdverse = listRed.filter(pion => pion.x === x); /* y a t-il un pion adverse sur la meme ligne où je suis actuellement */
        if(pionAdverse.length > 0){
          pionNonProteges = evalMenace(pionAdverse[0].x, pionAdverse[0].y, 'red', pionAdverse[0].currentPower, currPlateau);
        }
    }
    else{
        const pionAdverse = listYellow.filter(pion => pion.y === y); /* y a t-il un pion adverse sur la meme ligne où je suis actuellement */
        if(pionAdverse.length > 0){
          pionNonProteges = evalMenace(pionAdverse[0].y, pionAdverse[0].y, 'yellow', pionAdverse[0].currentPower, currPlateau);
        }
    }
    return pionNonProteges + 0.1
}

/* on check s'il y a des pions adverses devant à une distance <= x + power || y + power (prochaine case du pion)*/
function evalMenace(x, y, color, currPower, currPlateau){
    let total = 0;
    let coordonee = (color === "yellow" ? x : y); /* coordonnée variant en fonction de si on est rouge ou jaune */

    for(let i = coordonee; i <= currPower ; (currPower > 0 ? i++ : i--)){
        if(i > 6 || i < 0) break
        if ((color === "yellow" && (currPlateau[i][y] === 'r' || currPlateau[i][y] === 'R')) || (color === "red" && (currPlateau[x][i] === 'y' || currPlateau[x][i] === 'Y')) ) {
            total+=1;
        }
    }
    return total + 0.1;
}

function evalStack(x, y, color, listYellow, listRed){
    let compt = 0;

    if(color === "yellow"){
        listYellow.forEach(pion => {
            if(pion.x === x) compt++;
        });
    }else{
        listRed.forEach(pion => {
            if(pion.y === y) compt++;
        });
    }
    return compt + 0.1;
}



