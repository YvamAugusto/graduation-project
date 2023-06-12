let synth = window.speechSynthesis;
let voices = [];

function newVoices() {
    voices = synth.getVoices();
}

if (speechSynthesis !== undefined) {
    speechSynthesis.onvoiceschanged = newVoices;
} 

function speak(phrase) {
    let toSpeak = new SpeechSynthesisUtterance(phrase);
    let selectedVoiceName = "Google português do Brasil"    //"Microsoft Daniel - Portuguese (Brazil)" / "Microsoft Maria - Portuguese (Brazil)" /"Google português do Brasil"
    voices.forEach((voice) => {
        if (voice.name === selectedVoiceName) {
            toSpeak.voice = voice;
        }
    });
    synth.speak(toSpeak);
}
