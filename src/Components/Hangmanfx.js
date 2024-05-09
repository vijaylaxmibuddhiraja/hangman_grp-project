import React, { useState } from 'react';
import WelcomeMessage from "./Welcome";
import PlayerName from './PlayerName';

import "./index.css";


const HangmanFx = () => {
    
    const [playerName, setPlayerName] = useState('');
}
return (
    <div className="Hangman">
       
        {!PlayerName && <PlayerName onSubmitName={handlePlayerNameSubmit} />}
        
      
    </div>  
);

export default HangmanFx;


