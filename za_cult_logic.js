document.addEventListener('DOMContentLoaded', function() {
    var joinForm = document.getElementById('joinForm');

    joinForm.addEventListener('submit', function(event) {
        event.preventDefault();

        var name = joinForm.querySelector('input[name="name"]').value;
        var email = joinForm.querySelector('input[name="email"]').value;

        fetch('/join', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`
        });

        joinForm.reset();
    });

    // Example function to retrieve and display the JSON data
    function getUserData() {
        fetch('/get-user-data')
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));
    }

    // Call getUserData() as needed, e.g., to check user submissions
});

