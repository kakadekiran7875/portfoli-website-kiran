// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {

    // Initialize EmailJS with your Public Key
    emailjs.init("JaQ9hSFt6AgX8kk6n"); // 🔑 Tuza Public Key

    const contactForm = document.getElementById("contactForm");
    const responseMsg = document.getElementById("responseMsg");
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerText;

    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // --- 1. Show loading state ---
        submitButton.disabled = true;
        submitButton.innerText = "Sending...";

        emailjs.sendForm("service_hcvrdx8", "template_awv0gmv", contactForm)
            .then(() => {
                // --- 2. Show success message ---
                responseMsg.innerText = "✅ Message sent successfully!";
                responseMsg.style.color = "lightgreen";
                contactForm.reset();

                // --- 3. Clear message after 5 seconds ---
                setTimeout(() => {
                    responseMsg.innerText = "";
                }, 5000);

            }, (error) => {
                // --- 2. Show error message ---
                responseMsg.innerText = "❌ Failed to send message. Please try again.";
                responseMsg.style.color = "red";
                console.error("FAILED...", error);
                
                // --- 3. Clear message after 5 seconds ---
                setTimeout(() => {
                    responseMsg.innerText = "";
                }, 5000);
            })
            .finally(() => {
                // --- 4. Reset button state after success or error ---
                submitButton.disabled = false;
                submitButton.innerText = originalButtonText;
            });
    });
});