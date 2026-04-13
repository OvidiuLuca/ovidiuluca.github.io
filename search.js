(function () {

  /* ── Search index ── */
  var SEARCH_DATA = [
    {
      title: 'Home',
      titleRo: 'Acasă',
      url: '/',
      excerpt: 'Opsistech — Machine Vision and industrial automation specialists in Romania. Automated inspection, robot guidance, AI analysis.',
      excerptRo: 'Opsistech — Specialiști în Machine Vision și automatizare industrială în România. Inspecție automatizată, ghidare robotică, analiză IA.'
    },
    {
      title: 'About Opsistech',
      titleRo: 'Despre Opsistech',
      url: '/#about',
      excerpt: 'Technology firm specialising in machine vision and AI-driven industrial inspection. Precision, Integrity, Innovation, Partnership.',
      excerptRo: 'Companie de tehnologie specializată în machine vision și inspecție industrială bazată pe IA. Precizie, Integritate, Inovație, Parteneriat.'
    },
    {
      title: 'Contact',
      titleRo: 'Contact',
      url: '/#contact',
      excerpt: 'Get in touch with Opsistech. Email: support@opsistech.ro. Phone: 0743 082838. We respond within one business day.',
      excerptRo: 'Contactați Opsistech. Email: support@opsistech.ro. Telefon: 0743 082838. Răspundem în cel mult o zi lucrătoare.'
    },
    {
      title: 'Automated Inspection',
      titleRo: 'Inspecție Automatizată',
      url: '/services/automated-inspection.html',
      excerpt: 'Detect scratches, shape anomalies, missing components, faulty electronics, and packaging defects — 24/7 at production speed.',
      excerptRo: 'Detectați zgârieturi, anomalii de formă, componente lipsă, electronică defectă și defecte de ambalare — 24/7 la viteza producției.'
    },
    {
      title: 'Robot Guidance',
      titleRo: 'Ghidare Robotică',
      url: '/services/robot-guidance.html',
      excerpt: 'Vision-guided robotics for bin picking, assembly, and logistics. 2D and 3D pose estimation for all major robot brands.',
      excerptRo: 'Robotică ghidată vizual pentru bin picking, asamblare și logistică. Estimare de poziție 2D și 3D pentru toți marii producători de roboți.'
    },
    {
      title: 'Dimensional Measurement',
      titleRo: 'Măsurare Dimensională',
      url: '/services/measurement-metrology.html',
      excerpt: '3D scanning, dimensional inspection, GD&T verification, and CAD comparison. Micron-level accuracy with first-article inspection reports.',
      excerptRo: 'Scanare 3D, inspecție dimensională, verificare GD&T și comparare cu CAD. Precizie la nivel de micron cu rapoarte de inspecție a primei piese.'
    },
    {
      title: 'Identification & Tracking',
      titleRo: 'Identificare & Urmărire',
      url: '/services/identification-tracking.html',
      excerpt: 'Barcode, QR, Data Matrix, OCR and DPM reading. Full product traceability integrated with MES and ERP systems.',
      excerptRo: 'Citire coduri de bare, QR, Data Matrix, OCR și DPM. Trasabilitate completă integrată cu sisteme MES și ERP.'
    },
    {
      title: 'AI-Based Analysis',
      titleRo: 'Analiză Bazată pe IA',
      url: '/services/ai-analysis.html',
      excerpt: 'Deep learning for complex defect detection beyond rule-based methods. Anomaly detection, classification, segmentation, edge deployment.',
      excerptRo: 'Deep learning pentru detectarea defectelor complexe dincolo de metodele bazate pe reguli. Detectare anomalii, clasificare, segmentare.'
    },
    {
      title: 'Industries Served',
      titleRo: 'Industrii Deservite',
      url: '/services/industries.html',
      excerpt: 'Automotive, Electronics, Food & Beverage, Logistics, Pharmaceuticals — sector-specific machine vision expertise in Romania.',
      excerptRo: 'Auto, Electronică, Alimentar și Băuturi, Logistică, Farmaceutică — expertiză specifică sectorului în machine vision în România.'
    },
    {
      title: 'Automotive',
      titleRo: 'Auto',
      url: '/services/industries.html',
      excerpt: 'Body panel inspection, weld quality, fastener checks, safety components, robot guidance for assembly cells.',
      excerptRo: 'Inspecție caroserie, calitate suduri, verificare elemente de fixare, componente de siguranță, ghidare robotică pentru celule de asamblare.'
    },
    {
      title: 'Electronics Manufacturing',
      titleRo: 'Fabricare Electronică',
      url: '/services/industries.html',
      excerpt: 'PCB automated optical inspection (AOI), solder paste inspection (SPI), component placement verification.',
      excerptRo: 'Inspecție optică automatizată PCB (AOI), inspecția pastei de lipit (SPI), verificarea plasamentului componentelor.'
    },
    {
      title: 'Pharmaceuticals',
      titleRo: 'Farmaceutică',
      url: '/services/industries.html',
      excerpt: 'Blister pack inspection, tablet verification, serialisation, GMP compliant systems with full audit trails.',
      excerptRo: 'Inspecție blistere, verificare tablete, serializare, sisteme conforme GMP cu trasabilitate completă.'
    }
  ];

  /* ── Resolve URL relative to current page ── */
  function resolveUrl(rootPath) {
    var pathname = window.location.pathname;
    var dir = pathname.replace(/\/[^/]*$/, '');
    var segments = dir.split('/').filter(Boolean);
    var prefix = segments.length > 0 ? segments.map(function () { return '../'; }).join('') : '';
    var hashIdx = rootPath.indexOf('#');
    var path = hashIdx >= 0 ? rootPath.slice(0, hashIdx) : rootPath;
    var hash = hashIdx >= 0 ? rootPath.slice(hashIdx) : '';
    var clean = path.replace(/^\//, '');
    return prefix + clean + hash;
  }

  /* ── Get current lang ── */
  function getLang() {
    return document.documentElement.lang === 'ro' ? 'ro' : 'en';
  }

  /* ── Inject inline bar into nav ── */
  var nav = document.querySelector('nav');
  if (!nav) return;

  var barWrap = document.createElement('div');
  barWrap.className = 'search-bar-wrap';
  barWrap.innerHTML =
    '<input type="text" class="search-bar-input" id="search-bar-input" autocomplete="off" spellcheck="false">' +
    '<button class="search-close-btn" id="search-close-btn" aria-label="Close search">&times;</button>';
  nav.appendChild(barWrap);

  /* ── Results dropdown (appended to body) ── */
  var dropdown = document.createElement('div');
  dropdown.className = 'search-dropdown';
  dropdown.innerHTML =
    '<div class="search-dropdown-inner">' +
      '<ul class="search-result-list" id="search-result-list"></ul>' +
    '</div>';
  document.body.appendChild(dropdown);

  var input = document.getElementById('search-bar-input');
  var closeBtn = document.getElementById('search-close-btn');
  var resultList = document.getElementById('search-result-list');

  /* ── Position dropdown flush below header ── */
  function positionDropdown() {
    var header = document.querySelector('header');
    if (header) {
      dropdown.style.top = header.getBoundingClientRect().bottom + 'px';
    }
  }

  /* ── Update placeholder for current lang ── */
  function updatePlaceholder() {
    input.placeholder = getLang() === 'ro' ? 'Caută…' : 'Search…';
  }

  /* ── Open search bar ── */
  function openSearch() {
    updatePlaceholder();
    nav.classList.add('search-active');
    positionDropdown();
    /* Double rAF ensures the opacity transition has started before focus() */
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        input.focus();
      });
    });
  }

  /* ── Close search bar ── */
  function closeSearch() {
    nav.classList.remove('search-active');
    dropdown.classList.remove('open');
    input.value = '';
    resultList.innerHTML = '';
  }

  /* ── Lens button opens bar ── */
  var toggleBtn = document.getElementById('search-toggle');
  if (toggleBtn) toggleBtn.addEventListener('click', openSearch);

  /* ── × button closes bar ── */
  closeBtn.addEventListener('click', closeSearch);

  /* ── ESC closes; Ctrl/Cmd+K opens ── */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeSearch();
    if (e.key === 'k' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); openSearch(); }
  });

  /* ── Load Fuse.js then wire live search ── */
  var fuseScript = document.createElement('script');
  fuseScript.src = 'https://cdn.jsdelivr.net/npm/fuse.js@7/dist/fuse.min.js';
  fuseScript.onload = function () {

    var fuse = new Fuse(SEARCH_DATA, {
      keys: [
        { name: 'title',     weight: 0.3 },
        { name: 'titleRo',   weight: 0.3 },
        { name: 'excerpt',   weight: 0.2 },
        { name: 'excerptRo', weight: 0.2 }
      ],
      threshold: 0.4,
      includeScore: true,
      minMatchCharLength: 2
    });

    input.addEventListener('input', function () {
      var q = input.value.trim();
      resultList.innerHTML = '';

      if (!q) {
        dropdown.classList.remove('open');
        return;
      }

      /* Auto-detect Romanian diacritics in query; fall back to UI lang */
      var lang = /[ăâîșțĂÂÎȘȚ]/.test(q) ? 'ro' : getLang();
      var hits = fuse.search(q, { limit: 7 });
      positionDropdown();

      if (!hits.length) {
        var empty = document.createElement('li');
        empty.className = 'search-empty';
        empty.textContent = lang === 'ro' ? 'Niciun rezultat.' : 'No results found.';
        resultList.appendChild(empty);
        dropdown.classList.add('open');
        return;
      }

      hits.forEach(function (hit) {
        var item = hit.item;
        var li = document.createElement('li');
        li.className = 'search-result-item';
        var a = document.createElement('a');
        a.href = resolveUrl(item.url);
        a.innerHTML =
          '<div class="sr-title">' + (lang === 'ro' ? item.titleRo : item.title) + '</div>' +
          '<div class="sr-desc">' + (lang === 'ro' ? item.excerptRo : item.excerpt) + '</div>';
        a.addEventListener('click', closeSearch);
        li.appendChild(a);
        resultList.appendChild(li);
      });

      dropdown.classList.add('open');
    });

  };
  document.head.appendChild(fuseScript);

})();
