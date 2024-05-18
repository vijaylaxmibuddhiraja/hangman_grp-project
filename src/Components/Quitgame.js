import React, {useState} from "react";

const Quit = () => {
    const [showQuitPrompt, setShowQuitPrompt] = useState(false);
    const [quitConfirmed, setQuitConfirmed] = useState(false);

    const handleQuitClick = () => {
        setShowQuitPrompt(true);
    };

    const handleYesClick = () => {
        setQuitConfirmed(true);
    };

    const handleNoClick = () => {
        setShowQuitPrompt(false);
    };

    if (quitConfirmed) {
        return <div>Game has ended. Thanks for playing!!! Have a nice day Mate.</div>;
    }

    return (
        <div className="quit">
            {/*<button onClick={handleQuitClick}>Quit</button>*/}

            {showQuitPrompt && (
               <div className="modal">
               <div className="modal-content">
                        <p>Are you sure you want to quit?</p>
                        <button onClick={handleYesClick}>Yes</button>
                        <button onClick={handleNoClick}>No</button>
                </div>
                </div>
            )}
        </div>
    );
}
 
export default Quit;