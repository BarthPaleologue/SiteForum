const img = new Image();
let root = document.documentElement;
img.onload = function() {
  root.style.setProperty('--bannerWidthOnHeight', (parseFloat(this.width)/(parseFloat(this.height))));
}
img.src = './imgs/banner.jpg';