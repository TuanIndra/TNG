import React, { useState } from "react";
import { useDrag } from "react-dnd";
import { v4 as uuidv4 } from "uuid";

const ChangeSizeBlock = () => {
  const [size, setSize] = useState(100); // Kích thước mặc định (phần trăm)

  const [{ isDragging }, drag] = useDrag({
    type: "BLOCK",
    item: {
      id: uuidv4(),
      type: "CHANGE_SIZE",
      label: `Thay đổi kích thước ${size}%`, // Nhãn hiển thị
      size, // Giá trị kích thước
      style: {
        backgroundColor: "red", // Màu đỏ cho block
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
        backgroundColor: "red",
        color: "white",
        borderRadius: "5px",
        marginBottom: "5px",
      }}
    >
      <label>
        Thay đổi kích thước
        <input
          type="number"
          value={size}
          onChange={(e) => setSize(Number(e.target.value))} // Cập nhật giá trị kích thước
          style={{ width: "50px", margin: "0 5px" }}
        />
        %
      </label>
    </li>
  );
};

export default ChangeSizeBlock;
