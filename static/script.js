function synthesizeVoice() {
    alert('Generating audio. Please wait');
    var fontType = document.getElementById('font_select').value;
    var inputText = document.getElementById('input_text').value;

    // Display the input text after conversion
    document.getElementById('converted_text').innerText = inputText;

    // Make an asynchronous request to the Flask backend hosted on Hugging Face
    fetch('https://huggingface.co/spaces/lord-reso/host/synthesize', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            font_select: fontType,
            input_text: inputText,
        }),
    })
    .then(response => response.json())
    .then(data => {
        // Handle the response from the backend
        // Update the content of the output sections based on the response

        // Update Mel-Spectrogram
        var melSpectrogramElement = document.getElementById('mel_spectrogram');
        melSpectrogramElement.innerHTML = '<h3>Mel-Spectrogram</h3><img src="data:image/png;base64,' + data.mel_spectrogram + '" alt="Mel-Spectrogram">';

        // Use the existing audio element
        var audio = document.getElementById('audio_player');

        // Before playing the audio, check if it's already playing
        if (!audio.paused) {
            audio.pause(); // Pause the audio if it's already playing
        }

        // Set the audio source
        audio.src = 'data:audio/wav;base64,' + data.audio_data;
        audio.type = 'audio/wav'; // Set the audio type explicitly
        alert('Audio Generated');

        // Update Waveform
        var waveformElement = document.getElementById('waveform');
        waveformElement.innerHTML = '<h3>Waveform</h3><img src="data:image/png;base64,' + data.waveform + '" alt="Waveform">';
    })
    .catch(error => {
        // Handle errors, if any
        console.error('Error during fetch:', error);
    });
}

// Add event listener for the synthesize button
document.getElementById('synthesize_button').addEventListener('click', synthesizeVoice);
