let finalScore;

function mainGameRuntime() {
  let divInitialX = 1200;

  let score = 0;

  updateScore();

  let generateHeight = () => {
    height = Math.round(Math.random() * 150) + 150;
    return height;
  };

  let generateDiv = () => {
    let topdiv = document.getElementById("topdiv");

    // Create the new divs
    let newdiv = document.createElement("div");
    newdiv.classList.add("blocktop");
    newdiv.style.left = divInitialX + "px";
    newdiv.style.top = 0 + "px";
    heightTop = generateHeight();
    newdiv.style.height = heightTop + "px";

    let newdivbottom = document.createElement("div");
    newdivbottom.classList.add("blockbottom");
    newdivbottom.style.left = divInitialX + "px";
    newdivbottom.style.top = heightTop + 200 + "px";

    // Append the new divs after the existing ones
    topdiv.appendChild(newdiv);
    topdiv.appendChild(newdivbottom);
  };

  let moveDivtop = () => {
    let arr = document.getElementsByClassName("blocktop");
    let a = Array.from(arr);

    a.forEach((element) => {
      if (element.classList.contains("moving")) {
        console.log("already moving");
      } else {
        element.classList.add("moving");
        let styling = window.getComputedStyle(element);
        let value = parseFloat(styling.getPropertyValue("left"));

        setInterval(() => {
          value -= 3;
          element.style.left = value + "px";
          try {
            if (value < -200) {
              element.parentElement.removeChild(element);
            }
          } catch {}
        }, 10);
      }
    });
  };

  let moveDivbottom = () => {
    let arr = document.getElementsByClassName("blockbottom");
    let a = Array.from(arr);

    a.forEach((element) => {
      if (element.classList.contains("moving")) {
        console.log("already moving");
      } else {
        element.classList.add("moving");
        let styling = window.getComputedStyle(element);
        let value = parseFloat(styling.getPropertyValue("left"));

        setInterval(() => {
          value -= 3;
          element.style.left = value + "px";
          if (value < -200) {
            try {
              element.parentElement.removeChild(element);
              score++;
              updateScore();
            } catch {}
          }
        }, 10);
      }
    });
  };

  generateDiv();
  moveDivtop();
  moveDivbottom();

  let continousDivGeneration = setInterval(() => {
    generateDiv();
    moveDivtop();
    moveDivbottom();
  }, 1000);

  let bird = document.getElementById("bird");

  birdPosY = 250;
  birdPosX = 40;

  bird.style.top = birdPosY + "px";
  bird.style.left = birdPosX + "px";

  let fall = () => {
    birdPosY += 2;
    bird.style.top = birdPosY + "px";
  };

  let fallingAnimation = setInterval(fall, 10);

  let moveUp = () => {
    let currentHeight = birdPosY;
    let a = setInterval(() => {
      birdPosY -= 3;
      bird.style.top = birdPosY + "px";
      if (Math.abs(birdPosY - currentHeight) > 90) {
        clearInterval(a);
      }
    }, 4);
  };

  document.addEventListener("keydown", (event) => {
    if (event.key == " ") {
      bird.style.transform = "rotate(-45deg)";
      moveUp();
      setTimeout(() => {
        bird.style.transform = "rotate(0deg)";
      }, 100);
    }
  });

  function updateScore() {
    document.getElementById("score").innerHTML = `Score is : - ${score}`;
  }

  function checkStatus() {
    let topDivElement = Array.from(document.getElementsByClassName("blocktop"));
    let bottomDivElement = Array.from(
      document.getElementsByClassName("blockbottom")
    );

    topDivElement.forEach((element) => {
      let birdElement = document.getElementById("bird").getBoundingClientRect();

      a = element.getBoundingClientRect();

      bottomValue = a.height;
      topValue = a.top;
      rightValue = a.right;
      leftValue = a.left;

      if (
        birdElement.right - 10 >= leftValue &&
        birdElement.right <= rightValue + birdElement.width
      ) {
        if (birdElement.top + 10 < bottomValue) {
          console.log("Game over");
          clearInterval(continousDivGeneration);
          clearInterval(fallingAnimation);
          finalScore = score;

          document.getElementsByClassName("container")[0].innerHTML = "";
          gameOver();
        }
      }
    });

    bottomDivElement.forEach((element) => {
      let birdElement = document.getElementById("bird").getBoundingClientRect();

      a = element.getBoundingClientRect();

      bottomValue = a.height;
      topValue = a.top;
      rightValue = a.right;
      leftValue = a.left;

      if (
        birdElement.right - 10 >= leftValue &&
        birdElement.right <= rightValue + birdElement.width
      ) {
        if (birdElement.top + birdElement.height > topValue) {
          console.log("Game over");
          clearInterval(continousDivGeneration);
          clearInterval(fallingAnimation);
          finalScore = score;
          document.getElementsByClassName("container")[0].innerHTML = "";
          gameOver();
        }
      }
    });
  }

  setInterval(checkStatus, 1);
}

function gameOver() {
  document.getElementsByClassName("over")[0].style.visibility = "visible";
  document.getElementsByClassName(
    "finalscore"
  )[0].innerHTML = `Your final score is ${finalScore}`;
  document.getElementsByClassName("finalscore")[0].style.visibility = "visible";

  let btn = document.getElementsByClassName("againbtn")[0];
  btn.style.visibility = "visible";
  btn.addEventListener("click", () => {
    document.getElementsByClassName("over")[0].style.visibility = "hidden";
    document.getElementsByClassName("finalscore")[0].style.visibility =
      "hidden";
    btn.style.visibility = "hidden";

    location.reload();
  });
}

mainGameRuntime();
