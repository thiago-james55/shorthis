import { isLogedIn, loggedPanel } from "./utils.js";

var clicked = 0;

profilePhoto.addEventListener("click", function () {
  clicked++;

  if (clicked < 19) {
    title.innerText = clicked;
    title.style.backgroundColor = "black";
    title.style.color = "yellow";
    setTimeout(function () {
      title.innerText = "ShortHIS";
      title.style.backgroundColor = "red";
      title.style.color = "white";
    }, 200);
  }

  if (clicked == 20) {
    document.title = "Praise the Sun!";

    Array.from(document.getElementsByTagName("a")).forEach((element) => {
      element.style.color = "yellow";
      element.style.backgroundColor = "black";
    });

    title.style.backgroundColor = "yellow";
    title.style.color = "black";

    profilePhoto.src = "js/easterImg";
    profilePhoto.style.borderColor = "yellow";
    profilePhoto.title =
      "But I am a warrior of the sun! Spot my summon signature easily by its brilliant aura. If you miss it, you must be blind!";

    let majula = document.createElement("AUDIO");
    majula.src = "js/easterMsc";
    majula.play();

    titleAbout.innerText = "Praise the sun!";
  }
});

function constructLoggedPanel() {
  if (isLogedIn()) {
    loggedPanel();
  }
}

constructLoggedPanel();
