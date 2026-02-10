export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="container mx-auto px-6 text-center">
        <p className="text-sm">
          © {currentYear} Sumeet Sahu. All rights reserved.
        </p>
        <p className="text-xs mt-2 text-gray-500">
          Built with React + TypeScript + Tailwind CSS
        </p>
      </div>
    </footer>
  );
}
