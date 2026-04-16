document.addEventListener("DOMContentLoaded", function () {
    /* Theme Toggle */
    const themeToggleBtn = document.getElementById("theme-toggle");
    const themeIcon = themeToggleBtn.querySelector("i");

    // Check local storage for theme
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme === "dark") {
        document.body.classList.add("dark-theme");
        themeIcon.classList.replace("ri-moon-line", "ri-sun-line");
    }

    themeToggleBtn.addEventListener("click", function () {
        document.body.classList.toggle("dark-theme");
        let theme = "light";
        if (document.body.classList.contains("dark-theme")) {
            theme = "dark";
            themeIcon.classList.replace("ri-moon-line", "ri-sun-line");
        } else {
            themeIcon.classList.replace("ri-sun-line", "ri-moon-line");
        }
        localStorage.setItem("theme", theme);
    });

    /* Typing Effect */
    const typing = document.querySelector(".typing");
    const text = "Cybersecurity | Python Developer | Ethical Hacker";
    let index = 0;
    function typeEffect() {
        if (index < text.length) {
            typing.textContent += text.charAt(index);
            index++;
            setTimeout(typeEffect, 60);
        }
    }
    // Only run if empty to avoid repeating on resize/SPA navigation
    if (typing && typing.textContent === "") {
        typeEffect();
    }

    /* SPA Navigation */
    const sections = document.querySelectorAll(".section");
    const navLinks = document.querySelectorAll("#nav-links a");

    function navigateTo(hash) {
        if (!hash || hash === "#") hash = "#home";

        // Hide all sections
        sections.forEach(section => {
            section.classList.remove("active");
        });

        // Remove active class from nav links
        navLinks.forEach(link => {
            link.classList.remove("active");
        });

        // Show target section
        const targetSection = document.querySelector(hash);
        if (targetSection) {
            targetSection.classList.add("active");

            // Add active class to corresponding nav link
            const activeLink = document.querySelector(`#nav-links a[href="${hash}"]`);
            if (activeLink) {
                activeLink.classList.add("active");
            }

            // Scroll to top of section for SPA feel
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }

    // Listen to hash changes
    window.addEventListener("hashchange", () => {
        navigateTo(window.location.hash);
    });

    // Initial navigation
    navigateTo(window.location.hash);

    /* Mobile Menu */
    const toggle = document.getElementById("menu-toggle");
    const navLinksContainer = document.getElementById("nav-links");
    toggle.addEventListener("click", function () {
        navLinksContainer.classList.toggle("active");
    });

    // Close menu when clicking any link
    document.querySelectorAll("#nav-links a").forEach(function (link) {
        link.addEventListener("click", function () {
            navLinksContainer.classList.remove("active");
        });
    });

});

/* email */
function sendEmail() {
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let message = document.getElementById("message").value.trim();

    if (name === "" || email === "" || message === "") {
        alert("Please fill all fields before submitting.");
        return;
    }

    let params = {
        name: name,
        email: email,
        message: message
    };

    emailjs.send("service_5qkxb1h", "template_c1rvhnf", params)
        .then(() => {
            alert("Email sent successfully!");
        })
        .catch((error) => {
            console.error("Error sending email:", error);
            alert("Failed to send email. Please try again later.");
        });
}