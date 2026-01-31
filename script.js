(function() {
    'use strict';

    function initSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    function initContactForm() {
        const form = document.querySelector('.contact-form');
        
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const formData = new FormData(form);
                const data = {
                    name: form.querySelector('input[type="text"]').value,
                    email: form.querySelector('input[type="email"]').value,
                    company: form.querySelectorAll('input[type="text"]')[1].value,
                    message: form.querySelector('textarea').value
                };
                
                if (!data.name || !data.email || !data.message) {
                    showNotification('Veuillez remplir tous les champs obligatoires.', 'error');
                    return;
                }
                
                if (!isValidEmail(data.email)) {
                    showNotification('Veuillez entrer une adresse email valide.', 'error');
                    return;
                }
                
                const submitButton = form.querySelector('button');
                const originalText = submitButton.textContent;
                
                submitButton.textContent = 'Envoi en cours...';
                submitButton.disabled = true;
                
                sendContactEmail(data).then(() => {
                    showNotification('Votre demande a été envoyée avec succès ! Nous vous contacterons bientôt.', 'success');
                    form.reset();
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                }).catch(() => {
                    showNotification('Erreur lors de l\'envoi. Veuillez réessayer ou nous contacter directement.', 'error');
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                });
            });
        }
    }

    function initEmailJS() {
        emailjs.init("BfdEwVG0vzTM9U-1A");
    }

    function sendContactEmail(data) {
        return new Promise((resolve, reject) => {
            const templateParams = {
                from_name: data.name,
                from_email: data.email,
                company: data.company || 'Non spécifiée',
                message: data.message,
                to_email: 'achking.555@gmail.com'
            };

            emailjs.send('service_hvybot9', 'template_5n5hc3l', templateParams)
                .then((response) => {
                    console.log('Email envoyé avec succès:', response);
                    resolve(response);
                })
                .catch((error) => {
                    console.error('Erreur lors de l\'envoi:', error);
                    const subject = `Nouvelle demande EnergyBot - ${data.name}`;
                    const body = `
Nouvelle demande de contact pour EnergyBot

Nom: ${data.name}
Email: ${data.email}
Entreprise: ${data.company || 'Non spécifiée'}

Message:
${data.message}

---
Envoyé depuis le site EnergyBot
                    `.trim();

                    const mailtoLink = `mailto:achking.555@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                    window.open(mailtoLink);
                    resolve();
                });
        });
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showNotification(message, type = 'info') {
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            max-width: 400px;
            font-weight: 500;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 5000);
    }

    function initHeaderScrollEffect() {
        const header = document.querySelector('.header');
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = 'none';
            }
            
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollY = currentScrollY;
        });
    }

    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        const elementsToAnimate = document.querySelectorAll('.feature-card, .pricing-card');
        elementsToAnimate.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    function initCodeCopy() {
        const codeDemo = document.querySelector('.code-demo');
        
        if (codeDemo) {
            const copyButton = document.createElement('button');
            copyButton.innerHTML = '📋 Copier';
            copyButton.style.cssText = `
                position: absolute;
                top: 8px;
                right: 16px;
                background: rgba(255, 255, 255, 0.1);
                color: white;
                border: 1px solid rgba(255, 255, 255, 0.2);
                padding: 0.5rem 1rem;
                border-radius: 4px;
                cursor: pointer;
                font-size: 0.875rem;
                transition: background 0.2s ease;
            `;
            
            copyButton.addEventListener('mouseenter', () => {
                copyButton.style.background = 'rgba(255, 255, 255, 0.2)';
            });
            
            copyButton.addEventListener('mouseleave', () => {
                copyButton.style.background = 'rgba(255, 255, 255, 0.1)';
            });
            
            copyButton.addEventListener('click', () => {
                const codeText = `<script src="https://enrgie-bot.netlify.app/chatbot-widget.js"></script>`;

                navigator.clipboard.writeText(codeText).then(() => {
                    copyButton.innerHTML = '✅ Copié !';
                    setTimeout(() => {
                        copyButton.innerHTML = '📋 Copier';
                    }, 2000);
                }).catch(() => {
                    showNotification('Impossible de copier le code. Veuillez le sélectionner manuellement.', 'error');
                });
            });
            
            codeDemo.appendChild(copyButton);
        }
    }

    function initMobileMenu() {
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const navLinks = document.getElementById('navLinks');
        const mobileOverlay = document.getElementById('mobileOverlay');

        if (!mobileMenuToggle) return;

        // Toggle menu on button click
        mobileMenuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMobileMenu();
        });

        // Close menu when overlay is clicked
        if (mobileOverlay) {
            mobileOverlay.addEventListener('click', () => {
                closeMobileMenu();
            });
        }

        // Close menu when a link is clicked
        if (navLinks) {
            const links = navLinks.querySelectorAll('a');
            links.forEach(link => {
                link.addEventListener('click', () => {
                    closeMobileMenu();
                });
            });
        }

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks && navLinks.classList.contains('active')) {
                closeMobileMenu();
            }
        });

        function toggleMobileMenu() {
            mobileMenuToggle.classList.toggle('active');
            if (navLinks) navLinks.classList.toggle('active');
            if (mobileOverlay) mobileOverlay.classList.toggle('active');
            document.body.style.overflow = (navLinks && navLinks.classList.contains('active')) ? 'hidden' : '';
        }

        function closeMobileMenu() {
            mobileMenuToggle.classList.remove('active');
            if (navLinks) navLinks.classList.remove('active');
            if (mobileOverlay) mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }

        // Close menu on window resize to desktop size
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && navLinks && navLinks.classList.contains('active')) {
                closeMobileMenu();
            }
        });
    }

    function init() {
        initEmailJS();
        initSmoothScrolling();
        initContactForm();
        initHeaderScrollEffect();
        initScrollAnimations();
        initCodeCopy();
        initMobileMenu();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
