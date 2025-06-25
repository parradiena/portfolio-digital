// Custom JavaScript for Portfolio

document.addEventListener("DOMContentLoaded", () => {
  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll(".smooth-scroll, .nav-custom")

  // Enhanced smooth scrolling with offset for fixed navbar
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const navbarHeight = document.querySelector(".navbar").offsetHeight
        const offsetTop = targetSection.offsetTop - navbarHeight

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })

  // Active navigation highlighting
  const sections = document.querySelectorAll("section[id]")
  const navItems = document.querySelectorAll(".nav-custom")

  // Enhanced Active navigation highlighting
  function updateActiveNav() {
    let current = ""
    const scrollPosition = window.pageYOffset + 100

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute("id")
      }
    })

    navItems.forEach((item) => {
      item.classList.remove("active")
      if (item.getAttribute("href") === `#${current}`) {
        item.classList.add("active")
      }
    })
  }

  // Update active nav on scroll
  window.addEventListener("scroll", updateActiveNav)

  // Initial call to set active nav
  updateActiveNav()

  // Gallery functionality
  // Enhanced Gallery with auto-slide and pause on hover
  let currentSlide = 0
  const slides = document.querySelectorAll(".gallery-slide")
  const indicators = document.querySelectorAll(".indicator")
  const totalSlides = slides.length
  let autoSlideInterval

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove("active")
      if (indicators[i]) indicators[i].classList.remove("active")
    })

    if (slides[index]) {
      slides[index].classList.add("active")
      if (indicators[index]) indicators[index].classList.add("active")
    }
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides
    showSlide(currentSlide)
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides
    showSlide(currentSlide)
  }

  function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 4000)
  }

  function stopAutoSlide() {
    clearInterval(autoSlideInterval)
  }

  // Initialize gallery if slides exist
  if (slides.length > 0) {
    showSlide(0)
    startAutoSlide()

    // Pause on hover
    const galleryContainer = document.querySelector(".gallery-container")
    if (galleryContainer) {
      galleryContainer.addEventListener("mouseenter", stopAutoSlide)
      galleryContainer.addEventListener("mouseleave", startAutoSlide)
    }
  }

  // Global functions for manual controls
  window.changeSlide = (direction) => {
    stopAutoSlide()
    if (direction === 1) {
      nextSlide()
    } else {
      prevSlide()
    }
    startAutoSlide()
  }

  window.currentSlide = (index) => {
    stopAutoSlide()
    currentSlide = index - 1
    showSlide(currentSlide)
    startAutoSlide()
  }

  // Fade in animation for elements
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
      }
    })
  }, observerOptions)

  // Add fade-in class to elements and observe them
  const fadeElements = document.querySelectorAll(".card, .activity-item")
  fadeElements.forEach((el) => {
    el.classList.add("fade-in")
    observer.observe(el)
  })

  // Form submission handling
  const contactForm = document.querySelector("#contact form")
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault()

      // Get form data
      const firstName = document.getElementById("firstName").value
      const lastName = document.getElementById("lastName").value
      const email = document.getElementById("email").value
      const subject = document.getElementById("subject").value
      const message = document.getElementById("message").value

      // Basic validation
      if (!firstName || !lastName || !email || !subject || !message) {
        alert("Please fill in all fields.")
        return
      }

      if (!isValidEmail(email)) {
        alert("Please enter a valid email address.")
        return
      }

      // Simulate form submission
      const submitBtn = this.querySelector('button[type="submit"]')
      const originalText = submitBtn.textContent

      submitBtn.textContent = "Sending..."
      submitBtn.disabled = true

      // Simulate API call
      setTimeout(() => {
        alert("Thank you for your message! I will get back to you soon.")
        this.reset()
        submitBtn.textContent = originalText
        submitBtn.disabled = false
      }, 2000)
    })
  }

  // Email validation function
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Resume download handler
  const resumeBtn = document.querySelector('button[class*="btn-dark"][class*="btn-lg"]')
  if (resumeBtn && resumeBtn.textContent.includes("Download")) {
    resumeBtn.addEventListener("click", () => {
      downloadResume()
    })
  }

  // Navbar collapse on mobile after clicking a link
  const navbarCollapse = document.querySelector(".navbar-collapse")
  const navbarToggler = document.querySelector(".navbar-toggler")

  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      if (navbarCollapse.classList.contains("show")) {
        navbarToggler.click()
      }
    })
  })

  // Add loading animation to page
  window.addEventListener("load", () => {
    document.body.classList.add("loaded")
  })

  // Parallax effect for hero section (subtle)
  const heroSection = document.querySelector("#home")
  if (heroSection) {
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset
      const rate = scrolled * -0.3

      if (scrolled < heroSection.offsetHeight) {
        heroSection.style.transform = `translateY(${rate}px)`
      }
    })
  }

  // Add hover effects to activity items
  const activityItems = document.querySelectorAll(".activity-item")
  activityItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.backgroundColor = "#f8f9fa"
    })

    item.addEventListener("mouseleave", function () {
      this.style.backgroundColor = "transparent"
    })
  })

  // Progress bar animation
  const progressBars = document.querySelectorAll(".progress-bar")
  const progressObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const progressBar = entry.target
          const width = progressBar.style.width
          progressBar.style.width = "0%"

          setTimeout(() => {
            progressBar.style.transition = "width 1s ease-in-out"
            progressBar.style.width = width
          }, 200)
        }
      })
    },
    { threshold: 0.5 },
  )

  progressBars.forEach((bar) => {
    progressObserver.observe(bar)
  })

  // Statistics counter animation
  function animateCounter(element, start, end, duration) {
    const startTime = performance.now()
    const startValue = Number.parseInt(start)
    const endValue = Number.parseInt(end)

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const current = Math.floor(startValue + (endValue - startValue) * easeOutQuart)

      element.textContent = current

      if (progress < 1) {
        requestAnimationFrame(updateCounter)
      } else {
        element.textContent = endValue
      }
    }

    requestAnimationFrame(updateCounter)
  }

  // Initialize counters when they come into view
  const statNumbers = document.querySelectorAll("[data-count]")
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.classList.contains("counted")) {
          const target = entry.target
          const finalValue = target.getAttribute("data-count")
          target.classList.add("counted")
          animateCounter(target, 0, finalValue, 2000)
        }
      })
    },
    { threshold: 0.5 },
  )

  statNumbers.forEach((stat) => {
    statsObserver.observe(stat)
  })

  console.log("Portfolio loaded successfully!")

  // ⚠️ CHANGE: Update these URLs with your actual project links
  const projectLinks = {
    "SPPIM Website": "https://your-sppim-website.com", // Replace with actual URL
    "Cisco Packet Tracer": "https://your-cisco-project.com", // Replace with actual URL
    "Stop Animation": "https://your-animation-project.com", // Replace with actual URL
    "Augmented Reality Innovation": "https://your-ar-project.com", // Replace with actual URL
    "Student Record Management System": "https://your-student-system.com", // Replace with actual URL
    "Audio Project": "https://your-audio-project.com", // Replace with actual URL
  }

  // Project card click handlers
  const projectButtons = document.querySelectorAll(".btn-outline-dark")
  projectButtons.forEach((button) => {
    if (button.textContent.includes("View Project")) {
      button.addEventListener("click", function (e) {
        e.preventDefault()
        const projectTitle = this.closest(".card").querySelector(".card-title").textContent.trim()

        // ⚠️ CHANGE: Update project links in the projectLinks object above
        if (projectLinks[projectTitle]) {
          // Open actual project link
          window.open(projectLinks[projectTitle], "_blank")
        } else {
          // Fallback for projects without links
          alert(`Opening ${projectTitle}...\n\nPlease add the actual project URL in the script.js file.`)
        }
      })
    }
  })
})

// Resume download function
function downloadResume() {
  // Create a temporary link element
  const link = document.createElement("a")

  // In a real implementation, this would be the actual PDF file URL
  // For demo purposes, we'll create a placeholder
  const pdfUrl = "https://via.placeholder.com/800x1000/ffffff/000000?text=Nur+Faradina+Resume+PDF"

  link.href = pdfUrl
  link.download = "Nur_Faradina_Resume.pdf"
  link.target = "_blank"

  // Trigger download
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  // Show success message
  alert("Resume download started!\n\nIn a real implementation, this would download your actual PDF resume.")
}

// Utility functions
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
}

// Add scroll to top functionality
window.scrollToTop = scrollToTop

// Preload gallery images
function preloadImages() {
  const imageUrls = [
    "https://via.placeholder.com/800x400/e9ecef/6c757d?text=University+Campus",
    "https://via.placeholder.com/800x400/f8f9fa/495057?text=Computer+Lab",
    "https://via.placeholder.com/800x400/e9ecef/6c757d?text=Library+Study",
    "https://via.placeholder.com/800x400/f8f9fa/495057?text=Graduation+Day",
    "https://via.placeholder.com/800x400/e9ecef/6c757d?text=Project+Work",
  ]

  imageUrls.forEach((url) => {
    const img = new Image()
    img.src = url
  })
}

// Initialize preloading
preloadImages()
