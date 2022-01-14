import React from 'react'

function WaitingScreen() {
    return (
        <div className="">
            <div className="players-name">
                <p style={{color: "#3dffaa"}}>Joueur trouvé !</p>
                <span style={{fontSize: "15px"}}>Le jeu commence bientot...</span>
                <br />
                <br />
            </div>   
        </div>
    )
}

export default WaitingScreen