// 13 PERSONAJES EN EL ORDEN EXACTO SOLICITADO CON SUS PODERES
const CHARACTERS = [
  { id: 0, name: "PJ X", image: "ASSETS/IMG/hero/PJX.png", desc: "Explorador novato básico.", powerDesc: "Salto de Fe: Impulso frontal.", speed: 5, jump: 11 },
  { id: 1, name: "Ethan", image: "ASSETS/IMG/hero/ethan.png", desc: "Cocinero con dinero y extraña a la ex.", powerDesc: "Lluvia de dinero de la ex.", speed: 5, jump: 12 },
  { id: 2, name: "Miguel", image: "ASSETS/IMG/hero/miguel.png", desc: "Futbolista y programador.", powerDesc: "Disparo de balón gigantesco.", speed: 6, jump: 12 },
  { id: 3, name: "Matteo", image: "ASSETS/IMG/hero/mateo.png", desc: "Maestro del beso del bocachico.", powerDesc: "Explosión de beso cercano.", speed: 5, jump: 14 },
  { id: 4, name: "Emmanuel", image: "ASSETS/IMG/hero/emmanuel.png", desc: "Futbolista alto, parador de bolas.", powerDesc: "Escudo muralla destructor.", speed: 4, jump: 13 },
  { id: 5, name: "Ebed", image: "ASSETS/IMG/hero/ebed.png", desc: "Músico que le escribe canciones a la ex.", powerDesc: "Notas musicales mortales.", speed: 5, jump: 12 },
  { id: 6, name: "Luis", image: "ASSETS/IMG/hero/luis.png", desc: "Amante del básquetbol y calistenia.", powerDesc: "Mate sónico de básquetbol.", speed: 6, jump: 13 },
  { id: 7, name: "Manu", image: "ASSETS/IMG/hero/manu.png", desc: "Guajiro traguero y abogado del diablo.", powerDesc: "Defensa diabólica total.", speed: 5, jump: 11 },
  { id: 8, name: "Juan", image: "ASSETS/IMG/hero/juan.png", desc: "Jugador de rugby invulnerable.", powerDesc: "Embestida de rugby invulnerable.", speed: 6, jump: 11 },
  { id: 9, name: "Carlos", image: "ASSETS/IMG/hero/carlos.png", desc: "Toca guitarra y juega vóleibol.", powerDesc: "Remate sónico eléctrico.", speed: 5, jump: 13 },
  { id: 10, name: "Aníbal", image: "ASSETS/IMG/hero/anibal.png", desc: "Estilo muralla contable.", powerDesc: "Balance contable y recolección.", speed: 4, jump: 11 },
  { id: 11, name: "Camilo", image: "ASSETS/IMG/hero/camilo.png", desc: "Amante de dinosaurios y videojuegos.", powerDesc: "Rugido de dinosaurio estelar.", speed: 6, jump: 12 },
  { id: 12, name: "Gleimer", image: "ASSETS/IMG/hero/gleimer.png", desc: "Creador, deportista y programador.", powerDesc: "Poder del Creador: Limpia el nivel.", speed: 7, jump: 15 }
];

const loadedImages = {};
CHARACTERS.forEach(char => {
  if (char.image) {
    const img = new Image();
    img.src = char.image;
    loadedImages[char.id] = img;
  }
});

// NIVELES CON PAÍSES, VILLANOS Y LONGITUDES PROGRESIVAS
const LEVEL_CONFIGS = {
  1: { id: 1, name: "Nivel 1: Colombia", country: "Colombia", villainImg: "ASSETS/IMG/villanos/colombia-removebg-preview.png", monkeyCount: 3, obstacleCount: 3, speedMult: 1.0, worldWidth: 2000 },
  2: { id: 2, name: "Nivel 2: México", country: "México", villainImg: "ASSETS/IMG/villanos/mexico-removebg-preview.png", monkeyCount: 4, obstacleCount: 4, speedMult: 1.2, worldWidth: 2300 },
  3: { id: 3, name: "Nivel 3: Venezuela", country: "Venezuela", villainImg: "ASSETS/IMG/villanos/venezuela-removebg-preview.png", monkeyCount: 5, obstacleCount: 5, speedMult: 1.3, worldWidth: 2600 },
  4: { id: 4, name: "Nivel 4: Argentina", country: "Argentina", villainImg: "ASSETS/IMG/villanos/argentina-removebg-preview.png", monkeyCount: 6, obstacleCount: 6, speedMult: 1.4, worldWidth: 2900 },
  5: { id: 5, name: "Nivel 5: Brasil", country: "Brasil", villainImg: "ASSETS/IMG/villanos/colombia-removebg-preview.png", monkeyCount: 7, obstacleCount: 7, speedMult: 1.5, worldWidth: 3200 },
  6: { id: 6, name: "Nivel 6: Estados Unidos", country: "Estados Unidos", villainImg: "ASSETS/IMG/villanos/estados unidos-removebg-preview.png", monkeyCount: 8, obstacleCount: 8, speedMult: 1.6, worldWidth: 3500 },
  7: { id: 7, name: "Nivel 7: Italia", country: "Italia", villainImg: "ASSETS/IMG/villanos/italia-removebg-preview.png", monkeyCount: 9, obstacleCount: 9, speedMult: 1.7, worldWidth: 3800 },
  8: { id: 8, name: "Nivel 8: China", country: "China", villainImg: "ASSETS/IMG/villanos/china-removebg-preview.png", monkeyCount: 10, obstacleCount: 10, speedMult: 1.8, worldWidth: 4100 },
  9: { id: 9, name: "Nivel 9: Egipto", country: "Egipto", villainImg: "ASSETS/IMG/villanos/egpicio-removebg-preview.png", monkeyCount: 11, obstacleCount: 11, speedMult: 2.0, worldWidth: 4400 },
  10: { id: 10, name: "Nivel 10: Territorio Salvaje", country: "Mundo", villainImg: "ASSETS/IMG/villanos/colombia-removebg-preview.png", monkeyCount: 12, obstacleCount: 12, speedMult: 2.2, worldWidth: 4700 },
  11: { id: 11, name: "Nivel 11: Israel (Jefe Final)", country: "Israel", villainImg: "ASSETS/IMG/villanos/final-removebg-preview.png", monkeyCount: 1, obstacleCount: 14, speedMult: 2.5, worldWidth: 5000, isIsrael: true },
  secret_ethan: { id: 99, name: "Secreto: Yesenia", country: "Secreto", villainImg: "ASSETS/IMG/villanos/colombia-removebg-preview.png", monkeyCount: 8, obstacleCount: 6, speedMult: 1.5, worldWidth: 3000 },
  secret_ebed: { id: 100, name: "Secreto: Jeyci", country: "Secreto", villainImg: "ASSETS/IMG/villanos/colombia-removebg-preview.png", monkeyCount: 8, obstacleCount: 6, speedMult: 1.5, worldWidth: 3000 }
};

const villainImages = {};
Object.keys(LEVEL_CONFIGS).forEach(key => {
  const cfg = LEVEL_CONFIGS[key];
  if (cfg.villainImg) {
    const img = new Image();
    img.src = cfg.villainImg;
    villainImages[key] = img;
  }
});

const bgImages = {
  dia: new Image(),
  noche: new Image(),
  israel: new Image()
};
bgImages.dia.src = "ASSETS/IMG/fondos/dia.jpeg";
bgImages.noche.src = "ASSETS/IMG/fondos/noche2.jpeg";
bgImages.israel.src = "ASSETS/IMG/fondos/israel.jpeg";

let currentBgType = "dia";
setInterval(() => {
  currentBgType = Math.random() > 0.5 ? "dia" : "noche";
}, 10000);

let WORLD_WIDTH = 3200;
const gameState = {
  bananas: 50,
  selectedCharIndex: 0,
  unlockedLevels: 1,
  selectedLevel: 1,
  secretType: null
};

let keys = {};
function clearInputs() {
  keys = {};
  if (typeof player !== 'undefined' && player) player.vx = 0;
}

window.addEventListener('keydown', e => { keys[e.code] = true; });
window.addEventListener('keyup', e => { delete keys[e.code]; });
window.addEventListener('blur', clearInputs);

function showScreen(screenId) {
  clearInputs();
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById(screenId);
  if (target) target.classList.add('active');

  if (screenId === 'map-screen') resizeMap();
  if (screenId === 'char-screen') renderCharGrid();
  updateUI();
}

function updateUI() {
  document.getElementById('banana-count').textContent = gameState.bananas;
  document.getElementById('selected-char-name').textContent = CHARACTERS[gameState.selectedCharIndex].name;
}

function trySecretLevel(type) {
  const selectedName = CHARACTERS[gameState.selectedCharIndex].name;
  if (type === 'ethan' && selectedName !== 'Ethan') {
    alert("🔒 Exclusivo para Ethan."); return;
  }
  if (type === 'ebed' && selectedName !== 'Ebed') {
    alert("🔒 Exclusivo para Ebed."); return;
  }
  gameState.secretType = type;
  startPlatformGame();
}

function buyItem(type, cost) {
  if (gameState.bananas >= cost) {
    gameState.bananas -= cost;
    const char = CHARACTERS[gameState.selectedCharIndex];
    if (type === 'jump') char.jump += 1.5;
    if (type === 'speed') char.speed += 1.0;
    updateUI();
    alert("¡Mejora comprada!");
  } else {
    alert("No tienes suficientes bananas 🍌");
  }
}

function renderCharGrid() {
  const grid = document.getElementById('char-grid');
  grid.innerHTML = '';
  CHARACTERS.forEach((char, idx) => {
    const isUnlocked = idx <= gameState.unlockedLevels;
    const card = document.createElement('div');
    card.className = `char-card ${!isUnlocked ? 'locked' : ''} ${idx === gameState.selectedCharIndex ? 'selected' : ''}`;
    
    const avatarHTML = char.image 
      ? `<img src="${char.image}" alt="${char.name}" class="char-avatar-img" />`
      : `<div style="font-size:1.5rem; margin-bottom:3px;">👤</div>`;

    card.innerHTML = `
      ${avatarHTML}
      <div class="char-name">${char.name} ${!isUnlocked ? '🔒' : ''}</div>
      <div class="char-desc">${char.desc}</div>
      <div class="char-power">⚡ ${char.powerDesc}</div>
    `;

    if (isUnlocked) {
      card.onclick = () => {
        gameState.selectedCharIndex = idx;
        renderCharGrid();
        updateUI();
      };
    }
    grid.appendChild(card);
  });
}

// MAPA ISOMÉTRICO
const mapCanvas = document.getElementById('mapCanvas');
const mCtx = mapCanvas.getContext('2d');
const infoCard = document.getElementById('infoCard');

const tileWidth = 50;
const tileHeight = 25;
let originX = 425;
let originY = 60;

const levelsMapNodes = [
  { id: 1, gx: 0, gy: 0, name: "Nivel 1: Colombia" },
  { id: 2, gx: 1, gy: 0, name: "Nivel 2: México" },
  { id: 3, gx: 2, gy: 0, name: "Nivel 3: Venezuela" },
  { id: 4, gx: 3, gy: 0, name: "Nivel 4: Argentina" },
  { id: 5, gx: 4, gy: 0, name: "Nivel 5: Brasil" },
  { id: 6, gx: 0, gy: 1, name: "Nivel 6: Estados Unidos" },
  { id: 7, gx: 1, gy: 1, name: "Nivel 7: Italia" },
  { id: 8, gx: 2, gy: 1, name: "Nivel 8: China" },
  { id: 9, gx: 3, gy: 1, name: "Nivel 9: Egipto" },
  { id: 10, gx: 4, gy: 1, name: "Nivel 10: Territorio Salvaje" },
  { id: 11, gx: 2, gy: 2, name: "Nivel 11: Israel (Jefe Final)" }
];

function resizeMap() {
  const wrapper = document.getElementById('wrapper');
  if (wrapper) {
    mapCanvas.width = wrapper.clientWidth;
    mapCanvas.height = wrapper.clientHeight;
    originX = mapCanvas.width / 2;
  }
}

function toIso(x, y) {
  return {
    isoX: originX + (x - y) * (tileWidth / 2),
    isoY: originY + (x + y) * (tileHeight / 2)
  };
}

let pulseAnim = 0;
function renderMap() {
  mCtx.clearRect(0, 0, mapCanvas.width, mapCanvas.height);
  pulseAnim += 0.05;

  levelsMapNodes.forEach(lvl => {
    const isUnlocked = lvl.id <= gameState.unlockedLevels;
    const { isoX, isoY } = toIso(lvl.gx, lvl.gy);

    mCtx.beginPath();
    mCtx.arc(isoX, isoY, 14 + Math.sin(pulseAnim) * 2, 0, Math.PI * 2);
    mCtx.strokeStyle = isUnlocked ? "#00ffcc" : "#555";
    mCtx.stroke();

    mCtx.beginPath();
    mCtx.arc(isoX, isoY, 11, 0, Math.PI * 2);
    mCtx.fillStyle = isUnlocked ? (lvl.id === gameState.unlockedLevels ? "#ff3366" : "#00ffcc") : "#333";
    mCtx.fill();

    mCtx.fillStyle = "#fff";
    mCtx.font = "bold 11px sans-serif";
    mCtx.textAlign = "center";
    mCtx.textBaseline = "middle";
    mCtx.fillText(lvl.id, isoX, isoY);

    mCtx.fillStyle = "#f8fafc";
    mCtx.font = "10px sans-serif";
    mCtx.fillText(lvl.name.split(": ")[1], isoX, isoY + 20);
  });

  requestAnimationFrame(renderMap);
}

mapCanvas.addEventListener('click', (e) => {
  const rect = mapCanvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  let found = false;
  levelsMapNodes.forEach(lvl => {
    const { isoX, isoY } = toIso(lvl.gx, lvl.gy);
    if (Math.hypot(mouseX - isoX, mouseY - isoY) < 18) {
      if (lvl.id <= gameState.unlockedLevels) {
        gameState.selectedLevel = lvl.id;
        gameState.secretType = null;
        infoCard.style.display = 'block';
        document.getElementById('cardTitle').innerText = lvl.name;
        document.getElementById('cardDesc').innerText = `País / Destino: ${lvl.name.split(": ")[1]}`;
        found = true;
      } else {
        alert("Nivel bloqueado.");
      }
    }
  });
  if (!found) infoCard.style.display = 'none';
});

mapCanvas.addEventListener('mousemove', (e) => {
  const rect = mapCanvas.getBoundingClientRect();
  document.getElementById('coords-hud').innerText = `POS: ${Math.floor(e.clientX - rect.left)} , ${Math.floor(e.clientY - rect.top)}`;
});

function confirmStartMission() {
  infoCard.style.display = 'none';
  startPlatformGame();
}

// MOTOR DE JUEGO Y COMBATE
const gameCanvas = document.getElementById('gameCanvas');
const gCtx = gameCanvas.getContext('2d');

let animationId = null;
let player, enemies, bananas, obstacles, goal, missiles = [];
let projectiles = [], particles = [];
let isPowerActive = false, powerCooldown = false;
let missileTimer = 5;
let missileInterval = null;

setupTouch('btn-left', 'KeyA');
setupTouch('btn-right', 'KeyD');
setupTouch('btn-jump', 'KeyW');
setupTouch('btn-power', 'Space');

function setupTouch(id, code) {
  const btn = document.getElementById(id);
  if (!btn) return;
  btn.addEventListener('touchstart', (e) => { e.preventDefault(); keys[code] = true; });
  btn.addEventListener('touchend', (e) => { e.preventDefault(); delete keys[code]; });
}

function damageEnemy(e, dmg = 50) {
  e.hp -= dmg;
  particles.push({ x: e.x, y: e.y, vy: -1, text: `-${dmg}💥`, life: 25 });
  if (e.hp <= 0 && e.alive) {
    e.alive = false;
    setTimeout(() => { spawnNewEnemy(e); }, 3000);
  }
}

function spawnNewEnemy(oldE) {
  oldE.alive = true;
  oldE.hp = 100;
  oldE.x = Math.min(WORLD_WIDTH - 150, player.x + 500);
}

function startPlatformGame() {
  clearInputs();
  showScreen('game-screen');

  const configKey = gameState.secretType ? `secret_${gameState.secretType}` : gameState.selectedLevel;
  const cfg = LEVEL_CONFIGS[configKey] || LEVEL_CONFIGS[1];

  WORLD_WIDTH = cfg.worldWidth;
  document.getElementById('hud-level').innerText = cfg.name;
  document.getElementById('end-modal').classList.add('hidden');

  const pData = CHARACTERS[gameState.selectedCharIndex];

  player = {
    x: 50, y: 310, w: 35, h: 40,
    vx: 0, vy: 0,
    speed: pData.speed, jumpPower: pData.jump,
    grounded: false, facing: 1
  };

  enemies = []; bananas = []; obstacles = []; projectiles = []; particles = []; missiles = [];
  isPowerActive = false; powerCooldown = false;
  document.getElementById('hud-power').innerText = "LISTO";

  const timerContainer = document.getElementById('missile-timer-container');
  if (cfg.isIsrael) {
    timerContainer.style.display = 'inline';
    missileTimer = 5;
    if (missileInterval) clearInterval(missileInterval);
    missileInterval = setInterval(() => {
      missileTimer--;
      document.getElementById('missile-timer').innerText = missileTimer;
      if (missileTimer <= 0) {
        missiles.push({ x: player.x + (Math.random() * 200 - 100), y: -50, vy: 4, w: 25, h: 45 });
        missileTimer = 5;
      }
    }, 1000);
  } else {
    timerContainer.style.display = 'none';
    if (missileInterval) clearInterval(missileInterval);
  }

  // ENEMIGOS / VILLANOS
  for (let i = 0; i < cfg.monkeyCount; i++) {
    const posX = cfg.isIsrael ? WORLD_WIDTH - 200 : 350 + i * ((WORLD_WIDTH - 500) / cfg.monkeyCount);
    enemies.push({
      x: posX, y: cfg.isIsrael ? 200 : 280, w: 60, h: 70,
      vx: cfg.isIsrael ? 0 : (i % 2 === 0 ? 1 : -1) * cfg.speedMult,
      minBounds: Math.max(0, posX - 220),
      maxBounds: Math.min(WORLD_WIDTH, posX + 220),
      alive: true,
      hp: cfg.isIsrael ? 300 : 100, maxHp: cfg.isIsrael ? 300 : 100,
      isBoss: cfg.isIsrael && i === 0
    });
  }

  // OBSTÁCULOS
  for (let i = 0; i < cfg.obstacleCount; i++) {
    const posX = 250 + i * ((WORLD_WIDTH - 500) / cfg.obstacleCount);
    obstacles.push({
      x: posX, y: 320, w: 30, h: 30,
      type: i % 2 === 0 ? "box" : "spike",
      text: i % 2 === 0 ? "📦" : "🪵"
    });
  }

  // BANANAS
  for (let i = 0; i < Math.floor(WORLD_WIDTH / 100); i++) {
    bananas.push({
      x: 150 + i * 100,
      y: 220 - Math.sin(i * 0.8) * 40,
      w: 25, h: 25, collected: false
    });
  }

  goal = { x: WORLD_WIDTH - 80, y: 300, w: 40, h: 50 };
  if (animationId) cancelAnimationFrame(animationId);
  gameLoop();
}

// PODERES ACTIVOS DE CADA UNO DE LOS 13 PERSONAJES
function triggerPower() {
  if (powerCooldown) return;
  powerCooldown = true; isPowerActive = true;
  document.getElementById('hud-power').innerText = "RECARGANDO...";

  const charId = gameState.selectedCharIndex;

  switch(charId) {
    case 0: // PJ X - Salto de Fe
      player.vx = player.facing * 14;
      break;
    case 1: // Ethan - Lluvia de dinero
      enemies.forEach(e => { if (e.alive) damageEnemy(e, 60); });
      particles.push({ x: player.x, y: player.y - 30, vy: -1, text: "💵 Lluvia de Dinero!", life: 40 });
      break;
    case 2: // Miguel - Disparo de balón
      projectiles.push({ x: player.x, oldX: player.x, y: player.y, w: 40, h: 30, vx: player.facing * 18, text: "⚽" });
      break;
    case 3: // Matteo - Beso del bocachico
      enemies.forEach(e => { if (e.alive && Math.abs(e.x - player.x) < 250) damageEnemy(e, 80); });
      particles.push({ x: player.x, y: player.y - 20, vy: -1, text: "💋 Bocachico Explosion!", life: 40 });
      break;
    case 4: // Emmanuel - Escudo muralla
      enemies.forEach(e => { if (e.alive && Math.abs(e.x - player.x) < 180) damageEnemy(e, 70); });
      particles.push({ x: player.x, y: player.y - 20, vy: -1, text: "🧤 Escudo Muralla", life: 40 });
      break;
    case 5: // Ebed - Canción a la ex
      projectiles.push({ x: player.x, oldX: player.x, y: player.y, w: 30, h: 30, vx: player.facing * 15, text: "🎵" });
      break;
    case 6: // Luis - Mate sónico de básquetbol y calistenia
      projectiles.push({ x: player.x, oldX: player.x, y: player.y, w: 40, h: 40, vx: player.facing * 18, text: "🏀⚡" });
      break;
    case 7: // Manu - Defensa diabólica
      enemies.forEach(e => { if (e.alive) damageEnemy(e, 100); });
      particles.push({ x: player.x, y: player.y - 20, vy: -1, text: "⚖️🔥 Juicio Final", life: 40 });
      break;
    case 8: // Juan - Placaje de rugby
      player.vx = player.facing * 22;
      break;
    case 9: // Carlos - Remate sónico eléctrico
      projectiles.push({ x: player.x, oldX: player.x, y: player.y, w: 45, h: 35, vx: player.facing * 20, text: "🎸⚡" });
      break;
    case 10: // Aníbal - Balance contable
      let uncollected = bananas.filter(b => !b.collected);
      uncollected.forEach(b => { b.collected = true; gameState.bananas++; });
      enemies.forEach(e => { if (e.alive && Math.abs(e.x - player.x) < 200) damageEnemy(e, 50); });
      break;
    case 11: // Camilo - Rugido de dinosaurio
      enemies.forEach(e => { if (e.alive && Math.abs(e.x - player.x) < 300) damageEnemy(e, 90); });
      particles.push({ x: player.x, y: player.y - 20, vy: -1, text: "🦖 ROAR!", life: 40 });
      break;
    case 12: // Gleimer - Poder del Creador (Limpia el nivel)
      enemies.forEach(e => { if (e.alive) damageEnemy(e, 999); });
      bananas.forEach(b => { if (!b.collected) { b.collected = true; gameState.bananas++; } });
      particles.push({ x: player.x, y: player.y - 30, vy: -1, text: "🎨 ¡Poder del Creador!", life: 50 });
      break;
  }

  setTimeout(() => { isPowerActive = false; }, 3000);
  setTimeout(() => { powerCooldown = false; document.getElementById('hud-power').innerText = "LISTO"; }, 6000);
}

function gameLoop() {
  let moving = false;
  if (keys['KeyA'] || keys['ArrowLeft']) { player.vx = -player.speed; player.facing = -1; moving = true; }
  if (keys['KeyD'] || keys['ArrowRight']) { player.vx = player.speed; player.facing = 1; moving = true; }

  if (!moving) player.vx = 0;
  if ((keys['KeyW'] || keys['ArrowUp']) && player.grounded) {
    player.vy = -player.jumpPower; player.grounded = false;
  }
  if (keys['Space']) triggerPower();

  player.vy += 0.6; player.x += player.vx; player.y += player.vy;

  if (player.y + player.h >= 350) {
    player.y = 350 - player.h; player.vy = 0; player.grounded = true;
  }
  if (player.x < 0) player.x = 0;
  if (player.x + player.w > WORLD_WIDTH) player.x = WORLD_WIDTH - player.w;

  // PROYECTILES
  for (let i = projectiles.length - 1; i >= 0; i--) {
    let p = projectiles[i];
    p.oldX = p.x; p.x += p.vx;
    enemies.forEach(e => {
      if (e.alive && p.x < e.x + e.w && p.x + p.w > e.x && p.y < e.y + e.h && p.y + p.h > e.y) {
        damageEnemy(e, 50);
        projectiles.splice(i, 1);
      }
    });
    if (p && (p.x < player.x - 600 || p.x > player.x + 1000)) projectiles.splice(i, 1);
  }

  // MISILES EN ISRAEL
  for (let i = missiles.length - 1; i >= 0; i--) {
    let mis = missiles[i];
    mis.y += mis.vy;
    if (mis.y + mis.h >= 350) {
      missiles.splice(i, 1);
      continue;
    }
    if (player.x < mis.x + mis.w && player.x + player.w > mis.x && player.y < mis.y + mis.h && player.y + player.h > mis.y) {
      alert("¡Un misil te ha alcanzado en Israel!");
      startPlatformGame();
      return;
    }
  }

  // COLISIONES CON ENEMIGOS Y CAJA DE DAÑO AJUSTADA (CUADRADO PEQUEÑO)
  let gameOverTriggered = false;
  enemies.forEach(e => {
    if (!e.alive) return;
    if (!e.isBoss) {
      e.x += e.vx;
      if (e.x <= e.minBounds || e.x >= e.maxBounds) e.vx *= -1;
    }

    let hitBoxX = e.x + 15;
    let hitBoxY = e.y + 15;
    let hitBoxW = e.w - 30;
    let hitBoxH = e.h - 30;

    if (player.x < hitBoxX + hitBoxW && player.x + player.w > hitBoxX && player.y < hitBoxY + hitBoxH && player.y + player.h > hitBoxY) {
      if (isPowerActive) {
        damageEnemy(e, 100);
      } else if (player.vy > 0 && (player.y + player.h - player.vy) <= hitBoxY + 15) {
        damageEnemy(e, 50);
        player.vy = -11;
      } else {
        gameOverTriggered = true;
      }
    }
  });

  if (gameOverTriggered) {
    cancelAnimationFrame(animationId);
    clearInputs();
    setTimeout(() => { alert("¡Derrotado en combate!"); startPlatformGame(); }, 50);
    return;
  }

  // BANANAS
  bananas.forEach(b => {
    if (!b.collected && player.x < b.x + b.w && player.x + player.w > b.x && player.y < b.y + b.h && player.y + player.h > b.y) {
      b.collected = true; gameState.bananas++; document.getElementById('hud-bananas').innerText = gameState.bananas;
    }
  });

  // META
  if (player.x < goal.x + goal.w && player.x + player.w > goal.x && player.y < goal.y + goal.h && player.y + player.h > goal.y) {
    cancelAnimationFrame(animationId);
    clearInputs();
    const configKey = gameState.secretType ? `secret_${gameState.secretType}` : gameState.selectedLevel;
    const cfg = LEVEL_CONFIGS[configKey];
    if (!gameState.secretType && cfg.id === gameState.unlockedLevels && gameState.unlockedLevels < 11) {
      gameState.unlockedLevels++;
    }
    document.getElementById('end-modal').classList.remove('hidden');
    return;
  }

  // RENDERIZADO
  gCtx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

  let cameraX = player.x - 200;
  if (cameraX < 0) cameraX = 0;
  if (cameraX > WORLD_WIDTH - 850) cameraX = WORLD_WIDTH - 850;

  gCtx.save();
  gCtx.translate(-cameraX, 0);

  const configKey = gameState.secretType ? `secret_${gameState.secretType}` : gameState.selectedLevel;
  const activeCfg = LEVEL_CONFIGS[configKey];
  let bgToDraw = activeCfg && activeCfg.isIsrael ? bgImages.israel : bgImages[currentBgType];
  
  if (bgToDraw && bgToDraw.complete && bgToDraw.naturalWidth !== 0) {
    gCtx.drawImage(bgToDraw, cameraX, 0, 850, 400);
  } else {
    gCtx.fillStyle = "#0f172a";
    gCtx.fillRect(cameraX, 0, 850, 400);
  }

  gCtx.fillStyle = "#1e293b";
  gCtx.fillRect(0, 350, WORLD_WIDTH, 50);

  gCtx.font = "20px sans-serif";
  bananas.forEach(b => { if (!b.collected) gCtx.fillText("🍌", b.x, b.y + 20); });
  obstacles.forEach(o => gCtx.fillText(o.text, o.x, o.y + 25));

  // VILLANOS: GIRO A LA IZQUIERDA (EXCEPTO JEFE FINAL EN ISRAEL QUE GIRA A LA DERECHA HACIA EL PROTA)
  enemies.forEach(e => {
    if (!e.alive) return;
    if (e.isBoss) {
      e.y = 200 + Math.sin(Date.now() * 0.005) * 40;
    }
    const villainImg = villainImages[configKey] || villainImages[1];
    gCtx.save();
    if (villainImg && villainImg.complete && villainImg.naturalWidth !== 0) {
      if (e.isBoss) {
        // Jefe final de Israel vuela y gira hacia la derecha hacia el prota
        gCtx.scale(-1, 1);
        gCtx.drawImage(villainImg, -(e.x + e.w), e.y, e.w, e.h);
      } else {
        // Todos los demás villanos orientados estrictamente hacia la izquierda
        gCtx.scale(-1, 1);
        gCtx.drawImage(villainImg, -(e.x + e.w), e.y, e.w, e.h);
      }
    } else {
      gCtx.fillText("🐒", e.x, e.y + 35);
    }
    gCtx.restore();

    // BARRA DE VIDA DEL VILLANO
    gCtx.fillStyle = "red";
    gCtx.fillRect(e.x, e.y - 12, e.w, 5);
    gCtx.fillStyle = "lime";
    gCtx.fillRect(e.x, e.y - 12, e.w * (e.hp / e.maxHp), 5);
  });

  missiles.forEach(mis => {
    gCtx.fillStyle = "orange";
    gCtx.fillRect(mis.x, mis.y, mis.w, mis.h);
    gCtx.fillStyle = "#fff";
    gCtx.font = "10px sans-serif";
    gCtx.fillText("🚀", mis.x, mis.y + 30);
  });

  gCtx.fillText("🚩", goal.x, goal.y + 40);
  projectiles.forEach(p => gCtx.fillText(p.text, p.x, p.y + 30));
  particles.forEach(pt => gCtx.fillText(pt.text, pt.x, pt.y));

  const currentChar = CHARACTERS[gameState.selectedCharIndex];
  const charImg = loadedImages[currentChar.id];
  if (charImg && charImg.complete && charImg.naturalWidth !== 0) {
    gCtx.drawImage(charImg, player.x, player.y, player.w, player.h);
  } else {
    gCtx.fillText("👤", player.x, player.y + 30);
  }

  gCtx.restore();
  animationId = requestAnimationFrame(gameLoop);
}

function finishLevelAndReturn() {
  document.getElementById('end-modal').classList.add('hidden');
  if (missileInterval) clearInterval(missileInterval);
  gameState.secretType = null;
  showScreen('map-screen');
}

window.onload = () => {
  renderMap();
  updateUI();
};