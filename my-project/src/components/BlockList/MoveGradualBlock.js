import React, { useState } from "react";
import { useDrag } from "react-dnd";
import { v4 as uuidv4 } from "uuid";

const MoveGradualBlock = () => {
  const [seconds, setSeconds] = useState(5); // Giá trị thời gian di chuyển mặc định là 5 giây

  const [{ isDragging }, drag] = useDrag({
    type: "BLOCK",
    item: {
      id: uuidv4(),
      type: "MOVE_GRADUAL",
      label: `Di chuyển trong ${seconds} giây`, // Nhãn hiển thị
      seconds, // Giá trị động của seconds
      style: {
        backgroundColor: "purple", // Màu tím cho block
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
        backgroundColor: "purple",
        color: "white",
        borderRadius: "5px",
        marginBottom: "5px",
      }}
    >
      <label>
        Di chuyển trong
        <input
          type="number"
          value={seconds}
          onChange={(e) => setSeconds(Math.max(1, Math.min(10, Number(e.target.value))))} // Cập nhật giá trị `seconds`
          style={{ width: "50px", margin: "0 5px" }}
        />
        giây
      </label>
    </li>
  );
};

export default MoveGradualBlock;
