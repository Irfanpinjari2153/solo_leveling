
import React from 'react';
import { useSystem } from '../context/SystemContext';
import UpdateNameForm from './UpdateNameForm';
import { useIsMobile } from '../hooks/use-mobile';

const SystemHeader: React.FC = () => {
  const { hunter } = useSystem();
  const isMobile = useIsMobile();
  const completedQuestCount = hunter.tasks.filter((t) => t.completed).length;

  return (
    <div className="system-panel p-3 md:p-4 mb-3 md:mb-4 animate-fade-in">
      <div className="flex justify-between items-start md:items-center">
        <div>
          <UpdateNameForm />
          <p className="system-text text-xs md:text-sm">{hunter.rank} | Level {hunter.level}</p>
          <p className="text-blue-400 text-xs mt-1">Quests completed: {completedQuestCount}</p>
        </div>
        <div className={`flex ${isMobile ? 'flex-col items-end' : 'gap-3'}`}>
          <div className="flex items-center gap-1 mb-1 md:mb-0">
            <span className="text-yellow-400">💰</span>
            <span className="system-text">{hunter.gold}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-purple-400">✨</span>
            <span className="system-text">{hunter.shadowEssence}</span>
          </div>
        </div>
      </div>
      
      <div className="system-border"></div>
      
      <div className="mt-2">
        <div className="flex justify-between items-center mb-1">
          <span className="system-text text-xs">EXP</span>
          <span className="system-text text-xs">{hunter.exp} / {hunter.expToNextLevel}</span>
        </div>
        <div className="stat-bar">
          <div 
            className="stat-progress"
            style={{ width: `${(hunter.exp / hunter.expToNextLevel) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default SystemHeader;
