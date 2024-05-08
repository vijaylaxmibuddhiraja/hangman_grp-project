import './css/hangman.css'
import { Component } from 'react';
import { randomWord } from './Word';

// 1. A welcome message will be shown were the player can write his/her name
// 2. The player can choose the categories ( Technology, Occupation/Jobs, Sports). 
// 3. A scoreboard will be shown to track the score.
// 4. When the game starts, a picture of the Hangman is displayed, the alphabet box and the word with hidden letters.
// 5.With each wrong guess the Hangman will add a body part that shows a loosing life. As the Hangman has 6 body parts so the player has 6 opportunities to guess the word.
// 6. For each mistake we will display a funny message.
// 7. If the word is correct the player gets one point. Also we give the player the opportunity to: “Go to the next word” , “Go to another category” or “Quit the game ”.
// 8. 5 questions will be asked from each category. The user will be asked to chose another category. 
// 9. If the user guessed all right words, the player will be announced as winner and a winning message will appear
// 10. If the user misses 6 times to find the right letters the game is over and a message will displayed that you lose the game and the user can see the score
// 11. User can start a new game

// import React, { useState } from 'react';

// const WelcomeMessage = () => {
//   const [name, setName] = useState('');

//   const handleChange = (e) => {
//     setName(e.target.value);
//   };
//     return (
//          <>
//         <h1>Wecome to Hangman</h1>
//         <input type="text"
//                 placeholder="Enter your name"
//                 value={name}
//                 onChange={handleChange}
//               />
//               </>);
// };
// export default WelcomeMessage;


class Hangman extends Component {
  static defaultProps = {
    maxWrong: 6
  }

  state = { nWrong: 0, answer: randomWord(), guessed: new Set() } 

  guessedWord = () =>{
    return this.state.answer.split('').map(ltr => ltr)
  }
  handleGuess = (e)=>{
    let ltr = e.target.value
    this.setState(ps=> ({
      guessed: ps.guessed.add(ltr)
    }))
    // This make sure that when we pick a letter the button of that letter will be disable
  }
  generateButtons = () => {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
      // Split the string into letters and then we gonne add this letter to buttoms
      <button key={ltr}
      value={ltr}
      onClick={this.handleGuess}>
        {ltr}
      </button>
    ))
 }
  // This is an error counter, we start with 0 Error and we will cound how many times the user select a wrong letter
  render() { 
    const {nWrong} = this.state
    return (
      <div className="Hangman">
        <h1>Welcome to the Hangman Game</h1>
        <p>Wrong Guesses: {nWrong}</p>
        <p className="Hangman-word">{this.guessedWord()}</p>
        {/* This shows us the number of wrong guesses */}
        <div className="btns">{this.generateButtons()}</div>
      </div>
    );
  }
}
export default Hangman;
 

