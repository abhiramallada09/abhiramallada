document.addEventListener("DOMContentLoaded", function()
{
    /* Typing Effect */
    const typing = document.querySelector(".typing");
    const text = "Cybersecurity | Python Developer | Ethical Hacker";
    let index = 0;
    function typeEffect()
    {
        if(index < text.length)
        {
            typing.textContent += text.charAt(index);
            index++;
            setTimeout(typeEffect,60);
        }
    }
    typeEffect();
    /* Scroll Reveal */
    const sections = document.querySelectorAll(".section");
    const observer = new IntersectionObserver(entries=>
    {
        entries.forEach(entry=>
        {
            if(entry.isIntersecting)
            {
                entry.target.classList.add("show");
            }
        });
    },{threshold:0.2});
    sections.forEach(section=>
    {
        observer.observe(section);
    });
    /* Mobile Menu */
    const toggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");
    toggle.addEventListener("click", function () 
    {
        navLinks.classList.toggle("active");
    });
    // Close menu when clicking any link
    document.querySelectorAll("#nav-links a").forEach(function(link) 
    {
        link.addEventListener("click", function () 
        {
            navLinks.classList.remove("active");
        });
    });
    /* Logo Scroll Top */
    document.querySelector(".logo").addEventListener("click",function(e)
    {
        e.preventDefault();
        window.scrollTo({top:0,behavior:"smooth"});
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

    emailjs.send("service_92wxlsr", "template_hq27jvh", params)
        .then(() => {
            alert("Email sent successfully!");
                // Clear form fields after successful submission
                document.getElementById("name").value = "";
                document.getElementById("email").value = "";
                document.getElementById("message").value = "";
        })
        .catch((error) => {
            console.error("Error sending email:", error);
            alert("Failed to send email. Please try again later.");
        });
}