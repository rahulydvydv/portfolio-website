document.addEventListener("DOMContentLoaded", () => {
  console.log("Particle JS Loaded");

  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  // Set canvas size
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particleArray = [];

  // Particle constructor
  function Particle(x, y, directionX, directionY, size, color) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
  }

  // Draw particle
  Particle.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  };

  // Update particle
  Particle.prototype.update = function () {
    if (this.x + this.size > canvas.width || this.x - this.size < 0) {
      this.directionX *= -1;
    }

    if (this.y + this.size > canvas.height || this.y - this.size < 0) {
      this.directionY *= -1;
    }

    this.x += this.directionX;
    this.y += this.directionY;

    this.draw();
  };

  // Initialize particles
  function init() {
    particleArray = [];

    for (let i = 0; i < 300; i++) { // reduced for performance
      let size = Math.random() * 2 + 1;
      let x = Math.random() * (canvas.width - size * 2);
      let y = Math.random() * (canvas.height - size * 2);
      let directionX = Math.random() * 2 - 1;
      let directionY = Math.random() * 2 - 1;
      let color = "#ffffff";

      particleArray.push(
        new Particle(x, y, directionX, directionY, size, color)
      );
    }
  }

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particleArray.forEach(particle => particle.update());
  }

  // Resize handling
  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
  });

  // Start
  init();
  animate();
});