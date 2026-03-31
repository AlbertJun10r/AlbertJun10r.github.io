/**
 * Initializes and runs the plexus particle animation on a canvas element.
 * @param {HTMLCanvasElement} canvas
 * @returns {() => void} cleanup function to stop the animation
 */
export function initPlexus(canvas) {
  if (!canvas) return () => {};

  const ctx = canvas.getContext('2d');
  const particlesArray = [];
  const numberOfParticles = 562;
  const connectionDistance = 120;
  const particleVelocity = 1.3;
  let animFrameId;

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
      this.waveOffset += this.waveFreq;
      this.y += Math.sin(this.waveOffset) * 0.5;
      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      this.x = Math.max(0, Math.min(canvas.width, this.x));
      this.y = Math.max(0, Math.min(canvas.height, this.y));
    }

    draw() {
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

  function initParticles() {
    particlesArray.length = 0;
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle());
    }
  }

  function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    initParticles();
  }

  function drawConnections() {
    ctx.lineWidth = 1.5;
    for (let i = 0; i < particlesArray.length; i++) {
      for (let j = i + 1; j < particlesArray.length; j++) {
        const dx = particlesArray[i].x - particlesArray[j].x;
        const dy = particlesArray[i].y - particlesArray[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < connectionDistance) {
          const opacity = 1 - distance / connectionDistance;
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

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach((p) => { p.update(); p.draw(); });
    drawConnections();
    animFrameId = requestAnimationFrame(animate);
  }

  resizeCanvas();
  const onResize = () => resizeCanvas();
  window.addEventListener('resize', onResize);
  animate();

  return () => {
    cancelAnimationFrame(animFrameId);
    window.removeEventListener('resize', onResize);
  };
}
