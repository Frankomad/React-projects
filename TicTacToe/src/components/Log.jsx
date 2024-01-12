export default function Log({ turns }) {
    return (
        <ol id="log">
            {turns.map((turn, index) => <li key={index}>
                <span className="turn-number">Turn {index + 1}</span>
                <span className="player-name">{turn.player}</span>
                <span className="square">{turn.square.row + 1}, {turn.square.col + 1}</span>
            </li>)}
        </ol>
    )
}