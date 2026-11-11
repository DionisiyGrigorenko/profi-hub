/* ==========================================
   COMMON.JS — Повний код для платформи SkillUp
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Відновлення теми з localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    // 2. Автоматичне додавання назви платформи в навігацію на всіх сторінках
    injectBrandToNavbar();

    // 3. Створення кнопки "Нагору"
    createScrollTopButton();

    // 4. Автоматичне підсвічування активної сторінки в меню
    highlightActiveNavLink();

    // 5. Створення глобального віджета відгуків на кожній сторінці
    createFeedbackWidget();
});

/* --- Автоматичне додавання бренду в навігацію --- */
function injectBrandToNavbar() {
    const nav = document.querySelector('nav');
    if (!nav || document.getElementById('navBrandLogo')) return;

    const brandLink = document.createElement('a');
    brandLink.id = 'navBrandLogo';
    brandLink.href = 'index.html';
    brandLink.innerHTML = '<i class="fa-solid fa-compass" style="color: var(--teal, #0d9488); margin-right: 6px;"></i> Платформа <strong>"SkillUp"</strong>';
    
    brandLink.style.cssText = `
        font-weight: 800;
        font-size: 1.05rem;
        margin-right: auto;
        padding-left: 5px;
        display: flex;
        align-items: center;
        text-decoration: none;
        color: var(--text-main, #1e293b);
    `;

    nav.insertBefore(brandLink, nav.firstChild);
}

/* --- Керування темами --- */
function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const icon = document.getElementById('themeIcon');
    if (icon) {
        icon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    }
}

/* --- Автоматичне підсвічування активного посилання в навігації --- */
function highlightActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            if (link.id !== 'navBrandLogo') {
                link.classList.remove('active');
            }
        }
    });
}

/* --- Кнопка «Нагору» (Scroll to Top) --- */
function createScrollTopButton() {
    if (document.getElementById('scrollTopBtn')) return;

    const btn = document.createElement('button');
    btn.id = 'scrollTopBtn';
    btn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
    btn.title = 'Нагору';
    
    btn.style.cssText = `
        position: fixed;
        bottom: 25px;
        right: 25px;
        width: 42px;
        height: 42px;
        background: var(--teal, #0d9488);
        color: #ffffff;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1rem;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s, visibility 0.3s, transform 0.2s;
        z-index: 998;
    `;

    btn.addEventListener('mouseover', () => btn.style.transform = 'scale(1.1)');
    btn.addEventListener('mouseout', () => btn.style.transform = 'scale(1)');
    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    document.body.appendChild(btn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            btn.style.opacity = '1';
            btn.style.visibility = 'visible';
        } else {
            btn.style.opacity = '0';
            btn.style.visibility = 'hidden';
        }
    });
}

/* --- Модуль глобального вікна «Відгук про платформу» --- */
function createFeedbackWidget() {
    if (document.getElementById('feedbackModalBtn')) return;

    const floatBtn = document.createElement('button');
    floatBtn.id = 'feedbackModalBtn';
    floatBtn.innerHTML = '<i class="fa-solid fa-comment-dots"></i> <span>Відгук</span>';
    floatBtn.title = 'Залишити відгук про платформу';
    
    floatBtn.style.cssText = `
        position: fixed;
        bottom: 80px;
        right: 25px;
        background: var(--teal, #0d9488);
        color: #ffffff;
        border: none;
        border-radius: 30px;
        padding: 10px 16px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 8px;
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-weight: 700;
        font-size: 0.9rem;
        box-shadow: 0 4px 15px rgba(13, 148, 136, 0.3);
        z-index: 998;
        transition: transform 0.2s, background 0.2s;
    `;

    floatBtn.addEventListener('mouseover', () => floatBtn.style.transform = 'scale(1.05)');
    floatBtn.addEventListener('mouseout', () => floatBtn.style.transform = 'scale(1)');

    const modalOverlay = document.createElement('div');
    modalOverlay.id = 'feedbackModalOverlay';
    modalOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(5px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s, visibility 0.3s;
        padding: 15px;
    `;

    modalOverlay.innerHTML = `
        <div id="feedbackModalContent" style="
            background: var(--card-bg, #ffffff);
            color: var(--text-main, #1e293b);
            border: 1.5px solid var(--card-border, #E2E8F0);
            border-radius: 20px;
            padding: 2rem;
            width: 100%;
            max-width: 450px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.2);
            position: relative;
            transform: translateY(20px);
            transition: transform 0.3s;
        ">
            <button id="closeFeedbackModal" style="
                position: absolute;
                top: 15px;
                right: 15px;
                background: none;
                border: none;
                font-size: 1.2rem;
                cursor: pointer;
                color: var(--text-muted, #64748b);
            "><i class="fa-solid fa-xmark"></i></button>

            <h3 style="color: var(--teal, #0d9488); font-size: 1.4rem; font-weight: 800; margin-bottom: 0.5rem; text-align: center;">Залишити відгук</h3>
            <p style="color: var(--text-muted, #64748b); font-size: 0.9rem; text-align: center; margin-bottom: 1.5rem;">Допоможіть нам зробити SkillUp ще кращим!</p>

            <form id="globalFeedbackForm" style="display: flex; flex-direction: column; gap: 1rem;">
                <div>
                    <label style="font-weight: 700; font-size: 0.85rem; display: block; margin-bottom: 4px;">Ваше ім'я:</label>
                    <input type="text" id="globalUserName" placeholder="Введіть ім'я..." required style="width: 100%; padding: 10px; border: 1.5px solid var(--card-border); border-radius: 10px; background: var(--card-bg); color: var(--text-main);">
                </div>
                <div>
                    <label style="font-weight: 700; font-size: 0.85rem; display: block; margin-bottom: 4px;">Оцініть платформу:</label>
                    <select id="globalUserRating" required style="width: 100%; padding: 10px; border: 1.5px solid var(--card-border); border-radius: 10px; background: var(--card-bg); color: var(--text-main);">
                        <option value="" disabled selected>Оберіть оцінку...</option>
                        <option value="5">⭐⭐⭐⭐⭐ 5/5 — Чудово</option>
                        <option value="4">⭐⭐⭐⭐ 4/5 — Добре</option>
                        <option value="3">⭐⭐⭐ 3/5 — Задовільно</option>
                        <option value="2">⭐⭐ 2/5 — Потребує доопрацювання</option>
                        <option value="1">⭐ 1/5 — Погано</option>
                    </select>
                </div>
                <div>
                    <label style="font-weight: 700; font-size: 0.85rem; display: block; margin-bottom: 4px;">Ваш відгук чи пропозиція:</label>
                    <textarea id="globalUserFeedback" placeholder="Напишіть ваші враження..." required style="width: 100%; padding: 10px; border: 1.5px solid var(--card-border); border-radius: 10px; background: var(--card-bg); color: var(--text-main); min-height: 80px;"></textarea>
                </div>
                <button type="submit" id="globalSubmitBtn" style="
                    background: linear-gradient(135deg, var(--teal, #0d9488), #0f766e);
                    color: #fff;
                    padding: 12px;
                    border: none;
                    border-radius: 10px;
                    font-weight: 700;
                    cursor: pointer;
                    margin-top: 5px;
                ">Надіслати відгук</button>
            </form>
        </div>
    `;

    document.body.appendChild(floatBtn);
    document.body.appendChild(modalOverlay);

    const modalContent = document.getElementById('feedbackModalContent');

    floatBtn.addEventListener('click', () => {
        modalOverlay.style.opacity = '1';
        modalOverlay.style.visibility = 'visible';
        modalContent.style.transform = 'translateY(0)';
    });

    const closeModal = () => {
        modalOverlay.style.opacity = '0';
        modalOverlay.style.visibility = 'hidden';
        modalContent.style.transform = 'translateY(20px)';
    };

    document.getElementById('closeFeedbackModal').addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });

    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwYsST0NBYYUoenroV1rPzW-AoIs9nvP4hZvL1sn1yw0E-HZvC7Vw5KWvnJpUWxIeYMOw/exec";

    document.getElementById('globalFeedbackForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const data = {
            name: document.getElementById('globalUserName').value,
            rating: document.getElementById('globalUserRating').value + "/5",
            feedback: document.getElementById('globalUserFeedback').value
        };

        closeModal();
        showToast('Дякуємо! Ваш відгук успішно надіслано.', 'success');
        this.reset();

        fetch(SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify(data)
        }).catch(err => console.log('Feedback error:', err));
    });
}

/* --- Toast-сповіщення --- */
function showToast(message, type = 'success') {
    let container = document.getElementById('toastContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toastContainer';
        container.style.cssText = `
            position: fixed;
            top: 25px;
            right: 25px;
            z-index: 99999;
            display: flex;
            flex-direction: column;
            gap: 10px;
        `;
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    const bgColors = type === 'success' ? '#0d9488' : '#e11d48';
    
    toast.style.cssText = `
        background: ${bgColors};
        color: #ffffff;
        padding: 14px 20px;
        border-radius: 10px;
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: 0.95rem;
        font-weight: 600;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        opacity: 0;
        transform: translateY(-20px);
        transition: opacity 0.3s, transform 0.3s;
    `;
    toast.innerText = message;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0)';
    }, 10);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-20px)';
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}
