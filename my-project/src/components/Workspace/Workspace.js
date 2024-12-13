import React, { useRef } from "react";
import { useDrop } from "react-dnd";
import "../style/Workspace.css";
import WorkspaceBlock from "./WorkspaceBlock"; // Import thành phần con

const Workspace = ({ onDropBlock, blocks, onBlockDrag, onBlockClick   }) => {
  const dropRef = useRef(null);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "BLOCK",
    drop: (item, monitor) => {
      if (dropRef.current) {
        const clientOffset = monitor.getClientOffset();
        const workspaceOffset = dropRef.current.getBoundingClientRect();
  
        const relativeX = clientOffset.x - workspaceOffset.left;
        const relativeY = clientOffset.y - workspaceOffset.top;
  
        onDropBlock({
          ...item,
          position: { x: relativeX, y: relativeY },
        });
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  
  drop(dropRef); // Kết nối vùng thả
  

  return (
    <section className="workspace">
      <h3>Workspace</h3>
      <div
        className="workspace-canvas"
        ref={dropRef}
        style={{
          backgroundColor: isOver ? "#f0f0f0" : "#fff",
        }}
      >
        {blocks.length === 0 ? (
          "Drag and drop blocks here"
        ) : (
          <ul>
            {blocks.map((block, index) => (
              <WorkspaceBlock
                key={index}
                block={block}
                onBlockClick={onBlockClick} 
                onBlockDrag={onBlockDrag}
              />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default Workspace;
