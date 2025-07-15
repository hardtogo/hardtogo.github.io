(() => {
    /* ---------- Cached selectors ---------- */
    const $ = sel => document.querySelector(sel);
    const $$ = sel => [...document.querySelectorAll(sel)];

    const svgImage          = $('#logoImage');
    const hiddenText        = $('#hiddenTextContainer');
    const fireworkContainer = $('#fireworkContainer');

    /* ---------- Timing constants ---------- */
    const TIMING = {
        logoBlur : 1000,
        textFade : 2500,
        textOut  : 1500
    };

    /* ---------- Helpers ---------- */
    const wait = ms => new Promise(res => setTimeout(res, ms));
    const waitTransition = el => new Promise(res => el.addEventListener('transitionend', res, { once: true }));

    /* ---------- Easter-egg keyboard sequence ---------- */
    const EGG_SEQ = '/dream';
    let buffer = [];

    function onKeyDown(e) {
        // Ignore if typing inside an input/textarea
        if (/input|textarea/i.test(e.target.tagName)) return;

        buffer.push(e.key);
        if (buffer.join('').includes(EGG_SEQ)) {
            buffer = [];
            triggerFireworks();
        }
        // Keep buffer short
        if (buffer.length > EGG_SEQ.length) buffer.shift();
    }
    document.addEventListener('keydown', onKeyDown);

    /* ---------- Logo click → show text ---------- */
    svgImage.addEventListener('click', async () => {
        svgImage.style.transition = `filter ${TIMING.logoBlur}ms ease, opacity ${TIMING.logoBlur}ms ease`;
        svgImage.style.filter = 'blur(10px)';
        svgImage.style.opacity = '0';

        await wait(TIMING.logoBlur);
        svgImage.style.display = 'none';

        hiddenText.style.display = 'block';
        hiddenText.style.transition = 'none';
        hiddenText.style.transform = 'translate(-50%, -50%) scale(0.9)';
        hiddenText.style.opacity = '0';

        // Force reflow
        hiddenText.offsetHeight;

        hiddenText.style.transition = `opacity ${TIMING.textFade}ms ease, transform ${TIMING.textFade}ms ease`;
        hiddenText.style.opacity = '1';
        hiddenText.style.transform = 'translate(-50%, -50%) scale(1)';
    });

    /* ---------- Text click → return to logo ---------- */
    hiddenText.addEventListener('click', async () => {
        hiddenText.style.transition = `opacity ${TIMING.textOut}ms ease, transform ${TIMING.textOut}ms ease`;
        hiddenText.style.opacity = '0';
        hiddenText.style.transform = 'translate(-50%, -50%) scale(0.9)';

        await wait(TIMING.textOut);
        hiddenText.style.display = 'none';

        svgImage.style.display = 'block';
        svgImage.style.transition = 'none';
        svgImage.style.filter = 'blur(0px)';
        svgImage.style.opacity = '0';

        svgImage.offsetHeight; // reflow

        svgImage.style.transition = `filter ${TIMING.logoBlur}ms ease, opacity ${TIMING.logoBlur}ms ease`;
        svgImage.style.opacity = '1';
    });

    /* ---------- Fireworks ---------- */
    const POOL_SIZE = 20;
    const fireworkPool = Array.from({ length: POOL_SIZE }, () => {
        const f = document.createElement('div');
        f.className = 'firework';
        return f;
    });
    let poolIndex = 0;

    function triggerFireworks() {
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduceMotion) return;

        fireworkContainer.style.display = 'block';

        for (let i = 0; i < 100; i++) {
            const firework = fireworkPool[poolIndex++ % POOL_SIZE].cloneNode();
            firework.style.left = `${Math.random() * 100}%`;
            firework.style.top  = `${Math.random() * 100}%`;
            firework.style.setProperty('--x', `${(Math.random() - 0.5) * 200}px`);
            firework.style.setProperty('--y', `${(Math.random() - 0.5) * 200}px`);
            fireworkContainer.appendChild(firework);

            firework.addEventListener('animationend', () => {
                firework.remove();
                if (fireworkContainer.children.length === 0) {
                    fireworkContainer.style.display = 'none';
                }
            }, { once: true });
        }
    }

    /* ---------- Optional: ESC key to close text ---------- */
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && hiddenText.style.display !== 'none') {
            hiddenText.click(); // re-use logic
        }
    });

    /* ---------- Tidy-up on unload (embeddable safety) ---------- */
    window.addEventListener('beforeunload', () => {
        document.removeEventListener('keydown', onKeyDown);
    });
})();