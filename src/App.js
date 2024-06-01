import React, { useState } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  addEdge,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
} from 'reactflow';
import 'reactflow/dist/style.css';
import './styles/App.css';
import TextNode from './components/nodes/TextNode';
import NodesPanel from './components/NodesPanel';
import SettingsPanel from './components/SettingsPanel';

// Define custom node types
const nodeTypes = {
  textNode: TextNode,
};

// Initialize empty nodes and edges arrays
const initialNodes = [];
const initialEdges = [];

const App = () => {
  // State management for nodes, edges, selected node, counters, and error message
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const [messageCounter, setMessageCounter] = useState(1);  // Counter for node labels
  const [nodeIdCounter, setNodeIdCounter] = useState(1);    // Counter for node IDs
  const [errorMessage, setErrorMessage] = useState('');    // Error message state

  // Handle connection between nodes
  const onConnect = (params) => {
    const existingEdge = edges.find(edge => edge.source === params.source);
    if (existingEdge) {
      setErrorMessage('A node can have only one outgoing connection.');
      return;
    }
    setEdges((eds) => addEdge({ ...params, arrowHeadType: 'arrow' }, eds));
    setErrorMessage('');  // Clear error message on successful connection
  };

  // Handle node click to select it
  const onNodeClick = (event, node) => {
    setSelectedNode(node);
  };

  // Handle node label change
  const onNodeChange = (id, label) => {
    setNodes((nds) =>
      nds.map((node) => (node.id === id ? { ...node, data: { ...node.data, label } } : node))
    );
    
    if (selectedNode && selectedNode.id === id) {
      setSelectedNode((prevNode) => ({
        ...prevNode,
        data: { ...prevNode.data, label }
      }));
    }
  };

  // Handle dropping a new node onto the canvas
  const onDrop = (event) => {
    event.preventDefault();

    const reactFlowBounds = event.target.getBoundingClientRect();
    const type = event.dataTransfer.getData('application/reactflow');
    const position = {
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    };

    const newNode = {
      id: nodeIdCounter.toString(),  // Set node ID using counter
      type,
      position,
      data: { label: `text message ${messageCounter}` },  // Set label using counter
    };

    setNodes((nds) => nds.concat(newNode));
    setMessageCounter(messageCounter + 1);  // Increment message counter
    setNodeIdCounter(nodeIdCounter + 1);    // Increment node ID counter
    setErrorMessage('');  // Clear error message on successful drop
  };

  // Handle drag over the canvas
  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  // Validate the flow before saving
  const validateFlow = () => {
    if (nodes.length <= 1) return true;  // If there's only one node, it's valid

    for (let node of nodes) {
      const outgoingEdges = edges.filter(edge => edge.source === node.id);
      const incomingEdges = edges.filter(edge => edge.target === node.id);
      if (outgoingEdges.length === 0 && incomingEdges.length === 0) {
        setErrorMessage('Cannot save Flow');  // If any node has no connections, show error
        return false;
      }
    }
    setErrorMessage('');  // Clear error message if all nodes are connected
    return true;
  };

  // Save the flow if it's valid
  const saveFlow = () => {
    if (validateFlow()) {
      console.log('Flow saved!', { nodes, edges });
    }
  };

  // Handle going back from node settings
  const handleBack = () => {
    setSelectedNode(null);
  };

  return (
    <div className="app-main">
      <div className="app-top">
        {errorMessage && <span className="error-message">{errorMessage}</span>}  
        <button onClick={saveFlow}>Save Changes</button>
      </div>
      <ReactFlowProvider>
        <div className="app-container">
          <div
            className="react-flow-container"
            onDrop={onDrop}
            onDragOver={onDragOver}
          >
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              nodeTypes={nodeTypes}
              onNodeClick={onNodeClick}
              grid
            >
              <MiniMap />
              <Controls />
              <Background />
            </ReactFlow>
          </div>
          {selectedNode ? (
            <SettingsPanel
              selectedNode={selectedNode}
              onChange={onNodeChange}
              onBack={handleBack}
            />
          ) : (
            <NodesPanel />
          )}
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default App;
