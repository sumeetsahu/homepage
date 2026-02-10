import { ProfileData } from '../types';

interface ContactProps {
  profile: ProfileData;
}

export default function Contact({ profile }: ContactProps) {
  return (
    <section id="contact" className="py-20 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-4xl font-semibold mb-6">Let's Connect</h2>
        <p className="text-xl mb-8 text-blue-50">
          Open to consulting, speaking engagements, and interesting opportunities.
        </p>
        
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <a 
            href={`mailto:${profile.email}`} 
            className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-xl hover:bg-white/20 transition"
          >
            <div className="text-4xl mb-3">✉️</div>
            <h3 className="font-semibold mb-2">Email</h3>
            <p className="text-sm text-blue-100">{profile.email}</p>
          </a>
          
          <a 
            href={profile.socials.linkedin} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-xl hover:bg-white/20 transition"
          >
            <div className="text-4xl mb-3">💼</div>
            <h3 className="font-semibold mb-2">LinkedIn</h3>
            <p className="text-sm text-blue-100">linkedin.com/in/sumeetsahu</p>
          </a>
          
          <a 
            href={profile.socials.github} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-xl hover:bg-white/20 transition"
          >
            <div className="text-4xl mb-3">💻</div>
            <h3 className="font-semibold mb-2">GitHub</h3>
            <p className="text-sm text-blue-100">github.com/sumeetsahu</p>
          </a>
        </div>

        <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-xl inline-block">
          <p className="text-sm mb-2">📍 Based in</p>
          <p className="text-lg font-semibold">{profile.location}</p>
        </div>
      </div>
    </section>
  );
}
