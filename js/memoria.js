document.addEventListener("DOMContentLoaded", () => {
    const game = document.getElementById("game");
    const dino = document.getElementById("dino");
    const cactus = document.getElementById("cactus");
  
    let isJumping = false;
  
    document.addEventListener("keydown", (event) => {
      if (event.code === "Space" && !isJumping) {
        jump();
      }
    });
  
    function jump() {
      isJumping = true;
  
      let position = 0;
      const jumpInterval = setInterval(() => {
        if (position >= 100) {
          clearInterval(jumpInterval);
          const fallInterval = setInterval(() => {
            if (position <= 0) {
              clearInterval(fallInterval);
              isJumping = false;
            } else {
              position -= 5;
              dino.style.bottom = `${position}px`;
            }
          }, 20);
        } else {
          position += 5;
          dino.style.bottom = `${position}px`;
        }
      }, 20);
    }
  
    function moveCactus() {
      let cactusPosition = 600;
      const moveInterval = setInterval(() => {
        if (cactusPosition < -20) {
          clearInterval(moveInterval);
          cactusPosition = 600;
          moveCactus();
        } else {
          cactusPosition -= 5;
          cactus.style.right = `${cactusPosition}px`;
  
          if (
            cactusPosition > 0 &&
            cactusPosition < 50 &&
            dino.style.bottom === "0px"
          ) {
            alert("Game Over!");
            resetGame();
          }
        }
      }, 20);
    }
  
    function resetGame() {
      dino.style.bottom = "0";
      jump();
      moveCactus();
    }
  
    moveCactus();
  });
  