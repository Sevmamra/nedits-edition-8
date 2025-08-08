/**
 * forms.js
 * Handles the contact form and newsletter subscription functionality.
 */

// Add spinner animation styles (common for forms)
const formStyle = document.createElement('style');
formStyle.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    .spinner {
        animation: spin 1s linear infinite;
        width: 20px;
        height: 20px;
        margin-right: 10px;
    }
    .spinner circle {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: 0;
        stroke-linecap: round;
    }
`;
document.head.appendChild(formStyle);

// Contact Form Function
function handleContactForm() {
    const form = document.getElementById('neditsContactForm');
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = `
            <svg class="spinner" viewBox="0 0 50 50">
                <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" stroke-width="5"></circle>
            </svg>
            Sending...
        `;
        
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            submitBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                Message Sent!
            `;
            
            form.reset();
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
            }, 3000);
        } catch (error) {
            submitBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                Error! Try Again
            `;
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
            }, 3000);
        }
    });
}

// Newsletter Form
function handleNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (!newsletterForm) return;

    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        const submitBtn = this.querySelector('button');
        
        const originalHTML = submitBtn.innerHTML;
        submitBtn.innerHTML = `
            <svg class="spinner" viewBox="0 0 50 50">
                <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" stroke-width="5"></circle>
            </svg>
        `;
        
        setTimeout(() => {
            submitBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
            `;
            emailInput.value = '';
            
            const successMsg = document.createElement('p');
            successMsg.className = 'newsletter-success';
            successMsg.textContent = 'Thanks for subscribing!';
            successMsg.style.color = '#7b0091';
            successMsg.style.marginTop = '10px';
            successMsg.style.fontSize = '0.9rem';
            newsletterForm.appendChild(successMsg);
            
            setTimeout(() => {
                submitBtn.innerHTML = originalHTML;
                successMsg.remove();
            }, 3000);
        }, 1500);
    });
}
