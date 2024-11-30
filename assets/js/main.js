/**
* Template Name: Mentor - v4.8.1
* Template URL: https://bootstrapmade.com/mentor-free-education-bootstrap-theme/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener);
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top');
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active');
      } else {
        backtotop.classList.remove('active');
      }
    }
    window.addEventListener('load', toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile');
    this.classList.toggle('bi-list');
    this.classList.toggle('bi-x');
  });

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault();
      this.nextElementSibling.classList.toggle('dropdown-active');
    }
  }, true);

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },
      1200: {
        slidesPerView: 2,
        spaceBetween: 20
      }
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})();

// Custom form submission with Fetch API
document.querySelector('.php-email-form').addEventListener('submit', function(e) {
  e.preventDefault(); // Prevent default form submission to allow custom handling
  
  var form = e.target;
  var actionUrl = form.action; // URL to submit form data (FormSubmit or Email service URL)
  
  var formData = new FormData(form); // Collect form data

  // Show loading message
  const loadingMessage = document.querySelector('.loading');
  const successMessage = document.querySelector('.sent-message');
  const errorMessage = document.querySelector('.error-message');
  
  loadingMessage.style.display = 'block';
  successMessage.style.display = 'none';  // Hide success message initially
  errorMessage.style.display = 'none';  // Hide error message initially

  // Send data via fetch API
  fetch(actionUrl, {
    method: 'POST',
    body: formData
  })
  .then(function(response) {
    if (response.ok) {
      // Success: Show thank you message
      successMessage.style.display = 'block';
    } else {
      // Error: Show error message
      errorMessage.style.display = 'block';
    }
    loadingMessage.style.display = 'none'; // Hide loading spinner
  })
  .catch(function(error) {
    // Network error: Show error message
    errorMessage.style.display = 'block';
    loadingMessage.style.display = 'none';
  });
});
