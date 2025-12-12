import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  showBack?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, title, showBack = true }) => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen text-white/90 relative overflow-x-hidden selection:bg-teal-500/30">
      {/* Animated Background Shader */}
      <div className="fixed inset-[-30vmax] pointer-events-none -z-10 opacity-55 mix-blend-screen animate-drift blur-3xl"
        style={{
          background: `
            radial-gradient(closest-side at 30% 35%, rgba(111,183,178,0.22), transparent 60%),
            radial-gradient(closest-side at 60% 30%, rgba(240,195,90,0.22), transparent 62%),
            radial-gradient(closest-side at 70% 70%, rgba(94,143,191,0.18), transparent 60%),
            radial-gradient(closest-side at 40% 75%, rgba(216,124,106,0.18), transparent 60%)
          `
        }}
      />
      <style>{`
        @keyframes drift {
          0%, 100% { transform: translate3d(-2%, -1%, 0) rotate(0deg) scale(1.02); }
          50% { transform: translate3d(2%, 1.5%, 0) rotate(10deg) scale(1.05); }
        }
        .animate-drift { animation: drift 20s ease-in-out infinite; }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 py-8 pb-20">
        <header className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            {showBack && !isHome && (
              <Link to="/" className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-white/10 bg-black/20 hover:bg-white/5 hover:border-white/20 transition-all text-sm font-medium">
                <ArrowLeft size={16} />
                <span>Home</span>
              </Link>
            )}
            {title && (
              <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-teal-200 to-amber-200">
                {title}
              </h1>
            )}
          </div>
        </header>

        <main className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
