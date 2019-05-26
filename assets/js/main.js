window.addEventListener('scroll', function() {
  var scrollPosition = window.scrollY;
  var logoContainer = document.getElementsByClassName('arrow')[0];
  if (scrollPosition >= 100) logoContainer.classList.add('arrow--scrolled');
  else logoContainer.classList.remove('arrow--scrolled');
});
// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("myBtn").style.display = "block";
  } else {
    document.getElementById("myBtn").style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}