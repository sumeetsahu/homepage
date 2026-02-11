import { PhilosophyData } from '../types';

interface PhilosophyProps {
  data: PhilosophyData;
}

export default function Philosophy({ data }: PhilosophyProps) {
  return (
    <section className="py-20 px-6 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto max-w-4xl text-center">
        <p className="text-3xl md:text-4xl font-light leading-relaxed mb-6 italic">
          "{data.quote}"
        </p>
        <p className="text-sm text-gray-400 uppercase tracking-widest">— {data.caption}</p>
      </div>
    </section>
  );
}
