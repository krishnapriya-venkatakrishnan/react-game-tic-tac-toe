import React from "react";

export default function History(props){
    
    let buttonText = ""
    const nullArray = props.value.every(item => item === null)
    if (nullArray)
        buttonText = "Go to start of the game"
    else
        buttonText = "Go to move "+ props.moveNo
    
    return (
        <div className="history-container">
            <button className="move-btn" onClick={props.goToFn}>{buttonText}</button>
        </div>
    )
}