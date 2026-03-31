const reports = [
  {
    id: 'REPORT_001.log',
    color: 'hover:border-neo-green/50',
    accent: 'bg-neo-green',
    textColor: 'text-neo-green',
    starColor: 'text-neo-green/60',
    from: 'Student @ L J University',
    quote: '"Arham Proved no matter how pressure or less time is he makes projects complete outstandingly"',
  },
  {
    id: 'REPORT_002.log',
    color: 'hover:border-neo-blue/50',
    accent: 'bg-neo-blue',
    textColor: 'text-neo-blue',
    starColor: 'text-neo-blue/60',
    from: 'CEO @ Alpha Consultancy',
    quote: '"Fast, reliable, and actually has good taste in design. A rare combination."',
  },
  {
    id: 'REPORT_003.log',
    color: 'hover:border-neo-pink/50',
    accent: 'bg-neo-pink',
    textColor: 'text-neo-pink',
    starColor: 'text-neo-pink/60',
    from: 'Student @ L J University',
    quote: '"Cleanest code I\'ve seen in years. He knows how to handle complex state management."',
  },
  {
    id: 'REPORT_004.log',
    color: 'hover:border-neo-purple/50',
    accent: 'bg-neo-purple',
    textColor: 'text-neo-purple',
    starColor: 'text-neo-purple/60',
    from: 'Dev @ CreativeChaos',
    quote: '"Creative designing idea and provided a Unique UI experience."',
  },
  {
    id: 'REPORT_005.log',
    color: 'hover:border-neo-orange/50',
    accent: 'bg-neo-orange',
    textColor: 'text-neo-orange',
    starColor: 'text-neo-orange/60',
    from: 'UX Designer @ TechFlow',
    quote: '"Highly intuitive UX. Delivered exactly what we needed before we even knew we needed it."',
  },
];

function ReportCard({ report }) {
  return (
    <div className={`flex-shrink-0 w-[450px] bg-neo-black border-4 border-white/10 p-8 shadow-hard ${report.color} hover:-translate-y-2 transition-all duration-500 relative group/card overflow-hidden text-left whitespace-normal`}>
      <div className={`absolute top-0 left-0 w-full h-1 ${report.accent}`} />
      <div className="absolute -top-4 -right-4 w-12 h-12 bg-white/5 rotate-45" />
      <div className="flex justify-between items-start mb-6">
        <div className={`font-mono ${report.textColor} text-xs font-bold tracking-widest uppercase`}>{report.id}</div>
        <div className="text-[10px] font-mono text-gray-500">2025.txt</div>
      </div>
      <div className="font-mono text-gray-400 text-[10px] mb-2 uppercase tracking-tight">FROM: {report.from}</div>
      <p className="font-bold text-xl leading-snug mb-6 text-white/90">{report.quote}</p>
      <div className={`flex ${report.starColor} gap-1 text-lg`}>
        {[...Array(5)].map((_, i) => (
          <i key={i} className="ri-star-fill" />
        ))}
      </div>
    </div>
  );
}

export default function ReportsSection() {
  const allReports = [...reports, ...reports]; // duplicate for seamless loop

  return (
    <section id="reports" className="py-24 bg-neo-black border-t-4 border-black overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-2 mb-16 bg-white/5 border-2 border-white/10 p-4 inline-flex shadow-hard shadow-neo-blue/20">
          <div className="flex gap-2">
            <div className="h-3 w-3 bg-red-500 rounded-full border border-black" />
            <div className="h-3 w-3 bg-yellow-500 rounded-full border border-black" />
            <div className="h-3 w-3 bg-green-500 rounded-full border border-black" />
          </div>
          <h2 className="font-mono text-white text-xl font-bold ml-4 tracking-tighter">USER_REPORTS.txt</h2>
          <div className="ml-8 px-2 bg-neo-blue text-black text-[10px] font-black uppercase">LIVE_FEED</div>
        </div>
      </div>

      <div className="marquee-container group cursor-hover">
        <div className="marquee-content flex gap-8 py-12 px-4 select-none">
          {allReports.map((report, i) => (
            <ReportCard key={`${report.id}-${i}`} report={report} />
          ))}
        </div>
      </div>
    </section>
  );
}
