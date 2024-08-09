import React, { useEffect, useState } from "react";
import GameBoard from "./GameBoard";
import History from "./History";

export default function App(){
    
    const [gameStarted, setGameStarted] = useState(false)
    const [gameOver, setGameOver] = useState("")
    const [player, setPlayer] = useState("o")
    const [currentGameValues, setCurrentGameValues] = useState(Array(9).fill(null))
    const [historyGameValues, setHistoryGameValues] = useState([]) 
    const [visitMove, setVisitMove] = useState(-1)
    const [winPositions, setWinPositions] = useState([])
    
    function handleClick(index){
        if (gameOver || currentGameValues[index]){
            return
        }

        setGameStarted(true)
        setCurrentGameValues(prevGameValues => [...prevGameValues.slice(0, index), player, ...prevGameValues.slice(index+1, 9)])

        // setting this here to display correct player
        if (visitMove != -1){
            setHistoryGameValues(history => [...history.slice(0, visitMove+1)])
            setVisitMove(-1)
        }
    }

    useEffect(()=> {

        if (visitMove !== -1){
            setPlayer(visitMove % 2===0 ? "x": "o")
            setGameOver("")
            return
        }

        checkGameStatus(player)

        // for visiting the previous moves, no need to change the history array
        // if no move buttons are clicked
        if (visitMove === -1){
            setPlayer(prevPlayer => prevPlayer === "x" ? "o" : "x")
            setHistoryGameValues(history => [...history, currentGameValues])
        }
        

    }, [currentGameValues])

    useEffect(()=> {
        if (visitMove !== -1){
            let val = visitMove % 2===0 ? "o": "x"
            checkGameStatus(val)
        }
    }, [visitMove])

    function checkGameStatus(val){
        
        const winningPlaces = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]
        setWinPositions([])
        winningPlaces.forEach(place => {
            const [a, b, c] = place
            if (currentGameValues[a] === val && 
                currentGameValues[a] === currentGameValues[b] && 
                currentGameValues[a] === currentGameValues[c]){
                    setGameOver(val)
                    setWinPositions([a, b, c])
            }
        })

    }

    const gameBoardElements = currentGameValues.map((value, index) => {
        return (
            <GameBoard key={index} value={value} 
            index={index}
            winningPositions={winPositions}
            handleClick={() => handleClick(index)}/>
        )
    })
    
    function goToMove(moveNo){
        setVisitMove(moveNo)
        setCurrentGameValues(historyGameValues[moveNo])
    }
    
    const historyMoveElements = historyGameValues.map((history, index) => {
        return (
            <History key={index} value={history} moveNo={index}
            goToFn={()=> goToMove(index)}
            />
        )
    })

    console.log(visitMove)
    return (
        <div className="main-container">
            <div className="main-gameboard-container">
                {
                    
                    (gameOver) ? <h1>Winner is {gameOver}</h1> : 
                    (visitMove === 9 || (historyGameValues.length === 10 && visitMove === -1)) ? 
                    <h1>Draw</h1> :
                    <h1>Next player: {player}</h1> 
                    
                }
                <div className="main-gameboard">
                    {gameBoardElements}
                </div>
            </div>
            <div className="main-history-container">
                {historyMoveElements}
            </div>
        </div>
    )
}