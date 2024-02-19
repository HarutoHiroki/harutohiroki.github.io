setInterval(function threeBar(){
  if (document.body.offsetWidth > 505) {
    document.getElementById("navbar").style.display = "none";
    document.getElementById("bar1").style.display = "initial";
    document.getElementById("bar2").style.display = "initial";
    document.getElementById("bar3").style.display = "initial";
    document.getElementById("bar4").style.display = "initial";
    document.getElementById("wakatime_svg").style.display = "initial";
    document.getElementById("wakatime_svg_mobile").style.display = "none";
  } else {
    document.getElementById("navbar").style.display = "initial";
    document.getElementById("bar1").style.display = "none";
    document.getElementById("bar2").style.display = "none";
    document.getElementById("bar3").style.display = "none";
    document.getElementById("bar4").style.display = "none";
    document.getElementById("wakatime_svg").style.display = "none";
    document.getElementById("wakatime_svg_mobile").style.display = "block";
  }
}, 69);


window.addEventListener("load",(
  function(){
    var e=document.getElementsByClassName("nav-bar");if(e.length){
      var n=e[0],l=n.querySelector(".nav-bars"),t=n.querySelector(".nav-close");
      l&&l.addEventListener("click",()=>{l.style.display = "none"; l.classList.toggle("nav--expand");}),
      t&&t.addEventListener("click",()=>{
        l&&l.classList.remove("nav--expand"); // jshint ignore:line
        setTimeout(function() {
          l.style.display ="block";
        }, 175);
      }); // jshint ignore:line
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

        if (bgm.muted) {
        } else {
        }
      });
    });
  }
));


window.onfocus = function(){document.getElementById("home-video").play();};
window.onblur = function(){document.getElementById("home-video").pause();};
