import React, { useState, useEffect, useRef } from 'react';
import Layout from '../components/Layout';
import { hexToRgb, rgbToHsl, hslToRgb, rgbToHex, rgbToHsv, clamp01 } from '../utils';
import { HarmonyResult } from '../types';

const ORIGINAL_PALETTE = [
  "#C95A4A", "#E39A57", "#F0C35A", "#6FAE8C", "#6FB7B2", "#5E8FBF", "#8A7BB8",
  "#9FC3D8", "#BFD7E6", "#F2D6A8",
  "#D87C6A", "#E7A092", "#F3D56B", "#5A78A8", "#9A8EC1", "#6E8F7B",
  "#E8CFAF", "#E3B38A", "#8FA9B5",
  "#F7E6C9", "#CBB8A3", "#A9BFD0", "#7C96A8"
];

const PaletteWheelLab: React.FC = () => {
  const [baseHex, setBaseHex] = useState<string>('#5E8FBF');
  const [harmonies, setHarmonies] = useState<HarmonyResult | null>(null);
  const wheelRef = useRef<HTMLDivElement>(null);

  const calculateHarmonies = (hex: string) => {
    const rgb = hexToRgb(hex);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    
    // Use slightly boosted saturation/lightness for generated harmonies to ensure they look good
    // but respect the base color's general direction
    const S = clamp01(hsl.s);
    const L = clamp01(hsl.l);
    
    const mk = (h: number, tag: string) => {
      const finalH = ((h % 360) + 360) % 360;
      const finalRgb = hslToRgb(finalH, S, L);
      return { hex: rgbToHex(finalRgb.r, finalRgb.g, finalRgb.b), tag, h: finalH };
    };

    setHarmonies({
      base: mk(hsl.h, 'Base'),
      comp: mk(hsl.h + 180, 'Complement'),
      ana1: mk(hsl.h - 30, 'Analogous -30°'),
      ana2: mk(hsl.h + 30, 'Analogous +30°'),
      tri1: mk(hsl.h + 120, 'Triadic +120°'),
      tri2: mk(hsl.h - 120, 'Triadic -120°'),
      split1: mk(hsl.h + 150, 'Split +150°'),
      split2: mk(hsl.h - 150, 'Split -150°'),
    });
  };

  useEffect(() => {
    calculateHarmonies(baseHex);
  }, [baseHex]);

  const handleWheelClick = (e: React.MouseEvent) => {
    if (!wheelRef.current) return;
    const rect = wheelRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const ang = Math.atan2(dy, dx);
    let hue = (ang * 180 / Math.PI) + 90;
    hue = ((hue % 360) + 360) % 360;

    const currentRgb = hexToRgb(baseHex);
    const currentHsl = rgbToHsl(currentRgb.r, currentRgb.g, currentRgb.b);
    
    // Shift key preserves saturation/lightness
    const s = e.shiftKey ? currentHsl.s : 0.55;
    const l = e.shiftKey ? currentHsl.l : 0.58;

    const newRgb = hslToRgb(hue, clamp01(s), clamp01(l));
    setBaseHex(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
  };

  const handleRandom = () => {
    const h = Math.random() * 360;
    const s = 0.55 + Math.random() * 0.15;
    const l = 0.54 + Math.random() * 0.12;
    const rgb = hslToRgb(h, s, l);
    setBaseHex(rgbToHex(rgb.r, rgb.g, rgb.b));
  };

  const Marker = ({ hue, color, label }: { hue: number, color: string, label: string }) => {
    // 90deg offset because CSS 0deg is top, but Math 0deg is right
    // However in our conic gradient logic 0 is top.
    // Let's position based on percentage to handle responsive size
    const radius = 42; // percentage
    const rad = (hue - 90) * Math.PI / 180;
    const top = 50 + radius * Math.sin(rad);
    const left = 50 + radius * Math.cos(rad);

    return (
      <div 
        className="absolute w-4 h-4 rounded-full border-2 border-white shadow-lg transform -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-300"
        style={{ top: `${top}%`, left: `${left}%`, backgroundColor: color }}
        title={label}
      >
        <div className="absolute inset-[-4px] rounded-full border border-white/30" />
      </div>
    );
  };

  const rgb = hexToRgb(baseHex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);

  return (
    <Layout title="Palette Wheel Lab">
      <div className="text-white/60 mb-8 max-w-3xl">
        A color-wheel analysis playground. Click any swatch to set the base color, then explore relationships visualized with a soft shader glow.
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-6">
        {/* Left Column: Wheel & Harmonies */}
        <section className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm">
          <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
            <span className="font-semibold text-white/90">Wheel + Relationships</span>
            <div className="flex gap-3">
              <button 
                onClick={handleRandom}
                className="px-3 py-2 rounded-xl bg-black/20 hover:bg-white/10 border border-white/10 text-xs transition-colors"
              >
                Random base
              </button>
              <label className="flex items-center gap-2 px-3 py-2 rounded-xl bg-black/20 hover:bg-white/10 border border-white/10 text-xs cursor-pointer">
                Pick
                <input 
                  type="color" 
                  value={baseHex} 
                  onChange={(e) => setBaseHex(e.target.value)}
                  className="w-5 h-5 bg-transparent border-0 p-0 cursor-pointer" 
                />
              </label>
            </div>
          </div>

          <div className="p-6">
            <div className="flex justify-center mb-8 relative">
              <div 
                ref={wheelRef}
                onClick={handleWheelClick}
                className="w-[300px] h-[300px] sm:w-[360px] sm:h-[360px] rounded-full relative cursor-crosshair border border-white/10 shadow-2xl overflow-hidden"
                style={{
                  background: `conic-gradient(from 0deg, hsl(0 100% 55%), hsl(30 100% 55%), hsl(60 100% 55%), hsl(90 100% 55%), hsl(120 100% 55%), hsl(150 100% 55%), hsl(180 100% 55%), hsl(210 100% 55%), hsl(240 100% 55%), hsl(270 100% 55%), hsl(300 100% 55%), hsl(330 100% 55%), hsl(360 100% 55%))`
                }}
              >
                {/* Inner Glow/Shimmer */}
                <div className="absolute inset-[-40%] animate-spin-slow opacity-90 blur-xl mix-blend-overlay pointer-events-none" 
                  style={{
                    background: 'radial-gradient(circle at 30% 35%, rgba(255,255,255,0.22), transparent 55%)'
                  }}
                />
                
                {/* Center Mask */}
                <div className="absolute inset-[14%] rounded-full bg-slate-900/90 border border-white/10 shadow-inner flex items-center justify-center pointer-events-none">
                  <div className="text-center p-4 bg-black/30 backdrop-blur-md rounded-2xl border border-white/10 max-w-[80%]">
                    <div className="flex items-center gap-3 justify-between mb-2">
                       <div>
                         <div className="text-lg font-bold tracking-wide">{baseHex}</div>
                         <div className="text-[10px] text-white/50">
                           H {Math.round(hsl.h)}° S {Math.round(hsl.s*100)}% L {Math.round(hsl.l*100)}%
                         </div>
                       </div>
                       <div className="w-8 h-8 rounded-lg shadow-lg border border-white/20" style={{background: baseHex}} />
                    </div>
                    <div className="text-[10px] text-white/40 leading-tight">
                      Click wheel to set hue. Shift+Click to keep Sat/Light.
                    </div>
                  </div>
                </div>

                {/* Markers */}
                {harmonies && (
                  <>
                    <Marker hue={harmonies.base.h} color={harmonies.base.hex} label="Base" />
                    <Marker hue={harmonies.comp.h} color={harmonies.comp.hex} label="Complement" />
                    <Marker hue={harmonies.ana1.h} color={harmonies.ana1.hex} label="Analogous -" />
                    <Marker hue={harmonies.ana2.h} color={harmonies.ana2.hex} label="Analogous +" />
                    <Marker hue={harmonies.tri1.h} color={harmonies.tri1.hex} label="Triadic 1" />
                    <Marker hue={harmonies.tri2.h} color={harmonies.tri2.hex} label="Triadic 2" />
                  </>
                )}
              </div>
            </div>

            {harmonies && (
              <div className="mt-8">
                <h3 className="text-sm font-medium text-white/80 mb-3">Generated harmonies</h3>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                  {[
                    harmonies.base, harmonies.ana1, harmonies.ana2, harmonies.comp, 
                    harmonies.split1, harmonies.split2, harmonies.tri1, harmonies.tri2
                  ].map((c, i) => (
                    <button
                      key={i}
                      onClick={() => setBaseHex(c.hex)}
                      className="group relative rounded-xl border border-white/10 bg-white/5 overflow-hidden hover:-translate-y-1 transition-transform"
                    >
                      <div className="h-10 w-full" style={{ background: c.hex }} />
                      <div className="p-2">
                        <div className="text-[10px] font-mono opacity-80">{c.hex}</div>
                        <div className="text-[9px] opacity-40 truncate">{c.tag}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Right Column: Original Palette */}
        <aside className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm h-fit">
          <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
            <span className="font-semibold text-white/90">Original Swatches</span>
            <span className="text-xs text-white/40 px-2 py-1 bg-white/5 rounded-full">Click to analyze</span>
          </div>
          <div className="p-4">
             <div className="grid grid-cols-4 gap-2">
                {ORIGINAL_PALETTE.map((hex, i) => (
                   <button 
                    key={i}
                    onClick={() => setBaseHex(hex)}
                    className="group rounded-lg overflow-hidden border border-white/10 hover:border-white/40 hover:scale-105 transition-all"
                   >
                     <div className="h-8 w-full" style={{background: hex}} />
                     <div className="py-1 bg-black/20 text-[10px] font-mono text-center text-white/70">
                       {hex}
                     </div>
                   </button>
                ))}
             </div>
             <div className="mt-4 p-3 bg-teal-500/10 border border-teal-500/20 rounded-lg text-xs text-teal-100/70 leading-relaxed">
               These swatches are extracted from the painting analysis. Click any color to set it as the base for the wheel calculations.
             </div>
          </div>
        </aside>
      </div>
    </Layout>
  );
};

export default PaletteWheelLab;
