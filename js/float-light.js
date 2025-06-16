(function () {
  const canvas = document.createElement('canvas');
  canvas.id = 'float-light-canvas';
  canvas.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    pointer-events: none;
  `;
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let w, h;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  class LightDot {
    constructor(initial = false) {
      this.reset(initial);
    }

    reset(initial = false) {
      this.x = Math.random() * w;
      this.y = initial ? Math.random() * h : h + Math.random() * 100;
      this.radius = Math.random() * 0.4 + 0.15; // 更小的光点
      this.alpha = Math.random() * 0.8 + 0.8;   // 更亮但不满亮
      this.speedX = Math.random() * 0.4 + 0.2; // 向右吹
      this.speedY = -(Math.random() * 0.5 + 0.3); // 向上
      this.angle = Math.random() * Math.PI * 2;
      this.angularSpeed = Math.random() * 0.01 - 0.005;
    }

    update() {
      this.angle += this.angularSpeed;
      this.x += this.speedX + Math.sin(this.angle) * 0.1;
      this.y += this.speedY + Math.cos(this.angle) * 0.1;

      if (this.y < -10 || this.x < -10 || this.x > w + 10) {
        this.reset();
        this.y = h + 10;
      }
    }

    draw() {
      const gradient = ctx.createRadialGradient(
        this.x,
        this.y,
        0,
        this.x,
        this.y,
        this.radius * 5
      );
      gradient.addColorStop(0, `rgba(255, 220, 100, ${this.alpha})`);
      gradient.addColorStop(1, `rgba(255, 220, 100, 0)`);

      ctx.beginPath();
      ctx.fillStyle = gradient;
      ctx.arc(this.x, this.y, this.radius * 5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  let dots = [];

  function initDots(count = 160) {
    dots = [];
    for (let i = 0; i < count; i++) {
      dots.push(new LightDot(true)); // 初始时就全屏分布
    }
  }

  function animate() {
    ctx.clearRect(0, 0, w, h);
    dots.forEach((dot) => {
      dot.update();
      dot.draw();
    });
    requestAnimationFrame(animate);
  }

  resize();
  initDots();
  animate();
  window.addEventListener('resize', resize);
})();
