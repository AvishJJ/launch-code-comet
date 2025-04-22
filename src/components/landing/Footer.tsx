
import { Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-background py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-primary shadow-md">
              <Rocket className="h-4 w-4 text-white" />
            </span>
            <span className="text-xl text-gradient font-display font-semibold">Comet</span>
          </div>
          
          <div className="text-sm text-gray-400">
            Built by Piper Labs
          </div>
          
          <div className="flex space-x-6 text-sm">
            <Link to="#" className="text-gray-400 hover:text-primary transition-colors hover-link">
              Terms
            </Link>
            <Link to="#" className="text-gray-400 hover:text-primary transition-colors hover-link">
              Privacy
            </Link>
            <a href="mailto:hello@piperlabs.dev" className="text-gray-400 hover:text-primary transition-colors hover-link">
              Contact
            </a>
          </div>
        </div>
        
        <div className="mt-8 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Piper Labs. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
