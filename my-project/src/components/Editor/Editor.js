import React, { useState, useRef, useEffect } from "react";
import Workspace from "../Workspace/Workspace";
import Preview from "../Preview/Preview";

const Editor = () => {
  const [workspaceBlocks, setWorkspaceBlocks] = useState([]);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);

  const [previewSize, setPreviewSize] = useState({ width: 0, height: 0 });
  const previewRef = useRef(null);

  useEffect(() => {
    if (previewRef.current) {
      const updatePreviewSize = () => {
        const { width, height } = previewRef.current.getBoundingClientRect();
        setPreviewSize({ width, height });
      };

      updatePreviewSize();
      window.addEventListener("resize", updatePreviewSize);

      return () => {
        window.removeEventListener("resize", updatePreviewSize);
      };
    }
  }, []);

  const calculateDistance = (pos1, pos2) => {
    const dx = pos2.x - pos1.x;
    const dy = pos2.y - pos1.y;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const checkAndSnapBlocks = (blockIndex) => {
    const threshold = 50; // Khoảng cách ngưỡng để ghép
    setWorkspaceBlocks((prevBlocks) => {
      const updatedBlocks = [...prevBlocks];
      const currentBlock = updatedBlocks[blockIndex];

      updatedBlocks.forEach((block, index) => {
        if (index !== blockIndex) {
          const distance = calculateDistance(currentBlock.position, block.position);
          if (distance < threshold) {
            currentBlock.position = { ...block.position }; // Ghép block
            block.isClose = true; // Đánh dấu là gần
          } else {
            block.isClose = false; // Không gần
          }
        }
      });

      return updatedBlocks;
    });
  };

  const handleDrop = (block) => {
    setWorkspaceBlocks((prev) => [
      ...prev,
      { ...block, position: { x: 0, y: 0 }, isClose: false },
    ]);
  };

  const handleBlockDrag = (index, newPosition) => {
    setWorkspaceBlocks((prevBlocks) => {
      const updatedBlocks = [...prevBlocks];
      updatedBlocks[index] = {
        ...updatedBlocks[index],
        position: newPosition,
      };
      return updatedBlocks;
    });
    checkAndSnapBlocks(index);
  };
  const handlePositionChange = (newPosition) => {
    let { x, y } = newPosition;
    if (x < 0) x = 0;
    if (y < 0) y = 0;
    if (x > maxX) x = maxX;
    if (y > maxY) y = maxY;
    setPosition({ x, y });
  };
  
  const characterWidth = 48; // Chiều rộng của nhân vật (hoặc block)
  const characterHeight = 48; // Chiều cao của nhân vật (hoặc block)
  
  const maxX = previewSize.width - characterWidth;
  const maxY = previewSize.height - characterHeight;
  
  const executeBlock = (block) => {
    let { x, y } = position;
    let newRotation = rotation;

    switch (block.type) {
      case "MOVE":
        const angleInRadians = (Math.PI / 180) * rotation;
        const steps = block.steps || 10; // Default steps
        x += steps * Math.cos(angleInRadians);
        y += steps * Math.sin(angleInRadians);
        break;
      case "TURN":
        const angle = block.angle || 15; // Default angle
        newRotation += angle;
        break;
      case "TURN_BACK":
        const iangle = block.angle || 15;
        newRotation -= iangle;
        break;
      case "JUMP":
        x = Math.floor(Math.random() * previewSize.width);
        y = Math.floor(Math.random() * previewSize.height);
        break;
      default:
        break;
    }

    setPosition({ x, y });
    setRotation(newRotation);
  };

  return (
    <>
      <Workspace
        onDropBlock={handleDrop}
        blocks={workspaceBlocks}
        onBlockClick={executeBlock}
        onBlockDrag={handleBlockDrag}
      />
        <Preview 
        position={position} 
        rotation={rotation} 
        onPositionChange={handlePositionChange} // Đảm bảo hàm này tồn tại
        previewRef={previewRef}
        />

    </>
  );
};

export default Editor;
