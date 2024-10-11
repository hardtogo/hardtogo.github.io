document.addEventListener('DOMContentLoaded', () => {
    const svgImage = document.getElementById('logoImage');
    const hiddenTextContainer = document.getElementById('hiddenTextContainer');

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

    // Trigger blur effect on logo click
    svgImage.addEventListener('click', () => {
        console.log("Logo clicked!"); // Debug log to verify click event
        // Start the blur and fade-out animation for the logo
        svgImage.style.transition = 'filter 1s ease, opacity 1s ease';
        svgImage.style.filter = 'blur(10px)';
        svgImage.style.opacity = '0';

        // After the logo fades out, display the text with fade-in and zoom-in
        setTimeout(() => {
            svgImage.style.display = 'none';

            // Make the hidden text container visible
            hiddenTextContainer.style.display = 'block';
            hiddenTextContainer.style.transform = 'translate(-50%, -50%) scale(0.9)';
            hiddenTextContainer.style.opacity = '0';

            // Use a slight delay to ensure the display change has been applied
            setTimeout(() => {
                hiddenTextContainer.style.transition = 'opacity 2.5s ease, transform 2.5s ease';
                hiddenTextContainer.style.opacity = '1';
                hiddenTextContainer.style.transform = 'translate(-50%, -50%) scale(1)';
            }, 50); // Allow 50ms for the display change to take effect before starting transition
        }, 1000); // Wait for the blur animation to complete (1 second)
    });

    // Trigger reverse effect on text click
    hiddenTextContainer.addEventListener('click', () => {
        console.log("Text clicked!"); // Debug log to verify click event
        // Start the fade-out and shrink animation for the text
        hiddenTextContainer.style.transition = 'opacity 1.5s ease, transform 1.5s ease';
        hiddenTextContainer.style.opacity = '0';
        hiddenTextContainer.style.transform = 'translate(-50%, -50%) scale(0.9)';

        // After the text fades out, display the logo again
        setTimeout(() => {
            hiddenTextContainer.style.display = 'none';

            // Make the logo visible again
            svgImage.style.display = 'block';
            svgImage.style.filter = 'blur(0px)';
            svgImage.style.opacity = '0';

            // Use a slight delay to ensure the display change has been applied
            setTimeout(() => {
                svgImage.style.transition = 'filter 1s ease, opacity 1s ease';
                svgImage.style.opacity = '1';
            }, 50); // Allow 50ms for the display change to take effect before starting transition
        }, 1500); // Wait for the text animation to complete (1.5 seconds)
    });

    // Firework animation logic
    function triggerFireworks() {
        const fireworkContainer = document.getElementById('fireworkContainer');
        fireworkContainer.style.display = 'block';

        for (let i = 0; i < 100; i++) {
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
