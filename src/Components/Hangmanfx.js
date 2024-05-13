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
    const [group, setGroup] = useState('Technology');
    const [answer, setAnswer] = useState(randomWord('Technology').toLowerCase()); // Default group initially set 
   
    
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

    useEffect(() => {
        if (nWrong >= maxWrong || guessedWord() === answer) {
            setIsGameOver(true);
        }
    }, [nWrong, guessedWord, answer]);

    const playAgain = useCallback(() => {
        const won = guessedWord() === answer;
        setScore(prevScore => prevScore + (won ? 1 : -1));
        setNWrong(0);
        setGuessed(new Set());
        setAnswer(randomWord(group).toLowerCase()); // Ensure we're using the current group
        setIsGameOver(false);
    }, [guessedWord, group]);

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
        setAnswer(randomWord(group).toLowerCase()); // Ensure we're using the current group
        setShowPopup(false);
        setGameStarted(false);
        setGameState('welcome');
        setIsGameOver(false);
    }, [group]);
    
    const handleChange = (e) => {
        const { value } = e.target;
        setGroup(value);
        setAnswer(randomWord(value).toLowerCase());
        setNWrong(0);
        setGuessed(new Set());
    };

    // From Abresha branch
    /*const reset = () => {
        console.log('reset the game..');
        setNWrong(0)
        setGuessed(new Set());
        setAnswer(randomWord());
        setGroup('Technology');
        setScore(0);
    }

    /*const guessedWord = () => {
        console.log('guessed word created..');
        return answer
            .split("")
            .map(ltr => (guessed.has(ltr.toLowerCase()) ? ltr : "_")); // added new //
    }*/

   /* const handleGuess = (e) => {
        console.log('handle guesses', e.target.value);
        let ltr = e.target.value.toLowerCase();
        if (/^[a-z]$/.test(ltr) && !guessed.has(ltr)) {
        const updatedSet = new Set([...guessed, ltr]);    
        setGuessed(updatedSet);
        setNWrong(nWrong + (answer.toLowerCase().includes(ltr) ? 0 : 1)) //added //
    }*/

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

    /*const handleChange = (event) => {
        console.log('category changes to:', event.target.value);
        const { value } = event.target;
        setGroup(value)
        setAnswer(randomWord(value))
        setNWrong(0)
        setGuessed(new Set())
    }*/


    /*let alt = `${nWrong}/${maxWrong} guesses`;
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
    }*/

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
                        
                      <h1 className="Hangman-title">Hangman {group}</h1>
                      <div className="Hangman-flex">
                          <div className="Hangman-counter">
                            <  img src={images[nWrong]} alt={ `Guessed Wrong: ${nWrong} / ${maxWrong} `}/>
                            <p>Guessed Wrong: {nWrong}</p>
                          </div>
                          <div>
                            <p className="Hangman-word">{guessedWord()}</p>
                            <div className="btns-word">{generateButtons}</div>
                         </div>
                         <div className="Hangman-reset">
                            <button onClick={restartGame}>Restart Game?</button>
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
            {isGameOver && (
                <div className='popup-gameover'>
                    <p>{nWrong>= maxWrong ? 'You Won!' : 'You Lost!'}</p>
                    <button onClick={playAgain}>Play Again?</button>
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