import React, { useState } from 'react';
import Header from './Header';
import PlayerName from './PlayerName';
import GamePopup from './GamePopup';


const HangmanFx = () => {
    const [gameState, setGameState] = useState ('welcome');
    const [playerName, setPlayerName] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    
    const handleNameSubmit = (name) => {
        console.log('Submitted name:', name)
        setPlayerName(name);
        setShowPopup(true); // this will show the popup
    };

    const handlestartGame = () => {
        setGameState('game'); // Transition from Welcome to playerName state
        setShowPopup(false); // hide the popup
    };

    const handleShowPopup = (name) => {
        setPlayerName(name);
        setShowPopup(true);
    };

    return (
       <div className="Hangman">
        <Header />
          {gameState === 'welcome' && (
            <PlayerName onSubmitName={handleShowPopup} />
          )}
          {showPopup && <GamePopup playerName={playerName} onStartGame={handlestartGame} />}   
             {gameState === 'game' && (
                <PlayerName onSubmitName={handleNameSubmit} />
               //<button onClick={startGame}>Enter name</button>
            )}
            
           </div> 
      
    );
};
 

export default HangmanFx;


