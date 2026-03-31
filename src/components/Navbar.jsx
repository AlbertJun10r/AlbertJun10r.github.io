export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 px-4 py-4 pointer-events-none">
      <div className="max-w-7xl mx-auto flex justify-between items-center pointer-events-auto">
        <a
          href="#"
          className="bg-neo-white border-2 border-black px-4 py-1 text-2xl font-black shadow-hard hover:bg-neo-yellow transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none cursor-hover"
        >
          Alb_er.exe
        </a>

        <div className="hidden md:flex gap-4 bg-white border-2 border-black p-2 shadow-hard">
          <a href="#about" className="px-3 py-1 font-mono font-bold text-sm hover:bg-black hover:text-white transition-colors cursor-hover">
            /ABOUT
          </a>
          <a href="#skills" className="px-3 py-1 font-mono font-bold text-sm hover:bg-black hover:text-white transition-colors cursor-hover">
            /SKILLS
          </a>
          <a href="#experience" className="px-3 py-1 font-mono font-bold text-sm hover:bg-black hover:text-white transition-colors cursor-hover">
            /LOGS
          </a>
          <a href="#projects" className="px-3 py-1 font-mono font-bold text-sm hover:bg-black hover:text-white transition-colors cursor-hover">
            /WORK
          </a>
          <a href="#contact" className="px-3 py-1 font-mono font-bold text-sm bg-neo-yellow border border-black hover:bg-neo-pink transition-colors cursor-hover">
            HIRE ME
          </a>
        </div>
      </div>
    </nav>
  );
}
