document.addEventListener('DOMContentLoaded', function() {
    // Establish WebSocket connection
    const socket = new WebSocket('ws://' + window.location.host);
    
    socket.addEventListener('open', function(event) {
        console.log('WebSocket connection established');
    });
    
    // Listen for messages from the server
    socket.addEventListener('message', function(event) {
        // Here you could update the client-side UI based on the message
        console.log('Message from server:', event.data);
        // Example: Update a real-time feedback section or notify users of new joiners
    });
    
    // WebSocket error handling
    socket.addEventListener('error', function(error) {
        console.error('WebSocket error:', error);
    });
    
    // Handle the join form submission
    var joinForm = document.getElementById('joinForm');
    if (joinForm) {
        joinForm.addEventListener('submit', function(event) {
            event.preventDefault();
    
            var name = joinForm.querySelector('input[name="name"]').value;
            var email = joinForm.querySelector('input[name="email"]').value;
    
            // Perform the POST request to the server
            fetch('/join', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`
            }).then(() => {
                console.log('Join request submitted.');
                joinForm.reset();
                
                // Optionally, send a WebSocket message to the server when a new user joins
                socket.send(JSON.stringify({ action: 'join', name: name }));
            }).catch(error => console.error('Error:', error));
        });
    }

    // Handle image expansion in the Chamber of the 5 Cheeses section
    const images = document.querySelectorAll('.chamber-image');
    images.forEach(image => {
        image.addEventListener('click', function() {
            images.forEach(img => img.classList.remove('expanded-image'));
            this.classList.toggle('expanded-image');
        });
    });

    document.addEventListener('click', function(e) {
        if (!e.target.classList.contains('chamber-image') && !e.target.closest('.chamber-images')) {
            images.forEach(image => image.classList.remove('expanded-image'));
        }
    });
});
