document.addEventListener('DOMContentLoaded', () => {

    const messageEls = document.querySelectorAll('.message p');
    messageEls.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';

        setTimeout(() => {
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 500 + (index * 200));
    });

    // Créer les confettis
    createConfetti();

    // Mettre en place un déclencheur d'animation pour les photos
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    const photos = document.querySelectorAll('.photo');
    photos.forEach(photo => {
        photo.style.opacity = '0';
        photo.style.transform = 'translateY(30px)';
        photo.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(photo);
    });
});

// Fonction pour créer les confettis
function createConfetti() {
    const confettiContainer = document.querySelector('.confetti-container');
    const colors = ['#ff69b4', '#f8c1d8', '#ffffff', '#ff1493', '#f5a9cb'];

    for (let i = 0; i < 150; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';

        const size = Math.random() * 10 + 5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = Math.random() * 100;
        const animationDuration = Math.random() * 3 + 2;
        const animationDelay = Math.random() * 5;

        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        confetti.style.backgroundColor = color;
        confetti.style.left = `${left}%`;
        confetti.style.top = '-20px';
        confetti.style.position = 'absolute';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.opacity = Math.random() + 0.5;
        confetti.style.animation = `confettiFall ${animationDuration}s linear infinite`;
        confetti.style.animationDelay = `${animationDelay}s`;

        confettiContainer.appendChild(confetti);
    }

    // Ajouter l'animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes confettiFall {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    initPhotoCarousel();

}

function initPhotoCarousel() {
    const photoContainers = document.querySelectorAll('.photo-container');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;

    // Ajouter une rotation aléatoire à chaque polaroid
    photoContainers.forEach(container => {
        const polaroid = container.querySelector('.polaroid');
        const rotation = (Math.random() * 6 - 3) + 'deg';
        polaroid.style.setProperty('--rotation', rotation);
    });

    function showPhoto(index) {
        // Mise à jour de l'index
        currentIndex = index;
        if (currentIndex < 0) currentIndex = photoContainers.length - 1;
        if (currentIndex >= photoContainers.length) currentIndex = 0;

        // Mise à jour des classes pour les animations
        photoContainers.forEach((container, i) => {
            container.classList.remove('active', 'prev', 'next');
            if (i === currentIndex) {
                container.classList.add('active');
            } else if (i === (currentIndex - 1 + photoContainers.length) % photoContainers.length) {
                container.classList.add('prev');
            } else if (i === (currentIndex + 1) % photoContainers.length) {
                container.classList.add('next');
            }
        });

        // Mise à jour des indicateurs
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    // Événements des boutons
    prevBtn.addEventListener('click', () => {
        showPhoto(currentIndex - 1);
    });

    nextBtn.addEventListener('click', () => {
        showPhoto(currentIndex + 1);
    });

    // Événements des points de pagination
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            showPhoto(i);
        });
    });

    // Auto-rotation toutes les 5 secondes
    let autoplayInterval = setInterval(() => {
        showPhoto(currentIndex + 1);
    }, 5000);

    // Arrêter l'autoplay au survol
    document.querySelector('.memory-book').addEventListener('mouseenter', () => {
        clearInterval(autoplayInterval);
    });

    // Reprendre l'autoplay à la sortie
    document.querySelector('.memory-book').addEventListener('mouseleave', () => {
        autoplayInterval = setInterval(() => {
            showPhoto(currentIndex + 1);
        }, 5000);
    });

    // Navigation avec le clavier
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            showPhoto(currentIndex - 1);
        } else if (e.key === 'ArrowRight') {
            showPhoto(currentIndex + 1);
        }
    });

    // Initialiser
    showPhoto(0);
     // Animation des textes
}