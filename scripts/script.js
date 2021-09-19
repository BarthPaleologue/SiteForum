const contentContainer = document.getElementById("mainContent");

function ImgEventHandler(urlToUse)
{
  this.newUrl = urlToUse;
  this.handleEvent = imgHandleEvent;
}

function imgHandleEvent()
{
  viewImg(this.newUrl);
}

function analyse(doc) {
  var imgs = doc.getElementsByClassName("zable");
  for (let img of imgs)
  {
    if(!img.classList.contains('clickEventRegistered'))
    {
      img.classList.add('clickEventRegistered');
      img.addEventListener("click", () => {
          viewImg(img.src);
      });
    }
  }

  var hrimgs = doc.getElementsByClassName("hrzable");
  for (let img of hrimgs)
  {
    if(!img.classList.contains('clickEventRegistered'))
    {
      img.classList.add('clickEventRegistered');
      var indexExtension = img.src.lastIndexOf(".");
      var newSrc = new String(img.src.substring(0,indexExtension)+".hr"+img.src.substring(indexExtension));
      img.addEventListener("click", new ImgEventHandler(newSrc));
    }
  }
}

function loadFileInto(filePath, targetElement) {
    let xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) { // XMLHttpRequest.DONE == 4
            if (xmlhttp.status == 200) {
                targetElement.innerHTML = xmlhttp.responseText;
                analyse(document);
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

let pages = ["accueil", "events", "bureau", "poles", "membres", "archives"];
let currentPage = pages[0];

for (let pageID of pages) {
    document.getElementById(pageID).addEventListener("click", () => {
        if (currentPage != pageID) {
            loadFileInto(`./pages/${pageID}.html`, contentContainer);
            currentPage = pageID;
        }
    });
}

const imgView = document.getElementById("imgView");
const imgViewIMG = document.getElementById("imgInImgView");
const imgScrollContainer = document.getElementById("scrollImgContainer");
var imgZoomLevel = -1;

function onViewImgLoad(){
  document.documentElement.style.setProperty('--imgViewImgRatio',(parseFloat(imgViewIMG.naturalWidth)/parseFloat(imgViewIMG.naturalHeight)));
  refreshImgZoom();
}

function viewImg(imgsrc) {
  imgView.style.display="block";
  console.log("shouldBeDisplayed")
  document.body.style.overflow = 'hidden';
  imgViewIMG.src = imgsrc;
  if(imgViewIMG.complete){
    onViewImgLoad();
  }
  else{
    imgViewIMG.addEventListener('load',onViewImgLoad)
  }
}

function exitImgView() {
  imgZoomLevel = -1;
  imgViewIMG.src = "";
  imgView.style.display="none";
  document.body.style.overflow = 'visible';
}

function refreshImgZoom() {
  var relScrollX = parseFloat(imgScrollContainer.scrollLeft+imgScrollContainer.clientWidth*0.5)/parseFloat(imgViewIMG.clientWidth);
  var relScrollY = (parseFloat(imgScrollContainer.scrollTop)+imgScrollContainer.clientHeight*0.5)/parseFloat(imgViewIMG.clientHeight);
  document.documentElement.style.setProperty('--imgZoomFactor',Math.pow(1.2,imgZoomLevel));
  console.log("relScroll" + relScrollX);
  imgScrollContainer.scrollLeft = relScrollX*imgViewIMG.clientWidth-0.5*imgScrollContainer.clientWidth;
  imgScrollContainer.scrollTop = relScrollY*imgViewIMG.clientHeight-0.5*imgScrollContainer.clientHeight;
}

function imgZoom() {
  imgZoomLevel = imgZoomLevel + 1;
  refreshImgZoom();
}

function imgUnzoom() {
  imgZoomLevel = imgZoomLevel - 1;
  refreshImgZoom();
}


loadFileInto(`./pages/${currentPage}.html`, contentContainer);


topScrollButton = document.getElementById("gotoTopButton");
const effect = new KeyframeEffect(
    topScrollButton, // Element to animate
    [ // Keyframes
        {
            opacity: 0.5,
            bottom: "-200px"
        },
        {
            opacity: 1,
            bottom: "5px"
        }
    ],
    { duration: 500, direction: "normal", easing: "linear", fill: "both" } // Keyframe settings
);

const topScrollButtonAnimation = new Animation(effect, Document.timeline);


var animationStart = -1;
var isAnimationUp = false;

function checkScrollButton() {
    var b = window.scrollY > 350;
    if (b == isAnimationUp) {
        topScrollButtonAnimation.reverse();
        isAnimationUp = !isAnimationUp;
    }
}


function startAnimation(reverted) {
    animationStart = htmlMediaElement.currentTime;
}

function goTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

document.addEventListener('scroll', checkScrollButton);
