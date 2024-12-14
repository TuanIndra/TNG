import React from "react";
import MoveBlock from "./MoveBlock";
import TurnBlock from "./TurnBlock";
import JumpBlock from "./JumpBlock";
import TurnBackBlock from "./TurnBackBlock";
import MoveGradualBlock from "./MoveGradualBlock";
import JumpToBlock from "./JumpToBlock";
import ChangeSizeBlock from "./ChangeSizeBlock";
import { useDrop } from "react-dnd";
import "../style/BlockList.css";

const BlockList = ({ onRemoveBlock }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "WORKSPACE_BLOCK", // Chỉ nhận block từ Workspace
    drop: (item) => {
      if (onRemoveBlock) {
        onRemoveBlock(item.id); // Gọi hàm xóa block
      } else {
        console.error("onRemoveBlock is not defined");
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  

  return (
    <aside
      ref={drop} // Kết nối vùng thả
      className="block-list"
      style={{
        backgroundColor: isOver ? "#f0f0f0" : "#f5f5f5", // Hiển thị khi đang kéo
      }}
    >
      

      <h3>Chuyển động</h3>
      <ul>
        {/* Render các block trong BlockList */}
        <MoveBlock />
        <TurnBlock />
        <TurnBackBlock />
        <JumpBlock />
        <MoveGradualBlock />
        <JumpToBlock/>
        <ChangeSizeBlock/>
      </ul>
    </aside>
    
  );
};

export default BlockList;