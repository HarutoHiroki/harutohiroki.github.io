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
