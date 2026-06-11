// ================= INIT AOS =================
AOS.init({
    duration: 1000,
    once: true
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
    menuBtn.addEventListener("click", () => {
        sidebar.classList.toggle("active");
    });
}

// ================= CURSOR GLOW EFFECT =================
const cursor = document.querySelector(".cursor-glow");

if (cursor) {
    document.addEventListener("mousemove", (e) => {
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
    });
}

// ================= SCROLL PROGRESS BAR =================
const progressBar = document.querySelector(".progress-bar");

if (progressBar) {
    window.addEventListener("scroll", () => {
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

    function typeEffect() {
        if (charIndex < roles[roleIndex].length) {
            typingText.textContent += roles[roleIndex].charAt(charIndex);
            charIndex++;
            setTimeout(typeEffect, 100);
        } else {
            setTimeout(eraseEffect, 1500);
        }
    }

    function eraseEffect() {
        if (charIndex > 0) {
            typingText.textContent = roles[roleIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(eraseEffect, 50);
        } else {
            roleIndex = (roleIndex + 1) % roles.length;
            setTimeout(typeEffect, 500);
        }
    }

    document.addEventListener("DOMContentLoaded", typeEffect);
}

// ================= SKILL BAR ANIMATION =================
const skills = document.querySelectorAll(".skill-progress");

if (skills.length > 0) {
    const skillObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute("data-width");
                bar.style.width = width + "%";
                skillObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });

    skills.forEach(skill => skillObserver.observe(skill));
}

// ================= GSAP ANIMATIONS =================
if (window.gsap) {
    // Hero animations
    gsap.from(".hero-left", {
        x: -100,
        opacity: 0,
        duration: 1
    });

    gsap.from(".hero-right", {
        x: 100,
        opacity: 0,
        duration: 1
    });

    gsap.from(".sidebar", {
        x: -200,
        opacity: 0,
        duration: 1
    });

    // Experience cards animation
    const experienceCards = document.querySelectorAll(".exp-card");

    if (experienceCards.length > 0) {
        gsap.from(experienceCards, {
            opacity: 0,
            y: 60,
            duration: 0.9,
            stagger: 0.2,
            ease: "power3.out"
        });
    }
}

// ================= ACTIVE NAV LINK ON SCROLL =================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".sidebar nav ul li a");

if (sections.length > 0 && navLinks.length > 0) {
    window.addEventListener("scroll", () => {
        let current = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === "#" + current) {
                link.classList.add("active");
            }
        });
    });
}

// ================= SMOOTH SCROLL =================
document.querySelectorAll("a[href^='#']").forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            target.scrollIntoView({
                behavior: "smooth"
            });
        }

        // Close mobile sidebar if open
        if (sidebar && window.innerWidth <= 900) {
            sidebar.classList.remove("active");
        }
    });
});

// ================= CONTACT FORM HANDLER =================
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
        e.preventDefault();
        
        const name = document.getElementById("contactName").value;
        const email = document.getElementById("contactEmail").value;
        const message = document.getElementById("contactMessage").value;
        
        if (name && email && message) {
            formStatus.textContent = "✓ Message transmitted successfully! I'll get back to you soon.";
            formStatus.style.color = "#00ff88";
            contactForm.reset();
            
            // Clear status after 5 seconds
            setTimeout(() => {
                formStatus.textContent = "";
            }, 5000);
        } else {
            formStatus.textContent = "✗ Error: Please fill in all fields before transmitting.";
            formStatus.style.color = "#ff5f56";
            
            setTimeout(() => {
                formStatus.textContent = "";
            }, 3000);
        }
    });
}

// ================= FORCE EXPERIENCE SECTION VISIBILITY =================
const forceExpVisibility = () => {
    const cards = document.querySelectorAll(".exp-card");
    cards.forEach(card => {
        card.style.opacity = "1";
        card.style.visibility = "visible";
        card.style.transform = "translateY(0px)";
    });
};

window.addEventListener("load", forceExpVisibility);
setTimeout(forceExpVisibility, 200);