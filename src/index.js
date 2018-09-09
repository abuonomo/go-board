import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';

function Square(props) {
    var stone_opacity = 0;
    if (props.value===null) {
        stone_opacity = 0;
    }
    else {
        stone_opacity = 1;
    }

    return (
        <button className="square" onClick={props.onClick}>
            <hr className="horizontal"></hr>
            <hr className="vertical"></hr>
            <div className="stone"
                 style={{backgroundColor:props.value, opacity:stone_opacity}}
            >
            </div>
        </button>
    );
}

function Vertex(props) {
    return (
        <hr width="1px"></hr>
    );
}

// class Square extends React.Component {
//     render() {
//         return (
//             <button
//                 className="square"
//                 onClick={() => { this.props.onClick(); }}
//             >
//                 {this.props.value}
//             </button>
//         );
//     }
// }

class Board extends React.Component {

    constructor(props) {
        super(props);
        var multiArray = [];
        for (var i = 0; i < this.props.size; i++) {
            var tmp_array = Array(this.props.size).fill(null)
            multiArray[i] = tmp_array
        }
        this.state = {
            squares: multiArray,
            xIsNext: true,
        };
    }

    handleClick(i, j) {
        const squares = this.state.squares.slice();

        squares[i][j] = this.state.xIsNext ? 'black' : 'white';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });
    }

    renderSquare(i, j) {
        return (
            <Square
                onClick={() => this.handleClick(i, j)}
                key={i * this.props.size + j}
                value={this.state.squares[i][j]}
                x={i}
                y={j}
            />
        );
    }

    renderRow(j) {
        var squares = [];
        for (var i = 0; i < this.props.size; i++) {
            squares.push(this.renderSquare(i, j))
        }
        return <div className="board-row">{squares}</div>;
    }

    render() {
        const winner = calculateWinner(this.state.squares);
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'black' : 'white');
        }

        var cols = [];
        for (var i = 0; i < this.props.size; i++) {
            cols.push(this.renderRow(i))
        }

        // var cols = [];
        // for (var i = 0; i < 13; i++) {
        //     cols.push(this.renderRow(13))
        // }

        return (
            <div className="square big">
                {/*<div className="status">{status}</div>*/}
                {/*<div class="square medium">*/}
                    {cols}
                {/*</div>*/}
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board size={9}/>
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

function calculateWinner(squares) {
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
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

// import registerServiceWorker from './registerServiceWorker';
//
// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();
