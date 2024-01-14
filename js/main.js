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

  initSwiper();

  breakpoint575.addListener(reInitSwiper);
  breakpoint767.addListener(reInitSwiper);
  breakpoint991.addListener(reInitSwiper);
  breakpoint1279.addListener(reInitSwiper);
});

class Accordions {
  constructor() {
    this._openHeight = 0;
    this._windowWidth = window.innerWidth;
    this._documentClickHandler = this._documentClickHandler.bind(this);
    this._windowResizeHandler = this._windowResizeHandler.bind(this);
    this._init();
  }

  _init() {
    this.fullUpdate();
    document.addEventListener('click', this._documentClickHandler);
    window.addEventListener('resize', this._windowResizeHandler);
  }

  _documentClickHandler(evt) {
    const target = evt.target;
    if (!target.closest('[data-accordion="button"]')) {
      return;
    }

    evt.preventDefault();
    const parent = target.closest('[data-accordion="parent"]');

    if (
      parent.dataset.destroy &&
      !window.matchMedia(parent.dataset.destroy).matches
    ) {
      return;
    }

    const element = target.closest('[data-accordion="element"]');
    if (element.classList.contains('is-active')) {
      this.closeAccordion(element);
      return;
    }
    this.openAccordion(element);
  }

  _windowResizeHandler() {
    if (this._windowWidth === window.innerWidth) {
      return;
    }
    this._windowWidth = window.innerWidth;
    this.updateAccordionsHeight();
  }

  closeAllAccordion(parent) {
    const elements = parent.querySelectorAll('[data-accordion="element"]');
    elements.forEach((element) => {
      const currentParent = element.closest('[data-accordion="parent"]');
      if (currentParent === parent) {
        this.closeAccordion(element);
      }
    });
  }

  updateAccordionsHeight(element = null) {
    if (element) {
      const content = element.querySelector('[data-accordion="content"]');
      content.style.transition = 'none';
      content.style.maxHeight = `${content.scrollHeight}px`;
      setTimeout(() => {
        content.style.transition = null;
      });
      return;
    }

    const closeElements = document.querySelectorAll(
      '[data-accordion="element"]:not(.is-active)'
    );

    closeElements.forEach((closeElement) => {
      const parent = closeElement.closest('[data-accordion="parent"]');
      const content = closeElement.querySelector('[data-accordion="content"]');
      if (
        parent.dataset.destroy &&
        !window.matchMedia(parent.dataset.destroy).matches
      ) {
        content.style.maxHeight = '100%';
        return;
      }
      content.style.maxHeight = null;
    });

    const openElements = document.querySelectorAll(
      '[data-accordion="element"].is-active'
    );
    openElements.forEach((openElement) => {
      const content = openElement.querySelector('[data-accordion="content"]');
      const parent = openElement.closest('[data-accordion="parent"]');
      if (
        parent.dataset.destroy &&
        !window.matchMedia(parent.dataset.destroy).matches
      ) {
        content.style.maxHeight = '100%';
        return;
      }
      content.style.transition = 'none';
      content.style.maxHeight = `${content.scrollHeight}px`;
      setTimeout(() => {
        content.style.transition = null;
      });
    });
  }

  fullUpdate(parent = null, transition = false) {
    let openElements;
    if (parent) {
      openElements = parent.querySelectorAll(
        '[data-accordion="element"].is-active'
      );
    } else {
      openElements = document.querySelectorAll(
        '[data-accordion="element"].is-active'
      );
    }
    openElements.forEach((openElement) => {
      const innerParent = openElement.querySelector(
        '[data-accordion="parent"]'
      );
      if (innerParent) {
        return;
      }
      this.openAccordion(openElement, transition);
    });
    this.updateAccordionsHeight();
  }

  openAccordion(element, transition = true) {
    const parentElement = element.closest('[data-accordion="parent"]');
    const contentElement = element.querySelector('[data-accordion="content"]');
    this._openHeight += contentElement.scrollHeight;

    if (parentElement.hasAttribute('data-single')) {
      this.closeAllAccordion(parentElement);
    }

    element.classList.add('is-active');
    if (transition) {
      contentElement.style.maxHeight = `${this._openHeight}px`;
    } else {
      contentElement.style.transition = 'none';
      contentElement.style.maxHeight = `${this._openHeight}px`;
      setTimeout(() => {
        contentElement.style.transition = null;
      });
    }

    if (parentElement.closest('[data-accordion="element"]')) {
      this.openAccordion(
        parentElement.closest('[data-accordion="element"]'),
        transition
      );
      return;
    }

    this._openHeight = 0;
  }

  closeAccordion(element, transition = true) {
    const contentElement = element.querySelector('[data-accordion="content"]');
    if (!contentElement) {
      return;
    }
    element.classList.remove('is-active');
    if (transition) {
      contentElement.style.maxHeight = '0';
    } else {
      contentElement.style.transition = 'none';
      contentElement.style.maxHeight = '0';
      setTimeout(() => {
        contentElement.style.transition = null;
      });
    }
  }
}

let accordions;

const initAccordions = () => {
  accordions = new Accordions();

  window.accordions = accordions;
};

initAccordions();
