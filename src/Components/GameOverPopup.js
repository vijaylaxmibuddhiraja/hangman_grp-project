import React from "react";

const GameOverPopup = ( {isWinner, onPlayAgain, OnQuit }) => {
    const message = isWinner ? 'Congrats, You Win!' : 'Oops, You Lost';
    const playAgainMessage = isWinner ? 'Play Again?' : 'Play Again?';

    const handlePlayAgain = () => {
        console.log('Click Play Again');
        onPlayAgain();
    };

    const handleQuit = () => {
        console.log('Click quit');
        OnQuit();
    };
    
    return (
        <div className="popup-gameover">
            <div className="popup-contentgame">
                <h2>{message}</h2>
                <p>{playAgainMessage}</p>
                <div className="btn-popups">
                    <button onClick={handlePlayAgain}>Play Again</button>
                    <button onClick={handleQuit}>Quit</button>
                </div>
            </div>
        </div>
    );
};

export deafault GameOverPopup;