document.addEventListener("DOMContentLoaded", () => {
    const currentYear = document.getElementById("current-year");
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

/* =========================
   MOBILE MENU
========================== */

const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
        const isExpanded = navMenu.classList.toggle("active");
        menuToggle.setAttribute("aria-expanded", String(isExpanded));
        menuToggle.setAttribute("aria-label", isExpanded ? "Close menu" : "Open menu");
    });
}

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        if (menuToggle) {
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open menu");
        }
    });
});

/* =========================
   THEME TOGGLE
========================== */

const themeToggle = document.getElementById("theme-toggle");
const themeIcon = themeToggle ? themeToggle.querySelector("i") : null;

function applyTheme(isDark) {
    document.body.classList.toggle("dark", isDark);

    if (themeIcon) {
        themeIcon.classList.toggle("fa-sun", isDark);
        themeIcon.classList.toggle("fa-moon", !isDark);
    }

    if (themeToggle) {
        const nextLabel = isDark ? "Switch to light mode" : "Switch to dark mode";
        themeToggle.setAttribute("aria-label", nextLabel);
        themeToggle.setAttribute("title", nextLabel);
    }

    localStorage.setItem("portfolio-theme", isDark ? "dark" : "light");
}

const savedTheme = localStorage.getItem("portfolio-theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
applyTheme(savedTheme ? savedTheme === "dark" : prefersDark);

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        applyTheme(!document.body.classList.contains("dark"));
    });
}


/* =========================
   TYPING EFFECT
========================== */

const typingElement = document.querySelector(".typing");
if (typingElement) {
    const words = [
        "Cloud & DevOps Engineer",
        "Cloud Computing Enthusiast",
        "AWS Learner",
        "DevOps Engineer in Progress"
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    function typeEffect() {
        const currentWord = words[wordIndex];
        if (isDeleting) {
            typingElement.textContent =
                currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent =
                currentWord.substring(0, charIndex + 1);
            charIndex++;
        }
        let typingSpeed = isDeleting ? 60 : 120;
        if (!isDeleting && charIndex === currentWord.length) {

            typingSpeed = 1500;
            isDeleting = true;

        }
        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex =
                (wordIndex + 1) % words.length;
            typingSpeed = 400;
        }
        setTimeout(typeEffect, typingSpeed);
    }
    typeEffect();
}


/* =========================
   SCROLL FUNCTIONS
========================== */

const progressBar =
    document.getElementById("progress-bar");
const scrollTopButton =
    document.getElementById("scroll-top");
function handleScroll() {
    const scrollTop =
        document.documentElement.scrollTop;
    const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
    /* Progress Bar */
    if (progressBar && scrollHeight > 0) {
        const progress =
            (scrollTop / scrollHeight) * 100;
        progressBar.style.width =
            progress + "%";
    }

    /* Scroll Top Button */
    if (scrollTopButton) {
        if (scrollTop > 400) {
            scrollTopButton.style.display = "block";
        } else {
            scrollTopButton.style.display = "none";
        }
    }
    /* Active Navigation */
    const sections =
        document.querySelectorAll("section[id]");
    let currentSection = "";
    sections.forEach((section) => {
        const sectionTop =
            section.offsetTop - 150;
        const sectionHeight =
            section.offsetHeight;
        if (
            window.scrollY >= sectionTop &&
            window.scrollY <
            sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }
    });
    navLinks.forEach((link) => {
        link.classList.remove("active");
        if (
            link.getAttribute("href") ===
            "#" + currentSection
        ) {

            link.classList.add("active");

        }
    });
}

window.addEventListener("scroll", handleScroll);
handleScroll();

/* =========================
   SCROLL TO TOP
========================== */

if (scrollTopButton) {
    scrollTopButton.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}


/* =========================
   SKILLS ANIMATION
========================== */

const skillsSection =
    document.getElementById("skills");
const progressBars =
    document.querySelectorAll(".progress-fill");
let skillsAnimated = false;
function animateSkills() {
    if (!skillsSection || skillsAnimated) return;
    const position =
        skillsSection.getBoundingClientRect().top;
    if (position < window.innerHeight - 100) {
        progressBars.forEach((bar) => {
            const width =
                bar.getAttribute("data-width");
            bar.style.width =
                width + "%";
        });
        skillsAnimated = true;
    }
}

window.addEventListener("scroll", animateSkills);
animateSkills();

/* =========================
   COUNTER ANIMATION
========================== */
const counters =
    document.querySelectorAll(".counter");
const aboutSection =
    document.getElementById("about");
let countersStarted = false;
function animateCounters() {
    if (
        !aboutSection ||
        countersStarted
    ) return;
    const position =
        aboutSection.getBoundingClientRect().top;

    if (position < window.innerHeight - 100) {
        counters.forEach((counter) => {
            const target =
                Number(counter.dataset.target);
            let count = 0;
            const increment =
                Math.max(1, Math.ceil(target / 60));
            function updateCounter() {
                count += increment;
                if (count < target) {
                    counter.textContent = count;
                    setTimeout(updateCounter, 30);
                } else {
                    counter.textContent =
                        target + "+";
                }
            }
            updateCounter();
        });
        countersStarted = true;
    }
}
window.addEventListener(
    "scroll",
    animateCounters
);
animateCounters();


/* =========================
   CONTACT FORM
========================== */

});