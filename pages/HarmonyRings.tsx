import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { hexToRgb, rgbToHsl, hslToRgb, rgbToHex, colorFromHue } from '../utils';

const HarmonyRings: React.FC = () => {
  const [baseHex, setBaseHex] = useState('#5E8FBF');
  const [rings, setRings] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    const rgb = hexToRgb(baseHex);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    const h = hsl.h;
    const s = Math.max(0.5, hsl.s);
    const l = Math.max(0.45, Math.min(0.65, hsl.l));

    const configs = [
      { size: 20, hues: [h] }, // Base
      { size: 35, hues: [h, (h + 180) % 360] }, // Comp
      { size: 50, hues: [h, (h + 120) % 360, (h + 240) % 360] }, // Triadic
      { size: 65, hues: [h, (h + 90) % 360, (h + 180) % 360, (h + 270) % 360] }, // Tetradic
      { size: 80, hues: [h, (h - 30 + 360) % 360, (h + 30) % 360] }, // Analogous
      { size: 95, hues: [h, (h + 150) % 360, (h + 210) % 360] } // Split
    ];

    const generatedRings = configs.map((config, index) => {
      const segAngle = 360 / config.hues.length;
      return (
        <div
          key={index}
          className="absolute rounded-full border-[3px] border-white/10 shadow-2xl transition-all duration-500 ease-out"
          style={{
            width: `${config.size}%`,
            height: `${config.size}%`,
            left: `${(100 - config.size) / 2}%`,
            top: `${(100 - config.size) / 2}%`,
            zIndex: 10 - index
          }}
        >
          {config.hues.map((hue, i) => {
            const color = colorFromHue(hue, s, l);
            // Calculate clip path for segment
            // This is a simplified approach using conical gradients for perfect segments would be better in CSS,
            // but for specific angles standard clip-path polygons work for small counts
            
            return (
              <div
                key={i}
                className="absolute w-full h-full rounded-full"
                style={{
                  backgroundColor: color,
                  transform: `rotate(${i * segAngle}deg)`,
                  clipPath: config.hues.length === 1 
                    ? 'none' 
                    : `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos(2 * Math.PI / config.hues.length - Math.PI/2)}% ${50 + 50 * Math.sin(2 * Math.PI / config.hues.length - Math.PI/2)}%, 100% 0%)` // Crude approximation, visually acceptable for simple divisions
                }}
              />
            );
          })}
          {/* Use Conic Gradient for perfect segments instead of clip-path hacks */}
           <div 
             className="absolute inset-0 rounded-full"
             style={{
               background: `conic-gradient(from 0deg, ${config.hues.map((hue, i) => {
                 const color = colorFromHue(hue, s, l);
                 const start = (i * 100) / config.hues.length;
                 const end = ((i + 1) * 100) / config.hues.length;
                 return `${color} ${start}% ${end}%`;
               }).join(', ')})`
             }}
           />
        </div>
      );
    });
    setRings(generatedRings);
  }, [baseHex]);

  const handleRandom = () => {
    const h = Math.random() * 360;
    const s = 0.5 + Math.random() * 0.3;
    const l = 0.5 + Math.random() * 0.15;
    const rgb = hslToRgb(h, s, l);
    setBaseHex(rgbToHex(rgb.r, rgb.g, rgb.b));
  };

  return (
    <Layout title="Harmony Rings">
      <div className="bg-white/5 border border-white/10 rounded-3xl p-6 shadow-2xl backdrop-blur-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 border-b border-white/10 pb-4">
          <div className="text-white/80 font-medium">Concentric Color Harmonies</div>
          <div className="flex gap-3">
             <button onClick={handleRandom} className="px-4 py-2 rounded-xl bg-black/20 border border-white/10 hover:bg-white/10 transition">
               Random Color
             </button>
             <div className="relative">
               <input 
                type="color" 
                value={baseHex}
                onChange={(e) => setBaseHex(e.target.value)}
                className="w-10 h-10 rounded-xl cursor-pointer border-0 p-0 bg-transparent"
               />
             </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center min-h-[500px]">
          <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px]">
            {rings}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 text-sm text-white/60">
           <div className="p-4 rounded-xl bg-white/5 border border-white/5">
             <strong className="block text-white mb-1">Inner Ring (Base)</strong>
             The root color for the entire system.
           </div>
           <div className="p-4 rounded-xl bg-white/5 border border-white/5">
             <strong className="block text-white mb-1">Middle Rings</strong>
             Complementary, Triadic, and Tetradic harmonies expanding outward.
           </div>
           <div className="p-4 rounded-xl bg-white/5 border border-white/5">
             <strong className="block text-white mb-1">Outer Rings</strong>
             Analogous and Split-Complementary nuances.
           </div>
        </div>
      </div>
    </Layout>
  );
};

export default HarmonyRings;
