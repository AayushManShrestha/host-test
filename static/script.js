function synthesizeVoice() {
    var fontType = document.getElementById('font_select').value;
    var inputText = document.getElementById('input_text').value;

    // Display the input text after conversion
    document.getElementById('converted_text').innerText = inputText;

    // Make an asynchronous request to the Flask backend
    fetch('/synthesize', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            font_select: fontType,
            input_text: inputText,
        }),
        mode: 'cors',
    })
    .then(response => response.json())
    .then(data => {
        // Handle the response from the backend
        // Update the content of the output sections based on the response

        // Update Mel-Spectrogram
        var melSpectrogramElement = document.getElementById('mel_spectrogram');
        melSpectrogramElement.innerHTML = '<h3>Mel-Spectrogram</h3><img src="data:image/png;base64,' + data.mel_spectrogram + '" alt="Mel-Spectrogram">';

        // Provide a link to download the generated audio file
        var audioLinkElement = document.getElementById('audio_link');
        audioLinkElement.href = data.audio_path;

        // Create an audio element
        var audioPlayerElement = document.createElement('audio');
        audioPlayerElement.controls = true;
        audioPlayerElement.src = data.audio_path;

        // Append the audio element to the audio_file div
        var audioFileElement = document.getElementById('audio_file');
        audioFileElement.innerHTML = '<h3>Audio File</h3>';
        audioFileElement.appendChild(audioPlayerElement);

        // Play the audio
        audioPlayerElement.play();
        // Update other elements as needed

        // For now, let's alert the user with the response data (you can customize this part)
        alert("Response from Backend:\n" + JSON.stringify(data));
    })
    .catch(error => {
        // Handle errors, if any
        console.error('Error during fetch:', error);
    });
}

// Add event listener for the synthesize button
document.getElementById('synthesize_button').addEventListener('click', synthesizeVoice);
