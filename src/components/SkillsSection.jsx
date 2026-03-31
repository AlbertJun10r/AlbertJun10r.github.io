const skills = [
  { label: 'REACT',      category: '> _ LIBRARY',   hoverBg: 'hover:bg-white' },
  { label: 'NEXT.JS',    category: '> _ FRAMEWORK',  hoverBg: 'hover:bg-neo-yellow' },
  { label: 'C#',         category: '> _ LANGUAGE',   hoverBg: 'hover:bg-neo-blue' },
  { label: 'NODE.JS',    category: '> _ BACKEND',    hoverBg: 'hover:bg-neo-green' },
  { label: 'TAILWIND',   category: '> _ STYLING',    hoverBg: 'hover:bg-neo-pink' },
  { label: 'MySQL',      category: '> _ DATA',       hoverBg: 'hover:bg-neo-purple' },
  { label: 'HTML5',      category: '> _ CORE',       hoverBg: 'hover:bg-neo-orange' },
  { label: 'GIT',        category: '> _ VERSION',    hoverBg: 'hover:bg-white' },
  { label: 'GRAPHQL',    category: '> _ QUERY',      hoverBg: 'hover:bg-white' },
  { label: 'GitHub',     category: '> _ OPS',        hoverBg: 'hover:bg-neo-blue' },
  { label: 'JAVA',       category: '> _ LANGUAGE',   hoverBg: 'hover:bg-neo-orange' },
  { label: '.NETCORE',   category: '> _ FRAMEWORK',  hoverBg: 'hover:bg-neo-yellow' },
  { label: 'JAVASCRIPT', category: '> _ LANGUAGE',   hoverBg: 'hover:bg-neo-pink' },
  { label: 'LARAVEL',    category: '> _ FRAMEWORK',  hoverBg: 'hover:bg-white' },
  { label: 'THREE.JS',   category: '> _ 3D',         hoverBg: 'hover:bg-neo-green' },
  { label: 'C++',        category: '> _ LANGUAGE',   hoverBg: 'hover:bg-neo-purple' },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="py-20 bg-neo-black text-white border-y-4 border-black relative overflow-hidden">
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-[1400px] mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b-4 border-white pb-4">
          <h2 className="text-6xl md:text-8xl font-black uppercase text-white tracking-tighter">
            TECH<span className="text-neo-green">_STACK</span>
          </h2>
          <div className="flex items-center gap-2 mb-2 md:mb-4">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            <p className="font-mono text-neo-green text-sm font-bold">/// SYSTEM_OPTIMIZED</p>
          </div>
        </div>

        {/* Skills grid */}
        <div className="flex flex-wrap justify-center md:justify-start">
          {skills.map(({ label, category, hoverBg }) => (
            <div
              key={label}
              className={`group w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 xl:w-[12.5%] h-24 border-r-2 border-b-2 border-white/20 bg-neo-black ${hoverBg} transition-all duration-0 hover:z-10 relative cursor-hover flex flex-col items-center justify-center p-2`}
            >
              <div className="text-neo-green group-hover:text-black font-mono text-xs mb-1 opacity-50">
                {category}
              </div>
              <div className="text-white group-hover:text-black font-black font-display text-xl uppercase">
                {label}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t-4 border-white mt-8 pt-4 flex justify-between font-mono text-xs text-gray-500">
          <span>TOTAL_NODES: 16</span>
          <span>MEMORY_USAGE: 128MB</span>
        </div>
      </div>
    </section>
  );
}
