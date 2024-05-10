import React, { useState } from 'react';
import WelcomeMessage from './Welcome';
import PlayerName from './PlayerName';


const HangmanFx = () => {
    const [gameState, setGameState] = useState ('welcome');
    const [playerName, setPlayerName] = useState('');
    
    const handleNameSubmit = (name) => {
        setPlayerName(name);
        setGameState('game');
    };
    
    return (
       <div className="Hangman">
          {gameState === 'welcome' &&  <WelcomeMessage/> }
           {gameState === 'playerName' && (
                <PlayerName onSubmitName={handleNameSubmit} />
                )};
                {gameState === 'game' && (
                    <>
                        {/* Display player name*/}
                        <h1>Welcome, {playerName}!</h1>
                    </>
                )};
           </div> 
      
    );
};
 

export default HangmanFx;


