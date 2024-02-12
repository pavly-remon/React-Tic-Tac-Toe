import { useState } from "react";
const Player = ({ initalName, symbol, onChangeName, isActive }) => {
  const [isEditing, setIsEditing] = useState(false);

  const clickHandler = () => {
    setIsEditing((oldVal) => !oldVal);
  };
  const changeHandler = (event) => {
    onChangeName(prev => ({
      ...prev,
      [symbol]: event.target.value 
    })
    );
  };
  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        <span className="player-name">
          {isEditing ? (
            <input value={initalName} onChange={changeHandler} />
          ) : (
            <input value={initalName} onChange={changeHandler} />
            )}
        </span>
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={clickHandler}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
};

export default Player;
