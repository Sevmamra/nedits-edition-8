/**
 * about.js
 * Initializes the About section with content and animations.
 */

// Typewriter Effect with Completion Callback
function initTypewriter(elementId, text, onComplete) {
    const element = document.getElementById(elementId);
    if (!element) return;

    element.textContent = '';
    
    let i = 0;
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i++);
            const delay = text.charAt(i-1) === ' ' ? 25 : Math.random() * 30 + 30;
            setTimeout(type, delay);
        } else if (onComplete) {
            onComplete();
        }
    }
    
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            type();
            observer.disconnect();
        }
    }, { threshold: 0.5 });

    observer.observe(element);
}

// About Section Functionality
function initAboutSection() {
    fetch('data/about.json')
        .then(response => response.json())
        .then(data => {
            const philosophyTextElement = document.getElementById('philosophy-text');
            if (philosophyTextElement) {
                philosophyTextElement.textContent = data.about.philosophy;
            }
            
            const approachTextElement = document.getElementById('approach-text');
            if (approachTextElement) {
                approachTextElement.textContent = data.about.approach;
            }
            
            const valuesList = document.getElementById('values-list');
            if (valuesList && data.about.values) {
                valuesList.innerHTML = '';
                data.about.values.forEach(value => {
                    const li = document.createElement('li');
                    li.textContent = value;
                    valuesList.appendChild(li);
                });
            }
            
            const aboutTextElement = document.getElementById('about-text');
            if (aboutTextElement && data.about.intro) {
                initTypewriter('about-text', data.about.intro, () => {
                    const readMoreContainer = document.querySelector('.read-more-container');
                    if (readMoreContainer) {
                        readMoreContainer.classList.add('visible');
                    }
                });
            }
        })
        .catch(error => console.error('Error loading about data:', error));

    const readMoreBtn = document.querySelector('.read-more-btn');
    if (readMoreBtn) {
        readMoreBtn.addEventListener('click', function() {
            const content = document.querySelector('.about-content');
            if (!content) return;
            
            const isExpanding = !content.classList.contains('about-expanded');
            
            this.querySelector('span').textContent = isExpanding ? 'Read Less' : 'Read More';
            
            content.classList.toggle('about-expanded');
            
            if (isExpanding) {
                setTimeout(() => {
                    content.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'nearest'
                    });
                }, 300);
            }
        });
    }
}
