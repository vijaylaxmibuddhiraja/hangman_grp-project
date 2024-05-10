import './css/hangman.css'
import { Component } from 'react';
import { randomWord } from './Word';
import img0 from './images/img0.png'
import img1 from './images/img1.png'
import img2 from './images/img2.png'
import img3 from './images/img3.png'
import img4 from './images/img4.png'
import img5 from './images/img5.png'
import img6 from './images/img6.png'




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


class Hangman extends Component {
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6]
  }

  state = { nWrong: 0, answer: randomWord(), guessed: new Set(), group:'Technology'}

  reset = () => {
    this.setState({
      nWrong: 0,
      guessed: new Set(),
      answer: randomWord(),
      group: 'Technology'
    })
  }

  guessedWord = () => {
    return this.state.answer.split('').map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"))
  }
  handleGuess = (e) => {
    let ltr = e.target.value
    this.setState(ps => ({
      guessed: ps.guessed.add(ltr),
      nWrong: ps.nWrong + (ps.answer.includes(ltr) ? 0 : 1)
    }))
  }
  generateButtons = () => {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
      // Split the string into letters and then we gonne add this letter to buttoms
      <button key={ltr}
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}>
        {/* This make sure that when we pick a right letter the button of that letter will be disable */}

        {ltr}
      </button>
    ))
  }
  // This is an error counter, we start with 0 Error and we will cound how many times the user select a wrong letter
  handleChange = (e) =>{
    const {value, name} = e.target
    this.setState({
      [name]:value,
      answer: randomWord(value),
      // allows us to set properties names dynamically
      nWrong: 0,
      guessed: new Set()
      //if we change the categories the game will restart- an new set will be triggert
    })
  }
  render() {
    const { maxWrong, images } = this.props
    const { nWrong, answer, group } = this.state
    // let alt = '${nWrong}/${maxWrong} guesses';
    let isWinner = this.guessedWord().join("") === answer
    // in case we pick the right letter we win the game
    let gameOver = nWrong >= maxWrong
    // in case we make more guesses that maxWrong=6 we lose the game  
    let gameState = this.generateButtons()
    if (isWinner) gameState = 'You Won!'
    if (gameOver) gameState = 'You Lost!'
    return (
      <div className="Hangman">
        <h1 className='Hangman-title'>Welcome to the Hangman Game.</h1>
        <h2> Category: {group}</h2>
        <div className="Hangman-flex">
        <div className="Hangman-counter">
        <img src={images[nWrong]} alt={"Hangman img"} />
        {/* if a problem with images show this message */}
        <p>Wrong Guesses: {nWrong}</p>
        </div>
        <div>
        <p className="Hangman-word">
          {gameOver ? answer : this.guessedWord()}</p>
        {/* This shows us the number of wrong guesses */}
        
        <div className="btns">{gameState}</div>
        </div>

        <div className="Hangman-reset">
        <button id="reset" onClick={this.reset}>Restart?</button>
          <form>
            <label htmlFor="group">Guess About: </label>
            <select name="group" id="group" onChange={this.handleChange}>
              <option value="Technology">Technology</option>
              <option value="Jobs">Jobs</option>
              <option value="Brands">Brands</option>
            </select>
          </form>

        </div>
        
       
        
       
        

      </div> </div>
    );
  }
}
export default Hangman;


