import React, { useState} from "react";

const PlayerName = ({ onSubmitName }) => {
    const [playerName, setPlayerName] = useState('');

    const handleNameChange = (event) => {
        setPlayerName(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmitName(playerName);
    };

    return (
        <>
          <h2>Enter your name</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" value={playerName} onChange={handleNameChange} placeholder="Enter your name"/>
                <button type="submit">Start Game</button>       
            </form>
        </>
    );

};

export default PlayerName;
