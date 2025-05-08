
import React from 'react';
import { useSystem } from '../context/SystemContext';
import UpdateNameForm from './UpdateNameForm';

const StatusTab: React.FC = () => {
  const { hunter, energyLevel } = useSystem();
  const stats = Object.values(hunter.stats);
  const completedQuestCount = hunter.tasks.filter(t => t.completed).length;

  const getEnergyEmoji = () => {
    switch (energyLevel) {
      case 'low': return '😴';
      case 'medium': return '😊';
      case 'high': return '⚡';
      default: return '❓';
    }
  };

  return (
    <div className="system-panel p-4 md:p-6 animate-fade-in">
      <div className="mb-6 bg-gradient-to-br from-gray-800/50 to-gray-900/80 p-5 rounded-lg shadow-inner border border-gray-800/50">
        <UpdateNameForm />
      </div>
      
      <div className="flex justify-between items-center mb-6 bg-gray-800/30 p-3 rounded-lg border border-gray-700/30">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-system-blue/20 flex items-center justify-center text-system-blue">
            {completedQuestCount}
          </span>
          <p className="text-blue-300 text-sm">
            Completed Quests
          </p>
        </div>
        {hunter.path && (
          <div className="flex items-center gap-2">
            <p className="text-system-blue text-sm">
              <span className="font-bold">{hunter.path.name}</span> Path
            </p>
          </div>
        )}
      </div>
      
      {energyLevel && (
        <div className="mb-6 bg-gradient-to-r from-gray-800/70 to-gray-900/70 p-3 rounded-lg flex items-center border-l-4 border-system-blue/50">
          <span className="mr-3 text-2xl">{getEnergyEmoji()}</span>
          <div>
            <span className="text-gray-400 text-xs uppercase">Energy Level</span>
            <p className="text-gray-200 font-medium capitalize">{energyLevel}</p>
          </div>
        </div>
      )}
      
      {hunter.path && (
        <div className="mb-6 bg-gradient-to-br from-gray-800/50 to-gray-900/80 p-5 rounded-lg border border-gray-800/50 shadow-lg">
          <div className="flex justify-between items-center mb-3">
            <h3 className="system-text text-lg">{hunter.path.name} Path</h3>
            <span className="px-2 py-1 rounded-full bg-system-blue/20 text-xs text-system-blue">
              Level {hunter.level}
            </span>
          </div>
          <p className="text-gray-300 text-sm mb-4">{hunter.path.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {hunter.path.statGrowth.map((stat, index) => (
              <span key={index} className="px-2 py-1 rounded bg-system-blue/20 text-xs text-system-blue">
                {stat}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="bg-gray-900/70 p-2 rounded border border-gray-800/50">
              <p className="text-xs text-gray-400 mb-1">
                Consecutive Days
              </p>
              <p className="text-system-blue font-bold text-lg">{hunter.consecutiveDays}</p>
            </div>
            <div className="bg-gray-900/70 p-2 rounded border border-gray-800/50">
              <p className="text-xs text-gray-400 mb-1">
                Next Bonus
              </p>
              <p className="text-amber-400 font-bold">{hunter.path.bonus.name}</p>
            </div>
          </div>
        </div>
      )}
      
      <h2 className="system-title text-lg mb-4">Hunter Status</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-gray-800/20 p-3 rounded-lg border border-gray-700/30">
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center">
                  <span className="mr-2 text-xl">{stat.icon}</span>
                  <span className="system-text">{stat.name}</span>
                </div>
                <span className="system-text">{stat.value} / {stat.max}</span>
              </div>
              <div className="stat-bar h-2 rounded-full bg-gray-700">
                <div 
                  className="stat-progress h-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-400"
                  style={{ width: `${(stat.value / stat.max) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/50 rounded-lg border border-gray-800/50 shadow-lg p-4">
          <h3 className="system-text mb-3 flex items-center">
            <span className="w-1 h-4 bg-system-blue mr-2"></span>
            Equipment Effects
          </h3>
          <div className="system-border"></div>
          <div className="mt-3 space-y-2">
            {Object.entries(hunter.equipment).map(([slot, item]) => (
              <div key={slot} className="flex justify-between items-center p-2 bg-gray-900/30 rounded">
                <span className="text-gray-400 capitalize">{slot}:</span>
                <span className="system-text">
                  {item ? (
                    <span className="flex items-center gap-1">
                      <span className="text-lg mr-1">{item.icon}</span>
                      {item.name}
                    </span>
                  ) : (
                    <span className="text-gray-600 italic">Not Equipped</span>
                  )}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-gray-800">
            <h3 className="system-text mb-2 flex items-center">
              <span className="w-1 h-4 bg-system-blue mr-2"></span>
              Total Bonus
            </h3>
            <div className="mt-2 space-y-2">
              {Object.entries(hunter.stats).map(([statName, _]) => {
                const totalBonus = Object.values(hunter.equipment)
                  .filter(Boolean)
                  .reduce((sum, item) => {
                    return sum + (item?.stats?.[statName] || 0);
                  }, 0);
                return totalBonus > 0 ? (
                  <div key={statName} className="flex justify-between bg-gray-900/30 p-2 rounded">
                    <span className="text-gray-400 capitalize">{statName}:</span>
                    <span className="text-green-400">+{totalBonus}</span>
                  </div>
                ) : null;
              })}
              {!Object.values(hunter.equipment).some(Boolean) && (
                <p className="text-gray-400 text-sm italic text-center py-2">No equipment bonuses</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusTab;
