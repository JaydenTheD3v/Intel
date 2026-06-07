/* =========================================
   GSAP PLUGIN REGISTRATION
========================================= */

gsap.registerPlugin(ScrollTrigger);

/* =========================================
   LANGUAGE TOGGLE FUNCTIONALITY
========================================= */

/**
 * Initialize language toggle button
 * Switches between LTR and RTL layouts dynamically
 */
const langToggle = document.getElementById('lang-toggle');
const htmlRoot = document.getElementById('html-root');

// Check for saved language preference
const savedDir = localStorage.getItem('pageDirection') || 'ltr';
htmlRoot.setAttribute('dir', savedDir);
updateLangToggleUI(savedDir);

langToggle.addEventListener('click', () => {
    const currentDir = htmlRoot.getAttribute('dir');
    const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
    
    // Update direction attribute
    htmlRoot.setAttribute('dir', newDir);
    htmlRoot.lang = newDir === 'rtl' ? 'ar' : 'en';
    
    // Save preference
    localStorage.setItem('pageDirection', newDir);
    
    // Update UI
    updateLangToggleUI(newDir);
    
    // Announce change to screen readers
    const message = newDir === 'rtl' ? 'Page switched to Arabic view' : 'Page switched to English view';
    announceToScreenReader(message);
});

/**
 * Update language toggle button UI based on current direction
 * @param {string} dir - Current text direction (ltr or rtl)
 */
function updateLangToggleUI(dir) {
    const isRTL = dir === 'rtl';
    langToggle.setAttribute('aria-pressed', isRTL);
    langToggle.setAttribute('aria-label', isRTL ? 'Switch to English' : 'Switch to Arabic');
}

/**
 * Announce messages to screen readers
 * @param {string} message - Message to announce
 */
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    announcement.textContent = message;
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        announcement.remove();
    }, 1000);
}

/* =========================================
   TEXT REVEALS
========================================= */

/**
 * Animate text reveals on scroll
 * Fade in and slide up text elements as they enter viewport
 */
gsap.utils.toArray(".reveal-text")
    .forEach((element) => {
        gsap.from(element, {
            opacity: 0,
            y: 60,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: element,
                start: "top 90%",
                toggleActions: "play none none reverse"
            }
        });
    });

/* =========================================
   PARALLAX EFFECTS
========================================= */

/**
 * Add parallax effect to hero cube
 * Creates depth effect as user scrolls
 */
gsap.utils.toArray(".parallax-slow").forEach((element) => {
    gsap.to(element, {
        y: -120,
        ease: "none",
        scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });
});

/* =========================================
   STORY PANEL ANIMATION
========================================= */

const storyPanels = gsap.utils.toArray('.story-panel');

storyPanels.forEach((panel) => {
    const bg = panel.querySelector('.panel-bg');
    const glow = panel.querySelector('.panel-glow');
    const year = panel.querySelector('.panel-year');
    const title = panel.querySelector('.panel-title');
    const description = panel.querySelector('.panel-description');
    const artifact = panel.querySelector('.panel-artifact');

    gsap.set([year, title, description,artifact], { opacity: 0, y: 40 });
    gsap.set(bg, { scale: 1.08 });
    gsap.set(glow, { opacity: 0.8, y: 20 });

    const panelTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: panel,
            start: 'top top',
            end: '+=120%',
            scrub: true,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true
        }
    });

    panelTimeline
        .to(bg, { scale: 1.16, ease: 'none' }, 0)
        .to(glow, { y: -15, opacity: 1, ease: 'power1.out' }, 0)
        .to(artifact, {opacity: 0.7, y: 0, duration: .5, ease: "power3.out"}, 0.2)
        .to(year, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, 0.1)
        .to(title, { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out' }, 0.25)
        .to(description, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.4);

    gsap.to(panel.querySelector('.panel-content'), {
        y: 40,
        ease: 'none',
        scrollTrigger: {
            trigger: panel,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        }
    });
});

const transitionSweep = document.querySelector('.transition-sweep');
if (transitionSweep) {
    gsap.fromTo(transitionSweep, { opacity: 0, y: 80 }, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: transitionSweep,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
        }
    });
}

/* =========================================
   FEATURE CARDS ANIMATION
========================================= */

/**
 * Animate feature cards on scroll
 * Fade in and scale up as they enter viewport
 */
gsap.utils.toArray(".feature-card")
    .forEach((card, index) => {
        gsap.from(card, {
            opacity: 0,
            y: 40,
            duration: 0.8,
            delay: index * 0.1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: card,
                start: "top 85%"
            }
        });
    });

/* =========================================
   NEWSLETTER FORM VALIDATION
========================================= */

/**
 * Initialize and handle newsletter form
 * Validates inputs and provides user feedback
 */
const newsletterForm = document.getElementById('newsletter-form');
const signupStatus = document.getElementById('signup-status');

function animateSignupSuccess(message) {
    if (!signupStatus) return;
    signupStatus.textContent = message;
    gsap.fromTo(signupStatus, { opacity: 0, y: -10 }, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out'
    });
}

if (newsletterForm) {
    const nameInput = document.getElementById('subscriber-name');
    const emailInput = document.getElementById('subscriber-email');
    
    // Real-time validation
    nameInput.addEventListener('blur', () => validateField(nameInput));
    emailInput.addEventListener('blur', () => validateField(emailInput));
    
    // Form submission
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            handleFormSubmit();
        }
    });
    
    /**
     * Validate individual form field
     * @param {HTMLElement} field - Form field to validate
     * @returns {boolean} - True if valid
     */
    function validateField(field) {
        const isValid = field.type === 'email' 
            ? isValidEmail(field.value) 
            : field.value.trim().length >= 2;
        
        if (!isValid) {
            field.classList.add('is-invalid');
            field.setAttribute('aria-invalid', 'true');
        } else {
            field.classList.remove('is-invalid');
            field.setAttribute('aria-invalid', 'false');
        }
        
        return isValid;
    }
    
    /**
     * Validate entire form
     * @returns {boolean} - True if form is valid
     */
    function validateForm() {
        return validateField(nameInput) && validateField(emailInput);
    }
    
    /**
     * Check if email is valid
     * @param {string} email - Email to validate
     * @returns {boolean} - True if valid email
     */
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    /**
     * Handle successful form submission
     */
    function handleFormSubmit() {
        const name = nameInput.value;
        
        // Log submission (in real app, would send to server)
        console.log('Newsletter subscription:', {
            name: name,
            email: emailInput.value,
            timestamp: new Date().toISOString()
        });
        
        // Show success message
        const successMessage = `Thank you for subscribing, ${name}! Check your email for confirmation.`;
        announceToScreenReader(successMessage);
        animateSignupSuccess(successMessage);
        
        // Visual feedback
        const submitBtn = newsletterForm.querySelector('.btn-subscribe');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = '✓ Subscribed!';
        submitBtn.disabled = true;
        gsap.fromTo(newsletterForm, { scale: 1 }, { scale: 0.99, duration: 0.18, yoyo: true, repeat: 1, ease: 'power1.inOut' });
        
        // Reset form after delay
        setTimeout(() => {
            newsletterForm.reset();
            nameInput.classList.remove('is-invalid');
            emailInput.classList.remove('is-invalid');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            if (signupStatus) {
                gsap.to(signupStatus, { opacity: 0, y: -10, duration: 0.25, delay: 1.8, ease: 'power1.in' });
            }
        }, 3000);
    }
}

/* =========================================
   AMBIENT ANIMATIONS
========================================= */

/**
 * Animate background glows
 * Creates subtle floating glow effects
 */
gsap.to('.glow-1', {
    duration: 8,
    x: 50,
    y: -50,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
});

gsap.to('.glow-2', {
    duration: 10,
    x: -50,
    y: 50,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    delay: 1
});

/* =========================================
   ACCESSIBILITY ENHANCEMENTS
========================================= */

/**
 * Enhanced keyboard navigation
 * Ensure all interactive elements are keyboard accessible
 */
document.addEventListener('keydown', (e) => {
    // Allow Tab to navigate through all focusable elements
    if (e.key === 'Tab') {
        const focusableElements = document.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey && document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
        }
    }
    
    // Allow Escape to close any active modals or focus
    if (e.key === 'Escape') {
        document.activeElement.blur();
    }
});

/**
 * Add focus visible styles for keyboard navigation
 */
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

/* =========================================
   PERFORMANCE OPTIMIZATION
========================================= */

/**
 * Optimize ScrollTrigger performance
 * Refresh on window resize
 */
window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
});

/**
 * Lazy load images for better performance
 */
document.querySelectorAll('img').forEach(img => {
    if ('loading' in HTMLImageElement.prototype) {
        img.loading = 'lazy';
    }
});

/* =========================================
   SUSTAINABILITY STATISTICS & NEWSLETTER ANIMATIONS
========================================= */

// animate stat counters when they enter view
gsap.utils.toArray('.stat-number').forEach((el) => {
    const target = Number(el.dataset.target) || 0;
    const suffixEl = el.parentElement.querySelector('.stat-suffix');

    gsap.fromTo(el, {innerText: 0}, {
        innerText: target,
        duration: 1.6,
        ease: 'power1.out',
        snap: { innerText: 1 },
        scrollTrigger: {
            trigger: el.closest('.feature-card'),
            start: 'top 85%',
            toggleActions: 'play none none none'
        },
        onUpdate: function() {
            el.textContent = Math.round(this.targets()[0].innerText);
        }
    });
});

// subtle fade-in for feature-cards (ensure we add animate-in class in case)
gsap.utils.toArray('.feature-card').forEach((card, i) => {
    card.classList.add('animate-in');
    gsap.to(card, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        delay: i * 0.12,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: card,
            start: 'top 90%'
        }
    });
});

// Newsletter premium card entrance
const premium = document.getElementById('premium-signup');
if (premium) {
    gsap.from(premium, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: premium,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        }
    });

    const cta = document.getElementById('cta-submit');
    if (cta) {
        cta.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') e.target.click();
        });
        cta.addEventListener('mouseenter', () => gsap.to(cta, { scale: 1.03, duration: 0.18 }));
        cta.addEventListener('mouseleave', () => gsap.to(cta, { scale: 1, duration: 0.18 }));
    }

    if (signupStatus) {
        gsap.set(signupStatus, { opacity: 0, y: -10 });
    }
}


//Floating artifact animation for story panels
gsap.utils.toArray(".panel-artifact").forEach((artifact) => {

    gsap.to(artifact, {
        y: -25,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

});
//paralax effect for artifacts on scroll
gsap.utils.toArray(".panel-artifact").forEach((artifact) => {

    gsap.to(artifact, {
        y: -120,
        ease: "none",
        scrollTrigger: {
            trigger: artifact,
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });

});
//mouse tilt effect for artifacts
document.querySelectorAll(".panel-artifact img")
.forEach((img) => {

    window.addEventListener("mousemove", (e) => {

        const x =
            (e.clientX / window.innerWidth - 0.5) * 30;

        const y =
            (e.clientY / window.innerHeight - 0.5) * -30;

        gsap.to(img, {
            rotateY: x,
            rotateX: y,
            duration: 1.2,
            ease: "power3.out"
        });

    });

});