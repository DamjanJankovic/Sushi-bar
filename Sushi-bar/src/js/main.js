/* slick slider */
$(document).ready(function () {
    $('.slides').slick({
        dots: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        speed: 1000
    });
});

/* remove sroll from bg */
$(document).ready(function () {
    $('.mobile-nav').on('click', function () {
        $('body').hasClass('lock-scroll') ? $('body').removeClass('lock-scroll') : $('body').addClass('lock-scroll'); //if-else
    });
});

/* mobile nav */
const tabNav = {
    nav: document.getElementsByClassName("header__item"),
    links: document.getElementsByClassName('.header__link'),
    mobNav: document.querySelector('.mobile-nav'),
    listNav: document.querySelector('.header__list'),
    menuOpen: false,

    init: function () {
        this.bindEvents();
    },

    bindEvents: function () {
        this.mobNav.addEventListener('click', () => {
            this.listNav.classList.toggle('header__list--active');

            if (!this.menuOpen) {
                this.mobNav.classList.add('open');
                this.menuOpen = true;
            } else {
                this.mobNav.classList.remove('open');
                this.menuOpen = false;
            }
        });
    }
};

tabNav.init();