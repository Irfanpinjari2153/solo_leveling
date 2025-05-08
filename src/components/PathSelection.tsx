
import React, { useState } from 'react';
import { Path } from '../types/system';
import { useSystem } from '../context/SystemContext';
import { Award, BookOpen, Brush, Compass, Briefcase, Star } from 'lucide-react';

const paths: Path[] = [
  {
    id: '1',
    name: 'The Warrior',
    description: 'Train your body. Push your limits. Become unstoppable.',
    dailyTasks: [
      'Complete 50 pushups',
      'Walk or jog 4,000 steps',
      'Drink 2.5L of water',
      'Log your meals and track protein intake'
    ],
    statGrowth: ['Strength', 'Endurance', 'Vitality'],
    bonus: {
      name: 'Combat Focus',
      description: 'Enhanced physical performance during training sessions',
      unlockRequirement: 'Unlock after 7 active days'
    }
  },
  {
    id: '2',
    name: 'The Scholar',
    description: 'Your mind is your blade. Learn. Apply. Repeat.',
    dailyTasks: [
      'Study a topic for 45 minutes (coding, language, etc.)',
      'Solve 3 practice questions or problems',
      'Write a 3-sentence summary of what you learned',
      'Avoid phone distractions for 1 focused hour'
    ],
    statGrowth: ['Intelligence', 'Memory', 'Focus'],
    bonus: {
      name: 'Rapid Recall',
      description: 'Enhanced memory retention and recall during study sessions',
      unlockRequirement: 'Unlock after 10 study sessions'
    }
  },
  {
    id: '3',
    name: 'The Creator',
    description: 'Shape ideas into reality. Your imagination is your power.',
    dailyTasks: [
      'Design for 30 minutes (UI/UX, sketch, music, etc.)',
      'Post/share one creative output (even a draft)',
      'Research inspiration for 15 minutes',
      'Reflect: Write a note about your mood and mindset today'
    ],
    statGrowth: ['Creativity', 'Inspiration', 'Precision'],
    bonus: {
      name: 'Creative Surge',
      description: 'Heightened creative flow and inspiration during creation sessions',
      unlockRequirement: 'Unlock when 5 works are completed'
    }
  },
  {
    id: '4',
    name: 'The Entrepreneur',
    description: 'Build your empire. One client, one product, one idea at a time.',
    dailyTasks: [
      'Reach out to 1 potential customer/client',
      'Create or update one business asset (logo, page, pitch)',
      'Read a business/marketing insight (10 minutes)',
      'Track income/expenses or set a financial micro-goal'
    ],
    statGrowth: ['Charisma', 'Strategy', 'Persuasion'],
    bonus: {
      name: 'Negotiator\'s Edge',
      description: 'Enhanced persuasion and deal-making abilities',
      unlockRequirement: 'Unlock after 3 client deals'
    }
  },
  {
    id: '5',
    name: 'The Explorer',
    description: 'Break your routine. Face new challenges. Grow from within.',
    dailyTasks: [
      'Try one new activity (food, location, idea)',
      'Journal your thoughts or gratitude (5 minutes)',
      'Disconnect from screens for 30 minutes',
      'Talk to someone you don\'t usually engage with'
    ],
    statGrowth: ['Adaptability', 'Wisdom', 'Confidence'],
    bonus: {
      name: 'Intuition Boost',
      description: 'Enhanced intuition and decision-making in unfamiliar situations',
      unlockRequirement: 'Unlock after 10 unique experiences'
    }
  },
  {
    id: '6',
    name: 'The Hybrid',
    description: 'You defy boundaries. Combine your passions. Shape your legend.',
    dailyTasks: [
      'Code for 30 minutes (Scholar)',
      'Do 30 squats (Warrior)',
      'Sketch a UI concept (Creator)',
      'Post 1 motivational story on Instagram (Entrepreneur)'
    ],
    statGrowth: ['Adaptive based on your selections'],
    bonus: {
      name: 'Omnipath Mode',
      description: 'The ability to rapidly switch between different skill sets',
      unlockRequirement: 'Unlock after 7 consistent hybrid days'
    }
  }
];

const PathSelection: React.FC = () => {
  const { selectPath } = useSystem();
  const [showIntro, setShowIntro] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  const handlePathSelect = (path: Path) => {
    setFadeOut(true);
    setTimeout(() => {
      selectPath(path);
    }, 1000);
  };

  const skipIntro = () => {
    setShowIntro(false);
  };

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 10000); // Skip intro after 10 seconds
    
    return () => clearTimeout(timer);
  }, []);

  // Map path IDs to their respective icons
  const pathIcons = {
    '1': <Award className="w-8 h-8 text-red-400" />,
    '2': <BookOpen className="w-8 h-8 text-blue-400" />,
    '3': <Brush className="w-8 h-8 text-purple-400" />,
    '4': <Briefcase className="w-8 h-8 text-amber-400" />,
    '5': <Compass className="w-8 h-8 text-green-400" />,
    '6': <Star className="w-8 h-8 text-pink-400" />,
  };

  const getPathBackground = (pathId: string) => {
    const backgrounds = {
      '1': 'bg-gradient-to-br from-red-900/30 to-red-700/10',
      '2': 'bg-gradient-to-br from-blue-900/30 to-blue-700/10',
      '3': 'bg-gradient-to-br from-purple-900/30 to-purple-700/10',
      '4': 'bg-gradient-to-br from-amber-900/30 to-amber-700/10',
      '5': 'bg-gradient-to-br from-green-900/30 to-green-700/10',
      '6': 'bg-gradient-to-br from-pink-900/30 to-pink-700/10',
    };
    return backgrounds[pathId as keyof typeof backgrounds] || '';
  };

  if (showIntro) {
    return (
      <div className={`fixed inset-0 flex items-center justify-center bg-black z-50 ${fadeOut ? 'animate-fade-out' : 'animate-fade-in'}`}>
        <div className="max-w-lg text-center p-8">
          <h1 className="text-system-blue text-3xl md:text-5xl font-bold mb-8 animate-pulse-glow">
            System Awakening Protocol Initiated
          </h1>
          <div className="space-y-6 text-gray-300">
            <p className="mb-6 text-2xl font-jinwoo">
              "Hunter {/* Use the actual name here */}... You have been chosen."
            </p>
            <p className="mb-6 text-lg">
              The power to evolve is now at your fingertips. But the System does not awaken for those who wander aimlessly.
            </p>
            <p className="mb-6 text-lg">
              You must decide your path. Your reason.
            </p>
            <p className="text-2xl text-system-blue font-jinwoo">
              Why have you summoned the System?
            </p>
          </div>
          <button onClick={skipIntro} className="mt-12 system-button px-8 py-3 text-lg">
            Continue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gray-900 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-900 to-black p-4 md:p-8 ${fadeOut ? 'animate-fade-out' : 'animate-fade-in'}`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-system-blue text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
            Choose Your Purpose
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto mb-6"></div>
          <p className="text-gray-300 mb-2 max-w-2xl mx-auto text-lg">
            Select your Path below. Your quests, stats, and progression will be shaped by your choice.
          </p>
          <p className="text-system-blue text-sm max-w-2xl mx-auto">
            You can only begin once the System aligns with your will.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paths.map((path) => (
            <div 
              key={path.id} 
              className={`system-panel p-6 hover:shadow-system transition-all duration-300 ${
                hoveredPath === path.id ? 'transform scale-105' : ''
              } ${getPathBackground(path.id)}`}
              onMouseEnter={() => setHoveredPath(path.id)}
              onMouseLeave={() => setHoveredPath(null)}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="system-title text-xl">
                  {path.name}
                </h2>
                {pathIcons[path.id as keyof typeof pathIcons]}
              </div>
              <div className="system-border"></div>
              
              <p className="text-gray-300 italic my-4">{path.description}</p>
              
              <span className="inline-block px-3 py-1 rounded-full bg-system-blue/20 text-system-blue text-xs mb-4">
                Path of {path.statGrowth.join(' & ')}
              </span>
              
              <div className="mb-4">
                <h3 className="system-text mb-2 flex items-center">
                  <span className="w-1 h-4 bg-system-blue mr-2"></span>
                  Daily Tasks:
                </h3>
                <ul className="text-gray-300 space-y-1 ml-3">
                  {path.dailyTasks.map((task, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-system-blue mr-2">•</span>
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mb-4 bg-gray-800/30 p-3 rounded-md">
                <h3 className="system-text mb-2 flex items-center">
                  <span className="w-1 h-4 bg-system-blue mr-2"></span>
                  Special Bonus:
                </h3>
                <p className="text-system-blue font-medium">{path.bonus.name}</p>
                <p className="text-gray-300 text-sm">{path.bonus.description}</p>
                <p className="text-gray-400 text-xs mt-1 italic">{path.bonus.unlockRequirement}</p>
              </div>
              
              <button 
                onClick={() => handlePathSelect(path)} 
                className="w-full system-button mt-4 py-3 hover:bg-system-blue/20"
              >
                Select Path
              </button>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="w-20 h-1 bg-system-blue/30 mx-auto mb-6"></div>
          <p className="text-gray-400 text-sm mb-2">Once you choose, the System will generate quests, track stats, and monitor progress in real time.</p>
          <p className="text-gray-300 italic mb-4">This is your beginning. Choose with intent. Grind with purpose. Evolve without limits.</p>
          <p className="text-system-blue mt-8 text-xl font-jinwoo animate-pulse">[SYSTEM AWAITS YOUR COMMAND]</p>
        </div>
      </div>
    </div>
  );
};

export default PathSelection;
