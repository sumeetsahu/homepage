import { ProfileData } from '../types';
import { trackClick } from '../utils/analytics';

interface ContactProps {
  profile: ProfileData;
}

export default function Contact({ profile }: ContactProps) {
  return (
    <section id="contact" data-analytics-section="contact" className="py-20 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-4xl font-semibold mb-6">{profile.contactTitle ?? "Let's Connect"}</h2>
        <p className="text-xl mb-8 text-blue-50">
          {profile.contactTagline ?? 'Open to consulting, speaking engagements, and interesting opportunities.'}
        </p>
        
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <a
            href={`mailto:${profile.email}`}
            className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-xl hover:bg-white/20 transition"
            onClick={() => trackClick('email_click', { location: 'contact' })}
          >
            <div className="text-4xl mb-3">✉️</div>
            <h3 className="font-semibold mb-2">Email</h3>
            <p className="text-sm text-blue-100">{profile.email}</p>
          </a>

          {profile.socials.linkedin && (
            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-xl hover:bg-white/20 transition"
              onClick={() => trackClick('linkedin_click', { url: profile.socials.linkedin!, location: 'contact' })}
            >
              <div className="text-4xl mb-3">💼</div>
              <h3 className="font-semibold mb-2">LinkedIn</h3>
              <p className="text-sm text-blue-100">{(() => {
                try {
                  const u = new URL(profile.socials.linkedin!);
                  return `${u.hostname}${u.pathname.replace(/\/$/, '')}`;
                } catch {
                  return profile.socials.linkedin;
                }
              })()}</p>
            </a>
          )}

          {profile.socials.github && (
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-xl hover:bg-white/20 transition"
              onClick={() => trackClick('github_click', { url: profile.socials.github!, location: 'contact' })}
            >
              <div className="text-4xl mb-3">💻</div>
              <h3 className="font-semibold mb-2">GitHub</h3>
              <p className="text-sm text-blue-100">{(() => {
                try {
                  const u = new URL(profile.socials.github!);
                  return `${u.hostname}${u.pathname.replace(/\/$/, '')}`;
                } catch {
                  return profile.socials.github;
                }
              })()}</p>
            </a>
          )}
        </div>

        <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-xl inline-block">
          <p className="text-sm mb-2">📍 Based in</p>
          <p className="text-lg font-semibold">{profile.location}</p>
        </div>
      </div>
    </section>
  );
}
