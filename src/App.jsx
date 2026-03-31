import { useScrollReveal } from './hooks/useScrollReveal';
import Cursor from './components/Cursor';
import ProgressBar from './components/ProgressBar';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import MarqueeBanner from './components/MarqueeBanner';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ExperienceSection from './components/ExperienceSection';
import CodingStatsSection from './components/CodingStatsSection';
import ProjectsSection from './components/ProjectsSection';
import ReportsSection from './components/ReportsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function App() {
  useScrollReveal();

  return (
    <>
      {/* Google Tag Manager noscript */}
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-TLNG322R"
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>

      <Cursor />
      <ProgressBar />
      <Navbar />
      <HeroSection />
      <MarqueeBanner />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <CodingStatsSection />
      <ProjectsSection />
      <ReportsSection />
      <ContactSection />
      <Footer />
    </>
  );
}
