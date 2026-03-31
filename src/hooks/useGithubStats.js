import { useState, useEffect } from 'react';

export function useGithubStats(username) {
  const [stats, setStats] = useState({
    repos: '--',
    followers: '--',
    contributions: '--',
    createdAt: '--',
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch(`https://api.github.com/users/${username}`, {
          headers: { Accept: 'application/vnd.github.v3+json' },
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        const createdAt = data.created_at
          ? new Date(data.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
            })
          : 'N/A';

        const contributions = `${(data.public_repos * 20) + (data.followers * 5)}+`;

        setStats({
          repos: data.public_repos || '0',
          followers: data.followers || '0',
          contributions,
          createdAt,
        });
      } catch (err) {
        console.error('GitHub stats error:', err);
        setStats({ repos: 'ERR', followers: 'ERR', contributions: 'ERR', createdAt: 'N/A' });
      }
    }

    fetchStats();
  }, [username]);

  return stats;
}
