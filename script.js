// ── TAGS DATA ──
const tagData = {
  tq14: [
    { v: 'A', label: 'Verde fresco y brillante' },
    { v: 'B', label: 'Terracota y ocre cálido' },
    { v: 'C', label: 'Blanco roto y neutros suaves' },
    { v: 'D', label: 'Negro, grafito o gris oscuro' },
    { v: 'E', label: 'Coral, durazno o rosa suave' },
    { v: 'F', label: 'Azul cielo o turquesa' },
    { v: 'G', label: 'Dorado o mostaza' },
  ],
  tq15: [
    { v: 'A', label: 'Calma y bienestar' },
    { v: 'B', label: 'Apetito y emoción' },
    { v: 'C', label: 'Confianza y profesionalismo' },
    { v: 'D', label: 'Calidez y pertenencia' },
    { v: 'E', label: 'Curiosidad y descubrimiento' },
    { v: 'F', label: 'Alegría y energía' },
  ],
  tq19: [
    { v: 'A', label: 'Digital con QR' },
    { v: 'B', label: 'Físico impreso de calidad' },
    { v: 'C', label: 'Ambos (digital y físico)' },
    { v: 'D', label: 'Pizarrón o carta de pared' },
  ],
};

Object.entries(tagData).forEach(([id, items]) => {
  const wrap = document.getElementById(id);
  items.forEach(item => {
    const el = document.createElement('div');
    el.className = 'tag';
    el.dataset.q = id;
    el.dataset.v = item.v;
    el.textContent = item.label;
    el.onclick = () => pickTag(el);
    wrap.appendChild(el);
  });
});

// ── STATE ──
const answers = {};
const TOTAL_QUESTIONS = 19;

function pick(el) {
  const q = el.dataset.q;
  document.querySelectorAll(`[data-q="${q}"]`).forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
  answers[q] = el.dataset.v;
  updateProgress();
}

function pickTag(el) {
  const q = el.dataset.q;
  document.querySelectorAll(`[data-q="${q}"]`).forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
  answers[q] = el.dataset.v;
  updateProgress();
}

function updateProgress() {
  const fields = ['nombre', 'correo', 'celular', 'negocio'];
  const filledFields = fields.filter(f => {
    const el = document.getElementById('f-' + f);
    return el && el.value.trim();
  }).length;

  const questionKeys = ['5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19'];
  const answered = questionKeys.filter(k => answers[k]).length;

  const total = filledFields + answered;
  const max = fields.length + questionKeys.length;
  const pct = Math.round((total / max) * 100);

  document.getElementById('progress-fill').style.width = pct + '%';
  document.getElementById('progress-label').textContent = total + ' / ' + max;
}

document.querySelectorAll('.input-field').forEach(el => {
  el.addEventListener('input', updateProgress);
});

// ── PROFILES ──
const profiles = {
  A: {
    name: 'Minimal Wellness',
    swatches: ['#2d6a4f', '#52b788', '#b7e4c7', '#fdfcf7'],
    palette: 'Verdes frescos + blanco roto + crema',
    tipo: 'Sans-serif ligera con mucho espacio en blanco',
    energia: 'Tranquilidad, salud, pureza natural',
    nav: 'Limpia, categorías minimalistas, íconos sutiles',
    refs: 'Sweetgreen, Erewhon, Goop Kitchen',
    dinamismo: 'Bajo — la calma es el mensaje',
  },
  B: {
    name: 'Raíces Cálidas',
    swatches: ['#bf5700', '#e07b39', '#f5deb3', '#fff8f0'],
    palette: 'Terracota + ocre + crema dorada',
    tipo: 'Serif con carácter o script artesanal',
    energia: 'Calidez, tradición, abundancia y comunidad',
    nav: 'Secciones con textura, sensación orgánica',
    refs: 'Café Tacuba, El Mayor, Haciendas mexicanas',
    dinamismo: 'Medio — presencia sin agresividad',
  },
  C: {
    name: 'Urbano Vibrante',
    swatches: ['#1a1a1a', '#333333', '#e63946', '#f4a261'],
    palette: 'Negro + acentos rojo o naranja vibrante',
    tipo: 'Bold sans-serif con mucho carácter',
    energia: 'Energía, movimiento, actitud y dinamismo',
    nav: 'Alto contraste, directa, con sorpresas visuales',
    refs: 'Shake Shack, Chipotle, Eataly',
    dinamismo: 'Alto — la energía es parte de la propuesta',
  },
  D: {
    name: 'Elegancia Sobria',
    swatches: ['#2d4a3e', '#4a7a6a', '#b5985a', '#f5f1eb'],
    palette: 'Verde oscuro + dorado + marfil',
    tipo: 'Serif clásica o sans-serif muy refinada',
    energia: 'Sofisticación, confianza y lujo accesible',
    nav: 'Jerarquía clara, fotografía elegante',
    refs: 'Nobu, Rosewood, Le Pain Quotidien',
    dinamismo: 'Bajo-medio — la precisión lo dice todo',
  },
};

function getMajority() {
  const counts = { A: 0, B: 0, C: 0, D: 0 };
  Object.values(answers).forEach(v => {
    if (counts[v] !== undefined) counts[v]++;
  });
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
}

function buildResultHTML(profileKey) {
  const p = profiles[profileKey];

  document.getElementById('profile-name-display').textContent = p.name;

  const swatchRow = document.getElementById('swatches-display');
  swatchRow.innerHTML = p.swatches.map(c =>
    `<span class="swatch" style="background:${c}"></span>`
  ).join('') + `<span class="swatch-label">${p.palette}</span>`;

  const rows = [
    ['Tipografía sugerida', p.tipo],
    ['Emoción principal', p.energia],
    ['Dinamismo visual', p.dinamismo],
    ['Navegación del menú', p.nav],
    ['Referencias visuales', p.refs],
  ];

  document.getElementById('result-rows-display').innerHTML = rows.map(([k, v]) =>
    `<div class="result-row"><span class="rk">${k}</span><span class="rv">${v}</span></div>`
  ).join('');
}

// ── FORM SUBMIT ──
document.getElementById('main-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  // Basic validation
  let valid = true;

  const nombre = document.getElementById('f-nombre').value.trim();
  const celular = document.getElementById('f-celular').value.trim();
  const correo = document.getElementById('f-correo').value.trim();
  const negocio = document.getElementById('f-negocio').value.trim();

  if (!nombre) { showErr('err-nombre', 'f-nombre'); valid = false; }
  else hideErr('err-nombre', 'f-nombre');

  if (!celular) { showErr('err-celular', 'f-celular'); valid = false; }
  else hideErr('err-celular', 'f-celular');

  if (!correo || !correo.includes('@')) { showErr('err-correo', 'f-correo'); valid = false; }
  else hideErr('err-correo', 'f-correo');

  if (!negocio) { showErr('err-negocio', 'f-negocio'); valid = false; }
  else hideErr('err-negocio', 'f-negocio');

  if (!valid) {
    document.getElementById('f-nombre').scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  const btn = document.getElementById('btn-submit');
  const btnText = document.getElementById('btn-text');
  btn.disabled = true;
  btnText.textContent = 'Enviando...';

  // Build profile
  const profileKey = getMajority();
  const p = profiles[profileKey];

  // Collect all form data
  const fd = new FormData(this);
  const data = Object.fromEntries(fd.entries());

  // Add decoded profile
  data['perfil_estilo'] = p.name;
  data['paleta_colores'] = p.palette;
  data['tipografia'] = p.tipo;
  data['emocion_principal'] = p.energia;
  data['dinamismo'] = p.dinamismo;
  data['navegacion'] = p.nav;
  data['referencias_visuales'] = p.refs;

  // Map option letters to labels for readability
  const qLabels = {
    '5': { q: 'Escapada soñada', A: 'Playa', B: 'Bosque/montaña', C: 'Ciudad nueva', D: 'Hacienda/rancho' },
    '6': { q: 'Hora del día', A: 'Amanecer', B: 'Mediodía', C: 'Atardecer', D: 'Noche' },
    '7': { q: 'Primer impresión', A: 'Olor y luz', B: 'Orden y limpieza', C: 'Colores y detalles', D: 'Gente y movimiento' },
    '8': { q: 'Estilo personal', A: 'Sencillo y elegante', B: 'Cálido y cercano', C: 'Dinámico', D: 'Detallado' },
    '9': { q: 'Referente', A: 'Gwyneth/Goop', B: 'Sofía Vergara', C: 'Elon Musk', D: 'Martha Stewart' },
    '10': { q: 'Tiempo libre', A: 'Yoga/correr', B: 'Cocinar/comer', C: 'Música/explorar', D: 'Leer/casa' },
    '11': { q: 'Interior ideal', A: 'Nórdico natural', B: 'Terracota mexicano', C: 'Industrial urbano', D: 'Lujo verde oscuro' },
    '12': { q: 'Fotografía', A: 'Flat lay blanco', B: 'Colores saturados', C: 'Acción/manos', D: 'Tonos tierra' },
    '13': { q: 'Marca referencia', A: 'Sweetgreen', B: 'Café Tacuba', C: 'Shake Shack', D: 'Nobu/Rosewood' },
    '14': { q: 'Paleta favorita', A: 'Verde brillante', B: 'Terracota', C: 'Neutros suaves', D: 'Negro/grafito', E: 'Coral/rosa', F: 'Azul/turquesa', G: 'Dorado/mostaza' },
    '15': { q: 'Emoción deseada', A: 'Calma', B: 'Apetito', C: 'Confianza', D: 'Calidez', E: 'Curiosidad', F: 'Alegría' },
    '16': { q: 'Tipografía', A: 'Serif italiana', B: 'Sans-serif limpia', C: 'Bold carácter', D: 'Script/caligráfica' },
    '17': { q: 'Navegación', A: 'Directa', B: 'Sorpresas', C: 'Categorías claras', D: 'Fotos grandes' },
    '18': { q: 'Detalle platillo', A: 'Solo nombre', B: 'Nombre+ingredientes', C: 'Descripción completa', D: 'Foto+poesía' },
    '19': { q: 'Formato menú', A: 'Digital QR', B: 'Físico impreso', C: 'Ambos', D: 'Pizarrón' },
  };

  let respuestasTexto = '\n--- RESPUESTAS PROYECTIVAS ---\n';
  Object.entries(qLabels).forEach(([qNum, info]) => {
    const ans = answers[qNum];
    const label = ans ? (info[ans] || ans) : 'Sin responder';
    respuestasTexto += `${info.q}: ${label}\n`;
  });

  data['respuestas_detalle'] = respuestasTexto;

  // ─────────────────────────────────────────────
  // ENVÍO VÍA FORMSPREE
  // Pasos:
  //   1. Ve a https://formspree.io y crea una cuenta gratis
  //   2. Crea un nuevo form, copia tu endpoint (ej: https://formspree.io/f/xyzabcde)
  //   3. Reemplaza la URL de abajo con tu endpoint
  // ─────────────────────────────────────────────
  const FORMSPREE_URL = 'https://formspree.io/f/https://formspree.io/f/xvzvjjrk'; // ← CAMBIA ESTO

  try {
    const res = await fetch(FORMSPREE_URL, {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      // Show success
      document.getElementById('form-container').style.display = 'none';
      buildResultHTML(profileKey);
      document.getElementById('success-screen').style.display = 'block';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      throw new Error('Error en el servidor');
    }
  } catch (err) {
    // If Formspree not configured yet, still show result locally
    document.getElementById('form-container').style.display = 'none';
    buildResultHTML(profileKey);
    document.getElementById('success-screen').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    console.warn('Formspree no configurado — mostrando resultado local:', err);
  }

  btn.disabled = false;
  btnText.textContent = 'Enviar y ver mi perfil →';
});

function showErr(errId, fieldId) {
  document.getElementById(errId).classList.add('show');
  document.getElementById(fieldId).classList.add('error');
}

function hideErr(errId, fieldId) {
  document.getElementById(errId).classList.remove('show');
  document.getElementById(fieldId).classList.remove('error');
}
