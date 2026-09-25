document.addEventListener("DOMContentLoaded", function () {

    /* ============================================================
       1. THEME TOGGLE
       ============================================================ */
    const themeToggleBtn = document.getElementById("theme-toggle");
    const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector("i") : null;

    const currentTheme = localStorage.getItem("theme");
    if (currentTheme === "dark") {
        document.body.classList.add("dark-theme");
        if (themeIcon) themeIcon.className = "ri-sun-line";
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", function () {
            document.body.classList.toggle("dark-theme");
            const isDark = document.body.classList.contains("dark-theme");
            localStorage.setItem("theme", isDark ? "dark" : "light");
            if (themeIcon) {
                themeIcon.className = isDark ? "ri-sun-line" : "ri-moon-line";
            }
        });
    }

    /* ============================================================
       2. TYPING EFFECT
       ============================================================ */
    const typing = document.querySelector(".typing");
    const text = "Cybersecurity | Python Developer | Ethical Hacker";
    let index = 0;
    function typeEffect() {
        if (typing && index < text.length) {
            typing.textContent += text.charAt(index);
            index++;
            setTimeout(typeEffect, 60);
        }
    }
    if (typing && typing.textContent === "") {
        typeEffect();
    }

    /* ============================================================
       3. PROGRESS BAR
       ============================================================ */
    const progressBar = document.querySelector(".progress-bar");
    if (progressBar) {
        window.addEventListener("scroll", () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            progressBar.style.width = (docHeight > 0 ? (scrollTop / docHeight) * 100 : 0) + "%";
        }, { passive: true });
    }

    /* ============================================================
       4. MORE MENU (GLASS BOTTOM SHEET)
       ============================================================ */
    const moreBtn       = document.getElementById("more-btn");
    const morePanel     = document.getElementById("more-panel");
    const moreBackdrop  = document.getElementById("more-backdrop");
    const moreCloseBtn  = document.getElementById("more-close-btn");

    function openMorePanel() {
        if (!morePanel || !moreBackdrop) return;
        morePanel.classList.add("open");
        moreBackdrop.classList.add("open");
        if (moreBtn) moreBtn.setAttribute("aria-expanded", "true");
        const first = morePanel.querySelector(".more-panel-item");
        if (first) first.focus();
    }

    function closeMorePanel() {
        if (!morePanel || !moreBackdrop) return;
        morePanel.classList.remove("open");
        moreBackdrop.classList.remove("open");
        if (moreBtn) moreBtn.setAttribute("aria-expanded", "false");
    }

    if (moreBtn) {
        moreBtn.addEventListener("click", function (e) {
            e.preventDefault();
            if (morePanel && morePanel.classList.contains("open")) {
                closeMorePanel();
            } else {
                openMorePanel();
            }
        });
    }

    if (moreCloseBtn) {
        moreCloseBtn.addEventListener("click", closeMorePanel);
    }

    if (moreBackdrop) {
        moreBackdrop.addEventListener("click", closeMorePanel);
    }

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && morePanel && morePanel.classList.contains("open")) {
            closeMorePanel();
            if (moreBtn) moreBtn.focus();
        }
    });

    /* ============================================================
       5. SPA NAVIGATION WITH FLOATING BOTTOM DOCK
       ============================================================ */
    const sections = document.querySelectorAll(".section");
    const navButtons = document.querySelectorAll(".float-nav-item[data-target], .more-panel-item[data-target]");
    const moreSections = ["#education", "#skills", "#certifications", "#workshop", "#contact"];

    function navigateTo(hash) {
        if (!hash || hash === "#") hash = "#home";

        // Hide all sections & show target section
        sections.forEach(section => {
            section.classList.remove("active");
        });

        const targetSection = document.querySelector(hash);
        if (targetSection) {
            targetSection.classList.add("active");
            window.scrollTo({ top: 0, behavior: "smooth" });
        }

        // Update active class on nav buttons
        navButtons.forEach(btn => {
            const target = btn.getAttribute("data-target");
            btn.classList.toggle("active", target === hash);
        });

        // More button active indicator on mobile
        if (moreBtn) {
            const isInsideMore = moreSections.includes(hash);
            moreBtn.classList.toggle("active", isInsideMore);
            moreBtn.classList.toggle("has-sub-active", isInsideMore);
        }
    }

    navButtons.forEach(btn => {
        btn.addEventListener("click", function (e) {
            e.preventDefault();
            const target = this.getAttribute("data-target");
            if (target) {
                history.pushState(null, "", target);
                navigateTo(target);
                closeMorePanel();
            }
        });
    });

    // Listen to browser back/forward hash changes
    window.addEventListener("hashchange", () => {
        navigateTo(window.location.hash);
    });

    // Initial navigation
    navigateTo(window.location.hash);

    /* ============================================================
       6. CONTACT FORM SUBMISSION
       ============================================================ */
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", sendEmail);
    }

});

/* ============================================================
   EMAILJS INTEGRATION (Original functionality preserved)
   ============================================================ */
function sendEmail(event) {
    if (event) event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let message = document.getElementById("message").value.trim();
    let formStatus = document.getElementById("form-status");
    let submitButton = document.querySelector("#contact-form button[type='submit']");

    if (name === "" || email === "" || message === "") {
        if (formStatus) {
            formStatus.textContent = "Please fill all fields before submitting.";
            formStatus.style.color = "#ef4444";
        }
        return;
    }

    let params = {
        name: name,
        email: email,
        message: message
    };

    if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Sending...";
    }
    if (formStatus) {
        formStatus.textContent = "Sending your message...";
        formStatus.style.color = "var(--text-muted)";
    }

    emailjs.send("service_5qkxb1h", "template_c1rvhnf", params)
        .then(() => {
            if (formStatus) {
                formStatus.textContent = "Email sent successfully!";
                formStatus.style.color = "#10b981";
            }
            document.getElementById("contact-form").reset();
        })
        .catch((error) => {
            console.error("Error sending email:", error);
            if (formStatus) {
                formStatus.textContent = "Failed to send email. Please try again later.";
                formStatus.style.color = "#ef4444";
            }
        })
        .finally(() => {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = "Send Message";
            }
        });
}
