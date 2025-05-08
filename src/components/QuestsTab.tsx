import React, { useState } from 'react';
import { useSystem } from '../context/SystemContext';
import { Task } from '../types/system';
import ProofModal from "./ProofModal";

const getDifficultyColor = (difficulty: string): string => {
  switch (difficulty) {
    case 'S': return 'text-purple-400';
    case 'A': return 'text-red-400';
    case 'B': return 'text-orange-400';
    case 'C': return 'text-yellow-400';
    case 'D': return 'text-green-400';
    case 'E': return 'text-blue-400';
    default: return 'text-gray-400';
  }
};

const QuestItem: React.FC<{ task: Task; onComplete: () => void }> = ({ task, onComplete }) => {
  const { energyLevel } = useSystem();
  
  const getEnergyTag = () => {
    if (!task.isDaily || !energyLevel) return null;
    
    return (
      <span className={`ml-1 text-xs px-2 py-0.5 rounded-full ${
        energyLevel === 'low' ? 'bg-red-900/40 text-red-300' : 
        energyLevel === 'high' ? 'bg-green-900/40 text-green-300' : 
        'bg-blue-900/40 text-blue-300'
      }`}>
        {energyLevel === 'low' ? 'Easy' : 
         energyLevel === 'high' ? 'Challenge' : 
         'Regular'}
      </span>
    );
  };
  
  return (
    <div className={`system-panel p-4 mb-4 transition-all duration-300 ${
      task.completed ? 'opacity-70' : 'hover:shadow-system'
    } ${task.isDaily ? 'border-l-4 border-system-blue' : ''}`}>
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center flex-wrap">
            <span className={`font-semibold mr-2 ${getDifficultyColor(task.difficulty)}`}>
              {task.difficulty}-Rank
            </span>
            <h3 className="system-text">{task.title}</h3>
            {task.isDaily && (
              <span className="ml-2 text-xs px-2 py-0.5 bg-system-blue/30 text-system-blue rounded-full">
                Daily
              </span>
            )}
            {getEnergyTag()}
          </div>
          <p className="text-gray-300 mt-1 text-sm">{task.description}</p>
        </div>
        <button
          onClick={onComplete}
          disabled={task.completed}
          className={`system-button text-sm ${
            task.completed 
              ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
              : ''
          }`}
        >
          {task.completed ? 'Completed' : 'Complete'}
        </button>
      </div>
      <div className="system-border mt-3 mb-3"></div>
      <div className="flex flex-wrap gap-3 text-sm">
        <div className="flex items-center">
          <span className="text-yellow-400 mr-1">💰</span>
          <span className="system-text">{task.goldReward} Gold</span>
        </div>
        <div className="flex items-center">
          <span className="text-green-400 mr-1">✨</span>
          <span className="system-text">{task.expReward} EXP</span>
        </div>
        {Object.entries(task.stats).map(([stat, value]) => (
          <div key={stat} className="flex items-center">
            <span className="text-blue-400 mr-1">⬆️</span>
            <span className="system-text">+{value} {stat.charAt(0).toUpperCase() + stat.slice(1)}</span>
          </div>
        ))}
        {task.proof && (
          <div className="flex flex-col w-full mt-2">
            <span className="text-xs text-blue-300">Proof:</span>
            <span className="text-xs text-gray-300 bg-gray-800 p-2 rounded">{task.proof}</span>
          </div>
        )}
      </div>
    </div>
  );
};

const QuestsTab: React.FC = () => {
  const { hunter, completeTask } = useSystem();
  
  const dailyTasks = hunter.tasks.filter(task => task.isDaily && !task.completed);
  const regularActiveTasks = hunter.tasks.filter(task => !task.isDaily && !task.completed);
  const completedTasks = hunter.tasks.filter(task => task.completed);

  const [proofQuestId, setProofQuestId] = useState<string | null>(null);

  const handleProofSubmit = (proof: string) => {
    if (proofQuestId) {
      completeTask(proofQuestId, proof);
      setProofQuestId(null);
    }
  };

  return (
    <div className="animate-fade-in">
      <ProofModal
        open={!!proofQuestId}
        onSubmit={handleProofSubmit}
        onClose={() => setProofQuestId(null)}
      />

      {dailyTasks.length > 0 && (
        <div className="system-panel p-4 mb-4">
          <h2 className="system-title text-lg">Daily Quests</h2>
          <div className="system-border"></div>
          <div className="mt-3 space-y-3">
            {dailyTasks.map(task => (
              <QuestItem
                key={task.id}
                task={task}
                onComplete={() => setProofQuestId(task.id)}
              />
            ))}
          </div>
        </div>
      )}

      <div className="system-panel p-4 mb-4">
        <h2 className="system-title text-lg">Active Quests</h2>
        <div className="system-border"></div>
        {regularActiveTasks.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-gray-400">No active quests</p>
            <p className="text-sm text-gray-500 mt-2">Complete daily quests to unlock more</p>
          </div>
        ) : (
          <div className="mt-3 space-y-3">
            {regularActiveTasks.map(task => (
              <QuestItem
                key={task.id}
                task={task}
                onComplete={() => setProofQuestId(task.id)}
              />
            ))}
          </div>
        )}
      </div>
      
      {completedTasks.length > 0 && (
        <div className="system-panel p-4">
          <h2 className="system-title text-lg">Completed Quests</h2>
          <div className="system-border"></div>
          <div className="mt-3 space-y-3">
            {completedTasks.map(task => (
              <QuestItem
                key={task.id}
                task={task}
                onComplete={() => {}}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestsTab;
