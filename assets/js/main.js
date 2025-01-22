(function() {
  "use strict";

  // Easy selector helper function
  const select = (el, all = false) => {
    el = el.trim();
    return all ? [...document.querySelectorAll(el)] : document.querySelector(el);
  }

  // Easy event listener function
  const on = (type, el, listener, all = false) => {
    const selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  }

  // Back to top button
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

  // Mobile nav toggle
  on('click', '.mobile-nav-toggle', function() {
    select('#navbar').classList.toggle('navbar-mobile');
    this.classList.toggle('bi-list');
    this.classList.toggle('bi-x');
  });

  // Preloader
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
  e.preventDefault(); // Prevent default form submission

  const form = e.target;
  const actionUrl = form.action; // URL to submit form data
  const formData = new FormData(form); // Collect form data

  // Show loading message
  const loadingMessage = document.querySelector('.loading');
  const successMessage = document.querySelector('.sent-message');
  const errorMessage = document.querySelector('.error-message');

  loadingMessage.style.display = 'block';
  successMessage.style.display = 'none';
  errorMessage.style.display = 'none';

  // Send data via fetch API
  fetch(actionUrl, {
    method: 'POST',
    body: formData
  })
  .then(response => {
    if (response.ok) {
      successMessage.style.display = 'block';
    } else {
      errorMessage.style.display = 'block';
    }
    loadingMessage.style.display = 'none'; // Hide loading spinner
  })
  .catch(error => {
    errorMessage.style.display = 'block';
    loadingMessage.style.display = 'none';
  });
});

// Google Pay Button
document.addEventListener('DOMContentLoaded', function() {
  const gpayButton = document.getElementById('gpaybtn');
  if (gpayButton) {
    gpayButton.addEventListener('click', function(event) {
      event.preventDefault();
      payWithUPI();
    });
  } else {
    console.error('Button with ID "gpaybtn" not found!');
  }
});

// Pay with UPI function
const payWithUPI = () => {
  const upiLink = "upi://pay?pa=9427705810@ibl&pn=YourName&mc=1234&tid=abcd1234&url=https://example.com";

  if (navigator.userAgent.match(/Android|iPhone|iPad|iPod/i)) {
    window.location.href = upiLink;
  } else {
    const googlePayLink = "https://pay.google.com/gp/p/ui/pay?pa=9427705810@ibl";
    window.location.href = googlePayLink; // Redirect to Google Pay on desktop
  }
};
