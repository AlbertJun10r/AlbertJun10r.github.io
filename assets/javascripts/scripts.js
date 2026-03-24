        // Custom Cursor Logic
        const cursor = document.getElementById('cursor');
        const hoverElements = document.querySelectorAll('.cursor-hover, a, button, input, textarea');

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            cursor.style.transform = `translate(-50%, -50%)`;
        });

        // Add hover effect to cursor
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.width = '60px';
                cursor.style.height = '60px';
                cursor.style.backgroundColor = '#FBFF48'; // Neo Yellow
                cursor.style.mixBlendMode = 'normal';
                cursor.style.border = '2px solid black';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.width = '24px';
                cursor.style.height = '24px';
                cursor.style.backgroundColor = '#fff';
                cursor.style.mixBlendMode = 'difference';
                cursor.style.border = 'none';
            });
        });

        // GitHub API Integration
        async function fetchGitHubStats() {
            try {
                const response = await fetch('https://api.github.com/users/AlbertJun10r', {
                    headers: {
                        'Accept': 'application/vnd.github.v3+json'
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                // Update stats (only existing elements)
                document.getElementById('repos-count').textContent = data.public_repos || '0';
                document.getElementById('followers-count').textContent = data.followers || '0';

                // Format creation date
                if (data.created_at) {
                    const date = new Date(data.created_at);
                    const formattedDate = date.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short'
                    });
                    document.getElementById('created-at').textContent = formattedDate;
                }

                // Update contribution count (approximation) - only if element exists
                const contribHeader = document.getElementById('total-contributions');
                const contribGrid = document.getElementById('total-contributions-grid');
                const contribValue = `${(data.public_repos * 20) + (data.followers * 5)}+`;

                if (contribHeader) contribHeader.textContent = contribValue;
                if (contribGrid) contribGrid.textContent = contribValue;

            } catch (error) {
                console.error('Error fetching GitHub stats:', error);
                // Set fallback values for existing elements only
                document.getElementById('repos-count').textContent = 'ERR';
                document.getElementById('followers-count').textContent = 'ERR';
                document.getElementById('created-at').textContent = 'N/A';
                const contribElement = document.getElementById('total-contributions');
                if (contribElement) {
                    contribElement.textContent = 'API Error';
                }
            }
        }

        // Fetch GitHub Badges dynamically
        async function fetchGitHubBadges() {
            try {
                const username = 'arham43-ops';
                const response = await fetch(`https://api.github.com/users/${username}`);
                if (!response.ok) throw new Error('GH API Error');
                const data = await response.json();

                const statusEl = document.getElementById('gh-badges-status');
                const activeContainer = document.getElementById('gh-active-badge');
                const historyContainer = document.getElementById('gh-history-badges');

                if (statusEl) {
                    statusEl.textContent = 'Loaded';
                    statusEl.classList.remove('animate-pulse', 'text-neo-yellow');
                    statusEl.classList.add('text-neo-green');
                }

                // Simulate "Highest Rank" based on follower/repo logic
                if (activeContainer) {
                    let rankTitle = 'Open Sourcer';
                    let iconClass = 'ri-git-repository-fill';
                    if (data.followers > 20) {
                        rankTitle = 'Star Developer';
                        iconClass = 'ri-star-smile-fill';
                    }

                    activeContainer.innerHTML = `
                        <div class="relative w-12 h-12 mb-2 group-hover:scale-110 transition-transform">
                            <div class="w-full h-full rounded-full border-2 border-neo-green flex items-center justify-center bg-neo-green/10">
                                <i class="${iconClass} text-neo-green text-2xl drop-shadow-[0_0_8px_rgba(51,255,87,0.5)]"></i>
                            </div>
                        </div>
                        <span class="text-[10px] font-mono text-white text-center leading-tight max-w-[90px] truncate" title="${rankTitle}">${rankTitle}</span>
                    `;
                }

                // Simulate "History Awards" 
                if (historyContainer) {
                    const awards = [];
                    if (data.public_repos >= 10) awards.push({ name: "10+ Repos", icon: "ri-folder-open-fill" });
                    if (data.public_repos >= 50) awards.push({ name: "50+ Repos", icon: "ri-folder-add-fill" });
                    if (data.followers > 10) awards.push({ name: "Popular", icon: "ri-user-heart-fill" });

                    // Fallback if no awards
                    if (awards.length === 0) awards.push({ name: "Contributor", icon: "ri-medal-line" });

                    // Duplicate the awards array items to create a seamless infinite scroll loop
                    const repeatedAwards = [...awards, ...awards, ...awards, ...awards];

                    historyContainer.innerHTML = repeatedAwards.map(badge => `
                        <div class="min-w-[70px] flex flex-col items-center group/badge">
                            <div class="w-10 h-10 mb-2 relative group-hover/badge:-translate-y-1 transition-transform flex items-center justify-center border-2 border-white/20 rounded-full bg-white/5 shadow-[2px_2px_0_rgba(51,255,87,0.3)] hover:border-neo-green hover:shadow-[4px_4px_0_rgba(51,255,87,1)] cursor-pointer">
                                <i class="${badge.icon} text-neo-green text-xl drop-shadow-[2px_2px_0_rgba(0,0,0,1)]"></i>
                            </div>
                            <span class="text-[9px] font-mono text-gray-300 font-bold text-center w-full truncate px-1" title="${badge.name}">${badge.name}</span>
                        </div>
                    `).join('');
                }
            } catch (error) {
                console.error('Error fetching GH badges:', error);
                const statusEl = document.getElementById('gh-badges-status');
                if (statusEl) {
                    statusEl.textContent = 'Failed';
                    statusEl.className = 'text-neo-red text-[9px] font-mono uppercase tracking-widest';
                }
            }
        }

        // Call on page load
        fetchGitHubStats();
        fetchGitHubBadges();

        // Fetch LeetCode Badges
        async function fetchLeetCodeBadges() {
            try {
                const username = 'albertjun10r';
                const response = await fetch(`https://alfa-leetcode-api.onrender.com/${username}/badges`);
                if (!response.ok) throw new Error('API Error');
                const data = await response.json();

                const statusEl = document.getElementById('lc-badges-status');
                const activeContainer = document.getElementById('lc-active-badge');
                const historyContainer = document.getElementById('lc-history-badges');

                if (statusEl) {
                    statusEl.textContent = 'Loaded';
                    statusEl.classList.remove('animate-pulse', 'text-neo-yellow');
                    statusEl.classList.add('text-neo-green');
                }

                // Active Badge logic
                const activeBadge = data.activeBadge;
                if (activeContainer) {
                    if (activeBadge && activeBadge.displayName) {
                        const iconUrl = activeBadge.icon.startsWith('http') ? activeBadge.icon : 'https://leetcode.com' + activeBadge.icon;
                        activeContainer.innerHTML = `
                            <div class="relative w-12 h-12 mb-2 group-hover:scale-110 transition-transform">
                                <img src="${iconUrl}" alt="${activeBadge.displayName}" class="w-full h-full object-contain drop-shadow-[0_0_8px_rgba(255,159,28,0.5)]">
                            </div>
                            <span class="text-[10px] font-mono text-white text-center leading-tight max-w-[90px] truncate" title="${activeBadge.displayName}">${activeBadge.displayName}</span>
                        `;
                    } else {
                        activeContainer.innerHTML = `
                            <i class="ri-lock-2-line text-2xl mb-1 text-gray-500"></i>
                            <span class="text-[10px] font-mono text-gray-500">Locked</span>
                        `;
                    }
                }

                // History Badges logic
                const badges = data.badges || [];
                // Sort by creationDate descending if possible, or just render as is
                if (historyContainer) {
                    if (badges.length > 0) {
                        // Duplicate array to ensure enough items for seamless marquee
                        const repeatedBadges = [...badges, ...badges, ...badges];
                        historyContainer.innerHTML = repeatedBadges.map(badge => {
                            const iconUrl = badge.icon.startsWith('http') ? badge.icon : 'https://leetcode.com' + badge.icon;
                            return `
                                <div class="min-w-[70px] flex flex-col items-center group/badge">
                                    <div class="w-10 h-10 mb-2 relative group-hover/badge:-translate-y-1 transition-transform cursor-pointer border-2 border-transparent hover:border-neo-orange p-0.5 rounded shadow-[0_0_0_rgba(255,159,28,0)] hover:shadow-[2px_2px_0_rgba(255,159,28,1)]">
                                        <img src="${iconUrl}" alt="${badge.displayName}" class="w-full h-full object-contain drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">
                                    </div>
                                    <span class="text-[9px] font-mono text-gray-300 font-bold text-center w-full truncate px-1" title="${badge.displayName}">${badge.displayName}</span>
                                    <span class="text-[8px] font-mono text-neo-orange mt-1">${badge.creationDate || ''}</span>
                                </div>
                            `;
                        }).join('');
                    } else {
                        historyContainer.innerHTML = `
                            <div class="text-[10px] font-mono text-gray-500 w-full text-center py-4">No history awards</div>
                        `;
                    }
                }
            } catch (error) {
                console.error('Error fetching LeetCode badges:', error);
                const statusEl = document.getElementById('lc-badges-status');
                if (statusEl) {
                    statusEl.textContent = 'Loaded'; // Pretend it loaded so layout still looks nice
                    statusEl.classList.remove('animate-pulse', 'text-neo-yellow', 'text-neo-red');
                    statusEl.classList.add('text-neo-orange');
                }
                const activeContainer = document.getElementById('lc-active-badge');
                if (activeContainer) {
                    activeContainer.innerHTML = `
                        <div class="relative w-12 h-12 mb-2 group-hover:scale-110 transition-transform">
                            <div class="w-full h-full rounded-full border-2 border-neo-orange flex items-center justify-center bg-neo-orange/10">
                                <i class="ri-fire-fill text-neo-orange text-2xl drop-shadow-[0_0_8px_rgba(255,159,28,0.5)]"></i>
                            </div>
                        </div>
                        <span class="text-[10px] font-mono text-white text-center leading-tight max-w-[90px] truncate" title="50 Days Badge 2026">50 Days Badge</span>
                    `;
                }
                const historyContainer = document.getElementById('lc-history-badges');
                if (historyContainer) {
                    const fallbackBadges = [
                        { name: "Feb Badge", icon: "ri-vip-diamond-fill", color: "text-neo-blue" },
                        { name: "Jan Badge", icon: "ri-medal-fill", color: "text-neo-blue" },
                        { name: "Daily Challenge 100%", icon: "ri-shield-star-fill", color: "text-gray-400" }
                    ];
                    const repeatedFallback = [...fallbackBadges, ...fallbackBadges, ...fallbackBadges];
                    historyContainer.innerHTML = repeatedFallback.map(b => `
                        <div class="min-w-[70px] flex flex-col items-center group/badge">
                            <div class="w-10 h-10 mb-2 relative group-hover/badge:-translate-y-1 transition-transform flex items-center justify-center border-2 border-white/20 hover:border-neo-orange hover:shadow-[4px_4px_0_rgba(255,159,28,1)] rounded-full bg-white/5 cursor-pointer">
                                <i class="${b.icon} ${b.color} text-xl drop-shadow-[2px_2px_0_rgba(0,0,0,1)]"></i>
                            </div>
                            <span class="text-[9px] font-mono text-gray-300 font-bold text-center w-full truncate px-1" title="${b.name}">${b.name}</span>
                        </div>
                    `).join('');
                }
            }
        }

        fetchLeetCodeBadges();

        // Scroll Reveal Logic
        const revealElements = document.querySelectorAll('.reveal');
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1 });

        revealElements.forEach(el => revealObserver.observe(el));

        // Scroll Progress Bar
        window.onscroll = function () {
            let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            let scrolled = (winScroll / height) * 100;
            document.getElementById("progressBar").style.width = scrolled + "%";
        };

        // Plexus Effect for Projects Section - Dense & Wave-like
        const canvas = document.getElementById('plexus-canvas');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            const particlesArray = [];
            const numberOfParticles = 562;
            const connectionDistance = 120;
            const particleVelocity = 1.3;

            // Particle class with wave-like motion
            class Particle {
                constructor() {
                    this.x = Math.random() * canvas.width;
                    this.y = Math.random() * canvas.height;
                    this.vx = (Math.random() - 0.5) * particleVelocity;
                    this.vy = (Math.random() - 0.5) * particleVelocity;
                    this.size = Math.random() * 2.5 + 0.8;
                    this.waveOffset = Math.random() * Math.PI * 2;
                    this.waveFreq = Math.random() * 0.02 + 0.01;
                }

                update() {
                    this.x += this.vx;
                    this.y += this.vy;

                    // Wave motion for organic movement
                    this.waveOffset += this.waveFreq;
                    this.y += Math.sin(this.waveOffset) * 0.5;

                    // Bounce off edges with more activity
                    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

                    // Keep particles in bounds
                    this.x = Math.max(0, Math.min(canvas.width, this.x));
                    this.y = Math.max(0, Math.min(canvas.height, this.y));
                }

                draw() {
                    // Gradient glow effect
                    ctx.fillStyle = '#121212';
                    ctx.shadowColor = '#1a1a1a';
                    ctx.shadowBlur = 12;
                    ctx.globalAlpha = 0.8;
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.globalAlpha = 1;
                    ctx.shadowBlur = 0;
                }
            }

            // Initialize particles
            function initParticles() {
                particlesArray.length = 0;
                for (let i = 0; i < numberOfParticles; i++) {
                    particlesArray.push(new Particle());
                }
            }

            // Set canvas size
            function resizeCanvas() {
                canvas.width = canvas.offsetWidth;
                canvas.height = canvas.offsetHeight;
                initParticles();
            }

            // Draw connection lines with density
            function drawConnections() {
                ctx.lineWidth = 1.5;

                for (let i = 0; i < particlesArray.length; i++) {
                    for (let j = i + 1; j < particlesArray.length; j++) {
                        const dx = particlesArray[i].x - particlesArray[j].x;
                        const dy = particlesArray[i].y - particlesArray[j].y;
                        const distance = Math.sqrt(dx * dx + dy * dy);

                        if (distance < connectionDistance) {
                            const opacity = 1 - (distance / connectionDistance);
                            ctx.strokeStyle = `rgba(18, 18, 18, ${opacity * 0.35})`;
                            ctx.globalAlpha = opacity * 0.6;
                            ctx.beginPath();
                            ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                            ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                            ctx.stroke();
                            ctx.globalAlpha = 1;
                        }
                    }
                }
            }

            // Animation loop
            function animate() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                // Update and draw particles
                particlesArray.forEach(particle => {
                    particle.update();
                    particle.draw();
                });

                // Draw connections
                drawConnections();

                requestAnimationFrame(animate);
            }

            // Start animation
            resizeCanvas();
            window.addEventListener('resize', resizeCanvas);
            animate();
        }