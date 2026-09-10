/* ============================================================
   CAFETERÍA, HELADERÍA Y MINIMARKET "LA GRACIA" — datos y lógica
   ============================================================
   ⚠️ SIN PRECIOS. No publican precios en ningún canal. Los tres primeros
   productos son los "Destacados del menú" que publica SU PROPIA ficha de
   Google, con su nombre exacto. El resto se identifica en sus propias
   fotos o lo nombran sus reseñas reales. Ninguno inventado. Pedirle la
   carta al local para cargar los precios.
   ============================================================ */

const MENU = {
  "pasteleria": {
    "label": "Pastelería",
    "items": [
      {
        "n": "Roll de Canela Español",
        "d": "Destacado del menú en su propia ficha de Google",
        "img": "rollos-canela.jpg"
      },
      {
        "n": "Kuchen Arándanos la Floresta",
        "d": "Destacado del menú en su propia ficha de Google",
        "img": "kuchen.jpg"
      },
      {
        "n": "Muffins Francés",
        "d": "Destacado del menú en su propia ficha de Google",
        "img": "muffins.jpg"
      },
      {
        "n": "Donas",
        "d": "Fotografiadas en sus mesones",
        "img": "donas.jpg"
      },
      {
        "n": "Alfajores y galletas",
        "d": "Fotografiados en sus mesones"
      },
      {
        "n": "Croissants",
        "d": "Fotografiados junto al kuchen, en bandeja"
      },
      {
        "n": "Pie",
        "d": "Fotografiado en sus mesones",
        "img": "vitrina.jpg"
      }
    ]
  },
  "panaderia": {
    "label": "Panadería",
    "items": [
      {
        "n": "Pan amasado",
        "d": "\"Pan amasado riquísimo\" — cita textual de una reseña real"
      }
    ]
  },
  "cafeteria": {
    "label": "Cafetería",
    "items": [
      {
        "n": "Café",
        "d": "Tienen máquina de café a la vista en el mostrador"
      },
      {
        "n": "Desayuno",
        "d": "\"Ideal para tomar desayuno, hay de todo y bueno\" — reseña real"
      }
    ]
  },
  "minimarket": {
    "label": "Minimarket",
    "items": [
      {
        "n": "Bebidas y jugos",
        "d": "Refrigeradores a la vista en el local",
        "img": "minimarket.jpg"
      },
      {
        "n": "Snacks y dulces",
        "d": "Góndolas propias — fotografiadas en el local"
      },
      {
        "n": "Abarrotes",
        "d": "Está en el nombre del negocio y se ve en sus fotos"
      }
    ]
  }
};

const money = n => '$' + n.toLocaleString('es-CL');

const tabsEl   = document.getElementById('menuTabs');
const panelsEl = document.getElementById('menuPanels');

Object.keys(MENU).forEach((key, i) => {
  const tab = document.createElement('button');
  tab.className = 'menu-tab' + (i === 0 ? ' active' : '');
  tab.type = 'button';
  tab.textContent = MENU[key].label;
  tab.dataset.key = key;
  tab.setAttribute('role', 'tab');
  tab.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
  tab.addEventListener('click', () => showTab(key));
  tabsEl.appendChild(tab);

  const panel = document.createElement('div');
  panel.className = 'menu-panel' + (i === 0 ? ' active' : '');
  panel.id = 'panel-' + key;

  const grid = document.createElement('div');
  grid.className = 'menu-grid';

  MENU[key].items.forEach(item => {
    const row = document.createElement('div');
    row.className = 'menu-item reveal';

    if (item.img) {
      // La clase cf-thumb la necesita el grid de .menu-item para ubicarla en
      // su columna; sin ella la miniatura caia fuera de las areas y abria
      // una fila extra.
      const cont = document.createElement('div');
      cont.className = 'cf-thumb';
      const im = document.createElement('img');
      im.src = 'fotos/' + item.img; im.alt = item.n; im.loading = 'lazy';
      im.style.cssText = 'width:58px;height:58px;object-fit:cover;border-radius:12px;';
      cont.appendChild(im);
      row.appendChild(cont);
    }

    const texto = document.createElement('div');
    texto.className = 'menu-item-text';
    const nombre = document.createElement('span');
    nombre.className = 'name';
    nombre.textContent = item.n;
    texto.appendChild(nombre);

    if (item.d) {
      const desc = document.createElement('div');
      desc.className = 'desc';
      desc.textContent = item.d;
      texto.appendChild(desc);
    }

    // Sin precio publicado: "Consultar", nunca un monto inventado.
    const precio = document.createElement('div');
    precio.className = 'price';
    precio.textContent = item.p ? money(item.p) : 'Consultar';

    row.appendChild(texto);
    row.appendChild(precio);
    grid.appendChild(row);
  });

  panel.appendChild(grid);
  panelsEl.appendChild(panel);
});

function showTab(key) {
  document.querySelectorAll('.menu-tab').forEach(t => {
    const activo = t.dataset.key === key;
    t.classList.toggle('active', activo);
    t.setAttribute('aria-selected', activo ? 'true' : 'false');
  });
  document.querySelectorAll('.menu-panel').forEach(p => {
    p.classList.toggle('active', p.id === 'panel-' + key);
  });
  initScrollReveal();
}

/* ---------- NAVEGACIÓN POR PESTAÑAS ---------- */
const navLinks = document.getElementById('navLinks');

function goToTab(tabId) {
  document.querySelectorAll('.tab-panel').forEach(p => {
    p.classList.toggle('active', p.dataset.tabPanel === tabId);
  });
  document.querySelectorAll('.nav-link').forEach(l => {
    l.classList.toggle('active', l.dataset.tab === tabId);
  });
  navLinks.classList.remove('open');
  document.getElementById('navToggle').setAttribute('aria-expanded', 'false');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  initScrollReveal();
}

document.querySelectorAll('[data-tab]').forEach(el => {
  el.addEventListener('click', e => { e.preventDefault(); goToTab(el.dataset.tab); });
});

document.getElementById('navToggle').addEventListener('click', function () {
  const abierto = navLinks.classList.toggle('open');
  this.setAttribute('aria-expanded', abierto ? 'true' : 'false');
});

/* ---------- INDICADOR ABIERTO / CERRADO ----------
   ⚠️ Google confirma que CIERRA a las 19:30. La hora de apertura NO está publicada: se asume 07:00 porque sus propias fotos están tomadas a las 07:41 y 08:16 con el local abierto. Así se declara en Visítanos. */
function horarioDeHoy() {
  return [7 * 60, 19 * 60 + 30];
}

function actualizarEstado(dotId, textId) {
  const dot  = document.getElementById(dotId);
  const text = document.getElementById(textId);
  if (!dot || !text) return;
  const ahora   = new Date();
  const minutos = ahora.getHours() * 60 + ahora.getMinutes();
  const h       = horarioDeHoy();
  if (!h) {
    // Sin horario publicado: se esconde la pildora entera en vez de
    // afirmar que esta cerrado, cosa que no nos consta.
    const caja = text.closest('.pill, .status-line') || text.parentElement;
    if (caja) caja.hidden = true;
    return;
  }
  const abierto = minutos >= h[0] && minutos < h[1];
  text.textContent = abierto ? 'Abierto ahora' : 'Cerrado ahora';
  dot.classList.toggle('closed', !abierto);
}

actualizarEstado('statusDot', 'statusText');
actualizarEstado('statusDot2', 'statusText2');

/* ---------- SCROLL REVEAL (con red de seguridad) ---------- */
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal:not(.in)');
  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  els.forEach((el, i) => {
    el.style.transitionDelay = (Math.min(i % 6, 6) * 55) + 'ms';
    io.observe(el);
  });

  setTimeout(() => {
    document.querySelectorAll('.reveal:not(.in)').forEach(el => el.classList.add('in'));
  }, 1200);
}
initScrollReveal();

window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('loader').classList.add('done'), 320);
});
