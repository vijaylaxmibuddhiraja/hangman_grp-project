import React from "react";


const Scoreboard = ({playerName, score}) => {
    return (
        <div className="scoreboard">
            <h3>{playerName}</h3>
            <div className="board-content">
                <h4>Scoreboard</h4>
                <p>{score}</p>
            </div>
        </div>
    );
};

export default Scoreboard;