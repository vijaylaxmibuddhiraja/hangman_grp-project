import React, { useState } from "react";

const PlayerName = ({ onSubmitName }) => {
    const [name, setName] = useState('');

    const handleNameChange = (event) => {
        setPlayerName(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('name:, ');
        onSubmitName(name);
        setName('');
    };

    return (
        <div className="player-name">
            <form onSubmit={handleSubmit}>
             <input type="text" value={name} 
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Enter your name"
                />    
                <button type="submit">Start Game</button>       
            </form>
        </div>
    );

};

export default PlayerName;
