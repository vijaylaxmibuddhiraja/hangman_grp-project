import React, { useState } from 'react';
import Header from './Header';
import PlayerName from './PlayerName';
import GamePopup from './GamePopup';
import Scoreboard from './Scoreboard';

const HangmanFx = () => {
    const [gameState, setGameState] = useState ('welcome');
    const [playerName, setPlayerName] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [score, setScore] = useState(0);
    
    const handleNameSubmit = (name) => {
        console.log('Submitted name:', name)
        setPlayerName(name);
        setShowPopup(true); // this will show the popup instead of going to the game state directly
    };

    const handlestartGame = () => {
        setGameState('game'); // Transition from Welcome to playerName state
        console.log('click start game')
        setShowPopup(false); // hide the popup
    };

    const handleShowPopup = (name) => {
        setPlayerName(name);
        console.log('show Popup with name', name);
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
             )}    
             {gameState ==='game' && (
                <>
                   <Scoreboard playerName={playerName} score={score} />
                </>
             )}

              { /*<button onClick={startGame}>Enter name</button>*/}
          
        </div> 
      
    );
};
 

export default HangmanFx;


