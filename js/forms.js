document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('form.form, #contact-form, #enquiry-form');

    const handleFormSubmit = (form) => {
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Basic validation
            let isValid = true;
            const formMessage = form.querySelector('.form__message') || form.querySelector('#form-message');

            // Simple email validation regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const emailInput = form.querySelector('input[type="email"]');
            const emailError = form.querySelector('.form__error') || form.querySelector('#email-error');

            if (emailInput && !emailRegex.test(emailInput.value.trim())) {
                isValid = false;
                if (emailError) emailError.textContent = 'Please enter a valid email address.';
                emailInput.style.borderColor = '#d32f2f';
            } else if (emailError) {
                emailError.textContent = '';
                emailInput.style.borderColor = '';
            }

            if (!isValid) return;

            const submitBtn = form.querySelector('button[type="submit"]');
            const originalHTML = submitBtn.innerHTML;

            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

            fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { Accept: 'application/json' }
            })
                .then((response) => {
                    if (!response.ok) throw new Error('Submission failed');

                    submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent Successfully!';
                    submitBtn.style.backgroundColor = '#2e7d32';

                    if (formMessage) {
                        formMessage.textContent = 'Thank you for your message. We will get back to you shortly.';
                        formMessage.classList.remove('form__message--error');
                        formMessage.classList.add('form__message--success');
                        formMessage.style.display = 'block';
                    }

                    form.reset();
                })
                .catch(() => {
                    submitBtn.innerHTML = originalHTML;

                    if (formMessage) {
                        formMessage.textContent = "Sorry, something went wrong. Please try again or email us directly at info@theharvesterchurch.org.";
                        formMessage.classList.remove('form__message--success');
                        formMessage.classList.add('form__message--error');
                        formMessage.style.display = 'block';
                    }
                })
                .finally(() => {
                    submitBtn.disabled = false;

                    setTimeout(() => {
                        submitBtn.innerHTML = originalHTML;
                        submitBtn.style.backgroundColor = '';
                        if (formMessage) formMessage.style.display = 'none';
                    }, 6000);
                });
        });
    };

    forms.forEach(form => handleFormSubmit(form));
});
