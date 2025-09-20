// Инициализация после загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    
    // Скрываем preloader после загрузки страницы
    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.classList.add('loaded');
            document.body.style.overflow = 'auto';
        }, 1000);
    });

    // Изменение навигации при скролле
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Показываем/скрываем кнопку "Наверх"
        const backToTop = document.getElementById('backToTop');
        if (window.scrollY > 500) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });

    // Плавная прокрутка к якорям
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Закрываем navbar на мобильных устройствах
                const navbarCollapse = document.getElementById('navbarNav');
                if (navbarCollapse.classList.contains('show')) {
                    new bootstrap.Collapse(navbarCollapse).hide();
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Кнопка "Наверх"
    document.getElementById('backToTop').addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Фильтрация портфолио
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const portfolioGrid = document.querySelector('.portfolio-grid');
    const sitesSection = document.getElementById('sites-section');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Убираем активный класс у всех кнопок
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Добавляем активный класс к текущей кнопке
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            if (filterValue === 'sites') {
                // Показываем секцию с сайтами, скрываем сетку портфолио
                portfolioGrid.style.display = 'none';
                sitesSection.classList.add('active');
            } else {
                // Показываем сетку портфолио, скрываем секцию с сайтами
                portfolioGrid.style.display = 'grid';
                sitesSection.classList.remove('active');
                
                // Фильтрация элементов портфолио
                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.classList.add('show');
                    } else {
                        item.classList.remove('show');
                    }
                });
            }
        });
    });

    // Обновление номеров слайдов для всех каруселей
    const carousels = document.querySelectorAll('.carousel');
    carousels.forEach(carousel => {
        carousel.addEventListener('slid.bs.carousel', function() {
            const activeIndex = Array.from(this.querySelectorAll('.carousel-item')).indexOf(this.querySelector('.carousel-item.active')) + 1;
            const totalSlides = this.querySelectorAll('.carousel-item').length;
            const slideNumberElement = this.parentElement.querySelector('.slide-number');
            
            if (slideNumberElement) {
                slideNumberElement.textContent = `${activeIndex.toString().padStart(2, '0')}/${totalSlides.toString().padStart(2, '0')}`;
            }
        });
    });

    // Инициализация номеров слайдов при загрузке
    carousels.forEach(carousel => {
        const activeIndex = Array.from(carousel.querySelectorAll('.carousel-item')).indexOf(carousel.querySelector('.carousel-item.active')) + 1;
        const totalSlides = carousel.querySelectorAll('.carousel-item').length;
        const slideNumberElement = carousel.parentElement.querySelector('.slide-number');
        
        if (slideNumberElement) {
            slideNumberElement.textContent = `${activeIndex.toString().padStart(2, '0')}/${totalSlides.toString().padStart(2, '0')}`;
        }
    });

    // Обработка формы
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Здесь можно добавить код для отправки формы
            // Например, с помощью Fetch API или AJAX
            
            // Временно покажем сообщение об успехе
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Отправка...';
            submitBtn.disabled = true;
            
            setTimeout(function() {
                alert('Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Закрываем модальное окно
                const modal = bootstrap.Modal.getInstance(document.getElementById('contactModal'));
                modal.hide();
            }, 1500);
        });
    }

    // Обработка модального окна услуг
    const serviceModal = document.getElementById('serviceModal');
    if (serviceModal) {
        serviceModal.addEventListener('show.bs.modal', function(event) {
            const button = event.relatedTarget;
            const service = button.getAttribute('data-service');
            const modalTitle = serviceModal.querySelector('.modal-title');
            const modalContent = serviceModal.querySelector('.modal-body');
            
            modalTitle.textContent = service;
            
            // Загружаем контент в зависимости от услуги
            let content = '';
            
            switch(service) {
                case 'Веб-разработка':
                    content = `
                        <p>Мы создаем современные, адаптивные и быстрые веб-сайты, которые эффективно представляют ваш бизнес в интернете.</p>
                        <h6>Что мы предлагаем:</h6>
                        <ul>
                            <li>Разработка сайтов под ключ</li>
                            <li>Адаптивный дизайн для всех устройств</li>
                            <li>Оптимизация для поисковых систем (SEO)</li>
                            <li>Интеграция с системами управления контентом</li>
                            <li>Техническая поддержка и обслуживание</li>
                        </ul>
                    `;
                    break;
                case '3D Моделирование':
                    content = `
                        <p>Мы создаем качественные 3D модели для визуализации продуктов, архитектурных проектов и игр.</p>
                        <h6>Что мы предлагаем:</h6>
                        <ul>
                            <li>3D моделирование продуктов</li>
                            <li>Архитектурная визуализация</li>
                            <li>Интерьерный дизайн</li>
                            <li>Анимация и рендеринг</li>
                            <li>Подготовка моделей для 3D печати</li>
                        </ul>
                    `;
                    break;
                case 'Дизайн логотипов':
                    content = `
                        <p>Разрабатываем уникальные запоминающиеся логотипы, которые отражают суть вашего бренда.</p>
                        <h6>Что мы предлагаем:</h6>
                        <ul>
                            <li>Разработка концепции логотипа</li>
                            <li>Создание нескольких вариантов на выбор</li>
                            <li>Подготовка файлов для печати и веба</li>
                            <li>Разработка брендбука</li>
                            <li>Фирменный стиль компании</li>
                        </ul>
                    `;
                    break;
                default:
                    content = `<p>Информация об услуге скоро будет добавлена.</p>`;
            }
            
            modalContent.innerHTML = content;
        });
    }

    // Обработка модального окна проектов
    const projectModal = document.getElementById('projectModal');
    if (projectModal) {
        projectModal.addEventListener('show.bs.modal', function(event) {
            const button = event.relatedTarget;
            const project = button.getAttribute('data-project');
            const modalTitle = projectModal.querySelector('.modal-title');
            const modalContent = projectModal.querySelector('.modal-body');
            
            // Загружаем контент в зависимости от проекта
            let title = '';
            let content = '';
            
            switch(project) {
                case '3d-1':
                    title = 'Архитектурная визуализация';
                    content = `
                        <img src="./jpg/1.jpg" alt="Архитектурная визуализация" class="img-fluid rounded mb-4">
                        <p>Детализированная 3D модель жилого комплекса с проработкой всех элементов.</p>
                        <h6>Особенности проекта:</h6>
                        <ul>
                            <li>Фотореалистичный рендеринг</li>
                            <li>Детальная проработка материалов</li>
                            <li>Реалистичное освещение и тени</li>
                            <li>Постобработка в графических редакторах</li>
                        </ul>
                    `;
                    break;
                case '3d-2':
                    title = 'Продуктовый дизайн';
                    content = `
                        <img src="./jpg/2.jpg" alt="Продуктовый дизайн" class="img-fluid rounded mb-4">
                        <p>3D модель современного гаджета с высокой детализацией.</p>
                        <h6>Особенности проекта:</h6>
                        <ul>
                            <li>Высокополигональное моделирование</li>
                            <li>Точное соответствие техническим требованиям</li>
                            <li>Создание UV-развертки</li>
                            <li>Текстурирование и материалы</li>
                        </ul>
                    `;
                    break;
                case 'logo-1':
                    title = 'Логотип "Ключ"';
                    content = `
                        <img src="./png/Ключ.svg" alt="Логотип Ключ" class="img-fluid rounded mb-4">
                        <p>Логотип для компании по недвижимости, символизирующий надежность и решение жилищных вопросов.</p>
                        <h6>Особенности проекта:</h6>
                        <ul>
                            <li>Минималистичный дизайн</li>
                            <li>Узнаваемость и запоминаемость</li>
                            <li>Адаптивность для различных носителей</li>
                            <li>Соответствие концепции бизнеса</li>
                        </ul>
                    `;
                    break;
                default:
                    title = 'Проект';
                    content = `<p>Информация о проекте скоро будет добавлена.</p>`;
            }
            
            modalTitle.textContent = title;
            modalContent.innerHTML = content;
        });
    }

    // Инициализация tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});



// ****************************************************************

    // Переключение темы
    const themeSwitch = document.getElementById('themeSwitch');
    const htmlElement = document.documentElement;

    // Проверяем сохраненную тему в localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        htmlElement.setAttribute('data-theme', 'dark');
        themeSwitch.checked = true;
    } else {
        htmlElement.removeAttribute('data-theme');
        themeSwitch.checked = false;
    }

    // Событие переключения темы
    themeSwitch.addEventListener('change', function() {
        if (this.checked) {
            htmlElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            htmlElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        }
    });

    