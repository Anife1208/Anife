document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Mobile Menu / Hamburger Controller ---
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    const toggleMenu = () => {
        hamburger.classList.toggle('open');
        navMenu.classList.toggle('open');
    };

    hamburger.addEventListener('click', toggleMenu);

    // Close mobile menu when links are clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('open')) {
                toggleMenu();
            }
        });
    });


    // --- 2. Dynamic Scrollspy (Active Link Highlighting) ---
    const sections = document.querySelectorAll('.section');
    
    const scrollSpy = () => {
        let currentSectionId = 'home';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100; // Account for fixed navbar offset
            if (window.scrollY >= sectionTop) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', scrollSpy);


    // --- 3. Scroll Reveal Animation Engine ---
    const revealOnScroll = () => {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const triggerPoint = window.innerHeight - 150;

            if (sectionTop < triggerPoint) {
                section.classList.add('visible');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    // Initial call to load above-the-fold content smoothly
    revealOnScroll();


    // --- 4. Interactive Testimonial Carousel ---
    const track = document.getElementById('carouselTrack');
    const items = Array.from(track.children);
    const nextButton = document.getElementById('nextBtn');
    const prevButton = document.getElementById('prevBtn');
    const dotsContainer = document.querySelector('.carousel-indicators');
    const dots = Array.from(dotsContainer.children);

    let currentIndex = 0;

    const updateCarousel = (index) => {
        // Shift track container positions
        track.style.transform = `translateX(-${index * 100}%)`;
        
        // Toggle Active classes on layout contents
        items.forEach(item => item.classList.remove('active'));
        items[index].classList.add('active');

        // Sync visual tracker state indicators
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
        
        currentIndex = index;
    };

    nextButton.addEventListener('click', () => {
        let nextIndex = currentIndex + 1;
        if (nextIndex >= items.length) nextIndex = 0; // Infinite loop forward
        updateCarousel(nextIndex);
    });

    prevButton.addEventListener('click', () => {
        let prevIndex = currentIndex - 1;
        if (prevIndex < 0) prevIndex = items.length - 1; // Infinite loop backward
        updateCarousel(prevIndex);
    });

    // Control by clicking indicator matrix dots
    dotsContainer.addEventListener('click', (e) => {
        const targetDot = e.target.closest('.dot');
        if (!targetDot) return;
        
        const targetIndex = parseInt(targetDot.getAttribute('data-index'));
        updateCarousel(targetIndex);
    });

    // Automated Carousel Rotation Engine (Every 8 Seconds)
    setInterval(() => {
        let nextIndex = currentIndex + 1;
        if (nextIndex >= items.length) nextIndex = 0;
        updateCarousel(nextIndex);
    }, 8000);

});