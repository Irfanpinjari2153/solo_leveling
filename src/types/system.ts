
export type Stat = {
  name: string;
  value: number;
  max: number;
  icon: string;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  difficulty: 'E' | 'D' | 'C' | 'B' | 'A' | 'S';
  completed: boolean;
  expReward: number;
  goldReward: number;
  stats: {
    [key: string]: number;
  };
  deadline?: Date;
  isHidden?: boolean;
  proof?: string; // added: proof note or string
  isDaily?: boolean;
};

export type Reward = {
  id: string;
  name: string;
  description: string;
  type: 'item' | 'equipment' | 'ally' | 'consumable';
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  icon: string;
  price?: number;
  stats?: {
    [key: string]: number;
  };
  equipped?: boolean;
};

export type Path = {
  id: string;
  name: string;
  description: string;
  dailyTasks: string[];
  statGrowth: string[];
  bonus: {
    name: string;
    description: string;
    unlockRequirement: string;
  };
};

export type Hunter = {
  name: string;
  level: number;
  exp: number;
  expToNextLevel: number;
  gold: number;
  shadowEssence: number;
  stats: {
    strength: Stat;
    agility: Stat;
    vitality: Stat;
    intelligence: Stat;
    perception: Stat;
  };
  tasks: Task[];
  rewards: Reward[];
  allies: Reward[];
  equipment: {
    [slot: string]: Reward | null;
  };
  rank: string;
  path?: Path;
  consecutiveDays: number;
};
