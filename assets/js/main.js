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


window.addEventListener("load",(
  function(){
    var e=document.getElementsByClassName("nav-bar");if(e.length){
      var n=e[0],l=n.querySelector(".nav-bars"),t=n.querySelector(".nav-close");
      l&&l.addEventListener("click",()=>{l.style.display = "none"; l.classList.toggle("nav--expand");}),
      t&&t.addEventListener("click",()=>{
        l&&l.classList.remove("nav--expand"); 
        setTimeout(function() {
          l.style.display ="block";
        }, 175);
      })
    }
  }
));
