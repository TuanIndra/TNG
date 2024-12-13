import React from "react";
import { useDrag } from "react-dnd";

const WorkspaceBlock = ({ block, onBlockClick, onBlockDrag }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "WORKSPACE_BLOCK",
    item: { id: block.id },
    end: (item, monitor) => {
      const offset = monitor.getClientOffset(); // Lấy vị trí chuột khi kéo thả
      if (offset) {
        onBlockDrag(item.id, offset); // Gọi callback cập nhật vị trí
      }
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <li
      ref={drag} // Đảm bảo `drag` được kết nối đúng với phần tử
      style={{
        position: "absolute",
        left: `${block.position.x}px`,
        top: `${block.position.y}px`,
        cursor: "move",
        opacity: isDragging ? 0.5 : 1,
        ...block.style,
      }}
      onClick={() => onBlockClick(block)} // Gọi hành động khi click
    >
      {block.label || block.type}
    </li>
  );
};

export default WorkspaceBlock;