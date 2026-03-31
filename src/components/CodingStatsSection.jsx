import { useEffect, useState } from 'react';
import { useGithubStats } from '../hooks/useGithubStats';

function GithubBadges() {
  const [activeBadge, setActiveBadge] = useState(null);
  const [historyBadges, setHistoryBadges] = useState([]);
  const [status, setStatus] = useState('Fetching...');

  useEffect(() => {
    async function fetchBadges() {
      try {
        const res = await fetch('https://api.github.com/users/AlbertJun10r');
        if (!res.ok) throw new Error();
        const data = await res.json();
        setStatus('Loaded');

        const rankTitle = data.followers > 20 ? 'Star Developer' : 'Open Sourcer';
        const iconClass = data.followers > 20 ? 'ri-star-smile-fill' : 'ri-git-repository-fill';
        setActiveBadge({ rankTitle, iconClass });

        const awards = [];
        if (data.public_repos >= 10) awards.push({ name: '10+ Repos', icon: 'ri-folder-open-fill' });
        if (data.public_repos >= 50) awards.push({ name: '50+ Repos', icon: 'ri-folder-add-fill' });
        if (data.followers > 10) awards.push({ name: 'Popular', icon: 'ri-user-heart-fill' });
        if (!awards.length) awards.push({ name: 'Contributor', icon: 'ri-medal-line' });
        setHistoryBadges([...awards, ...awards, ...awards, ...awards]);
      } catch {
        setStatus('Failed');
      }
    }
    fetchBadges();
  }, []);

  return (
    <div className="mb-8 border-2 border-white/20 p-4 bg-neo-black/60 relative shadow-[4px_4px_0_rgba(51,255,87,0.1)] hover:border-neo-green transition-colors duration-500 h-auto md:h-[160px] flex flex-col">
      <div className="text-[9px] font-mono text-neo-green uppercase tracking-widest opacity-70 mb-3 flex items-center justify-between">
        <span>Trophy_Room</span>
        <span className={`animate-pulse ${status === 'Loaded' ? 'text-neo-green animate-none' : 'text-neo-yellow'}`}>{status}</span>
      </div>
      <div className="flex flex-col md:flex-row gap-4 flex-1">
        <div className="w-full md:w-1/3 flex flex-col items-center justify-center border-b-2 md:border-b-0 md:border-r-2 border-dashed border-white/10 pb-4 md:pb-0 md:pr-4">
          <div className="text-[8px] font-mono text-gray-400 uppercase mb-2">Highest Rank</div>
          {activeBadge ? (
            <>
              <div className="w-12 h-12 rounded-full border-2 border-neo-green flex items-center justify-center bg-neo-green/10 mb-2">
                <i className={`${activeBadge.iconClass} text-neo-green text-2xl`} />
              </div>
              <span className="text-[10px] font-mono text-white text-center">{activeBadge.rankTitle}</span>
            </>
          ) : (
            <div className="w-10 h-10 rounded-full border-2 border-white/20 border-t-neo-green animate-spin mb-2" />
          )}
        </div>
        <div className="w-full md:w-2/3 flex flex-col relative overflow-hidden">
          <div className="text-[8px] font-mono text-gray-400 uppercase mb-2">Achievements</div>
          <div className="relative w-full flex-1 overflow-hidden marquee-container">
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-neo-black/90 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-neo-black/90 to-transparent z-10 pointer-events-none" />
            <div className="flex gap-4 pb-2 items-center h-full absolute animate-marquee px-4">
              {historyBadges.map((b, i) => (
                <div key={i} className="min-w-[70px] flex flex-col items-center">
                  <div className="w-10 h-10 mb-2 flex items-center justify-center border-2 border-white/20 rounded-full bg-white/5">
                    <i className={`${b.icon} text-neo-green text-xl`} />
                  </div>
                  <span className="text-[9px] font-mono text-gray-300 font-bold text-center w-full truncate px-1">{b.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LeetCodeBadges() {
  const [activeBadge, setActiveBadge] = useState(null);
  const [historyBadges, setHistoryBadges] = useState([]);
  const [status, setStatus] = useState('Fetching...');

  useEffect(() => {
    async function fetchBadges() {
      try {
        const res = await fetch('https://alfa-leetcode-api.onrender.com/albertjun10r/badges');
        if (!res.ok) throw new Error();
        const data = await res.json();
        setStatus('Loaded');
        setActiveBadge(data.activeBadge || null);
        const badges = data.badges || [];
        setHistoryBadges([...badges, ...badges, ...badges]);
      } catch {
        // fallback
        setStatus('Loaded');
        setActiveBadge({ displayName: '50 Days Badge', icon: null, fallback: true });
        const fallback = [
          { displayName: 'Feb Badge', icon: null, fallbackIcon: 'ri-vip-diamond-fill', color: 'text-neo-blue' },
          { displayName: 'Jan Badge', icon: null, fallbackIcon: 'ri-medal-fill', color: 'text-neo-blue' },
          { displayName: '100 Days', icon: null, fallbackIcon: 'ri-shield-star-fill', color: 'text-gray-400' },
        ];
        setHistoryBadges([...fallback, ...fallback, ...fallback]);
      }
    }
    fetchBadges();
  }, []);

  const getIconUrl = (icon) =>
    icon ? (icon.startsWith('http') ? icon : 'https://leetcode.com' + icon) : null;

  return (
    <div className="mb-8 border-2 border-white/20 p-4 bg-neo-black/60 relative shadow-[4px_4px_0_rgba(255,107,0,0.1)] hover:border-neo-orange transition-colors duration-500 h-auto md:h-[160px] flex flex-col">
      <div className="text-[9px] font-mono text-neo-orange uppercase tracking-widest opacity-70 mb-3 flex items-center justify-between">
        <span>Performance_Badges</span>
        <span className={`${status === 'Loaded' ? 'text-neo-orange' : 'text-neo-yellow animate-pulse'}`}>{status}</span>
      </div>
      <div className="flex flex-col md:flex-row gap-4 flex-1">
        <div className="w-full md:w-1/3 flex flex-col items-center justify-center border-b-2 md:border-b-0 md:border-r-2 border-dashed border-white/10 pb-4 md:pb-0 md:pr-4">
          <div className="text-[8px] font-mono text-gray-400 uppercase mb-2">Active Badge</div>
          {activeBadge ? (
            activeBadge.fallback || !activeBadge.icon ? (
              <>
                <div className="w-12 h-12 rounded-full border-2 border-neo-orange flex items-center justify-center bg-neo-orange/10 mb-2">
                  <i className="ri-fire-fill text-neo-orange text-2xl" />
                </div>
                <span className="text-[10px] font-mono text-white text-center">50 Days Badge</span>
              </>
            ) : (
              <>
                <img src={getIconUrl(activeBadge.icon)} alt={activeBadge.displayName} className="w-12 h-12 object-contain mb-2" />
                <span className="text-[10px] font-mono text-white text-center">{activeBadge.displayName}</span>
              </>
            )
          ) : (
            <div className="w-10 h-10 rounded-full border-2 border-white/20 border-t-neo-orange animate-spin mb-2" />
          )}
        </div>
        <div className="w-full md:w-2/3 flex flex-col relative overflow-hidden">
          <div className="text-[8px] font-mono text-gray-400 uppercase mb-2">History Awards</div>
          <div className="relative w-full flex-1 overflow-hidden marquee-container">
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-neo-black/90 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-neo-black/90 to-transparent z-10 pointer-events-none" />
            <div className="flex gap-4 pb-2 items-center h-full absolute animate-marquee px-4">
              {historyBadges.map((badge, i) => {
                const iconUrl = badge.icon ? getIconUrl(badge.icon) : null;
                return (
                  <div key={i} className="min-w-[70px] flex flex-col items-center">
                    <div className="w-10 h-10 mb-2 flex items-center justify-center border-2 border-white/20 rounded-full bg-white/5">
                      {iconUrl ? (
                        <img src={iconUrl} alt={badge.displayName} className="w-full h-full object-contain" />
                      ) : (
                        <i className={`${badge.fallbackIcon || 'ri-medal-fill'} ${badge.color || 'text-neo-orange'} text-xl`} />
                      )}
                    </div>
                    <span className="text-[9px] font-mono text-gray-300 font-bold text-center w-full truncate px-1">{badge.displayName}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CodingStatsSection() {
  const stats = useGithubStats('AlbertJun10r');

  return (
    <section id="coding-stats" className="py-12 bg-neo-black text-white border-y-4 border-black relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 border-b-2 border-white pb-3">
          <h2 className="text-4xl md:text-5xl font-black uppercase text-white tracking-tight">
            CODING<span className="text-neo-green">_STATS</span>
          </h2>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <p className="font-mono text-neo-green text-xs font-bold">LIVE</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:auto-rows-fr">
          {/* GitHub Column */}
          <div className="reveal flex flex-col h-full">
            <div className="flex items-center gap-2 mb-4 border-b border-white/20 pb-2">
              <div className="w-8 h-8 bg-neo-green border-2 border-white flex items-center justify-center">
                <i className="ri-github-fill text-lg text-black" />
              </div>
              <h3 className="text-2xl font-black uppercase text-white">GITHUB</h3>
            </div>

            <div className="border-4 border-white/20 p-6 bg-black flex-1 flex flex-col shadow-[8px_8px_0_rgba(0,0,0,1)]">
              {/* Profile Header */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <i className="ri-github-fill text-3xl text-neo-green" />
                  <div>
                    <h4 className="text-xl font-black text-white leading-tight">AlbertJun10r</h4>
                    <p className="text-[10px] font-mono text-neo-green uppercase tracking-widest">Midnight Coder</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-neo-green tracking-tighter">{stats.contributions}</div>
                  <p className="text-[8px] font-mono text-gray-500 uppercase">Commits</p>
                </div>
              </div>

              <GithubBadges />

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8 uppercase">
                {[
                  { label: 'Repositories', value: stats.repos },
                  { label: 'Followers', value: stats.followers },
                  { label: 'Commits', value: stats.contributions },
                  { label: 'Joined', value: stats.createdAt, small: true },
                ].map(({ label, value, small }) => (
                  <div key={label} className="border-2 border-neo-green/30 bg-neo-black/60 p-4 hover:border-neo-green transition-colors shadow-[4px_4px_0_rgba(51,255,87,0.1)]">
                    <div className="text-[9px] font-mono text-neo-green mb-1 uppercase tracking-widest opacity-70">{label}</div>
                    <div className={`text-white font-black tracking-tighter ${small ? 'text-xl' : 'text-3xl'}`}>{value}</div>
                  </div>
                ))}
              </div>

              {/* Contribution Graph */}
              <div className="flex-1 flex flex-col justify-center mb-8">
                <div className="bg-black border-2 border-neo-green/30 p-2 overflow-hidden hover:border-neo-green transition-colors duration-500 relative">
                  <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-neo-green rounded-full animate-pulse" />
                  <p className="text-[8px] font-mono text-neo-green/50 uppercase tracking-[0.2em] mb-1">Matrix_Output</p>
                  <img
                    src="https://ghchart.rshah.org/33FF57/AlbertJun10r"
                    alt="GitHub Contribution Graph"
                    className="w-full h-auto filter brightness-110"
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="mt-auto flex items-center justify-between text-neo-green p-3 border-2 border-white/10 bg-neo-black font-mono text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="text-white/30">$</span>
                  <span className="text-neo-green">gh --stats</span>
                  <span className="animate-pulse">_</span>
                </div>
                <a
                  href="https://github.com/AlbertJun10r"
                  target="_blank"
                  rel="noreferrer"
                  className="text-neo-green px-3 py-1 font-black uppercase border border-neo-green hover:bg-neo-green hover:text-black transition-all"
                >
                  VIEW_GH →
                </a>
              </div>
            </div>
          </div>

          {/* LeetCode Column */}
          <div className="reveal flex flex-col h-full">
            <div className="flex items-center gap-2 mb-4 border-b border-white/20 pb-2">
              <div className="w-8 h-8 bg-neo-orange border-2 border-white flex items-center justify-center">
                <i className="ri-code-box-fill text-lg text-black" />
              </div>
              <h3 className="text-2xl font-black uppercase text-white">LEETCODE</h3>
            </div>

            <div className="border-4 border-white/20 p-6 bg-black flex-1 flex flex-col shadow-[8px_8px_0_rgba(0,0,0,1)]">
              {/* Profile Header */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <i className="ri-code-box-fill text-3xl text-neo-orange" />
                  <div>
                    <h4 className="text-xl font-black text-white leading-tight">AlbertJun10r</h4>
                    <p className="text-[10px] font-mono text-neo-orange uppercase tracking-widest">Problem Solver</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-neo-orange tracking-tighter">#Top</div>
                  <p className="text-[8px] font-mono text-gray-500 uppercase">Ranking</p>
                </div>
              </div>

              <LeetCodeBadges />

              {/* LeetCode stats card */}
              <div className="flex-1 flex flex-col justify-center mb-8">
                <div className="border-2 border-neo-orange/30 p-2 overflow-hidden bg-black hover:border-neo-orange transition-colors duration-500 relative">
                  <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-neo-orange rounded-full animate-pulse" />
                  <img
                    src="https://leetcard.jacoblin.cool/albertjun10r?theme=dark&font=Ubuntu&ext=heatmap"
                    alt="LeetCode Stats"
                    className="w-full h-auto object-contain filter contrast-125"
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="mt-auto flex items-center justify-between text-neo-orange p-3 border-2 border-white/10 bg-neo-black font-mono text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="text-white/30">$</span>
                  <span className="text-neo-orange">leetcode --u</span>
                  <span className="animate-pulse">_</span>
                </div>
                <a
                  href="https://leetcode.com/u/albertjun10r/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-neo-orange px-3 py-1 font-black uppercase border border-neo-orange hover:bg-neo-orange hover:text-black transition-all"
                >
                  VIEW_LC →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
