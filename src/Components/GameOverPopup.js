import React from "react";

const GameOverPopup = ({ isWinner, onPlayAgain, onQuit }) => {
    const message = isWinner ? 'Congrats, You Win!' : 'Oops, You Lost';
    const playAgainMessage = isWinner ? 'Play Again?' : 'Play Again?';

    
    return (
        <div className="popup-gameover">
            <div className="popup-contentgame">
                <h2>{message}</h2>
                <p>{playAgainMessage}</p>
                <div className="btn-popups">
                    <button onClick={onPlayAgain}>Play Again</button>
                    <button onClick={onQuit}>Quit</button>
                </div>
            </div>
        </div>
    );
};

export default GameOverPopup;