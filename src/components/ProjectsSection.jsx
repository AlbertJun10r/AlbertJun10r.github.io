import { useEffect, useRef } from 'react';
import { initPlexus } from '../utils/plexusCanvas';

const projects = [
  {
    image: '/Assets/Images/Pages/dga-image.png',
    alt: 'DGA Vehicle customs management system',
    title: 'DGA Vehicle',
    description: 'Comprensive customs management system automating vehicle registration, transit control, and regulatory reporting to streamline monitoring and ensure full audit compliance.',
    tags: ['.NET Core', 'Blazor', 'APIREST', 'Vue.Js'],
    link: 'https://github.com/AlbertJun10r/VehiculosDGA-Front',
    hoverColor: 'group-hover:text-neo-red',
    offsetClass: '',
  },
  {
    image: '/Assets/Images/Pages/campusano.png',
    alt: 'Campusano RentCar platform',
    title: 'Campusano-RentCar',
    description: 'An intuitive rental platform offering diverse vehicle selections and transparent pricing to ensure seamless bookings, secure payments, and real-time availability for users.',
    tags: ['ASP.NET Core', 'C#', 'SQL Server', 'HTML/CSS', 'JavaScript'],
    link: 'https://campusanorentcars.com/',
    hoverColor: 'group-hover:text-neo-blue',
    offsetClass: 'mt-0 md:mt-20',
  },
  {
    image: '/Assets/Images/Pages/sales-system.png',
    alt: 'Sales management system',
    title: 'Sales System',
    description: 'Sales management system designed to streamline operations, enhance efficiency, and provide real-time insights into sales performance.',
    tags: ['Vue.js', 'ASP.NET Core', 'RESTFUL API', 'NODE.js', 'JavaScript'],
    link: 'https://github.com/AlbertJun10r/Sistema-de-Ventas',
    hoverColor: 'group-hover:text-neo-pink',
    offsetClass: '',
  },
  {
    image: '/Assets/Images/Pages/comingsoon.png',
    alt: 'Spotify clone project',
    title: 'Spotify',
    description: 'A clone of the mostly widely used music streaming platform that allows users to listen to music and podcasts.',
    tags: ['Astro 3', 'React JS', 'Svelte', 'TailwindCSS'],
    link: '',
    hoverColor: 'group-hover:text-neo-green',
    offsetClass: 'mt-0 md:mt-20',
  },
];

export default function ProjectsSection() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const cleanup = initPlexus(canvasRef.current);
    return cleanup;
  }, []);

  return (
    <section id="projects" className="py-24 bg-neo-yellow border-t-4 border-black px-4 overflow-hidden relative">
      <canvas id="plexus-canvas" ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        <h2
          className="text-6xl md:text-9xl font-black mb-16 uppercase tracking-tighter text-white drop-shadow-[4px_4px_0_rgba(0,0,0,1)] relative"
          style={{ WebkitTextStroke: '3px black' }}
        >
          Selected Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {projects.map(({ image, alt, title, description, tags, link, hoverColor, offsetClass }) => (
            <article key={title} className={`reveal group bg-white border-4 border-black p-4 shadow-hard ${offsetClass}`}>
              <div className="bg-black border-2 border-black aspect-video relative overflow-hidden mb-6 group-hover:shadow-none transition-all">
                <img
                  src={image}
                  alt={alt}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                />
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className={`text-4xl font-black uppercase mb-2 transition-colors glitch-hover ${hoverColor}`}>
                    {title}
                  </h3>
                  <p className="font-mono text-sm mb-4 max-w-xs">{description}</p>
                  <div className="flex gap-2 font-mono text-xs font-bold flex-wrap">
                    {tags.map((tag) => (
                      <span key={tag} className="bg-neo-black text-white px-2 py-1">{tag}</span>
                    ))}
                  </div>
                </div>
                <a
                  href={link || '#'}
                  className="w-12 h-12 border-2 border-black bg-neo-green flex items-center justify-center hover:bg-black hover:text-white transition-all cursor-hover shadow-hard-sm flex-shrink-0"
                >
                  <i className="ri-arrow-right-up-line text-2xl" />
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-24">
          <a
            href="https://github.com/AlbertJun10r?tab=repositories"
            className="inline-block bg-neo-black text-white px-12 py-5 font-bold font-mono text-xl hover:bg-neo-white hover:text-black border-4 border-black transition-all shadow-hard hover:shadow-none cursor-hover"
          >
            VIEW ALL REPOS ON GITHUB
          </a>
        </div>
      </div>
    </section>
  );
}
