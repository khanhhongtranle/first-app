import React from 'react';
import './App.css';
import {Board, calculateWinner} from './Board';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            history: [
                {
                    squares: Array(9).fill(null)
                }
            ],
            wasSorted: false,
            stepNumber: 0,
            xIsNext: true,
        }
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winResult = calculateWinner(current.squares);
        const isBoardFull = checkIsBoardFull(current.squares);
        const moves = history.map((step, move) => {
            let numberOfStep;
            if (this.state.wasSorted){
                numberOfStep = this.state.stepNumber;
                move = numberOfStep - move;
            }
            if (move > 0){
                const desc = (move) ? 'Go to move #' + (move) : 'Go to game start';
                return (
                    <tr key={move}>
                        <td>{move}</td>
                        <td>
                            <button name={move} className="history" onClick={()=> this.jumpTo(move)}>
                                {desc}
                            </button>
                        </td>
                    </tr>
                );
            }
        });

        let status;

        if (winResult) {
            status = 'Winner: ' + winResult.winner;

            const listSquaresElement = document.getElementsByClassName('square');
            listSquaresElement[winResult.squaresCausedTheWin.a].style.background = 'deepskyblue';
            listSquaresElement[winResult.squaresCausedTheWin.b].style.background = 'deepskyblue';
            listSquaresElement[winResult.squaresCausedTheWin.c].style.background = 'deepskyblue';

        } else if (!winResult && isBoardFull){
            status = 'Tie game';
        }
        else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <div>
                        <button onClick={() => this.sortHistory()}> Sort newest to oldest</button>
                    </div>
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Step</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {moves}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }

    handleClick(index) {

        const listMoveButtonElement = document.getElementsByClassName('history');
        for (let i = 0; i < listMoveButtonElement.length; i++){
            listMoveButtonElement[i].style.background = "";
        }

        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[index]) {
            return;
        }
        squares[index] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([
                {squares: squares}
            ]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }


    jumpTo(step) {
        const listMoveButtonElement = document.getElementsByClassName('history');
        debugger;
        for (let i = 0 ; i < listMoveButtonElement.length; i++){
            const clickedMoveButton = listMoveButtonElement[i];
            console.log(clickedMoveButton.getAttributeNode('name').value);
            if (clickedMoveButton.getAttributeNode('name').value === step.toString()){
                clickedMoveButton.style.background = "powderblue";
                break;
            }
        }

        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });

        const listSquaresElement = document.getElementsByClassName('square');
        for (let i = 0; i < listSquaresElement.length; i++) {
            listSquaresElement[i].style.background = '#fff';
        }
    }

    sortHistory() {
        this.setState({
            wasSorted: !this.state.wasSorted,
        });
    }
}

export default App;

export function checkIsBoardFull(squares) {
    for (let i = 0; i < squares.length; i++){
        if (squares[i] === null){
            return false;
        }
    }
    return true;
}
