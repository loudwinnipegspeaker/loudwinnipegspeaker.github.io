async function postMessage() {
    const message = document.getElementById('message').value;
    const responseMessageDiv = document.getElementById('responseMessage');
    const errorMessageDiv = document.getElementById('errorMessage');
    const mainContainer = document.getElementById('mainContainer');
    const loadingOverlay = document.getElementById('loadingOverlay');

    // Show loading overlay
    loadingOverlay.style.display = 'flex';
    mainContainer.classList.add('disabled');

    try {
        // Send POST request to post.php
        const response = await fetch('http://winnipegloudspeaker.000.pe/post.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: message
            })
        });

        const result = await response.body;
        //errorMessageDiv.textContent = result;
        // Handle response
        if (response.ok) {
            if (result.success) {
                responseMessageDiv.textContent = 'Message posted successfully!';
                errorMessageDiv.textContent = '';
            } else {
                responseMessageDiv.textContent = '';
                errorMessageDiv.textContent = result.error || 'Failed to post message.';
            }
        } else {
            responseMessageDiv.textContent = '';
            errorMessageDiv.textContent = 'Server error: ' + (result.error || 'Unknown error.');
        }
    } catch (error) {
        console.error('Error:', error);
        responseMessageDiv.textContent = '';
        errorMessageDiv.textContent = 'An error occurred.' + result;
    } finally {
        // Hide loading overlay and enable the website
        setTimeout(() => {
            loadingOverlay.style.display = 'none';
            mainContainer.classList.remove('disabled');
            // Clear messages after 2 seconds
            setTimeout(() => {
                responseMessageDiv.textContent = '';
                errorMessageDiv.textContent = '';
            }, 20000);
        }, 1000); // Keep the loading overlay visible for 1 second
    }
}