// ==========================================
// VEXA - PREMIUM JAVASCRIPT OPTIMIZADO
// ==========================================

// Forzar al navegador a subir al inicio antes de que renderice la página
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

window.addEventListener("DOMContentLoaded", () => {
    
    // Forzamos la subida a la coordenada (0,0) de inmediato
    window.scrollTo(0, 0);

    // ==========================================
    // 1. EFECTO ESCRITURA (TYPEWRITER) OPTIMIZADO
    // ==========================================
    const heroTitle = document.querySelector(".hero h1");
    if (heroTitle) {
        const text = heroTitle.textContent.trim();
        heroTitle.textContent = "";
        
        const characters = text.split("").map(char => {
            const span = document.createElement("span");
            span.textContent = char;
            span.style.opacity = "0";
            span.style.transition = "opacity 0.1s ease";
            heroTitle.appendChild(span);
            return span;
        });

        let index = 0;
        function typeWriter() {
            if (index < characters.length) {
                characters[index].style.opacity = "1";
                index++;
                setTimeout(typeWriter, 50);
            }
        }
        setTimeout(typeWriter, 400);
    }

    // ==========================================
    // DE AQUÍ EN ADELANTE PEGA EL RESTO DE TU CÓDIGO
    // (Animaciones de scroll, contadores, navbar, slider...)
    // ==========================================

}); // <- Esta llave cierra TODO el archivo de forma correcta.
    // 2. ANIMACIÓN REVEAL AL HACER SCROLL (INTERSECTION OBSERVER)
    // Corregido: Animamos los elementos internos, no las secciones completas para evitar bugs de saltos
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("revealed");
                revealObserver.unobserve(entry.target); // Deja de observar una vez animado
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    // Inyectamos los estilos iniciales por JS para que si el usuario no tiene JS, la web sea legible igual
    document.querySelectorAll(".card, .stat-box, form, .feature-content, .showcase").forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(40px)";
        el.style.transition = "opacity 0.8s cubic-bezier(0.215, 0.610, 0.355, 1), transform 0.8s cubic-bezier(0.215, 0.610, 0.355, 1)";
        
        // Truco CSS dinámico: cuando se añade la clase .revealed se activa esto
        el.addEventListener('transitionend', function handler() {
            el.style.transition = ""; // Limpiamos la transición para que no rompa los hovers del CSS original
            el.removeEventListener('transitionend', handler);
        });

        revealObserver.observe(el);
    });

    // Crear regla CSS dinámica para la activación
    const style = document.createElement('style');
    style.innerHTML = ".revealed { opacity: 1 !important; transform: translateY(0) !important; }";
    document.head.appendChild(style);

    // 3. CONTADORES ANIMADOS AL ENTRAR EN PANTALLA
    // Corregido: Ahora la animación inicia SOLO cuando el usuario hace scroll hasta ver los números
    const statsSection = document.querySelector(".stats");
    const counters = document.querySelectorAll(".stat-box h3");
    
    if (statsSection && counters.length > 0) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statsObserver.observe(statsSection);
    }

    function startCounters() {
        counters.forEach(counter => {
            const targetText = counter.innerText.trim();
            // Si es el símbolo de infinito, le damos un efecto de desvanecimiento suave en vez de contar
            if (targetText === "∞") {
                counter.style.opacity = "0";
                setTimeout(() => {
                    counter.style.transition = "opacity 1s ease";
                    counter.style.opacity = "1";
                }, 100);
                return;
            }

            const targetValue = parseInt(targetText);
            if (isNaN(targetValue)) return;

            let current = 0;
            const duration = 1500; // Duración total de la animación en milisegundos
            const startTime = performance.now();

            function updateCounter(currentTime) {
                const elapsedTime = currentTime - startTime;
                const progress = Math.min(elapsedTime / duration, 1); // Progreso de 0 a 1

                // Efecto de desaceleración (Ease-out)
                current = Math.floor(progress * targetValue);

                counter.innerText = current + (targetText.includes("%") ? "%" : targetText.includes("/") ? "/7" : "");

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = targetText; // Asegura que quede el texto original exacto (ej. 100% o 24/7)
                }
            }
            requestAnimationFrame(updateCounter);
        });
    }

    // 4. NAVBAR DINÁMICA CON SCROLL
    const header = document.querySelector("header");
    if (header) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 30) {
                // Degradado más sólido y oscuro cuando el usuario hace scroll hacia abajo
                header.style.background = "linear-gradient(135deg, rgba(0, 59, 196, 0.75) 0%, rgba(39, 31, 157, 0.65) 50%, rgba(92, 50, 175, 0.8) 100% ";
                header.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.6)";
                header.style.top = "10px";
            } else {
                // Regresa al degradado original más transparente cuando está arriba del todo
                header.style.background = "linear-gradient(135deg, rgba(0, 59, 196, 0.75) 0%, rgba(39, 31, 157, 0.65) 50%, rgba(92, 50, 175, 0.8) 100% ";
                header.style.boxShadow = "0 10px 40px rgba(0, 0, 0, 0.4)";
                header.style.top = "20px";
            }
        }, { passive: true });
    }

    // 5. PARALLAX EN CONTENEDOR HERO (SUAVE)
    // Corregido: Movemos solo el contenido interior del hero, no la sección completa, manteniendo el fondo intacto
    const heroContent = document.querySelector(".hero-content");
    if (heroContent) {
        window.addEventListener("scroll", () => {
            const scroll = window.scrollY;
            if (scroll < window.innerHeight) {
                heroContent.style.transform = `translateY(${scroll * 0.12}px)`;
                heroContent.style.opacity = `${1 - (scroll / window.innerHeight) * 1.2}`;
            }
        }, { passive: true });
    }

    // 6. LOGS Y MENSAJES AUTOMÁTICOS
    console.log("🚀 VeXa | Next Generation Design - Inicializado correctamente.");

    // ==========================================
    // EXTRA: AUTOMATIC INTERACTIVE SHOWCASE SLIDER
    // ==========================================
    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");
    let currentSlide = 0;
    let slideInterval;

    if (slides.length > 0) {
        function showSlide(index) {
            // Quitamos la clase activa de la diapositiva y punto anterior
            slides[currentSlide].classList.remove("active");
            dots[currentSlide].classList.remove("active");
            
            // Actualizamos el índice
            currentSlide = (index + slides.length) % slides.length;
            
            // Activamos la nueva diapositiva y su correspondiente punto
            slides[currentSlide].classList.add("active");
            dots[currentSlide].classList.add("active");
        }

        function nextSlide() {
            showSlide(currentSlide + 1);
        }

        function startSlider() {
            slideInterval = setInterval(nextSlide, 4000); // Cambia cada 4 segundos
        }

        function stopSlider() {
            clearInterval(slideInterval);
        }

        // Iniciar el carrusel automáticamente
        startSlider();

        // Controlar los puntitos manualmente al hacer clic
        dots.forEach((dot, index) => {
            dot.addEventListener("click", () => {
                stopSlider();
                showSlide(index);
                startSlider(); // Reinicia el temporizador
            });
        });

        // Detener la animación si el usuario pasa el mouse por encima (para leer o ver mejor)
        const showcaseContainer = document.querySelector(".showcase");
        showcaseContainer.addEventListener("mouseenter", stopSlider);
        showcaseContainer.addEventListener("mouseleave", startSlider);
    };