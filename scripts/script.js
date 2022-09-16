// Variable
const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const images = document.getElementsByClassName("img");
const covers = document.getElementsByClassName("cover");
const scoreDisplay = document.getElementById("score-display");
const openedImages = [];
let score = 0;

// Event listeners functions
const startGame = () => {
    randomizeImages();
    let timer = setInterval(() => {
        clearInterval(timer);
        hideCards();
        setEventListenersForCards();
    }, 5000);
    startBtn.removeEventListener("click", startGame);
};

// Event listenres
startBtn.addEventListener("click", startGame);


// Helper functions
const randomizeImages = () => {
    let imgSources = [
        "./images/c++.png", "./images/c++.png",
        "./images/html.png", "./images/html.png",
        "./images/python.png", "./images/python.png"];
    imgSources = shuffleSources(imgSources);
    for (let i = 0; i < images.length; i++) {
        images[i].src = imgSources[i];
        covers[i].classList.toggle("hide");
    }
};

const shuffleSources = (imgSources) => {
    let currentIndex = imgSources.length, randomIndex;
    while (currentIndex != 0) {
        // Pick a random index
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // Swap elements
        let tempElement = imgSources[currentIndex];
        imgSources[currentIndex] = imgSources[randomIndex];
        imgSources[randomIndex] = tempElement;
    }
    return imgSources;
};

const hideCards = () => {
    for (const cover of covers) {
        cover.classList.toggle("hide");
    }
};

const setEventListenersForCards = () => {
    for (let i = 0; i < covers.length; i++) {
        covers[i].addEventListener("click", () => {
            // Remove the cover to reveal the image
            covers[i].classList.toggle("hide");
            // openedImages array holds the index of the opened image only if it is the first to open
            if (openedImages.length < 1) {
                openedImages.push(i);
            } else {
                // If there is an image already opened dont add anything to the openedImages arry
                // Compare thier sources
                if (images[i].src == images[openedImages[0]].src) {
                    score += 5;
                    updateScoreDisplay("right");
                    cleanOpenedImages();
                } else {
                    if (score > 10)
                        score -= 10;
                    else
                        score = 0;
                    updateScoreDisplay("wrong");
                    cleanOpenedImages();
                    let timer = setInterval(() => {
                        // After 2 secs close both opened images
                        clearInterval(timer);
                        hideTheOpenedImages(i);
                    }, 2000);
                }
            }
            console.log(score);
        });
    }
};

const updateScoreDisplay = (type) => {
    if (type == "right")
        scoreDisplay.style.color = "green";
    else
        scoreDisplay.style.color = "red";
    scoreDisplay.textContent = "Score: " + score;
};

const hideTheOpenedImages = (index) => {
    covers[index].classList.toggle("hide");
    covers[openedImages[0]].classList.toggle("hide");
};

const cleanOpenedImages = () => {
    while (openedImages.length > 0) {
        openedImages.pop();
    }
};