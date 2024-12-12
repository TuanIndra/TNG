import React from "react";
import { useDrag } from "react-dnd";
import { v4 as uuidv4 } from "uuid";

const JumpBlock = () => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "BLOCK",
    item: {
      id: uuidv4(),
      type: "JUMP",
      label: "Nhảy tới vị trí ngẫu nhiên",
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
        backgroundColor: "orange",
        color: "white",
        borderRadius: "5px",
        marginBottom: "5px",
      }}
    >
      Nhảy tới vị trí ngẫu nhiên
    </li>
  );
};

export default JumpBlock;
