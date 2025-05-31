// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Get the navbar and menu elements
  const navbar = document.getElementById('navbar');
  const menuBtn = document.getElementById('menuBtn');
  const navMenu = document.getElementById('navMenu');
  const backToTopBtn = document.getElementById('backToTop');
  
  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('nav ul li a');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
      
      // Close mobile menu if open
      if (navMenu && navMenu.classList.contains('show')) {
        navMenu.classList.remove('show');
      }
    });
  });
  
  // Mobile menu toggle
  if (menuBtn && navMenu) {
    menuBtn.addEventListener('click', function() {
      navMenu.classList.toggle('show');
    });
  }
  
  // Add scroll effect to navbar and back to top button
  window.addEventListener('scroll', function() {
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
    
    // Show/hide back to top button
    if (backToTopBtn) {
      if (window.scrollY > 500) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
    
    // Add scroll animations to sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (sectionTop < windowHeight * 0.75) {
        section.classList.add('in-view');
      }
    });
  });
  
  // Back to top button functionality
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // Experience Section Accordion Functionality - Updated for new timeline
  const journeySteps = document.querySelectorAll('.journey-step');
  
  journeySteps.forEach((step, index) => {
    const preview = step.querySelector('.experience-preview');
    const expandBtn = step.querySelector('.expand-btn');
    
    if (preview && expandBtn) {
      // Add click handlers to both preview and expand button
      [preview, expandBtn].forEach(element => {
        element.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          
          // Close all other experience items
          journeySteps.forEach(otherStep => {
            if (otherStep !== step && otherStep.classList.contains('expanded')) {
              otherStep.classList.remove('expanded');
            }
          });
          
          // Toggle current item
          step.classList.toggle('expanded');
          
          // Add smooth scroll to the item if it's being expanded
          if (step.classList.contains('expanded')) {
            setTimeout(() => {
              step.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'nearest'
              });
            }, 300);
            
            // Trigger metric counter animation when expanded
            animateMetricsForItem(step);
          }
          
          // Add sound effect
          playClickSound();
        });
      });
      
      // Add keyboard accessibility
      preview.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          preview.click();
        }
      });
      
      // Make preview focusable
      preview.setAttribute('tabindex', '0');
      preview.setAttribute('role', 'button');
      preview.setAttribute('aria-label', 'Click to expand details for experience ' + (index + 1));
    }
  });
  
  // Projects Section Accordion Functionality
  const projectItems = document.querySelectorAll('.project-item');
  
  projectItems.forEach((item, index) => {
    const preview = item.querySelector('.project-preview');
    const expandBtn = item.querySelector('.project-expand-btn');
    
    if (preview && expandBtn) {
      // Add click handlers to both preview and expand button
      [preview, expandBtn].forEach(element => {
        element.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          
          // Close all other project items
          projectItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('expanded')) {
              otherItem.classList.remove('expanded');
            }
          });
          
          // Toggle current item
          item.classList.toggle('expanded');
          
          // Add smooth scroll to the item if it's being expanded
          if (item.classList.contains('expanded')) {
            setTimeout(() => {
              item.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'nearest'
              });
            }, 300);
          }
          
          // Add sound effect
          playClickSound();
        });
      });
      
      // Add keyboard accessibility
      preview.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          preview.click();
        }
      });
      
      // Make preview focusable
      preview.setAttribute('tabindex', '0');
      preview.setAttribute('role', 'button');
      preview.setAttribute('aria-label', 'Click to expand details for project ' + (index + 1));
    }
  });
  
  // Make sure project links work correctly and don't trigger expansion
  const projectLinks = document.querySelectorAll('.project-link');
  projectLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.stopPropagation(); // Prevent project expansion when clicking links
    });
  });
  
  // Enhanced skill interaction for new design
  const skillBubbles = document.querySelectorAll('.skill-bubble');
  skillBubbles.forEach(bubble => {
    bubble.addEventListener('mouseover', function() {
      this.style.transform = 'translateY(-3px) scale(1.05)';
      this.style.boxShadow = '0 8px 20px rgba(100, 255, 218, 0.4)';
      this.style.zIndex = '10';
    });
    
    bubble.addEventListener('mouseout', function() {
      this.style.transform = '';
      this.style.boxShadow = '';
      this.style.zIndex = '';
    });
    
    // Add click functionality to skill bubbles
    bubble.addEventListener('click', function() {
      // Create floating notification
      showSkillNotification(this, this.textContent);
    });
  });
  
  // Education cards 3D tilt effect (desktop only)
  if (window.innerWidth > 768) {
    const educationCards = document.querySelectorAll('.education-card');
    
    educationCards.forEach(card => {
      card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const tiltX = (y - centerY) / 30;
        const tiltY = (centerX - x) / 30;
        
        this.style.transform = 'perspective(1000px) rotateX(' + tiltX + 'deg) rotateY(' + tiltY + 'deg) scale3d(1.02, 1.02, 1.02)';
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = '';
        this.style.transition = 'all 0.5s ease';
      });
      
      card.addEventListener('mouseenter', function() {
        this.style.transition = 'none';
      });
    });
  }
  
  // Skill domain interactions
  const skillDomains = document.querySelectorAll('.skill-domain');
  
  skillDomains.forEach((domain, index) => {
    // Add staggered animation delay
    domain.style.animationDelay = (index * 0.1) + 's';
    
    // Add intersection observer for better mobile performance
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    observer.observe(domain);
    
    // Set initial state
    domain.style.opacity = '0';
    domain.style.transform = 'translateY(30px)';
    domain.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });
  
  // Optional sound effect for accordion expansion
  function playClickSound() {
    if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
      try {
        const audioContext = new (AudioContext || webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(300, audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
      } catch (error) {
        console.log('Audio context not available');
      }
    }
  }
  
  // Add typing animation to hero section
  const heroTitle = document.querySelector('.hero-section h2');
  if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      } else {
        // Add blinking cursor effect
        const cursor = document.createElement('span');
        cursor.textContent = '|';
        cursor.style.animation = 'blink 1s infinite';
        cursor.style.color = 'var(--accent-color)';
        heroTitle.appendChild(cursor);
        
        // Remove cursor after a few seconds
        setTimeout(() => {
          if (cursor.parentNode) {
            cursor.remove();
          }
        }, 3000);
      }
    };
    
    // Start typing animation after a short delay
    setTimeout(typeWriter, 1000);
  }
  
  // Add parallax effect to hero section
  const heroSection = document.querySelector('.hero-section');
  if (heroSection) {
    window.addEventListener('scroll', function() {
      const scrollPosition = window.scrollY;
      heroSection.style.backgroundPosition = 'center ' + (scrollPosition * 0.5) + 'px';
    });
  }
  
  // Skill notification system
  function showSkillNotification(element, skillName) {
    const notification = document.createElement('div');
    notification.className = 'skill-notification';
    notification.textContent = skillName + ' - Click to learn more';
    
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.background = 'var(--card-bg)';
    notification.style.color = 'var(--accent-color)';
    notification.style.padding = '12px 20px';
    notification.style.borderRadius = '8px';
    notification.style.border = '1px solid var(--accent-color)';
    notification.style.zIndex = '10000';
    notification.style.opacity = '0';
    notification.style.transform = 'translateX(100%)';
    notification.style.transition = 'all 0.3s ease';
    notification.style.fontSize = '0.9rem';
    notification.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
    notification.style.backdropFilter = 'blur(5px)';
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.style.opacity = '1';
      notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Auto remove
    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.remove();
        }
      }, 300);
    }, 3000);
  }
  
  // Add floating animation to profile photo
  const profileContainer = document.querySelector('.profile-container');
  if (profileContainer) {
    let floatValue = 0;
    let floatDirection = 1;
    
    const floatAnimation = () => {
      floatValue += 0.05 * floatDirection;
      
      if (floatValue >= 5) floatDirection = -1;
      if (floatValue <= 0) floatDirection = 1;
      
      profileContainer.style.transform = 'translateY(' + floatValue + 'px)';
      requestAnimationFrame(floatAnimation);
    };
    
    // Start the floating animation
    floatAnimation();
  }
  
  // Add glowing effect to accent elements on mouse movement
  document.addEventListener('mousemove', function(e) {
    const accentElements = document.querySelectorAll('.btn, .skill-bubble, .social-icons a, .metric-card');
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    accentElements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const elementX = rect.left + rect.width / 2;
      const elementY = rect.top + rect.height / 2;
      
      const distance = Math.sqrt(
        Math.pow(mouseX - elementX, 2) + 
        Math.pow(mouseY - elementY, 2)
      );
      
      // Add glow effect when mouse is close to element
      if (distance < 200) {
        const intensity = 1 - distance / 200;
        element.style.boxShadow = '0 0 ' + (intensity * 20) + 'px rgba(100, 255, 218, ' + (intensity * 0.5) + ')';
      } else {
        // Only reset if no hover state
        if (!element.matches(':hover')) {
          element.style.boxShadow = '';
        }
      }
    });
  });
  
  // Add interactive particles background to hero section
  const createParticles = () => {
    if (!document.querySelector('.hero-section')) return;
    
    const heroSection = document.querySelector('.hero-section');
    
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    particlesContainer.style.position = 'absolute';
    particlesContainer.style.top = '0';
    particlesContainer.style.left = '0';
    particlesContainer.style.width = '100%';
    particlesContainer.style.height = '100%';
    particlesContainer.style.overflow = 'hidden';
    particlesContainer.style.zIndex = '0';
    
    heroSection.prepend(particlesContainer);
    
    // Create particles with different sizes and animations
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Random size between 1px and 6px
      const size = Math.random() * 5 + 1;
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      
      // Random position
      particle.style.top = (Math.random() * 100) + '%';
      particle.style.left = (Math.random() * 100) + '%';
      
      // Random opacity
      particle.style.opacity = Math.random() * 0.5;
      
      // Random animation duration and delay
      const duration = Math.random() * 20 + 20;
      const delay = Math.random() * 10;
      particle.style.animation = 'floatParticle ' + duration + 's ease-in-out ' + delay + 's infinite';
      
      particlesContainer.appendChild(particle);
    }
  };
  
  // Call the function to create particles
  setTimeout(createParticles, 500);
  
  // Add metric counter animation for specific experience item
  function animateMetricsForItem(experienceItem) {
    const metricValues = experienceItem.querySelectorAll('.metric-value');
    
    metricValues.forEach(target => {
      const finalValue = target.textContent;
      const isPercentage = finalValue.includes('%');
      const isTime = finalValue.includes('min') || finalValue.includes('hrs');
      const isData = finalValue.includes('TB') || finalValue.includes('K');
      const isDecimal = finalValue.includes('.');
      
      let numericValue;
      if (isDecimal) {
        // Handle decimal values like "99.2%"
        numericValue = parseFloat(finalValue.replace(/[^\d.]/g, ''));
      } else {
        numericValue = parseInt(finalValue.replace(/[^\d]/g, ''));
      }
      
      if (isNaN(numericValue)) return;
      
      let currentValue = 0;
      const increment = isDecimal ? (numericValue / 50) : Math.ceil(numericValue / 30);
      const duration = 2000; // 2 seconds
      const stepTime = duration / (numericValue / increment);
      
      const counter = setInterval(() => {
        currentValue += increment;
        if (currentValue >= numericValue) {
          currentValue = numericValue;
          clearInterval(counter);
        }
        
        let displayValue;
        if (isDecimal) {
          displayValue = currentValue.toFixed(1);
        } else {
          displayValue = Math.round(currentValue).toString();
        }
        
        if (isPercentage) displayValue += '%';
        else if (isTime && finalValue.includes('min')) displayValue += 'min';
        else if (isTime && finalValue.includes('hrs')) displayValue += 'hrs';
        else if (isData && finalValue.includes('TB')) displayValue += 'TB+';
        else if (isData && finalValue.includes('K')) displayValue += 'K+';
        
        target.textContent = displayValue;
      }, stepTime);
    });
  }
  
  // Enhanced mobile menu handling
  document.addEventListener('click', function(e) {
    if (navMenu && navMenu.classList.contains('show') && !navMenu.contains(e.target) && !menuBtn.contains(e.target)) {
      navMenu.classList.remove('show');
    }
  });
  
  // Add touch support for mobile interactions
  if ('ontouchstart' in window) {
    // Add touch-friendly interactions for mobile devices
    const touchElements = document.querySelectorAll('.skill-bubble, .education-card, .project-item, .journey-step');
    
    touchElements.forEach(element => {
      element.addEventListener('touchstart', function() {
        this.style.transform = 'scale(0.98)';
      });
      
      element.addEventListener('touchend', function() {
        this.style.transform = '';
      });
    });
  }
  
  // Add CSS for additional animations and mobile improvements
  const style = document.createElement('style');
  style.textContent = `
    @keyframes blink {
      0%, 50% { opacity: 1; }
      51%, 100% { opacity: 0; }
    }
    
    .skill-notification {
      backdrop-filter: blur(5px);
    }
    
    .experience-preview, .project-preview {
      transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
    }
    
    .metric-card {
      cursor: pointer;
    }
    
    .achievement-item {
      cursor: default;
      transition: all 0.3s ease;
    }
    
    .experience-details, .project-details {
      transition: max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1), 
                  opacity 0.3s ease 0.2s,
                  padding 0.5s ease;
    }
    
    .expand-btn:hover, .project-expand-btn:hover {
      background: rgba(100, 255, 218, 0.2);
      transform: scale(1.1);
    }
    
    .step-dot {
      transition: all 0.3s ease;
    }
    
    .journey-step:hover .step-dot {
      transform: scale(1.2);
      box-shadow: 0 0 0 6px var(--accent-color), 0 0 30px rgba(100, 255, 218, 0.8);
    }
    
    .step-year:hover {
      transform: scale(1.05);
      box-shadow: 0 15px 30px rgba(100, 255, 218, 0.6);
    }
    
    @media (max-width: 768px) {
      .step-year:hover {
        transform: scale(1.02);
        box-shadow: 0 10px 20px rgba(100, 255, 218, 0.4);
      }
      
      .journey-step:hover .step-dot {
        transform: scale(1.1);
        box-shadow: 0 0 0 4px var(--accent-color), 0 0 20px rgba(100, 255, 218, 0.6);
      }
      
      .skill-bubble:hover {
        transform: translateY(-2px) scale(1.03);
      }
      
      .education-card:hover {
        transform: translateY(-5px) scale(1.01);
      }
      
      .project-item:hover {
        transform: translateY(-3px);
      }
    }
    
    @media (hover: none) and (pointer: coarse) {
      .skill-bubble:hover,
      .education-card:hover,
      .project-item:hover,
      .journey-step:hover,
      .metric-card:hover {
        transform: none;
      }
      
      .skill-bubble:active {
        transform: scale(0.95);
        background: var(--accent-color);
        color: var(--primary-bg);
      }
      
      .experience-preview:active,
      .project-preview:active {
        transform: scale(0.98);
      }
    }
  `;
  document.head.appendChild(style);
  
  console.log('🚀 Enhanced Portfolio loaded successfully with new stepped timeline design!');
});