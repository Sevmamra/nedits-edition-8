/**
 * Main JavaScript File
 * Initializes all website functionality.
 * (Now imports and runs functions from other files)
 */

// Initialize AOS animation library
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
});

// Main Website Initialization Function
function initWebsiteFunctionality() {
    // 1. Hero Background Slideshow
    initHeroBackground();

    // 2. Smooth Scrolling
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', e => {
            if (link.hash && document.querySelector(link.hash)) {
                e.preventDefault();
                document.querySelector(link.hash).scrollIntoView({ 
                    behavior: 'smooth' 
                });
            }
        });
    });

    // 3. Section Headings Animation
    const sectionHeadings = document.querySelectorAll('.section h2');
    if (sectionHeadings.length > 0) {
        const headingObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('aos-animate');
                    headingObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        sectionHeadings.forEach(h2 => headingObserver.observe(h2));
    }

    // 4. Timeline Animations
    const timelineItems = document.querySelectorAll('.timeline-item');
    if (timelineItems.length > 0) {
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    timelineObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        timelineItems.forEach(item => timelineObserver.observe(item));
    }

    // 5. Initialize other components
    initAboutSection();
    initAchievementsCounters();
    initTestimonialsCarousel();
    handleContactForm();
    handleNewsletterForm();

    // 6. Footer Functionality
    document.getElementById('current-year').textContent = new Date().getFullYear();
    const footerLinks = document.querySelectorAll('.footer-links a, .footer-services a');
    footerLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateX(5px)';
        });
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateX(0)';
        });
    });
}

// Start the preloader when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    document.body.style.overflow = 'hidden';
    initPreloader(initWebsiteFunctionality);
});
