import React, { useState } from "react";
import { useDrag } from "react-dnd";
import { v4 as uuidv4 } from "uuid";

const MoveBlock = () => {
  const [steps, setSteps] = useState(10);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "BLOCK",
    item: {
      id: uuidv4(),
      type: "MOVE",
      label: `Di chuyển ${steps} bước`,
      steps,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <li
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
        padding: "10px",
        backgroundColor: "blue",
        color: "white",
        borderRadius: "5px",
        marginBottom: "5px",
      }}
    >
      <label>
        Di chuyển
        <input
          type="number"
          value={steps}
          onChange={(e) => setSteps(Number(e.target.value))}
          style={{ width: "50px", margin: "0 5px" }}
        />
        bước
      </label>
    </li>
  );
};

export default MoveBlock;
