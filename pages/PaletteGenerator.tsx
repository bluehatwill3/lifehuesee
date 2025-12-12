import React, { useState } from 'react';
import Layout from '../components/Layout';
import { generatePalettesFromKeyword } from '../services/geminiService';
import { Palette } from '../types';
import { Wand2, Loader2, Copy } from 'lucide-react';

const PaletteGenerator: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const [palettes, setPalettes] = useState<Palette[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!keyword.trim()) return;
    setLoading(true);
    const results = await generatePalettesFromKeyword(keyword);
    if (results.length > 0) {
        setPalettes(results);
    }
    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleGenerate();
  };

  const copyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
  };

  return (
    <Layout title="AI Palette Generator">
      <div className="max-w-3xl mx-auto mb-12">
        <div className="flex gap-2 mb-8">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Describe a mood, theme, or scene (e.g., 'Cyberpunk rainy night', 'Soft pastel spring')"
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-teal-500/50 transition-colors"
          />
          <button
            onClick={handleGenerate}
            disabled={loading || !keyword}
            className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-teal-900/20"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <Wand2 size={20} />}
            Generate
          </button>
        </div>

        <div className="flex flex-wrap gap-2 justify-center text-sm text-white/50 mb-12">
           <span className="text-white/30">Try:</span>
           {['Ocean Sunset', 'Vintage Vinyl', 'Neon Tokyo', 'Forest Morning', 'Nordic Minimal'].map(k => (
             <button key={k} onClick={() => { setKeyword(k); setTimeout(() => handleGenerate(), 0); }} className="hover:text-teal-300 transition-colors">
               {k}
             </button>
           ))}
        </div>
      </div>

      {loading && (
        <div className="text-center py-20">
           <div className="inline-block animate-pulse text-teal-200">Generating creative palettes...</div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {palettes.map((palette, idx) => (
          <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="h-32 flex">
              {palette.colors.map((color, i) => (
                <div 
                  key={i} 
                  className="flex-1 group relative cursor-pointer" 
                  style={{ background: color }}
                  onClick={() => copyHex(color)}
                >
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/20 backdrop-blur-[1px] transition-opacity">
                    <span className="text-xs font-mono font-bold text-white drop-shadow-md">{color}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-5">
              <h3 className="text-lg font-bold text-white/90 mb-1">{palette.name}</h3>
              <p className="text-sm text-white/60 leading-relaxed">{palette.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      {!loading && palettes.length === 0 && (
          <div className="text-center py-20 text-white/30">
            Enter a keyword above to generate unique color schemes powered by Gemini AI.
          </div>
      )}
    </Layout>
  );
};

export default PaletteGenerator;
