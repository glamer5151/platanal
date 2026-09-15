const CHARACTERS = [
  { id: 0, name: "Ethan", emoji: "👨‍🍳", desc: "Es un pequeño cocinero con dinero y extraña a la ex.", powerDesc: "Lluvia de dinero de la ex que elimina a los monos.", color: "#f59e0b", speed: 5, jump: 12 },
  { id: 1, name: "Miguel", emoji: "⚽", desc: "Jugador de fútbol y programador solitario.", powerDesc: "Disparo de balón gigantesco que arrasa monos.", color: "#3b82f6", speed: 6, jump: 12 },
  { id: 2, name: "Matteo", emoji: "🏀", desc: "Negro que juega básquet, tiene mala suerte 'bulto de sal' y es maestro del beso del bocachico.", powerDesc: "Beso del bocachico: Explosión que destruye monos cercanos.", color: "#10b981", speed: 5, jump: 14 },
  { id: 3, name: "Emmanuel", emoji: "🧤", desc: "Futbolista alto, parador de bolas mongolo.", powerDesc: "Escudo muralla: Destruye todo lo que toca.", color: "#8b5cf6", speed: 4, jump: 13 },
  { id: 4, name: "Ebed", emoji: "🎸", desc: "Músico que le escribe canciones a la ex y odia el color rojo.", powerDesc: "Canción a la ex: Lanza notas mortales a los monos.", color: "#ec4899", speed: 5, jump: 12 },
  { id: 5, name: "Manu", emoji: "⚖️", desc: "Guajiro que bebe mucho trago y es abogado del diablo.", powerDesc: "Defensa diabólica: Elimina a todos los monos.", color: "#ef4444", speed: 5, jump: 11 },
  { id: 6, name: "Juan", emoji: "🏉", desc: "Negro mujeriego que juega rugby.", powerDesc: "Placaje de rugby: Embestida veloz e invulnerable.", color: "#d97706", speed: 6, jump: 11 },
  { id: 7, name: "Carlos", emoji: "🏐", desc: "Músico que toca la guitarra, juega vóleibol y está dominado por su mujer.", powerDesc: "Remate sónico eléctrico indestructible.", color: "#06b6d4", speed: 5, jump: 13 },
  { id: 8, name: "Aníbal", emoji: "📊", desc: "Jugador de fútbol estilo muralla que estudia contaduría.", powerDesc: "Balance contable: Recoge plátanos y destruye un mono.", color: "#64748b", speed: 4, jump: 11 },
  { id: 9, name: "Gleimer", emoji: "🎨", desc: "Negro deportista, dibuja, programador y obviamente creó esto.", powerDesc: "Poder del Creador: Borra todo el nivel.", color: "#a855f7", speed: 7, jump: 15 }
];

const WORLD_WIDTH = 3200; // Niveles 4 veces más largos

let selectedCharIndex = 0;
let currentLevel = 1;
let totalBananas = 0;
let unlockedLevel = 1;

const screenIntro = document.getElementById('screen-intro');
const screenSelect = document.getElementById('screen-select');
const screenGame = document.getElementById('screen-game');
const charGrid = document.getElementById('char-grid');
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let animationId = null;
let powerTimeout = null;
let cooldownTimeout = null;

document.getElementById('btn-to-select').onclick = () => {
  screenIntro.classList.add('hidden');
  screenSelect.classList.remove('hidden');
  renderCharGrid();
};

document.getElementById('btn-start-game').onclick = () => {
  screenSelect.classList.add('hidden');
  screenGame.classList.remove('hidden');
  initLevel();
};

function renderCharGrid() {
  charGrid.innerHTML = '';
  CHARACTERS.forEach((char, idx) => {
    const isUnlocked = idx < unlockedLevel;
    const card = document.createElement('div');
    card.className = `char-card ${!isUnlocked ? 'locked' : ''} ${idx === selectedCharIndex ? 'selected' : ''}`;
    card.innerHTML = `
      <div class="char-avatar">${char.emoji}</div>
      <div class="char-name">${char.name} ${!isUnlocked ? '🔒' : ''}</div>
      <div class="char-desc">${char.desc}</div>
      <div class="char-power">⚡ ${char.powerDesc}</div>
    `;

    if (isUnlocked) {
      card.onclick = () => {
        selectedCharIndex = idx;
        renderCharGrid();
      };
    }
    charGrid.appendChild(card);
  });
}

let keys = {};

function clearAllInputs() {
  keys = {};
  if (player) player.vx = 0;
}

window.addEventListener('keydown', e => { keys[e.code] = true; });
window.addEventListener('keyup', e => { delete keys[e.code]; });
window.addEventListener('blur', clearAllInputs);

setupTouch('btn-left', 'KeyA');
setupTouch('btn-right', 'KeyD');
setupTouch('btn-jump', 'KeyW');
setupTouch('btn-power', 'Space');

function setupTouch(id, code) {
  const btn = document.getElementById(id);
  btn.addEventListener('touchstart', (e) => { e.preventDefault(); keys[code] = true; });
  btn.addEventListener('touchend', (e) => { e.preventDefault(); delete keys[code]; });
}

function resetPowerState() {
  isPowerActive = false;
  powerCooldown = false;
  projectiles = [];
  particles = [];
  if (powerTimeout) clearTimeout(powerTimeout);
  if (cooldownTimeout) clearTimeout(cooldownTimeout);
  document.getElementById('hud-power').innerText = "LISTO";
}

let player, monkeys, bananas, goal;
let projectiles = [];
let particles = [];
let isPowerActive = false;
let powerCooldown = false;

function killMonkey(m) {
  if (!m.alive) return;
  m.alive = false;
  particles.push({ x: m.x, y: m.y, vy: -1, text: "💥", life: 25 });

  // Reaparición 3 segundos después de baja
  setTimeout(() => {
    spawnNewMonkey();
  }, 3000);
}

function spawnNewMonkey() {
  const monkeySpeedMult = currentLevel === 9 ? 1.2 : (1 + currentLevel * 0.15);
  const spawnX = Math.min(WORLD_WIDTH - 100, player.x + 400 + Math.random() * 300);

  monkeys.push({
    x: spawnX,
    y: 310,
    w: 35,
    h: 40,
    vx: (Math.random() > 0.5 ? 1 : -1) * monkeySpeedMult,
    minBounds: Math.max(0, spawnX - 250),
    maxBounds: Math.min(WORLD_WIDTH, spawnX + 250),
    alive: true
  });
}

function initLevel() {
  if (animationId) cancelAnimationFrame(animationId);
  clearAllInputs();
  resetPowerState();

  const pData = CHARACTERS[selectedCharIndex];

  player = {
    x: 50,
    y: 310,
    w: 35,
    h: 40,
    vx: 0,
    vy: 0,
    speed: pData.speed,
    jumpPower: pData.jump,
    grounded: false,
    color: pData.color,
    emoji: pData.emoji,
    facing: 1
  };

  monkeys = [];
  bananas = [];

  // Nivel 9 ajustado: solo 3 monos iniciales
  const monkeyCount = currentLevel === 9 ? 3 : (4 + currentLevel * 2);
  const monkeySpeedMult = currentLevel === 9 ? 1.2 : (1 + currentLevel * 0.15);

  for (let i = 0; i < monkeyCount; i++) {
    const posX = 300 + i * ((WORLD_WIDTH - 400) / monkeyCount);
    monkeys.push({
      x: posX,
      y: 310,
      w: 35,
      h: 40,
      vx: (i % 2 === 0 ? 1 : -1) * monkeySpeedMult,
      minBounds: Math.max(0, posX - 200),
      maxBounds: Math.min(WORLD_WIDTH, posX + 200),
      alive: true
    });
  }

  for (let i = 0; i < 30; i++) {
    bananas.push({
      x: 150 + i * 100,
      y: 220 - Math.sin(i * 0.8) * 40,
      w: 25,
      h: 25,
      collected: false
    });
  }

  goal = {
    x: WORLD_WIDTH - 80,
    y: currentLevel === 10 ? 290 : 300,
    w: 40,
    h: 50
  };

  document.getElementById('hud-level').innerText = currentLevel;
  document.getElementById('hud-bananas').innerText = totalBananas;

  gameLoop();
}

function triggerPower() {
  if (powerCooldown) return;
  powerCooldown = true;
  isPowerActive = true;
  document.getElementById('hud-power').innerText = "RECARGANDO...";

  const charId = selectedCharIndex;

  if (charId === 0) {
    monkeys.forEach(m => {
      if (m.alive) {
        particles.push({ x: m.x, y: -20, targetY: m.y, vy: 6, text: "💵", life: 60, isDamage: true, monkeyRef: m });
      }
    });
  }
  else if (charId === 1) {
    projectiles.push({
      x: player.x,
      oldX: player.x,
      y: player.y,
      w: 50,
      h: 40,
      vx: player.facing * 16,
      text: "⚽"
    });
  }
  else if (charId === 2) {
    monkeys.forEach(m => {
      if (m.alive && Math.abs(m.x - player.x) < 250) {
        killMonkey(m);
      }
    });
    particles.push({ x: player.x, y: player.y - 20, vy: -1, text: "💋🐟💥", life: 40 });
  }
  else if (charId === 4) {
    projectiles.push(
      { x: player.x, oldX: player.x, y: player.y, w: 40, h: 40, vx: player.facing * 12, text: "🎵" },
      { x: player.x, oldX: player.x, y: player.y - 15, w: 40, h: 40, vx: player.facing * 10, text: "🎶" }
    );
  }
  else if (charId === 5) {
    monkeys.forEach(m => killMonkey(m));
    particles.push({ x: player.x + 100, y: 200, vy: 0, text: "⚖️🔥", life: 40 });
  }
  else if (charId === 6) {
    player.vx = player.facing * 20;
  }
  else if (charId === 7) {
    projectiles.push({
      x: player.x,
      oldX: player.x,
      y: player.y,
      w: 50,
      h: 40,
      vx: player.facing * 18,
      text: "🏐⚡"
    });
  }
  else if (charId === 8) {
    let uncollected = bananas.filter(b => !b.collected);
    uncollected.forEach(b => {
      bananas.push({ x: Math.min(WORLD_WIDTH - 40, b.x + 20), y: b.y, w: 25, h: 25, collected: false });
    });
    totalBananas += uncollected.length;
    document.getElementById('hud-bananas').innerText = totalBananas;

    let aliveMonkeys = monkeys.filter(m => m.alive);
    if (aliveMonkeys.length > 0) {
      killMonkey(aliveMonkeys[0]);
    }
  }
  else if (charId === 9) {
    monkeys.forEach(m => killMonkey(m));
    bananas.forEach(b => {
      if (!b.collected) {
        b.collected = true;
        totalBananas++;
      }
    });
    document.getElementById('hud-bananas').innerText = totalBananas;
  }

  powerTimeout = setTimeout(() => {
    isPowerActive = false;
  }, 3000);

  cooldownTimeout = setTimeout(() => {
    powerCooldown = false;
    document.getElementById('hud-power').innerText = "LISTO";
  }, 6000);
}

function gameLoop() {
  let moving = false;

  if (keys['KeyA'] || keys['ArrowLeft']) {
    player.vx = -player.speed;
    player.facing = -1;
    moving = true;
  }
  if (keys['KeyD'] || keys['ArrowRight']) {
    player.vx = player.speed;
    player.facing = 1;
    moving = true;
  }

  if (!moving && !(isPowerActive && selectedCharIndex === 6)) {
    player.vx = 0;
  }

  if ((keys['KeyW'] || keys['ArrowUp']) && player.grounded) {
    player.vy = -player.jumpPower;
    player.grounded = false;
  }

  if (keys['Space']) triggerPower();

  player.vy += 0.6;
  player.x += player.vx;
  player.y += player.vy;

  if (player.y + player.h >= 350) {
    player.y = 350 - player.h;
    player.vy = 0;
    player.grounded = true;
  }

  if (player.x < 0) player.x = 0;
  if (player.x + player.w > WORLD_WIDTH) player.x = WORLD_WIDTH - player.w;

  // Actualizar proyectiles
  for (let i = projectiles.length - 1; i >= 0; i--) {
    let p = projectiles[i];
    p.oldX = p.x;
    p.x += p.vx;

    let minX = Math.min(p.oldX, p.x);
    let maxX = Math.max(p.oldX, p.x) + p.w;

    monkeys.forEach(m => {
      if (m.alive && m.x + m.w >= minX && m.x <= maxX) {
        killMonkey(m);
      }
    });

    if (p.x < player.x - 500 || p.x > player.x + 1000) {
      projectiles.splice(i, 1);
    }
  }

  // Partículas
  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    p.y += p.vy;
    p.life--;

    if (p.isDamage && p.monkeyRef && p.y >= p.targetY) {
      killMonkey(p.monkeyRef);
      particles.splice(i, 1);
      continue;
    }

    if (p.life <= 0) particles.splice(i, 1);
  }

  let gameOverTriggered = false;

  // Colisiones Jugador vs Monos
  monkeys.forEach(m => {
    if (!m.alive || gameOverTriggered) return;

    m.x += m.vx;
    if (m.x <= m.minBounds || m.x >= m.maxBounds) m.vx *= -1;

    if (
      player.x < m.x + m.w &&
      player.x + player.w > m.x &&
      player.y < m.y + m.h &&
      player.y + player.h > m.y
    ) {
      if (isPowerActive && (selectedCharIndex === 3 || selectedCharIndex === 6)) {
        killMonkey(m);
      }
      else if (player.vy > 0 && player.y < m.y + 15) {
        killMonkey(m);
        player.vy = -10;
      }
      else {
        gameOverTriggered = true;
      }
    }
  });

  if (gameOverTriggered) {
    cancelAnimationFrame(animationId);
    clearAllInputs();
    setTimeout(() => {
      alert("¡Un mono te atrapó! Inténtalo de nuevo.");
      clearAllInputs();
      initLevel();
    }, 50);
    return;
  }

  // Recolección de plátanos
  bananas.forEach(b => {
    if (!b.collected &&
        player.x < b.x + b.w &&
        player.x + player.w > b.x &&
        player.y < b.y + b.h &&
        player.y + player.h > b.y) {
      b.collected = true;
      totalBananas++;
      document.getElementById('hud-bananas').innerText = totalBananas;
    }
  });

  // Llegada a la meta
  if (player.x < goal.x + goal.w &&
      player.x + player.w > goal.x &&
      player.y < goal.y + goal.h &&
      player.y + player.h > goal.y) {

    cancelAnimationFrame(animationId);
    clearAllInputs();

    if (currentLevel === 10) {
      setTimeout(() => {
        alert("🏆 ¡FELICIDADES! Rescataste a la Princesa Sari de Israel. ¡Eres el héroe de El Platanal!");
        currentLevel = 1;
        unlockedLevel = 10;
        clearAllInputs();
        screenGame.classList.add('hidden');
        screenSelect.classList.remove('hidden');
        renderCharGrid();
      }, 50);
    } else {
      currentLevel++;
      if (currentLevel > unlockedLevel) unlockedLevel = currentLevel;
      setTimeout(() => {
        alert(`¡Nivel completado! Desbloqueaste un nuevo personaje.`);
        clearAllInputs();
        screenGame.classList.add('hidden');
        screenSelect.classList.remove('hidden');
        renderCharGrid();
      }, 50);
    }
    return;
  }

  // Cámara
  let cameraX = player.x - canvas.width / 3;
  if (cameraX < 0) cameraX = 0;
  if (cameraX > WORLD_WIDTH - canvas.width) cameraX = WORLD_WIDTH - canvas.width;

  // Renderizado
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  ctx.translate(-cameraX, 0);

  ctx.fillStyle = "#0f172a";
  ctx.fillRect(cameraX, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#1e293b";
  ctx.fillRect(0, 350, WORLD_WIDTH, 50);
  ctx.fillStyle = "#22c55e";
  ctx.fillRect(0, 350, WORLD_WIDTH, 5);

  if (currentLevel === 10) {
    ctx.font = "30px Segoe UI";
    ctx.fillText("👸👑", goal.x, goal.y + 35);
  } else {
    ctx.fillStyle = "#38bdf8";
    ctx.fillRect(goal.x, goal.y, goal.w, goal.h);
    ctx.fillStyle = "#fff";
    ctx.font = "12px Segoe UI";
    ctx.fillText("META", goal.x + 5, goal.y + 30);
  }

  bananas.forEach(b => {
    if (!b.collected) {
      ctx.font = "20px Segoe UI";
      ctx.fillText("🍌", b.x, b.y + 20);
    }
  });

  monkeys.forEach(m => {
    if (m.alive) {
      ctx.font = "30px Segoe UI";
      ctx.fillText("🐒", m.x, m.y + 30);
    }
  });

  projectiles.forEach(p => {
    ctx.font = "35px Segoe UI";
    ctx.fillText(p.text, p.x, p.y + 30);
  });

  particles.forEach(p => {
    ctx.font = "25px Segoe UI";
    ctx.fillText(p.text, p.x, p.y);
  });

  ctx.font = "32px Segoe UI";
  ctx.fillText(player.emoji, player.x, player.y + 32);

  if (isPowerActive) {
    ctx.strokeStyle = player.color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(player.x + 17, player.y + 20, 25, 0, Math.PI * 2);
    ctx.stroke();

    if (selectedCharIndex === 3) {
      ctx.fillStyle = "rgba(139, 92, 246, 0.4)";
      ctx.beginPath();
      ctx.arc(player.x + 17, player.y + 20, 32, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  ctx.restore();

  animationId = requestAnimationFrame(gameLoop);
}