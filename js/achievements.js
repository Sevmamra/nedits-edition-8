/**
 * achievements.js
 * Handles the animated counters for the achievements section.
 */

// Generic Counter Animation Function
function animateCounter(element, target) {
    if (!element) return;
    
    const duration = 2000;
    let start = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    requestAnimationFrame(updateCounter);
}

// Achievements counters ko animate karna
function initAchievementsCounters() {
    const achievementsSection = document.getElementById('achievements');
    if (achievementsSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                const clientsCounter = document.getElementById('clientsCounter');
                const projectsCounter = document.getElementById('projectsCounter');
                const experienceCounter = document.getElementById('experienceCounter');
                
                animateCounter(clientsCounter, 100);
                animateCounter(projectsCounter, 250);
                animateCounter(experienceCounter, 5);
                
                observer.disconnect();
            }
        }, { threshold: 0.5 });
        observer.observe(achievementsSection);
    }
}
