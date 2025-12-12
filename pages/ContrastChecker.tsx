import React, { useState } from 'react';
import Layout from '../components/Layout';
import { getContrastRatio } from '../utils';
import { ArrowLeftRight } from 'lucide-react';

const ContrastChecker: React.FC = () => {
  const [bg, setBg] = useState('#FFFFFF');
  const [fg, setFg] = useState('#000000');
  
  const ratio = getContrastRatio(bg, fg);
  const ratioStr = ratio.toFixed(2);

  const getStatus = (r: number, min: number) => r >= min ? 'PASS' : 'FAIL';
  const getBadgeClass = (status: string) => status === 'PASS' 
    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' 
    : 'bg-rose-500/20 text-rose-300 border-rose-500/30';

  const swap = () => {
    setBg(fg);
    setFg(bg);
  };

  return (
    <Layout title="Contrast Checker">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
           <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-sm font-bold text-white/60 uppercase mb-4">Color Selection</h3>
              
              <div className="space-y-4">
                 <div>
                   <label className="block text-xs mb-1 ml-1 text-white/40">Background</label>
                   <div className="flex gap-2">
                     <input type="color" value={bg} onChange={e => setBg(e.target.value)} className="h-10 w-10 rounded border-0 cursor-pointer" />
                     <input type="text" value={bg} onChange={e => setBg(e.target.value)} className="flex-1 bg-black/20 border border-white/10 rounded px-3 text-sm font-mono" />
                   </div>
                 </div>
                 
                 <div className="flex justify-center">
                    <button onClick={swap} className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition">
                       <ArrowLeftRight size={16} />
                    </button>
                 </div>

                 <div>
                   <label className="block text-xs mb-1 ml-1 text-white/40">Foreground (Text)</label>
                   <div className="flex gap-2">
                     <input type="color" value={fg} onChange={e => setFg(e.target.value)} className="h-10 w-10 rounded border-0 cursor-pointer" />
                     <input type="text" value={fg} onChange={e => setFg(e.target.value)} className="flex-1 bg-black/20 border border-white/10 rounded px-3 text-sm font-mono" />
                   </div>
                 </div>
              </div>
           </div>

           <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
              <div className="text-sm text-white/50 mb-2">Contrast Ratio</div>
              <div className="text-6xl font-black bg-clip-text text-transparent bg-gradient-to-br from-white to-white/50 mb-4">
                {ratioStr}:1
              </div>
              <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${ratio >= 4.5 ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400' : 'bg-amber-500/20 border-amber-500/50 text-amber-400'}`}>
                {ratio >= 7 ? 'Excellent' : ratio >= 4.5 ? 'Good' : ratio >= 3 ? 'Fair' : 'Poor'}
              </div>
           </div>
        </div>

        <div className="space-y-6">
           <div 
             className="w-full h-64 rounded-2xl shadow-2xl flex flex-col items-center justify-center p-8 transition-colors duration-300 border border-white/10"
             style={{ backgroundColor: bg, color: fg }}
           >
             <h2 className="text-3xl font-bold mb-2">Heading Text</h2>
             <p className="text-lg opacity-90 mb-1">Large Body Text (18pt)</p>
             <p className="text-base opacity-80">Normal Body Text (16pt)</p>
           </div>

           <div className="grid grid-cols-1 gap-4">
              <ResultRow title="WCAG AA Normal" min={4.5} ratio={ratio} desc="Body Text" />
              <ResultRow title="WCAG AA Large" min={3} ratio={ratio} desc="Large Text (18pt+)" />
              <ResultRow title="WCAG AAA Normal" min={7} ratio={ratio} desc="Body Text" />
              <ResultRow title="WCAG AAA Large" min={4.5} ratio={ratio} desc="Large Text (18pt+)" />
           </div>
        </div>
      </div>
    </Layout>
  );
};

const ResultRow = ({ title, min, ratio, desc }: { title: string, min: number, ratio: number, desc: string }) => {
  const status = ratio >= min ? 'PASS' : 'FAIL';
  return (
    <div className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-xl">
       <div>
         <div className="font-bold text-sm">{title}</div>
         <div className="text-xs text-white/40">{desc} (Min {min}:1)</div>
       </div>
       <div className={`px-3 py-1 rounded-lg text-xs font-bold border ${status === 'PASS' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'}`}>
         {status}
       </div>
    </div>
  );
};

export default ContrastChecker;
