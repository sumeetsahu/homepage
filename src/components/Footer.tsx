import { ProfileData } from '../types';

interface FooterProps {
  profile: ProfileData;
}

export default function Footer({ profile }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const { name, socials } = profile;

  return (
    <footer className="py-12 px-6 bg-gray-900 text-gray-400">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">© {currentYear} {name}. All rights reserved.</p>
          <div className="flex gap-6 text-sm">
            {socials.linkedin && (
              <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                LinkedIn
              </a>
            )}
            {socials.github && (
              <a href={socials.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                GitHub
              </a>
            )}
            {socials.facebook && (
              <a href={socials.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                Facebook
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
