
import React, { useState } from "react";
import { useSystem } from "../context/SystemContext";

const UpdateNameForm: React.FC = () => {
  const { hunter, updateName } = useSystem();
  const [editing, setEditing] = useState(false);
  const [input, setInput] = useState(hunter.name);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    
    if (!trimmedInput || trimmedInput === hunter.name) {
      setEditing(false);
      setInput(hunter.name);
      return;
    }
    
    updateName(trimmedInput);
    setShowConfirmation(true);
    setEditing(false);
    
    // Hide confirmation message after 2 seconds
    setTimeout(() => {
      setShowConfirmation(false);
    }, 2000);
  };

  return (
    <div className="mb-3 relative">
      {editing ? (
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <input
            className="border rounded px-3 py-1.5 bg-gray-900 text-white flex-1 focus:border-system-blue focus:outline-none"
            maxLength={24}
            value={input}
            onChange={e => setInput(e.target.value)}
            autoFocus
          />
          <div className="flex space-x-2">
            <button 
              type="submit" 
              className="system-button py-1 px-3 text-xs flex items-center"
            >
              <span>Save</span>
            </button>
            <button 
              type="button" 
              className="text-xs border border-gray-700 px-3 py-1 rounded hover:bg-gray-800 transition-colors"
              onClick={() => {
                setEditing(false);
                setInput(hunter.name);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="flex items-center gap-3">
          <div className="flex items-center">
            <span className="text-xs text-gray-500 mr-2">HUNTER:</span>
            <span className="system-title text-xl md:text-2xl">{hunter.name}</span>
            {showConfirmation && (
              <span className="text-green-400 text-xs ml-3 animate-fade-in">
                Name updated successfully
              </span>
            )}
          </div>
          <button
            className="system-button text-xs px-2 py-1 flex items-center"
            onClick={() => setEditing(true)}
          >
            <span className="mr-1">✏️</span>
            <span>Edit</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default UpdateNameForm;
