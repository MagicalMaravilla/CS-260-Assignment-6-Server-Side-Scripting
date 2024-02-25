// Handle form submission
document.getElementById('joinForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevents the form from submitting in the traditional way

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    // For demonstration, we'll just log the values and show a simple message
    console.log(`Name: ${name}, Email: ${email}`);
    alert(`Thanks for joining the Pizza Cult, ${name}! Check your email (${email}) for a welcome message.`);

    // Here you might want to send the data to a server or process it further
    // This is a placeholder for such functionality
});
