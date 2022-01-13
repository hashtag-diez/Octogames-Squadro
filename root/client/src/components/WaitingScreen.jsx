import React from 'react'

function WaitingScreen() {
    return (
        <div className="">
            <div className="players-name">
                <p style={{color: "#3dffaa"}}>Joueur trouvé !</p>
                <span style={{fontSize: "15px"}}>Le jeu commence bientot...</span>
                <br />
                <br />
                <div className={styles.loader}>
                    <div className={styles.lineLeft}></div>
                    <div className={styles.ball}></div>
                    <div className={styles.lineRight}></div>
                </div>
            </div>   
        </div>
    )
}

export default WaitingScreen