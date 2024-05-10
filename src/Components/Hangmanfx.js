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

    const startGame = () => {
        setGameState('playerName'); // Transition from Welcome to playerName state
    };
    
    return (
       <div className="Hangman">
          {gameState === 'welcome' && (
            <>
               <WelcomeMessage/> 
             
               <button onClick={startGame}>Enter name</button>
            
            </>   
               )}
           {gameState === 'playerName' && (
                <PlayerName onSubmitName={handleNameSubmit} />
                )}
                {gameState === 'game' && (
                    <>
                        {/* Display player name*/}
                        <h1>Welcome, {playerName}!</h1>
                        <p>Let's Start</p>
                    </>
                )}
           </div> 
      
    );
};
 

export default HangmanFx;


