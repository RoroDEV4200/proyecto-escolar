document.addEventListener('DOMContentLoaded', function() {
    // Actualizar el año actual en el footer
    document.getElementById('current-year').innerText = new Date().getFullYear();

    // Menú Hamburguesa
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav ul li a');

    hamburgerMenu.addEventListener('click', function() {
        hamburgerMenu.classList.toggle('active');
        nav.classList.toggle('active');
    });

    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburgerMenu.classList.remove('active');
            nav.classList.remove('active');
        });
    });

    // Partículas decorativas
    const particles = document.querySelectorAll('.particle');
    const particlesContainer = document.querySelector('.particles-container');

    function createParticles() {
        particles.forEach((particle, index) => {
            const size = Math.random() * 20 + 5;
            const posX = Math.random() * particlesContainer.offsetWidth;
            const posY = Math.random() * particlesContainer.offsetHeight;
            const duration = Math.random() * 20 + 10;
            const delay = Math.random() * 5;

            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}px`;
            particle.style.top = `${posY}px`;
            particle.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
        });
    }

    // Agregar animación de flotar
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes float {
            0% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
            100% { transform: translateY(0) rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

    if (particlesContainer) {
        createParticles();
    }

    // Efecto de scroll para el header
    const header = document.getElementById('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Cursor personalizado
    const cursor = document.querySelector('.cursor');
    
    if (cursor) {
        document.addEventListener('mousemove', function(e) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        document.addEventListener('mousedown', function() {
            cursor.classList.add('active');
        });

        document.addEventListener('mouseup', function() {
            cursor.classList.remove('active');
        });

        // Añadir efecto de hover para elementos interactivos
        const interactiveElements = document.querySelectorAll('a, button, .btn, .view-btn');
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                cursor.classList.add('active');
            });
            element.addEventListener('mouseleave', function() {
                cursor.classList.remove('active');
            });
        });
    }

    // Revelar texto al hacer scroll
    const textElements = document.querySelectorAll('.text-reveal');
    
    function revealText() {
        textElements.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - 150) {
                element.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', revealText);
    revealText(); // Ejecutar al cargar para elementos ya visibles

    // Modal para visualizar imágenes
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImg');
    const modalCaption = document.getElementById('modalCaption');
    const viewButtons = document.querySelectorAll('.view-btn');
    const closeModal = document.querySelector('.close-modal');

    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const imgContainer = this.closest('.img-container');
            const img = imgContainer.querySelector('img');
            const productTitle = this.closest('.producto-item').querySelector('h3').textContent;
            
            modalImg.src = img.src;
            modalCaption.textContent = productTitle;
            modal.style.display = 'block';
            
            setTimeout(() => {
                modal.classList.add('show');
            }, 10);
        });
    });

    if (closeModal) {
        closeModal.addEventListener('click', function() {
            modal.classList.remove('show');
            
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        });
    }

    // También cerrar modal al hacer clic fuera de la imagen
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('show');
            
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        }
    });

    // Botón volver arriba
    const backToTopBtn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Animación para secciones y elementos al hacer scroll
    const animateElements = document.querySelectorAll('.producto-item, .paso, .info-item');
    
    function animateOnScroll() {
        animateElements.forEach((element, index) => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                // Agregar un retraso según la posición del elemento
                setTimeout(() => {
                    element.classList.add('animated');
                }, index * 100);
            }
        });
    }

    // Agregar estilos de animación
    const animationStyle = document.createElement('style');
    animationStyle.innerHTML = `
        .producto-item, .paso, .info-item {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .producto-item.animated, .paso.animated, .info-item.animated {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(animationStyle);

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Ejecutar al cargar la página
    
    // Validación de formulario
    const contactForm = document.querySelector('.formulario-contacto');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            const mensaje = document.getElementById('mensaje').value;
            
            // Validación básica
            if (nombre.trim() === '' || email.trim() === '' || mensaje.trim() === '') {
                alert('Por favor, completa todos los campos del formulario.');
                return;
            }
            
            // Validación de email con expresión regular
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Por favor, ingresa un correo electrónico válido.');
                return;
            }
            
            // Simular envío (aquí se conectaría con un backend real)
            alert('Mensaje enviado correctamente. ¡Gracias por contactarnos!');
            contactForm.reset();
        });
    }
});