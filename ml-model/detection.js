function analyzeAudio() {
    const audioFile = document.getElementById('audioFile').files[0];
    // Check if the user has uploaded a file
    if (!audioFile) {
        alert('Please upload an audio file');
        return;
    }

    // Create a FormData object and append the file
    const formData = new FormData();
    formData.append("audio", audioFile);

    // Send the audio file to the server via FormData
    fetch('/api/detect', {
        method: 'POST',
        body: formData // Send the FormData with the audio file
    })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                // your error handling code here ---
            } else {
                // Process the response data --- your success handling code here
                const emotion = data.emotion;
                const confidence = (data.confidence * 100).toFixed(2); // Convert confidence to percentage
                const probabilities = data.probabilities; // this is a dictionary with all the probabilities and their values
            }
        })
        .catch(error => {
            // Handle any errors that occurred during the fetch
            // your error handling code here ---
        });
}