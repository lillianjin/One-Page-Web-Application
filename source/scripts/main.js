// scroll function

window.onscroll = function() {
    resize();
    scroll_indicator();
}

var title1 = document.getElementById("title1");
var navbar = document.getElementById("navbar");

function resize() {
    if (document.body.scrollTop >= 45 || document.documentElement.scrollTop >= 45){
        header.style.opacity = "0.8";
        header.style.height = "6em";
        title1.style.fontSize = "2.5em";
        navbar.style.fontSize = "1em";
    } else {
        header.style.opacity = "1";
        header.style.height = "9.375em";
        title1.style.fontSize = "5em";
        navbar.style.fontSize = "1.2em";
    }
}

function scroll_indicator() {
    var header = document.getElementById("header");
    var navs = document.getElementsByClassName("nav");
    var secs = document.getElementsByClassName("sec");
    var scroll = window.pageYOffset - header.offsetHeight + 30;
    for (var i = 0; i < secs.length; i++){
        if (scroll >= secs[i].offsetTop && scroll < secs[i].offsetTop + secs[i].offsetHeight){
            navs[i].classList.add("active");
        }else{
            navs[i].classList.remove("active");
        }
    }
}



function smooth(sec_top) {
    var start = window.pageYOffset,
        target = sec_top + 70,
        change = target - start,
        currentTime = 0,
        increment = 20,
        duration = 600;
    var animateScroll = function(){
        currentTime += increment;
        var val = Math.easeInOutQuad(currentTime, start, change, duration);
        window.scrollTo(0, val);
        if(currentTime < duration) {
            setTimeout(animateScroll, increment);
        }
    };
    animateScroll();
}


Math.easeInOutQuad = function (time, start, change, duration) {
  time /= duration/2;
  if (time < 1) return change/2*time*time + start;
  time--;
  return -change/2 * (time*(time-2) - 1) + start;
};

var navs = document.getElementsByClassName("nav");
var secs = document.getElementsByClassName("sec");
function test() {
    var index = parseInt(this.id.split("v")[1])-1;
    var sec = secs[index];
    smooth(sec.offsetTop);
}
for (var i=0; i < navs.length; i++){
    navs[i].addEventListener('click', test, false);
}


// carousel
var container = document.getElementsByClassName('carousel-main')[0];
var indicator = document.getElementsByClassName('carousel-indicator')[0];
var pts = [].slice.call(document.getElementsByClassName('carousel-pt'));
var total = document.getElementsByClassName('carousel-item').length;
var percent = (100 / total);
var curIdx = 0;
pts[curIdx].classList.add('active');

function changeImg(index) {
    if (index < 0){
        index = total - 1;
    }
    if (index >= total){
        index = 0;
    }
    container.style.WebkitTransform = container.style.transform = 'translateX(-' + (index * percent) + '%)';
    pts[curIdx].classList.remove('active');
    pts[index].classList.add('active');
    curIdx = index;
}

var prevBtn = document.getElementById('carousel-prev');
prevBtn.onclick = function() {
    changeImg(curIdx - 1);
}

var nextBtn = document.getElementById('carousel-next');
nextBtn.onclick = function() {
    changeImg(curIdx + 1);
}

indicator.onclick = function(curr) {
    var index = pts.indexOf(curr.target);
    if (index !== -1 && index !== curIdx) {
        changeImg(index);
    }
}

//modal
var modal = document.getElementsByClassName('modal');
var imgs = document.getElementsByClassName('img_sm');
var modalImg = document.getElementsByClassName('modal-content');
var closes = document.getElementsByClassName("close");
function showModal(){
    var i = parseInt(this.id.split("sm")[1])-1;
    modal[i].style.display = "block";
    modalImg[i].src = imgs[i].src;
}

function closeModal(){
    var i = parseInt(this.id.split("se")[1])-1;
    modal[i].style.display = "none";
}

for (var i=0; i < imgs.length; i++){
    imgs[i].addEventListener('click', showModal, false);
    closes[i].addEventListener('click', closeModal, false);
}
