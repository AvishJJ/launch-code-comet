
export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0A0A23] py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="mb-4 text-sm text-gray-400 md:mb-0">
            Built by Piper Labs
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-purple-500">
              Terms
            </a>
            <a href="#" className="text-gray-400 hover:text-purple-500">
              Privacy
            </a>
            <a href="mailto:hello@piperlabs.dev" className="text-gray-400 hover:text-purple-500">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
