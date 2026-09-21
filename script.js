// CONFIGURACIÓN DE PERSONAJES (Usa las rutas de tu carpeta ASSETS/IMG)
const CHARACTERS = [
  { id: 0, name: "PJ X", image: "ASSETS/IMG/PJ X.png", emoji: "👤", desc: "Explorador novato. Héroe básico para iniciar la aventura.", powerDesc: "Salto de Fe: Impulso básico hacia adelante.", color: "#94a3b8", speed: 5, jump: 11 },
  { id: 1, name: "Ethan", image: "ASSETS/IMG/ethan.png", emoji: "👨‍🍳", desc: "Es un pequeño cocinero con dinero y extraña a la ex.", powerDesc: "Lluvia de dinero de la ex que elimina a los monos.", color: "#f59e0b", speed: 5, jump: 12 },
  { id: 2, name: "Miguel", image: "ASSETS/IMG/miguel.png", emoji: "⚽", desc: "Jugador de fútbol y programador solitario.", powerDesc: "Disparo de balón gigantesco que arrasa monos.", color: "#3b82f6", speed: 6, jump: 12 },
  { id: 3, name: "Matteo", image: "ASSETS/IMG/mateo.png", emoji: "🏀", desc: "Maestro del beso del bocachico.", powerDesc: "Beso del bocachico: Explosión que destruye monos cercanos.", color: "#10b981", speed: 5, jump: 14 },
  { id: 4, name: "Emmanuel", image: null, emoji: "🧤", desc: "Futbolista alto, parador de bolas.", powerDesc: "Escudo muralla: Destruye todo lo que toca.", color: "#8b5cf6", speed: 4, jump: 13 },
  { id: 5, name: "Ebed", image: null, emoji: "🎸", desc: "Músico que le escribe canciones a la ex.", powerDesc: "Canción a la ex: Lanza notas mortales a los monos.", color: "#ec4899", speed: 5, jump: 12 },
  { id: 6, name: "Manu", image: null, emoji: "⚖️", desc: "Guajiro traguero y abogado del diablo.", powerDesc: "Defensa diabólica: Elimina a todos los monos.", color: "#ef4444", speed: 5, jump: 11 },
  { id: 7, name: "Juan", image: null, emoji: "🏉", desc: "Jugador de rugby invulnerable.", powerDesc: "Placaje de rugby: Embestida veloz e invulnerable.", color: "#d97706", speed: 6, jump: 11 },
  { id: 8, name: "Carlos", image: null, emoji: "🏐", desc: "Músico que toca la guitarra y juega vóleibol.", powerDesc: "Remate sónico eléctrico indestructible.", color: "#06b6d4", speed: 5, jump: 13 },
  { id: 9, name: "Aníbal", image: null, emoji: "📊", desc: "Jugador de fútbol estilo muralla contable.", powerDesc: "Balance contable: Recoge plátanos y destruye un mono.", color: "#64748b", speed: 4, jump: 11 },
  { id: 10, name: "Gleimer", image: null, emoji: "🎨", desc: "Negro deportista, dibuja, programador y creador.", powerDesc: "Poder del Creador: Borra todo el nivel.", color: "#a855f7", speed: 7, jump: 15 }
];

// PRECARGA DE IMÁGENES
const loadedImages = {};
CHARACTERS.forEach(char => {
  if (char.image) {
    const img = new Image();
    img.src = char.image;
    loadedImages[char.id] = img;
  }
});

// ESTADO GLOBAL DEL JUEGO
const gameState = {
  bananas: 0,
  unlockedLevels: 1,
  selectedCharIndex: 0,
  selectedLevel: 1,
  shopItems: { jumpBonus: 0, speedBonus: 0 },
  secretUnlocked: { ethan: false, ebed: false }
};

// NIVELES DEL MAPA
const LEVELS = [
  { id: 1, name: "Entrada al Platanal", gx: 1, gy: 1, desc: "Inicio del camino bananero." },
  { id: 2, name: "Bosque de Palma", gx: 2, gy: 2, desc: "Monos saltarines al acecho." },
  { id: 3, name: "Río Plátano", gx: 3, gy: 2, desc: "Plataformas móviles y corrientes." },
  { id: 4, name: "Cueva del Simio", gx: 4, gy: 3, desc: "Monos lanzadores en la oscuridad." },
  { id: 5, name: "Templo Dorado", gx: 5, gy: 3, desc: "Ruinas llenas de plátanos mágicos." },
  { id: 6, name: "Puente Volcánico", gx: 6, gy: 4, desc: "Piso de lava y saltos ajustados." },
  { id: 7, name: "Jungla Profunda", gx: 7, gy: 4, desc: "Niebla y enemigos veloces." },
  { id: 8, name: "Cima Bananera", gx: 8, gy: 5, desc: "Vientos fuertes y máxima altura." },
  { id: 9, name: "Valle de los Gorilas", gx: 9, gy: 5, desc: "Gorilas gigantes custodian la zona." },
  { id: 10, name: "Fortaleza Simia", gx: 10, gy: 6, desc: "El gran bastión antes del jefe." },
  { id: 11, name: "El Trono del Rey Plátano", gx: 11, gy: 6, desc: "Desafío final contra el Rey Mono." }
];

// LÓGICA DE PANTALLAS
function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');

  if (screenId === 'map-screen') initMap();
  if (screenId === 'char-screen') renderCharGrid();
  updateUI();
}

function updateUI() {
  document.getElementById('banana-count').innerText = gameState.bananas;
  document.getElementById('selected-char-name').innerText = CHARACTERS[gameState.selectedCharIndex].name;
}

// RENDERIZADO DE SELECCIÓN DE PERSONAJES
function renderCharGrid() {
  const grid = document.getElementById('char-grid');
  grid.innerHTML = '';
  CHARACTERS.forEach((char, idx) => {
    const isUnlocked = idx <= gameState.unlockedLevels;
    const card = document.createElement('div');
    card.className = `char-card ${!isUnlocked ? 'locked' : ''} ${idx === gameState.selectedCharIndex ? 'selected' : ''}`;
    
    const avatarHTML = char.image 
      ? `<img src="${char.image}" alt="${char.name}" class="char-avatar-img" />`
      : `<div style="font-size:2rem; margin-bottom:5px;">${char.emoji}</div>`;

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

// LÓGICA DEL MAPA ISOMÉTRICO
let mapCtx, mapCanvas;
function initMap() {
  mapCanvas = document.getElementById('mapCanvas');
  const wrapper = document.getElementById('wrapper');
  mapCanvas.width = wrapper.clientWidth;
  mapCanvas.height = wrapper.clientHeight;
  mapCtx = mapCanvas.getContext('2d');

  drawMap();

  mapCanvas.onclick = (e) => {
    const rect = mapCanvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    LEVELS.forEach(lvl => {
      const { x, y } = gridToIso(lvl.gx, lvl.gy);
      const dist = Math.hypot(mx - x, my - y);
      if (dist < 25) {
        if (lvl.id <= gameState.unlockedLevels) {
          gameState.selectedLevel = lvl.id;
          showInfoCard(lvl);
        }
      }
    });
  };
}

function gridToIso(gx, gy) {
  const tileW = 60;
  const tileH = 30;
  const isoX = (gx - gy) * (tileW / 2) + mapCanvas.width / 2;
  const isoY = (gx + gy) * (tileH / 2) + 60;
  return { x: isoX, y: isoY };
}

function drawMap() {
  mapCtx.clearRect(0, 0, mapCanvas.width, mapCanvas.height);

  // Dibujar caminos
  mapCtx.beginPath();
  mapCtx.strokeStyle = "rgba(0, 255, 204, 0.3)";
  mapCtx.lineWidth = 3;
  LEVELS.forEach((lvl, i) => {
    const { x, y } = gridToIso(lvl.gx, lvl.gy);
    if (i === 0) mapCtx.moveTo(x, y);
    else mapCtx.lineTo(x, y);
  });
  mapCtx.stroke();

  // Dibujar nodos de niveles
  LEVELS.forEach(lvl => {
    const { x, y } = gridToIso(lvl.gx, lvl.gy);
    const isUnlocked = lvl.id <= gameState.unlockedLevels;
    const isSelected = lvl.id === gameState.selectedLevel;

    mapCtx.beginPath();
    mapCtx.arc(x, y, isSelected ? 18 : 14, 0, Math.PI * 2);
    mapCtx.fillStyle = isUnlocked ? (isSelected ? "#facc15" : "#00ffcc") : "#334155";
    mapCtx.fill();
    mapCtx.strokeStyle = "#000";
    mapCtx.lineWidth = 2;
    mapCtx.stroke();

    mapCtx.fillStyle = "#000";
    mapCtx.font = "bold 12px sans-serif";
    mapCtx.textAlign = "center";
    mapCtx.textBaseline = "middle";
    mapCtx.fillText(lvl.id, x, y);
  });
}

function showInfoCard(lvl) {
  const card = document.getElementById('infoCard');
  document.getElementById('cardTitle').innerText = `Nivel ${lvl.id}: ${lvl.name}`;
  document.getElementById('cardDesc').innerText = lvl.desc;
  card.style.display = 'block';
}

function confirmStartMission() {
  document.getElementById('infoCard').style.display = 'none';
  startLevel(gameState.selectedLevel);
}

function trySecretLevel(type) {
  if (gameState.secretUnlocked[type]) {
    alert(`¡Entrando al Nivel Secreto de ${type.toUpperCase()}!`);
    startLevel(99);
  } else {
    alert("🔒 Nivel Bloqueado. Encuentra la clave oculta o supera niveles más altos.");
  }
}

// TIENDA
function buyItem(type, cost) {
  if (gameState.bananas >= cost) {
    gameState.bananas -= cost;
    if (type === 'jump') gameState.shopItems.jumpBonus += 2;
    if (type === 'speed') gameState.shopItems.speedBonus += 1;
    alert("¡Mejora adquirida con éxito!");
    updateUI();
  } else {
    alert("¡No tienes suficientes Bananas!");
  }
}

// BUCLE DE JUEGO (MOTOR DEL NIVEL)
let gameCanvas, gameCtx, gameLoopId;
let player, platforms, bananasList, enemies, goal;
const keys = {};

function startLevel(levelId) {
  showScreen('game-screen');
  gameCanvas = document.getElementById('gameCanvas');
  gameCtx = gameCanvas.getContext('2d');

  document.getElementById('hud-level').innerText = levelId;
  document.getElementById('hud-bananas').innerText = gameState.bananas;

  const currentChar = CHARACTERS[gameState.selectedCharIndex];

  player = {
    x: 50,
    y: 200,
    w: 36,
    h: 36,
    vx: 0,
    vy: 0,
    speed: currentChar.speed + gameState.shopItems.speedBonus,
    jumpPower: currentChar.jump + gameState.shopItems.jumpBonus,
    grounded: false,
    powerReady: true
  };

  platforms = [
    { x: 0, y: 350, w: 250, h: 50 },
    { x: 300, y: 280, w: 180, h: 20 },
    { x: 530, y: 220, w: 150, h: 20 },
    { x: 720, y: 160, w: 150, h: 20 }
  ];

  bananasList = [
    { x: 350, y: 240, collected: false },
    { x: 400, y: 240, collected: false },
    { x: 580, y: 180, collected: false },
    { x: 760, y: 120, collected: false }
  ];

  enemies = [
    { x: 320, y: 250, w: 30, h: 30, dir: 1, minX: 300, maxX: 450 }
  ];

  goal = { x: 800, y: 110, w: 30, h: 50 };

  window.addEventListener('keydown', e => keys[e.code] = true);
  window.addEventListener('keyup', e => keys[e.code] = false);

  if (gameLoopId) cancelAnimationFrame(gameLoopId);
  updateGame();
}

function updateGame() {
  // Movimiento
  if (keys['ArrowRight'] || keys['KeyD']) player.vx = player.speed;
  else if (keys['ArrowLeft'] || keys['KeyA']) player.vx = -player.speed;
  else player.vx = 0;

  if ((keys['ArrowUp'] || keys['KeyW'] || keys['Space']) && player.grounded) {
    player.vy = -player.jumpPower;
    player.grounded = false;
  }

  // Gravedad
  player.vy += 0.6;
  player.x += player.vx;
  player.y += player.vy;

  // Colisiones con plataformas
  player.grounded = false;
  platforms.forEach(p => {
    if (player.x < p.x + p.w && player.x + player.w > p.x &&
        player.y + player.h > p.y && player.y + player.h - player.vy <= p.y) {
      player.y = p.y - player.h;
      player.vy = 0;
      player.grounded = true;
    }
  });

  // Recolección de Bananas
  bananasList.forEach(b => {
    if (!b.collected && Math.hypot(player.x - b.x, player.y - b.y) < 25) {
      b.collected = true;
      gameState.bananas += 10;
      document.getElementById('hud-bananas').innerText = gameState.bananas;
      updateUI();
    }
  });

  // Enemigos
  enemies.forEach(e => {
    e.x += e.dir * 2;
    if (e.x < e.minX || e.x > e.maxX) e.dir *= -1;

    // Colisión con enemigo
    if (player.x < e.x + e.w && player.x + player.w > e.x &&
        player.y < e.y + e.h && player.y + player.h > e.y) {
      // Reiniciar posición por derrota
      player.x = 50;
      player.y = 200;
    }
  });

  // Caída al vacío
  if (player.y > 450) {
    player.x = 50;
    player.y = 200;
  }

  // Llegar a la Meta
  if (player.x < goal.x + goal.w && player.x + player.w > goal.x &&
      player.y < goal.y + goal.h && player.y + player.h > goal.y) {
    showEndModal(true);
    return;
  }

  drawGame();
  gameLoopId = requestAnimationFrame(updateGame);
}

function drawGame() {
  gameCtx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

  // Plataformas
  gameCtx.fillStyle = "#334155";
  platforms.forEach(p => gameCtx.fillRect(p.x, p.y, p.w, p.h));

  // Bananas
  gameCtx.font = "20px sans-serif";
  bananasList.forEach(b => {
    if (!b.collected) gameCtx.fillText("🍌", b.x, b.y);
  });

  // Enemigos (Monos)
  enemies.forEach(e => gameCtx.fillText("🐒", e.x, e.y + 25));

  // Meta
  gameCtx.fillStyle = "#facc15";
  gameCtx.fillRect(goal.x, goal.y, goal.w, goal.h);

  // Jugador (Imagen PNG o Emoji)
  const currentChar = CHARACTERS[gameState.selectedCharIndex];
  const img = loadedImages[currentChar.id];

  if (img && img.complete && img.naturalWidth !== 0) {
    gameCtx.drawImage(img, player.x, player.y, player.w, player.h);
  } else {
    gameCtx.fillStyle = currentChar.color;
    gameCtx.fillRect(player.x, player.y, player.w, player.h);
  }
}

function showEndModal(win) {
  const modal = document.getElementById('end-modal');
  modal.classList.remove('hidden');
  if (win) {
    document.getElementById('end-title').innerText = "¡NIVEL COMPLETADO!";
    document.getElementById('end-text').innerText = "¡Has ganado la misión en El Platanal!";
    if (gameState.selectedLevel === gameState.unlockedLevels && gameState.unlockedLevels < 11) {
      gameState.unlockedLevels++;
    }
  }
}

function finishLevelAndReturn() {
  document.getElementById('end-modal').classList.add('hidden');
  if (gameLoopId) cancelAnimationFrame(gameLoopId);
  showScreen('map-screen');
}