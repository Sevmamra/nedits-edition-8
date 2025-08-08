/**
 * hero-background.js
 * Manages the background slideshow for the hero section.
 */

function initHeroBackground() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const heroImages = [
        'images/hero-bg1.jpg',
        'images/hero-bg2.jpg',
        'images/hero-bg3.jpg',
        'images/hero-bg4.jpg',
        'images/hero-bg5.jpg',
        'images/hero-bg6.jpg'
    ];
    let availableImages = [...heroImages];

    function changeBackground() {
        if (availableImages.length === 0) availableImages = [...heroImages];
        const randomIndex = Math.floor(Math.random() * availableImages.length);
        const selectedImage = availableImages.splice(randomIndex, 1)[0];
        hero.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('${selectedImage}')`;
    }

    changeBackground();
    setInterval(changeBackground, 3000);
}
