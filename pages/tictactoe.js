import { Component } from "react"
import Head from 'next/head'
import {Tile} from '../components/Tile'

export default class TicTacToe extends Component {
  constructor(props) {
    super(props)
    this.state = {
      board: [
        '', '', '',
        '', '', '',
        '', '', ''
      ]
    }
  }

  reset = () => {
    this.setState({
      board: [
        '', '', '',
        '', '', '',
        '', '', ''
      ]
    })
  }

  getWinner = () => {
    const { board } = this.state
    if (board[0] === 'X' && board[1] === 'X' && board[2] === 'X') return 'Player'
    if (board[3] === 'X' && board[4] === 'X' && board[5] === 'X') return 'Player'
    if (board[6] === 'X' && board[7] === 'X' && board[8] === 'X') return 'Player'
    if (board[0] === 'X' && board[3] === 'X' && board[6] === 'X') return 'Player'
    if (board[1] === 'X' && board[4] === 'X' && board[7] === 'X') return 'Player'
    if (board[2] === 'X' && board[5] === 'X' && board[8] === 'X') return 'Player'
    if (board[0] === 'X' && board[4] === 'X' && board[8] === 'X') return 'Player'
    if (board[2] === 'X' && board[4] === 'X' && board[6] === 'X') return 'Player'
    if (board[0] === 'O' && board[1] === 'O' && board[2] === 'O') return 'Computer'
    if (board[3] === 'O' && board[4] === 'O' && board[5] === 'O') return 'Computer'
    if (board[6] === 'O' && board[7] === 'O' && board[8] === 'O') return 'Computer'
    if (board[0] === 'O' && board[3] === 'O' && board[6] === 'O') return 'Computer'
    if (board[1] === 'O' && board[4] === 'O' && board[7] === 'O') return 'Computer'
    if (board[2] === 'O' && board[5] === 'O' && board[8] === 'O') return 'Computer'
    if (board[0] === 'O' && board[4] === 'O' && board[8] === 'O') return 'Computer'
    if (board[2] === 'O' && board[4] === 'O' && board[6] === 'O') return 'Computer'
    if (!board.filter(c => !c).length) return 'Nobody'
  }

  createClickHandler = idx => e => {
    const { board } = this.state
    if (board[idx]) return
    const newBoard = board.map(x => x)
    newBoard[idx] = 'X'
    if (!this.getWinner()) {
      // computer can move?
      const freeTileIndices = newBoard.reduce((p, c, i) => {
        if (!c) p.push(i)
        return p
      }, [])
      if (freeTileIndices.length) {
        // computer move
        const randomIndex = Math.floor(freeTileIndices.length * Math.random())
        newBoard[freeTileIndices[randomIndex]] = 'O'
      }
    }
    this.setState({ board: newBoard })
  }

  render () {
    const { board } = this.state
    const winner = this.getWinner()
    return (
      <div>
        <Head>
          <title>TicTacToe Game</title>
          <link rel='stylesheet' href='../static/style.css' />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
        </Head>

        <h1>TicTacToe</h1>

        <style jsx>{`
          h1 {
            text-align: center;
          }
          .tictactoe-board {
            display: flex;
            flex-wrap: wrap;
            height: 100vmin;
            max-height: 480px;
            width: 100vmin;
            max-width: 480px;
            box-sizing: border-box;
            border: 20px solid transparent;
          }
        `}</style>

        <div className='tictactoe-board'>
          {board.map((tile, idx) => <Tile value={tile} index={idx} onClick={this.createClickHandler(idx)} key={idx} />)}
        </div>

        {winner && <h1>
          {winner} wins!
          <br />
          <button onClick={this.reset}>
            Play again
          </button>
        </h1>}
      </div>
    )
  }
}
