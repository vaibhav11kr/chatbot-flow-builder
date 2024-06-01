import React from 'react';
import { Handle } from 'reactflow';
import { BiMessageRoundedDetail, BiLogoWhatsapp } from "react-icons/bi";
import './TextNode.css';

const TextNode = ({ data }) => {
  return (
    <div className="text-node">
      {/* Node header */}
      <div className="node-header">
        <span className="icon left-icon"><BiMessageRoundedDetail style={{ color: 'black', fontSize: '15px', paddingLeft: '5px' }}/></span>
        <span className="node-title">Send Message</span>
        <span className="icon right-icon"><BiLogoWhatsapp style={{ color: '#5BBB67', fontSize: '10px' }}/></span>
      </div>
      
      {/* Node content (label) */}
      <div className="node-content">
        {data.label}
      </div>
      
      {/* Handles for connecting edges */}
      <Handle type="target" position="left" />
      <Handle type="source" position="right" />
    </div>
  );
};

export default TextNode;
