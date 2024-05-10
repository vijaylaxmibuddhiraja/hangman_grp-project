import React from "react";


const GamePopup = ({ playerName, onStartGame}) => {
    return (
        <div className="game-popup">
            <div className="popup-content">
                <h2>Welcome, {playerName}!</h2>
                <p>Let the game begin!</p>
                <button onClick={onStartGame}>Start Game</button>
            </div>
        </div>
    );
};

export default GamePopup;