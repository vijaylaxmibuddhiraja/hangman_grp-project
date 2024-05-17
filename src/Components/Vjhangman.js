import React, { useState, useEffect, useCallback } from 'react';
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
    const [isGameOver, setIsGameOver] =useState(false);
    const maxWrong = 6; 
    const images = [img0, img1, img2, img3, img4, img5, img6];
    const [nWrong, setNWrong] = useState(0);
    const [guessed, setGuessed] = useState(new Set());
    const [category, setCategory] = useState('Prog and OS');
    const [answer, setAnswer] = useState(randomWord('Prog and OS').toLowerCase()); // Default group initially set 
    
    const guessedWord = useCallback(() => {
        return answer.split("").map(ltr => guessed.has(ltr.toLowerCase()) ? ltr : "_").join("");
    }, [answer, guessed]);

    const handleGuess = useCallback((ltr) => {
        if (gameState !== 'game' || isGameOver) {
            return;
        }
        ltr = ltr.toLowerCase();
        if (!guessed.has(ltr)) {
            setGuessed(new Set([...guessed, ltr]));
            if (!answer.includes(ltr)) {
                setNWrong(prevNWrong => prevNWrong + 1);
            }
        }
    }, [gameState, guessed, answer, isGameOver]);

    useEffect(() => {
        const handleKeyPress = (event) => {
            const key = event.key.toLowerCase();
            if (key === " ") {
                event.preventDefault();
            } else if ((key >= 'a' && key <= 'z') || (key >= 'A' && key <= 'Z')) {
                handleGuess(key);
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [handleGuess]);

    /*useEffect(() => {
        if (nWrong >= maxWrong || guessedWord() === answer) {
            setIsGameOver(true);
        }
    }, [nWrong, guessedWord, answer]);*/

  useEffect( () => {
       if (nWrong >= maxWrong || guessedWord() === answer) {
          if (!isGameOver) {
            const won = guessedWord() === answer;
            setScore(prevScore => prevScore + (won ? 1 : -1));  // update score before resetting game state
           setIsGameOver(true);
          }
       }
  }, [nWrong, guessedWord, answer, isGameOver]);

    const playAgain = useCallback(() => {  
        setNWrong(0);
        setGuessed(new Set());
        setAnswer(randomWord(category).toLowerCase()); // Ensure we're using the current group
        setIsGameOver(false);
    }, [category]);

    const handleShowPopup = useCallback((name) => {
        setPlayerName(name);
        setShowPopup(true);
    }, []);

    const handlestartGame = useCallback(() => {
        console.log('start game is clicked')
        setGameState('game'); // Transition from Welcome to playerName state
        setShowPopup(false); // hide the popup
        setGameStarted(true);
        setIsGameOver(false);
    }, []);

    const restartGame = useCallback(() => {
        setScore(0);
        setNWrong(0);
        setGuessed(new Set());
        setAnswer(randomWord(category).toLowerCase()); // Ensure we're using the current group
        setShowPopup(false);
        setGameStarted(false);
        setGameState('welcome');
        setIsGameOver(false);
    }, [category]);
    
    const handleChange = (e) => {
        const { value } = e.target;
        setCategory(value);
        setAnswer(randomWord(value).toLowerCase());
        setNWrong(0);
        setGuessed(new Set());
    };

    const generateButtons = () => {
        if (!gameStarted || isGameOver) {
            return null;
        }    
        console.log('buttons appeared');
        return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
            <button
                key={ltr}
                value={ltr}
                onClick={() => handleGuess(ltr)}
                disabled={guessed.has(ltr)}>
                {ltr}
            </button>
        ));
    };

    return (
        <div className="Hangman">
            <Header />
              {!gameStarted && gameState === 'welcome' && (   // Player name render only when the game isn't start
                  <PlayerName onSubmitName={handleShowPopup} />
            )}
              {showPopup && <GamePopup playerName={playerName} onStartGame={handlestartGame} />}
              {gameState === 'game' && gameStarted && !isGameOver && ( 
                <>
                      <Scoreboard playerName={playerName} score={score} />
                            {/* <button onClick={startGame}>Enter name</button>*/}
                        
                      <h2 className="Hangman-title">Hangman: {category}</h2>
                      <div className="Hangman-flex">
                          <div className="Hangman-counter">
                            <  img src={images[nWrong]} alt={ `Guessed Wrong: ${nWrong} / ${maxWrong} `}/>
                            <p>Guessed Wrong: {nWrong}</p>
                          </div>
                          <div>
                            <p className="Hangman-word">{guessedWord()}</p>
                            <div className="btn-keyboard">{generateButtons()}</div>
                         </div>
                         <div className="Hangman-reset">
                            <button onClick={restartGame}>Restart</button>
                            <form>
                               <label htmlFor="group">Guess About: </label>
                               <select name="category" id="category" value={category} onChange={handleChange}>
                                  <option value="Prog Lang and OS" >Prog Lang and OS</option>
                                  <option value="Jobs">Jobs</option>
                                  <option value="Sports">Sports</option>
                                  <option value="Brands">Brands</option>
                               </select>
                            </form>
                         </div> 
                      </div>
                </>     
            )}    
            {isGameOver && (
                <div className='popup-gameover'>
                 <p>{guessedWord() === answer ? 'Congrats! You Won' : 'Oops! You Lost'}</p>
                 <p>Score : {score}</p>
                 <div className='content-btn'>
                   <button onClick={playAgain}>{guessedWord() === answer ? 'Next Word' : 'Try Again'}</button>
                </div>   
               </div> 
            )}
                     
       </div>
  );   
};

export default HangmanFx;

// DESCRIPTION
// 1. Welcome- welcome screen with enter player name and start button
// 2. "HandleShowPopup" function will appear after entering the name and clicking the start game button
// 3. The player name input field disappear and scoreboard with the name and score appeared.
// 4. At the same time Start game will also transition the game state to game.
// 5. "handleGuess" function triggered by clicking the letters on keyboard.
//    It will check if the game is progressing by guessing the right letters.
//    The no. of wrong guesses also increases if the guessed letter is wrong.
// 6. After every guess, the game checks-
//    (win-when the guess letters are correct; Lose-when reached max. no of guess)
//    Either conditions met- GameOver starts.
// 7. Popup displayed for win or lost with Next word button that triggers playAgain function.
// 8. "Next Word" button resets the game with new random word with the chosen category. 
//     Scoreboard also updated according to win or lose game.
// 9. "restartGame" function also triggered by clicking "Restart button".    
// 10. Initial game will start by showing the game state.
// 11. The player can change the select category in the middle of game as well.
       // guessed letters and wrong guesses will also reset.



//  error occured And to be fixed

//to hide the player name input after entering into the game state(fixed)
//Case sensitive issue- as the question started with capital letter the keyboard is not taking small letters(fixed)
// To remove reset button and show it as Popup instead(to-do)restart button insertes instaed of reset w/o popup
//Problem in changing category- As the question changes the category changed automatically as well(fixed)
// need to fix UI display through CSS(fixed)