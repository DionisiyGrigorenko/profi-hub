document.addEventListener("DOMContentLoaded", () => {
    // 1. АВТОМАТИЧНЕ ЗАСТОСУВАННЯ ТЕМИ
    const savedTheme = localStorage.getItem('skillup_theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);

    // 2. ГЕНЕРАЦІЯ НАВІГАЦІЇ
    const navHTML = `
        <nav>
            <a href="index.html" data-page="index.html">Головна</a>
            <a href="quest.html" data-page="quest.html">Profi-Quest</a>
            <a href="test.html" data-page="test.html">Експрес-тест</a>
            <a href="future-jobs.html" data-page="future-jobs.html">Професії майбутнього</a>
            <a href="parents.html" data-page="parents.html">Батькам</a>
            <a href="resources.html" data-page="resources.html">Корисні ресурси</a>
            <button class="theme-toggle" id="themeToggleBtn" onclick="toggleTheme()" title="Змінити тему оформлення">
                <i class="${savedTheme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon'}" id="themeIcon"></i>
            </button>
        </nav>
    `;
    
    // Вставляємо навігацію на початок body, якщо її ще немає
    if (!document.querySelector('nav')) {
        document.body.insertAdjacentHTML('afterbegin', navHTML);
    }

    // Підсвічування активної сторінки в меню
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll('nav a').forEach(link => {
        if (link.getAttribute('data-page') === currentPage) {
            link.classList.add('active');
        }
    });

    // 3. ГЕНЕРАЦІЯ ФУТЕРА
    const footerHTML = `
        <footer>
            Вихренко Ірина, Умань, 2026 рік
        </footer>
    `;
    if (!document.querySelector('footer')) {
        document.body.insertAdjacentHTML('beforeend', footerHTML);
    }

    // 4. СТВОРЕННЯ КНОПКИ "ВГОРУ"
    if (!document.getElementById('scrollTopBtn')) {
        const scrollBtn = document.createElement('button');
        scrollBtn.id = 'scrollTopBtn';
        scrollBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
        scrollBtn.title = 'Нагору';
        scrollBtn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
        document.body.appendChild(scrollBtn);

        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollBtn.classList.add('show');
            } else {
                scrollBtn.classList.remove('show');
            }
        });
    }
});

// Глобальна функція перемикання теми
function toggleTheme() {
    const body = document.body;
    const icon = document.getElementById('themeIcon');
    let currentTheme = body.getAttribute('data-theme');
    let newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('skillup_theme', newTheme);
    
    if (icon) {
        icon.className = newTheme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    }
}
