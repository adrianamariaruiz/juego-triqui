import { useState } from 'react'
import './App.css'
import confetti from 'canvas-confetti'
import { Square } from './components/Square'
import { TURN } from './constants.js'
import { checkWinner, endGame } from './utils/board'
import WinnerModal from './components/WinnerModal'

function App() {

  const [board, setBoard] = useState( () => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  })

  const [turn, setTurn] = useState( () => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ??  TURN.x
  })
  
  // null es que nadie gana, true el ganador y false es empate
  const [winner, setWinner] = useState(null)

  const updateBoard = (index) => {
    // para que no deje sobreescribir en la misma posicion que ya tiene contenido
    if(board[index] || winner) return

    // hago una copia del board para no mutar las props ni es estado
    // actualiza el tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    // para cambiar el turno
    const newTurn = turn === TURN.x ? TURN.o : TURN.x
    setTurn(newTurn)
    // para guardar la partida
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)

    // revisar si hay un ganador
    const newWinner = checkWinner(newBoard)
    if(newWinner){
      confetti()
      setWinner(newWinner)
    } else if(endGame(newBoard)){
      setWinner(false) //empate
    }
  }  

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURN.x)
    setWinner(null)

    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }

  return (
    <main className="board">
      <h1>Triqui</h1>
      <button onClick={resetGame}>Reiniciar</button>
      <section className='game'>
        {
          board.map((arr, index)=>{
            return(
              <Square 
                key={index} 
                index={index}
                updateBoard={updateBoard}
              >
                {arr}
              </Square>
            )
          })
        }
      </section>

      <section className='turn'>
        <Square isSelected={turn === TURN.x}>{TURN.x}</Square>
        <Square isSelected={turn === TURN.o}>{TURN.o}</Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner}/>
    </main>
  )
}

export default App
