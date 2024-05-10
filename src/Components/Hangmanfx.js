import React, { useState } from 'react';
import Welcome from "./Welcome";
import PlayerName from './PlayerName';




const HangmanFx = () => {
    
    const [playerName, setPlayerName] = useState('');
    
    const handlePlayerNameSubmit = (name) => {
        setPlayerName(name);
    }
    
    return (
       <div className="Hangman">
           <Welcome />
           {!PlayerName && <PlayerName onSubmitName={handlePlayerNameSubmit} />}
        
      
       </div>  
    );
};
 

export default HangmanFx;


