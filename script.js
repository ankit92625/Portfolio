// EDIT THESE VALUES BEFORE SHARING.
const WHATSAPP_NUMBER = "919262538824"; // country code + number, no + or spaces
const CONTACT_EMAIL = "ankitkumar.cse23@gmail.com";
const SOCIALS = {
  instagram: "https://instagram.com/ankit____9262",
  github: "https://github.com/ankit92625",
  linkedin: "https://www.linkedin.com/in/ankit-kumar-37236330a/"
};
document.getElementById("year").textContent = new Date().getFullYear();
const msg = encodeURIComponent("Hi Ankit! I saw your portfolio and want a website for my business. I would like the launch offer.");
document.querySelectorAll("[data-wa]").forEach(l => l.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`);
document.querySelectorAll("[data-social]").forEach(l => l.href = SOCIALS[l.dataset.social]);
const em = document.getElementById("email-link"); em.href = `mailto:${CONTACT_EMAIL}`;
const toggle = document.querySelector(".menu-toggle"), nav = document.querySelector(".nav");
toggle.addEventListener("click", () => toggle.setAttribute("aria-expanded", String(nav.classList.toggle("open"))));
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => { nav.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); }));

// 3D tilt on cards
document.querySelectorAll("[data-tilt]").forEach(c => {
  c.addEventListener("mousemove", e => { const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
    c.style.transform = `rotateY(${x * 14}deg) rotateX(${-y * 14}deg) translateZ(10px)`; });
  c.addEventListener("mouseleave", () => c.style.transform = "");
});

// Cursor-following colour-ink background + mathematical wave lattice
const F = document.getElementById("fluid"), M = document.getElementById("math"), fx = F.getContext("2d"), mx = M.getContext("2d");
let W, H, t = 0, hue = 0; const m = { x: innerWidth / 2, y: innerHeight / 2, tx: innerWidth / 2, ty: innerHeight / 2 };
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
function size() { W = F.width = M.width = innerWidth; H = F.height = M.height = innerHeight; fx.fillStyle = "#070914"; fx.fillRect(0, 0, W, H); }
size(); addEventListener("resize", size);
addEventListener("pointermove", e => { m.tx = e.clientX; m.ty = e.clientY; });
const blob = (x, y, r, h, a) => { const g = fx.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, `hsla(${h},100%,60%,${a})`); g.addColorStop(1, `hsla(${h},100%,60%,0)`); fx.fillStyle = g; fx.beginPath(); fx.arc(x, y, r, 0, 7); fx.fill(); };
function frame() {
  t += .01; hue = (hue + .6) % 360;
  m.x += (m.tx - m.x) * .12; m.y += (m.ty - m.y) * .12;
  fx.globalCompositeOperation = "source-over"; fx.fillStyle = "rgba(7,9,20,.05)"; fx.fillRect(0, 0, W, H);
  fx.globalCompositeOperation = "lighter";
  blob(m.x, m.y, 130, hue, .35); blob(m.x + Math.sin(t * 3) * 50, m.y + Math.cos(t * 3) * 50, 90, (hue + 120) % 360, .3);
  for (let i = 0; i < 3; i++) blob(W / 2 + Math.sin(t * (.6 + i * .3) + i * 2) * W * .4, H / 2 + Math.cos(t * (.5 + i * .25) + i) * H * .35, 160, (hue + i * 100) % 360, .12);
  mx.clearRect(0, 0, W, H);
  for (let x = 0; x < W; x += 38) for (let y = 0; y < H; y += 38) {
    const dx = x - m.x, dy = y - m.y, d = Math.hypot(dx, dy), n = Math.max(0, 1 - d / 260);
    const oy = Math.sin(x * .02 + t * 2) * 7 + Math.cos(y * .03 + t) * 5 + n * Math.sin(d * .05 - t * 6) * 10;
    mx.fillStyle = `rgba(255,255,255,${.12 + n * .6})`; mx.fillRect(x, y + oy, 2 + n * 2, 2 + n * 2);
  }
  if (!reduce) requestAnimationFrame(frame);
}
frame();

// Launch offer: 49% off until OFFER_END, then 30% off. Change the date here.
const OFFER_END = new Date("2026-10-20T23:59:59+05:30"), FIRST = 49, AFTER = 30;
const inr = n => "₹" + Math.round(n).toLocaleString("en-IN");
function offer() {
  const left = OFFER_END - Date.now(), first = left > 0, pct = first ? FIRST : AFTER;
  document.querySelectorAll(".price").forEach(p => { const b = +p.dataset.base;
    p.innerHTML = `<s>${inr(b)}</s>${inr(b * (100 - pct) / 100)}${p.dataset.from === "1" ? "<small> onwards</small>" : ""}`; });
  document.getElementById("offer-badge").textContent = first ? `${FIRST}% OFF for the first 7 days` : `${AFTER}% launch discount`;
  document.getElementById("offer-text").textContent = first ? "Limited-time launch price. After the timer ends, the discount becomes 30%." : "Launch discount of 30% on all services.";
  const t = document.getElementById("timer"); t.hidden = !first;
  if (first) { const v = [86400000, 3600000, 60000, 1000]; let r = left;
    ["d", "h", "m", "s"].forEach((k, i) => { const x = Math.floor(r / v[i]); r -= x * v[i]; document.getElementById("t-" + k).textContent = String(x).padStart(2, "0"); }); }
}
offer(); setInterval(offer, 1000);
