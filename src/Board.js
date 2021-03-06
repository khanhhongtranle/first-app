import React from 'react';
import {Square} from './Square';
import './App.css';

export class Board extends React.Component{

    renderSquares(index){
        return (
          <Square   value={this.props.squares[index]}
                    name = {index}
                    onClick={ () => this.props.onClick(index)}/>
        );
    }

    render() {
        const squares = ['0', '1', '2'];
        const row = ['0' , '1', '2'];

        return (
            <div>
                {row.map((value, index) => {
                    return (
                        <div key={index} className="board-row">
                            {squares.map( (value1, index1) => {
                                return this.renderSquares(index1 + index*3);
                            })}
                        </div>
                    );
                })}
            </div>
        );
    }

}

export function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    let result = {
        winner: null,
        squaresCausedTheWin: {
            a: null,
            b: null,
            c: null,
        }
    }

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            result.winner = squares[a];
            result.squaresCausedTheWin = {a,b,c};
            return result;
        }
    }
    return null;
}
