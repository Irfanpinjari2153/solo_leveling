
import React from 'react';
import { useSystem } from '../context/SystemContext';
import { Reward } from '../types/system';
import { useIsMobile } from '../hooks/use-mobile';

const getRarityColor = (rarity: string): string => {
  switch (rarity) {
    case 'legendary': return 'text-orange-400 border-orange-400/50';
    case 'epic': return 'text-purple-400 border-purple-400/50';
    case 'rare': return 'text-blue-400 border-blue-400/50';
    case 'uncommon': return 'text-green-400 border-green-400/50';
    default: return 'text-gray-400 border-gray-400/50';
  }
};

const InventoryItem: React.FC<{ item: Reward; onEquip: () => void }> = ({ item, onEquip }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className={`system-panel p-3 cursor-pointer hover:shadow-system transition-all duration-300 
      ${item.equipped ? 'ring-1 ring-system-blue' : ''}`}
      onClick={onEquip}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center">
            <span className="text-xl md:text-2xl mr-2">{item.icon}</span>
            <div>
              <h3 className={`font-medium text-sm md:text-base ${getRarityColor(item.rarity)}`}>{item.name}</h3>
              <p className="text-xs text-gray-400">{item.type.charAt(0).toUpperCase() + item.type.slice(1)}</p>
            </div>
          </div>
          <p className="text-gray-300 mt-1 text-xs">{item.description}</p>
        </div>
        {item.equipped && (
          <span className="text-xs bg-system-blue/20 px-2 py-1 rounded-full text-system-blue whitespace-nowrap ml-1">
            Equipped
          </span>
        )}
      </div>
      
      {item.stats && Object.keys(item.stats).length > 0 && (
        <>
          <div className="system-border mt-2 mb-2"></div>
          <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-2 text-xs`}>
            {Object.entries(item.stats).map(([stat, value]) => (
              <div key={stat} className="flex items-center">
                <span className="text-blue-400 mr-1">⬆️</span>
                <span className="system-text">+{value} {stat.charAt(0).toUpperCase() + stat.slice(1)}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const InventoryTab: React.FC = () => {
  const { hunter, equipReward } = useSystem();
  const isMobile = useIsMobile();
  
  // Group items by type
  const groupedItems = hunter.rewards.reduce((acc, item) => {
    const type = item.type;
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(item);
    return acc;
  }, {} as Record<string, Reward[]>);

  return (
    <div className="animate-fade-in">
      <div className="system-panel p-3 md:p-4 mb-3 md:mb-4">
        <div className="flex justify-between items-center">
          <h2 className="system-title text-base md:text-lg">Inventory</h2>
          <span className="text-gray-400 text-xs md:text-sm">{hunter.rewards.length} items</span>
        </div>
        <div className="system-border"></div>
        
        {hunter.rewards.length === 0 ? (
          <div className="text-center py-6 md:py-8">
            <p className="text-gray-400">Your inventory is empty</p>
            <p className="text-sm text-gray-500 mt-2">Complete quests to earn rewards</p>
          </div>
        ) : (
          <div className="mt-3 md:mt-4">
            {Object.entries(groupedItems).map(([type, items]) => (
              <div key={type} className="mb-4 md:mb-6">
                <h3 className="system-text mb-2 capitalize">{type}s</h3>
                <div className="grid grid-cols-1 gap-3">
                  {items.map(item => (
                    <InventoryItem 
                      key={item.id} 
                      item={item} 
                      onEquip={() => equipReward(item.id)} 
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InventoryTab;
