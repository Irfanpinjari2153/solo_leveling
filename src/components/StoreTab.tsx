import React from 'react';
import { useSystem } from '../context/SystemContext';
import { v4 as uuidv4 } from 'uuid';

const storeItems = [
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

const StoreTab: React.FC = () => {
  const { hunter, setHunter } = useSystem() as any; // Type assertion to access setHunter

  const purchaseItem = (itemId: string) => {
    const item = storeItems.find(i => i.id === itemId);
    if (!item) return;
    
    if (hunter.gold < item.price) {
      // Show insufficient funds message
      return;
    }
    
    // Add item to inventory
    const purchasedItem = {
      ...item,
      id: uuidv4(), // Generate unique ID for the item
    };
    
    // Special case for Shadow Essence
    if (itemId === 'shadow-essence') {
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
    <div className="animate-fade-in">
      <div className="system-panel p-4">
        <div className="flex justify-between items-center">
          <h2 className="system-title text-lg">System Store</h2>
          <div className="flex items-center">
            <span className="text-yellow-400 mr-1">💰</span>
            <span className="system-text">{hunter.gold} Gold</span>
          </div>
        </div>
        <div className="system-border"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {storeItems.map(item => (
            <div key={item.id} className="system-panel p-3 hover:shadow-system transition-all duration-300">
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <span className="text-2xl mr-2">{item.icon}</span>
                  <div>
                    <h3 className="system-text">{item.name}</h3>
                    <p className="text-xs text-gray-400">{item.description}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-yellow-400 mr-1">💰</span>
                  <span className="system-text">{item.price}</span>
                </div>
              </div>
              
              {item.stats && (
                <div className="mt-2 pl-10 grid grid-cols-2 gap-1 text-xs">
                  {Object.entries(item.stats).map(([stat, value]) => (
                    <div key={stat} className="flex items-center">
                      <span className="text-blue-400 mr-1">⬆️</span>
                      <span className="system-text">+{value} {stat.charAt(0).toUpperCase() + stat.slice(1)}</span>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="mt-3 flex justify-end">
                <button 
                  className={`system-button text-sm ${hunter.gold < item.price ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={() => purchaseItem(item.id)}
                  disabled={hunter.gold < item.price}
                >
                  {hunter.gold < item.price ? 'Not enough gold' : 'Purchase'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoreTab;
