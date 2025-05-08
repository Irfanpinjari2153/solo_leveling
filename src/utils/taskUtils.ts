import { Task } from '../types/system';

// Function to generate a new follow-up task when a task is completed
export const generateFollowUpTask = (completedTask: Task, pathName: string | undefined): Task | null => {
  // Don't create follow-up tasks for daily tasks or if no path is selected
  if (completedTask.isDaily || !pathName) return null;
  
  const difficultyMap: Record<string, string> = {
    'E': 'D',
    'D': 'C',
    'C': 'B',
    'B': 'A',
    'A': 'S',
    'S': 'S'
  };
  
  // Generate a new task that's slightly more challenging
  const newDifficulty = difficultyMap[completedTask.difficulty] || 'C';
  const statType = Object.keys(completedTask.stats)[0] || 'strength';
  const statValue = completedTask.stats[statType] + 1;
  
  // Create follow-up task based on the path and completed task
  const taskTemplates = [
    `Continue your ${pathName} training with increased intensity`,
    `Take the next step in your ${pathName} journey`,
    `Push beyond your limits as a ${pathName}`,
    `Apply what you've learned from your ${pathName} training`
  ];
  
  const taskDescriptions = [
    `Build upon your previous accomplishment. Improve your technique and push for greater results.`,
    `The System has analyzed your performance and calibrated this task to help you grow stronger.`,
    `Having proven your capability, now face a greater challenge to evolve your abilities.`,
    `Your previous success has unlocked this next challenge. The path to greatness continues.`
  ];
  
  const randomTemplate = taskTemplates[Math.floor(Math.random() * taskTemplates.length)];
  const randomDescription = taskDescriptions[Math.floor(Math.random() * taskDescriptions.length)];
  
  return {
    id: crypto.randomUUID(),
    title: randomTemplate,
    description: randomDescription,
    difficulty: newDifficulty as Task['difficulty'],
    completed: false,
    expReward: Math.round(completedTask.expReward * 1.5),
    goldReward: Math.round(completedTask.goldReward * 1.5),
    stats: {
      [statType]: statValue
    }
  };
};

// Function to generate daily tasks based on path and energy level
export const generateDailyTasks = (
  tasks: Task[], 
  energyLevel: 'low' | 'medium' | 'high' | null, 
  path: { name: string; dailyTasks: string[]; statGrowth: string[] } | undefined
): Task[] => {
  if (!path || !energyLevel) return tasks;

  // Keep all non-daily tasks
  const nonDailyTasks = tasks.filter(task => !task.isDaily);
  
  const difficultyMultiplier = energyLevel === 'low' ? 0.7 : 
                             energyLevel === 'high' ? 1.3 : 1;
  
  const dailyTasks = path.dailyTasks.map((taskDescription, index) => {
    let adjustedDescription = taskDescription;
    if (energyLevel === 'low') {
      adjustedDescription = taskDescription.replace(/(\d+)/, (match) => {
        const num = parseInt(match);
        return Math.max(Math.floor(num * 0.7), 1).toString();
      });
    } else if (energyLevel === 'high') {
      adjustedDescription = taskDescription.replace(/(\d+)/, (match) => {
        const num = parseInt(match);
        return Math.floor(num * 1.3).toString();
      });
    }

    return {
      id: crypto.randomUUID(),
      title: `Daily: ${adjustedDescription}`,
      description: `Daily task for ${path.name}: ${adjustedDescription}`,
      difficulty: energyLevel === 'low' ? 'D' : 
                 energyLevel === 'high' ? 'B' : 'C',
      completed: false,
      expReward: Math.round(20 * difficultyMultiplier),
      goldReward: Math.round(5 * difficultyMultiplier),
      stats: {
        [path.statGrowth[index % path.statGrowth.length].toLowerCase() || 'strength']: 
          energyLevel === 'low' ? 1 : 
          energyLevel === 'high' ? 2 : 1,
      },
      isDaily: true,
    } as Task;
  });

  return [...nonDailyTasks, ...dailyTasks];
};
