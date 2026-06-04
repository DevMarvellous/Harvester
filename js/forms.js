document.addEventListener('DOMContentLoaded', () => {
    const enquiryForm = document.getElementById('enquiry-form');
    const contactForm = document.getElementById('contact-form');

    const handleFormSubmit = (form) => {
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic validation
            let isValid = true;
            const formData = new FormData(form);
            const formMessage = form.querySelector('.form__message') || document.getElementById('form-message');

            // Simple email validation regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const emailInput = form.querySelector('input[type="email"]');
            const emailError = form.querySelector('#email-error');

            if (emailInput && !emailRegex.test(emailInput.value)) {
                isValid = false;
                if (emailError) emailError.textContent = 'Please enter a valid email address.';
                emailInput.style.borderColor = '#d32f2f';
            } else if (emailError) {
                emailError.textContent = '';
                emailInput.style.borderColor = '#ddd';
            }

            if (isValid) {
                // Simulate form submission
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';

                setTimeout(() => {
                    submitBtn.textContent = 'Sent Successfully!';
                    submitBtn.style.backgroundColor = '#2e7d32';
                    
                    if (formMessage) {
                        formMessage.textContent = 'Thank you for your message. We will get back to you shortly.';
                        formMessage.classList.add('form__message--success');
                        formMessage.style.display = 'block';
                    }

                    form.reset();

                    setTimeout(() => {
                        submitBtn.disabled = false;
                        submitBtn.textContent = originalText;
                        submitBtn.style.backgroundColor = '';
                        if (formMessage) formMessage.style.display = 'none';
                    }, 5000);
                }, 1500);
            }
        });
    };

    handleFormSubmit(enquiryForm);
    handleFormSubmit(contactForm);
});
