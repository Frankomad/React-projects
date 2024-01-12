import { useState, useRef } from "react";

export default function Player() {
  const playerName = useRef();
  const [enteredName, setEnteredName] = useState(null);

  function handleSubmit() {
    setEnteredName(playerName.current.value)
    playerName.current.value = "";
  }

  return (
    <section id="player">
      <h2>Welcome {enteredName ?? "unknown entity"}</h2>
      <p>
        <input ref={playerName} type="text" />
        <button onClick={handleSubmit}>Set Name</button>
      </p>
      <h2>The closer you get, the more you score!</h2>
    </section>
  );
}
