export default function GameBoard({ onSelectSquare, board }) {

    return (
        <ol id="game-board">
            {board.map((row, rowIndex) => <li key={rowIndex}>
                <ol>
                    {row.map((cell, cellIndex) => <li key={cellIndex}>
                        <button
                            disabled={cell !== null}
                            onClick={() => onSelectSquare(rowIndex, cellIndex)}>{cell}
                        </button>
                    </li>)}
                </ol>
            </li>)}
        </ol>
    )
}