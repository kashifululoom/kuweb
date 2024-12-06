(function() {
  "use strict";

  // Easy selector helper function
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  }

  // Easy event listener function
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

  // Back to top button functionality
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
    window.addEventListener('scroll', toggleBacktotop);
  }

  // Mobile navigation toggle
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile');
    this.classList.toggle('bi-list');
    this.classList.toggle('bi-x');
  });

  // Preloader functionality
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  // Testimonials slider
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

  // Animation on scroll
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  });

  // Initiate Pure Counter
  new PureCounter();
})();

// Custom form submission with Fetch API and Google reCAPTCHA
document.querySelector('.php-email-form').addEventListener('submit', function(e) {
  e.preventDefault(); // Prevent default form submission to allow custom handling
  
  var form = e.target;
  var actionUrl = form.action; // URL to submit form data (FormSubmit or Email service URL)
  
  var formData = new FormData(form); // Collect form data
  
  // Get the reCAPTCHA response
  var recaptchaResponse = grecaptcha.getResponse();
  
  // If reCAPTCHA is not completed
  if (recaptchaResponse.length === 0) {
    alert('Please complete the reCAPTCHA');
    return; // Stop form submission
  }

  // Append the reCAPTCHA response to form data
  formData.append('g-recaptcha-response', recaptchaResponse);
  
  // Show loading message and hide success message
  const loadingMessage = document.querySelector('.loading');
  const successMessage = document.querySelector('.sent-message');
  
  loadingMessage.style.display = 'block';
  successMessage.style.display = 'none';  // Hide success message initially

  // Send data via fetch API
  fetch(actionUrl, {
    method: 'POST',
    body: formData
  })
  .then(function(response) {
    if (response.ok) {
      // Success: Show thank you message
      successMessage.style.display = 'block';
    }
    loadingMessage.style.display = 'none'; // Hide loading spinner
  })
  .catch(function(error) {
    loadingMessage.style.display = 'none'; // Hide loading spinner in case of an error
  });
});
