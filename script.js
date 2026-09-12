// Force the browser to start at the top on load/refresh
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

const stickerIds = ['pop-lebron', 'pop-curry', 'pop-kobe', 'pop-ball', 'pop-t1', 'pop-t2', 'pop-t3'];

// 3-Second Confetti Burst Function
function launchConfetti() {
    if (typeof confetti !== 'function') return;

    const duration = 3000; // 3 seconds
    const end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 0.7 }
        });
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 0.7 }
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    })();
}

function triggerPops() {
    // Reset position & sticker pop classes
    stickerIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.classList.remove('active');
            el.style.left = '';
            el.style.top = '';
        }
    });

    // Staggered pop-in animation
    stickerIds.forEach((id, index) => {
        setTimeout(() => {
            const el = document.getElementById(id);
            if (el) el.classList.add('active');
        }, index * 100);
    });

    // Fire 3-second confetti burst
    launchConfetti();
}

document.addEventListener('DOMContentLoaded', () => {
    // Scroll to top when DOM is ready
    window.scrollTo(0, 0);

    const btn = document.getElementById('launchBtn');
    if (btn) btn.addEventListener('click', triggerPops);

    const stickers = document.querySelectorAll('.sticker-pop');

    // Drag and Drop functionality
    stickers.forEach(sticker => {
        let isDragging = false;
        let offsetX = 0;
        let offsetY = 0;

        sticker.addEventListener('mousedown', (e) => {
            isDragging = true;
            sticker.style.animation = 'none';
            offsetX = e.clientX - sticker.getBoundingClientRect().left;
            offsetY = e.clientY - sticker.getBoundingClientRect().top;
            sticker.style.zIndex = 100;
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            sticker.style.left = `${e.clientX - offsetX}px`;
            sticker.style.top = `${e.clientY - offsetY}px`;
        });

        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                sticker.style.zIndex = 20;
            }
        });
    });

    // Parallax mouse hover tilt
    document.addEventListener('mousemove', (e) => {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.015;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.015;

        stickers.forEach((sticker, i) => {
            const factor = (i % 2 === 0 ? 1 : -1);
            sticker.style.transform = `translate(${moveX * factor}px, ${moveY * factor}px)`;
        });
    });

    // Fire initial entry animation + confetti
    setTimeout(triggerPops, 300);
});