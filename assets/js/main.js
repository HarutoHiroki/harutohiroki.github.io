setInterval(function threeBar(){
  if (document.body.offsetWidth > 505) {
    document.getElementById("navdrop").style.display = "none";
    document.getElementById("bar1").style.display = "initial";
    document.getElementById("bar2").style.display = "initial";
    document.getElementById("bar3").style.display = "initial";
    document.getElementById("bar4").style.display = "initial";
    document.getElementById("bar5").style.display = "initial";
    document.getElementById("wakatime_svg").style.display = "initial";
    document.getElementById("wakatime_svg_mobile").style.display = "none";
  } else {
    document.getElementById("navdrop").style.display = "initial";
    document.getElementById("bar1").style.display = "none";
    document.getElementById("bar2").style.display = "none";
    document.getElementById("bar3").style.display = "none";
    document.getElementById("bar4").style.display = "none";
    document.getElementById("bar5").style.display = "none";
    document.getElementById("wakatime_svg").style.display = "none";
    document.getElementById("wakatime_svg_mobile").style.display = "block";
  }
}, 69);


window.addEventListener("load",(
  function(){
    var e=document.getElementsByClassName("nav-bar");
    if(e.length){
      var n=e[0],l=n.querySelector(".nav-bars"),b=n.querySelector(".nav-close-btn"),t=n.querySelector(".dropdown-content");
      l&&l.addEventListener("click",() => {
        l.style.display = "none"; 
        b.style.display = "block";
        t.style.display = "block";
      }),
      b&&b.addEventListener("click",() => {
        b.style.display = "none"; 
        t.style.display = "none";
        l.style.display = "block"; 
      });
    }

    let bgm = document.getElementById("bgm");
    bgm.volume = 0.15;

    document.querySelectorAll(".bgm-toggle").forEach(function (e) {
      e.addEventListener("click", function () {
        if (bgm.paused) {
          bgm.play();
          document.body.classList.add("sound_playing");
        } else {
          bgm.pause();
          document.body.classList.remove("sound_playing");
        }
      });
    });
  }
));


window.onfocus = function(){document.getElementById("home-video").play();};
window.onblur = function(){document.getElementById("home-video").pause();};
