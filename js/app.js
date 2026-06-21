
        // 1. REVEAL AL HACER SCROLL
        const reveals = document.querySelectorAll('.reveal');
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        reveals.forEach(el => revealObserver.observe(el));

        // 2. ELEMENTOS FLOTANTES CHIC (Herraduras / Pétalos sutiles)
        const wrapper = document.querySelector('.main-wrapper');
        const floatIcons = [
            `<svg viewBox="0 0 24 24" fill="#D6BEEC"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/></svg>`,
            `<svg viewBox="0 0 24 24" fill="#F1D97A"><path d="M12 2L2 22h20L12 2z" opacity="0.15"/></svg>` // Triángulos abstractos simulando destellos
        ];

        function spawnFloatingItem() {
            const item = document.createElement('div');
            item.classList.add('floating-petal');
            item.innerHTML = floatIcons[Math.floor(Math.random() * floatIcons.length)];
            item.style.left = Math.random() * 85 + '%';
            item.style.animationDuration = Math.random() * 4 + 12 + 's';
            item.style.width = (Math.random() * 12 + 16) + 'px';
            wrapper.appendChild(item);
            setTimeout(() => item.remove(), 16000);
        }
        setInterval(spawnFloatingItem, 4000);
        for(let i=0; i<3; i++) setTimeout(spawnFloatingItem, i*1200);

        // 3. AUDIO INTERACTIVO REAL / SIMULADO
        const audio = document.getElementById('bg-music');
        const playIcon = document.getElementById('play-icon');
        const playerStatus = document.getElementById('player-status');

        function toggleMusic() {
            if (audio.paused) {
                audio.play().then(() => {
                    playIcon.innerHTML = '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>'; // Icono pausa
                    playerStatus.innerText = "Reproduciendo Audio";
                }).catch(() => {
                    // Simulación elegante si el navegador bloquea auto-play
                    playIcon.innerHTML = '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>';
                    playerStatus.innerText = "Reproduciendo (Simulado)";
                });
            } else {
                audio.pause();
                playIcon.innerHTML = '<path d="M8 5v14l11-7z"/>'; // Icono play
                playerStatus.innerText = "Música en Pausa";
            }
        }

        // 4. CUENTA REGRESIVA EXACTA
        const targetDate = new Date('January 24, 2026 19:00:00').getTime();
        function runClock() {
            const now = new Date().getTime();
            const difference = targetDate - now;

            if (difference < 0) return;

            document.getElementById('days').innerText = String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(2, '0');
            document.getElementById('hours').innerText = String(Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
            document.getElementById('minutes').innerText = String(Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
            document.getElementById('seconds').innerText = String(Math.floor((difference % (1000 * 60)) / 1000)).padStart(2, '0');
        }
        setInterval(runClock, 1000);
        runClock();
    