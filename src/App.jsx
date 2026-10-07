import React, { useState, useEffect, useCallback } from 'react';
import SonnyScene from './components/SonnyScene';
import HeaderNav from './components/HeaderNav';
import InspectModal from './components/InspectModal';
import RunSimulationModal from './components/RunSimulationModal';
import AboutModal from './components/AboutModal';

export default function App() {
  const [zeroGEnabled, setZeroGEnabled] = useState(true);
  const [inspectProject, setInspectProject] = useState(null);
  const [runProject, setRunProject] = useState(null);
  const [showAbout, setShowAbout] = useState(false);
  const [scatterTrigger, setScatterTrigger] = useState(0);
  const [recallTrigger, setRecallTrigger] = useState(0);

  const handleInspect = useCallback((project) => {
    setInspectProject(project);
  }, []);

  const handleRun = useCallback((project) => {
    setRunProject(project);
  }, []);

  const handleOpenAbout = useCallback(() => {
    setShowAbout(true);
  }, []);

  const handleScatter = useCallback(() => {
    setScatterTrigger((prev) => prev + 1);
  }, []);

  const handleRecall = useCallback(() => {
    setRecallTrigger((prev) => prev + 1);
  }, []);

  const handleToggleZeroG = useCallback(() => {
    setZeroGEnabled((prev) => !prev);
  }, []);

  const handleFocusContact = useCallback(() => {
    // Just recall everything to default positions so contact is visible
    setRecallTrigger((prev) => prev + 1);
  }, []);

  // Escape key closes modals
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setInspectProject(null);
        setRunProject(null);
        setShowAbout(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="w-screen h-screen overflow-hidden relative">
      {/* Film Grain Overlay */}
      <div className="film-grain-overlay" />

      {/* Header Navigation */}
      <HeaderNav
        onOpenAbout={handleOpenAbout}
        onOpenProjects={() => {}}
        onFocusContact={handleFocusContact}
        zeroGEnabled={zeroGEnabled}
        onToggleZeroG={handleToggleZeroG}
        onScatter={handleScatter}
        onResetPositions={handleRecall}
      />

      {/* Main Anti-Gravity Physics Scene */}
      <SonnyScene
        onInspectProject={handleInspect}
        onRunProject={handleRun}
        zeroGEnabled={zeroGEnabled}
        scatterTrigger={scatterTrigger}
        recallTrigger={recallTrigger}
        onOpenAbout={handleOpenAbout}
      />

      {/* Modals */}
      {inspectProject && (
        <InspectModal
          project={inspectProject}
          onClose={() => setInspectProject(null)}
          onRunFromModal={handleRun}
        />
      )}

      {runProject && (
        <RunSimulationModal
          project={runProject}
          onClose={() => setRunProject(null)}
        />
      )}

      {showAbout && (
        <AboutModal onClose={() => setShowAbout(false)} />
      )}
    </div>
  );
}
