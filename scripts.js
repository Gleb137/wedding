        // 1. Плавное появление карточек при прокрутке
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        document.querySelectorAll('.card').forEach((card) => observer.observe(card));

        // 2. Таймер обратного отсчёта до 07.07.2027 15:30 (по Новосибирску UTC+7)
        const weddingDate = new Date('2027-07-07T15:30:00+07:00').getTime();

        function updateCountdown() {
            const now = Date.now();
            const diff = Math.max(0, weddingDate - now);

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const mins = Math.floor((diff / (1000 * 60)) % 60);
            const secs = Math.floor((diff / 1000) % 60);

            document.getElementById('cd-days').textContent = days;
            document.getElementById('cd-hours').textContent = String(hours).padStart(2, '0');
            document.getElementById('cd-mins').textContent = String(mins).padStart(2, '0');
            document.getElementById('cd-secs').textContent = String(secs).padStart(2, '0');
        }

        updateCountdown();
        setInterval(updateCountdown, 1000);

        // 3. Обработка анкеты гостя
        document.getElementById('rsvpForm').addEventListener('submit', function (e) {
            e.preventDefault();
            const name = document.getElementById('guestName').value.trim();
            const status = document.getElementById('rsvpStatus');
            if (!name) return;

            status.textContent = `Спасибо, ${name}! Ваш ответ сохранён.`;
            status.style.display = 'block';
            this.reset();
        });