// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ================= INIT AOS =================
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // ================= PARTICLES BACKGROUND =================
    if (window.particlesJS) {
        particlesJS("particles-js", {
            particles: {
                number: { value: 60 },
                color: { value: "#00ff88" },
                shape: { type: "circle" },
                opacity: { value: 0.3 },
                size: { value: 3 },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#00ff88",
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2
                }
            }
        });
    }

    // ================= MOBILE SIDEBAR TOGGLE =================
    const menuBtn = document.querySelector(".mobile-menu-btn");
    const sidebar = document.querySelector(".sidebar");

    if (menuBtn && sidebar) {
        menuBtn.addEventListener("click", function(e) {
            e.stopPropagation();
            sidebar.classList.toggle("active");
            
            // Change icon
            const icon = menuBtn.querySelector("i");
            if (sidebar.classList.contains("active")) {
                icon.classList.remove("fa-bars");
                icon.classList.add("fa-times");
            } else {
                icon.classList.remove("fa-times");
                icon.classList.add("fa-bars");
            }
        });
    }

    // Close sidebar when clicking outside on mobile
    document.addEventListener("click", function(e) {
        if (window.innerWidth <= 900 && sidebar && sidebar.classList.contains("active")) {
            if (!sidebar.contains(e.target) && !menuBtn.contains(e.target)) {
                sidebar.classList.remove("active");
                const icon = menuBtn.querySelector("i");
                if (icon) {
                    icon.classList.remove("fa-times");
                    icon.classList.add("fa-bars");
                }
            }
        }
    });

    // ================= CURSOR GLOW EFFECT =================
    const cursor = document.querySelector(".cursor-glow");
    
    if (cursor && window.innerWidth > 768) {
        document.addEventListener("mousemove", function(e) {
            cursor.style.left = e.clientX + "px";
            cursor.style.top = e.clientY + "px";
        });
    }

    // ================= SCROLL PROGRESS BAR =================
    const progressBar = document.querySelector(".progress-bar");
    
    if (progressBar) {
        window.addEventListener("scroll", function() {
            const scrollTop = window.scrollY;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const progress = (scrollTop / docHeight) * 100;
            progressBar.style.width = progress + "%";
        });
    }

    // ================= TYPING EFFECT =================
    const typingText = document.getElementById("typing-text");
    
    if (typingText) {
        const roles = [
            "Web Developer",
            "WordPress Specialist",
            "UI/UX Designer",
            "IT Support Technician"
        ];
        
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function typeEffect() {
            const currentRole = roles[roleIndex];
            
            if (isDeleting) {
                typingText.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingText.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
            }
            
            if (!isDeleting && charIndex === currentRole.length) {
                isDeleting = true;
                setTimeout(typeEffect, 2000);
                return;
            }
            
            if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                setTimeout(typeEffect, 500);
                return;
            }
            
            const speed = isDeleting ? 50 : 100;
            setTimeout(typeEffect, speed);
        }
        
        typeEffect();
    }

    // ================= SKILL BAR ANIMATION =================
    const skills = document.querySelectorAll(".skill-progress");
    
    if (skills.length > 0) {
        const skillObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const width = bar.getAttribute("data-width");
                    bar.style.width = width + "%";
                    skillObserver.unobserve(bar);
                }
            });
        }, { threshold: 0.5 });
        
        skills.forEach(function(skill) {
            skillObserver.observe(skill);
        });
    }

    // ================= GSAP ANIMATIONS (FIXED) =================
    if (window.gsap) {
        // Set initial states
        gsap.set(".hero-left", { opacity: 0, x: -100 });
        gsap.set(".hero-right", { opacity: 0, x: 100 });
        gsap.set(".sidebar", { opacity: 0, x: -200 });
        
        // Animate to visible states
        gsap.to(".hero-left", {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power3.out"
        });
        
        gsap.to(".hero-right", {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power3.out"
        });
        
        gsap.to(".sidebar", {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power3.out"
        });
        
        // Animate experience cards when they come into view
        const experienceCards = document.querySelectorAll(".exp-card");
        
        if (experienceCards.length > 0) {
            // First ensure they're visible
            gsap.set(experienceCards, { opacity: 0, y: 60 });
            
            // Create scroll trigger for each card
            experienceCards.forEach(function(card, index) {
                gsap.to(card, {
                    opacity: 1,
                    y: 0,
                    duration: 0.9,
                    delay: index * 0.2,
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    }
                });
            });
        }
    }

    // Fallback: Ensure all elements are visible
    setTimeout(function() {
        const heroLeft = document.querySelector(".hero-left");
        const heroRight = document.querySelector(".hero-right");
        const expCards = document.querySelectorAll(".exp-card");
        
        if (heroLeft) heroLeft.style.opacity = "1";
        if (heroRight) heroRight.style.opacity = "1";
        
        expCards.forEach(function(card) {
            card.style.opacity = "1";
            card.style.visibility = "visible";
        });
    }, 500);

    // ================= ACTIVE NAV LINK ON SCROLL =================
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".sidebar nav ul li a");
    
    if (sections.length > 0 && navLinks.length > 0) {
        window.addEventListener("scroll", function() {
            let current = "";
            const scrollPosition = window.scrollY + 200;
            
            sections.forEach(function(section) {
                const sectionTop = section.offsetTop;
                const sectionBottom = sectionTop + section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    current = section.getAttribute("id");
                }
            });
            
            navLinks.forEach(function(link) {
                link.classList.remove("active");
                const href = link.getAttribute("href");
                if (href === "#" + current) {
                    link.classList.add("active");
                }
            });
        });
    }

    // ================= SMOOTH SCROLL =================
    document.querySelectorAll("a[href^='#']").forEach(function(anchor) {
        anchor.addEventListener("click", function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute("href");
            if (targetId === "#") return;
            
            const target = document.querySelector(targetId);
            
            if (target) {
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
            
            // Close mobile sidebar if open
            if (sidebar && window.innerWidth <= 900 && sidebar.classList.contains("active")) {
                sidebar.classList.remove("active");
                const icon = menuBtn.querySelector("i");
                if (icon) {
                    icon.classList.remove("fa-times");
                    icon.classList.add("fa-bars");
                }
            }
        });
    });

    // ================= CONTACT FORM HANDLER =================
    const contactForm = document.getElementById("contactForm");
    const formStatus = document.getElementById("formStatus");
    
    if (contactForm && formStatus) {
        contactForm.addEventListener("submit", function(e) {
            // Don't prevent default for Formspree - let it handle submission
            // Just show success message
            formStatus.textContent = "✓ Message transmitted successfully! I'll get back to you soon.";
            formStatus.style.color = "#00ff88";
            
            setTimeout(function() {
                formStatus.textContent = "";
            }, 5000);
        });
    }
});