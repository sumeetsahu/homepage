export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-6 bg-gray-900 text-gray-400">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">© {currentYear} Sumeet Sahu. All rights reserved.</p>
          <div className="flex gap-6 text-sm">
            <a href="https://www.linkedin.com/in/sumeetsahu/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
              LinkedIn
            </a>
            <a href="https://github.com/sumeetsahu/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
              GitHub
            </a>
            <a href="https://www.facebook.com/sumeetsahu/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
              Facebook
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
