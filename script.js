const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-menu a");
const sections = document.querySelectorAll("section[id], [id=\"skills\"]");

function setActiveLink(id) {
    navLinks.forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === "#" + id);
    });
}

if (menuBtn) {
    menuBtn.addEventListener("click", () => {
        navMenu.classList.toggle("show");
        const icon = menuBtn.querySelector("i");
        if (navMenu.classList.contains("show")) {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");
        } else {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }
    });
}

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        setActiveLink(link.getAttribute("href").substring(1));
        if (navMenu) navMenu.classList.remove("show");
        const icon = menuBtn ? menuBtn.querySelector("i") : null;
        if (icon) {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }
    });
});

// Keep Home active when the page first loads.
// The active underline changes only when the user clicks a menu item.
setActiveLink("home");

/* Scroll reveal */
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add("show");
            }, index * 80);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

revealElements.forEach(element => revealObserver.observe(element));

/* Skill bar animation */
const skillBars = document.querySelectorAll(".bar-line span");
const skillObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const width = entry.target.dataset.width;
            setTimeout(() => { entry.target.style.width = width; }, 150);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => skillObserver.observe(bar));

/* Mouse light effect on buttons */
document.querySelectorAll(".primary-btn, .secondary-btn").forEach(btn => {
    btn.addEventListener("mousemove", e => {
        const rect = btn.getBoundingClientRect();
        btn.style.setProperty("--x", `${e.clientX - rect.left}px`);
        btn.style.setProperty("--y", `${e.clientY - rect.top}px`);
    });
});

/* Current year */
const footerText = document.querySelector("footer p");
if (footerText) {
    footerText.innerHTML = `© ${new Date().getFullYear()} Sawai Choudhary. All Rights Reserved.`;
}
