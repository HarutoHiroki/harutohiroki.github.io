//window.addEventListener('scroll', function() {
//  var scrollPosition = window.scrollY;
//  var logoContainer = document.getElementsByClassName('arrow')[0];
//  if (scrollPosition >= 100) logoContainer.classList.add('arrow--scrolled');
//  else logoContainer.classList.remove('arrow--scrolled');
//});
// When the user scrolls down 20px from the top of the document, show the button
//const prevScrollpos = 0;
//window.onscroll = function() {
//  scrollFunction()
//  var currentScrollPos = window.pageYOffset;
//  if (prevScrollpos < currentScrollPos) {
//    document.getElementById("navbar").style.top = "0";
//  } else {
//    document.getElementById("navbar").style.top = "-110px";
//  }
//};
//
//function scrollFunction() {
//  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
//    document.getElementById("myBtn").style.display = "block";
//  } else {
//    document.getElementById("myBtn").style.display = "none";
//  }
//}
setInterval(function threeBar(){
  if (document.body.offsetWidth > 505) {
    document.getElementById("navbar").style.display = "none";
    document.getElementById("bar1").style.display = "initial"
    document.getElementById("bar2").style.display = "initial"
    document.getElementById("bar3").style.display = "initial"
    document.getElementById("bar4").style.display = "initial"
  } else {
    document.getElementById("navbar").style.display = "initial";
    document.getElementById("bar1").style.display = "none"
    document.getElementById("bar2").style.display = "none"
    document.getElementById("bar3").style.display = "none"
    document.getElementById("bar4").style.display = "none"
  }
}, 69)


!function(){
  "use strict";
  function e(){
    var e=window.scrollY,n=document.getElementsByClassName("arrow");
    n.width&&(e>=100?n[0].classList.add("arrow--scrolled"):n[0].classList.remove("arrow--scrolled"))
  }
  function n(){
    var e=window.innerHeight,n=document.querySelectorAll(".scroll-in:not(.scroll-in--scrolled)");
    n.length&&Array.from(n).forEach(n=>{n.getBoundingClientRect().y<e&&n.classList.add("scroll-in--scrolled")})
  }
  e(),
  window.addEventListener("scroll",(function(){e(),n()})),
  window.addEventListener("load",(
    function(){
      n(),
      function(){
        var e=document.getElementsByClassName("nav-bar");if(e.length){
          var n=e[0],l=n.querySelector(".nav-bars"),t=n.querySelector(".nav-close");
          l&&l.addEventListener("click",()=>{l.classList.toggle("nav--expand"); l.style.display = "none"}),
          t&&t.addEventListener("click",()=>{l&&l.classList.remove("nav--expand"); l.style.display ="block"})
        }
      }()
    }))
  }();
