
import { useAuth } from '@/hooks/use-auth';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, LogOut, ChevronDown, Rocket } from 'lucide-react';

export default function Header() {
  const { user, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!user) return null;

  const initials = user?.email?.substring(0, 2).toUpperCase() || 'U';

  return (
    <header className="border-b border-white/5 bg-background/80 backdrop-blur-lg px-4 py-3 sticky top-0 z-40">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-primary shadow-lg">
              <Rocket className="h-4 w-4 text-white" />
            </span>
            <span className="text-xl text-gradient font-display font-bold tracking-tight">
              Comet
            </span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden items-center space-x-6 md:flex">
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center space-x-2 rounded-lg bg-secondary/70 px-3 py-1.5 text-sm text-white transition hover:bg-secondary/90 font-medium shadow-sm"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-violet-600 to-primary text-white font-medium">{initials}</div>
              <span>Hey {user?.email?.split('@')[0]} 👋</span>
              <ChevronDown className="h-4 w-4" />
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 z-50 rounded-lg glass-card py-2 shadow-xl border border-white/5 backdrop-blur-md animate-fade-in">
                <button
                  onClick={() => signOut()}
                  className="flex w-full items-center px-4 py-2 text-sm text-white hover:bg-white/5 transition-colors font-medium"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="flex items-center md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu className="h-6 w-6 text-white" />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mt-4 border-t border-white/5 pt-4 md:hidden animate-fade-in">
          <div className="flex items-center space-x-2 px-4 py-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-violet-600 to-primary text-white font-medium">{initials}</div>
            <span className="text-sm text-white">
              Hey {user?.email?.split('@')[0]} 👋
            </span>
          </div>
          <button
            onClick={() => signOut()}
            className="flex w-full items-center px-4 py-3 text-sm text-white hover:bg-secondary/50 transition-colors font-medium"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </button>
        </div>
      )}
    </header>
  );
}
