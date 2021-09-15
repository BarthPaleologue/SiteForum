console.log("le fichier est bien lié");

let currentPage = "accueil";

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
    if (currentPage != "accueil") {
        loadFileInto("./pages/accueil.html", contentContainer);
        currentPage = "accueil";
    }
});

document.getElementById("events").addEventListener("click", () => {
    if (currentPage != "events") {
        loadFileInto("./pages/events.html", contentContainer);
        currentPage = "events";
    }
});

document.getElementById("bureau").addEventListener("click", () => {
    if (currentPage != "bureau") {
        loadFileInto("./pages/bureau.html", contentContainer);
        currentPage = "bureau";
    }
});

document.getElementById("poles").addEventListener("click", () => {
    if (currentPage != "poles") {
        loadFileInto("./pages/poles.html", contentContainer);
        currentPage = "poles";
    }
});

document.getElementById("membres").addEventListener("click", () => {
    if (currentPage != "membres") {
        loadFileInto("./pages/membres.html", contentContainer);
        currentPage = "membres";
    }
});

loadFileInto("./pages/accueil.html", contentContainer);

topScrollButton = document.getElementById("gotoTopButton");
const effect = new KeyframeEffect(
  topScrollButton, // Element to animate
  [ // Keyframes
    { opacity: 0.5,
    bottom:"-200px"
    },
    {opacity: 1,
      bottom:"10px"
    }
  ],
  {duration: 500, direction: "normal", easing: "linear", fill: "both"} // Keyframe settings
);

const topScrollButtonAnimation = new Animation(effect, Document.timeline);


var animationStart = -1;
var isAnimationUp = false;

function checkScrollButton()
{
  var b = window.scrollY > 350;
  if(b == isAnimationUp)
  {
    topScrollButtonAnimation.reverse();
    isAnimationUp = !isAnimationUp;
  }
}


function startAnimation(reverted)
{
  animationStart = htmlMediaElement.currentTime;
}

function goTop()
{
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

document.addEventListener('scroll',checkScrollButton );
console.log("logged");
