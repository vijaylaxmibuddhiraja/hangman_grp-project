import React from "react";

WelcomeMessage =() => {
    return (
        <div>
            <h1>Welocme to Hangman</h1>
            <p>Guess the Hidden Word!</p>
            <WelcomeMessage />
        </div>
    );
};

export default WelcomeMessage;