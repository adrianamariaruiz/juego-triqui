import { WINNER_OPTIONS } from "../constants"

export const checkWinner = (boardToCheck) => {
    for(const option of WINNER_OPTIONS){
      const [a, b, c] = option
      if(boardToCheck[a] && 
          boardToCheck[a] === boardToCheck[b] &&
          boardToCheck[a] === boardToCheck[c]
        ){
          return boardToCheck[a] // retorna el ganador
      }
    }
    // si no hay ganador
    return null 
  }

  export const endGame = (newBoard) => {
    // si todos los campos tienen algo (x u o) entonces retorna true = se acabo el juego
    return newBoard.every((square) => square !== null) 
  }