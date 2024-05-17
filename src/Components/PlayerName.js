import React, { useState } from "react";


const PlayerName = ({ onSubmitName }) => {
    const [name, setName] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Player name:', name);
        onSubmitName(name); // to call onSubmitName function with player's name
        setName('');
    };

    return (
        <div className="player-name">
            <form onSubmit={handleSubmit}>
             <input type="text" value={name} 
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Enter your name"
                />    
                <button className="submit-btn" type="submit">Start Game</button>       
            </form>
        </div>
    );

};

export default PlayerName;
