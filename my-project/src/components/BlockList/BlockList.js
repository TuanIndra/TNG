import React from "react";
import MoveBlock from "./MoveBlock";
import TurnBlock from "./TurnBlock";
import JumpBlock from "./JumpBlock";
import TurnBackBlock from "./TurnBackBlock";
import "../style/BlockList.css";

const BlockList = () => {
  return (
    <aside className="block-list">
      <h3>Chuyển động</h3>
      <ul>
        <MoveBlock />
        <TurnBlock />
        <TurnBackBlock/>
        <JumpBlock />
      </ul>
    </aside>
  );
};

export default BlockList;
