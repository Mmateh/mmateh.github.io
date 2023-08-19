let prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  let currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.querySelector('.navbar').classList.remove('hidden');
  } else {
    document.querySelector('.navbar').classList.add('hidden');
  }
  prevScrollpos = currentScrollPos;
}

document.getElementById("toggleButton").addEventListener("click", function() {
  var nav = document.querySelector("nav");
  nav.classList.toggle("active");
});
