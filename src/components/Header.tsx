import { ProfileData } from '../types';

interface HeaderProps {
  profile: ProfileData;
}

export default function Header({ profile }: HeaderProps) {
  return (
    <section className="py-20 px-6 border-b">
      <div className="container mx-auto max-w-6xl">
        <div className="max-w-4xl">
          <p className="text-sm uppercase tracking-widest text-gray-500 mb-4">Principal Engineer</p>
          <h1 className="text-6xl md:text-7xl font-light mb-6 leading-tight">
            Sumeet<br/>
            <span className="font-semibold">Sahu</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl">
            {profile.summary}
          </p>
          <div className="grid grid-cols-3 gap-6 max-w-xl mb-8">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-3xl font-semibold mb-1">17+</p>
              <p className="text-xs text-gray-600 uppercase tracking-wide">Years</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-3xl font-semibold mb-1">8K+</p>
              <p className="text-xs text-gray-600 uppercase tracking-wide">Developers</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-3xl font-semibold mb-1">$600K+</p>
              <p className="text-xs text-gray-600 uppercase tracking-wide">Savings</p>
            </div>
          </div>
          <div className="flex gap-4">
            <a href="#contact" className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition font-medium">
              Get in Touch
            </a>
            <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" className="px-6 py-3 border border-gray-300 rounded-lg hover:border-gray-900 transition font-medium">
              LinkedIn
            </a>
            <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" className="px-6 py-3 border border-gray-300 rounded-lg hover:border-gray-900 transition font-medium">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
