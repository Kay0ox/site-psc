// Configurações globais
const CONFIG = {
    ANIMATION_DURATION: 300,
    SLIDER_AUTO_PLAY: 4500,
    PARALLAX_INTENSITY: 25,
    INTERSECTION_THRESHOLD: 0.12,
    FORM_SUBMIT_URL: 'https://formspree.io/f/YOUR_FORM_ID', // Substitua pelo seu ID do Formspree
    WHATSAPP_NUMBER: '5583999999999',
    EMAIL: 'contato@kettilyformiga.com.br'
};

// Utilitários
const Utils = {
    // Debounce para otimizar performance
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle para eventos de scroll
    throttle(func, limit) {
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
    },

    // Animação suave para números
    animateNumber(element, start, end, duration) {
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            element.textContent = Math.floor(current);
            
            if (current >= end) {
                element.textContent = end;
                clearInterval(timer);
            }
        }, 16);
    },

    // Validação de email
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    // Formatação de telefone
    formatPhone(phone) {
        const cleaned = phone.replace(/\D/g, '');
        const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/);
        if (match) {
            return `(${match[1]}) ${match[2]}-${match[3]}`;
        }
        return phone;
    }
};

// Gerenciador de Menu Mobile
class MobileMenu {
    constructor() {
        this.toggle = document.getElementById('menu-toggle');
        this.nav = document.getElementById('nav');
        this.isOpen = false;
        
        this.init();
    }

    init() {
        if (!this.toggle || !this.nav) return;

        this.toggle.addEventListener('click', () => this.toggleMenu());
        
        // Fechar menu ao clicar em links
        this.nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });

        // Fechar menu ao clicar fora
        document.addEventListener('click', (e) => {
            if (this.isOpen && !this.nav.contains(e.target) && !this.toggle.contains(e.target)) {
                this.closeMenu();
            }
        });

        // Fechar menu com ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeMenu();
            }
        });
    }

    toggleMenu() {
        this.isOpen ? this.closeMenu() : this.openMenu();
    }

    openMenu() {
        this.nav.classList.add('open');
        this.toggle.setAttribute('aria-expanded', 'true');
        this.isOpen = true;
        document.body.style.overflow = 'hidden'; // Previne scroll
    }

    closeMenu() {
        this.nav.classList.remove('open');
        this.toggle.setAttribute('aria-expanded', 'false');
        this.isOpen = false;
        document.body.style.overflow = '';
    }
}

// Gerenciador de Rolagem Suave
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href.length > 1) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        this.scrollToElement(target);
                    }
                }
            });
        });
    }

    scrollToElement(element) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = element.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Gerenciador de Animações de Entrada
class ScrollAnimations {
    constructor() {
        this.observer = null;
        this.init();
    }

    init() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                    // Para elementos com animação de números
                    if (entry.target.dataset.animate === 'number') {
                        this.animateNumbers(entry.target);
                    }
                }
            });
        }, { 
            threshold: CONFIG.INTERSECTION_THRESHOLD,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observar todas as seções
        document.querySelectorAll('.section').forEach(section => {
            this.observer.observe(section);
        });

        // Observar elementos especiais
        document.querySelectorAll('[data-animate]').forEach(element => {
            this.observer.observe(element);
        });
    }

    animateNumbers(container) {
        const numbers = container.querySelectorAll('[data-number]');
        numbers.forEach(element => {
            const target = parseInt(element.dataset.number);
            Utils.animateNumber(element, 0, target, 2000);
        });
    }
}

// Efeito Parallax no Hero
class ParallaxEffect {
    constructor() {
        this.heroContent = document.getElementById('hero-content');
        this.isEnabled = window.innerWidth > 768 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (this.isEnabled && this.heroContent) {
            this.init();
        }
    }

    init() {
        const handleMouseMove = Utils.throttle((e) => {
            const x = (window.innerWidth / 2 - e.pageX) / CONFIG.PARALLAX_INTENSITY;
            const y = (window.innerHeight / 2 - e.pageY) / CONFIG.PARALLAX_INTENSITY;
            
            this.heroContent.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${y}deg)`;
        }, 16);

        document.addEventListener('mousemove', handleMouseMove);

        // Reset ao sair da área
        document.addEventListener('mouseleave', () => {
            this.heroContent.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
        });
    }
}

// Slider de Depoimentos Melhorado
class TestimonialsSlider {
    constructor() {
        this.track = document.getElementById('slider-track');
        this.slides = this.track ? Array.from(this.track.children) : [];
        this.prevBtn = document.getElementById('prev');
        this.nextBtn = document.getElementById('next');
        this.dotsContainer = document.getElementById('dots');
        this.dots = [];
        this.currentIndex = 0;
        this.autoPlayTimer = null;
        this.isPlaying = true;
        this.touchStartX = 0;
        this.touchEndX = 0;

        if (this.slides.length > 0) {
            this.init();
        }
    }

    init() {
        this.createDots();
        this.setupEventListeners();
        this.updateSlider();
        this.startAutoPlay();
        this.setupTouchEvents();
    }

    createDots() {
        this.slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = 'dot';
            dot.setAttribute('aria-label', `Ir para depoimento ${index + 1}`);
            dot.addEventListener('click', () => this.goToSlide(index));
            this.dotsContainer.appendChild(dot);
            this.dots.push(dot);
        });
    }

    setupEventListeners() {
        this.prevBtn?.addEventListener('click', () => this.previousSlide());
        this.nextBtn?.addEventListener('click', () => this.nextSlide());

        // Pausar autoplay ao interagir
        const slider = this.track.parentElement;
        slider.addEventListener('mouseenter', () => this.pauseAutoPlay());
        slider.addEventListener('mouseleave', () => this.resumeAutoPlay());
        slider.addEventListener('focusin', () => this.pauseAutoPlay());
        slider.addEventListener('focusout', () => this.resumeAutoPlay());

        // Controles de teclado
        slider.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.previousSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });

        // Pausar quando a página não está visível
        document.addEventListener('visibilitychange', () => {
            document.hidden ? this.pauseAutoPlay() : this.resumeAutoPlay();
        });

        // Ajustar altura ao redimensionar
        window.addEventListener('resize', Utils.debounce(() => this.updateHeight(), 250));
    }

    setupTouchEvents() {
        const slider = this.track.parentElement;
        
        slider.addEventListener('touchstart', (e) => {
            this.touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        slider.addEventListener('touchend', (e) => {
            this.touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        }, { passive: true });
    }

    handleSwipe() {
        const swipeThreshold = 50;
        const diff = this.touchStartX - this.touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                this.nextSlide();
            } else {
                this.previousSlide();
            }
        }
    }

    updateSlider() {
        // Atualizar posição do track
        this.track.style.transform = `translateX(-${this.currentIndex * 100}%)`;
        
        // Atualizar dots
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });

        // Atualizar altura
        this.updateHeight();

        // Anunciar mudança para leitores de tela
        this.announceSlideChange();
    }

    updateHeight() {
        const currentSlide = this.slides[this.currentIndex];
        if (currentSlide) {
            const height = currentSlide.offsetHeight;
            this.track.parentElement.style.height = `${height}px`;
        }
    }

    announceSlideChange() {
        const announcement = `Depoimento ${this.currentIndex + 1} de ${this.slides.length}`;
        const announcer = document.createElement('div');
        announcer.setAttribute('aria-live', 'polite');
        announcer.setAttribute('aria-atomic', 'true');
        announcer.className = 'sr-only';
        announcer.textContent = announcement;
        document.body.appendChild(announcer);
        setTimeout(() => document.body.removeChild(announcer), 1000);
    }

    goToSlide(index) {
        this.currentIndex = (index + this.slides.length) % this.slides.length;
        this.updateSlider();
        this.restartAutoPlay();
    }

    nextSlide() {
        this.goToSlide(this.currentIndex + 1);
    }

    previousSlide() {
        this.goToSlide(this.currentIndex - 1);
    }

    startAutoPlay() {
        if (this.isPlaying && this.slides.length > 1) {
            this.autoPlayTimer = setInterval(() => this.nextSlide(), CONFIG.SLIDER_AUTO_PLAY);
        }
    }

    pauseAutoPlay() {
        if (this.autoPlayTimer) {
            clearInterval(this.autoPlayTimer);
            this.autoPlayTimer = null;
        }
    }

    resumeAutoPlay() {
        if (this.isPlaying && !this.autoPlayTimer) {
            this.startAutoPlay();
        }
    }

    restartAutoPlay() {
        this.pauseAutoPlay();
        this.resumeAutoPlay();
    }
}

// Accordion FAQ Melhorado
class FAQAccordion {
    constructor() {
        this.items = document.querySelectorAll('.accordion__item');
        this.init();
    }

    init() {
        this.items.forEach(item => {
            const header = item.querySelector('.accordion__header');
            const panel = item.querySelector('.accordion__panel');
            
            if (header && panel) {
                header.addEventListener('click', () => this.toggleItem(item));
                
                // Controle por teclado
                header.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.toggleItem(item);
                    }
                });
            }
        });
    }

    toggleItem(item) {
        const header = item.querySelector('.accordion__header');
        const panel = item.querySelector('.accordion__panel');
        const isOpen = item.classList.contains('open');

        if (isOpen) {
            this.closeItem(item);
        } else {
            // Fechar outros itens (opcional - remova se quiser múltiplos abertos)
            // this.items.forEach(otherItem => {
            //     if (otherItem !== item) this.closeItem(otherItem);
            // });
            
            this.openItem(item);
        }
    }

    openItem(item) {
        const header = item.querySelector('.accordion__header');
        const panel = item.querySelector('.accordion__panel');
        
        item.classList.add('open');
        header.setAttribute('aria-expanded', 'true');
        panel.style.maxHeight = panel.scrollHeight + 'px';
    }

    closeItem(item) {
        const header = item.querySelector('.accordion__header');
        const panel = item.querySelector('.accordion__panel');
        
        item.classList.remove('open');
        header.setAttribute('aria-expanded', 'false');
        panel.style.maxHeight = '0';
    }
}

// Validador de Formulário Avançado
class FormValidator {
    constructor() {
        this.form = document.getElementById('form-contato');
        this.submitBtn = document.getElementById('submit-btn');
        this.messageEl = document.getElementById('form-msg');
        this.isSubmitting = false;

        if (this.form) {
            this.init();
        }
    }

    init() {
        this.setupValidation();
        this.setupSubmission();
        this.setupPhoneFormatting();
    }

    setupValidation() {
        const inputs = this.form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            // Validação em tempo real
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';

        // Limpar erro anterior
        this.clearFieldError(field);

        // Validações específicas
        switch (fieldName) {
            case 'nome':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Nome é obrigatório';
                } else if (value.length < 2) {
                    isValid = false;
                    errorMessage = 'Nome deve ter pelo menos 2 caracteres';
                }
                break;

            case 'email':
                if (!value) {
                    isValid = false;
                    errorMessage = 'E-mail é obrigatório';
                } else if (!Utils.isValidEmail(value)) {
                    isValid = false;
                    errorMessage = 'E-mail inválido';
                }
                break;

            case 'mensagem':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Mensagem é obrigatória';
                } else if (value.length < 10) {
                    isValid = false;
                    errorMessage = 'Mensagem deve ter pelo menos 10 caracteres';
                }
                break;

            case 'privacidade':
                if (!field.checked) {
                    isValid = false;
                    errorMessage = 'Você deve aceitar a política de privacidade';
                }
                break;
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        }

        return isValid;
    }

    showFieldError(field, message) {
        const errorEl = document.getElementById(`${field.name}-error`);
        if (errorEl) {
            errorEl.textContent = message;
            errorEl.classList.add('show');
        }
        field.classList.add('error');
    }

    clearFieldError(field) {
        const errorEl = document.getElementById(`${field.name}-error`);
        if (errorEl) {
            errorEl.textContent = '';
            errorEl.classList.remove('show');
        }
        field.classList.remove('error');
    }

    setupPhoneFormatting() {
        const phoneInput = document.getElementById('telefone');
        if (phoneInput) {
            phoneInput.addEventListener('input', (e) => {
                e.target.value = Utils.formatPhone(e.target.value);
            });
        }
    }

    setupSubmission() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });
    }

    async handleSubmit() {
        if (this.isSubmitting) return;

        // Validar todos os campos
        const requiredFields = this.form.querySelectorAll('[required]');
        let isFormValid = true;

        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isFormValid = false;
            }
        });

        if (!isFormValid) {
            this.showMessage('Por favor, corrija os erros antes de enviar.', 'error');
            return;
        }

        this.isSubmitting = true;
        this.setSubmitButtonLoading(true);

        try {
            const formData = new FormData(this.form);
            
            // Simular envio (substitua pela sua implementação)
            await this.submitForm(formData);
            
            this.showMessage('Mensagem enviada com sucesso! Entrarei em contato em breve.', 'success');
            this.form.reset();
            
        } catch (error) {
            console.error('Erro ao enviar formulário:', error);
            this.showMessage('Erro ao enviar mensagem. Tente novamente ou entre em contato via WhatsApp.', 'error');
        } finally {
            this.isSubmitting = false;
            this.setSubmitButtonLoading(false);
        }
    }

    async submitForm(formData) {
        // Opção 1: Usar Formspree
        if (CONFIG.FORM_SUBMIT_URL.includes('formspree')) {
            const response = await fetch(CONFIG.FORM_SUBMIT_URL, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (!response.ok) {
                throw new Error('Erro no envio');
            }
            return response.json();
        }
        
        // Opção 2: Redirecionar para WhatsApp
        const nome = formData.get('nome');
        const email = formData.get('email');
        const mensagem = formData.get('mensagem');
        
        const whatsappMessage = `Olá! Meu nome é ${nome}.%0A%0AE-mail: ${email}%0A%0AMensagem: ${mensagem}`;
        const whatsappUrl = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${whatsappMessage}`;
        
        // Simular delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        window.open(whatsappUrl, '_blank');
    }

    setSubmitButtonLoading(loading) {
        const btnText = this.submitBtn.querySelector('.btn-text');
        const btnLoading = this.submitBtn.querySelector('.btn-loading');
        
        if (loading) {
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline-flex';
            this.submitBtn.disabled = true;
        } else {
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
            this.submitBtn.disabled = false;
        }
    }

    showMessage(message, type) {
        this.messageEl.textContent = message;
        this.messageEl.className = `form-msg ${type}`;
        
        // Auto-hide após 5 segundos
        setTimeout(() => {
            this.messageEl.className = 'form-msg';
            this.messageEl.textContent = '';
        }, 5000);
    }
}

// Gerenciador de Performance
class PerformanceManager {
    constructor() {
        this.init();
    }

    init() {
        this.lazyLoadImages();
        this.preloadCriticalResources();
        this.setupServiceWorker();
    }

    lazyLoadImages() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        }
    }

    preloadCriticalResources() {
        // Preload de fontes críticas
        const fontUrls = [
            'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap'
        ];

        fontUrls.forEach(url => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'style';
            link.href = url;
            document.head.appendChild(link);
        });
    }

    setupServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then(registration => {
                        console.log('SW registrado:', registration);
                    })
                    .catch(error => {
                        console.log('SW falhou:', error);
                    });
            });
        }
    }
}

// Analytics (Google Analytics 4)
class Analytics {
    constructor() {
        this.init();
    }

    init() {
        // Configurar GA4 aqui se necessário
        this.trackPageView();
        this.setupEventTracking();
    }

    trackPageView() {
        if (typeof gtag !== 'undefined') {
            gtag('config', 'GA_MEASUREMENT_ID', {
                page_title: document.title,
                page_location: window.location.href
            });
        }
    }

    setupEventTracking() {
        // Track clicks em botões importantes
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.target.textContent.trim();
                this.trackEvent('button_click', {
                    button_text: action,
                    page_location: window.location.pathname
                });
            });
        });

        // Track cliques no WhatsApp
        document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
            link.addEventListener('click', () => {
                this.trackEvent('whatsapp_click', {
                    page_location: window.location.pathname
                });
            });
        });

        // Track envio de formulário
        const form = document.getElementById('form-contato');
        if (form) {
            form.addEventListener('submit', () => {
                this.trackEvent('form_submit', {
                    form_name: 'contact_form'
                });
            });
        }
    }

    trackEvent(eventName, parameters = {}) {
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, parameters);
        }
    }
}

// Inicialização da aplicação
class App {
    constructor() {
        this.init();
    }

    init() {
        // Aguardar DOM estar pronto
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
        } else {
            this.initializeComponents();
        }
    }

    initializeComponents() {
        // Inicializar todos os componentes
        new MobileMenu();
        new SmoothScroll();
        new ScrollAnimations();
        new ParallaxEffect();
        new TestimonialsSlider();
        new FAQAccordion();
        new FormValidator();
        new PerformanceManager();
        new Analytics();

        // Adicionar classe para indicar que JS está carregado
        document.documentElement.classList.add('js-loaded');

        // Log de inicialização
        console.log('🌟 Site da Dra. Kettily Formiga carregado com sucesso!');
    }
}

// Inicializar aplicação
new App();

// Exportar para uso global se necessário
window.SiteApp = {
    Utils,
    CONFIG
};
