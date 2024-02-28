document.addEventListener('DOMContentLoaded', function() {
    const revealButton = document.getElementById('destinyReveal');
    const destinyMessage = document.querySelector('.destiny-message');

    const destinies = [
        "Your path is one of enlightenment and pizza.",
        "Great secrets await you in the Chamber of Cheeses.",
        "You will discover a hidden topping that changes everything.",
        "Your destiny is to spread the cult's wisdom across lands.",
        "A mystical pizza slice holds the key to your future."
    ];

    revealButton.addEventListener('click', function() {
        const randomIndex = Math.floor(Math.random() * destinies.length);
        destinyMessage.textContent = destinies[randomIndex];
    });
});
