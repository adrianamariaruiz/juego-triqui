import { Square } from "./Square"

export const WinnerModal = ({resetGame, winner}) => {
  return (
    <>
      {
        winner !== null && (
          <section className='winner'>
            <div className='text'>
              <h2>
                {
                  winner === false ? 'Empate' : 'Ganó: '
                }
              </h2>
              <header className='win'>
                {winner && <Square>{winner}</Square>}
              </header>
              <footer>
                <button onClick={resetGame}>Volver a jugar</button>
              </footer>
            </div>
          </section>
        )
      }
    </>
  )
}

export default WinnerModal