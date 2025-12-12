import React, { useState } from 'react';
import Layout from '../components/Layout';
import { hexToRgb, rgbToHex } from '../utils';

const ColorMixer: React.FC = () => {
  const [c1, setC1] = useState('#C95A4A');
  const [c2, setC2] = useState('#5E8FBF');
  const [ratio, setRatio] = useState(50);

  const mixRGB = (hex1: string, hex2: string, w: number) => {
    const rgb1 = hexToRgb(hex1);
    const rgb2 = hexToRgb(hex2);
    const w1 = w / 100;
    const w2 = 1 - w1;
    const r = Math.round(rgb1.r * w1 + rgb2.r * w2);
    const g = Math.round(rgb1.g * w1 + rgb2.g * w2);
    const b = Math.round(rgb1.b * w1 + rgb2.b * w2);
    return rgbToHex(r, g, b);
  };

  const mixSubtractive = (hex1: string, hex2: string, w: number) => {
    const rgb1 = hexToRgb(hex1);
    const rgb2 = hexToRgb(hex2);
    const w1 = w / 100;
    const w2 = 1 - w1;
    // Subtractive approximation (multiply logic)
    // This is a simplified "paint" model approximation
    const r = Math.round(255 * Math.pow((rgb1.r / 255) * w1 + (rgb2.r / 255) * w2, 1.2));
    const g = Math.round(255 * Math.pow((rgb1.g / 255) * w1 + (rgb2.g / 255) * w2, 1.2));
    const b = Math.round(255 * Math.pow((rgb1.b / 255) * w1 + (rgb2.b / 255) * w2, 1.2));
    return rgbToHex(
        Math.max(0, Math.min(255, r)), 
        Math.max(0, Math.min(255, g)), 
        Math.max(0, Math.min(255, b))
    );
  };

  const mix1 = mixRGB(c1, c2, 100 - ratio); // Slider logic: 0 = all c2, 100 = all c1
  const mix2 = mixSubtractive(c1, c2, 100 - ratio);

  return (
    <Layout title="Color Mixer">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row items-center gap-8 justify-center">
          <div className="flex flex-col items-center gap-2">
            <input 
              type="color" 
              value={c1} 
              onChange={e => setC1(e.target.value)} 
              className="w-24 h-24 rounded-2xl border-2 border-white/20 cursor-pointer p-1 bg-white/5"
            />
            <span className="font-mono text-sm">{c1}</span>
          </div>

          <div className="flex-1 w-full max-w-md px-4">
            <div className="flex justify-between text-xs text-white/50 mb-2 font-bold uppercase tracking-wider">
               <span>Color 1</span>
               <span>{ratio}% Mix</span>
               <span>Color 2</span>
            </div>
            <input 
              type="range" 
              min="0" max="100" 
              value={ratio} 
              onChange={e => setRatio(Number(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="flex flex-col items-center gap-2">
            <input 
              type="color" 
              value={c2} 
              onChange={e => setC2(e.target.value)} 
              className="w-24 h-24 rounded-2xl border-2 border-white/20 cursor-pointer p-1 bg-white/5"
            />
            <span className="font-mono text-sm">{c2}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ResultCard title="Additive Mixing (Light/Screens)" color={mix1} desc="RGB Interpolation" />
          <ResultCard title="Subtractive Mixing (Paint/Pigment)" color={mix2} desc="Simulated Pigment Physics" />
        </div>
      </div>
    </Layout>
  );
};

const ResultCard = ({ title, color, desc }: { title: string, color: string, desc: string }) => (
  <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
     <div className="h-40 w-full relative" style={{ background: color }}>
        <div className="absolute inset-0 flex items-center justify-center">
           <span className="bg-black/30 backdrop-blur-md px-4 py-2 rounded-xl text-white font-mono shadow-lg border border-white/10">
             {color}
           </span>
        </div>
     </div>
     <div className="p-6">
       <h3 className="font-bold text-lg mb-1">{title}</h3>
       <p className="text-white/50 text-sm">{desc}</p>
     </div>
  </div>
);

export default ColorMixer;
