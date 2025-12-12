import React from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import { Palette, CircleDot, Sliders, Wand2, Eye, FlaskConical } from 'lucide-react';

interface ToolCardProps {
  to: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
  badge: string;
  features: string[];
  colorClass: string;
}

const ToolCard: React.FC<ToolCardProps> = ({ to, icon, title, desc, badge, features, colorClass }) => (
  <Link to={to} className="group relative block p-7 rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 hover:-translate-y-1 hover:border-white/20 hover:shadow-2xl hover:shadow-black/50 transition-all duration-300 overflow-hidden">
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 ${colorClass}`}>
      {icon}
    </div>
    <h2 className="text-xl font-bold mb-2 tracking-tight group-hover:text-teal-200 transition-colors">{title}</h2>
    <p className="text-sm text-white/60 leading-relaxed mb-4">{desc}</p>
    <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-white/10 border border-white/10 text-white/80 mb-3">
      {badge}
    </div>
    <ul className="space-y-1">
      {features.map((f, i) => (
        <li key={i} className="text-xs text-white/50 flex items-center gap-2">
          <span className="text-teal-400 font-bold">→</span> {f}
        </li>
      ))}
    </ul>
  </Link>
);

const Home: React.FC = () => {
  return (
    <Layout title="" showBack={false}>
      <div className="text-center py-12 mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-400/80 to-amber-400/80 mb-6 shadow-2xl animate-pulse-slow">
           <Palette size={32} className="text-white drop-shadow-md" />
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-teal-200 via-amber-200 to-rose-300">
          LifeHues
        </h1>
        <p className="text-lg text-white/60 max-w-2xl mx-auto">
          Professional color tools for designers, artists, and creators. Explore color theory, build palettes, and visualize harmonies.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ToolCard
          to="/wheel"
          icon={<Palette size={24} className="text-teal-200" />}
          colorClass="bg-gradient-to-br from-teal-500/20 to-teal-500/5"
          title="Palette Wheel Lab"
          desc="Analyze your palettes on an interactive color wheel. Explore complementary, analogous, and triadic relationships."
          badge="Interactive Wheel"
          features={["Visual harmony analysis", "Custom palette input"]}
        />
        <ToolCard
          to="/harmony"
          icon={<CircleDot size={24} className="text-amber-200" />}
          colorClass="bg-gradient-to-br from-amber-500/20 to-amber-500/5"
          title="Harmony Rings"
          desc="Concentric color rings showing all harmony types simultaneously. Nested circles for complex theory."
          badge="Multi-Layer View"
          features={["All harmonies at once", "Real-time updates"]}
        />
        <ToolCard
          to="/gradient"
          icon={<Sliders size={24} className="text-rose-200" />}
          colorClass="bg-gradient-to-br from-rose-500/20 to-rose-500/5"
          title="Gradient Builder"
          desc="Create beautiful gradients with multiple color stops. Export CSS, adjust easing curves, and explore blend modes."
          badge="Export Ready"
          features={["CSS code generation", "Multiple blend modes"]}
        />
        <ToolCard
          to="/generator"
          icon={<Wand2 size={24} className="text-blue-200" />}
          colorClass="bg-gradient-to-br from-blue-500/20 to-blue-500/5"
          title="AI Palette Generator"
          desc="Generate color palettes from keywords using advanced AI. Get instant suggestions with color theory applied."
          badge="Smart Generation"
          features={["Mood-based palettes", "Gemini AI powered"]}
        />
        <ToolCard
          to="/contrast"
          icon={<Eye size={24} className="text-purple-200" />}
          colorClass="bg-gradient-to-br from-purple-500/20 to-purple-500/5"
          title="Contrast Checker"
          desc="Ensure WCAG accessibility compliance. Test color combinations for readability and standards."
          badge="WCAG Standards"
          features={["AA/AAA compliance", "Live preview"]}
        />
        <ToolCard
          to="/mixer"
          icon={<FlaskConical size={24} className="text-cyan-200" />}
          colorClass="bg-gradient-to-br from-cyan-500/20 to-cyan-500/5"
          title="Color Mixer"
          desc="Mix colors like paint. Blend multiple hues together and explore subtractive color mixing."
          badge="Realistic Blending"
          features={["Paint-like mixing", "Adjustable ratios"]}
        />
      </div>
      
      <footer className="mt-20 text-center text-white/40 text-sm">
        <p>LifeHues Suite • Built with React & Tailwind</p>
      </footer>
    </Layout>
  );
};

export default Home;
