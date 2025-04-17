
interface AuthToggleProps {
  isSignUp: boolean;
  onToggle: (isSignUp: boolean) => void;
}

export function AuthToggle({ isSignUp, onToggle }: AuthToggleProps) {
  return (
    <div className="mb-6">
      <div className="flex">
        <button
          onClick={() => onToggle(false)}
          className={`flex-1 border-b-2 pb-2 text-center transition-all ${
            !isSignUp
              ? 'border-purple-500 text-white'
              : 'border-transparent text-gray-400'
          }`}
        >
          Sign In
        </button>
        <button
          onClick={() => onToggle(true)}
          className={`flex-1 border-b-2 pb-2 text-center transition-all ${
            isSignUp
              ? 'border-purple-500 text-white'
              : 'border-transparent text-gray-400'
          }`}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
