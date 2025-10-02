// ===== CONFIGURAÇÕES GLOBAIS =====
const CONFIG = {
    animationDuration: 300,
    scrollOffset: 100,
    testimonialAutoplay: 5000,
    loadingDuration: 2000,
    whatsappNumber: '5583999999999',
    email: 'contato@kettilyformiga.com.br'
};

// ===== UTILITÁRIOS =====
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
        }
    },

    // Smooth scroll para elementos
    smoothScrollTo(element, offset = 0) {
        const elementPosition = element.offsetTop - offset;
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    },

    // Verificar se elemento está visível
    isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    // Animar números (counter)
    animateNumber(element, start, end, duration) {
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                current = end;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    },

    // Validar email
    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },

    // Validar telefone brasileiro
    validatePhone(phone) {
        const re = /^(\+55\s?)?(\(?\d{2}\)?\s?)?\d{4,5}-?\d{4}$/;
        return re.test(phone);
    }
};

// ===== LOADING SCREEN =====
class LoadingScreen {
    constructor() {
        this.loadingElement = document.getElementById('loading-screen');
        this.init();
    }

    init() {
        // Simular carregamento
        setTimeout(() => {
            this.hide();
        }, CONFIG.loadingDuration);
    }

    hide() {
        if (this.loadingElement) {
            this.loadingElement.classList.add('hidden');
            setTimeout(() => {
                this.loadingElement.style.display = 'none';
            }, 500);
        }
    }
}

// ===== HEADER DINÂMICO =====
class DynamicHeader {
    constructor() {
        this.header = document.getElementById('header');
        this.menuToggle = document.getElementById('menu-toggle');
        this.nav = document.getElementById('nav');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.lastScrollY = window.scrollY;
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateActiveLink();
    }

    bindEvents() {
        // Scroll do header
        window.addEventListener('scroll', Utils.throttle(() => {
            this.handleScroll();
        }, 10));

        // Menu mobile
        if (this.menuToggle) {
            this.menuToggle.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }

        // Links de navegação
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                this.handleNavClick(e);
            });
        });

        // Fechar menu ao clicar fora
        document.addEventListener('click', (e) => {
            if (!this.header.contains(e.target) && this.nav.classList.contains('active')) {
                this.closeMobileMenu();
            }
        });
    }

    handleScroll() {
        const currentScrollY = window.scrollY;
        
        // Adicionar classe scrolled
        if (currentScrollY > 50) {
            this.header.classList.add('scrolled');
        } else {
            this.header.classList.remove('scrolled');
        }

        // Esconder/mostrar header baseado na direção do scroll
        if (currentScrollY > this.lastScrollY && currentScrollY > 200) {
            this.header.style.transform = 'translateY(-100%)';
        } else {
            this.header.style.transform = 'translateY(0)';
        }

        this.lastScrollY = currentScrollY;
        this.updateActiveLink();
    }

    toggleMobileMenu() {
        this.menuToggle.classList.toggle('active');
        this.nav.classList.toggle('active');
        document.body.style.overflow = this.nav.classList.contains('active') ? 'hidden' : '';
    }

    closeMobileMenu() {
        this.menuToggle.classList.remove('active');
        this.nav.classList.remove('active');
        document.body.style.overflow = '';
    }

    handleNavClick(e) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            Utils.smoothScrollTo(targetElement, CONFIG.scrollOffset);
            this.closeMobileMenu();
        }
    }

    updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + CONFIG.scrollOffset + 50;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                this.navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    }
}

// ===== ANIMAÇÕES DE ENTRADA =====
class ScrollAnimations {
    constructor() {
        this.animatedElements = document.querySelectorAll('[data-aos]');
        this.statsAnimated = false;
        this.init();
    }

    init() {
        this.bindEvents();
        this.checkAnimations();
    }

    bindEvents() {
        window.addEventListener('scroll', Utils.throttle(() => {
            this.checkAnimations();
        }, 100));
    }

    checkAnimations() {
        this.animatedElements.forEach(element => {
            if (this.isElementInViewport(element)) {
                element.classList.add('aos-animate');
            }
        });

        // Animar estatísticas do hero
        this.animateStats();
    }

    isElementInViewport(element) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        return rect.top <= windowHeight * 0.8;
    }

    animateStats() {
        if (this.statsAnimated) return;

        const statsSection = document.querySelector('.hero-stats');
        if (statsSection && this.isElementInViewport(statsSection)) {
            const statItems = document.querySelectorAll('.stat-item');
            
            statItems.forEach(item => {
                const numberElement = item.querySelector('.stat-number');
                const targetValue = parseInt(item.getAttribute('data-count'));
                
                Utils.animateNumber(numberElement, 0, targetValue, 2000);
            });

            this.statsAnimated = true;
        }
    }
}

// ===== SLIDER DE DEPOIMENTOS =====
class TestimonialsSlider {
    constructor() {
        this.slider = document.getElementById('testimonials-slider');
        this.slides = document.querySelectorAll('.testimonial-card');
        this.dots = document.querySelectorAll('.dot');
        this.prevBtn = document.getElementById('testimonial-prev');
        this.nextBtn = document.getElementById('testimonial-next');
        this.currentSlide = 0;
        this.autoplayInterval = null;
        
        if (this.slider) {
            this.init();
        }
    }

    init() {
        this.bindEvents();
        this.startAutoplay();
        this.showSlide(0);
    }

    bindEvents() {
        // Botões de navegação
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => {
                this.prevSlide();
            });
        }

        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => {
                this.nextSlide();
            });
        }

        // Dots de navegação
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.goToSlide(index);
            });
        });

        // Pausar autoplay ao hover
        this.slider.addEventListener('mouseenter', () => {
            this.stopAutoplay();
        });

        this.slider.addEventListener('mouseleave', () => {
            this.startAutoplay();
        });

        // Navegação por teclado
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });
    }

    showSlide(index) {
        // Esconder todos os slides
        this.slides.forEach(slide => {
            slide.classList.remove('active');
        });

        // Remover active de todos os dots
        this.dots.forEach(dot => {
            dot.classList.remove('active');
        });

        // Mostrar slide atual
        if (this.slides[index]) {
            this.slides[index].classList.add('active');
        }

        // Ativar dot correspondente
        if (this.dots[index]) {
            this.dots[index].classList.add('active');
        }

        this.currentSlide = index;
    }

    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }

    prevSlide() {
        const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prevIndex);
    }

    goToSlide(index) {
        this.showSlide(index);
        this.resetAutoplay();
    }

    startAutoplay() {
        this.autoplayInterval = setInterval(() => {
            this.nextSlide();
        }, CONFIG.testimonialAutoplay);
    }

    stopAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    }

    resetAutoplay() {
        this.stopAutoplay();
        this.startAutoplay();
    }
}

// ===== ACORDEÃO FAQ =====
class FAQAccordion {
    constructor() {
        this.faqItems = document.querySelectorAll('.faq-item');
        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        this.faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                this.toggleItem(item);
            });
        });
    }

    toggleItem(item) {
        const isActive = item.classList.contains('active');
        
        // Fechar todos os itens
        this.faqItems.forEach(faqItem => {
            faqItem.classList.remove('active');
        });

        // Abrir o item clicado se não estava ativo
        if (!isActive) {
            item.classList.add('active');
        }
    }
}

// ===== FORMULÁRIO DE CONTATO =====
class ContactForm {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.statusElement = document.getElementById('form-status');
        
        if (this.form) {
            this.init();
        }
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });

        // Validação em tempo real
        const inputs = this.form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });

            input.addEventListener('input', () => {
                this.clearError(input);
            });
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';

        // Limpar erro anterior
        this.clearError(field);

        // Validações específicas
        switch (fieldName) {
            case 'name':
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
                    errorMessage = 'Email é obrigatório';
                } else if (!Utils.validateEmail(value)) {
                    isValid = false;
                    errorMessage = 'Email inválido';
                }
                break;

            case 'phone':
                if (value && !Utils.validatePhone(value)) {
                    isValid = false;
                    errorMessage = 'Telefone inválido';
                }
                break;

            case 'message':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Mensagem é obrigatória';
                } else if (value.length < 10) {
                    isValid = false;
                    errorMessage = 'Mensagem deve ter pelo menos 10 caracteres';
                }
                break;
        }

        if (!isValid) {
            this.showError(field, errorMessage);
        }

        return isValid;
    }

    showError(field, message) {
        const errorElement = document.getElementById(`${field.name}-error`);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
        field.style.borderColor = 'var(--error)';
    }

    clearError(field) {
        const errorElement = document.getElementById(`${field.name}-error`);
        if (errorElement) {
            errorElement.style.display = 'none';
        }
        field.style.borderColor = '';
    }

    validateForm() {
        const requiredFields = this.form.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    }

    async handleSubmit() {
        if (!this.validateForm()) {
            this.showStatus('Por favor, corrija os erros no formulário.', 'error');
            return;
        }

        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);

        try {
            this.showStatus('Enviando mensagem...', 'loading');
            
            // Simular envio (substitua pela sua implementação)
            await this.simulateSubmit(data);
            
            this.showStatus('Mensagem enviada com sucesso! Entrarei em contato em breve.', 'success');
            this.form.reset();
            
        } catch (error) {
            this.showStatus('Erro ao enviar mensagem. Tente novamente ou entre em contato via WhatsApp.', 'error');
        }
    }

    async simulateSubmit(data) {
        // Simular delay de envio
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Dados do formulário:', data);
                resolve();
            }, 1500);
        });
    }

    showStatus(message, type) {
        this.statusElement.textContent = message;
        this.statusElement.className = `form-status ${type}`;
        this.statusElement.style.display = 'block';

        if (type === 'success') {
            setTimeout(() => {
                this.statusElement.style.display = 'none';
            }, 5000);
        }
    }
}

// ===== BOTÕES DE AÇÃO =====
class ActionButtons {
    constructor() {
        this.init();
    }

    init() {
        this.bindWhatsAppButtons();
        this.bindScheduleButtons();
        this.bindBackToTop();
    }

    bindWhatsAppButtons() {
        const whatsappButtons = document.querySelectorAll('#hero-whatsapp, #whatsapp-float');
        
        whatsappButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.openWhatsApp();
            });
        });
    }

    bindScheduleButtons() {
        const scheduleButtons = document.querySelectorAll('#agendar-btn, #hero-agendar');
        
        scheduleButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.openScheduling();
            });
        });
    }

    bindBackToTop() {
        const backToTopBtn = document.getElementById('back-to-top');
        
        if (backToTopBtn) {
            // Mostrar/esconder botão baseado no scroll
            window.addEventListener('scroll', Utils.throttle(() => {
                if (window.scrollY > 300) {
                    backToTopBtn.classList.add('visible');
                } else {
                    backToTopBtn.classList.remove('visible');
                }
            }, 100));

            // Ação do botão
            backToTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    openWhatsApp() {
        const message = encodeURIComponent('Olá! Gostaria de agendar uma consulta com a Dra. Kettily Formiga.');
        const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${message}`;
        window.open(whatsappUrl, '_blank');
    }

    openScheduling() {
        // Por enquanto, redireciona para WhatsApp
        // Pode ser substituído por um modal de agendamento ou integração com calendário
        const message = encodeURIComponent('Olá! Gostaria de agendar uma consulta. Quais são os horários disponíveis?');
        const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${message}`;
        window.open(whatsappUrl, '_blank');
    }
}

// ===== EFEITOS VISUAIS AVANÇADOS =====
class VisualEffects {
    constructor() {
        this.init();
    }

    init() {
        this.initParallax();
        this.initHoverEffects();
        this.initCursorEffects();
    }

    initParallax() {
        const heroShapes = document.querySelectorAll('.shape');
        
        window.addEventListener('scroll', Utils.throttle(() => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            heroShapes.forEach((shape, index) => {
                const speed = (index + 1) * 0.3;
                shape.style.transform = `translateY(${rate * speed}px)`;
            });
        }, 10));
    }

    initHoverEffects() {
        // Efeito de hover nos cards de serviço
        const serviceCards = document.querySelectorAll('.service-card');
        
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });

        // Efeito de hover nos botões
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'translateY(-2px)';
            });

            button.addEventListener('mouseleave', () => {
                button.style.transform = '';
            });
        });
    }

    initCursorEffects() {
        // Efeito de cursor personalizado (opcional)
        const interactiveElements = document.querySelectorAll('a, button, .service-card, .testimonial-card');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                document.body.style.cursor = 'pointer';
            });

            element.addEventListener('mouseleave', () => {
                document.body.style.cursor = 'default';
            });
        });
    }
}

// ===== PERFORMANCE E OTIMIZAÇÕES =====
class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        this.lazyLoadImages();
        this.preloadCriticalResources();
    }

    lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    preloadCriticalResources() {
        // Preload de fontes críticas
        const fontLinks = [
            'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap',
            'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap'
        ];

        fontLinks.forEach(href => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'style';
            link.href = href;
            document.head.appendChild(link);
        });
    }
}

// ===== INICIALIZAÇÃO =====
class App {
    constructor() {
        this.init();
    }

    init() {
        // Aguardar DOM estar pronto
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.initializeComponents();
            });
        } else {
            this.initializeComponents();
        }
    }

    initializeComponents() {
        // Inicializar todos os componentes
        new LoadingScreen();
        new DynamicHeader();
        new ScrollAnimations();
        new TestimonialsSlider();
        new FAQAccordion();
        new ContactForm();
        new ActionButtons();
        new VisualEffects();
        new PerformanceOptimizer();

        // Log de inicialização
        console.log('🎉 Site da Dra. Kettily Formiga inicializado com sucesso!');
    }
}

// ===== INICIAR APLICAÇÃO =====
new App();
