let header_pc = document.getElementById("header__pc");
let header_mobile = document.getElementById("header__mobile");

displayHeader = () => {
  if (window.innerWidth < 700) {
    header_pc.style.display = "none";
    header_mobile.style.display = "block";
  } else {
    header_pc.style.display = "block";
    header_mobile.style.display = "none";
  }
};

displayHeader();

window.addEventListener("resize", displayHeader);
