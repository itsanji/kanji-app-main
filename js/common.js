const links = document.querySelectorAll(".header-nav li");

$("#burger").click(() => {
  $("#header-nav").toggleClass("nav-activate");
  links.forEach((link, index) => {
    if (link.style.animation) {
      link.style.animation = "";
    } else {
      link.style.animation = `navLinkFade 0.5s ease forwards ${
        index / 7 + 0.5
      }s`;
    }
  });
});

for (let i = 10; i >= 1; i--) {
  $("#selecter").append(`<option>cấp ${i}</option>`);
}
