import './css/hangman.css'

import { randomWord } from './Word';
import { useState } from 'react';
import img0 from './images/img0.png'
import img1 from './images/img1.png'
import img2 from './images/img2.png'
import img3 from './images/img3.png'
import img4 from './images/img4.png'
import img5 from './images/img5.png'
import img6 from './images/img6.png'

const HangmanFxA = () => {
  const { maxWrong, images } = HangmanFxA.defaultProps;
  const [nWrong, setNWrong] = useState(0)
  const [guessed, setGuessed] = useState(new Set())
  const [group, setGroup] = useState('Technology')
  const [answer, setAnswer] = useState(randomWord())

  const guessedWord =()=>{
    return this.answer.split('').map(ltr => (guessed.has(ltr) ? ltr : "_"))
  }
 
 const handleGuess =(e)=>{
  let ltr = e.target.value
  const updatedSet = new Set([...guessed, ltr])
  setGuessed(updatedSet)
  setNWrong(nWrong + (answer.includes(ltr) ? 0 : 1))
 }
  const generateButtons =()=>{
    return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
      <button key={ltr}
      value={ltr}
      onClick={handleGuess}
      disabled={guessed.has(ltr)}>
      

        {ltr}</button>
    ))
  }
  let alt = '${nWrong}/${maxWrong} guesses';
  let isWinner = this.guessedWord().join("") === answer
    // in case we pick the right letter we win the game
    let gameOver = nWrong >= maxWrong
    // in case we make more guesses that maxWrong=6 we lose the game  
    let gameState = this.generateButtons()
    if (isWinner) gameState = 'You Won!'
    if (gameOver) gameState = 'You Lost!'
  return (

    <div className="Hangman">
      <h1 className="Hangman-title">Welcome to the Hangman Game.</h1>
      <h2> Category: </h2>
      <div className="Hangman-flex">
        <div className="Hangman-counter">
          <img src={images[nWrong]} alt={alt} />
          {/* if a problem with images show this message */}
          <p>Wrong Guesses: </p>
        </div>
        <div>
          <p className="Hangman-word">{guessedWord()}
            {/* {gameOver ? answer : this.guessedWord()} */}
            </p>
          {/* This shows us the number of wrong guesses */}

          <div className="btns">{generateButtons()}</div>
        </div>

        <div className="Hangman-reset">
          <button id="reset" onClick={this.reset}>Restart?</button>
          <form>
            <label htmlFor="group">Guess About: </label>
            <select name="group" id="group" >
              <option value="Technology" >Technology</option>
              <option value="Jobs">Jobs</option>
              <option value="Brands">Brands</option>
            </select>
          </form>

        </div>
       </div>
     </div>
  )

}
HangmanFxA.defaultProps = {
  maxWrong: 6,
  images: [img0, img1, img2, img3, img4, img5, img6]
}

export default HangmanFxA
