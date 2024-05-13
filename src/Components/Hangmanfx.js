import React, { useState } from 'react';
import Header from './Header';
import PlayerName from './PlayerName';
import GamePopup from './GamePopup';
import Scoreboard from './Scoreboard';
import { randomWord } from "./Word";
import img0 from './images/img0.png'
import img1 from './images/img1.png'
import img2 from './images/img2.png'
import img3 from './images/img3.png'
import img4 from './images/img4.png'
import img5 from './images/img5.png'
import img6 from './images/img6.png'


const HangmanFx = () => {
    const [gameState, setGameState] = useState('welcome');
    const [playerName, setPlayerName] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [score, setScore] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);  // to disappaer the player input field after clicking the start game button

    // Abresha's codes from here 
    const [maxWrong, images] = HangmanFx.defaultProps
    const [nWrong, setNWrong] = useState(0)
    const [guessed, setGuessed] = useState(new Set())
    const [group, setGroup] = useState('Technology')
    const [answer, setAnswer] = useState(randomWord())  // To here 

    HangmanFx.defaultProps = {
         maxWrong: 6,
         images: [img0, img1, img2, img3, img4, img5, img6]
    }     
   
    const handleNameSubmit = (name) => {
        console.log('name given:', name)
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
    
    // From Abresha branch
    const reset = () => {
        console.log('reset the game..');
        setNWrong(0)
        setGuessed(new Set());
        setAnswer(randomWord());
        setGroup('Technology');
        setScore(0);
    }

    const guessedWord = () => {
        console.log('guessed word created..');
        return answer
            .split("")
            .map(ltr => (guessed.has(ltr.toLowerCase()) ? ltr : "_")); // added new //
    }

    const handleGuess = (e) => {
        console.log('handle guesses', e.target.value);
        let ltr = e.target.value.toLowerCase();
        if (/^[a-z]$/.test(ltr) && !guessed.has(ltr)) {
        const updatedSet = new Set([...guessed, ltr]);    
        setGuessed(updatedSet);
        setNWrong(nWrong + (answer.toLowerCase().includes(ltr) ? 0 : 1)) //added //
    }

    const generateButtons = () => {
        console.log('buttons appeared');
        return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
            <button
                key={ltr}
                value={ltr}
                onClick={() => handleGuess({ target: { value: ltr} })}
                disabled={guessed.has(ltr)}>
                {ltr}
            </button>
        ));
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
    if (isWinner) {
        console.log('Congrats, You won!')
        gameStates = "Well Played, You Won!";
        setScore(score + 1);  // Score increment when game is win
    }    
    else if (gameOver) 
        console.log('You Lost');
        gameStates = "Oops, You Lost!";
    }  

    return (
        <div className="Hangman">
            <Header />
              {!gameStarted && gameState === 'welcome' && (   // Player name render only when the game isn't start
                  <PlayerName onSubmitName={handleShowPopup} />
            )}
              {showPopup && <GamePopup playerName={playerName} onStartGame={handlestartGame} />}
              {gameState === 'game' && (
                  <PlayerName onSubmitName={handleNameSubmit} /> )}
            
                  {gameState === 'game' && gameStarted && ( 
                <>
                      <Scoreboard playerName={playerName} score={score} />
                            {/* <button onClick={startGame}>Enter name</button>*/}
                        
                      <h1 className="Hangman-title">Hangman {group}</h1>
                      <div className="Hangman-flex">
                      
                          <div className="Hangman-counter">
                            <img src={images[nWrong]} alt={ `${nWrong}/${maxWrong} guesses`}/>
                            <p>Guessed Wrong: {nWrong}</p>
                          </div>
                          <div>
                            <p className="Hangman-word">
                                {gameOver ? answer : guessedWord()}
                            </p>
                            <div className="btns-word" onKeyDown={handleGuess}>{gameStates}</div>
                         </div>
                         <div className="Hangman-reset">
                            <button id='reset' value="colors" onClick={reset}>Restart?</button>
                          <form>
                            <label htmlFor="group">Guess About: </label>
                            <select name="group" id="group" value={group} onChange={handleChange}>
                                <option value="Technology" >Technology</option>
                                <option value="Jobs">Jobs</option>
                                <option value="Brands">Brands</option>
                            </select>
                          </form>
                      </div> 
                  </div>
                 </>     
            )}    
             {(isWinner || gameOver) && (
                <div className='popup-gameover'>
                    <p>{isWinner ? 'You Won!' : 'You Lost!'}</p>
                    <button onClick={() => reset()}>Play Again?</button>
                </div>
               
             )}             
       </div>
  );   
};

export default HangmanFx;


//  error occured And to be fixed
// Position for hangman category display
//to hide the player name input after entering into the game state
//Case sensitive issue- as the question started with capital letter the keyboard is not taking small letters
// To remove reset button and show it as Popup instead
//Problem in changing category- As the question changes the category changed automatically as well
// need to fix UI display through CSS 