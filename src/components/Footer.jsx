export default function Footer() {
  return (
    <footer className="bg-black text-white py-16 px-4 border-t-8 border-neo-green font-mono relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
        <div className="col-span-1 md:col-span-2">
          <h2 className="text-4xl font-black mb-6">A.J</h2>
          <p className="text-gray-400 max-w-sm">
            Designing for the future with the raw aesthetics of the past. No cookies, no trackers, just code.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-neo-green mb-4 border-b border-gray-700 pb-2">SITEMAP</h3>
          <ul className="space-y-2 text-gray-400">
            {[['#', 'Home'], ['#projects', 'Works'], ['#about', 'About'], ['#contact', 'Contact']].map(([href, label]) => (
              <li key={label}>
                <a href={href} className="hover:text-white hover:underline decoration-neo-pink decoration-2 cursor-hover">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-neo-green mb-4 border-b border-gray-700 pb-2">SOCIALS</h3>
          <div className="flex gap-4">
            <a href="https://leetcode.com/u/albertjun10r/" className="text-2xl hover:text-neo-blue transition-colors cursor-hover">
              <i className="ri-code-fill" />
            </a>
            <a href="https://www.instagram.com/albert_jun10r?igsh=NTA3aTM5czc5ajQ2" className="text-2xl hover:text-neo-pink transition-colors cursor-hover">
              <i className="ri-instagram-fill" />
            </a>
            <a href="https://github.com/AlbertJun10r" className="text-2xl hover:text-neo-yellow transition-colors cursor-hover">
              <i className="ri-github-fill" />
            </a>
            <a href="https://www.linkedin.com/in/albertjunior554/" className="text-2xl hover:text-neo-purple transition-colors cursor-hover">
              <i className="ri-linkedin-fill" />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center mt-16 pt-8 border-t border-gray-800 text-gray-500 text-sm">
        <p>© 2025 A.J // SYSTEM_END</p>
      </div>

      <div className="absolute bottom-0 left-0 w-full text-[20vw] font-black text-white opacity-[0.03] leading-none select-none pointer-events-none text-center">
        BRUTAL
      </div>
    </footer>
  );
}
