
import { useAuth } from '@/hooks/use-auth';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, LogOut, User, ChevronDown } from 'lucide-react';

export default function Header() {
  const { user, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!user) return null;

  const initials = user?.email?.substring(0, 2).toUpperCase() || 'U';

  return (
    <header className="border-b border-opacity-10 border-white/10 bg-[#0A0A23] px-4 py-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <div>
          <Link to="/dashboard" className="text-xl font-medium text-white">
            Comet
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden items-center space-x-6 md:flex">
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center space-x-2 rounded-full bg-[#1E1E3F] px-3 py-2 text-sm text-white transition hover:bg-[#2D2D5B]"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-600">
                {initials}
              </div>
              <span>Hey {user?.email?.split('@')[0]} 👋</span>
              <ChevronDown className="h-4 w-4" />
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-md bg-[#1E1E3F] py-2 shadow-lg">
                <button
                  onClick={() => signOut()}
                  className="flex w-full items-center px-4 py-2 text-sm text-white hover:bg-[#2D2D5B]"
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
        <div className="mt-4 border-t border-white/10 pt-4 md:hidden">
          <div className="flex items-center space-x-2 px-4 py-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-600">
              {initials}
            </div>
            <span className="text-sm text-white">
              Hey {user?.email?.split('@')[0]} 👋
            </span>
          </div>
          <button
            onClick={() => signOut()}
            className="flex w-full items-center px-4 py-3 text-sm text-white hover:bg-[#1E1E3F]"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </button>
        </div>
      )}
    </header>
  );
}
