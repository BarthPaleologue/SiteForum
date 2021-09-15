console.log("le fichier est bien lié");

let contentContainer = document.getElementById("mainContent");

function loadFileInto(filePath, targetElement) {
    let xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) { // XMLHttpRequest.DONE == 4
            if (xmlhttp.status == 200) {
                targetElement.innerHTML = xmlhttp.responseText;
            } else if (xmlhttp.status == 400) {
                alert('There was an error 400');
            } else {
                alert(xmlhttp.status);
            }
        }
    };

    xmlhttp.open("GET", filePath, true);

    xmlhttp.send();
}

document.getElementById("accueil").addEventListener("click", () => {
    loadFileInto("./pages/accueil.html", contentContainer);
});

document.getElementById("events").addEventListener("click", () => {
    loadFileInto("./pages/events.html", contentContainer);
});

document.getElementById("bureau").addEventListener("click", () => {
    loadFileInto("./pages/bureau.html", contentContainer);
});

document.getElementById("poles").addEventListener("click", () => {
    loadFileInto("./pages/poles.html", contentContainer);
});

document.getElementById("membres").addEventListener("click", () => {
    loadFileInto("./pages/membres.html", contentContainer);
});

loadFileInto("./pages/accueil.html", contentContainer);
