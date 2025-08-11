// binary.js - Floating binary numbers animation in the background
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

let binaries = [];
const maxBinaries = 50; // number of floating numbers

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function createBinary() {
  let value = Math.random() > 0.5 ? "1" : "0" ;
  let x = Math.random() * canvas.width;
  let y = Math.random() * canvas.height;
  let speedY = 0.3 + Math.random() * 1; // floating speed
  let size = 14 + Math.random() * 20; // font size
  let opacity = 0.5 + Math.random() * 0.5;
  let fadeRate = 0.002 + Math.random() * 0.004; // how fast they fade

  binaries.push({ value, x, y, speedY, size, opacity, fadeRate });
}

function updateBinaries() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.font = "bold 20px monospace";
  ctx.textAlign = "center";

  for (let i = binaries.length - 1; i >= 0; i--) {
    let b = binaries[i];
    ctx.fillStyle = `rgba(100, 255, 35, ${b.opacity})`; // neon green
    ctx.font = `${b.size}px monospace`;
    ctx.fillText(b.value, b.x, b.y);

    b.y -= b.speedY; // drift upward
    b.opacity -= b.fadeRate; // fade out

    if (b.opacity <= 0 || b.y < -10) {
      binaries.splice(i, 1); // remove off-screen numbers
    }
  }
}

function animate() {
  if (binaries.length < maxBinaries && Math.random() < 0.3) {
    createBinary();
  }
  updateBinaries();
  requestAnimationFrame(animate);
}

animate();
