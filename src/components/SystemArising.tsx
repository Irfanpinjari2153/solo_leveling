
import React, { useEffect, useState } from 'react';
import { useSystem } from '../context/SystemContext';
import { Loader2, Shield, Check, ChevronRight } from 'lucide-react';

const SystemArising: React.FC = () => {
  const [showInitialMessage, setShowInitialMessage] = useState(true);
  const [showOptions, setShowOptions] = useState(false);
  const [showSystem, setShowSystem] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [nameError, setNameError] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [scanningComplete, setScanningComplete] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const { setSelectedTab, updateName } = useSystem();

  useEffect(() => {
    // Animate scanning progress
    const progressInterval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
    
    // Show the welcome message for 2 seconds
    const initialTimer = setTimeout(() => {
      setShowInitialMessage(false);
      setScanningComplete(true);
      
      // Show the options after a short delay
      setTimeout(() => setShowOptions(true), 800);
    }, 2000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(progressInterval);
    };
  }, []);

  const handleAccept = () => {
    // Validate player name
    if (!playerName.trim()) {
      setNameError('Please enter your name, Hunter.');
      return;
    }
    
    // Update player name in system
    updateName(playerName);
    
    setShowOptions(false);
    setIsTyping(true);
    
    // Show typing animation for 1.5 seconds
    setTimeout(() => {
      setIsTyping(false);
      // Show the system after typing animation
      setTimeout(() => setShowSystem(true), 500);
      // Set the initial tab
      setSelectedTab('status');
    }, 1500);
  };

  if (showSystem) {
    return null; // Don't render this component after system is accepted
  }

  return (
    <div className="fixed inset-0 bg-black bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900 via-black to-black flex items-center justify-center z-50">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-full h-full bg-grid-system opacity-10"></div>
      </div>
      
      {showInitialMessage && (
        <div className="text-center animate-fade-in relative z-10">
          <div className="mb-8 relative">
            <div className="absolute inset-0 flex items-center justify-center blur-lg">
              <div className="w-20 h-20 bg-system-blue rounded-full opacity-30 animate-pulse"></div>
            </div>
            <h1 className="text-3xl md:text-6xl text-system-blue font-jinwoo mb-6 tracking-wider animate-pulse-glow relative">
              SYSTEM DETECTED
            </h1>
          </div>
          
          <div className="space-y-6">
            <p className="text-gray-400 text-lg md:text-xl mb-8">Scanning potential host...</p>
            <div className="max-w-md mx-auto px-4">
              <div className="h-2 bg-gray-800 rounded-full mb-2 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-600 via-system-blue to-blue-400 rounded-full transition-all duration-300"
                  style={{ width: `${scanProgress}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Neural Scan</span>
                <span>{scanProgress}%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {scanningComplete && !showOptions && !isTyping && (
        <div className="text-center animate-fade-in max-w-lg mx-auto p-6 relative z-10">
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20">
            <div className="w-20 h-20 rounded-full bg-green-400/10 flex items-center justify-center animate-pulse">
              <Check size={28} className="text-green-400" />
            </div>
          </div>
          
          <h2 className="text-2xl md:text-4xl text-yellow-400 font-jinwoo mb-8 tracking-wider">
            HOST COMPATIBILITY: <span className="text-green-400">97.8%</span>
          </h2>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-800/30 p-3 rounded border border-gray-700/30">
                <div className="text-xs text-gray-400 mb-1">Neural Pattern</div>
                <div className="text-sm text-green-400">Compatible</div>
              </div>
              <div className="bg-gray-800/30 p-3 rounded border border-gray-700/30">
                <div className="text-xs text-gray-400 mb-1">Cognitive Index</div>
                <div className="text-sm text-green-400">Optimal</div>
              </div>
              <div className="bg-gray-800/30 p-3 rounded border border-gray-700/30">
                <div className="text-xs text-gray-400 mb-1">Physical Metrics</div>
                <div className="text-sm text-yellow-400">Above Average</div>
              </div>
              <div className="bg-gray-800/30 p-3 rounded border border-gray-700/30">
                <div className="text-xs text-gray-400 mb-1">Mental Capacity</div>
                <div className="text-sm text-green-400">Excellent</div>
              </div>
            </div>
            <p className="text-gray-400 text-lg">Preparing initialization...</p>
          </div>
          
          <div className="mt-8 flex justify-center items-center">
            <Loader2 className="h-10 w-10 text-system-blue animate-spin" />
          </div>
        </div>
      )}

      {isTyping && (
        <div className="text-center animate-fade-in">
          <Shield className="h-16 w-16 text-system-blue mx-auto mb-6 animate-pulse" />
          <h2 className="text-2xl md:text-4xl text-system-blue font-jinwoo mb-4">
            SYSTEM SYNCHRONIZING
          </h2>
          <div className="flex justify-center items-center gap-1">
            <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse"></div>
            <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse delay-150"></div>
            <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse delay-300"></div>
          </div>
        </div>
      )}

      {showOptions && (
        <div className="max-w-lg w-full mx-4 animate-fade-in relative z-10">
          <div className="system-panel p-6 shadow-system">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-system-blue/20 px-4 py-1 rounded-full text-system-blue text-xs border border-blue-500/30">
              SYSTEM v2.0.5
            </div>
            
            <h2 className="system-title text-xl mb-2 flex items-center">
              <span className="w-1 h-4 bg-system-blue mr-2"></span>
              SYSTEM CONNECTION ESTABLISHED
            </h2>
            <div className="system-border"></div>
            
            <div className="my-6">
              <label htmlFor="playerName" className="block text-gray-300 mb-2">
                Initialize User Registration:
              </label>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center">
                  <span className="text-system-blue mr-3 font-medium">NAME:</span>
                  <input 
                    id="playerName"
                    type="text"
                    value={playerName}
                    onChange={(e) => {
                      setPlayerName(e.target.value);
                      setNameError('');
                    }}
                    className="w-full bg-gray-800/80 border border-gray-700 px-3 py-2 rounded-md text-gray-100 focus:border-system-blue focus:outline-none focus:shadow-system"
                    placeholder="Enter Hunter Name"
                    autoFocus
                    maxLength={24}
                  />
                </div>
                <div className="text-xs text-gray-500 ml-14">
                  {playerName ? `${playerName.length}/24 characters` : '0/24 characters'}
                </div>
              </div>
              {nameError && <p className="text-red-400 text-sm mt-1 ml-14">{nameError}</p>}
            </div>
            
            <div className="relative">
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-system-blue/30"></div>
              <p className="text-gray-300 my-4 pl-3">
                <span className="text-system-blue font-medium block mb-2">SYSTEM NOTIFICATION:</span> 
                You have been selected as a potential host. Your compatibility rating exceeds minimum threshold requirements.
                Accept this connection to gain access to abilities beyond normal human limitations.
              </p>
            </div>
            
            <div className="system-border"></div>
            
            <div className="bg-gray-800/30 p-4 rounded-md my-4 border border-gray-700/30">
              <p className="text-center mb-2">
                <span className="text-yellow-400">⚠</span> <span className="text-gray-400">Warning:</span>
              </p>
              <p className="text-system-blue text-center font-medium">
                System integration is irreversible. Do you wish to proceed?
              </p>
            </div>
            
            <div className="flex gap-4 justify-center mt-6">
              <button 
                onClick={handleAccept} 
                className="system-button group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  Accept <ChevronRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 bg-system-blue/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </button>
              <button 
                onClick={() => setNameError('Please enter your name to continue.')} 
                className="bg-transparent border border-gray-600 px-4 py-2 rounded-md text-gray-400 hover:text-gray-300 hover:border-gray-500 transition-all"
              >
                Accept (No Choice)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SystemArising;
