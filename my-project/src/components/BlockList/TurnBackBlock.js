import React, { useState } from "react";
import { useDrag } from "react-dnd";
import { v4 as uuidv4 } from "uuid";

const TurnBackBlock = () => {
  const [angle, setAngle] = useState(15);

  const [{ isDragging }, drag] = useDrag({
    type: "BLOCK",
    item: {
      id: uuidv4(),
      type: "TURN_BACK",
      label: `Xoay ngược ${angle} độ`,
      angle,
      style: {
        backgroundColor: "green", // Màu xanh lá
        color: "white",
        padding: "10px",
        borderRadius: "5px",
      },
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <li
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
        padding: "10px",
        backgroundColor: "green",
        color: "white",
        borderRadius: "5px",
        marginBottom: "5px",
      }}
    >
      <label>
        Xoay ngược
        <input
          type="number"
          value={angle}
          onChange={(e) => setAngle(Number(e.target.value))} // Cập nhật giá trị `angle`
          style={{ width: "50px", margin: "0 5px" }}
        />
        độ
      </label>
    </li>
  );
};

export default TurnBackBlock;
