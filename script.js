// Health Care Landing Page JavaScript

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Health Care Landing Page loaded successfully');
    
    // Initialize all functionality
    initializeAnimations();
    initializeFormTracking();
    initializeScrollEffects();
    initializeAccessibility();
    initializePipedriveForm();
    
    // Track page view
    trackPageView();
});

// Initialize Pipedrive form
function initializePipedriveForm() {
    const formContainer = document.querySelector('.pipedrive-form-container');
    
    if (!formContainer) return;
    
    // Remove loading state immediately since we can see the form is working
    formContainer.classList.add('loaded');
    
    // Monitor for Pipedrive form load with multiple selectors
    const checkPipedriveForm = setInterval(() => {
        const pipedriveForm = document.querySelector('.pipedriveWebForms') || 
                             document.querySelector('.pipedrive-form-container .pipedriveWebForms') ||
                             document.querySelector('form') ||
                             document.querySelector('input[type="text"]');
        
        if (pipedriveForm) {
            clearInterval(checkPipedriveForm);
            console.log('Pipedrive form detected successfully');
            
            // Try to setup tracking if we find actual form elements
            const actualForm = document.querySelector('form');
            if (actualForm) {
                setupFormTracking(actualForm);
            }
        }
    }, 500);
    
    // Stop checking after 5 seconds to avoid infinite loop
    setTimeout(() => {
        clearInterval(checkPipedriveForm);
        console.log('Stopped checking for Pipedrive form');
    }, 5000);
}



// Initialize animations and transitions
function initializeAnimations() {
    // Add fade-in animation to elements as they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.bg-white, .benefit-card, .form-container');
    animateElements.forEach(el => observer.observe(el));
}

// Initialize form tracking and submission handling
function initializeFormTracking() {
    // Wait for Pipedrive form to load
    const checkPipedriveForm = setInterval(() => {
        const pipedriveForm = document.querySelector('.pipedriveWebForms form');
        if (pipedriveForm) {
            clearInterval(checkPipedriveForm);
            setupFormTracking(pipedriveForm);
        }
    }, 1000);
}

// Setup form tracking for Pipedrive
function setupFormTracking(formContainer) {
    // Track form interactions
    const formInputs = formContainer.querySelectorAll('input, select, textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            trackEvent('form_field_focus', {
                field_name: input.name || input.type,
                field_type: input.type
            });
        });
        
        input.addEventListener('blur', () => {
            trackEvent('form_field_blur', {
                field_name: input.name || input.type,
                field_type: input.type,
                has_value: input.value.length > 0
            });
        });
        
        input.addEventListener('input', debounce(() => {
            trackEvent('form_field_input', {
                field_name: input.name || input.type,
                field_type: input.type,
                has_value: input.value.length > 0
            });
        }, 500));
    });
    
    // Track form submission
    const submitButton = formContainer.querySelector('button[type="submit"], input[type="submit"]');
    if (submitButton) {
        submitButton.addEventListener('click', () => {
            trackEvent('form_submit_click', {
                form_type: 'pipedrive_webform'
            });
        });
    }
    
    // Listen for form submission success
    window.addEventListener('message', function(event) {
        if (event.data && event.data.type === 'pipedrive-form-submitted') {
            handleFormSuccess();
        }
    });
    
    // Alternative: Listen for form submission via DOM changes
    const formObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                const successMessage = formContainer.querySelector('.success-message, .pd-success');
                if (successMessage) {
                    handleFormSuccess();
                }
            }
        });
    });
    
    formObserver.observe(formContainer, {
        childList: true,
        subtree: true
    });
    
    // Listen for form errors
    const errorObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                const errorMessage = formContainer.querySelector('.error-message, .pd-error');
                if (errorMessage) {
                    handleFormError(errorMessage.textContent);
                }
            }
        });
    });
    
    errorObserver.observe(formContainer, {
        childList: true,
        subtree: true
    });
}

// Handle successful form submission
function handleFormSuccess() {
    console.log('Form submitted successfully');
    
    // Track successful submission
    trackEvent('form_submit_success', {
        form_type: 'pipedrive_webform'
    });
    
    // Show success modal
    showSuccessModal();
    
    // Scroll to top
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Handle form errors
function handleFormError(errorMessage) {
    console.error('Form submission error:', errorMessage);
    
    trackEvent('form_submit_error', {
        form_type: 'pipedrive_webform',
        error_message: errorMessage
    });
    
    // Show error notification
    showErrorNotification(errorMessage);
}

// Show error notification
function showErrorNotification(message) {
    // Create error notification element
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-4 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300';
    notification.innerHTML = `
        <div class="flex items-center space-x-3">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
            </svg>
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" class="ml-4 hover:text-red-200">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Show success modal
function showSuccessModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex', 'modal-enter');
        
        // Add backdrop click to close
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeSuccessModal();
            }
        });
        
        // Add escape key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeSuccessModal();
            }
        });
    }
}

// Close success modal
function closeSuccessModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex', 'modal-enter');
    }
}

// Initialize scroll effects
function initializeScrollEffects() {
    // Add scroll-based animations
    let ticking = false;
    
    function updateScrollEffects() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-pattern');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// Initialize accessibility features
function initializeAccessibility() {
    // Add skip link functionality
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Saltar al contenido principal';
    skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded z-50';
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content landmark
    const mainContent = document.querySelector('main') || document.querySelector('.hero-section');
    if (mainContent && !mainContent.id) {
        mainContent.id = 'main-content';
    }
    
    // Setup smooth scroll to form functionality
    const ctaButton = document.querySelector('a[href="#pipedrive-form"]');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            const formSection = document.getElementById('pipedrive-form');
            if (formSection) {
                // Smooth scroll to form
                formSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
                
                // Highlight form briefly
                setTimeout(() => {
                    formSection.style.transform = 'scale(1.02)';
                    formSection.style.transition = 'transform 0.3s ease-in-out';
                    
                    setTimeout(() => {
                        formSection.style.transform = 'scale(1)';
                    }, 300);
                }, 500);
                
                // Track the click event
                trackEvent('cta_button_click', {
                    button_text: 'Solicitar Cotización',
                    target: 'pipedrive-form'
                });
            }
        });
    }
    
    // Improve keyboard navigation
    const focusableElements = document.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
    focusableElements.forEach(element => {
        element.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                element.click();
            }
        });
    });
}

// Analytics tracking functions
function trackEvent(eventName, parameters = {}) {
    // Google Analytics tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, parameters);
    }
    
    // Console logging for development
    console.log(`Event tracked: ${eventName}`, parameters);
}

function trackPageView() {
    trackEvent('page_view', {
        page_title: document.title,
        page_location: window.location.href
    });
}

// Performance monitoring
function initializePerformanceMonitoring() {
    // Monitor Core Web Vitals
    if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
                if (entry.entryType === 'largest-contentful-paint') {
                    trackEvent('lcp', { value: entry.startTime });
                }
                if (entry.entryType === 'first-input') {
                    trackEvent('fid', { value: entry.processingStart - entry.startTime });
                }
            });
        });
        
        observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input'] });
    }
    
    // Monitor form load time
    const formLoadStart = performance.now();
    const checkFormLoad = setInterval(() => {
        const form = document.querySelector('.pipedriveWebForms form');
        if (form && form.children.length > 1) {
            const formLoadTime = performance.now() - formLoadStart;
            trackEvent('form_load_time', { value: formLoadTime });
            clearInterval(checkFormLoad);
        }
    }, 100);
}

// Error handling
function initializeErrorHandling() {
    window.addEventListener('error', (event) => {
        console.error('JavaScript error:', event.error);
        trackEvent('javascript_error', {
            message: event.error?.message || 'Unknown error',
            filename: event.filename,
            lineno: event.lineno
        });
    });
    
    window.addEventListener('unhandledrejection', (event) => {
        console.error('Unhandled promise rejection:', event.reason);
        trackEvent('unhandled_promise_rejection', {
            reason: event.reason?.toString() || 'Unknown reason'
        });
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Initialize performance monitoring and error handling
initializePerformanceMonitoring();
initializeErrorHandling();

// Export functions for global access
window.closeSuccessModal = closeSuccessModal;
window.trackEvent = trackEvent; 