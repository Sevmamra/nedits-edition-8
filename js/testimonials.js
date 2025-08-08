/**
 * testimonials.js
 * Manages the testimonials carousel functionality.
 */

function initTestimonialsCarousel() {
    const carousel = document.querySelector('.testimonials-carousel');
    const cards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const dotsContainer = document.querySelector('.carousel-dots');

    if (!carousel || cards.length === 0 || !prevBtn || !nextBtn || !dotsContainer) return;

    let autoScrollInterval;
    let isHovering = false;

    function getVisibleCardsCount() {
        if (window.innerWidth >= 1024) return 3;
        if (window.innerWidth >= 768) return 2;
        return 1;
    }

    function scrollToCard(index) {
        const cardWidth = cards[0].offsetWidth + 30;
        carousel.scrollTo({
            left: cardWidth * index,
            behavior: 'smooth'
        });
        updateActiveDot(index);
    }

    function getCurrentGroupIndex() {
        const cardWidth = cards[0].offsetWidth + 30;
        const visibleCards = getVisibleCardsCount();
        return Math.round(carousel.scrollLeft / (cardWidth * visibleCards));
    }

    function updateActiveDot(index) {
        document.querySelectorAll('.carousel-dot').forEach(dot => dot.classList.remove('active'));
        const dots = document.querySelectorAll('.carousel-dot');
        const groupIndex = Math.floor(index / getVisibleCardsCount());
        if (dots[groupIndex]) {
            dots[groupIndex].classList.add('active');
        }
    }

    function generateDots() {
        dotsContainer.innerHTML = '';
        const visibleCards = getVisibleCardsCount();
        const totalGroups = Math.ceil(cards.length / visibleCards);

        for (let i = 0; i < totalGroups; i++) {
            const dot = document.createElement('div');
            dot.classList.add('carousel-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => scrollToCard(i * visibleCards));
            dotsContainer.appendChild(dot);
        }
    }

    function startAutoScroll() {
        autoScrollInterval = setInterval(() => {
            if (isHovering) return;

            const visibleCards = getVisibleCardsCount();
            const currentIndex = getCurrentGroupIndex();
            const totalGroups = Math.ceil(cards.length / visibleCards);
            const nextIndex = (currentIndex + 1) % totalGroups;

            scrollToCard(nextIndex * visibleCards);
        }, 5000);
    }

    function resetAutoScroll() {
        clearInterval(autoScrollInterval);
        startAutoScroll();
    }

    prevBtn.addEventListener('click', () => {
        const visibleCards = getVisibleCardsCount();
        const index = getCurrentGroupIndex();
        scrollToCard(Math.max(0, index - 1) * visibleCards);
        resetAutoScroll();
    });

    nextBtn.addEventListener('click', () => {
        const visibleCards = getVisibleCardsCount();
        const index = getCurrentGroupIndex();
        const maxIndex = Math.ceil(cards.length / visibleCards) - 1;
        scrollToCard(Math.min(maxIndex, index + 1) * visibleCards);
        resetAutoScroll();
    });

    carousel.addEventListener('mouseenter', () => {
        isHovering = true;
        clearInterval(autoScrollInterval);
    });

    carousel.addEventListener('mouseleave', () => {
        isHovering = false;
        resetAutoScroll();
    });

    carousel.addEventListener('scroll', () => {
        updateActiveDot(getCurrentGroupIndex() * getVisibleCardsCount());
    });

    window.addEventListener('resize', () => {
        generateDots();
        resetAutoScroll();
    });

    generateDots();
    startAutoScroll();
}
