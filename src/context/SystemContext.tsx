import React, { createContext, useContext, useState, useEffect } from 'react';
import { Hunter, Task, Reward, Path } from '../types/system';
import { generateFollowUpTask, generateDailyTasks } from '../utils/taskUtils';
import { EnergyLevel, SystemContextProps, initialHunter } from './systemTypes';
import { v4 as uuidv4 } from 'uuid';

const SystemContext = createContext<SystemContextProps | undefined>(undefined);

export const SystemProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hunter, setHunter] = useState<Hunter>({
    ...initialHunter,
    allies: [] // Update from shadows to allies
  });
  const [selectedTab, setSelectedTab] = useState<string>('status');
  const [pathSelected, setPathSelected] = useState<boolean>(false);
  const [energyLevel, setEnergyLevelState] = useState<EnergyLevel | null>(null);
  const [energyLevelSelected, setEnergyLevelSelected] = useState<boolean>(false);

  // Set energy level and trigger daily task generation
  const setEnergyLevel = (level: EnergyLevel) => {
    setEnergyLevelState(level);
    setEnergyLevelSelected(true);
  };

  // Reset daily status for a new day
  const resetDailyStatus = () => {
    setEnergyLevelSelected(false);
    setEnergyLevelState(null);
  };

  // Generate daily tasks when path and energy level are selected
  useEffect(() => {
    if (hunter.path && energyLevelSelected) {
      const updatedTasks = generateDailyTasks(hunter.tasks, energyLevel, hunter.path);
      setHunter(prevHunter => ({
        ...prevHunter,
        tasks: updatedTasks,
      }));
    }
  }, [hunter.path, energyLevelSelected, energyLevel]);
  
  // Complete a task
  const completeTask = (taskId: string, proof?: string) => {
    const taskIndex = hunter.tasks.findIndex(task => task.id === taskId);
    if (taskIndex === -1) return;

    const task = hunter.tasks[taskIndex];
    if (task.completed) return;

    const updatedTasks = [...hunter.tasks];
    updatedTasks[taskIndex] = { ...task, completed: true, proof: proof || '' };

    // Update stats based on task completion
    const updatedStats = { ...hunter.stats };
    Object.entries(task.stats).forEach(([stat, value]) => {
      if (stat in updatedStats) {
        const currentStat = updatedStats[stat as keyof typeof updatedStats];
        updatedStats[stat as keyof typeof updatedStats] = {
          ...currentStat,
          value: Math.min(currentStat.value + value, currentStat.max),
        };
      }
    });

    // Manage experience and leveling
    let newExp = hunter.exp + task.expReward;
    let newLevel = hunter.level;
    let newExpToNextLevel = hunter.expToNextLevel;
    
    while (newExp >= newExpToNextLevel) {
      newExp -= newExpToNextLevel;
      newLevel++;
      newExpToNextLevel = Math.floor(newExpToNextLevel * 1.5);
    }

    // Update consecutive days count for daily tasks
    const consecutiveDays = task.isDaily 
      ? hunter.consecutiveDays + 1 
      : hunter.consecutiveDays;
      
    // Generate a follow-up task if it's not a daily task
    const followUpTask = generateFollowUpTask(task, hunter.path?.name);
    const newTasks = followUpTask ? [...updatedTasks, followUpTask] : updatedTasks;

    setHunter({
      ...hunter,
      tasks: newTasks,
      stats: updatedStats,
      exp: newExp,
      level: newLevel,
      expToNextLevel: newExpToNextLevel,
      gold: hunter.gold + task.goldReward,
      consecutiveDays,
    });
  };

  // Add proof to a task
  const addTaskProof = (taskId: string, proof: string) => {
    const updatedTasks = hunter.tasks.map(task =>
      task.id === taskId ? { ...task, proof } : task
    );
    setHunter({ ...hunter, tasks: updatedTasks });
  };

  // Add a new task
  const addTask = (task: Omit<Task, 'id'>) => {
    const newTask: Task = {
      ...task,
      id: crypto.randomUUID(),
    };
    setHunter({
      ...hunter,
      tasks: [...hunter.tasks, newTask],
    });
  };

  // Equipment management
  const equipReward = (rewardId: string) => {
    const reward = hunter.rewards.find(r => r.id === rewardId);
    if (!reward) return;

    const type = reward.type === 'equipment' ? 
      (reward.name.toLowerCase().includes('armor') ? 'armor' : 
       reward.name.toLowerCase().includes('accessory') ? 'accessory' : 'weapon') : 
      null;

    if (!type) return;

    const updatedEquipment = { ...hunter.equipment };
    const updatedRewards = [...hunter.rewards];

    if (updatedEquipment[type]) {
      const currentEquipped = updatedEquipment[type];
      if (currentEquipped) {
        const currentIndex = updatedRewards.findIndex(r => r.id === currentEquipped.id);
        if (currentIndex !== -1) {
          updatedRewards[currentIndex] = { ...updatedRewards[currentIndex], equipped: false };
        }
      }
    }

    updatedEquipment[type] = reward;
    const rewardIndex = updatedRewards.findIndex(r => r.id === rewardId);
    if (rewardIndex !== -1) {
      updatedRewards[rewardIndex] = { ...updatedRewards[rewardIndex], equipped: true };
    }

    setHunter({
      ...hunter,
      equipment: updatedEquipment,
      rewards: updatedRewards,
    });
  };

  // Unequip an item
  const unequipReward = (slot: string) => {
    const updatedEquipment = { ...hunter.equipment };
    const updatedRewards = [...hunter.rewards];

    if (updatedEquipment[slot]) {
      const currentEquipped = updatedEquipment[slot];
      if (currentEquipped) {
        const currentIndex = updatedRewards.findIndex(r => r.id === currentEquipped.id);
        if (currentIndex !== -1) {
          updatedRewards[currentIndex] = { ...updatedRewards[currentIndex], equipped: false };
        }
      }
      updatedEquipment[slot] = null;
    }

    setHunter({
      ...hunter,
      equipment: updatedEquipment,
      rewards: updatedRewards,
    });
  };

  // Level up the hunter
  const levelUp = () => {
    setHunter({
      ...hunter,
      level: hunter.level + 1,
      expToNextLevel: Math.floor(hunter.expToNextLevel * 1.5),
    });
  };

  // Update the hunter's name
  const updateName = (name: string) => {
    setHunter({
      ...hunter,
      name,
    });
  };

  // Select a path for the hunter
  const selectPath = (path: Path) => {
    setHunter({
      ...hunter,
      path,
    });
    setPathSelected(true);
  };

  const storeItems: Reward[] = [
    {
      id: 'vitality-potion',
      name: 'Vitality Potion',
      description: 'Restores health and increases stamina',
      type: 'consumable',
      rarity: 'common',
      icon: '🧪',
      price: 50,
      stats: {
        vitality: 5,
      },
    },
    {
      id: 'hunters-blade',
      name: 'Hunter\'s Blade',
      description: 'Standard weapon for beginner hunters',
      type: 'equipment',
      rarity: 'common',
      icon: '🗡️',
      price: 100,
      stats: {
        strength: 3,
      },
    },
    {
      id: 'perception-amulet',
      name: 'Perception Amulet',
      description: 'Enhances awareness of surroundings',
      type: 'equipment',
      rarity: 'uncommon',
      icon: '🔮',
      price: 200,
      stats: {
        perception: 5,
        intelligence: 2,
      },
    },
    {
      id: 'training-manual',
      name: 'Advanced Training Manual',
      description: 'Contains specialized hunting techniques',
      type: 'consumable',
      rarity: 'rare',
      icon: '📚',
      price: 300,
      stats: {
        intelligence: 8,
      },
    },
    {
      id: 'hunters-armor',
      name: 'Hunter\'s Armor',
      description: 'Basic protection for dangerous hunts',
      type: 'equipment',
      rarity: 'uncommon',
      icon: '🛡️',
      price: 250,
      stats: {
        vitality: 5,
        agility: 2,
      },
    },
    {
      id: 'rank-promotion',
      name: 'Rank Promotion Test',
      description: 'Submit for evaluation to improve your rank',
      type: 'consumable',
      rarity: 'rare',
      icon: '📜',
      price: 500,
    },
  ];

  // Purchase item from store
  const purchaseItem = (itemId: string) => {
    const item = storeItems.find(i => i.id === itemId);
    if (!item) return;
    
    if (hunter.gold < item.price) {
      // Show insufficient funds message
      return;
    }
    
    // Add item to inventory
    const purchasedItem: Reward = {
      ...item,
      id: uuidv4(), // Generate unique ID for the item
    };
    
    // Special case for Rank Promotion item
    if (itemId === 'rank-promotion') {
      setHunter({
        ...hunter,
        gold: hunter.gold - item.price,
        shadowEssence: hunter.shadowEssence + 100,
      });
    } else {
      setHunter({
        ...hunter,
        gold: hunter.gold - item.price,
        rewards: [...hunter.rewards, purchasedItem],
      });
    }
  };

  return (
    <SystemContext.Provider
      value={{
        hunter,
        selectedTab,
        setSelectedTab,
        completeTask,
        addTask,
        equipReward,
        unequipReward,
        levelUp,
        updateName,
        addTaskProof,
        selectPath,
        pathSelected,
        energyLevel,
        setEnergyLevel,
        energyLevelSelected,
        resetDailyStatus,
      }}
    >
      {children}
    </SystemContext.Provider>
  );
};

export const useSystem = () => {
  const context = useContext(SystemContext);
  if (context === undefined) {
    throw new Error('useSystem must be used within a SystemProvider');
  }
  return context;
};
