import React, { useState, useEffect, useCallback } from 'react';
import Header from './Header';
import PlayerName from './PlayerName';
import GamePopup from './GamePopup';
import Scoreboard from './Scoreboard';
import { randomWord } from "./Word";
import img0 from './images/img0.png';
import img1 from './images/img1.png';
import img2 from './images/img2.png';
import img3 from './images/img3.png';
import img4 from './images/img4.png';
import img5 from './images/img5.png';
import img6 from './images/img6.png';
import './index.css';

const HangmanFx = () => {
    const [gameState, setGameState] = useState('welcome');
    const [playerName, setPlayerName] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [score, setScore] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);
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

    const handleStartGame = useCallback(() => {
        setGameState('game');
        setShowPopup(false);
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

    const generateButtons = () => {
        if (!gameStarted || isGameOver) {
            return null;
        }
        return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
            <button key={ltr} value={ltr} onClick={() => handleGuess(ltr)} disabled={guessed.has(ltr)}>
                {ltr}
            </button>
        ));
    };

    return (
        <div className="Hangman">
            <Header />
            {!gameStarted && gameState === 'welcome' && (
                <PlayerName onSubmitName={handleShowPopup} />
            )}
            {showPopup && <GamePopup playerName={playerName} onStartGame={handleStartGame} />}
            {gameState === 'game' && gameStarted && !isGameOver && (
                <>
                    <Scoreboard playerName={playerName} score={score} />
                    <h1 className="Hangman-title">Hangman {group}</h1>
                    <div className="Hangman-flex">
                        <div className="Hangman-counter">
                            <img src={images[nWrong]} alt={`Guessed Wrong: ${nWrong} / ${maxWrong}`} />
                            <p>Guessed Wrong: {nWrong}</p>
                        </div>
                        <div>
                            <p className="Hangman-word">{guessedWord()}</p>
                            <div className="btns-word">{generateButtons()}</div>
                        </div>
                        <div className="Hangman-reset">
                            <button onClick={restartGame}>Restart?</button>
                            <form>
                                <label htmlFor="group">Guess About: </label>
                                <select name="group" id="group" value={group} onChange={handleChange}>
                                    <option value="Technology">Technology</option>
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
                    <p>{maxWrong >= nWrong ? 'You Lost!' : 'You Won'}</p>
                    <button onClick={playAgain}>Play Again?</button>
                </div>
            )}
        </div>
    );
};

export default HangmanFx;
