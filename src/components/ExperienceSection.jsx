const experiences = [
  {
    color: 'bg-neo-yellow',
    title: 'Freelance Full-Stack Developer',
    period: 'February 2024 - PRESENT',
    company: '@ SELF_EMPLOYED',
    companyColor: 'text-neo-yellow',
    items: [
      'Building responsive and interactive web applications using HTML5, CSS3, and JavaScript',
      'Developing modern web applications using .NET, React, Next.js, and Node.js',
      'Creating custom web solutions tailored to client requirements',
    ],
  },
  {
    color: 'bg-neo-red',
    title: 'Software Development Intern',
    period: 'March 2025 – June 2025',
    company: '@ DGA',
    companyColor: 'text-neo-red',
    items: [
      'Processing and entering large volumes of data with 99%+ accuracy',
      'Maintaining data quality standards and performing regular audits',
      'Collaborating with team members to meet daily and weekly targets',
    ],
  },
  {
    color: 'bg-neo-green',
    title: 'Project Manager',
    period: 'January 2024 - Aug 2025',
    company: '@ SELF_EMPLOYED',
    companyColor: 'text-neo-green',
    items: [
      'Managing multiple client projects from initiation to completion',
      'Coordinating with development teams and ensuring project milestones',
      'Maintaining client relationships and handling project communications',
    ],
  },
  {
    color: 'bg-neo-blue',
    title: 'Process Administrator',
    period: 'November 2021 - May 2022',
    company: '@ GENUINE BAGS',
    companyColor: 'text-neo-blue',
    items: [
      'Used digital tools to manage and automate key processes',
      'Directed the entry and exit of product records',
      'Ensuring the accuracy and constant updating of the inventory',
    ],
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-24 px-4 max-w-7xl mx-auto">
      <h2 className="text-5xl md:text-8xl font-black uppercase mb-12 tracking-tighter text-center">
        Experience<span className="text-neo-red">_Log</span>
      </h2>

      <div className="relative border-l-4 border-black ml-4 md:ml-10 space-y-12">
        {experiences.map(({ color, title, period, company, companyColor, items }) => (
          <div key={title} className="reveal relative pl-8 md:pl-16">
            <div className={`absolute -left-[14px] top-2 w-6 h-6 ${color} border-4 border-black`} />
            <div className="bg-white border-4 border-black p-6 shadow-hard hover:shadow-hard-xl transition-all">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b-2 border-dashed border-gray-300 pb-4 mb-4">
                <h3 className="text-3xl font-black uppercase">{title}</h3>
                <span className="font-mono font-bold bg-neo-black text-white px-2 py-1">{period}</span>
              </div>
              <p className={`font-mono text-xl mb-2 ${companyColor} font-bold`}>{company}</p>
              <ul className="list-disc list-inside font-mono text-gray-700 space-y-1">
                {items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
