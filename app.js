const pick = document.querySelector(".pick");
const target = document.querySelector(".target");
const shootsValue = document.querySelector(".shoots");
const healthBar = document.querySelector(".healthBar");
let health = 200

addEventListener("mousemove", function (e) {
  pick.style.top = e.clientY - 10 + "px";
  pick.style.left = e.clientX - 10 + "px";
});

addEventListener("mousedown", function (e) {
  const gun = document.createElement("div");
  gun.classList.add("gun");
  gun.style.top = e.clientY + "px";
  let posY = e.clientY;
  document.body.appendChild(gun);

  let posX = e.clientX;

  setInterval(function () {
    posX += 5;
    gun.style.left = posX + "px";

    const targetsCords = target.getBoundingClientRect();

    if (
      posX >= targetsCords.x &&
      posX <= targetsCords.x + targetsCords.width &&
      posY >= targetsCords.y &&
      posY <= targetsCords.y + targetsCords.height
    ) {
      shootsValue.textContent = targetsCords.x + " " + targetsCords.y;

      gun.remove();
      posX = 0;
      posY = 0;
      health -= 80
      healthBar.style.width = health + 'px'
      if (health <= 0) {
        health = 200
        const randoNum =
        Math.floor(Math.random() * (window.innerHeight - 200 - 0 + 1)) + 0;
        target.style.top = randoNum + "px";
        healthBar.style.width = health + 'px'
        }

    }

    if (posX >= window.innerWidth) {
      gun.remove();
    }
  }, 1);
});
