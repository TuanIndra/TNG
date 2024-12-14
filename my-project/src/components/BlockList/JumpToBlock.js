import React, { useState } from "react";
import { useDrag } from "react-dnd";
import { v4 as uuidv4 } from "uuid";

const JumpToBlock = () => {
  const [x, setX] = useState(100); // Tọa độ X mặc định
  const [y, setY] = useState(100); // Tọa độ Y mặc định

  const [{ isDragging }, drag] = useDrag({
    type: "BLOCK",
    item: {
      id: uuidv4(),
      type: "JUMP_TO",
      label: `Nhảy tới (${x}, ${y})`, // Nhãn hiển thị
      position: { x, y }, // Tọa độ mục tiêu
      style: {
        backgroundColor: "purple", // Màu tím cho block
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
        backgroundColor: "purple",
        color: "white",
        borderRadius: "5px",
        marginBottom: "5px",
      }}
    >
      <label>
        Nhảy tới X
        <input
          type="number"
          value={x}
          onChange={(e) => setX(Number(e.target.value))} // Cập nhật tọa độ X
          style={{ width: "50px", margin: "0 5px" }}
        />
        Y
        <input
          type="number"
          value={y}
          onChange={(e) => setY(Number(e.target.value))} // Cập nhật tọa độ Y
          style={{ width: "50px", margin: "0 5px" }}
        />
      </label>
    </li>
  );
};

export default JumpToBlock;
