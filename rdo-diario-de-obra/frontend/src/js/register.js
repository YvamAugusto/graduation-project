

document.getElementById("backPage").addEventListener("click", () => {
    window.location.href = "http://127.0.0.1:5500/rdo-diario-de-obra/frontend/constructions.html"
})

function nextSection(currentSection) {
    var multiStep = document.getElementById("multi-step");
    var sections = multiStep.getElementsByClassName("form-section");
    console.log(sections);
    
    if (currentSection < sections.length - 1) {
        sections[currentSection].classList.remove("active");
        sections[currentSection + 1].classList.add("active");
    }
}

function previousSection(currentSection) {
    var multiStep = document.getElementById("multi-step");
    var sections = multiStep.getElementsByClassName("form-section");
    
    if (currentSection > 0) {
        sections[currentSection].classList.remove("active");
        sections[currentSection - 1].classList.add("active");
    }
}

function getFileNames() {
    let fileInput = document.getElementById('image');
    let files = fileInput.files;
    document.getElementById("numberOfImages").innerHTML = files.length + " arquivo(s) selecionado(s).";

    // for (let i = 0; i < files.length; i++) {
    //     let filename = document.createElement('p');
    //     filename.innerHTML = files[i].name;
    //     fileNames.appendChild(filename);
    // }
}

document.getElementById("image").addEventListener("change", () => {
    getFileNames();
})