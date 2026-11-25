// Ждем, пока загрузится весь HTML документ
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. ПЛАВНАЯ ПРОКРУТКА К ЯКОРЯМ (Smooth Scroll)
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            // Отменяем стандартное поведение браузера (мгновенный прыжок)
            e.preventDefault();
            
            // Получаем ID элемента, к которому нужно прокрутить
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Вычисляем позицию элемента с учетом высоты шапки (чтобы шапка не перекрывала заголовок)
                const headerHeight = document.querySelector('.header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
                
                // Плавно скроллим к нужному месту
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 2. ЭФФЕКТ ШАПКИ ПРИ СКРОЛЛЕ (Изменение прозрачности/тени)
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            // Если прокрутили больше 50px, добавляем тень и делаем шапку чуть темнее
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
            header.style.transition = 'all 0.3s ease';
        } else {
            // Если вернулись наверх, убираем тень
            header.style.boxShadow = 'none';
        }
    });

    // 3. АНИМАЦИЯ ПОЯВЛЕНИЯ КАРТОЧЕК ПРИ СКРОЛЛЕ (Простая версия)
    const cards = document.querySelectorAll('.feature-card');
    
    // Создаем "наблюдатель" за элементами
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Когда карточка появляется в зоне видимости, делаем ее видимой
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1 // Срабатывает, когда видно 10% элемента
    });

    // Сначала скрываем карточки, затем начинаем за ними следить
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});