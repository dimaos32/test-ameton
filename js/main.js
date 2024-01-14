const breakpoint575 = window.matchMedia('(max-width: 575px)');
const breakpoint767 = window.matchMedia('(max-width: 767px)');
const breakpoint991 = window.matchMedia('(max-width: 991px)');
const breakpoint1279 = window.matchMedia('(max-width: 1279px)');

const faqSliders = document.querySelectorAll('.faq__inner');

faqSliders.forEach((faqSlider) => {
  const btnPrev = faqSlider.querySelector('.faq__btn--prev');
  const btnNext = faqSlider.querySelector('.faq__btn--next');

  let swiper;

  const initSwiper = () => {
    const swiper = new Swiper(faqSlider, {
      slidesPerView: 'auto',
      spaceBetween: 6,
      grabCursor: true,
      mousewheel: {
        forceToAxis: true,
      },
      keyboard: true,
      navigation: {
        prevEl: btnPrev,
        nextEl: btnNext,
      },
      breakpoints: {
        414: {
          spaceBetween: 8,
        },
        576: {
          spaceBetween: 12,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 16,
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1280: {
          slidesPerView: 4,
          spaceBetween: 24,
        },
      },
    });
  };

  const reInitSwiper = () => {
    if (swiper) {
      swiper.destroy(true, true);
    }

    initSwiper();
  };

  breakpoint575.addListener(reInitSwiper);
  breakpoint767.addListener(reInitSwiper);
  breakpoint991.addListener(reInitSwiper);
  breakpoint1279.addListener(reInitSwiper);
});
