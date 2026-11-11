/* ==========================================
   МОДУЛЬ ФОРМИ ВІДГУКУ (Додано до common.js)
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    createFeedbackWidget();
});

function createFeedbackWidget() {
    if (document.getElementById('feedbackModalBtn')) return;

    // 1. Створюємо плаваючу кнопку "Відгук"
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

    // 2. Створюємо модальне вікно (фон + форма)
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

    // Логіка відкриття/закриття модалки
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

    // Відправка форми у Google Таблиці
    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwYsST0NBYYUoenroV1rPzW-AoIs9nvP4hZvL1sn1yw0E-HZvC7Vw5KWvnJpUWxIeYMOw/exec";

    document.getElementById('globalFeedbackForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const btn = document.getElementById('globalSubmitBtn');
        const oldText = btn.innerHTML;
        
        btn.disabled = true;
        btn.innerHTML = 'Відправляється...';

        const data = {
            name: document.getElementById('globalUserName').value,
            rating: document.getElementById('globalUserRating').value + "/5",
            feedback: document.getElementById('globalUserFeedback').value
        };

        fetch(SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify(data)
        })
        .then(() => {
            showToast('Дякуємо! Ваш відгук успішно надіслано.', 'success');
            this.reset();
            closeModal();
        })
        .catch(() => {
            showToast('Помилка при відправці. Спробуйте ще раз.', 'error');
        })
        .finally(() => {
            btn.disabled = false;
            btn.innerHTML = oldText;
        });
    });
}
