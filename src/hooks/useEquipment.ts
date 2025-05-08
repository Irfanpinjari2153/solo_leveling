
import { useState } from 'react';
import { Hunter, Reward } from '../types/system';

export const useEquipment = (initialHunter: Hunter) => {
  const [hunter, setHunter] = useState<Hunter>(initialHunter);
  
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
    
    return hunter;
  };

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
    
    return hunter;
  };
  
  return { hunter, setHunter, equipReward, unequipReward };
};
