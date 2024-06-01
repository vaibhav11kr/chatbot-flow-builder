import React from 'react';
import './NodesPanel.css';
import { BiMessageRoundedDetail } from "react-icons/bi";

const NodesPanel = () => {
  // Handle drag start for nodes
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType); // Set node type for dragging
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="nodes-panel">
      {/* Node for adding textNode */}
      <div
        className="node"
        onDragStart={(event) => onDragStart(event, 'textNode')}
        draggable
      >
        <BiMessageRoundedDetail style={{ fontSize: '35px' }}/>
        Message
      </div>
    </div>
  );
};

export default NodesPanel;
