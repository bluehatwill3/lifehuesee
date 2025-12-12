import React, { useState } from 'react';
import Layout from '../components/Layout';
import { ColorStop } from '../types';
import { Trash2, Copy, Plus, Shuffle } from 'lucide-react';

const GradientBuilder: React.FC = () => {
  const [stops, setStops] = useState<ColorStop[]>([
    { id: '1', color: '#6FB7B2', position: 0 },
    { id: '2', color: '#E39A57', position: 50 },
    { id: '3', color: '#8A7BB8', position: 100 }
  ]);
  const [type, setType] = useState('linear');
  const [angle, setAngle] = useState(135);

  const css = type === 'linear' 
    ? `linear-gradient(${angle}deg, ${stops.map(s => `${s.color} ${s.position}%`).join(', ')})`
    : type === 'radial'
    ? `radial-gradient(circle, ${stops.map(s => `${s.color} ${s.position}%`).join(', ')})`
    : `conic-gradient(from ${angle}deg, ${stops.map(s => `${s.color} ${s.position}%`).join(', ')})`;

  const addStop = () => {
    const newStop: ColorStop = {
      id: Math.random().toString(36).substr(2, 9),
      color: '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0'),
      position: 50
    };
    setStops([...stops, newStop].sort((a, b) => a.position - b.position));
  };

  const removeStop = (id: string) => {
    if (stops.length > 2) {
      setStops(stops.filter(s => s.id !== id));
    }
  };

  const updateStop = (id: string, field: keyof ColorStop, value: string | number) => {
    setStops(stops.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const copyCss = () => {
    navigator.clipboard.writeText(`background: ${css};`);
    alert('CSS copied to clipboard!');
  };

  return (
    <Layout title="Gradient Builder">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-6">
        <div className="space-y-6">
          <div 
            className="w-full h-80 rounded-2xl shadow-2xl border border-white/10 transition-all duration-300"
            style={{ background: css }}
          />
          
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
             <div className="flex flex-wrap gap-6 mb-6">
               <div className="flex flex-col gap-2">
                 <label className="text-xs font-bold text-white/50 uppercase">Type</label>
                 <select 
                   value={type} 
                   onChange={(e) => setType(e.target.value)}
                   className="bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-500"
                 >
                   <option value="linear">Linear</option>
                   <option value="radial">Radial</option>
                   <option value="conic">Conic</option>
                 </select>
               </div>
               
               {type !== 'radial' && (
                 <div className="flex flex-col gap-2 flex-1">
                   <label className="text-xs font-bold text-white/50 uppercase">Angle ({angle}°)</label>
                   <input 
                     type="range" 
                     min="0" max="360" 
                     value={angle} 
                     onChange={(e) => setAngle(Number(e.target.value))}
                     className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                   />
                 </div>
               )}
             </div>

             <div className="space-y-3">
               <div className="flex justify-between items-center mb-2">
                 <label className="text-xs font-bold text-white/50 uppercase">Color Stops</label>
                 <button onClick={addStop} className="text-xs flex items-center gap-1 text-teal-300 hover:text-teal-200">
                   <Plus size={14} /> Add Color
                 </button>
               </div>
               {stops.map((stop) => (
                 <div key={stop.id} className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
                   <input 
                     type="color" 
                     value={stop.color} 
                     onChange={(e) => updateStop(stop.id, 'color', e.target.value)}
                     className="w-8 h-8 rounded-lg bg-transparent border-0 cursor-pointer p-0"
                   />
                   <input 
                     type="text" 
                     value={stop.color.toUpperCase()} 
                     onChange={(e) => updateStop(stop.id, 'color', e.target.value)}
                     className="w-20 bg-transparent text-sm font-mono border-none focus:ring-0"
                   />
                   <input 
                     type="range" 
                     min="0" max="100" 
                     value={stop.position}
                     onChange={(e) => updateStop(stop.id, 'position', Number(e.target.value))}
                     className="flex-1 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                   />
                   <span className="text-xs w-8 text-right">{stop.position}%</span>
                   <button 
                     onClick={() => removeStop(stop.id)}
                     disabled={stops.length <= 2}
                     className="text-white/40 hover:text-rose-400 disabled:opacity-20"
                   >
                     <Trash2 size={16} />
                   </button>
                 </div>
               ))}
             </div>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-fit">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold">CSS Output</h3>
            <button onClick={copyCss} className="text-xs flex items-center gap-1 bg-white/10 hover:bg-white/20 px-2 py-1 rounded-lg transition">
              <Copy size={14} /> Copy
            </button>
          </div>
          <div className="bg-black/40 rounded-xl p-4 font-mono text-xs text-white/70 break-all border border-white/5 leading-relaxed">
            background: {css};
          </div>
          
          <div className="mt-8 p-4 bg-teal-900/20 border border-teal-500/20 rounded-xl">
             <h4 className="text-teal-200 font-bold text-sm mb-2">Tips</h4>
             <ul className="text-xs text-teal-100/60 space-y-2 list-disc pl-4">
               <li>Linear gradients are perfect for backgrounds.</li>
               <li>Use transparent colors (hex alpha) for complex overlays.</li>
               <li>Conic gradients are great for pie charts or wheels.</li>
             </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GradientBuilder;
