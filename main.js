// js/main.js

document.addEventListener('DOMContentLoaded', () => {
    initProtection();
    initTheme();
    initNavbar();
    initMenu();
    initSlider();
    renderSonHaberler();
    renderOneriler();
    initSearch();
    initDetailModal();
});

// ─── KORUMA ───────────────────────────────────────────────
function initProtection() {
    document.addEventListener('contextmenu', e => e.preventDefault());
    document.addEventListener('keydown', e => {
        if (e.ctrlKey && (e.key === 'u' || e.key === 'U')) e.preventDefault();
        if (e.ctrlKey && (e.key === 'a' || e.key === 'A')) e.preventDefault();
    });
}

// ─── TEMA ─────────────────────────────────────────────────
function initTheme() {
    const savedTheme = localStorage.getItem('animium-theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    document.querySelectorAll('.theme-btn').forEach(btn => {
        if (btn.dataset.theme === savedTheme) btn.classList.add('active');
        btn.addEventListener('click', () => {
            const theme = btn.dataset.theme;
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('animium-theme', theme);
            document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
}

// ─── NAVBAR ───────────────────────────────────────────────
function initNavbar() {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
}

// ─── HAMBURGER MENÜ ───────────────────────────────────────
function initMenu() {
    const hamburger = document.getElementById('hamburgerBtn');
    const sideMenu  = document.getElementById('sideMenu');
    const overlay   = document.getElementById('menuOverlay');
    const closeBtn  = document.getElementById('closeMenu');

    const openMenu  = () => {
        hamburger.classList.add('active');
        sideMenu.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    };
    const closeMenu = () => {
        hamburger.classList.remove('active');
        sideMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    hamburger.addEventListener('click', openMenu);
    closeBtn.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);
}

// ─── OKUNDU TAKİBİ ────────────────────────────────────────
function getOkundu() {
    try { return JSON.parse(localStorage.getItem('animium-okundu') || '[]'); } catch { return []; }
}
function setOkundu(id) {
    const list = getOkundu();
    if (!list.includes(id)) {
        list.push(id);
        localStorage.setItem('animium-okundu', JSON.stringify(list));
    }
}

// ─── DETAY MODAL ──────────────────────────────────────────
// hem haberler hem slider hem öneriler bu fonksiyonu kullanır
function openDetailModal({ gorsel, baslik, kategori, tarih, icerik }) {
    const modal = document.getElementById('detailModal');
    document.getElementById('detailImage').src            = gorsel || '';
    document.getElementById('detailTitle').textContent    = baslik || '';
    document.getElementById('detailCategory').textContent = kategori || '';
    document.getElementById('detailDate').textContent     = tarih ? formatTarih(tarih) : '';
    document.getElementById('detailText').textContent     = icerik || '';
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeDetail() {
    document.getElementById('detailModal').classList.remove('active');
    document.body.style.overflow = '';
}

function initDetailModal() {
    const modal    = document.getElementById('detailModal');
    const closeBtn = document.getElementById('closeDetail');
    closeBtn.addEventListener('click', closeDetail);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeDetail(); });
}

// ─── HERO SLIDER — TAMAMEN BAĞIMSIZ ──────────────────────
// heroSliderData'dan gelir, haberlerData ile ilgisi yok
// "Devamını Oku" → modalIcerik alanını modal olarak açar
function initSlider() {
    const container     = document.getElementById('sliderContainer');
    const dotsContainer = document.getElementById('sliderDots');
    let currentSlide    = 0;
    let autoSlideInterval;

    heroSliderData.forEach((slide, i) => {
        container.innerHTML += `
            <div class="slide">
                <div class="slide-bg" style="background-image: url('${slide.gorsel}')"></div>
                <div class="slide-content">
                    <span class="slide-tag">${slide.baslik}</span>
                    <h2 class="slide-title">${slide.altBaslik}</h2>
                    <p class="slide-desc">${slide.aciklama}</p>
                    ${slide.modalIcerik
                        ? `<button class="slide-detay-btn" data-index="${i}">Devamını Oku →</button>`
                        : ''}
                </div>
            </div>`;
        dotsContainer.innerHTML += `<div class="dot ${i === 0 ? 'active' : ''}" data-index="${i}"></div>`;
    });

    const dots = document.querySelectorAll('.dot');

    const goToSlide = (index) => {
        currentSlide = index;
        container.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
    };

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            goToSlide(parseInt(dot.dataset.index));
            resetAutoSlide();
        });
    });

    // "Devamını Oku" → slider kendi modalIcerik'ini açar
    container.addEventListener('click', (e) => {
        const btn = e.target.closest('.slide-detay-btn');
        if (btn) {
            const slide = heroSliderData[parseInt(btn.dataset.index)];
            if (slide) {
                openDetailModal({
                    gorsel:   slide.gorsel,
                    baslik:   slide.altBaslik,
                    kategori: slide.baslik,
                    tarih:    null,
                    icerik:   slide.modalIcerik
                });
            }
        }
    });

    // Dokunmatik
    let touchStartX = 0;
    container.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; });
    container.addEventListener('touchend', e => {
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
            if (diff > 0 && currentSlide < heroSliderData.length - 1) goToSlide(currentSlide + 1);
            else if (diff < 0 && currentSlide > 0) goToSlide(currentSlide - 1);
            resetAutoSlide();
        }
    });

    const startAutoSlide = () => {
        autoSlideInterval = setInterval(() => goToSlide((currentSlide + 1) % heroSliderData.length), 5000);
    };
    const resetAutoSlide = () => { clearInterval(autoSlideInterval); startAutoSlide(); };
    startAutoSlide();
}

// ─── KATEGORİ FİLTRESİ ────────────────────────────────────
function buildKategoriFiltre() {
    const kategoriler = ['Tümü', ...new Set(haberlerData.map(h => h.kategori))];
    const wrapper = document.getElementById('kategoriFiltre');
    if (!wrapper) return;

    wrapper.innerHTML = kategoriler.map(k =>
        `<button class="kategori-btn ${k === 'Tümü' ? 'active' : ''}" data-kategori="${k}">${k}</button>`
    ).join('');

    wrapper.addEventListener('click', (e) => {
        const btn = e.target.closest('.kategori-btn');
        if (!btn) return;
        wrapper.querySelectorAll('.kategori-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderSonHaberler(btn.dataset.kategori);
    });
}

// ─── SON HABERLER ─────────────────────────────────────────
function renderSonHaberler(kategori = 'Tümü') {
    const container = document.getElementById('sonHaberler');
    const sayiEl    = document.getElementById('haberSayisi');
    const okundu    = getOkundu();

    sayiEl.textContent = haberlerData.length;

    const sirali = [...haberlerData].sort((a, b) => new Date(b.tarih) - new Date(a.tarih));
    const liste  = kategori === 'Tümü'
        ? sirali.slice(0, 8)
        : sirali.filter(h => h.kategori === kategori).slice(0, 8);

    container.innerHTML = liste.map(haber => `
        <div class="haber-card-mini ${okundu.includes(haber.id) ? 'okundu' : ''}"
             style="cursor:pointer;" data-id="${haber.id}">
            <img src="${haber.gorsel}" alt="${haber.baslik}">
            <h3>${haber.baslik}</h3>
            ${okundu.includes(haber.id) ? '<span class="okundu-badge">✓ Okundu</span>' : ''}
        </div>
    `).join('');

    container.addEventListener('click', (e) => {
        const card = e.target.closest('[data-id]');
        if (!card) return;
        const id    = parseInt(card.dataset.id);
        const haber = haberlerData.find(h => h.id === id);
        if (!haber) return;
        setOkundu(id);
        card.classList.add('okundu');
        if (!card.querySelector('.okundu-badge')) {
            const badge = document.createElement('span');
            badge.className   = 'okundu-badge';
            badge.textContent = '✓ Okundu';
            card.appendChild(badge);
        }
        openDetailModal({
            gorsel:   haber.gorsel,
            baslik:   haber.baslik,
            kategori: haber.kategori,
            tarih:    haber.tarih,
            icerik:   haber.icerik
        });
    });

    if (!document.querySelector('.kategori-btn')) buildKategoriFiltre();
}

// ─── ÖNERİLER — TAMAMEN BAĞIMSIZ ─────────────────────────
// oneriData'dan gelir, haberlerData ile ilgisi yok
// tıklayınca kendi içeriğini modal olarak açar
function renderOneriler() {
    const grid = document.getElementById('onerilerGrid');

    grid.innerHTML = oneriData.map((oneri, i) => `
        <div class="oneri-card" style="cursor:pointer;" data-index="${i}">
            <img src="${oneri.gorsel}" alt="${oneri.baslik}" class="oneri-image">
            <div class="oneri-content">
                <span class="oneri-tag">${oneri.tip}</span>
                <h3 class="oneri-title">${oneri.baslik}</h3>
                <p class="oneri-desc">${oneri.aciklama}</p>
                <span class="oneri-time">${oneri.zaman}</span>
            </div>
        </div>
    `).join('');

    grid.addEventListener('click', (e) => {
        const card = e.target.closest('[data-index]');
        if (!card) return;
        const oneri = oneriData[parseInt(card.dataset.index)];
        if (!oneri) return;
        openDetailModal({
            gorsel:   oneri.gorsel,
            baslik:   oneri.baslik,
            kategori: oneri.tip,
            tarih:    null,
            icerik:   oneri.aciklama
        });
    });
}

// ─── ARAMA ────────────────────────────────────────────────
function initSearch() {
    const searchBox   = document.querySelector('.search-box');
    const searchInput = document.getElementById('searchInput');
    const modal       = document.getElementById('searchResultsModal');
    const resultsList = document.getElementById('searchResultsList');
    const closeBtn    = document.getElementById('closeSearch');

    searchInput.addEventListener('focus', () => searchBox.classList.add('active'));

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase().trim();
        if (query.length < 2) { modal.classList.remove('active'); return; }

        const results = haberlerData.filter(h =>
            h.baslik.toLowerCase().includes(query) ||
            h.ozet.toLowerCase().includes(query)
        );

        resultsList.innerHTML = results.length
            ? results.map(h => `
                <div class="search-result-item" style="cursor:pointer;" data-id="${h.id}">
                    <img src="${h.gorsel}" alt="">
                    <div class="search-result-info">
                        <h4>${h.baslik}</h4>
                        <p>${formatTarih(h.tarih)}</p>
                    </div>
                </div>`).join('')
            : '<div class="no-results">Sonuç bulunamadı</div>';

        modal.classList.add('active');
    });

    resultsList.addEventListener('click', (e) => {
        const item = e.target.closest('[data-id]');
        if (!item) return;
        const haber = haberlerData.find(h => h.id === parseInt(item.dataset.id));
        if (!haber) return;
        modal.classList.remove('active');
        searchInput.value = '';
        setOkundu(haber.id);
        openDetailModal({
            gorsel:   haber.gorsel,
            baslik:   haber.baslik,
            kategori: haber.kategori,
            tarih:    haber.tarih,
            icerik:   haber.icerik
        });
    });

    closeBtn.addEventListener('click', () => { modal.classList.remove('active'); searchInput.value = ''; });
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('active'); });
}