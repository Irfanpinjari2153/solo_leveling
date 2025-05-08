
import React from 'react';
import { useSystem } from '../context/SystemContext';
import { useIsMobile } from '../hooks/use-mobile';

type NavItem = {
  id: string;
  label: string;
  icon: string;
};

const navItems: NavItem[] = [
  { id: 'status', label: 'Status', icon: '📊' },
  { id: 'quests', label: 'Quests', icon: '📜' },
  { id: 'inventory', label: 'Inventory', icon: '🎒' },
  { id: 'allies', label: 'Allies', icon: '👥' },
  { id: 'store', label: 'Store', icon: '🛒' },
];

const SystemNavigation: React.FC = () => {
  const { selectedTab, setSelectedTab } = useSystem();
  const isMobile = useIsMobile();

  return (
    <div className="system-panel p-2 flex justify-between md:justify-center items-center gap-1 md:gap-4 mb-4 animate-fade-in overflow-x-auto">
      {navItems.map((item) => (
        <button
          key={item.id}
          className={`flex items-center justify-center px-2 py-1 md:px-4 md:py-2 rounded text-xs md:text-sm transition-all duration-300 ${
            selectedTab === item.id
              ? 'bg-system-blue/20 text-white shadow-system'
              : 'text-system-blue hover:bg-slate-800/80'
          }`}
          onClick={() => setSelectedTab(item.id)}
        >
          <span className="md:mr-2 text-lg md:text-base">{item.icon}</span>
          <span className={isMobile ? "hidden" : "inline"}>{item.label}</span>
        </button>
      ))}
    </div>
  );
};

export default SystemNavigation;
