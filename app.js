const pick = document.querySelector(".pick");
const picksAlignDiv = document.querySelector(".picksAlignDiv");
const target = document.querySelector(".target");
const healthBar = document.querySelector(".healthBar");
const infoValue = document.querySelector(".info");
const scoreValue = document.querySelector(".score");
const healthBarBack = document.querySelector(".healthBarBack");
const healthBeginValueFromCss =
  (parseFloat(window.getComputedStyle(healthBar).getPropertyValue("width")) /
    window.innerWidth) *
  100;
let health = healthBeginValueFromCss;
let scoreValueNumber = 1;

scoreValue.textContent = "Your score: " + scoreValueNumber;

addEventListener("mousemove", function (e) {
  picksAlignDiv.style.top = e.clientY + "px";
  picksAlignDiv.style.left = e.clientX + "px";

  picksAlignDiv.appendChild(pick)
});

addEventListener("mousedown", function (e) {
  const gun = document.createElement("div");
  gun.classList.add("gun");
  gun.style.top = e.clientY + "px";
  gun.style.left = e.clientX + "px";
  gun.textContent = "error";
  document.body.appendChild(gun);

  let posY = e.clientY;
  let posX = e.clientX;
  let isGunRemoved = false;

  setInterval(function () {
    if (!isGunRemoved) {
      const targetsCords = target.getBoundingClientRect();

      posX += 5;
      gun.style.left = posX + "px";

      if (
        posX >= targetsCords.x &&
        posX <= targetsCords.x + targetsCords.width &&
        posY >= targetsCords.y &&
        posY <= targetsCords.y + targetsCords.height
      ) {
        gun.remove();
        scoreValueNumber = scoreValueNumber + 1;
        scoreValue.textContent = "Your score: " + scoreValueNumber;

        posX = 0;
        posY = 0;
        health = (health == healthBeginValueFromCss) ? health / 2 : (healthBeginValueFromCss / 2 == health ? health / health : health - health);
        healthBar.style.width = health + "vw";
        isGunRemoved = true;

        if (health <= 0) {
          health = healthBeginValueFromCss;
          const randoNum =
            Math.floor(Math.random() * (window.innerHeight - window.innerWidth / 6 - 30 + 1)) +
            30;
          target.style.top = randoNum + "px";
          healthBar.style.width = health + "vw";
        }
      }

      if (posX >= window.innerWidth - 40) {
        gun.remove();
        isGunRemoved = true;
        scoreValueNumber = scoreValueNumber - 1;
        scoreValue.textContent = "Your score: " + scoreValueNumber;
      }
      infoValue.textContent =
        targetsCords.x +
        " " +
        targetsCords.y +
        " Y: " +
        window.innerHeight +
        " X: " +
        window.innerWidth +
        " " +
        (!isGunRemoved ? " летит " : " не летит ") +
        " posX: " +
        posX;
    }
  }, 1);
});
