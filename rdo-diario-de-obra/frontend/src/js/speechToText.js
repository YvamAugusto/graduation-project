if ("webkitSpeechRecognition" in window) {

    let recognition = new webkitSpeechRecognition();
    recognition.lang = "pt-BR";
    recognition.continuous = false;
    recognition.interimResults = true;

    let fieldId;

    // let startButton = document.getElementById("start-button");
    // let output = document.getElementById("output");

    // startButton.addEventListener("click", () => {
    //     recognition.start();
    // });

    // recognition.onresult = (event) => {
    //     let result = ""
    //     for (let i = event.resultIndex; i < event.results.length; i++) {
    //         result += event.results[i][0].transcript;
    //     }
    //     output.innerHTML = result;
    // };

    function startRecording(id) {
        fieldId = document.getElementById(`${id}`);
        recognition.start();
        fieldId.innerHTML = "A gravação começou...";
    }

    recognition.onresult = (event) => {
        let result = ""
        for (let i = event.resultIndex; i < event.results.length; i++) {
            result += event.results[i][0].transcript;
        }
        fieldId.innerHTML = result;
    };

    recognition.onerrror = (event) => {
        console.log('Error: ' + event.error);
    };

} else {
    alert("Speech recognition not supported");
}