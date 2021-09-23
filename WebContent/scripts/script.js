const contentContainer = document.getElementById("mainContent");

imgChain = [];

var imgChainIndex = 0;


function goToImgIndex(url) {
  for (var i = 0; i < imgChain.length; i++) {
    if(new String(imgChain[i].url).trim() == new String(url).trim())
    {
      imgChainIndex =  i;
      return i;
    }
 }
 console.log("erreur url image inconnue " + url )
}

function ImgEventHandler(urlToUse,oldUrl)
{
  this.newUrl = urlToUse;
  this.oldUrl = oldUrl;
  this.handleEvent = imgHandleEvent;
}

function ImgMaillon(imgUrl,isLoaded,jsImage)
{
  this.isLoaded = isLoaded;
  this.jsImage = jsImage;
  this.url = imgUrl;
}

function preloadImg(imgMaillon) {
  if(!imgMaillon.isLoaded) {
    imgMaillon.jsImage = new Image();
    imgMaillon.jsImage.id = "imgInImgView";
    console.log("imgsrc " + imgMaillon.url);
    imgMaillon.jsImage.src = imgMaillon.url;
    imgMaillon.isLoaded = true;
  }
}

function imgHandleEvent()
{
  viewImg(this.newUrl,this.oldUrl);
}

function updateImgChain() {
  imgChain = [];
  var imgs = document.getElementsByTagName("img");
  for (let img of imgs)
  {
    if(img.classList.contains("zable"))
    {
      imgChain.push(new ImgMaillon(img.src,false,null));
    }
    else
    {
      if(img.classList.contains("hrzable"))
      {
        imgChain.push(new ImgMaillon(toHrUrl(img.src),false,null));
      }
    }
  }
}

function slider(agauche)
{
  if(agauche) {
    imgChainIndex --;
  }
  else {
    imgChainIndex ++;
  }
  viewCurrentImg();
}


function analyse(doc) {
  var imgs = doc.getElementsByClassName("zable");
  for (let img of imgs)
  {
    if(!img.classList.contains('clickEventRegistered'))
    {
      img.classList.add('clickEventRegistered');
      img.addEventListener("click", () => {
          viewImg(img.src,"");
      });
    }
  }

  var hrimgs = doc.getElementsByClassName("hrzable");
  for (let img of hrimgs)
  {
    if(!img.classList.contains('clickEventRegistered'))
    {
      img.classList.add('clickEventRegistered');

      img.addEventListener("click", new ImgEventHandler(toHrUrl(img.src),img.src));
    }
  }
  updateImgChain();
}

function toHrUrl(url)
{
  var indexExtension = url.lastIndexOf(".");
  return new String(url.substring(0,indexExtension)+".hr"+url.substring(indexExtension));
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
var imgViewIMG = document.getElementById("imgInImgView");
const imgScrollContainer = document.getElementById("scrollImgContainer");
var imgZoomLevel = -1;

var inImgView = false;

function keyPress (e) {
    if(e.key === "Escape" && inImgView) {
        exitImgView();
    }
}

function onViewImgLoad(){
  document.documentElement.style.setProperty('--imgViewImgRatio',(parseFloat(imgViewIMG.naturalWidth)/parseFloat(imgViewIMG.naturalHeight)));
  imgScrollContainer.innerHTML = "";
  imgScrollContainer.appendChild(imgViewIMG);
  refreshImgZoom();
  console.log("preload des autres");
  if(imgChainIndex < imgChain.length-1)
  {
    preloadImg(imgChain[imgChainIndex + 1]);
  }
  if(imgChainIndex > 0)
  {
    preloadImg(imgChain[imgChainIndex-1]);
  }
}



function viewCurrentImg() {
  document.body.style.overflow = 'hidden';
  imgView.style.display="block";
  var imgMaillon = imgChain[imgChainIndex];
  preloadImg(imgMaillon);
  imgViewIMG = imgMaillon.jsImage;
  if(imgMaillon.jsImage.complete){
    onViewImgLoad();
  }
  else{
    console.log("img load uncomplete");
    imgMaillon.jsImage.addEventListener('load',onViewImgLoad)
  }
  inImgView = true;
}

function viewImg(imgsrc,oldUrl) {
  goToImgIndex(imgsrc);
  viewCurrentImg();
}

function exitImgView() {
  imgZoomLevel = -1;
  imgView.style.display="none";
  document.body.style.overflow = 'visible';
  inImgView = false;
}

function refreshImgZoom() {
  var relScrollX = parseFloat(imgScrollContainer.scrollLeft+imgScrollContainer.clientWidth*0.5)/parseFloat(imgViewIMG.clientWidth);
  var relScrollY = (parseFloat(imgScrollContainer.scrollTop)+imgScrollContainer.clientHeight*0.5)/parseFloat(imgViewIMG.clientHeight);
  document.documentElement.style.setProperty('--imgZoomFactor',Math.pow(1.2,imgZoomLevel));
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
const scrollButtonEffect = new KeyframeEffect(
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

const topScrollButtonAnimation = new Animation(scrollButtonEffect, Document.timeline);

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

function expandArchive(nomArchive) {
  sectionArchive = document.getElementById("archive_" + nomArchive);
  boutonExpand = sectionArchive.getElementsByClassName("lireLaSuite")[0];
  boutonExpand.style.opacity = 0.5;
  boutonExpand.innerHTML = "...";
  boutonExpand.onclick= (() => {retracterArchive(nomArchive)});
  //boutonExpand.onclick = "retracterArchive('" + nomArchive + "')";
  loadFileInto("./pages/archives/"+nomArchive+".html",sectionArchive.getElementsByClassName("archiveContainer")[0],);
}

function retracterArchive(nomArchive) {
  sectionArchive = document.getElementById("archive_" + nomArchive);
  boutonExpand.onclick= (() => {expandArchive(nomArchive)});
  boutonExpand.style.opacity = 1;
  sectionArchive.getElementsByClassName("archiveContainer")[0].innerHTML = "";
}
