
import React from 'react';
import { useSystem } from '../context/SystemContext';

const AlliesTab: React.FC = () => {
  const { hunter } = useSystem();

  return (
    <div className="animate-fade-in">
      <div className="system-panel p-4">
        <h2 className="system-title text-lg">Hunter Allies</h2>
        <div className="system-border"></div>
        
        {hunter.allies.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <div className="w-32 h-32 bg-system-panel rounded-full flex items-center justify-center border border-blue-500/30 shadow-system">
              <span className="text-4xl">👤</span>
            </div>
            <div className="text-center">
              <p className="system-text mb-1">No Allies Recruited</p>
              <p className="text-sm text-gray-400">Complete Special Quests to recruit allies</p>
            </div>
            <button className="system-button mt-2" disabled>
              Recruit Ally <span className="ml-1 text-yellow-400">💰 500</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {hunter.allies.map(ally => (
              <div key={ally.id} className="system-panel p-3 hover:shadow-system transition-all duration-300">
                <div className="flex items-center">
                  <span className="text-3xl mr-3">{ally.icon}</span>
                  <div>
                    <h3 className="system-text">{ally.name}</h3>
                    <p className="text-xs text-gray-400">{ally.description}</p>
                  </div>
                </div>
                {ally.stats && (
                  <div className="mt-2 grid grid-cols-2 gap-1 text-xs">
                    {Object.entries(ally.stats).map(([stat, value]) => (
                      <div key={stat} className="flex items-center">
                        <span className="text-blue-400 mr-1">⬆️</span>
                        <span className="system-text">+{value} {stat.charAt(0).toUpperCase() + stat.slice(1)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AlliesTab;
