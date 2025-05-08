
import React from 'react';
import { useSystem } from '../context/SystemContext';
import { useIsMobile } from '../hooks/use-mobile';

type EnergyLevel = 'low' | 'medium' | 'high';

const EnergyLevelSelector: React.FC = () => {
  const { setEnergyLevel, energyLevelSelected } = useSystem();
  const isMobile = useIsMobile();

  if (energyLevelSelected) {
    return null;
  }

  const handleSelectEnergy = (level: EnergyLevel) => {
    setEnergyLevel(level);
  };

  return (
    <div className="system-panel p-3 md:p-6 animate-fade-in mx-auto mb-4 md:mb-6">
      <h2 className="system-title text-lg md:text-xl mb-3 md:mb-4">System Status Check</h2>
      <div className="system-border mb-3 md:mb-4"></div>
      
      <p className="text-gray-300 mb-4 md:mb-6 text-sm md:text-base">
        What's your energy level today? The System will adjust your quests accordingly.
      </p>
      
      <div className={`grid ${isMobile ? 'grid-cols-1 gap-3' : 'grid-cols-3 gap-4'}`}>
        <button 
          onClick={() => handleSelectEnergy('low')}
          className="system-button bg-red-900/50 hover:bg-red-900/70 p-3 md:p-4 flex flex-row md:flex-col items-center justify-start md:justify-center"
        >
          <span className="text-xl md:text-2xl mr-3 md:mr-0 md:mb-2">😴</span>
          <div className="flex flex-col items-start md:items-center">
            <span className="system-text">Low Energy</span>
            <span className="text-xs text-gray-400 mt-0 md:mt-1">Easier quests</span>
          </div>
        </button>
        
        <button 
          onClick={() => handleSelectEnergy('medium')}
          className="system-button bg-blue-900/50 hover:bg-blue-900/70 p-3 md:p-4 flex flex-row md:flex-col items-center justify-start md:justify-center"
        >
          <span className="text-xl md:text-2xl mr-3 md:mr-0 md:mb-2">😊</span>
          <div className="flex flex-col items-start md:items-center">
            <span className="system-text">Medium Energy</span>
            <span className="text-xs text-gray-400 mt-0 md:mt-1">Balanced quests</span>
          </div>
        </button>
        
        <button 
          onClick={() => handleSelectEnergy('high')}
          className="system-button bg-green-900/50 hover:bg-green-900/70 p-3 md:p-4 flex flex-row md:flex-col items-center justify-start md:justify-center"
        >
          <span className="text-xl md:text-2xl mr-3 md:mr-0 md:mb-2">⚡</span>
          <div className="flex flex-col items-start md:items-center">
            <span className="system-text">High Energy</span>
            <span className="text-xs text-gray-400 mt-0 md:mt-1">Challenging quests</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default EnergyLevelSelector;
