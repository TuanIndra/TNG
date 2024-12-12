import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BlockList from "./components/BlockList/BlockList";
import Editor from "./components/Editor/Editor";
import Header from "./components/Header/Header"; 
import Workspace from "./components/Workspace/Workspace";
import Preview from "./components/Preview/Preview";
import "./App.css";

const App = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Header/>
      <div className="app">
        <BlockList />
        <Editor />
        
      </div>

    </DndProvider>
  );
};

export default App;
