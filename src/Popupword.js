
import React from 'react'

function Popup() {
    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <button className="close-btn">close</button>
                { props.children }
            </div>
        </div>
    ) : "";
    
}

const Popup = ({status, word, reset}) => {
    if (!status)
        return null
    return <div className="popup">
        <p>You {status}!</p>
        <p> The word was {word}</p>
        <button className="pulse" onClick={reset}>
            play again
        </button>
    </div>
}
export default Popup; 