document.addEventListener('DOMContentLoaded', (event) => {
    const svgImage = document.querySelector('.centered-svg');
    
    // Disable right-click context menu on the image
    svgImage.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });

    // Prevent dragging the image
    svgImage.addEventListener('dragstart', (e) => {
        e.preventDefault();
    });

    // Easter egg: Trigger fireworks animation on typing "/dream"
    let inputSequence = [];
    const easterEggSequence = '/dream';
    document.addEventListener('keydown', (e) => {
        inputSequence.push(e.key);
        if (inputSequence.join('').includes(easterEggSequence)) {
            triggerFireworks();
            inputSequence = [];
        }
    });

    function triggerFireworks() {
        const fireworkContainer = document.getElementById('fireworkContainer');
        fireworkContainer.style.display = 'block';

        for (let i = 0; i < 100; i++) { // Increase the number of fireworks
            const firework = document.createElement('div');
            firework.classList.add('firework');
            firework.style.left = `${Math.random() * 100}%`;
            firework.style.top = `${Math.random() * 100}%`;
            firework.style.setProperty('--x', `${(Math.random() - 0.5) * 200}px`);
            firework.style.setProperty('--y', `${(Math.random() - 0.5) * 200}px`);
            fireworkContainer.appendChild(firework);

            // Remove the firework after the animation ends
            firework.addEventListener('animationend', () => {
                firework.remove();
                if (fireworkContainer.children.length === 0) {
                    fireworkContainer.style.display = 'none';
                }
            });
        }
    }
});
