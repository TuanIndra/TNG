import React, { useEffect, useRef, useState, useCallback } from "react";
import "../style//Preview.css";

const Preview = ({ position, rotation, onPositionChange, previewRef }) => {
  const characterRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const onMouseDown = (e) => {
    if (characterRef.current && previewRef.current) {
      const rect = characterRef.current.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const offsetY = e.clientY - rect.top;
      setMouseOffset({ x: offsetX, y: offsetY });
      setDragging(true);
    }
  };

  const onMouseMove = useCallback(
    (e) => {
      if (dragging && previewRef.current && characterRef.current) {
        const previewRect = previewRef.current.getBoundingClientRect();
        const charRect = characterRef.current.getBoundingClientRect();

        let newX = e.clientX - previewRect.left - mouseOffset.x;
        let newY = e.clientY - previewRect.top - mouseOffset.y;

        const maxX = previewRect.width - charRect.width;
        const maxY = previewRect.height - charRect.height;

        if (newX < 0) newX = 0;
        if (newY < 0) newY = 0;
        if (newX > maxX) newX = maxX;
        if (newY > maxY) newY = maxY;

        onPositionChange({ x: newX, y: newY });
      }
    },
    [dragging, mouseOffset, onPositionChange]
  );

  const onMouseUp = () => {
    setDragging(false);
  };

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [onMouseMove]);

  return (
    <aside className="preview" ref={previewRef} style={{ position: "relative", overflow: "hidden" }}>
      <h3>Preview</h3>
      <div
        className="character-preview"
        style={{
          position: "absolute",
          top: `${position.y}px`,
          left: `${position.x}px`,
          transform: `rotate(${rotation}deg)`,
          transition: dragging ? "none" : "transform 0.5s",
          cursor: dragging ? "grabbing" : "grab",
        }}
        ref={characterRef}
        onMouseDown={onMouseDown}
      >
        <img
          src="https://scratch.mit.edu/static/images/scratch-cat.svg"
          alt="Scratch Cat"
        />
      </div>
    </aside>
  );
};

export default Preview;
