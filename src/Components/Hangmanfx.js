import React, { useState } from 'react';
import Header from './Header';
import PlayerName from './PlayerName';
import GamePopup from './GamePopup';
import Scoreboard from './Scoreboard';

const HangmanFx = () => {
    const [gameState, setGameState] = useState ('welcome');
    const [playerName, setPlayerName] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [score] = useState(0);
   
    const [gameStarted, setGameStarted] = useState(false);  // to disappaer the player input field after clicking the start game button


    const handleNameSubmit = (name) => {
        console.log('Submitted name:', name)
        setPlayerName(name);
        setShowPopup(true); // this will show the popup instead of going to the game state directly
    };

    const handlestartGame = () => {
        console.log('start game is clicked')
        setGameState('game'); // Transition from Welcome to playerName state
        setShowPopup(false); // hide the popup
        setGameStarted(true); 
    };

    const handleShowPopup = (name) => {
        console.log('show Popup with name', name);
        setPlayerName(name);
        setShowPopup(true);
    };

    return (
       <div className="Hangman">
        <Header />
          {!gameStarted && gameState === 'welcome' && (   // Player name render only when the game isn't start
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


