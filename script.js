/* ==========================================================================
   Sharon Make Up Lounge - Interactive Functionality Script
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. Sticky Navigation & Header Transitions
     ========================================================================== */
  const header = document.querySelector('header');
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial check on load

  /* ==========================================================================
     2. Hamburger Menu Toggle (Mobile Drawer Navigation)
     ========================================================================== */
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  const mobileNavLinks = mobileNav.querySelectorAll('a');

  const toggleMenu = () => {
    hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  };

  hamburger.addEventListener('click', toggleMenu);

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileNav.classList.contains('open')) {
        toggleMenu();
      }
    });
  });

  /* ==========================================================================
     3. Auto-play Hero Banner Slider
     ========================================================================== */
  const slides = document.querySelectorAll('.slide');
  const nextSlideBtn = document.getElementById('nextSlide');
  const prevSlideBtn = document.getElementById('prevSlide');
  let currentSlide = 0;
  let slideInterval;

  const showSlide = (index) => {
    slides.forEach(slide => slide.classList.remove('active'));
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
  };

  const nextSlide = () => {
    showSlide(currentSlide + 1);
  };

  const prevSlide = () => {
    showSlide(currentSlide - 1);
  };

  const startSlideShow = () => {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000);
  };

  if (slides.length > 0) {
    showSlide(currentSlide);
    startSlideShow();

    nextSlideBtn.addEventListener('click', () => {
      nextSlide();
      startSlideShow();
    });

    prevSlideBtn.addEventListener('click', () => {
      prevSlide();
      startSlideShow();
    });
  }

  /* ==========================================================================
     4. Interactive Product Grid Category Filter
     ========================================================================== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Set active button style
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.classList.remove('hide');
          // Re-trigger animation on reveal
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
        } else {
          item.classList.add('hide');
        }
      });
    });
  });

  /* ==========================================================================
     5. Reels Scroll Navigation & Hover Video Playback
     ========================================================================== */
  const reelsWrapper = document.getElementById('reelsWrapper');
  const nextReelBtn = document.getElementById('nextReel');
  const prevReelBtn = document.getElementById('prevReel');

  if (reelsWrapper) {
    nextReelBtn.addEventListener('click', () => {
      reelsWrapper.scrollBy({ left: 280, behavior: 'smooth' });
    });

    prevReelBtn.addEventListener('click', () => {
      reelsWrapper.scrollBy({ left: -280, behavior: 'smooth' });
    });

    // Muted autoplay preview on hover for videos inside reels
    const reelVideos = document.querySelectorAll('.reel-video-container video');
    
    reelVideos.forEach(video => {
      const parentCard = video.closest('.reel-card');
      
      parentCard.addEventListener('mouseenter', () => {
        video.play().catch(error => {
          // Auto-play block handling
          console.log("Auto-play prevented or video empty:", error);
        });
      });

      parentCard.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0;
      });
    });
  }

  /* ==========================================================================
     6. Testimonials Autoplay Carousel
     ========================================================================== */
  const testimonialsWrapper = document.getElementById('testimonialsWrapper');
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const testimonialDotsContainer = document.getElementById('testimonialDots');
  let currentTestimonial = 0;
  let testimonialInterval;

  if (testimonialCards.length > 0) {
    // Generate dots dynamically
    testimonialCards.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.classList.add('dot');
      if (index === 0) dot.classList.add('active');
      dot.setAttribute('aria-label', `Go to testimonial slide ${index + 1}`);
      dot.addEventListener('click', () => {
        goToTestimonial(index);
        startTestimonialShow();
      });
      testimonialDotsContainer.appendChild(dot);
    });

    const dots = testimonialDotsContainer.querySelectorAll('.dot');

    const goToTestimonial = (index) => {
      currentTestimonial = index;
      testimonialsWrapper.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((dot, idx) => {
        if (idx === index) dot.classList.add('active');
        else dot.classList.remove('active');
      });
    };

    const nextTestimonial = () => {
      let nextIndex = (currentTestimonial + 1) % testimonialCards.length;
      goToTestimonial(nextIndex);
    };

    const startTestimonialShow = () => {
      clearInterval(testimonialInterval);
      testimonialInterval = setInterval(nextTestimonial, 6000);
    };

    startTestimonialShow();
  }

  /* ==========================================================================
     7. Lightbox System (Popup modal for images and videos)
     ========================================================================== */
  const lightbox = document.getElementById('lightboxModal');
  const lightboxBody = lightbox.querySelector('.lightbox-body');
  const lightboxCaption = lightbox.querySelector('.lightbox-caption');
  const lightboxClose = lightbox.querySelector('.lightbox-close-btn');

  // Trigger elements (Product grid and Reels)
  const triggers = document.querySelectorAll('.gallery-item, .reel-card');

  const openLightbox = (mediaElement, titleText, isVideo) => {
    lightboxBody.innerHTML = ''; // Clear previous content
    
    if (isVideo) {
      const videoSrc = mediaElement.querySelector('video') ? mediaElement.querySelector('video').src : '';
      const videoElement = document.createElement('video');
      videoElement.src = videoSrc || 'https://www.w3schools.com/html/mov_bbb.mp4'; // Use nice video placeholder
      videoElement.controls = true;
      videoElement.autoplay = true;
      videoElement.muted = false;
      videoElement.style.maxWidth = '100%';
      videoElement.style.maxHeight = '80vh';
      lightboxBody.appendChild(videoElement);
    } else {
      const imgSrc = mediaElement.querySelector('img') ? mediaElement.querySelector('img').src : '';
      const imgElement = document.createElement('img');
      imgElement.src = imgSrc;
      imgElement.alt = titleText;
      imgElement.style.maxWidth = '100%';
      imgElement.style.maxHeight = '80vh';
      lightboxBody.appendChild(imgElement);
    }

    lightboxCaption.textContent = titleText;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
    lightboxClose.focus();
  };

  const closeLightbox = () => {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    // Pause any playing video in lightbox body by clearing it
    lightboxBody.innerHTML = '';
  };

  triggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      // Prevent action if clicked specifically on layout buttons (if any inside items)
      if (e.target.closest('.social-icon-btn')) return;

      const isVideo = trigger.hasAttribute('data-video') || trigger.querySelector('video') !== null;
      let title = '';
      
      if (trigger.querySelector('h3')) {
        title = trigger.querySelector('h3').textContent;
      } else if (trigger.querySelector('h4')) {
        title = trigger.querySelector('h4').textContent;
      } else {
        title = 'Sharon Make Up Lounge';
      }

      openLightbox(trigger, title, isVideo);
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);
  
  // Close on backdrop click
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-body') || e.target.classList.contains('lightbox-content-wrapper')) {
      closeLightbox();
    }
  });

  // Close on Escape Key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) {
      closeLightbox();
    }
  });

  /* ==========================================================================
     8. Scroll Entrance Animations (Reveal Observer)
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Stop observing once animated to avoid re-triggering during minor scrolls
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null, // viewport
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });

  /* ==========================================================================
     9. Interactive Contact Form Submission Handle
     ========================================================================== */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('name').value;
      const whatsappVal = document.getElementById('whatsappNum').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;
      
      const submitBtn = contactForm.querySelector('.submit-btn');
      const originalText = submitBtn.textContent;
      
      submitBtn.textContent = 'Opening WhatsApp...';
      submitBtn.disabled = true;

      const text = `Hello Sharon Make Up Lounge,\n\nI would like to inquire about the following details:\n\n*Name*: ${name}\n*Client WhatsApp/Phone*: ${whatsappVal}\n*Subject*: ${subject}\n*Message*: ${message}`;
      const encodedText = encodeURIComponent(text);
      const whatsappUrl = `https://wa.me/919925027523?text=${encodedText}`;

      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
        
        submitBtn.textContent = 'Sent via WhatsApp!';
        submitBtn.style.background = 'linear-gradient(135deg, #28a745 0%, #218838 100%)';
        submitBtn.style.color = '#ffffff';
        
        contactForm.reset();
        
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.style.background = '';
          submitBtn.style.color = '';
          submitBtn.disabled = false;
        }, 3000);
      }, 1000);
    });
  }

  /* ==========================================================================
     10. Newsletter Form WhatsApp Redirect
     ========================================================================== */
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const phone = document.getElementById('newsletterPhone').value;
      const text = `Hello Sharon Make Up Lounge,\n\nPlease subscribe me to updates, styling tips, and secret drops!\n\n*My WhatsApp*: ${phone}`;
      const encodedText = encodeURIComponent(text);
      const whatsappUrl = `https://wa.me/919925027523?text=${encodedText}`;
      
      window.open(whatsappUrl, '_blank');
      alert('Subscribed successfully!');
      newsletterForm.reset();
    });
  }

});
