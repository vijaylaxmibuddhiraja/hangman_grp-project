import React, { useState} from "react";

const PlayerName = ({ onSubmitName }) => {
    const [playerName, setPlayerName] = useState('');

    const handleInputChange = (event) => {
        setPlayerName(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmitName(playerName);
        setPlayerName('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={playerName} onChange={handleInputChange} placeholder="Enter your name"/>
            <button type="submit">Start Game</button>       
        </form>
    );
};

export default PlayerName;
