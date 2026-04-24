// js/haberler.js

const HABER_PER_PAGE = 8;
let currentPage = 1;
let filteredHaberler = [...haberlerData];

document.addEventListener('DOMContentLoaded', () => {
    // Koruma
    initProtection();
    
    // Tema
    initTheme();
    
    // Menü
    initMenu();
    
    // Haberler
    renderHaberler();
    
    // Arama
    initSearch();
    
    // Modal
    initDetailModal();
});

function initProtection() {
    document.addEventListener('contextmenu', e => e.preventDefault());
    document.addEventListener('keydown', e => {
        if (e.ctrlKey && (e.key === 'u' || e.key === 'U')) e.preventDefault();
        if (e.ctrlKey && (e.key === 'a' || e.key === 'A')) e.preventDefault();
    });
}

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

function initMenu() {
    const hamburger = document.getElementById('hamburgerBtn');
    const sideMenu = document.getElementById('sideMenu');
    const overlay = document.getElementById('menuOverlay');
    const closeBtn = document.getElementById('closeMenu');
    
    const openMenu = () => {
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

function renderHaberler() {
    const grid = document.getElementById('haberlerGrid');
    const pagination = document.getElementById('pagination');
    const toplamEl = document.getElementById('toplamHaber');
    
    filteredHaberler.sort((a, b) => new Date(b.tarih) - new Date(a.tarih));
    const totalPages = Math.ceil(filteredHaberler.length / HABER_PER_PAGE);
    const start = (currentPage - 1) * HABER_PER_PAGE;
    const end = start + HABER_PER_PAGE;
    const pageHaberler = filteredHaberler.slice(start, end);
    
    toplamEl.textContent = filteredHaberler.length;
    
    // Haberler
    grid.innerHTML = pageHaberler.map(haber => `
        <article class="haber-card" data-id="${haber.id}">
            <img src="${haber.gorsel}" alt="${haber.baslik}">
            <div class="haber-card-content">
                <span class="haber-kategori">${haber.kategori}</span>
                <h3>${haber.baslik}</h3>
                <p>${haber.ozet}</p>
                <button class="detay-btn" data-id="${haber.id}">
                    Detaya Git
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="m9 18 6-6-6-6"/>
                    </svg>
                </button>
            </div>
        </article>
    `).join('');
    
    // Pagination
    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }
    
    let paginationHTML = `
        <button class="page-btn" onclick="goToPage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>
            ← Önceki
        </button>
    `;
    
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
            paginationHTML += `
                <button class="page-btn ${i === currentPage ? 'active' : ''}" onclick="goToPage(${i})">
                    ${i}
                </button>
            `;
        } else if (i === currentPage - 2 || i === currentPage + 2) {
            paginationHTML += `<span class="page-btn">...</span>`;
        }
    }
    
    paginationHTML += `
        <button class="page-btn" onclick="goToPage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>
            Sonraki →
        </button>
    `;
    
    pagination.innerHTML = paginationHTML;
}

function goToPage(page) {
    const totalPages = Math.ceil(filteredHaberler.length / HABER_PER_PAGE);
    if (page < 1 || page > totalPages) return;
    
    currentPage = page;
    renderHaberler();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function initSearch() {
    const searchInput = document.getElementById('searchInput');
    
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase().trim();
        
        if (query.length < 2) {
            filteredHaberler = [...haberlerData];
        } else {
            filteredHaberler = haberlerData.filter(h => 
                h.baslik.toLowerCase().includes(query) ||
                h.ozet.toLowerCase().includes(query)
            );
        }
        
        currentPage = 1;
        renderHaberler();
    });
}

function initDetailModal() {
    const modal = document.getElementById('detailModal');
    const closeBtn = document.getElementById('closeDetail');
    
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.detay-btn');
        if (btn) {
            const id = parseInt(btn.dataset.id);
            const haber = haberlerData.find(h => h.id === id);
            if (haber) openDetail(haber);
        }
    });
    
    closeBtn.addEventListener('click', closeDetail);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeDetail();
    });
}

function openDetail(haber) {
    const modal = document.getElementById('detailModal');
    
    document.getElementById('detailImage').src = haber.gorsel;
    document.getElementById('detailTitle').textContent = haber.baslik;
    document.getElementById('detailCategory').textContent = haber.kategori;
    document.getElementById('detailDate').textContent = formatTarih(haber.tarih);
    document.getElementById('detailText').textContent = haber.icerik;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeDetail() {
    const modal = document.getElementById('detailModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}