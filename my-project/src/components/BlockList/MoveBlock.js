import React, { useState } from "react";
import { useDrag } from "react-dnd";
import { v4 as uuidv4 } from "uuid";

const MoveBlock = () => {
  const [steps, setSteps] = useState(10); // Giá trị bước di chuyển

  const [{ isDragging }, drag] = useDrag({
    type: "BLOCK",
    item: {
      id: uuidv4(),
      type: "MOVE",
      label: `Di chuyển ${steps} bước`, // Nhãn hiển thị
      steps, // Giá trị động của steps
      style: {
        backgroundColor: "blue", // Màu xanh lam cho block
        color: "white",
        padding: "10px",
        borderRadius: "5px",
      },
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(), // Xác định trạng thái kéo
    }),
  });

  return (
    <li
      ref={drag} // Kết nối với hook `useDrag`
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
          onChange={(e) => setSteps(Number(e.target.value))} // Cập nhật giá trị `steps`
          style={{ width: "50px", margin: "0 5px" }}
        />
        bước
      </label>
    </li>
  );
};

export default MoveBlock;
