import React from "react";

export default function GameBoard(props){
    // console.log(props)
    let win="square"
    if (props.winningPositions.length === 3 && props.winningPositions.includes(props.index)){
        win="square win"
    }
    return (
        <div className={win}
        onClick={props.handleClick}
        >
            <h1>{props.value}</h1>
        </div>
    )
}