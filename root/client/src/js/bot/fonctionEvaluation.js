import PARAMETRES from '../../json/evaluation.json'

//retourne la valeur d'un coup
export default function Evaluation(idPion, color, listYellow, listRed, currPlateau, currPower){
    let pawn;
    if(color === "yellow"){
        pawn = listYellow.filter(pion =>  pion.id === idPion);
    }
    else{
        pawn = listRed.filter(pion =>  pion.id === idPion);
    }
    const x = pawn[0].x;
    const y = pawn[0].y;
    const aller = pawn[0].aller;
    console.log("le pouvoir : ", currPower);
    const pawnParameters = {
        id: idPion,
        AR: (currPower > 0)? 1 : 0,
        move : currPower,
        presentRisk : evalPresentRisk(x, y, color , currPower, currPlateau, listYellow, listRed),
        futureRisk : evalFutureRisk(x, y, color, currPower, currPlateau, listYellow, listRed),
        menace : evalMenace(x, y, color, currPower, currPlateau),
        staking : evalStack(x,y, color, listYellow, listRed),
        distance : (currPower > 0)? (6 - currPower)/6 : (6 + currPower)/6
    }
    //console.log(pawnParameters);
    const allerRetour = (aller === 1) ? PARAMETRES['A/R']['RETOUR'] : PARAMETRES['A/R']['ALLER'];
    const deplacement = PARAMETRES['DEPLACEMENT'][`${pawnParameters.move}`];
    const risquePresent = pawnParameters.distance * pawnParameters.presentRisk * PARAMETRES["RISQUE"]["PRESENT"];
    const risqueFutur = pawnParameters.distance * pawnParameters.futureRisk * PARAMETRES["RISQUE"]["FUTUR"];
    const menace = pawnParameters.menace * PARAMETRES.MENACE;
    const staking = pawnParameters.staking * PARAMETRES.STAKING;
    const total = allerRetour + deplacement + risquePresent + risqueFutur + menace + staking;
    if (color === "yellow"){
        return total;
    }else{
        return -total;
    }
}

function evalFutureRisk(x, y, color, currPower, currPlateau,listYellow, listRed){

    //à revoir quand la valeur de currentPower peut être récupérée pour tous les pions
    let coordonee = (color === "yellow" ? x : y); /* coordonnée variant en fonction de si on est rouge ou jaune */
    const next = (coordonee + currPower > 6 && currPower > 0 ? 6 : (coordonee + currPower < 0 && currPower < 0 ? 0 :  coordonee + currPower));
    if(color === "yellow"){
        const pionAdverse = listRed.filter(pion => pion.x === next); /* y a t-il un pion adverse sur la prochaine ligne où je me déplace ? */
        console.log(pionAdverse);

        const horsDePortee = (pionAdverse.currentPower < 0 && pionAdverse.y < y ? true : false); /* le pion adverse ne peut pas me manger */
        if(horsDePortee == false){
            return pionAdverse.currentPower; /* je risque de me faire manger si je me déplace a cette case*/
        }
        else{
            return 0; /* pas de risque d'être mangé apres m'être déplacé */
        }
    }
    else{
        const pionAdverse = listYellow.filter(pion => pion.y === next); /* y a t-il un pion adverse sur la prochaine ligne où je me déplace ? */
        console.log(pionAdverse);

        const horsDePortee = (pionAdverse.currentPower < 0 && pionAdverse.x < x ? true : false); /* le pion adverse ne peut pas me manger */
        if(horsDePortee == true){
            return pionAdverse.currentPower;
        }
        else{
            return 0; /* je risque de me faire manger si je me déplace a cette case*/
        }
    }
}

function evalPresentRisk(x, y, color, currPower, currPlateau, listYellow, listRed){
    let pionNonProteges;
    if(color === "yellow"){
        const pionAdverse = listRed.filter(pion => pion.x === x); /* y a t-il un pion adverse sur la meme ligne où je suis actuellement */
        pionNonProteges = evalMenace(pionAdverse[0].x, pionAdverse[0].y, 'red', pionAdverse[0].currentPower, currPlateau);
    }
    else{
        const pionAdverse = listYellow.filter(pion => pion.y === y); /* y a t-il un pion adverse sur la meme ligne où je suis actuellement */
        pionNonProteges = evalMenace(pionAdverse[0].y, pionAdverse[0].y, 'yellow', pionAdverse[0].currentPower, currPlateau);
    }
    if(pionNonProteges > 0){
        return 5; /* je risque de me faire manger au prochain tour il faut que je déplace le pion (+BOT -PLAYER)*/
    }else{
        return 0 ;  /* l'adversaire ne me menace pas*/
    }
}

/* on check s'il y a des pions adverses devant à une distance <= x + power || y + power (prochaine case du pion)*/
function evalMenace(x, y, color, currPower, currPlateau){
    let total = 0;
    let coordonee = (color === "yellow" ? x : y); /* coordonnée variant en fonction de si on est rouge ou jaune */
    const distance = (coordonee + currPower > 6 && currPower > 0 ? 6 : (coordonee + currPower < 0 && currPower < 0 ? 0 :  coordonee + currPower));

    for(let i = coordonee; i <= distance ; (currPower > 0 ? i++ : i--)){
        if ((color === 'yellow' && currPlateau[i][y] === 'r') || (color === 'red' && currPlateau[x][i] === 'y') ) {
            total+=1;
        }
    }
    return total;
}

function evalStack(x, y, color, listYellow, listRed){
    let compt = 0;

    if(color === "yellow"){
        listYellow.forEach(pion => {
            if(pion.x === x) compt++;
        });
    }else{
        listRed.forEach(pion => {
            if(pion.y===y) compt++;
        });
    }
    return compt;
}



