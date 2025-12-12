import React from 'react';
import { HashRouter, MemoryRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PaletteWheelLab from './pages/PaletteWheelLab';
import HarmonyRings from './pages/HarmonyRings';
import GradientBuilder from './pages/GradientBuilder';
import PaletteGenerator from './pages/PaletteGenerator';
import ContrastChecker from './pages/ContrastChecker';
import ColorMixer from './pages/ColorMixer';

const App: React.FC = () => {
  // Use MemoryRouter in sandboxed environments (like blob: previews) to prevent security errors.
  // Use HashRouter for production hosting to enable URL navigation and bookmarking.
  const isSandboxed = window.location.protocol === 'blob:';
  const Router = isSandboxed ? MemoryRouter : HashRouter;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wheel" element={<PaletteWheelLab />} />
        <Route path="/harmony" element={<HarmonyRings />} />
        <Route path="/gradient" element={<GradientBuilder />} />
        <Route path="/generator" element={<PaletteGenerator />} />
        <Route path="/contrast" element={<ContrastChecker />} />
        <Route path="/mixer" element={<ColorMixer />} />
      </Routes>
    </Router>
  );
};

export default App;