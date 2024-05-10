import React from "react";
import PlayerName from "./PlayerName";

const GamePopup = ({ PlayerName, onStartGame}) => {
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