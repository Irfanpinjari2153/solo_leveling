
import React, { useState } from 'react';
import { SystemProvider } from '../context/SystemContext';
import SystemContainer from '../components/SystemContainer';
import SystemArising from '../components/SystemArising';
import PathSelection from '../components/PathSelection';
import { useSystem } from '../context/SystemContext';

const SystemContent = () => {
  const { pathSelected, hunter } = useSystem();
  const [systemAccepted, setSystemAccepted] = useState(false);

  // Only consider the system accepted when a name has been entered (hunter.name != initial default)
  const handleSystemAccepted = () => {
    if (hunter.name !== 'Sung Jinwoo') {
      setSystemAccepted(true);
    }
  };

  // Use effect to check if name has been set
  React.useEffect(() => {
    if (hunter.name !== 'Sung Jinwoo') {
      handleSystemAccepted();
    }
  }, [hunter.name]);

  if (!systemAccepted) {
    return <SystemArising />;
  }

  if (!pathSelected) {
    return <PathSelection />;
  }

  return <SystemContainer />;
};

const Index = () => {
  return (
    <SystemProvider>
      <div className="min-h-screen w-full bg-gray-900 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-900 to-black overflow-x-hidden">
        <SystemContent />
      </div>
    </SystemProvider>
  );
};

export default Index;
