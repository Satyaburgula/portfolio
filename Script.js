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
  
  // Handle Experience cards with click to show details
  const experienceCards = document.querySelectorAll('.experience-card');
  const experienceDetailsContainer = document.getElementById('experienceDetailsContainer');
  
  experienceCards.forEach(card => {
    // Remove any hover effects, now only click will trigger
    card.addEventListener('click', function() {
      const title = this.querySelector('.experience-front h3').textContent;
      const company = this.querySelector('.experience-front p:nth-of-type(1)').textContent;
      const period = this.querySelector('.experience-front p:nth-of-type(2)').textContent;
      const detailPoints = Array.from(this.querySelectorAll('.experience-back p')).map(p => p.innerHTML);
      
      // Show experience details
      if (experienceDetailsContainer) {
        // Create details content
        experienceDetailsContainer.innerHTML = `
          <div class="experience-details-card">
            <div class="details-header">
              <h3>${title}</h3>
              <p>${company}</p>
              <p>${period}</p>
              <button class="close-details"><i class="fas fa-times"></i></button>
            </div>
            <div class="details-content">
              ${detailPoints.map(point => `<p>${point}</p>`).join('')}
            </div>
          </div>
        `;
        
        experienceDetailsContainer.classList.add('show');
        
        // Add close button functionality
        const closeBtn = experienceDetailsContainer.querySelector('.close-details');
        if (closeBtn) {
          closeBtn.addEventListener('click', function() {
            experienceDetailsContainer.classList.remove('show');
          });
        }
      }
    });
  });
  
  // Handle Project cards with click to flip
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    // Remove any hover effects, now only click will trigger
    card.addEventListener('click', function(e) {
      // Don't flip if clicking on GitHub or external links
      if (e.target.closest('.project-links')) {
        e.stopPropagation();
        return;
      }
      
      // Toggle flip class
      this.classList.toggle('is-flipped');
    });
  });
  
  // Make sure GitHub links work correctly in project cards
  const projectLinks = document.querySelectorAll('.project-links a');
  projectLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.stopPropagation(); // Prevent card flip when clicking links
    });
  });
  
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
      heroSection.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
    });
  }
  
  // Skill tags hover animation
  const skillTags = document.querySelectorAll('.skill-list span');
  skillTags.forEach(tag => {
    tag.addEventListener('mouseover', function() {
      this.style.transform = 'translateY(-5px) scale(1.1)';
      this.style.boxShadow = '0 5px 15px rgba(100, 255, 218, 0.3)';
    });
    
    tag.addEventListener('mouseout', function() {
      this.style.transform = '';
      this.style.boxShadow = '';
    });
  });
  
  // Create staggered animation for skill categories
  const skillCategories = document.querySelectorAll('.skill-category');
  if (skillCategories.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Add animation with staggered delay based on index
          entry.target.style.animationDelay = `${index * 0.1}s`;
          entry.target.style.opacity = 1;
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    skillCategories.forEach((category) => {
      observer.observe(category);
      // Set initial state for animation
      category.style.opacity = 0;
      category.style.transform = 'translateY(30px)';
      category.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
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
      
      profileContainer.style.transform = `translateY(${floatValue}px)`;
      requestAnimationFrame(floatAnimation);
    };
    
    // Start the floating animation
    floatAnimation();
  }
  
  // Add glowing effect to accent elements on mouse movement
  document.addEventListener('mousemove', function(e) {
    const accentElements = document.querySelectorAll('.btn, .skill-list span, .social-icons a');
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
        element.style.boxShadow = `0 0 ${intensity * 20}px rgba(100, 255, 218, ${intensity * 0.5})`;
      } else {
        element.style.boxShadow = '';
      }
    });
  });
  
  // Add special effects to flip hints
  const experienceFlipHints = document.querySelectorAll('.experience-card .flip-hint');
  experienceFlipHints.forEach(hint => {
    const icon = hint.querySelector('i');
    if (icon) {
      // Update the icon for click instead of hover
      icon.classList.remove('fa-sync-alt');
      icon.classList.add('fa-chevron-right');
    }
  });
  
  const projectFlipHints = document.querySelectorAll('.project-card .flip-hint');
  projectFlipHints.forEach(hint => {
    // Change icon to indicate click action
    const icon = hint.querySelector('i');
    if (icon) {
      icon.classList.remove('fa-info-circle');
      icon.classList.add('fa-chevron-up');
      // Apply pulse animation
      icon.style.animationName = 'pulse';
      icon.style.animationDuration = '2s';
    }
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
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Random position
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.left = `${Math.random() * 100}%`;
      
      // Random opacity
      particle.style.opacity = Math.random() * 0.5;
      
      // Random animation duration and delay
      const duration = Math.random() * 20 + 20;
      const delay = Math.random() * 10;
      particle.style.animation = `floatParticle ${duration}s ease-in-out ${delay}s infinite`;
      
      particlesContainer.appendChild(particle);
    }
  };
  
  // Call the function to create particles
  setTimeout(createParticles, 500);
  
  // Add 3D tilt effect to education cards (desktop only)
  if (window.innerWidth > 768) {
    const tiltableCards = document.querySelectorAll('.education-card');
    
    tiltableCards.forEach(card => {
      card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const tiltX = (y - centerY) / 20;
        const tiltY = (centerX - x) / 20;
        
        this.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = '';
        this.style.transition = 'all 0.5s ease';
      });
    });
  }
  
  // Close experience details when clicking outside
  document.addEventListener('click', function(e) {
    const experienceDetailsContainer = document.getElementById('experienceDetailsContainer');
    if (experienceDetailsContainer && experienceDetailsContainer.classList.contains('show')) {
      if (!e.target.closest('.experience-details-card') && !e.target.closest('.experience-card')) {
        experienceDetailsContainer.classList.remove('show');
      }
    }
  });
});