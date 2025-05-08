
import React from 'react';
import { useSystem } from '../context/SystemContext';
import SystemHeader from './SystemHeader';
import SystemNavigation from './SystemNavigation';
import StatusTab from './StatusTab';
import QuestsTab from './QuestsTab';
import InventoryTab from './InventoryTab';
import AlliesTab from './ShadowsTab';
import StoreTab from './StoreTab';
import EnergyLevelSelector from './EnergyLevelSelector';
import { ArrowRight } from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';

const SystemContainer: React.FC = () => {
  const { selectedTab, energyLevelSelected } = useSystem();
  const isMobile = useIsMobile();

  const renderTabContent = () => {
    // Only render tab content if energy level has been selected
    if (!energyLevelSelected) {
      return null;
    }

    switch (selectedTab) {
      case 'status':
        return <StatusTab />;
      case 'quests':
        return <QuestsTab />;
      case 'inventory':
        return <InventoryTab />;
      case 'allies':
        return <AlliesTab />;
      case 'store':
        return <StoreTab />;
      default:
        return <StatusTab />;
    }
  };

  return (
    <div className={`${isMobile ? 'max-w-full' : 'max-w-4xl'} mx-auto p-2 md:p-4 animate-fade-in`}>
      <SystemHeader />
      {!energyLevelSelected && (
        <div className="animate-fade-in">
          <div className="mb-4 md:mb-6 text-center">
            <h2 className="text-system-blue text-xl md:text-3xl font-bold mb-2 md:mb-3">
              Configure Your System
            </h2>
            <p className="text-gray-300 max-w-lg mx-auto text-sm md:text-base">
              Your path has been chosen. Now, set your energy level to generate personalized quests for today.
            </p>
            <div className="w-16 md:w-20 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto my-3 md:my-4"></div>
          </div>
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg border border-gray-800 shadow-lg p-3 md:p-6 mx-auto">
            <EnergyLevelSelector />
          </div>
        </div>
      )}
      
      <div className={`${isMobile ? 'mt-2 sticky top-0 z-10' : 'mt-4'}`}>
        <SystemNavigation />
      </div>
      
      <div className={`mt-2 md:mt-4 ${energyLevelSelected ? "animate-fade-in" : ""}`}>
        {renderTabContent()}
      </div>
      
      {energyLevelSelected && (
        <div className="flex justify-center mt-4 md:mt-8 mb-2 md:mb-4">
          <div className="text-xs text-gray-500 flex items-center gap-1">
            <ArrowRight size={12} className="text-system-blue" />
            <span>Complete quests to unlock new abilities</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SystemContainer;
