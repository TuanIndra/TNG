import React, { useState, useRef, useEffect } from "react";
import Workspace from "../Workspace/Workspace";
import Preview from "../Preview/Preview";
import BlockList from "../BlockList/BlockList";

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
  
  const handlePositionChange = (newPosition) => {
    let { x, y } = newPosition;
    if (x < 0) x = 0;
    if (y < 0) y = 0;
    if (x > maxX) x = maxX;
    if (y > maxY) y = maxY;
    setPosition({ x, y });
  };
  const isNear = (pos1, pos2, threshold = 50) => {
    const dx = Math.abs(pos1.x - pos2.x);
    const dy = Math.abs(pos1.y - pos2.y);
    return dx <= threshold && dy <= threshold; // Kiểm tra ngưỡng khoảng cách
  };
  
  const handleDrop = (block) => {
    setWorkspaceBlocks((prevBlocks) => {
      const updatedBlocks = [...prevBlocks];
      const threshold = 50; // Khoảng cách ngưỡng để ghép
  
      let addedToStack = false;
  
      updatedBlocks.forEach((existingBlock) => {
        // Kiểm tra nếu block nằm gần block khác
        if (isNear(block.position, existingBlock.position, threshold)) {
          if (!existingBlock.stack) {
            existingBlock.stack = [existingBlock.id]; // Tạo nhóm nếu chưa có
          }
          existingBlock.stack.push(block.id); // Thêm block mới vào nhóm
          addedToStack = true;
  
          // Căn chỉnh vị trí của block mới
          if (block.position.y > existingBlock.position.y) {
            block.position = {
              x: existingBlock.position.x,
              y: existingBlock.position.y + 50, // Đặt dưới block hiện tại
            };
          } else {
            block.position = {
              x: existingBlock.position.x,
              y: existingBlock.position.y - 50, // Đặt trên block hiện tại
            };
          }
        }
      });
  
      // Nếu không ghép vào nhóm nào, thêm block như bình thường
      if (!addedToStack) {
        updatedBlocks.push({ ...block, stack: [block.id] });
      }
  
      return updatedBlocks;
    });
  };
  
  
  const handleRemoveBlock = (id) => {
    setWorkspaceBlocks((prevBlocks) => prevBlocks.filter((block) => block.id !== id));
  };
  
  const characterWidth = 48; // Chiều rộng của nhân vật (hoặc block)
  const characterHeight = 48; // Chiều cao của nhân vật (hoặc block)
  
  const maxX = previewSize.width - characterWidth;
  const maxY = previewSize.height - characterHeight;
  
  const executeBlockStack = (block) => {
    if (!block.stack) return;
  
    block.stack.forEach((blockId) => {
      const blockToExecute = workspaceBlocks.find((b) => b.id === blockId);
      if (blockToExecute) {
        executeBlock(blockToExecute); // Thực hiện hành động của từng block
      }
    });
  };
  const newBlock = {
    id: "jump-to-1",
    type: "JUMP_TO",
    position: { x: 100, y: 200 },
    hasJumped: false, // Block mặc định chưa được nhảy
  };
  const executeBlock = (block) => {
    let { x, y } = position;
    let newRotation = rotation;
  
    const characterWidth = 48; // Chiều rộng của nhân vật
    const characterHeight = 48; // Chiều cao của nhân vật
    const maxX = previewSize.width - characterWidth; // Giới hạn X
    const maxY = previewSize.height - characterHeight; // Giới hạn Y
  
    switch (block.type) {
      case "MOVE":
        {
          const angleInRadians = (Math.PI / 180) * rotation;
          const steps = block.steps ?? 10; // Giá trị mặc định là 10 nếu steps không được truyền
          x += steps * Math.cos(angleInRadians);
          y += steps * Math.sin(angleInRadians);
  
          // Giới hạn vị trí trong vùng Preview
          if (x < 0) x = 0;
          if (y < 0) y = 0;
          if (x > maxX) x = maxX;
          if (y > maxY) y = maxY;
        }
        break;
  
      case "TURN":
        {
          const angle = block.angle ?? 15; // Giá trị mặc định là 15 nếu angle không được truyền
          newRotation += angle;
        }
        break;
  
      case "TURN_BACK":
        {
          const angle = block.angle ?? 15; // Giá trị mặc định là 15 nếu angle không được truyền
          newRotation -= angle;
        }
        break;
  
      case "JUMP":
        {
          x = Math.random() * maxX; // Nhảy tới vị trí ngẫu nhiên trong giới hạn
          y = Math.random() * maxY;
        }
        break;
  
      case "MOVE_GRADUAL":
        {
          const randomX = Math.random() * maxX;
          const randomY = Math.random() * maxY;
          const seconds = block.seconds ?? 5; // Giá trị mặc định là 5 giây
  
          // Di chuyển từ từ tới vị trí mới
          const steps = 100; // Số bước nhỏ
          const deltaX = (randomX - x) / steps;
          const deltaY = (randomY - y) / steps;
  
          let step = 0;
          const interval = setInterval(() => {
            step++;
            x += deltaX;
            y += deltaY;
  
            if (x < 0) x = 0;
            if (y < 0) y = 0;
            if (x > maxX) x = maxX;
            if (y > maxY) y = maxY;
  
            setPosition({ x, y });
  
            if (step >= steps) {
              clearInterval(interval);
            }
          }, (seconds * 1000) / steps);
        }
        break;

        case "JUMP_TO":
  {
    // Kiểm tra trạng thái hasJumped
    if (block.hasJumped) {
      console.log("Nhân vật đã nhảy tới block này trước đó, không thực hiện lại.");
      return; // Dừng hành động nếu đã nhảy
    }

    // Cập nhật vị trí dựa trên block
    x = block.position?.x ?? x; // Nhảy tới tọa độ X của block
    y = block.position?.y ?? y; // Nhảy tới tọa độ Y của block

    // Giới hạn trong vùng Preview
    if (x < 0) x = 0;
    if (y < 0) y = 0;
    if (x > maxX) x = maxX;
    if (y > maxY) y = maxY;

    // Đánh dấu block này đã được nhảy
    block.hasJumped = true;

    console.log(`Nhảy tới block: ${block.id}, tọa độ: (${x}, ${y})`);
  }
  break;

        

    case "CHANGE_SIZE":
      {
        const size = block.size ?? 100; // Giá trị mặc định là 100%
        console.log(`Thay đổi kích thước thành ${size}%`);
        // Thay đổi kích thước đối tượng Preview nếu cần
      }
      break;
  
      default:
        break;
    }
  
    setPosition({ x, y }); // Cập nhật vị trí
    setRotation(newRotation); // Cập nhật góc xoay
  };
  


  const handleBlockDrag = (id, newPosition) => {
    setWorkspaceBlocks((prevBlocks) =>
      prevBlocks.map((block) =>
        block.id === id
          ? {
              ...block,
              position: {
                x: newPosition.x - 200, // Điều chỉnh tọa độ theo canvas (giả sử canvas bắt đầu từ x = 200)
                y: newPosition.y - 100, // Điều chỉnh tọa độ theo canvas (giả sử canvas bắt đầu từ y = 100)
              },
            }
          : block
      )
    );
  };

  return (
    <>
      <BlockList onRemoveBlock={handleRemoveBlock} />
      <Workspace
        onDropBlock={handleDrop}
        blocks={workspaceBlocks}
        onBlockClick={executeBlockStack}
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
