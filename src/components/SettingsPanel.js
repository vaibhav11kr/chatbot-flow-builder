import React from 'react';
import { FaArrowLeft } from "react-icons/fa";
import './SettingsPanel.css';

const SettingsPanel = ({ selectedNode, onChange, onBack }) => {
  // If no node is selected, return null (component doesn't render)
  if (!selectedNode) return null;

  // Handle textarea change
  const handleChange = (event) => {
    const { value } = event.target;
    onChange(selectedNode.id, value); // Call onChange with node id and new value
  };

  return (
    <div className="settings-panel">
      {/* Back button and panel title */}
      <div className="back-area">
        <button className="back-button" onClick={onBack}><FaArrowLeft /></button>
        <span>Messages</span>
      </div>
      
      {/* Text editing area */}
      <div className="text-edit">
        <label>Text </label>
        <textarea className='textarea' value={selectedNode.data.label} onChange={handleChange} />
      </div>
    </div>
  );
};

export default SettingsPanel;
