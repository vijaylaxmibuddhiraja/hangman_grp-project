import React, { useState } from 'react';
import Header from './Header';
import PlayerName from './PlayerName';
import GamePopup from './GamePopup';
import Scoreboard from './Scoreboard';
import img0 from './images/img0.png'
import img1 from './images/img1.png'
import img2 from './images/img2.png'
import img3 from './images/img3.png'
import img4 from './images/img4.png'
import img5 from './images/img5.png'
import img6 from './images/img6.png'
import GameOverPopup from './GameOverPopup';

import { randomWord } from "./Word";


const HangmanFx = () => {
    const [gameState, setGameState] = useState('welcome');
    const [playerName, setPlayerName] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [score] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);  // to disappaer the player input field after clicking the start game button

    // Abresha's codes from here 
    const { maxWrong, images } = HangmanFx.defaultProps
    const [nWrong, setNWrong] = useState(0)
    const [guessed, setGuessed] = useState(new Set())
    const [group, setGroup] = useState('Technology')
    const [answer, setAnswer] = useState(randomWord())  // To here 
    const [showGameOverPopup, setShowGameOverPopup] = useState(false);

   /* const handleNameSubmit = (name) => {
        console.log('Submitted name:', name)
        setPlayerName(name);
        setShowPopup(true); // this will show the popup instead of going to the game state directly
    };*/

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
    
    // From Abresha branch
    const reset = () => {
        console.log('reset the game..');
        setNWrong(0)
        setGuessed(new Set());
        setAnswer(randomWord());
        setGroup('Technology');
    }

    const guessedWord = () => {
        console.log('guessed word created..');
        return answer
            .split("")
            .map(ltr => (guessed.has(ltr.toLowerCase()) ? ltr : "_")); // added new //
    }

    const handleGuess = (event) => {
        console.log('handle guesses', event.target.value);
        let ltr = event.target.value.toLowerCase
        const updatedSet = new Set([...guessed, ltr])
        setGuessed(updatedSet)
        setNWrong(nWrong + (answer.toLowerCase().includes(ltr) ? 0 : 1)) //added //
    }

    const generateButtons = () => {
        console.log('buttons generated..');
        return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
            <button
                key={ltr}
                value={ltr}
                onClick={handleGuess}
                disabled={guessed.has(ltr)}>
                {ltr}
            </button>
        ))
    }

    const handleChange = (event) => {
        console.log('category changes to:', event.target.value);
        const { value } = event.target;
        setGroup(value)
        setAnswer(randomWord(value))
        setNWrong(0)
        setGuessed(new Set())
    }


    let alt = `${nWrong}/${maxWrong} guesses`;
    let isWinner = guessedWord().join("") === answer;
    let gameOver = nWrong >= maxWrong
    let gameStates = generateButtons();
   /*if (isWinner) {
        console.log('Congrats, You won!')
        gameStates = "Well Played, You Won!";
    }    
    if (gameOver) {
        console.log('You Lost');
        gameStates = "Oops, You Lost!";
    }  */ 
    if (isWinner || gameOver) {
        setShowGameOverPopup(true);
    }

    return (
        <div className="Hangman">
            <Header />
              {!gameStarted && gameState === 'welcome' && (   // Player name render only when the game isn't start
                  <PlayerName onSubmitName={handleShowPopup} />
            )}
              {showPopup && <GamePopup playerName={playerName} onStartGame={handlestartGame} />}
              {/*gameState === 'game' && (
                  /*<PlayerName onSubmitName={handleNameSubmit} /> */}
            
                  {gameState === 'game' && ( 
                <>
                      <Scoreboard playerName={playerName} score={score} />
                            { /*<button onClick={startGame}>Enter name</button>*/}
                      <h1 className="Hangman-title">Hangman {group}</h1>
                      <div className="Hangman-flex">
                      <div className="Hangman-reset">
                          <form>
                            <label htmlFor="group">Guess About: </label>
                            <select name="group" id="group" value={group} onChange={handleChange}>
                                <option value="Technology" >Technology</option>
                                <option value="Jobs">Jobs</option>
                                <option value="Brands">Brands</option>
                            </select>
                          </form>
                      </div> 
                    <div className="Hangman-counter">
                        <img src={images[nWrong]} alt={alt} />
                        <p>Guessed Wrong: {nWrong}</p>
                    </div>
                    <div>
                        <p className="Hangman-word">
                            {gameOver ? answer : guessedWord()}
                        </p>
                        <div className="btns-word">{gameStates}</div>
                    </div>
                </div>
                {gameOver || isWinner ? (
                   <GamePopup
                        playerName={playerName}
                        onStartGame={reset}
                        isWinner={isWinner}
                   />
                ) : null}
                {showGameOverPopup && (
                    <GameOverPopup
                        isWinner={isWinner}
                        onPlayAgain={handlePlayAgain}
                        OnQuit={handleQuit}
                    />
                )}
               </>             
            )}
        </div>
    );
};

HangmanFx.defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6]
}


export default HangmanFx;


//  error occured And to be fixed
// Position for hangman category display
//to hide the player name input after entering into the game state
//Case sensitive issue- as the question started with capital letter the keyboard is not taking small letters
// To remove reset button and show it as Popup instead
//Problem in changing category- As the question changes the category changed automatically as well
// need to fix UI display through CSS 