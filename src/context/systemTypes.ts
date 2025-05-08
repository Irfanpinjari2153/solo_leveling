
import { Hunter, Task, Reward, Path } from '../types/system';

export type EnergyLevel = 'low' | 'medium' | 'high';

export interface SystemContextProps {
  hunter: Hunter;
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
  completeTask: (taskId: string, proof?: string) => void;
  addTask: (task: Omit<Task, 'id'>) => void;
  equipReward: (rewardId: string) => void;
  unequipReward: (slot: string) => void;
  levelUp: () => void;
  updateName: (name: string) => void;
  addTaskProof: (taskId: string, proof: string) => void;
  selectPath: (path: Path) => void;
  pathSelected: boolean;
  energyLevel: EnergyLevel | null;
  setEnergyLevel: (level: EnergyLevel) => void;
  energyLevelSelected: boolean;
  resetDailyStatus: () => void;
}

export const initialHunter: Hunter = {
  name: 'Sung Jinwoo',
  level: 1,
  exp: 0,
  expToNextLevel: 100,
  gold: 0,
  shadowEssence: 0,
  stats: {
    strength: {
      name: 'Strength',
      value: 10,
      max: 999,
      icon: '💪',
    },
    agility: {
      name: 'Agility',
      value: 10,
      max: 999,
      icon: '🏃‍♂️',
    },
    vitality: {
      name: 'Vitality',
      value: 10,
      max: 999,
      icon: '❤️',
    },
    intelligence: {
      name: 'Intelligence',
      value: 10,
      max: 999,
      icon: '🧠',
    },
    perception: {
      name: 'Perception',
      value: 10,
      max: 999,
      icon: '👁️',
    },
  },
  tasks: [
    {
      id: crypto.randomUUID(),
      title: 'First Quest: Survive the Training',
      description: 'Complete your first task to prove your worth to the System.',
      difficulty: 'E',
      completed: false,
      expReward: 50,
      goldReward: 10,
      stats: {
        strength: 1,
      },
    },
    {
      id: crypto.randomUUID(),
      title: 'Learn the System',
      description: 'Understand how the System works by exploring all tabs.',
      difficulty: 'E',
      completed: false,
      expReward: 30,
      goldReward: 5,
      stats: {
        intelligence: 1,
      },
    },
  ],
  rewards: [],
  allies: [],
  equipment: {
    weapon: null,
    armor: null,
    accessory: null,
  },
  rank: 'E-Rank Hunter',
  consecutiveDays: 0,
};
