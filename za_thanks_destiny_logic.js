document.addEventListener('DOMContentLoaded', function() {
    const revealButton = document.getElementById('destinyReveal');
    const destinyMessage = document.querySelector('.destiny-message');
    const smokeEffect = document.getElementById('smokeEffect');

    const destinies = [
        "Your path is one of enlightenment and pizza. (One free topping)",
        "Great secrets await you in the Chamber of Cheeses. (Free fountain drink and garlic knots)",
        "You will discover a hidden topping that changes everything. (One mini pizza with 1 topping)",
        "Your destiny is to spread the cult's wisdom across lands. (10% off order of 10 dollars or more)",
        "A mystical pizza slice holds the key to your future. (1 Free hot slice of pizza)"
    ];

    revealButton.addEventListener('click', function() {
        gsap.to(smokeEffect, {duration: 1, autoAlpha: 1, onComplete: showDestiny});
    });

    function showDestiny() {
        if (!revealButton.disabled) { // Check if the button is not already disabled
            const randomIndex = Math.floor(Math.random() * destinies.length);
            destinyMessage.textContent = destinies[randomIndex];
            gsap.to(smokeEffect, {duration: 1, autoAlpha: 0});
            revealButton.disabled = true; // Disable the button after revealing the destiny
        }
    }
});
