// Floating hearts generator
const heartsWrap = document.getElementById("hearts");
const random = (min, max) => Math.random() * (max - min) + min;
function spawnHeart({ x, size = 18, duration = 7000, drift = 40 }) {
  const h = document.createElement("span");
  h.className = "heart";
  h.style.left = x + "px";
  h.style.bottom = "-30px";
  h.style.width = h.style.height = size + "px";
  h.style.animationDuration = duration + "ms";
  h.style.filter = `hue-rotate(${Math.floor(random(-12, 12))}deg)`;
  h.style.transform = `translateY(0) scale(${random(0.7, 1.2)}) rotate(45deg)`;
  h.animate(
    [
      {
        transform: `translate(0, 10vh) scale(${random(0.7, 1)}) rotate(45deg)`,
        opacity: 0,
      },
      {
        transform: `translate(${random(
          -drift,
          drift
        )}px, -110vh) scale(${random(1, 1.25)}) rotate(45deg)`,
        opacity: 1,
      },
    ],
    { duration, easing: "linear" }
  );
  heartsWrap.appendChild(h);
  setTimeout(() => h.remove(), duration);
}

// Ambient continuous hearts
let ambient = setInterval(() => {
  const x = random(0, window.innerWidth);
  spawnHeart({
    x,
    size: random(10, 20),
    duration: random(6000, 9000),
    drift: random(20, 60),
  });
}, 450);

// Counter increments to 100 (or until forgiven)
const counterEl = document.getElementById("counter");
let count = 0;
let forgiven = false;
const counterTimer = setInterval(() => {
  if (forgiven) return;
  count = Math.min(count + 1, 100);
  counterEl.textContent = `Sorry x ${count}`;
  if (count === 100) clearInterval(counterTimer);
}, 120);

// Forgive button => burst of hearts + text swap
const forgiveBtn = document.getElementById("forgiveBtn");
forgiveBtn.addEventListener("click", () => {
  forgiven = true;
  forgiveBtn.textContent = "Thanks😘";
  burst(50);
});

function burst(n = 40) {
  const mid = window.innerWidth / 2;
  for (let i = 0; i < n; i++) {
    setTimeout(() => {
      const spread = Math.min(280, window.innerWidth * 0.4);
      const x = mid + random(-spread, spread);
      spawnHeart({
        x,
        size: random(14, 26),
        duration: random(2200, 4200),
        drift: random(60, 140),
      });
    }, i * 18);
  }
}

// Tiny audio cue (optional)
const voiceBtn = document.getElementById("voiceBtn");
const beep = document.getElementById("beep");
voiceBtn.addEventListener("click", async () => {
  try {
    await beep.play();
  } catch (e) {
    /* ignore autoplay errors */
  }
  // also do a mini heart sprinkle near the button
  const rect = voiceBtn.getBoundingClientRect();
  for (let i = 0; i < 14; i++) {
    const x = rect.left + random(-40, rect.width + 40);
    spawnHeart({
      x,
      size: random(10, 16),
      duration: random(1600, 2600),
      drift: random(40, 90),
    });
  }
});

// Resize listener to keep things stable
window.addEventListener("resize", () => {
  // no-op, but could adapt densities if needed
});

const title = document.querySelector(".title");

new TypeIt(title, {
  strings: "I'm Sorry Cutiee!",
  speed: 50,
  waitUntilVisible: true,
  loop: true,
  cursorChar: "|", // works
}).go();

