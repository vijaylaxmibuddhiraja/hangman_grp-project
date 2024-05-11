import './css/hangman.css'
import { Component, useState, useSyncExternalStore } from 'react';
import { randomWord } from './Word';
import { useState } from 'react';
import img0 from './images/img0.png'
import img1 from './images/img1.png'
import img2 from './images/img2.png'
import img3 from './images/img3.png'
import img4 from './images/img4.png'
import img5 from './images/img5.png'
import img6 from './images/img6.png'

const HangmanFx = () =>{
  const {maxWrong, images} = HangmanFx.defaultProps;
    const [nWrong, setNWrong] = useState(0)
    const [guessed, setGuessed] = useState(new Set())
    const [group, setGroup] = useState('Technology')
    const [answer,setAnswer] = useState(randomWord())
    return (
      <div> HangmanFx</div> 
    )
}
HangmanFx.defaultProps = {
  maxWrong: 6,
  images: [img0, img1, img2, img3, img4, img5, img6]
}

export default HangmanFx
