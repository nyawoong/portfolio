const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector(".navigation");

menuButton.addEventListener("click", function () {
  navigation.classList.toggle("open");
});

const menuLinks = document.querySelectorAll(".navigation a");

menuLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    navigation.classList.remove("open");
  });
});