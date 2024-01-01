import React, { useState } from 'react'

export default function Player({ name, symbol, isActive, onChangeName }) {
    const [isEditing, setIsEditing] = useState(false)
    const [newName, setNewName] = useState(name)
    const editOrSave = isEditing ? 'Save' : 'Edit'


    function handleEdit() {
        setIsEditing((editing) => !editing)

        if (isEditing) {
            onChangeName(symbol, newName)
        }
    }

    function handleEnter(e) {
        if (e.key === 'Enter') {
            onChangeName(symbol, newName)
            setIsEditing(false)
        }
    }

    function handleChange(e) {
        setNewName(e.target.value)
    }


    let playerName = isEditing ?
        <input
            onChange={handleChange}
            onKeyDown={handleEnter}
            type="text" required value={newName} />
        :
        <span className="player-name">{newName}</span>



    return (
        <li className={isActive ? "active" : undefined}>
            <span className="player">
                {playerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEdit}>{editOrSave}</button>
        </li>
    )
}