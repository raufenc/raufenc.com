/* ========================================
   Birlikte İyilik Akademi — Main JS
   ======================================== */

(function () {
    'use strict';

    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    function handleScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // --- Mobile Menu Toggle ---
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function () {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('open');
        });

        // Close menu on link click
        navMenu.querySelectorAll('.navbar__link').forEach(function (link) {
            link.addEventListener('click', function () {
                navToggle.classList.remove('active');
                navMenu.classList.remove('open');
            });
        });
    }

    // --- Scroll Reveal Animations ---
    var revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(function (el) {
            observer.observe(el);
        });
    } else {
        // Fallback: show all elements
        revealElements.forEach(function (el) {
            el.classList.add('revealed');
        });
    }

    // --- Counter Up Animation ---
    var counterElements = document.querySelectorAll('[data-target]');

    function animateCounter(el) {
        var target = parseInt(el.getAttribute('data-target'), 10);
        var duration = 2000;
        var start = 0;
        var startTime = null;

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = Math.min((timestamp - startTime) / duration, 1);
            // Ease out cubic
            var eased = 1 - Math.pow(1 - progress, 3);
            var current = Math.floor(eased * target);
            el.textContent = current.toLocaleString('tr-TR');
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                el.textContent = target.toLocaleString('tr-TR');
            }
        }

        requestAnimationFrame(step);
    }

    if ('IntersectionObserver' in window && counterElements.length > 0) {
        var counterObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counterElements.forEach(function (el) {
            counterObserver.observe(el);
        });
    }

    // --- Yazılar: data.js'ten render ---
    var articlesGrid = document.getElementById('articlesGrid');
    var articlesShowAll = document.getElementById('articlesShowAll');
    var articleModal = document.getElementById('articleModal');
    var modalOverlay = document.getElementById('modalOverlay');
    var modalClose = document.getElementById('modalClose');
    var modalTitle = document.getElementById('modalTitle');
    var modalCategory = document.getElementById('modalCategory');
    var modalDate = document.getElementById('modalDate');
    var modalBody = document.getElementById('modalBody');

    var imgVariants = ['', '--2', '--3', '--4', '--5', '--6'];

    function renderArticles(limit) {
        if (!articlesGrid || typeof BIAKADEMI_YAZILAR === 'undefined') return;
        var yazilar = BIAKADEMI_YAZILAR.getAll();
        var gosterilecek = limit ? yazilar.slice(0, limit) : yazilar;
        articlesGrid.innerHTML = '';
        gosterilecek.forEach(function(yazi, i) {
            var imgClass = 'article-card__img' + (imgVariants[i % imgVariants.length]);
            var delay = (i % 3) * 0.1;
            var card = document.createElement('article');
            card.className = 'article-card reveal-up';
            card.style.cssText = '--delay:' + delay + 's; cursor:pointer;';
            card.setAttribute('data-id', yazi.id);
            card.innerHTML = '<div class="' + imgClass + '">' +
                '<div class="article-card__category">' + escapeHtml(yazi.kategori) + '</div>' +
                '</div>' +
                '<div class="article-card__body">' +
                '<span class="article-card__date">' + escapeHtml(yazi.tarihGosterim) + '</span>' +
                '<h3 class="article-card__title">' + escapeHtml(yazi.baslik) + '</h3>' +
                '<p class="article-card__excerpt">' + escapeHtml(yazi.ozet) + '</p>' +
                '<span class="article-card__read">Devamını oku &rarr;</span>' +
                '</div>';
            card.addEventListener('click', function() {
                openModal(parseInt(this.getAttribute('data-id')));
            });
            articlesGrid.appendChild(card);
        });

        // Reveal observer'a yeni kartları ekle
        if ('IntersectionObserver' in window && typeof observer !== 'undefined') {
            articlesGrid.querySelectorAll('.reveal-up').forEach(function(el) {
                observer.observe(el);
            });
        } else {
            articlesGrid.querySelectorAll('.reveal-up').forEach(function(el) {
                el.classList.add('revealed');
            });
        }

        if (articlesShowAll) {
            if (limit && yazilar.length > limit) {
                articlesShowAll.style.display = 'inline-flex';
                articlesShowAll.textContent = 'Tümünü Göster (' + yazilar.length + ')';
            } else {
                articlesShowAll.style.display = 'none';
            }
        }
    }

    function escapeHtml(str) {
        if (!str) return '';
        return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
    }

    function openModal(id) {
        var yazi = BIAKADEMI_YAZILAR.getById(id);
        if (!yazi || !articleModal) return;
        modalTitle.textContent = yazi.baslik;
        modalCategory.textContent = yazi.kategori;
        modalDate.textContent = yazi.tarihGosterim;
        modalBody.innerHTML = yazi.icerik;
        articleModal.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        if (!articleModal) return;
        articleModal.classList.remove('open');
        document.body.style.overflow = '';
    }

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeModal);
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeModal();
    });

    if (articlesShowAll) {
        articlesShowAll.addEventListener('click', function() {
            renderArticles(null);
        });
    }

    renderArticles(6);

    // --- Active Nav Link Highlight ---
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.navbar__link');

    function highlightNav() {
        var scrollY = window.scrollY + 100;
        sections.forEach(function (section) {
            var top = section.offsetTop;
            var height = section.offsetHeight;
            var id = section.getAttribute('id');
            if (scrollY >= top && scrollY < top + height) {
                navLinks.forEach(function (link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    window.addEventListener('scroll', highlightNav, { passive: true });

})();
