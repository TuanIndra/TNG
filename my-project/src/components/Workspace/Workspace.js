import React from "react";
import { useDrop } from "react-dnd";
import "../style/Workspace.css";

const Workspace = ({ onDropBlock, blocks, onBlockClick }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "BLOCK",
    drop: (item) => onDropBlock(item), // Retain the full block object with label and angle
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <section className="workspace" ref={drop}>
      <h3>Workspace</h3>
      <div
        className="workspace-canvas"
        style={{
          backgroundColor: isOver ? "#f0f0f0" : "#fff",
        }}
      >
        {blocks.length === 0 ? (
          "Drag and drop blocks here"
        ) : (
          <ul>
            {blocks.map((block, index) => (
                <li
            key={index}
            style={{
                cursor: "pointer",
                border: "1px solid #ccc",
                margin: "5px",
                padding: "5px",
            }}
            onClick={() => onBlockClick(block)}
            >
            {block.label || block.type} {/* Hiển thị label */}
            </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default Workspace;
