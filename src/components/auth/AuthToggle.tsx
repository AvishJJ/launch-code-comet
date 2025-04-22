
interface AuthToggleProps {
  isSignUp: boolean;
  onToggle: (isSignUp: boolean) => void;
}

export function AuthToggle({ isSignUp, onToggle }: AuthToggleProps) {
  return (
    <div className="mb-6">
      <div className="flex rounded-lg bg-secondary/40 p-1">
        <button
          onClick={() => onToggle(false)}
          className={`flex-1 rounded-md py-2 text-center font-medium transition-all ${
            !isSignUp
              ? 'bg-primary/20 text-white shadow-sm'
              : 'text-gray-400 hover:text-gray-300'
          }`}
          aria-selected={!isSignUp}
          role="tab"
        >
          Sign In
        </button>
        <button
          onClick={() => onToggle(true)}
          className={`flex-1 rounded-md py-2 text-center font-medium transition-all ${
            isSignUp
              ? 'bg-primary/20 text-white shadow-sm'
              : 'text-gray-400 hover:text-gray-300'
          }`}
          aria-selected={isSignUp}
          role="tab"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
